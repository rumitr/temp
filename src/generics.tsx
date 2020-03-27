import React from "react";
import { Wrapper } from "@omarzion/validation";
import {
  FormGroup as OriginalFormGroup,
  InputGroup,
  Intent
} from "@blueprintjs/core";

function labelToName(label) {
  return `${label[0].toLowerCase()}${label.substr(1).replace(/\s/g, "")}`;
}

export function FormGroup({ name, validate, controller, label, id, ...rest }) {
  const wrapperProps = { validate, controller };
  return (
    <Wrapper name={name || labelToName(label)} {...wrapperProps}>
      {({ onChange, value, error, message }) => (
        <OriginalFormGroup
          label={label}
          helperText={message}
          intent={error ? "danger" : "default"}
        >
          <InputGroup
            value={value}
            intent={error ? "danger" : "default"}
            onChange={e => onChange(e.target.value)}
            id={id || label.toLowerCase().replace(/\s/g, "")}
            {...rest}
          />
        </OriginalFormGroup>
      )}
    </Wrapper>
  );
}
