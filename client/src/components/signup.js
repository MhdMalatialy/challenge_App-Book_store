import React, { Component } from 'react';
import axios from 'axios';
import { Button,Card} from 'react-bootstrap';
export default class SIGNUP extends Component {
    constructor(props) {
        super(props)
        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);        
        this.changePassword = this.changePassword.bind(this);
        this.changeRePassword = this.changeRePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            first_name:'',
            last_name:'',
            email: '',
            password:'',
            re_password:''
        }
    }

    changeFirstName(e) {
        this.setState({first_name: e.target.value })
    }

    changeLastName(e) {
        this.setState({ last_name: e.target.value })
    }
    changeEmail(e) {
        this.setState({ email: e.target.value })
    }

    changePassword(e) {
        this.setState({ password: e.target.value })
    }
    changeRePassword(e) {
        this.setState({ re_password: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        const userObject = {
            first_name: this.state.first_name,
            last_name:this.state.last_name,
            email: this.state.email,
            password:this.state.password,
            re_password:this.state.re_password
        };
        axios.post(' /user/signup', userObject)
            .then((res) => {
              window.location = "/"
            }).catch((error) => { 
               alert(error.response.data)
              
            });

        this.setState({first_name: '', last_name:'',email: '',password:'',re_password:'' })
    } 

    render (){
      return (
    <Card>
        <div className="center">
      <Card.Header>Signup</Card.Header></div>
      <Card.Body>
        <form onSubmit={this.onSubmit}>
          <div>
            <label className="label"> First name</label>
            <input type="text" value={this.state.first_name} onChange={this.changeFirstName} placeholder="first name" />
          </div>
          <div>
            <label className="label"> Last name</label>
            <input type="text" value={this.state.last_name} onChange={this.changeLastName} placeholder="last name" />
          </div>
          <div>
              <label className="label"> email</label>
              <input type="text" value={this.state.email} onChange={this.changeEmail} placeholder="example@example.com" />
          </div>
          <div>
            <label className="label"> password</label>
            <input type="password" value={this.state.password} onChange={this.changePassword} placeholder="Password" />
          </div>
          <div>
            <label className="label"> Confirm password</label>                  
            <input type="password" value={this.state.re_password} onChange={this.changeRePassword} placeholder="Password" />
          </div>
          <div className="center">
            <Button variant="outline-primary" type="submit" value="Create User" size="lg" class="center">Signup</Button>
          </div>
        </form>
    </Card.Body>
    </Card>)
    }
}