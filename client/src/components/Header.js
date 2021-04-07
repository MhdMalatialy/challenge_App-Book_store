import react ,{Component} from 'react'
import { connect } from 'react-redux'

class Header extends Component {
  renderContent(){
    switch(this.props.auth){
      case null:
        return 
      case false:
        return (
      <div class="top-bar">
        <div class="top-bar-left">
          <ul class=" menu">
            <li class="menu-text">
              <a href="/auth/google">Book-Store</a></li>
            {/* <li><a><button type="button" class="button alert">Sign in with Google</button></a></li> */}
          </ul>
        </div>
        <div class="top-bar-right">
          <form class="menu">
            <li><input type="search" placeholder="email"/></li>
            <li><input type="search" placeholder="password"/></li>
            <li><button type="button" class="button">Login</button></li>
          </form>
        </div>
      </div>)
      default:
        return (
          <div class="top-bar">
            <div class="top-bar-left">
              <ul class=" menu">
                <li class="menu-text">
                  <a href="/">Book-Store</a></li>
                {/* <li><a><button type="button" class="button alert">Sign in with Google</button></a></li> */}
              </ul>
            </div>
            <div class="top-bar-right">
              <form class="menu">
                <li><a href = "/user/logout"><button type="button" class="button">Logout</button></a></li>
              </form>
            </div>
          </div>)
    }
  }
    render(){
        return(
          <nav>
    {this.renderContent()}
          </nav>
        )}}
function mapStatToProps(state){
  return { auth: state.auth}
}


export default connect(mapStatToProps)(Header);