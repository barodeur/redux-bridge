import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import uuid from 'uuid';
import Fastclick from 'fastclick';
import reduxBridgeReducer from '../redux-bridge/reduxBridgeReducer';
import webViewSyncMiddleware from '../redux-bridge/webViewSyncMiddleware';
import { INCR, SHOW_CAMERA } from '../app/actions';
import reducer from '../app/reducer';


class World extends React.Component {
  render() {
    const { incrValue, incr, showCamera, barcodeValue } = this.props;
    return (
      <div>
        <div>
          {incrValue}
          <button onClick={() => { incr(); }}>INCR</button>
        </div>
        <div>
          {barcodeValue}
          <button onClick={() => { showCamera(); }}>SHOW CAMERA</button>
        </div>
      </div>
    )
  }
}

const ConnectedWorld = connect(
  ({ tabs: {
    incr: incrValue,
    camera: {
      value: barcodeValue,
    },
  } }) => ({ incrValue }),
  dispatch => ({
    incr: () => dispatch({ type: INCR }),
    showCamera: () => dispatch({ type: SHOW_CAMERA }),
  }),
)(World);

window.start = () => {
  if (!window.WebViewBridge) {
    return;
  }

  const store = createStore(reduxBridgeReducer(reducer), applyMiddleware(webViewSyncMiddleware));

  Fastclick.attach(window.document.body);

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedWorld/>
    </Provider>,
    document.getElementById('app')
  );
}

window.document.addEventListener('DOMContentLoaded', start, false);
