import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header'
import Landing from './landing'
import 'bootstrap/dist/css/bootstrap.min.css'
import './landing.css'
 
class App extends Component {
    componentDidMount() {  
      this.props.fetchUser();
    }
    render(){
    return(     
        <div>
           <BrowserRouter>
           <div>
               <Route exact path='/'>
               <Header/> 
               <Landing/>
               </Route>
           </div>
           {/* <div className="grid-container"> */}
               {/* <Route exact path="/verify" component={beforeVerify}/> */}
               {/* <Route exact path="/login" component={Login }/> */}
           {/* </div>      */}
           </BrowserRouter>
        </div>   
    )
}
}
export default connect(null, actions)(App);
