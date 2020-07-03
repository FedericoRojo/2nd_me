import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions"
import { NavLink } from "reactstrap"

class Logout extends Component {

    render(){
        return (
            <NavLink onClick={this.props.logout} href="#">
                Logout
            </NavLink>
        )
    }
}

export default connect( null, { logout }) (Logout);