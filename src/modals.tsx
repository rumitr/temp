import React from "react";
import {
  Dialog,
  Classes,
  FormGroup,
  InputGroup,
  Button
} from "@blueprintjs/core";

// export default function

export function Login() {
  return (
    <Dialog isOpen className="bp3-dark" title="Login" icon="log-in">
      <div className={Classes.DIALOG_BODY}>
        <FormGroup label="Username">
          <InputGroup id="username" />
        </FormGroup>
        <FormGroup label="Password">
          <InputGroup id="password" type="password" />
        </FormGroup>
        <div>
          <Button minimal>Cancel</Button>
          <Button>Login</Button>
        </div>
      </div>
    </Dialog>
  );
}
