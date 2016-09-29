import uuid from 'uuid';
import * as actions from '../common/actions';
import WebViewBridgeManager from './WebViewBridgeManager';

const {
  REDUX_BRIDGE_REGISTER_WEB_VIEW,
  REDUX_BRIDGE_UNREGISTER_WEB_VIEW,
  REDUX_BRIDGE_SYNC_INITIAL_STATE,
  REDUX_BRIDGE_REQUEST_INITIAL_STATE,
} = actions;

export default store => {
  const storeUUID = uuid.v4();

  const webViewBridgeManager = new WebViewBridgeManager();

  return next => action =>  {
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
        case REDUX_BRIDGE_REQUEST_INITIAL_STATE:
          webViewBridgeManager.sendToBridge(webViewId, JSON.stringify({
            type: REDUX_BRIDGE_SYNC_INITIAL_STATE,
            state: store.getState(),
            storeUUID,
          }));
          return;
      }
    }

    if (!action.storeUUID) {
      action.storeUUID = storeUUID;
    }
    webViewBridgeManager.broadcast(JSON.stringify(action));
    return next(action);
  };
};
