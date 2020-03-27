import { createContext } from "react";

const Gun = require("gun/gun");
require("gun/sea");
require("gun/lib/open");

export const setUser = user => ({
  type: "SET_USER",
  user
});

export const setChannel = channel => ({
  type: "SET_CHANNEL",
  channel
});

const gun = new Gun(["wss://gundb-server.herokuapp.com/gun"]);

export const initialContext = {
  gun,
  user: gun.user().recall({ sessionStorage: true }),
  channel: "general"
};

export const gunReducer = (state = initialContext, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.user
      };
    }
    case "SET_CHANNEL": {
      return {
        ...state,
        channel: action.channel
      };
    }
    default: {
      return state;
    }
  }
};

const context = createContext(initialContext);

export default context;
