import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header'
import Landing from './landing'
// import 'foundation-sites/js/foundation.core'

import 'bootstrap/dist/css/bootstrap.min.css'
import './landing.css'

{/* <Link to={} className=""></ink> */}
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
               <Landing/>
           </div>
           <div className="grid-container">
               {/* <Route exact path="/user" component={}/> */}
           </div>     
           </BrowserRouter>
        </div>   
    )
}
}
export default connect(null, actions)(App);
