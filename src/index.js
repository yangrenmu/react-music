import React from 'react'
import ReactDOM from 'react-dom'
import { createStore} from 'redux'
import { Provider } from 'react-redux'
// import registerServiceWorker from './registerServiceWorker'
import './common/css/iconfont.css'
import './static/css/reset.css'
import Routers from './router/router.js'
import Reducers from './redux/Reducers/Reducers.js'

const store = createStore(Reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>,
  document.getElementById('root')
)
// registerServiceWorker();
