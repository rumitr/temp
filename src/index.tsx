import React, { useState, createContext, useReducer } from "react";
import ReactDOM from "react-dom";
import Context, { initialContext, gunReducer } from "./reducer";

import ChatWindow from "./chatWindow";
import { Login } from "./modals";
import Layout from "./layout";

import "./styles.scss";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";

function App() {
  const [context, dispatch] = useReducer(gunReducer, initialContext);
  const messages = [];
  // context.gun._.graph()
  const { gun } = context;
  // gun
  //   .get("channels")
  //   .get("#general")
  //   .put({ public: true, messages: {} });

  return (
    <Context.Provider value={{ ...context, dispatch }}>
      <Layout header={context.channel}>
        <ChatWindow messages={messages} context={context} />
      </Layout>
    </Context.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
