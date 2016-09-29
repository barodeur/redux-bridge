import * as actions from './actions';
import WebViewBridgeManager from './WebViewBridgeManager';
import uuid from 'uuid';

const {
  REDUX_BRIDGE_REGISTER_WEB_VIEW,
  REDUX_BRIDGE_UNREGISTER_WEB_VIEW,
  REDUX_BRIDGE_SYNC_INITIAL_STATE,
  REDUX_BRIDGE_REQUEST_STATE_SYNC,
} = actions;


export default store => {
  const { WebViewBridge } = window || {};
  const storeUUID = uuid.v4();

  if (WebViewBridge) {
    WebViewBridge.onMessage = message => {
      console.log(message);
      store.dispatch(JSON.parse(message));
    };
    WebViewBridge.send(JSON.stringify({ type: REDUX_BRIDGE_REQUEST_STATE_SYNC }));

    return next => action => {
      console.log(action);
      if (action.storeUUID) {
        if (action.storeUUID !== storeUUID) {
          next(action);
        }
      } else {
        action.storeUUID = storeUUID;
        next(action);
        WebViewBridge.send(JSON.stringify(action));
      }
    }
  }

  const webViewBridgeManager = new WebViewBridgeManager();

  return next => action =>  {
    console.log(action);
    if (actions[action.type]) {
      const { webViewId } = action;
      switch(action.type) {
        case REDUX_BRIDGE_REGISTER_WEB_VIEW:
          const { webView } = action;
          webViewBridgeManager.register(webViewId, webView);
          return;
        case REDUX_BRIDGE_UNREGISTER_WEB_VIEW:
          webViewBridgeManager.unregister(webViewId);
          return;
        case REDUX_BRIDGE_REQUEST_STATE_SYNC:
          webViewBridgeManager.sendToBridge(webViewId, JSON.stringify({
            type: REDUX_BRIDGE_SYNC_INITIAL_STATE,
            state: store.getState(),
          }));
          return;
      }
    }
    if (!action.storeUUID) {
      action.storeUUID = storeUUID;
    }
    let result = next(action);
    webViewBridgeManager.broadcast(JSON.stringify(action));
    return result;
  };
};
