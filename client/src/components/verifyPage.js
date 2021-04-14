import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import axios from 'axios';
export default class Verify extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
    }

    // changeEmail(e) {
    //     const temp = cookies.get('login');
    //     const email = temp.preActiveUser.email
    //     this.setState({email})
    // }

    onSubmit(e) {
        e.preventDefault()
        const userObject = {
            email: this.props.email};
        axios.post('/verify/resend', userObject)
            .catch((error) => { 
               alert(error.response.data)
              
            });

    //     this.setState({email: ''})
    } 
    render (){
      return (
        <div className="verify-box">
        <div>
           <h1 className="welcome-h1">
               Welcome to Book-Store
           </h1>
           <h2 className="welcome-h2">
           Check your email to verify your account
           </h2>
         </div>
         <form onSubmit={this.onSubmit} >
            <Button type="submit" >Resend email</Button>
         </form>
        </div>
    )
    }
}