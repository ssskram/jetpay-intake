import * as React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const btnStyle = {
  fontSize: "16px",
  margin: "10px 5px"
};

export default class ActionButtons extends React.Component<{}, {}> {
  render() {
    return (
      <Nav>
        <LinkContainer to={"/policy"}>
          <NavItem>
            <button className="btn btn-secondary" style={btnStyle}>
              Rules, Regulations, & Process
            </button>
          </NavItem>
        </LinkContainer>
        <LinkContainer to={"/faq"}>
          <NavItem>
            <button className="btn btn-secondary" style={btnStyle}>
              FAQ
            </button>
          </NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}
