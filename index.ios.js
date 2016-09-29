import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TabBarIOS,
} from 'react-native';
import { Provider, connect } from 'react-redux';
import WebViewBridge from 'react-native-webview-bridge';

import { createStore, applyMiddleware } from 'redux';
import uuid from 'uuid';
import { INCR, SELECT_TAB } from './app/actions';
import reducer from './app/reducer';
import RB from './redux-bridge'
const { webViewSyncMiddleware, ReactBridgedWebView } = RB;
import Cam from './Cam';

const store = createStore(
  reducer,
  applyMiddleware(webViewSyncMiddleware),
);

const injectScript = ``;

class App extends Component {
  render() {
    const { incrValue, incr, selectTab, selectedTab, showCamera } = this.props;
    return (
      <TabBarIOS
        unselectedTintColor="yellow"
        tintColor="white"
        barTintColor="darkslateblue"
      >
        <TabBarIOS.Item
          selected={selectedTab === 'incr'}
          title="incr"
          systemIcon="history"
          onPress={() => { selectTab('incr'); }}
          renderAsOriginal
        >
          <View style={styles.container}>
            <TouchableHighlight style={styles.incrContainer} onPress={() => { incr(); }}>
              <Text>
                {incrValue}
              </Text>
            </TouchableHighlight>
            <View style={styles.incrContainer}>
              <ReactBridgedWebView key="1"
                style={styles.incrContainer}
                webComponentName="Incr"
              />
            </View>
            <View style={styles.incrContainer}>
              <ReactBridgedWebView key="2"
                webComponentName="Incr"
              />
            </View>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={selectedTab === 'scanner'}
          title="scanner"
          systemIcon="history"
          onPress={() => { selectTab('scanner'); }}
          renderAsOriginal
        >
          <View style={styles.container}>
            { !showCamera ?
              <View style={styles.incrContainer}>
                <ReactBridgedWebView key="3"
                  webComponentName="Incr"
                />
              </View> :
              <View style={styles.incrContainer}>
                <Cam />
              </View>
            }
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const ConnectedApp = connect(
  ({
    selectedTab,
    tabs: {
      incr: incrValue,
      camera: {
        show: showCamera,
      }
    }
  }) => ({
    selectedTab,
    incrValue,
    showCamera,
  }),
  dispatch => ({
    incr: () => dispatch({ type: INCR }),
    selectTab: tab => dispatch({ type: SELECT_TAB, tab }),
  })
)(App);

class ReduxBridge extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
    paddingBottom: 20,
  },
  incrContainer: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('ReduxBridge', () => ReduxBridge);
