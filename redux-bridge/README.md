# ReduxBridge, sync native and web

ReduxBrdige let you easily share your redux state between you react native application and sub webviews

## Minimal API
```javascript
// index.ios.js

import {
  middleware as reduxBridgeMiddleware,
  ReactBridgedWebView,
} from './redux-bridge/native';

class Container extends Component {
  render() {
    return (
      <ReactBridgedWebView webComponentName="Incr" />
    );
  }
}

const store = createStore(
  reducer,
  applyMiddleware(
    reduxBridgeMiddleware,
  ),
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
```

## Examples
```javascript
import {
  middleware as reduxBridgeMiddleware,
  ReactBridgedWebView,
} from './redux-bridge/native';
```
