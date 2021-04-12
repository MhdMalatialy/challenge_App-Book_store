import React, { Component } from 'react';
import axios from 'axios';
export default class login extends Component {
    constructor(props) {
        super(props)
        this.changeEmail = this.changeEmail.bind(this);        
        this.changePassword = this.changePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password:''
        }
    }
    changeEmail(e) {
        this.setState({ email: e.target.value })
    }

    changePassword(e) {
        this.setState({ password: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        const userObject = {
            email: this.state.email,
            password:this.state.password
        };
        axios.post(' /user/login', userObject)
            .then((res) => {
              window.location = "/"
            }).catch((error) => { 
               alert(error.response.data)
              
            });

        this.setState({email: '',password:'' })
    } 

    render (){
      return (
        <form onSubmit={this.onSubmit} class="menu">
            <div><input type="text" value={this.state.email} onChange={this.changeEmail} placeholder="email"/></div>
            <div><input type="password" value={this.state.password} onChange={this.changePassword} placeholder="Password"/></div>
            <div><button type="submit" className="button">Login</button></div>
        </form>
    )
    }
}