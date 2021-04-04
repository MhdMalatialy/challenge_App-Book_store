import react ,{Component} from 'react'
import { render } from 'react-dom'

class Header extends Component {
    render(){
        return(
            <nav className="top-bar topbar-responsive">
  <div className="top-bar-title">
    <a className="topbar-responsive-logo" href="/"><strong>Book-Store</strong></a>
  </div>
  <div id="topbar-responsive" className="topbar-responsive-links">
    <div className="top-bar-right">
      <ul className="menu simple vertical medium-horizontal">

        <li><a href="/auth/google">sign in</a></li>
        <li>
          <button type="button" className="button hollow topbar-responsive-button">Create New Account</button>
        </li>
      </ul>
    </div>
  </div>
</nav>

        )
    }
}
export default Header;