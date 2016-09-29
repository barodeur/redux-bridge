import uuid from 'uuid';
import {
  REDUX_BRIDGE_REGISTER_WEB_VIEW,
  REDUX_BRIDGE_REQUEST_INITIAL_STATE,
} from '../common/actions';


export default store => {
  const { WebViewBridge } = window || {};
  const storeUUID = uuid.v4();

  if (WebViewBridge) {
    WebViewBridge.onMessage = message => {
      store.dispatch(JSON.parse(message));
    };
    WebViewBridge.send(JSON.stringify({ type: REDUX_BRIDGE_REQUEST_INITIAL_STATE }));
  }

  return next => action => {
    if (action.storeUUID) {
      if (action.storeUUID !== storeUUID) {
        return next(action);
      }
    } else {
      action.storeUUID = storeUUID;
      if (WebViewBridge) {
        WebViewBridge.send(JSON.stringify(action));
      }
      return next(action);
    }

  };
};
