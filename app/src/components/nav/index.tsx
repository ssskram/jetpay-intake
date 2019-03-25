import * as React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import Buttons from './buttons'
import AccountContainer from './accountContainer'

export default class NavMenu extends React.Component<{}, {}> {

  public render() {
    return (
      <Navbar
        inverse
        fixedTop
        fluid
        collapseOnSelect
        style={{ zIndex: 1000 as any }}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>JetPay</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse className='text-xs-center'>
          <Buttons />
          <AccountContainer />
        </Navbar.Collapse>
      </Navbar>
    )
  }
}