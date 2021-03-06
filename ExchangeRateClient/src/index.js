import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducers from 'client/reducers'
import 'babel-polyfill'

import App from 'client/App'
import initialState from 'client/reducers/initialState'

// Generic body styles
import {body} from 'main.css'
document.body.className = body

export function run (elementId) {
  if (elementId == null) { // eslint-disable-line eqeqeq
    return false
  }

  const store = createStore(reducers, initialState)
  const targetElement = document.querySelector(elementId)

  // Save state before exiting the app
  window.onbeforeunload = () => {
    sessionStorage && sessionStorage.setItem('appState', JSON.stringify(store.getState()))
  }

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    targetElement,
  )
}
