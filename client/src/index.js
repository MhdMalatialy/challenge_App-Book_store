import React from 'react'
import reactDom from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
// import 'materialize-css/dist/css/materialize.min.css'
import 'foundation-sites/dist/css/foundation.css'
import App from './components/App'
import reducers from './reducers'
import reduxThunk from 'redux-thunk';

const store = createStore (reducers, {}, applyMiddleware(reduxThunk))

reactDom.render(
<Provider store={store}>
    <App />
</Provider>,
    document.querySelector('#root'))
  