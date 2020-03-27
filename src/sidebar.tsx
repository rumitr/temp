import React, { useContext, useEffect } from "react";
import Context, { setChannel } from "./reducer";
import { useGunOn } from "./hooks";
import { Button, Menu, MenuItem, Icon } from "@blueprintjs/core";

export default () => {
  const { gun, user, dispatch, channel } = useContext(Context);
  // const [channels, setChannels] = useState([]);
  const [channels, createChannel] = useGunOn("channels");

  // gun.user.once(console.log)
  // gun.map().once(console.log);
  // gun.get('user').once(console.log);
  // gun.user().once(console.log)

  // return null;

  return (
    <Menu>
      <Menu.Divider title="Channels" />
      {Object.keys(channels).map(c => (
        <Menu.Item
          key={c}
          icon="chat"
          text={c}
          active={c === channel}
          onClick={() => c !== channel && dispatch(setChannel(c))}
        />
      ))}
      <Menu.Item text="Create Channel" labelElement={<Icon icon="plus" />} />
      <Menu.Divider title="Direct" />
      <Menu.Item text="New message" labelElement={<Icon icon="plus" />} />
    </Menu>
  );
};
