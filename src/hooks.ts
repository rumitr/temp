import { useState, useEffect, useContext } from "react";
import Context from "./reducer";

export function useChannel(gun, channel) {
  const [messages, setMessages] = useState({});
  const updateMessages = (message, timestamp) => {
    setMessages(messages => {
      return { ...messages, [timestamp]: message };
    });
  };

  useEffect(
    () => {
      const channelHandle = gun.get("channels").get(channel);
      channelHandle
        .get("messages")
        .map()
        .map()
        .on(updateMessages);
      return () => {
        channelHandle.get("messages").off();
        setMessages({});
      };
    },
    [channel]
  );

  return [messages, gun.get("channels").get(channel)];
}

export function useGunOn(path) {
  const { gun } = useContext(Context);
  const [state, setState] = useState({});

  const updateState = (value, key) =>
    setState(state => ({ ...state, [key]: value }));

  let gunListener = path
    .split(".")
    .reduce((chain, next) => chain.get(next), gun);

  useEffect(() => {
    gunListener.map().on(updateState);
    return () => {
      gunListener.off();
    };
  });
  return [state, gunListener];
}
