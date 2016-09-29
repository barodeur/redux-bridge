# ReduxBridge, sync native and web

ReduxBrdige let you easily share your redux state between you react native application and sub webviews

## Minimal API
```javascript
// /actions.js
export const INCR = 'INCR';
```

```javascript
// /reducer.js
import { REDUX_BRIDGE_SYNC_INITIAL_STATE } from 'redux-bridge/common/actions';
import { INCR } from './actions';

export default (state = 0, action) => {
  switch (action.type) {
    case REDUX_BRIDGE_SYNC_INITIAL_STATE:
      return action.state;
    case INCR:
      return state + 1;
  }
  return state;
};
```

```javascript
// /index.ios.js

// React Native imports
import { Component } from 'react';
import { View, Text } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';

// Redux Bridge imports
import {
  middleware as reduxBridgeMiddleware,
  ReactBridgedWebView,
} from 'redux-bridge/native';

// Your App imports
import { INCR } './actions';
import reducer  from './reducer';

class IncrWeb extends Component {
  render() {
    return (
      <ReactBridgedWebView webComponentName="Incr" />
    );
  }
}

@connect(state => ({ state }));
class IncrNative extends Component {
  render() {
    const { state, dispatch } = this.props;
    return (
      <TouchableHighlight
        onPress={() => { dispatch({ type: INCR }); }}
      >
        <Text>
          {state}
        </Text>
      </TouchableHighlight>
    )
  }
}

class Container extends Component {
  render() {
    return (
      <View styles={{ flex: 1 }}>
        <IncrNative styles={{ flex: 1}} />
        <IncrWeb styles={{ flex: 1 }} />
        <IncrWeb styles={{ flex: 1 }} />
      </View>
    );
  }
}


const store = createStore(
  reducer,
  applyMiddleware(
    reduxBridgeMiddleware({
      webRootUri: 'http://localhost:8080/index.html',
    }),
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

```javascript
// /index.web.js

// React imports
import { Component } from 'react';
import { render } from 'react-web';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';

// Redux Bridge imports
import {
  middleware as reduxBridgeMiddleware,
  REDUX_BRIDGE_SYNC_INITIAL_STATE,
  registerWebComponent,
  registerStore,
} from 'redux-bridge/web';

// Your app imports
import { INCR } from './actions';
import { reducer } from './reducer';

@connect(state => ({ state }))
class Incr extends Component {
  render() {
    const { state } = this.props;
    return (
      <div>
        {state}
        <button
          onClick={() => { dispatch({ type: INCR }); }}
        >INCR</button>
      </div>
    )
  }
}

// Make it accessible as a standalone component
registerWebComponent('Incr', () => Incr);

const store = createStore(
  reducer,
  applyMiddleware(
    reduxBridgeMiddleware(),
  )
)
registerStore(() => store);

class App extends Component {
  render() {
    <Provider store={store}>
      <Incr />
    </Provider>
  }
}

render(App, document.getElementById('app'));
```
