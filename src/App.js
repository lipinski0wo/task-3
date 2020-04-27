import React, { Fragment } from 'react'
import Article from './components/article/Article'
import Fixed from './components/fixed/Fixed'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Article} />
            <Route render={() => <Redirect to='/' />} />
          </Switch>
          <Fixed />
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
