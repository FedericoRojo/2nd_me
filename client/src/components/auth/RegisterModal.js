import React, {Component} from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from "reactstrap";
import {connect} from "react-redux";
import { registerUser } from "../../actions/authActions"
import { clearErrors } from "../../actions/errorActions"
import PropTypes from "prop-types";


class RegisterModal extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        msg: null,
        modal: false,
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        registerUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevState){
        const {error, isAuthenticated} = this.props;
        if(error !== prevState.error){
            if(error.id === 'REGISTER_FAIL'){
                this.setState({
                    msg: error.msg
                })
            }else{
                this.setState({
                    msg: null
                })
            }
        }
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle()
            }
        } 
    }

    toggle = (e) => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        const {name, email, password, value} = e.target
        this.setState({
            [name]: value,
            [email]: value,
            [password]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }

        this.props.registerUser(newUser);

        //Close the modal
        //this.toggle();
    }

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href="#" >Register</NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle} name='modal'>
                    <ModalHeader toggle={this.toggle}>Registeration</ModalHeader>
                    {this.state.msg ? <Alert color="danger">{this.state.msg }</Alert> : null}
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    className="mb-3"
                                    onChange={this.onChange}
                                ></Input>
                                <Label for="email">Email</Label>
                                <Input 
                                    id="email"
                                    type="email" 
                                    name="email" 
                                    value={this.state.email}
                                    className="mb-3"
                                    onChange={this.onChange}/>
                                <Label for="password">Password</Label>
                                <Input 
                                    id="password"
                                    type="password" 
                                    name="password" 
                                    value={this.state.password}
                                    className="mb-3"
                                    onChange={this.onChange}/>
                                <Button
                                color="dark"
                                style={{marginTop: "2rem"}}
                                block
                                >Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect (mapStateToProps, { registerUser, clearErrors }) (RegisterModal);