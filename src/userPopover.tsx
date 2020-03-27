import React, { useState, useContext } from "react";
import withValidation from "@omarzion/validation";
import Context, { setUser } from "./reducer";

import {
  Popover,
  PopoverInteractionKind,
  Button,
  Position,
  Intent,
  ButtonGroup
} from "@blueprintjs/core";
import { FormGroup } from "./generics";
import { emailAddress, notEmpty } from "@omarzion/validation/lib/tests";

const User = ({ controller }) => {
  const [register, setRegister] = useState(false);
  const [open, setOpen] = useState(false);
  const { gun, user, dispatch, channel } = useContext(Context);

  if (user && user.is) {
    return (
      <Popover
        interactionKind={PopoverInteractionKind.CLICK}
        popoverClassName="bp3-popover-content-sizing"
        position={Position.BOTTOM_RIGHT}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <Button minimal icon="user" onClick={() => setOpen(!open)} />
        <div>
          <p>{user.is.alias}</p>
          <Button
            intent={Intent.DANGER}
            onClick={() => {
              user.leave();
              dispatch(setUser(gun.user()));
              setOpen(false);
            }}
          >
            Logout
          </Button>
        </div>
      </Popover>
    );
  }

  const reg = async () => {
    if (await controller.validate()) {
      const { username, password } = controller.getValues();
      user.create(username, password, result => {
        if (result.error) {
          controller.set("username", { message: "user already exists" });
        } else {
          login();
        }
      });
    }
  };

  const login = async () => {
    controller.set("verifyPassword", { valid: true });
    if (await controller.validate()) {
      const { username, password } = controller.getValues();
      user.auth(username, password, result => {
        if (result.err) {
          controller.set("username", { valid: false });
          controller.set("password", {
            message: "Username & password not found"
          });
        } else {
          controller.clear();
          setOpen(false);
          dispatch(setUser(user));
          user.recall({ sessionStorage: true });
        }
      });
    }
  };

  return (
    <Popover
      interactionKind={PopoverInteractionKind.CLICK}
      popoverClassName="bp3-popover-content-sizing"
      position={Position.BOTTOM_RIGHT}
      isOpen={open}
      onClose={() => setOpen(false)}
    >
      <Button minimal onClick={() => setOpen(!open)}>
        {register ? "Register" : "Login"}
      </Button>
      <div>
        <FormGroup
          controller={controller}
          validate={emailAddress()}
          label="Username"
        />
        <FormGroup
          controller={controller}
          validate={notEmpty()}
          label="Password"
          type="password"
        />
        {register && (
          <FormGroup
            controller={controller}
            validate={(v, { password }) =>
              v === password || {
                valid: false,
                message: "Passwords must match"
              }
            }
            label="Verify password"
            type="password"
          />
        )}
        <ButtonGroup minimal fill>
          <Button minimal onClick={() => setRegister(!register)}>
            {register ? "Back" : "Register"}
          </Button>
          <Button onClick={register ? reg : login}>
            {register ? "Register" : "Login"}
          </Button>
        </ButtonGroup>
      </div>
    </Popover>
  );
};

export default withValidation()(User);
