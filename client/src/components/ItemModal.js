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
} from "reactstrap";
import {connect} from "react-redux"
import {addItem} from "../actions/itemActions"
import '../App.css';


class ItemModal extends Component {
    state = {
        name: "",
        price: "",
        modal: false,
    }

    toggle = (e) => {
        
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        const {name, price, value} = e.target
        this.setState({
            [name]: value,
            [price]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            name: this.state.name,
            price: this.state.price
        }
        this.props.addItem(newItem);
            
        //Close the modal
        this.toggle();
        
    }

    render() {
        return(
            <div>
                <Button
                color= "dark"
                style= {{marginBottom: "2rem"}}
                onClick={this.toggle}
                >Add Item</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} name='modal'>
                    <ModalHeader toggle={this.toggle}>Add to ShoppingList</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                    id="item"
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                ></Input>
                                <div className='uploadContainer'>
                                    <Label for="price">Price</Label>
                                    <Input 
                                        id="price"
                                        type="text" 
                                        name="price" 
                                        value={this.state.price}
                                        onChange={this.onChange}/>
                                </div>
                                <Button
                                color="dark"
                                style={{marginTop: "2rem"}}
                                block
                                >Add item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    item: state.item
})

export default connect (mapStateToProps, {addItem}) (ItemModal);