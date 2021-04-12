import {Component} from 'react'
import { connect } from 'react-redux'
import Login from './login'


class Header extends Component {
  renderContent(){
    switch(this.props.auth){
      case null:
        return 
      case false:
        return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className=" menu">
            <li className="menu-text">
              <a href="/">Book-Store</a></li>
          </ul>
        </div>
        <div className="top-bar-right">
          <Login/>
        </div>
      </div>)
      default:
        return (
          <div className="top-bar">
            <div className="top-bar-left">
              <ul className=" menu">
                <li className="menu-text">
                  <a href="/">Book-Store</a></li>
              </ul>
            </div>
            <div className="top-bar-right">
              <form className="menu">
                <li><a href = "/user/logout" ><button type="button" className="button">Logout</button></a></li>
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