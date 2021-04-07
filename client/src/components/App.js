import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header'

const welcome = () => <p>welcome</p>
const newPost = () => <h2>newPost</h2>

class App extends Component {
    componentDidMount() {
      this.props.fetchUser();
    }
    render(){
    return(
        <div>
           <BrowserRouter>
           <div>
               <Header/>               
           </div>
           <div className="grid-container">
               <Route exact path="/" component={welcome}/>
               <Route  path="/user" component={newPost}/>
           </div>           
           </BrowserRouter>
        </div>   
    )
}
}
export default connect(null, actions)(App);
