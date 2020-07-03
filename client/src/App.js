import React, { Component } from 'react';

//Redux
import store from "./store"
import {Provider} from "react-redux";
import {loadUser} from "./actions/authActions"

//ReactStrap
import { Container } from "reactstrap"


//Import components
import AppNavbar from './components/AppNavBar';
import ShoppingList from "./components/ShoppingList"
import ItemModal from "./components/ItemModal"

//Styles
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

class App extends React.Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render(){
    return (
      <React.StrictMode>
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
      </React.StrictMode>
    );
  }
}

export default App;
