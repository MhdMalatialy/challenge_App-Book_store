import {Component} from 'react'
import { connect } from 'react-redux'
import { Container,Row ,Col,Spinner,Card} from 'react-bootstrap';
import SIGNUP from './signup'
import Cookies from 'universal-cookie'
import Verify from './verifyPage';
import SearchPage from './homePage'
const cookies = new Cookies()
class Landing extends Component {
  renderContent(){
    let email
    const temp = cookies.get('login');

    if(temp &&  temp.preActiveUser){
      email = temp.preActiveUser.email
    }
    
    switch(this.props.auth){
      case null:
        return <Spinner className ="search-box" animation="grow" />
      case false:
          return(
    <div>
      <Container>
      <Row>
      <Col>
          <div className="login-box position-left">
            <div >
              <div className="large-12 columns">
                <SIGNUP/>
          </div>
          </div>
          </div>
        </Col>
        <Col>
  <div className="google-box">
        <Card>
  <Card.Header>Social login</Card.Header>
  <Card.Body>
    <Card.Title>Login using Google</Card.Title>
    <div className="google-btn" id="shadow">
      <a href="/auth/google">
  <div className="google-icon-wrapper">
    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
  </div>
  <p className="btn-text"><b>Sign in with google</b></p>
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
        if(this.props.auth.user){
        return (
          <SearchPage/>
        )
          }
          else{
            return <Verify email={email} />
          }
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