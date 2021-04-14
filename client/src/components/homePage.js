import React, { Component } from 'react';
import axios from 'axios';
import {Button,Row, Form,Container,FormControl, Card} from 'react-bootstrap';
export default class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.changeField = this.changeField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            field:'',
            title:'',
            author:'',
            description:'',
            image:'',
            color:''
        }
    }
    changeField(e) {
        this.setState({field: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const query = {
            method: 'GET',
            url: '/user/search',
            params: {q: this.state.field},
          };
        axios.request(query)
            .then((res) => {
               this.setState({
                   title:res.data.result.title,
                   author:('By '+res.data.result.author),
                   description:res.data.result.description,
                   image:res.data.result.image,
                   color:'white'
                }) 
            }).catch((error) => { 
                alert(error.response.data) 
            });
        this.setState({
            field:'',
            title:'',
            author:'',
            description:'',
            image:'',
            color:''
        })
    } 
    render (){
      return (
      <Container>
          <Row>
              <div className="welcome-box">
                  <div>
                      <h1 className="welcome-h1">
                          Book-Store
                          </h1>
                          <h1>{this.state.result}</h1>
                          <h2 className="welcome-h2">
                          Perfect Books Are Here
                              </h2>
                    </div>
                </div>
            </Row>
          <Row>
              <div className="search-box">
                    <Form onSubmit={this.onSubmit}>
                        <Container>
                            <Row>
                              <FormControl type="text" value={this.state.field} onChange={this.changeField} placeholder="Search" />
                            </Row>
                                <div className="button-style">
                                    < Button type="submit"  variant="primary" size="lg" block>
                                    Get description
                                    </Button>
                                </div>
                        </Container>
                    </Form>
               </div>
            </Row>
            <Row>
            <div className="photo">
            <div style={{backgroundColor:this.state.color}}>
            <Card className="noBack">
                <Card.Title className="center">{this.state.title}</Card.Title>
                <Card.Header>{this.state.author}</Card.Header>
                <Card.Body>{this.state.description}</Card.Body>
                <Card.Img   src={this.state.image} />
            </Card>
            </div>
            </div>
            </Row>
              
            
    </Container>
 )
    }
}