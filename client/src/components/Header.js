import react ,{Component} from 'react'
import { render } from 'react-dom'

class Header extends Component {
    render(){
        return(
            <nav class="top-bar topbar-responsive">
  <div class="top-bar-title">
    <a class="topbar-responsive-logo" href="/"><strong>Book-Store</strong></a>
  </div>
  <div id="topbar-responsive" class="topbar-responsive-links">
    <div class="top-bar-right">
      <ul class="menu simple vertical medium-horizontal">

        <li><a href="/auth/google">sign in</a></li>
        <li>
          <button type="button" class="button hollow topbar-responsive-button">Create New Account</button>
        </li>
      </ul>
    </div>
  </div>
</nav>

        )
    }
}
export default Header;