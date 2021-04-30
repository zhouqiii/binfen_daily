// 本文件内函数为系统常用函数、H5与app原生交互函数、微信相关函数

// 判断当前操作系统及app版本
const APPSYS = () => {
  let s;
  const u = navigator.userAgent;
  const v = navigator.appVersion;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isAndroid) {
    s = 'Android';
  } else if (isIOS) {
    s = 'IOS';
  } else {
    s = 'Android';
  }
  return {
    v,
    s,
  };
};

// 判断浏览器是否为IE
function isIE() {
  const bw = window.navigator.userAgent;
  const compare = (s) => bw.indexOf(s) >= 0;
  const ie11 = (() => 'ActiveXObject' in window)();
  return compare('MSIE') || ie11;
}

// 与缤纷生活的交互方法jsBridge
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(window.WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      () => {
        callback(window.WebViewJavascriptBridge);
      },
      false,
    );
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  const WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
  return window.WVJBCallbacks;
}

// 调用app原生函数
const callAppMethod = (obj) => {
  const { callName = '', parameters = {}, callback = () => { } } = obj;
  if (!callName) {
    return;
  }
  setupWebViewJavascriptBridge((bridge) => {
    bridge.callHandler(callName, parameters, callback);
  });
};

/* 手机银行判断APP版本号 */
function versionCompare(version1, version2) {
  const v1 = version1.split('.');
  const v2 = version2.split('.');
  for (let i = 0; i < v1.length; i++) {
    if (v1[i] * 1 > v2[i] * 1) {
      return 1;
    }
    if (v1[i] * 1 < v2[i] * 1) {
      return -1;
    }
  }
  return 0;
}

/* 手机银行打开H5页面公共方法
 * url是跳转连接
 * name是头部名称
 */
function bocOpenPage(item) {
  // 通过Cordova方法去打开H5页面
  // 请求参数，JSON格式，如果不需要可以为空 ,url:是跳转的链接，name是头部名称
  const setting = {
    page: '1',
    url: item.urls,
    title: item.name,
  };
  /* c_plugins为引入的Cordova配置文件，
  * crcdMerchantBridge为Cordova配套文件的名称
  * goToNative为请求方法的名称
  * 请求交互方式为：请求方法名(成功返回方法，失败返回方法，请求参数) */
  this.c_plugins.crcdMerchantBridge.goToNative((data) => {
    console.log(data);
    // success callback
  }, (err) => {
    console.log(err);
    // error callback
  }, setting);
}

/* *手机银行APP下载方法 */
function bocAppDownLoad() {
  const urls = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.chinamworld.bocmbci';
  window.location.href = urls;
}

function bocAppDownLoad2() {
  let url = window.location.href;
  url = url.replace(/isShareLink/g, 'placeholder');
  const urlData = { url };
  const baseUrl = 'bocmbciphone://h5/promotionPage?gctExtraParams=';
  const txBaseUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.chinamworld.bocmbci';
  const userUrl = encodeURIComponent(JSON.stringify(urlData));
  const endUrl = encodeURIComponent(`${baseUrl}${userUrl}`);
  const txUrl = `${txBaseUrl}&android_scheme=${endUrl}&ios_scheme=${endUrl}`;
  return txUrl;
}

/* 是否显示顶部标题
 * @return true:显示，false:不显示
 * */
function isShowTopTitles() {
  const shareLen = window.location.href.indexOf('/share');
  const shareLens = window.location.href.indexOf('/mainPageShare');
  const fromLen = window.location.href.indexOf('&from');
  if (shareLens > 0 || shareLen >= 0 || fromLen > 0) {
    return false;
  }
  return true;
}

/**
 * 是否在APP内
 * @return:false:不在APP内 true:在APP内
 */
function isInApp(channel) {
  let result = true;
  const Navigator = navigator.userAgent.toLowerCase();
  const isWx = Navigator.match(/MicroMessenger/i) === 'micromessenger';
  const isWeibo = Navigator.match(/weibo/i) === 'weibo';
  if (channel === '3' || channel === '4' || channel === '6') { // 3-微信公众 4-小程序
    result = true;
  } else if (isWx || isWeibo) {
    result = false;
  }
  return result;
}

/* 与客户端交互 */
function gotoApp(parameter) {
  callAppMethod({
    callName: 'goBannerModel',
    parameters: parameter,
  });
}

/* 跳转客户端登录 */
function gotoLogin() {
  callAppMethod({
    callName: 'toLogin',
  });
}

/* 请求超时-跳转客户端登录 */
function gotoLoginByTimeOut() {
  callAppMethod({
    callName: 'clearLoginInfo',
  });
  gotoLogin();
}

export {
  APPSYS,
  isIE,
  callAppMethod,
  versionCompare,
  bocOpenPage,
  bocAppDownLoad,
  bocAppDownLoad2,
  isShowTopTitles,
  isInApp,
  gotoApp,
  gotoLogin,
  gotoLoginByTimeOut,
};
