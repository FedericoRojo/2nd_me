import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import { connect } from "react-redux";
import PropTypes from "prop-types"
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout"
import LoginModal from './auth/LoginModal';

class AppNavbar extends Component {
    //New way of present the state, get rid of the constructor()
    state = {
            isOpen: false
        }

    static propTypes = {
        auth : PropTypes.object.isRequired,
    }
    
    //Handler, change state to the oposite
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render(){

        const { isAuthenticated, user} = this.props.auth;

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem> 
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong> { user ? `Welcome ${user.name}` : null}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <NavbarBrand href="/">Shopping List</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            { isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);