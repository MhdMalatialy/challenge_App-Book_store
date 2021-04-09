import {Component} from 'react'
import { connect } from 'react-redux'
import { Button,Container,Row ,Col,Form,Spinner,Card,FormControl,ButtonGroup} from 'react-bootstrap';
class Landing extends Component {
  renderContent(){
    switch(this.props.auth){
      case null:
        return <Spinner animation="grow" />
      case false:
          return(
    <div>
      <Container>
      <Row>
      <Col>
          <div class="login-box position-left">
            <div >
            <div class="large-12 columns">
            <Card>
              <div class="center">
            <Card.Header>Signup</Card.Header></div>
            <Card.Body>
              <form>
                <div>
                  <label class="label"> smile</label>
                  <input type="text" name="username" placeholder="Username" />
                </div>
                <div>
                  <label class="label"> smile</label>
                  <input type="text" name="username" placeholder="Username" />
                </div>
                <div>
                    <label class="label"> smile</label>
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <div>
                  <label class="label"> smile</label>
                  <input type="password" name="password" placeholder="Password" />
                </div>
                <div>
                  <label class="label"> smile</label>                  
                  <input type="password" name="password" placeholder="Password" />
                </div>
                <div class="center">
                  <Button variant="outline-primary" size="lg" class="center">Signup</Button>
                </div>
              </form>
          </Card.Body>
          </Card>
          </div>
          </div>
          </div>
        </Col>
        <Col>
  <div class="google-box">
        <Card>
  <Card.Header>Social login</Card.Header>
  <Card.Body>
    <Card.Title>Login using Google</Card.Title>
    <div class="google-btn" id="shadow">
      <a href="/auth/google">
  <div class="google-icon-wrapper">
    <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
  </div>
  <p class="btn-text"><b>Sign in with google</b></p>
    </a>
  </div>
  </Card.Body>
</Card>
        </div>
        </Col>
        </Row> 
        </Container>
    </div>

        )
      default:
        return (
          <Container>
            <Row>
              <div class="welcome-box">
                <div>
                  <h1 class="welcome-h1">
                    Book-Store
                  </h1>
                  <h2 class="welcome-h2">
                    The book which you looking for is here
                  </h2>
                </div>
              </div>
            </Row>
            <Row>
              <div class="search-box">
                  <Form>
                    <Container>
                      <Row>
                        <FormControl type="text" placeholder="Search" />
                      </Row>
                        <div class="button-style">
                          < Button variant="primary" size="lg" block>
                            Block level button
                          </Button>
                          <Button variant="secondary" block>
                            Block level button
                          </Button>
                        </div>
                 
                    </Container>
                  </Form>
              </div>
            </Row>
          </Container>
        )
    }
  }
    render(){
        return(
        <div>
            {this.renderContent()}
        </div>
        )}}
function mapStatToProps(state){
  return { auth: state.auth}
}
export default connect(mapStatToProps)(Landing);