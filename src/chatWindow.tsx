import React, { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";
import JavascriptTimeAgo from "javascript-time-ago";

JavascriptTimeAgo.locale(en);

import {
  Icon,
  EditableText,
  Button,
  Divider,
  Card,
  H5,
  ControlGroup
} from "@blueprintjs/core";

function Message({ usr, msg, timestamp }) {
  return (
    <div style={{ padding: "0.25em 0" }}>
      <div style={{ display: "flex" }}>
        <Icon icon="user" iconSize={40} />
        <Divider />
        <div>
          <div style={{ display: "flex" }}>
            <span style={{ fontWeight: "600" }}>{usr}</span>
            <Divider />
            <span style={{ color: "#8A9BA8" }}>{timestamp}</span>
          </div>
          <div>{msg}</div>
        </div>
      </div>
    </div>
  );
}

function useChannel(gun, channel) {
  const [messages, setMessages] = useState({});
  console.log(channel);
  const channelHandle = gun.get("channels").get(channel);
  const updateMessages = (message, timestamp) => {
    setMessages(messages => {
      console.log(messages);
      return { ...messages, [timestamp]: message };
    });
  };
  useEffect(() => {
    console.log("useEffect");
    channelHandle
      .get("messages")
      .map()
      .map()
      .on(updateMessages);
    return () => {
      channelHandle.get("messages").off();
    };
  }, channel);

  return [messages, channelHandle];
}

function chatWindow({ context: { channel, gun, user } }) {
  // const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const [messages, sendMessage] = useChannel(gun, channel);
  // let test = gun.get("channels").get(channel);
  // test.get("messages");
  // test.get("messages").set({ 0: { usr: "wtf", msg: "fuck" } });
  // test.map().once(console.log);
  // gun
  //   .get("channels")
  //   .map()
  //   .once(console.log);

  return (
    <div className="chat-window">
      <main style={{ overflow: "auto" }}>
        {Object.keys(messages).map(k => {
          let message = messages[k];
          return <Message key={k} {...message} timestamp={k} />;
        })}
      </main>
      <footer>
        <Divider />
        <div className="message-input">
          <EditableText
            className="input"
            multiline
            minLines={3}
            value={input}
            onChange={setInput}
            disabled={!user.is}
            placeholder="New Message"
            onConfirm={msg => {
              setInput("");
              console.log(
                gun
                  .get("channels")
                  .get(channel)
                  .get("messages")
                  .set({ [Date.now()]: { usr: user.is.alias, msg } })
              );
            }}
          />
          <Divider />
          <Button minimal icon="chevron-right" />
        </div>
      </footer>
    </div>
  );
}

export default chatWindow;
