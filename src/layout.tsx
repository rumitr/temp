import React, { useReducer, useState, useContext } from "react";

import { Navbar, Alignment, Icon } from "@blueprintjs/core";

import UserPopover from "./userPopover";

import Sidebar from "./sidebar";

function Layout({ children, header }) {
  return (
    <div className="bp3-dark layout-container">
      <Sidebar />
      <div className="layout">
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>
              <Icon icon="inbox" />
            </Navbar.Heading>
            <Navbar.Divider />
            <Navbar.Heading>{header}</Navbar.Heading>
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            <UserPopover />
          </Navbar.Group>
        </Navbar>
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
