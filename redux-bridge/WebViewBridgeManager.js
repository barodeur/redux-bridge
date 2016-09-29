export default class WebViewBridgeManager {
  constructor() {
    this._webViews = {};
  }

  register(webViewId, webView) {
    console.log('register');
    this._webViews[webViewId] = webView;
    console.log(this._webViews);
  }

  unregister(webViewId) {
    console.log('unregister');
    delete this._webViews[webViewId];
    console.log(this._webViews);
  }

  sendToBridge(webViewId, message) {
    console.log(this._webViews);
    this._webViews[webViewId].sendToBridge(message);
  }

  broadcast(message) {
    for (const [,webView] of Object.entries(this._webViews)) {
      webView.sendToBridge(message);
    }
  }
}
