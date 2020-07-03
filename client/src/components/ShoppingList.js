import React, {Component} from "react";
import {
    Container, 
    ListGroup, 
    ListGroupItem, 
    Button,} from "reactstrap";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";


class ShoppingList extends Component {
   
    state = {
        dropdownOpen: false,
    }

    componentDidMount(){
        this.props.getItems();
    } 

    onClickDeleteItem = (id) => {
        this.props.deleteItem(id);
    }



    render() {
        const { items } = this.props.item;
        return(
            <React.StrictMode>
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map( ({_id, name, price}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        style={{marginRight: "0.5rem"}}
                                        onClick={ () => {
                                            this.setState(this.onClickDeleteItem.bind(this, _id));
                                        }}>
                                    &times;</Button>
                                    {name}{` $ ${price}`}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
            </React.StrictMode>
        )
    }

}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);