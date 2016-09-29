import React, { Component, PropTypes } from 'react';
import WebViewBridge from 'react-native-webview-bridge';
import uuid from 'uuid';
import { connect } from 'react-redux';
import {
  REDUX_BRIDGE_REGISTER_WEB_VIEW,
  REDUX_BRIDGE_UNREGISTER_WEB_VIEW,
} from '../common/actions';

class ReactBridgedWebView extends Component {
  static propTypes = {
    webComponentName: PropTypes.string.isRequired,
    registerWebView: PropTypes.func.isRequired,
    unregisterWebView: PropTypes.func.isRequired,
    dispatchUp: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.webViewId = uuid.v4();
  }

  componentDidMount() {
    const { registerWebView } = this.props;
    registerWebView(this.webViewId, this.webView);
  }

  componentWillUnmount() {
    const { unregisterWebView } = this.props;
    unregisterWebView(this.webViewId);
  }

  render() {
    const { dispatchUp, ...rest } = this.props;
    return (
      <WebViewBridge
        {...rest}
        ref={ref => { this.webView = ref; }}
        onBridgeMessage={message => {
          dispatchUp({ ...JSON.parse(message), webViewId: this.webViewId } );
        }}
        onLoad={() => { console.log('LOADED'); }}
        onError={err => { console.log(`ERROR ${err}`); }}
        renderError={err => { console.log(`RENDER ERROR ${err}`); }}
        source={{uri: 'http://localhost:8080/web/index.html'}}
        injectedJavaScript="start();"
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchUp: dispatch,
  registerWebView: (webViewId, webView) => dispatch({ type: REDUX_BRIDGE_REGISTER_WEB_VIEW, webViewId, webView }),
  unregisterWebView: webViewId => dispatch({ type: REDUX_BRIDGE_UNREGISTER_WEB_VIEW, webViewId }),
})

export default connect(null, mapDispatchToProps)(ReactBridgedWebView);
