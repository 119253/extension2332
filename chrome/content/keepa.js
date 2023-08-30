var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function(c, v, h) {
  if (null == c) {
    throw new TypeError("The 'this' value for String.prototype." + h + " must not be null or undefined");
  }
  if (v instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + h + " must not be a regular expression");
  }
  return c + "";
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, v, h) {
  c != Array.prototype && c != Object.prototype && (c[v] = h.value);
};
$jscomp.getGlobal = function(c) {
  return "undefined" != typeof window && window === c ? c : "undefined" != typeof global && null != global ? global : c;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(c, v, h, u) {
  if (v) {
    h = $jscomp.global;
    c = c.split(".");
    for (u = 0; u < c.length - 1; u++) {
      var p = c[u];
      p in h || (h[p] = {});
      h = h[p];
    }
    c = c[c.length - 1];
    u = h[c];
    v = v(u);
    v != u && null != v && $jscomp.defineProperty(h, c, {configurable:!0, writable:!0, value:v});
  }
};
$jscomp.polyfill("String.prototype.startsWith", function(c) {
  return c ? c : function(c, h) {
    var v = $jscomp.checkStringArgs(this, c, "startsWith");
    c += "";
    var p = v.length, E = c.length;
    h = Math.max(0, Math.min(h | 0, v.length));
    for (var G = 0; G < E && h < p;) {
      if (v[h++] != c[G++]) {
        return !1;
      }
    }
    return G >= E;
  };
}, "es6", "es3");
$jscomp.polyfill("String.prototype.endsWith", function(c) {
  return c ? c : function(c, h) {
    var v = $jscomp.checkStringArgs(this, c, "endsWith");
    c += "";
    void 0 === h && (h = v.length);
    h = Math.max(0, Math.min(h | 0, v.length));
    for (var p = c.length; 0 < p && 0 < h;) {
      if (v[--h] != c[--p]) {
        return !1;
      }
    }
    return 0 >= p;
  };
}, "es6", "es3");
$jscomp.findInternal = function(c, v, h) {
  c instanceof String && (c = String(c));
  for (var u = c.length, p = 0; p < u; p++) {
    var E = c[p];
    if (v.call(h, E, p, c)) {
      return {i:p, v:E};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.prototype.find", function(c) {
  return c ? c : function(c, h) {
    return $jscomp.findInternal(this, c, h).v;
  };
}, "es6", "es3");
(function() {
  var c = window, v = !1;
  String.prototype.hashCode = function() {
    var a = 0, b;
    if (0 === this.length) {
      return a;
    }
    var d = 0;
    for (b = this.length; d < b; d++) {
      var e = this.charCodeAt(d);
      a = (a << 5) - a + e;
      a |= 0;
    }
    return a;
  };
  var h = "optOut_crawl revealStock s_boxOfferListing s_boxType s_boxHorizontal webGraphType webGraphRange overlayPriceGraph".split(" "), u = window.opera || -1 < navigator.userAgent.indexOf(" OPR/"), p = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"), E = -1 < navigator.userAgent.toLowerCase().indexOf("edge/"), G = /Apple Computer/.test(navigator.vendor) && /Safari/.test(navigator.userAgent), H = !u && !p && !E && !G, O = H ? "keepaChrome" : u ? "keepaOpera" : G ? "keepaSafari" : E ? 
  "keepaEdge" : "keepaFirefox", Z = p ? "Firefox" : G ? "Safari" : H ? "Chrome" : u ? "Opera" : E ? "Edge" : "Unknown", A = null, J = !1;
  try {
    J = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  } catch (a) {
  }
  if (H) {
    try {
      chrome.runtime.sendMessage("hnkcfpcejkafcihlgbojoidoihckciin", {type:"isActive"}, null, function(a) {
        chrome.runtime.lastError || a && a.isActive && (v = !0);
      });
    } catch (a) {
    }
  }
  try {
    chrome.runtime.onUpdateAvailable.addListener(function(a) {
      chrome.runtime.reload();
    });
  } catch (a) {
  }
  var P = {}, Q = 0;
  chrome.runtime.onMessage.addListener(function(a, f, d) {
    if (f.tab && f.tab.url || f.url) {
      switch(a.type) {
        case "restart":
          document.location.reload(!1);
          break;
        case "setCookie":
          chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:a.key, value:a.val, secure:!0, expirationDate:(Date.now() / 1000 | 0) + 31536E3});
          "token" == a.key ? A != a.val && 64 == a.val.length && (A = a.val, b.set("token", A), setTimeout(function() {
            document.location.reload(!1);
          }, 300)) : b.set(a.key, a.val);
          break;
        case "getCookie":
          return chrome.cookies.get({url:"https://keepa.com/extension", name:a.key}, function(a) {
            null == a ? d({value:null}) : d({value:a.value});
          }), !0;
        case "openPage":
          chrome.windows.create({url:a.url, incognito:!0});
          break;
        case "isPro":
          b.stockData ? d({value:b.stockData.pro, stockData:b.stockData}) : d({value:null});
          break;
        case "getStock":
          return b.addStockJob(a, function(e) {
            0 < e.errorCode && a.cachedStock ? d(a.cachedStock) : 5 == e.errorCode || 9 == e.errorCode ? (9 == e.errorCode && (a.getNewId = !0), setTimeout(function() {
              b.addStockJob(a, d);
            }, 1)) : d(e);
          }), !0;
        case "getFilters":
          d({value:w.getFilters()});
          break;
        case "sendData":
          f = a.val;
          if (null != f.ratings) {
            var e = f.ratings;
            if (1000 > Q) {
              if ("f1" == f.key) {
                if (e) {
                  for (var B = e.length; B--;) {
                    var g = e[B];
                    null == g || null == g.asin ? e.splice(B, 1) : (g = f.domainId + g.asin + g.ls, P[g] ? e.splice(B, 1) : (P[g] = 1, Q++));
                  }
                  0 < e.length && n.sendPlainMessage(f);
                }
              } else {
                n.sendPlainMessage(f);
              }
            } else {
              P = null;
            }
          } else {
            n.sendPlainMessage(f);
          }
          d({});
          break;
        case "optionalPermissionsRequired":
          d({value:(H || p || u) && "undefined" === typeof chrome.webRequest});
          break;
        case "optionalPermissionsDenied":
          b.set("optOut_crawl", "1");
          console.log("optionalPermissionsDenied");
          d({value:!0});
          break;
        case "optionalPermissionsInContent":
          f = a.val;
          "undefined" != typeof f && (f ? (b.set("optOut_crawl", "0"), console.log("granted"), chrome.runtime.reload()) : (b.set("optOut_crawl", "1"), l.reportBug("permission denied"), console.log("denied")));
          d({value:!0});
          break;
        case "optionalPermissions":
          return "undefined" === typeof chrome.webRequest && chrome.permissions.request({permissions:["webRequest", "webRequestBlocking"]}, function(a) {
            chrome.runtime.lastError || (d({value:a}), "undefined" != typeof a && (a ? (b.set("optOut_crawl", "0"), console.log("granted"), chrome.runtime.reload()) : (b.set("optOut_crawl", "1"), l.reportBug("permission denied"), console.log("denied"))));
          }), !0;
        default:
          d({});
      }
    }
  });
  window.onload = function() {
    p ? chrome.storage.local.get(["install", "optOutCookies"], function(a) {
      a.optOutCookies && 3456E5 > Date.now() - a.optOutCookies || (a.install ? l.register() : chrome.tabs.create({url:chrome.runtime.getURL("chrome/content/onboard.html")}));
    }) : l.register();
  };
  try {
    chrome.browserAction.onClicked.addListener(function(a) {
      b.isGuest ? chrome.tabs.create({url:b.actionUrl}) : chrome.tabs.create({url:"https://keepa.com/#!manage"});
    });
  } catch (a) {
    console.log(a);
  }
  var b = {storage:chrome.storage.local, contextMenu:function() {
    try {
      chrome.contextMenus.removeAll(), chrome.contextMenus.create({title:"View products on Keepa", contexts:["page"], id:"keepaContext", documentUrlPatterns:"*://*.amazon.com/* *://*.amzn.com/* *://*.amazon.co.uk/* *://*.amazon.de/* *://*.amazon.fr/* *://*.amazon.it/* *://*.amazon.ca/* *://*.amazon.com.mx/* *://*.amazon.es/* *://*.amazon.co.jp/* *://*.amazon.in/*".split(" ")}), chrome.contextMenus.onClicked.addListener(function(a, b) {
        chrome.tabs.sendMessage(b.id, {key:"collectASINs"}, {}, function(a) {
          "undefined" != typeof a && chrome.tabs.create({url:"https://keepa.com/#!viewer/" + encodeURIComponent(JSON.stringify(a))});
        });
      });
    } catch (a) {
      console.log(a);
    }
  }, parseCookieHeader:function(a, b) {
    if (0 < b.indexOf("\n")) {
      b = b.split("\n");
      var d = 0;
      a: for (; d < b.length; ++d) {
        var e = b[d].substring(0, b[d].indexOf(";")), B = e.indexOf("=");
        e = [e.substring(0, B), e.substring(B + 1)];
        if (2 == e.length && "-" != e[1]) {
          for (B = 0; B < a.length; ++B) {
            if (a[B][0] == e[0]) {
              a[B][1] = e[1];
              continue a;
            }
          }
          a.push(e);
        }
      }
    } else {
      if (b = b.substring(0, b.indexOf(";")), d = b.indexOf("="), b = [b.substring(0, d), b.substring(d + 1)], 2 == b.length && "-" != b[1]) {
        for (d = 0; d < a.length; ++d) {
          if (a[d][0] == b[0]) {
            a[d][1] = b[1];
            return;
          }
        }
        a.push(b);
      }
    }
  }, log:function(a) {
    l.quiet || console.log(a);
  }, iframeWin:null, operationComplete:!1, counter:0, stockInit:!1, stockRequest:[], initStock:function() {
    if (!b.stockInit && "undefined" != typeof chrome.webRequest) {
      var a = ["xmlhttprequest"], f = "*://www.amazon.com/* *://www.amazon.co.uk/* *://www.amazon.es/* *://www.amazon.nl/* *://www.amazon.com.mx/* *://www.amazon.it/* *://www.amazon.in/* *://www.amazon.de/* *://www.amazon.fr/* *://www.amazon.co.jp/* *://www.amazon.ca/* *://www.amazon.com.br/* *://www.amazon.com.au/* *://www.amazon.com.mx/* *://smile.amazon.com/* *://smile.amazon.co.uk/* *://smile.amazon.es/* *://smile.amazon.nl/* *://smile.amazon.com.mx/* *://smile.amazon.it/* *://smile.amazon.in/* *://smile.amazon.de/* *://smile.amazon.fr/* *://smile.amazon.co.jp/* *://smile.amazon.ca/* *://smile.amazon.com.br/* *://smile.amazon.com.au/* *://smile.amazon.com.mx/*".split(" ");
      try {
        var d = [b.stockData.addCartHeaders, b.stockData.geoHeaders, b.stockData.setAddressHeaders, b.stockData.addressChangeHeaders, b.stockData.productPageHeaders, b.stockData.toasterHeaders];
        chrome.webRequest.onBeforeSendHeaders.addListener(function(a) {
          if (a.initiator) {
            if (a.initiator.startsWith("http")) {
              return;
            }
          } else {
            if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
              return;
            }
          }
          var e = a.requestHeaders, g = {};
          try {
            for (var y = null, f = 0; f < e.length; ++f) {
              if ("krequestid" == e[f].name) {
                y = e[f].value;
                e.splice(f--, 1);
                break;
              }
            }
            if (y) {
              var c = b.stockRequest[y];
              b.stockRequest[a.requestId] = c;
              setTimeout(function() {
                delete b.stockRequest[a.requestId];
              }, 30000);
              var l = d[c.requestType];
              for (y = 0; y < e.length; ++y) {
                var h = e[y].name.toLowerCase();
                (l[h] || "" === l[h] || l[e[y].name] || "cookie" == h || "content-type" == h || "sec-fetch-dest" == h || "sec-fetch-mode" == h || "sec-fetch-user" == h || "accept" == h || "referer" == h) && e.splice(y--, 1);
              }
              if (0 == c.requestType && 19 > c.stockSession.length) {
                return g.cancel = !0, g;
              }
              var m = b.stockData.isMobile ? "https://" + c.host + "/gp/aw/d/" + c.asin + "/" : c.referer, v;
              for (v in l) {
                var p = l[v];
                if (0 != p.length) {
                  p = p.replace("{COOKIE}", c.stockSession).replace("{REFERER}", m).replace("{ORIGIN}", c.host);
                  if (-1 < p.indexOf("{CSRF}")) {
                    if (c.csrf) {
                      p = p.replace("{CSRF}", c.csrf), c.csrf = null;
                    } else {
                      continue;
                    }
                  }
                  e.push({name:v, value:p});
                }
              }
              for (l = 0; l < e.length; ++l) {
                var n = e[l].name.toLowerCase();
                (b.stockData.stockHeaders[n] || "" === b.stockData.stockHeaders[n] || b.stockData.stockHeaders[e[l].name] || "origin" == n || "pragma" == n || "cache-control" == n || "upgrade-insecure-requests" == n) && e.splice(l--, 1);
              }
              for (var w in b.stockData.stockHeaders) {
                var u = b.stockData.stockHeaders[w];
                0 != u.length && (u = u.replace("{COOKIE}", c.stockSession).replace("{REFERER}", m).replace("{ORIGIN}", c.host).replace("{LANG}", b.stockData.languageCode[c.domainId]), e.push({name:w, value:u}));
              }
              g.requestHeaders = e;
              a.requestHeaders = e;
            } else {
              return g;
            }
          } catch (K) {
            g.cancel = !0;
          }
          return g;
        }, {urls:f, types:a}, H ? ["blocking", "requestHeaders", "extraHeaders"] : ["blocking", "requestHeaders"]);
        chrome.webRequest.onHeadersReceived.addListener(function(a) {
          if (a.initiator) {
            if (a.initiator.startsWith("http")) {
              return;
            }
          } else {
            if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
              return;
            }
          }
          var e = a.responseHeaders, d = {};
          try {
            var f = b.stockRequest[a.requestId];
            if (f) {
              var c = f.cookies || [];
              for (a = 0; a < e.length; ++a) {
                "set-cookie" == e[a].name.toLowerCase() && (b.parseCookieHeader(c, e[a].value), e.splice(a, 1), a--);
              }
              f.cookies = c;
              switch(f.requestType) {
                case 0:
                case 1:
                case 2:
                case 4:
                case 5:
                  d.responseHeaders = e;
                  break;
                case 3:
                  d.cancel = !0, setTimeout(function() {
                    f.cookies = c;
                    b.stockSessions[f.domainId + f.asin] = c;
                    f.callback();
                  }, 10);
              }
              if (0 != f.requestType) {
                e = "";
                for (a = 0; a < f.cookies.length; ++a) {
                  var l = f.cookies[a];
                  e += l[0] + "=" + l[1] + "; ";
                  "session-id" == l[0] && 16 < l[1].length && 65 > l[1].length && l[1] != f.session && (f.sessionIdMismatch = !0);
                }
                f.stockSession = e;
              }
            } else {
              return d;
            }
          } catch (aa) {
            d.cancel = !0;
          }
          return d;
        }, {urls:f, types:a}, H ? ["blocking", "responseHeaders", "extraHeaders"] : ["blocking", "responseHeaders"]);
        b.stockInit = !0;
      } catch (e) {
        l.reportBug(e, e.message + " stock exception: " + typeof chrome.webRequest + " " + ("undefined" != typeof chrome.webRequest ? typeof chrome.webRequest.onBeforeSendHeaders : "~") + " " + ("undefined" != typeof chrome.webRequest ? typeof chrome.webRequest.onHeadersReceived : "#"));
      }
    }
  }, stockData:null, isGuest:!0, actionUrl:"https://keepa.com/#!features", stockJobQueue:[], stockSessions:[], addStockJob:function(a, f) {
    a.gid = l.Guid.newGuid().substr(0, 8);
    a.requestType = -1;
    b.stockRequest[a.gid] = a;
    var d = function(a) {
      b.stockJobQueue.shift();
      f(a);
      0 < b.stockJobQueue.length && b.processStockJob(b.stockJobQueue[0][0], b.stockJobQueue[0][1]);
    };
    b.stockJobQueue.push([a, d]);
    1 == b.stockJobQueue.length && b.processStockJob(a, d);
  }, processStockJob:function(a, f) {
    null == b.stockData.stock ? (console.log("stock retrieval not initialized"), f({error:"stock retrieval not initialized", errorCode:0})) : 0 == b.stockData.stockEnabled[a.domainId] ? (console.log("stock retrieval not supported for domain"), f({error:"stock retrieval not supported for domain", errorCode:1})) : !0 === b.stockData.pro || a.force ? !a.isMAP && a.maxQty && b.stockData.stockMaxQty && a.maxQty < b.stockData.stockMaxQty ? f({stock:a.maxQty, limit:!1}) : null == a.oid ? (console.log("missing oid", 
    a), f({error:"stock retrieval failed for offer: " + a.asin + " id: " + a.gid + " missing oid.", errorCode:12})) : a.onlyMaxQty && !a.isMAP ? f() : (b.initStock(), setTimeout(function() {
      if (b.stockInit) {
        if (setTimeout(function() {
          delete b.stockRequest[a.gid];
          delete b.stockSessions[a.domainId + a.asin];
        }, 3E5), a.queue = [function() {
          for (var e = "", d = !1, g = !1, c = 0, h = 0; h < a.cookies.length; ++h) {
            var p = a.cookies[h];
            e += p[0] + "=" + p[1] + "; ";
            "session-id" == p[0] && 16 < p[1].length && 65 > p[1].length && (d = !0, p[1] != a.session && (g = !0, c = p[1]));
          }
          a.cookie = e;
          d && g ? (a.stockSession = e, e = b.stockData.addCartUrl, d = b.stockData.addCartPOST, a.requestType = 0, l.httpPost("https://" + a.host + e.replaceAll("{SESSION_ID}", c).replaceAll("{OFFER_ID}", a.oid).replaceAll("{ADDCART}", b.stockData.stockAdd[a.domainId]).replaceAll("{ASIN}", a.asin), d.replaceAll("{SESSION_ID}", c).replaceAll("{OFFER_ID}", a.oid).replaceAll("{ADDCART}", b.stockData.stockAdd[a.domainId]).replaceAll("{ASIN}", a.asin), function(d) {
            var e = decodeURIComponent(a.oid).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), g = d.match(new RegExp(b.stockData.stock)), c = d.match(new RegExp(b.stockData.stockAlt)), B = d.match(new RegExp(b.stockData.stockAlt2.replaceAll("{ESCAPED_OID}", e))), y = d.match(new RegExp(b.stockData.price)), l = d.match(new RegExp(b.stockData.priceSingle.replaceAll("{ESCAPED_OID}", e)));
            e = (new RegExp(b.stockData.limit)).test(d);
            null == g && (g = B);
            if (g && g[1]) {
              d = parseInt(g[1]), g = -1, c && c[1] && (g = parseInt(c[1])), B && B[1] && (g = parseInt(B[1])), c = -1, l && 1 < l.length ? (l[1].lastIndexOf(".") == l[1].length - 2 && (l[1] += "0"), c = parseInt(l[1].replace(/[\D]/g, ""))) : y && (c = parseInt(y[1].replace(/[\D]/g, "")) / d), y = -1, 0 < g && 100 > g && d > g && (e = !0, y = g), f({stock:Math.max(d, g), orderLimit:y, limit:e, price:c});
            } else {
              if ((y = d.match(/automated access|api-services-support@/)) || a.isRetry) {
                delete b.stockSessions[a.domainId + a.asin], a.cookie = null, a.stockSession = null, a.cookies = null;
              }
              y ? (f({error:"Amazon stock retrieval rate limited (bot detection) of offer: " + a.asin + " id: " + a.gid + " offer: " + a.oid, errorCode:5}), console.log("stock retrieval rate limited for offer: ", a.asin + " " + a.oid + " id: " + a.gid, d.length)) : f({error:"Stock retrieval failed for this offer. Try reloading the page after a while. ", errorCode:9});
            }
          }, !1, a.gid)) : (l.reportBug(null, "stock session issue: " + d + " " + g + " counter: " + b.counter + " c: " + JSON.stringify(a.cookies) + " " + JSON.stringify(a)), f({error:"stock session issue: " + d + " " + g, errorCode:4}));
        }], a.getNewId && (b.stockData.geoRetry && delete b.stockSessions[a.domainId + a.asin], a.queue.unshift(function() {
          a.requestType = 4;
          l.httpGet("https://" + b.stockData.offerUrl.replace("{ORIGIN}", a.host).replace("{ASIN}", a.asin).replace("{SID}", a.sellerId), function(d) {
            if (d.match(b.stockData.sellerIdBBVerify.replace("{SID}", a.sellerId))) {
              for (var e = null, g = 0; g < b.stockData.csrfBB.length; g++) {
                var c = d.match(new RegExp(b.stockData.csrfBB[g]));
                if (null != c && c[1]) {
                  e = c[1];
                  break;
                }
              }
              if (e) {
                a.csrf = e[1];
                e = null;
                for (g = 0; g < b.stockData.offerIdBB.length; g++) {
                  if (c = d.match(new RegExp(b.stockData.offerIdBB[g])), null != c && c[1]) {
                    e = c[1];
                    break;
                  }
                }
                e && (a.oid = e, a.callback());
              }
            } else {
              f({error:"stock retrieval failed for offer: " + a.asin + " id: " + a.gid + " mismatch oid.", errorCode:10});
            }
          }, !1, a.gid);
        })), a.callback = function() {
          return a.queue.shift()();
        }, b.stockSessions[a.domainId + a.asin]) {
          a.cookies = b.stockSessions[a.domainId + a.asin], a.callback();
        } else {
          var d = b.stockData.zipCodes[a.domainId];
          b.stockData.domainId == a.domainId ? (a.requestType = 3, l.httpPost("https://" + a.host + b.stockData.addressChangeUrl, b.stockData.addressChangePOST.replace("{ZIPCODE}", d), null, !1, a.gid)) : (a.requestType = 1, l.httpGet("https://" + a.host + b.stockData.geoUrl, function(e) {
            e = e.match(new RegExp(b.stockData.csrfGeo));
            null != e ? (a.csrf = e[1], a.requestType = 5, l.httpGet("https://" + a.host + b.stockData.toasterUrl.replace("{TIME_MS}", Date.now()), function(e) {
              a.requestType = 2;
              l.httpGet("https://" + a.host + b.stockData.setAddressUrl, function(e) {
                e = e.match(new RegExp(b.stockData.csrfSetAddress));
                null != e && (a.csrf = e[1]);
                a.requestType = 3;
                l.httpPost("https://" + a.host + b.stockData.addressChangeUrl, b.stockData.addressChangePOST.replace("{ZIPCODE}", d), null, !1, a.gid);
              }, !1, a.gid);
            }, !1, a.gid)) : f({error:"stock retrieval failed for offer: " + a.asin + " id: " + a.gid + " main.", errorCode:7});
          }, !1, a.gid));
        }
      } else {
        console.log("could not init stock retrieval", b.stockInit, typeof chrome.webRequest), f({error:"could not init stock retrieval", errorCode:"undefined" != typeof chrome.webRequest ? 3 : 33});
      }
    }, 20)) : (console.log("stock retrieval not pro"), f({error:"stock retrieval failed, not subscribed", errorCode:2}));
  }, set:function(a, c, d) {
    var e = {};
    e[a] = c;
    b.storage.set(e, d);
  }, remove:function(a, c) {
    b.storage.remove(a, c);
  }, get:function(a, c) {
    "function" != typeof c && (c = function() {
    });
    b.storage.get(a, function(a) {
      c(a);
    });
  }};
  b.contextMenu();
  var l = {quiet:!0, version:chrome.runtime.getManifest().version, browser:1, url:"https://keepa.com", testUrl:"https://test.keepa.com", getDomain:function(a) {
    switch(a) {
      case "com":
        return 1;
      case "co.uk":
        return 2;
      case "de":
        return 3;
      case "fr":
        return 4;
      case "co.jp":
        return 5;
      case "ca":
        return 6;
      case "it":
        return 8;
      case "es":
        return 9;
      case "in":
        return 10;
      case "com.mx":
        return 11;
      case "com.br":
        return 12;
      case "com.au":
        return 13;
      case "nl":
        return 14;
      default:
        return 1;
    }
  }, objectStorage:[], Guid:function() {
    var a = function(b, e, c) {
      return b.length >= e ? b : a(c + b, e, c || " ");
    }, b = function() {
      var a = (new Date).getTime();
      return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/x/g, function(b) {
        var e = (a + 16 * Math.random()) % 16 | 0;
        a = Math.floor(a / 16);
        return ("x" === b ? e : e & 7 | 8).toString(16);
      });
    };
    return {newGuid:function() {
      var d = "undefined" != typeof window.crypto.getRandomValues;
      if ("undefined" != typeof window.crypto && d) {
        d = new window.Uint16Array(16);
        window.crypto.getRandomValues(d);
        var e = "";
        for (g in d) {
          var c = d[g].toString(16);
          c = a(c, 4, "0");
          e += c;
        }
        var g = e;
      } else {
        g = b();
      }
      return g;
    }};
  }(), register:function() {
    chrome.cookies.onChanged.addListener(function(a) {
      a.removed || null == a.cookie || "keepa.com" != a.cookie.domain || "/extension" != a.cookie.path || ("token" == a.cookie.name ? A != a.cookie.value && 64 == a.cookie.value.length && (A = a.cookie.value, b.set("token", A), setTimeout(function() {
        document.location.reload(!1);
      }, 300)) : b.set(a.cookie.name, a.cookie.value));
    });
    var a = !1, c = function(d) {
      for (var e = {}, c = 0; c < d.length; e = {$jscomp$loop$prop$name$70:e.$jscomp$loop$prop$name$70}, c++) {
        e.$jscomp$loop$prop$name$70 = d[c];
        try {
          chrome.cookies.get({url:"https://keepa.com/extension", name:e.$jscomp$loop$prop$name$70}, function(e) {
            return function(d) {
              chrome.runtime.lastError && -1 < chrome.runtime.lastError.message.indexOf("No host permission") ? a || (a = !0, l.reportBug("extensionPermission restricted ### " + chrome.runtime.lastError.message)) : null != d && null != d.value && 0 < d.value.length && b.set(e.$jscomp$loop$prop$name$70, d.value);
            };
          }(e));
        } catch (g) {
          console.log(g);
        }
      }
    };
    c(h);
    chrome.cookies.get({url:"https://keepa.com/extension", name:"token"}, function(a) {
      if (null != a && 64 == a.value.length) {
        A = a.value, b.set("token", A);
      } else {
        var e = (Date.now() / 1000 | 0) + 31536E3;
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"optOut_crawl", value:"0", secure:!0, expirationDate:e});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"revealStock", value:"1", secure:!0, expirationDate:e});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"s_boxType", value:"0", secure:!0, expirationDate:e});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"s_boxOfferListing", value:"1", secure:!0, expirationDate:e});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"s_boxHorizontal", value:"0", secure:!0, expirationDate:e});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"webGraphType", value:"[1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]", secure:!0, expirationDate:e});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"webGraphRange", value:"180", secure:!0, expirationDate:e});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"overlayPriceGraph", value:"0", secure:!0, expirationDate:e});
        c(h);
        b.get("token", function(a) {
          A = (a = a.token) && 64 == a.length ? a : l.Guid.newGuid();
          chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"token", value:A, secure:!0, expirationDate:e});
        });
      }
    });
    try {
      "undefined" != typeof chrome.storage.sync && chrome.storage.sync.clear();
    } catch (d) {
    }
    window.addEventListener("message", function(a) {
      var b = a.data;
      if (b) {
        if ("string" === typeof b) {
          try {
            b = JSON.parse(b);
          } catch (y) {
            return;
          }
        }
        if (b.log) {
          console.log(b.log);
        } else {
          var c = function() {
          };
          if (a.origin != l.url && a.origin != l.testUrl) {
            var d = w.getMessage();
            if (null != d && ("function" == typeof d.onDoneC && (c = d.onDoneC, delete d.onDoneC), "undefined" == typeof d.sent && b.sandbox && a.source == document.getElementById("keepa_data").contentWindow)) {
              if (b.sandbox == d.url) {
                w.setStatTime(40);
                try {
                  a.source.postMessage({key:"data", value:d}, "*");
                } catch (y) {
                  w.abortJob(407), c();
                }
              } else {
                b.isUrlMsg ? (d.wasUrl = b.sandbox, w.abortJob(405)) : (a = w.getOutgoingMessage(d, b.sandbox), n.sendMessage(a)), c();
              }
            }
          }
        }
      }
    });
    p ? b.set("addonVersionFirefox", l.version) : b.set("addonVersionChrome", l.version);
    try {
      chrome.runtime.setUninstallURL("https://dyn.keepa.com/app/stats/?type=uninstall&version=" + O + "." + l.version);
    } catch (d) {
    }
    window.setTimeout(function() {
      n.initWebSocket();
    }, 2000);
  }, log:function(a) {
    b.log(a);
  }, lastBugReport:0, reportBug:function(a, c, d) {
    var e = Error();
    b.get(["token"], function(b) {
      var g = Date.now();
      if (!(12E5 > g - l.lastBugReport || /(dead object)|(Script error)|(setUninstallURL)|(File error: Corrupted)|(operation is insecure)|(\.location is null)/i.test(a))) {
        l.lastBugReport = g;
        g = "";
        var f = l.version;
        c = c || "";
        try {
          if (g = e.stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;"), !/(keepa|content)\.js/.test(g) || g.startsWith("https://www.amazon") || g.startsWith("https://smile.amazon") || g.startsWith("https://sellercentral")) {
            return;
          }
        } catch (U) {
        }
        try {
          g = g.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
        } catch (U) {
        }
        if ("object" == typeof a) {
          try {
            a = a instanceof Error ? a.toString() : JSON.stringify(a);
          } catch (U) {
          }
        }
        null == d && (d = {exception:a, additional:c, url:document.location.host, stack:g});
        d.keepaType = O;
        d.version = f;
        setTimeout(function() {
          l.httpPost("https://dyn.keepa.com/service/bugreport/?user=" + b.token + "&type=" + Z + "&version=" + f, JSON.stringify(d), null, !1);
        }, 50);
      }
    });
  }, httpGet:function(a, b, c, e) {
    var d = new XMLHttpRequest;
    b && (d.onreadystatechange = function() {
      4 == d.readyState && b.call(this, d.responseText);
    });
    d.withCredentials = c;
    d.open("GET", a, !0);
    e && d.setRequestHeader("krequestid", e);
    d.send();
  }, httpPost:function(a, b, d, e, c) {
    var g = new XMLHttpRequest;
    d && (g.onreadystatechange = function() {
      4 == g.readyState && d.call(this, g.responseText);
    });
    g.withCredentials = e;
    g.open("POST", a, !0);
    g.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    c && g.setRequestHeader("krequestid", c);
    g.send(b);
  }};
  window.addEventListener("error", function(a, b, c, e, h) {
    a = "object" === typeof a && a.srcElement && a.target ? "[object HTMLScriptElement]" == a.srcElement && "[object HTMLScriptElement]" == a.target ? "Error loading script " + JSON.stringify(a) : JSON.stringify(a) : a.toString();
    var d = "";
    e = e || 0;
    if (h && h.stack) {
      d = h.stack;
      try {
        d = h.stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;");
        if (!/(keepa|content)\.js/.test(d)) {
          return;
        }
        d = d.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
      } catch (y) {
      }
    }
    a = {msg:a, url:(b || document.location.toString()) + ":" + parseInt(c || 0) + ":" + parseInt(e || 0), stack:d};
    "ipbakfmnjdenbmoenhicfmoojdojjjem" != chrome.runtime.id && "blfpbjkajgamcehdbehfdioapoiibdmc" != chrome.runtime.id || console.log(a);
    l.reportBug(null, null, a);
    return !1;
  });
  var X = 0;
  var n = {server:["wss://dyn.keepa.com", "wss://dyn-2.keepa.com"], serverIndex:0, clearTimeout:0, webSocket:null, sendPlainMessage:function(a) {
    J || (a = JSON.stringify(a), n.webSocket.send(pako.deflate(a)));
  }, sendMessage:function(a) {
    if (!J) {
      w.clearIframe();
      var b = pako.deflate(JSON.stringify(a));
      w.clearMessage();
      1 == n.webSocket.readyState && n.webSocket.send(b);
      403 == a.status && w.endSession(X);
      c.console.clear();
    }
  }, initWebSocket:function() {
    J || b.get(["token", "optOut_crawl"], function(a) {
      var c = a.token, d = a.optOut_crawl;
      if (c && 64 == c.length) {
        var e = function() {
          if (null == n.webSocket || 1 != n.webSocket.readyState) {
            n.serverIndex %= n.server.length;
            if ("undefined" == typeof d || "undefined" == d || null == d || "null" == d || "NaN" == d) {
              d = "0";
            }
            v && (d = "1");
            "undefined" === typeof chrome.webRequest && (d = "1");
            var a = new WebSocket(n.server[n.serverIndex] + "/apps/cloud/?app=" + O + "&version=" + l.version + "&wr=" + typeof chrome.webRequest + "&optOut=" + d, c);
            a.binaryType = "arraybuffer";
            a.onmessage = function(a) {
              a = a.data;
              var c = null;
              a instanceof ArrayBuffer && (a = pako.inflate(a, {to:"string"}));
              try {
                c = JSON.parse(a);
              } catch (U) {
                l.reportBug(U, a);
                return;
              }
              108 == c.status ? 1 === c.guest ? (b.isGuest = !0, b.actionUrl = c.actionUrl) : b.isGuest = !1 : "" == c.key ? b.stockData.domainId = c.domainId : 108108 == c.timeout ? (c.stockData && (b.stockData = c.stockData, console.log("stock reveal ready")), "undefined" != typeof c.keepaBoxPlaceholder && b.set("keepaBoxPlaceholder", c.keepaBoxPlaceholder), "undefined" != typeof c.keepaBoxPlaceholderBackup && b.set("keepaBoxPlaceholderBackup", c.keepaBoxPlaceholderBackup), "undefined" != typeof c.keepaBoxPlaceholderBackupClass && 
              b.set("keepaBoxPlaceholderBackupClass", c.keepaBoxPlaceholderBackupClass), "undefined" != typeof c.keepaBoxPlaceholderAppend && b.set("keepaBoxPlaceholderAppend", c.keepaBoxPlaceholderAppend), "undefined" != typeof c.keepaBoxPlaceholderBackupAppend && b.set("keepaBoxPlaceholderBackupAppend", c.keepaBoxPlaceholderBackupAppend)) : (c.domainId && (X = c.domainId), w.clearIframe(), w.onMessage(c));
            };
            a.onclose = function(a) {
              setTimeout(function() {
                e();
              }, 36E4 * Math.random());
            };
            a.onerror = function(b) {
              n.serverIndex++;
              a.close();
            };
            a.onopen = function() {
              w.abortJob(414);
            };
            n.webSocket = a;
          }
        };
        e();
      }
    });
  }};
  var w = function() {
    function a(a) {
      try {
        m.stats.times.push(a), m.stats.times.push(Date.now() - m.stats.start);
      } catch (r) {
      }
    }
    function f(b, c) {
      b.sent = !0;
      a(25);
      var d = b.key, e = b.messageId;
      b = b.stats;
      try {
        var x = C[F]["session-id"];
      } catch (k) {
        x = "";
      }
      d = {key:d, messageId:e, stats:b, sessionId:x, payload:[], status:200};
      for (var r in c) {
        d[r] = c[r];
      }
      return d;
    }
    function d(b) {
      F = m.domainId;
      R = u(C);
      "object" != typeof C[F] && (C[F] = {});
      "undefined" == typeof m.headers.Accept && (m.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*!/!*;q=0.8");
      h(b, !b.isAjax, function(c) {
        a(0);
        var d = {payload:[]};
        if (c.match(H)) {
          d.status = 403;
        } else {
          if (b.contentFilters && 0 < b.contentFilters.length) {
            for (var e in b.contentFilters) {
              var x = c.match(new RegExp(b.contentFilters[e]));
              if (x) {
                d.payload[e] = x[1].replace(/\n/g, "");
              } else {
                d.status = 305;
                d.payload[e] = c;
                break;
              }
            }
          } else {
            d.payload = [c];
          }
        }
        try {
          b.stats.times.push(3), b.stats.times.push(l.lastBugReport);
        } catch (t) {
        }
        "undefined" == typeof b.sent && (d = f(b, d), n.sendMessage(d));
      });
    }
    function e(c) {
      F = m.domainId;
      R = u(C);
      "object" != typeof C[F] && (C[F] = {});
      "undefined" == typeof m.headers.Accept && (m.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*!/!*;q=0.8");
      a(4);
      var d = new URL(c.url), e = null;
      try {
        null != c.scrapeFilters && 0 < c.scrapeFilters.length && c.scrapeFilters[0].lager && chrome.cookies.get({url:d.origin, name:"session-id"}, function(a) {
          null == a ? e = "guest" : null != a.value && 5 < a.value.length && (e = a.value);
        });
      } catch (L) {
      }
      h(c, !c.isAjax, function(r, x) {
        a(6);
        if ("undefined" == typeof c.sent) {
          var g = {};
          try {
            for (var k = r.evaluate("//comment()", r, null, XPathResult.ANY_TYPE, null), h = k.iterateNext(), m = ""; h;) {
              m += h.textContent, h = k.iterateNext();
            }
            if (r.querySelector("body").textContent.match(H) || m.match(H)) {
              g.status = 403;
              if ("undefined" != typeof c.sent) {
                return;
              }
              g = f(c, g);
              n.sendMessage(g);
              return;
            }
          } catch (I) {
          }
          a(7);
          if (c.scrapeFilters && 0 < c.scrapeFilters.length) {
            var p = {}, D = {}, L = {}, q = "", u = null, w = function() {
              if ("" === q) {
                g.payload = [u];
                g.scrapedData = L;
                for (var a in D) {
                  g[a] = D[a];
                }
              } else {
                g.status = 305, g.payload = [u, q, ""];
              }
              try {
                c.stats.times.push(99), c.stats.times.push(l.lastBugReport);
              } catch (ba) {
              }
              "undefined" == typeof c.sent && (g = f(c, g), n.sendMessage(g));
            }, y = function(a, c, b) {
              var d = [];
              if (!a.selector) {
                if (!a.regExp) {
                  return q = "invalid selector, sel/regexp", !1;
                }
                d = r.querySelector("html").innerHTML.match(new RegExp(a.regExp));
                if (!d || d.length < a.reGroup) {
                  b = "regexp fail: html - " + a.name + b;
                  if (!1 === a.optional) {
                    return q = b, !1;
                  }
                  u += " // " + b;
                  return !0;
                }
                return d[a.reGroup];
              }
              var e = c.querySelectorAll(a.selector);
              0 == e.length && (e = c.querySelectorAll(a.altSelector));
              if (0 == e.length) {
                if (!0 === a.optional) {
                  return !0;
                }
                q = "selector no match: " + a.name + b;
                return !1;
              }
              if (a.parentSelector && (e = [e[0].parentNode.querySelector(a.parentSelector)], null == e[0])) {
                if (!0 === a.optional) {
                  return !0;
                }
                q = "parent selector no match: " + a.name + b;
                return !1;
              }
              if ("undefined" != typeof a.multiple && null != a.multiple && (!0 === a.multiple && 1 > e.length || !1 === a.multiple && 1 < e.length)) {
                b = "selector multiple mismatch: " + a.name + b + " found: " + e.length;
                if (!1 === a.optional) {
                  return q = b, !1;
                }
                u += " // " + b;
                return !0;
              }
              if (a.isListSelector) {
                return p[a.name] = e, !0;
              }
              if (!a.attribute) {
                return q = "selector attribute undefined?: " + a.name + b, !1;
              }
              for (var g in e) {
                if (e.hasOwnProperty(g)) {
                  c = e[g];
                  if (!c) {
                    break;
                  }
                  if (a.childNode) {
                    a.childNode = Number(a.childNode);
                    c = c.childNodes;
                    if (c.length < a.childNode) {
                      b = "childNodes fail: " + c.length + " - " + a.name + b;
                      if (!1 === a.optional) {
                        return q = b, !1;
                      }
                      u += " // " + b;
                      return !0;
                    }
                    c = c[a.childNode];
                  }
                  c = "text" == a.attribute ? c.textContent : "html" == a.attribute ? c.innerHTML : c.getAttribute(a.attribute);
                  if (!c || 0 == c.length || 0 == c.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, "").length) {
                    b = "selector attribute null: " + a.name + b;
                    if (!1 === a.optional) {
                      return q = b, !1;
                    }
                    u += " // " + b;
                    return !0;
                  }
                  if (a.regExp) {
                    var x = c.match(new RegExp(a.regExp));
                    if (!x || x.length < a.reGroup) {
                      b = "regexp fail: " + c + " - " + a.name + b;
                      if (!1 === a.optional) {
                        return q = b, !1;
                      }
                      u += " // " + b;
                      return !0;
                    }
                    d.push("undefined" == typeof x[a.reGroup] ? x[0] : x[a.reGroup]);
                  } else {
                    d.push(c);
                  }
                  if (!a.multiple) {
                    break;
                  }
                }
              }
              return a.multiple ? d : d[0];
            };
            h = !1;
            k = {};
            for (var B in c.scrapeFilters) {
              k.$jscomp$loop$prop$pageType$75 = B;
              a: {
                if (h) {
                  break;
                }
                k.$jscomp$loop$prop$pageFilter$72 = c.scrapeFilters[k.$jscomp$loop$prop$pageType$75];
                k.$jscomp$loop$prop$pageVersionTest$73 = k.$jscomp$loop$prop$pageFilter$72.pageVersionTest;
                m = r.querySelectorAll(k.$jscomp$loop$prop$pageVersionTest$73.selector);
                0 == m.length && (m = r.querySelectorAll(k.$jscomp$loop$prop$pageVersionTest$73.altSelector));
                if (0 != m.length) {
                  if ("undefined" != typeof k.$jscomp$loop$prop$pageVersionTest$73.multiple && null != k.$jscomp$loop$prop$pageVersionTest$73.multiple) {
                    if (!0 === k.$jscomp$loop$prop$pageVersionTest$73.multiple && 2 > m.length) {
                      break a;
                    }
                    if (!1 === k.$jscomp$loop$prop$pageVersionTest$73.multiple && 1 < m.length) {
                      break a;
                    }
                  }
                  if (k.$jscomp$loop$prop$pageVersionTest$73.attribute) {
                    var C = null;
                    C = "text" == k.$jscomp$loop$prop$pageVersionTest$73.attribute ? "" : m[0].getAttribute(k.$jscomp$loop$prop$pageVersionTest$73.attribute);
                    if (null == C) {
                      break a;
                    }
                  }
                  var A = k.$jscomp$loop$prop$pageType$75;
                  k.$jscomp$loop$prop$revealMAP$92 = k.$jscomp$loop$prop$pageFilter$72.revealMAP;
                  k.$jscomp$loop$prop$revealed$94 = !1;
                  k.$jscomp$loop$prop$afterAjaxFinished$95 = function(x) {
                    return function() {
                      var k = 0, h = [];
                      a(26);
                      var f = {}, l;
                      for (l in x.$jscomp$loop$prop$pageFilter$72) {
                        f.$jscomp$loop$prop$sel$81 = x.$jscomp$loop$prop$pageFilter$72[l];
                        if (!(f.$jscomp$loop$prop$sel$81.name == x.$jscomp$loop$prop$pageVersionTest$73.name || x.$jscomp$loop$prop$revealed$94 && "revealMAP" == f.$jscomp$loop$prop$sel$81.name)) {
                          var m = r;
                          if (f.$jscomp$loop$prop$sel$81.parentList) {
                            var q = [];
                            if ("undefined" != typeof p[f.$jscomp$loop$prop$sel$81.parentList]) {
                              q = p[f.$jscomp$loop$prop$sel$81.parentList];
                            } else {
                              if (!0 === y(x.$jscomp$loop$prop$pageFilter$72[f.$jscomp$loop$prop$sel$81.parentList], m, x.$jscomp$loop$prop$pageType$75)) {
                                q = p[f.$jscomp$loop$prop$sel$81.parentList];
                              } else {
                                break;
                              }
                            }
                            D[f.$jscomp$loop$prop$sel$81.parentList] || (D[f.$jscomp$loop$prop$sel$81.parentList] = []);
                            m = 0;
                            var t = {}, n;
                            for (n in q) {
                              if (q.hasOwnProperty(n)) {
                                if ("lager" == f.$jscomp$loop$prop$sel$81.name) {
                                  m++;
                                  try {
                                    var z = void 0;
                                    t.$jscomp$loop$prop$offerId$78 = void 0;
                                    f.$jscomp$loop$prop$sel$81.selector && (z = q[n].querySelector(f.$jscomp$loop$prop$sel$81.selector));
                                    f.$jscomp$loop$prop$sel$81.altSelector && (t.$jscomp$loop$prop$offerId$78 = q[n].querySelector(f.$jscomp$loop$prop$sel$81.altSelector));
                                    t.$jscomp$loop$prop$offerId$78 && (t.$jscomp$loop$prop$offerId$78 = t.$jscomp$loop$prop$offerId$78.getAttribute(f.$jscomp$loop$prop$sel$81.attribute));
                                    t.$jscomp$loop$prop$maxQty$79 = 999;
                                    if (!t.$jscomp$loop$prop$offerId$78) {
                                      try {
                                        var I = JSON.parse(f.$jscomp$loop$prop$sel$81.regExp);
                                        if (I.sel1) {
                                          try {
                                            var B = JSON.parse(q[n].querySelectorAll(I.sel1)[0].dataset[I.dataSet1]);
                                            t.$jscomp$loop$prop$offerId$78 = B[I.val1];
                                            t.$jscomp$loop$prop$maxQty$79 = B.maxQty;
                                          } catch (S) {
                                          }
                                        }
                                        if (!t.$jscomp$loop$prop$offerId$78 && I.sel2) {
                                          try {
                                            var C = JSON.parse(q[n].querySelectorAll(I.sel2)[0].dataset[I.dataSet2]);
                                            t.$jscomp$loop$prop$offerId$78 = C[I.val2];
                                            t.$jscomp$loop$prop$maxQty$79 = C.maxQty;
                                          } catch (S) {
                                          }
                                        }
                                      } catch (S) {
                                      }
                                    }
                                    if (z && t.$jscomp$loop$prop$offerId$78 && null != e) {
                                      k++;
                                      t.$jscomp$loop$prop$mapIndex$84 = n + "";
                                      t.$jscomp$loop$prop$isMAP$82 = !1;
                                      try {
                                        t.$jscomp$loop$prop$isMAP$82 = D[f.$jscomp$loop$prop$sel$81.parentList][t.$jscomp$loop$prop$mapIndex$84].isMAP || -1 != q[n].textContent.toLowerCase().indexOf("add to cart to see product details");
                                      } catch (S) {
                                      }
                                      t.$jscomp$loop$prop$busy$83 = !0;
                                      t.$jscomp$loop$prop$currentASIN$77 = c.url.match(/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/)[1];
                                      null == t.$jscomp$loop$prop$currentASIN$77 || 9 > t.$jscomp$loop$prop$currentASIN$77.length || setTimeout(function(a, r) {
                                        return function() {
                                          b.addStockJob({type:"getStock", asin:a.$jscomp$loop$prop$currentASIN$77, oid:a.$jscomp$loop$prop$offerId$78, host:d.host, maxQty:a.$jscomp$loop$prop$maxQty$79, onlyMaxQty:9 == r.$jscomp$loop$prop$sel$81.reGroup, isMAP:a.$jscomp$loop$prop$isMAP$82, referer:d.host + "/dp/" + a.$jscomp$loop$prop$currentASIN$77, domainId:c.domainId, force:!0, session:e}, function(c) {
                                            a.$jscomp$loop$prop$busy$83 && (a.$jscomp$loop$prop$busy$83 = !1, "undefined" != typeof c && (D[r.$jscomp$loop$prop$sel$81.parentList][a.$jscomp$loop$prop$mapIndex$84][r.$jscomp$loop$prop$sel$81.name] = c), 0 == --k && w(g));
                                          });
                                          setTimeout(function() {
                                            a.$jscomp$loop$prop$busy$83 && 0 == --k && (a.$jscomp$loop$prop$busy$83 = !1, console.log("timeout " + a.$jscomp$loop$prop$offerId$78), w(g));
                                          }, 4000 + 1000 * k);
                                        };
                                      }(t, f), 1);
                                    }
                                  } catch (S) {
                                  }
                                } else {
                                  if ("revealMAP" == f.$jscomp$loop$prop$sel$81.name) {
                                    if (t.$jscomp$loop$prop$revealMAP$49$85 = f.$jscomp$loop$prop$sel$81, z = void 0, z = t.$jscomp$loop$prop$revealMAP$49$85.selector ? q[n].querySelector(t.$jscomp$loop$prop$revealMAP$49$85.selector) : q[n], null != z && z.textContent.match(new RegExp(t.$jscomp$loop$prop$revealMAP$49$85.regExp))) {
                                      z = c.url.match(/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/)[1];
                                      var A = x.$jscomp$loop$prop$pageFilter$72.sellerId;
                                      "undefined" == typeof A || null == A || null == z || 2 > z.length || (A = q[n].querySelector(f.$jscomp$loop$prop$sel$81.childNode).value, null == A || 20 > A + 0 || (z = t.$jscomp$loop$prop$revealMAP$49$85.altSelector.replace("OFFERID", A).replace("ASINID", z), k++, t.$jscomp$loop$prop$mapIndex$52$86 = n + "", v(z, "GET", null, 3000, function(a) {
                                        return function(c) {
                                          try {
                                            var b = x.$jscomp$loop$prop$pageFilter$72.price;
                                            if (b && b.regExp) {
                                              if (c.match(/no valid offer--/)) {
                                                D[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86] || (D[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86] = {}), D[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86][a.$jscomp$loop$prop$revealMAP$49$85.name] = -1;
                                              } else {
                                                var d = c.match(new RegExp("price info--\x3e(?:.|\\n)*?" + b.regExp + "(?:.|\\n)*?\x3c!--")), e = c.match(/price info--\x3e(?:.|\n)*?(?:<span.*?size-small.*?">)([^]*?<\/span)(?:.|\n)*?\x3c!--/);
                                                if (!d || d.length < b.reGroup) {
                                                  u += " //  priceMAP regexp fail: " + (c + " - " + b.name + x.$jscomp$loop$prop$pageType$75);
                                                } else {
                                                  var r = d[b.reGroup];
                                                  D[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86] || (D[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86] = {});
                                                  D[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86][a.$jscomp$loop$prop$revealMAP$49$85.name] = r;
                                                  null != e && 2 == e.length && (D[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86][a.$jscomp$loop$prop$revealMAP$49$85.name + "Shipping"] = e[1].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                                }
                                              }
                                            }
                                          } catch (ca) {
                                          }
                                          0 == --k && 0 == h.length && w();
                                        };
                                      }(t), function() {
                                        0 == --k && 0 == h.length && w();
                                      })));
                                    }
                                  } else {
                                    z = y(f.$jscomp$loop$prop$sel$81, q[n], x.$jscomp$loop$prop$pageType$75);
                                    if (!1 === z) {
                                      break;
                                    }
                                    if (!0 !== z) {
                                      if (D[f.$jscomp$loop$prop$sel$81.parentList][n] || (D[f.$jscomp$loop$prop$sel$81.parentList][n] = {}), f.$jscomp$loop$prop$sel$81.multiple) {
                                        for (var E in z) {
                                          z.hasOwnProperty(E) && !f.$jscomp$loop$prop$sel$81.keepBR && (z[E] = z[E].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                        }
                                        z = z.join("\u271c\u271c");
                                        D[f.$jscomp$loop$prop$sel$81.parentList][n][f.$jscomp$loop$prop$sel$81.name] = z;
                                      } else {
                                        D[f.$jscomp$loop$prop$sel$81.parentList][n][f.$jscomp$loop$prop$sel$81.name] = f.$jscomp$loop$prop$sel$81.keepBR ? z : z.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
                                      }
                                    }
                                  }
                                }
                              }
                              t = {$jscomp$loop$prop$currentASIN$77:t.$jscomp$loop$prop$currentASIN$77, $jscomp$loop$prop$offerId$78:t.$jscomp$loop$prop$offerId$78, $jscomp$loop$prop$maxQty$79:t.$jscomp$loop$prop$maxQty$79, $jscomp$loop$prop$isMAP$82:t.$jscomp$loop$prop$isMAP$82, $jscomp$loop$prop$busy$83:t.$jscomp$loop$prop$busy$83, $jscomp$loop$prop$mapIndex$84:t.$jscomp$loop$prop$mapIndex$84, $jscomp$loop$prop$revealMAP$49$85:t.$jscomp$loop$prop$revealMAP$49$85, $jscomp$loop$prop$mapIndex$52$86:t.$jscomp$loop$prop$mapIndex$52$86};
                            }
                          } else {
                            q = y(f.$jscomp$loop$prop$sel$81, m, x.$jscomp$loop$prop$pageType$75);
                            if (!1 === q) {
                              break;
                            }
                            if (!0 !== q) {
                              if (f.$jscomp$loop$prop$sel$81.multiple) {
                                for (var F in q) {
                                  q.hasOwnProperty(F) && !f.$jscomp$loop$prop$sel$81.keepBR && (q[F] = q[F].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                }
                                q = q.join();
                              } else {
                                f.$jscomp$loop$prop$sel$81.keepBR || (q = q.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                              }
                              L[f.$jscomp$loop$prop$sel$81.name] = q;
                            }
                          }
                        }
                        f = {$jscomp$loop$prop$sel$81:f.$jscomp$loop$prop$sel$81};
                      }
                      try {
                        if (1 == h.length || "500".endsWith("8") && 0 < h.length) {
                          h.shift()();
                        } else {
                          for (f = 0; f < h.length; f++) {
                            setTimeout(function() {
                              0 < h.length && h.shift()();
                            }, 500 * f);
                          }
                        }
                      } catch (S) {
                      }
                      0 == k && 0 == h.length && w();
                    };
                  }(k);
                  if (k.$jscomp$loop$prop$revealMAP$92) {
                    if (h = r.querySelector(k.$jscomp$loop$prop$revealMAP$92.selector), null != h) {
                      k.$jscomp$loop$prop$url$93 = h.getAttribute(k.$jscomp$loop$prop$revealMAP$92.attribute);
                      if (null == k.$jscomp$loop$prop$url$93 || 0 == k.$jscomp$loop$prop$url$93.length) {
                        k.$jscomp$loop$prop$afterAjaxFinished$95();
                        break;
                      }
                      0 != k.$jscomp$loop$prop$url$93.indexOf("http") && (h = document.createElement("a"), h.href = c.url, k.$jscomp$loop$prop$url$93 = h.origin + k.$jscomp$loop$prop$url$93);
                      L[k.$jscomp$loop$prop$revealMAP$92.name] = "1";
                      k.$jscomp$loop$prop$url$93 = k.$jscomp$loop$prop$url$93.replace(/(mapPopover.*?)(false)/, "$1true");
                      k.$jscomp$loop$prop$xhr$90 = new XMLHttpRequest;
                      k.$jscomp$loop$prop$hasTimeout$89 = !1;
                      k.$jscomp$loop$prop$ti$91 = setTimeout(function(a) {
                        return function() {
                          a.$jscomp$loop$prop$hasTimeout$89 = !0;
                          a.$jscomp$loop$prop$afterAjaxFinished$95();
                        };
                      }(k), 4000);
                      k.$jscomp$loop$prop$xhr$90.onreadystatechange = function(a) {
                        return function() {
                          if (!a.$jscomp$loop$prop$hasTimeout$89 && 4 == a.$jscomp$loop$prop$xhr$90.readyState) {
                            clearTimeout(a.$jscomp$loop$prop$ti$91);
                            if (200 == a.$jscomp$loop$prop$xhr$90.status) {
                              var c = a.$jscomp$loop$prop$xhr$90.responseText;
                              if (a.$jscomp$loop$prop$revealMAP$92.regExp) {
                                var b = c.match(new RegExp(a.$jscomp$loop$prop$revealMAP$92.regExp));
                                if (!b || b.length < a.$jscomp$loop$prop$revealMAP$92.reGroup) {
                                  if (b = r.querySelector(a.$jscomp$loop$prop$revealMAP$92.selector)) {
                                    var d = b.cloneNode(!1);
                                    d.innerHTML = c;
                                    b.parentNode.replaceChild(d, b);
                                  }
                                } else {
                                  L[a.$jscomp$loop$prop$revealMAP$92.name] = b[a.$jscomp$loop$prop$revealMAP$92.reGroup], L[a.$jscomp$loop$prop$revealMAP$92.name + "url"] = a.$jscomp$loop$prop$url$93;
                                }
                              }
                            }
                            a.$jscomp$loop$prop$revealed$94 = !0;
                            a.$jscomp$loop$prop$afterAjaxFinished$95();
                          }
                        };
                      }(k);
                      k.$jscomp$loop$prop$xhr$90.onerror = k.$jscomp$loop$prop$afterAjaxFinished$95;
                      k.$jscomp$loop$prop$xhr$90.open("GET", k.$jscomp$loop$prop$url$93, !0);
                      k.$jscomp$loop$prop$xhr$90.send();
                    } else {
                      k.$jscomp$loop$prop$afterAjaxFinished$95();
                    }
                  } else {
                    k.$jscomp$loop$prop$afterAjaxFinished$95();
                  }
                  h = !0;
                }
              }
              k = {$jscomp$loop$prop$pageFilter$72:k.$jscomp$loop$prop$pageFilter$72, $jscomp$loop$prop$pageVersionTest$73:k.$jscomp$loop$prop$pageVersionTest$73, $jscomp$loop$prop$revealed$94:k.$jscomp$loop$prop$revealed$94, $jscomp$loop$prop$pageType$75:k.$jscomp$loop$prop$pageType$75, $jscomp$loop$prop$hasTimeout$89:k.$jscomp$loop$prop$hasTimeout$89, $jscomp$loop$prop$afterAjaxFinished$95:k.$jscomp$loop$prop$afterAjaxFinished$95, $jscomp$loop$prop$xhr$90:k.$jscomp$loop$prop$xhr$90, $jscomp$loop$prop$ti$91:k.$jscomp$loop$prop$ti$91, 
              $jscomp$loop$prop$revealMAP$92:k.$jscomp$loop$prop$revealMAP$92, $jscomp$loop$prop$url$93:k.$jscomp$loop$prop$url$93};
            }
            a(8);
            if (null == A) {
              q += " // no pageVersion matched";
              g.payload = [u, q, c.dbg1 ? x : ""];
              g.status = 308;
              a(10);
              try {
                c.stats.times.push(99), c.stats.times.push(l.lastBugReport);
              } catch (I) {
              }
              "undefined" == typeof c.sent && (g = f(c, g), n.sendMessage(g));
            }
          } else {
            a(9), g.status = 306, "undefined" == typeof c.sent && (g = f(c, g), n.sendMessage(g));
          }
        }
      });
    }
    function h(b, d, e) {
      null == M || V || P();
      K = b;
      var r = b.messageId;
      setTimeout(function() {
        null != K && K.messageId == r && (K = K = null);
      }, b.timeout);
      b.onDoneC = function() {
        K = null;
      };
      if (d) {
        a(11), d = document.getElementById("keepa_data"), d.removeAttribute("srcdoc"), d.src = b.url;
      } else {
        var f = function(d) {
          a(12);
          if ("o0" == b.key) {
            e(d);
          } else {
            var r = document.getElementById("keepa_data_2");
            r.src = "";
            d = d.replace(/src=".*?"/g, 'src=""');
            if (null != b) {
              b.block && (d = d.replace(new RegExp(b.block, "g"), ""));
              a(13);
              var f = !1;
              r.srcdoc = d;
              a(18);
              r.onload = function() {
                a(19);
                f || (r.onload = void 0, f = !0, a(20), setTimeout(function() {
                  a(21);
                  var b = document.getElementById("keepa_data_2").contentWindow;
                  try {
                    e(b.document, d);
                  } catch (Y) {
                    l.reportBug(Y), E(410);
                  }
                }, 80));
              };
            }
            c.console.clear();
          }
        };
        d = 0;
        1 == b.httpMethod && (b.scrapeFilters && 0 < b.scrapeFilters.length && (G = b), O || (O = !0, b.l && 0 < b.l.length && (M = b.l, P(), d = 25)));
        setTimeout(function() {
          v(b.url, Q[b.httpMethod], b.postData, b.timeout, f);
        }, d);
      }
    }
    function g() {
      try {
        var a = document.getElementById("keepa_data");
        a.src = "";
        a.removeAttribute("srcdoc");
      } catch (D) {
      }
      try {
        var b = document.getElementById("keepa_data_2");
        b.src = "";
        b.removeAttribute("srcdoc");
      } catch (D) {
      }
      K = null;
    }
    function v(b, c, d, e, f) {
      var r = new XMLHttpRequest;
      if (f) {
        var g = !1, x = setTimeout(function() {
          g = !0;
          w.abortJob(413);
        }, e || 15000);
        r.onreadystatechange = function() {
          g || (2 == r.readyState && a(27), 4 == r.readyState && (clearTimeout(x), a(29), 503 != r.status && (0 == r.status || 399 < r.status) ? w.abortJob(415, [r.status]) : 0 == r.responseText.length && c == Q[0] ? w.abortJob(416) : f.call(this, r.responseText)));
        };
        r.onerror = function() {
          w.abortJob(408);
        };
      }
      r.open(c, b, !0);
      null == d ? r.send() : r.send(d);
    }
    function u(a) {
      var b = "", c = "", d;
      for (d in a[F]) {
        var e = a[F][d];
        "-" != e && (b += c + d + "=" + e + ";", c = " ");
      }
      return b;
    }
    function A(a) {
      delete C["" + a];
      localStorage.cache = pako.deflate(JSON.stringify(C), {to:"string"});
    }
    function E(a, b) {
      if (null != m) {
        try {
          if ("undefined" != typeof m.sent) {
            return;
          }
          var d = f(m, {});
          b && (d.payload = b);
          d.status = a;
          n.sendMessage(d);
          g();
        } catch (L) {
          l.reportBug(L, "abort");
        }
      }
      c.console.clear();
    }
    var G = null, m = null, H = /automated access|api-services-support@/, J = [function(a) {
    }, function(a) {
      if (null != m) {
        var b = !0;
        if (a.initiator) {
          if (a.initiator.startsWith("http")) {
            return;
          }
        } else {
          if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
            return;
          }
        }
        if (m.url == a.url) {
          N = a.frameId, T = a.tabId, W = a.parentFrameId, b = !1;
        } else {
          if (N == a.parentFrameId || W == a.parentFrameId || N == a.frameId) {
            b = !1;
          }
        }
        if (-2 != N && !(0 < a.tabId && T != a.tabId)) {
          a = a.requestHeaders;
          var c = {};
          if (!a.find(function(a) {
            return "krequestid" === a.name;
          })) {
            "" === m.headers.Cookie && (b = !0);
            (m.timeout + "").endsWith("108") || (m.headers.Cookie = b ? "" : R);
            for (var d in m.headers) {
              b = !1;
              for (var e = 0; e < a.length; ++e) {
                if (a[e].name.toLowerCase() == d.toLowerCase()) {
                  "" == m.headers[d] ? (a.splice(e, 1), e--) : a[e].value = m.headers[d];
                  b = !0;
                  break;
                }
              }
              b || "" == m.headers[d] || a.push({name:p ? d.toLowerCase() : d, value:m.headers[d]});
            }
            c.requestHeaders = a;
            return c;
          }
        }
      }
    }, function(a) {
      var c = a.responseHeaders;
      try {
        if (a.initiator) {
          if (a.initiator.startsWith("http")) {
            return;
          }
        } else {
          if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
            return;
          }
        }
        if (0 < a.tabId && T != a.tabId || null == m || c.find(function(a) {
          return "krequestid" === a.name;
        })) {
          return;
        }
        for (var d = (m.timeout + "").endsWith("108"), e = !1, f = [], g = 0; g < c.length; g++) {
          var h = c[g], l = h.name.toLowerCase();
          "set-cookie" == l ? (-1 < h.value.indexOf("xpires") && b.parseCookieHeader(f, h.value), d || c.splice(g--, 1)) : "x-frame-options" == l && (c.splice(g, 1), g--);
        }
        for (g = 0; g < f.length; g++) {
          var n = f[g];
          if ("undefined" == typeof C[F][n[0]] || C[F][n[0]] != n[1]) {
            e = !0, C[F][n[0]] = n[1];
          }
        }
        !d && e && m.url == a.url && (localStorage.cache = pako.deflate(JSON.stringify(C), {to:"string"}), R = u(C));
      } catch (Y) {
      }
      return {responseHeaders:c};
    }, function(a) {
      if (null != m && m.url == a.url) {
        var b = 0;
        switch(a.error) {
          case "net::ERR_TUNNEL_CONNECTION_FAILED":
            b = 510;
            break;
          case "net::ERR_INSECURE_RESPONSE":
            b = 511;
            break;
          case "net::ERR_CONNECTION_REFUSED":
            b = 512;
            break;
          case "net::ERR_BAD_SSL_CLIENT_AUTH_CERT":
            b = 513;
            break;
          case "net::ERR_CONNECTION_CLOSED":
            b = 514;
            break;
          case "net::ERR_NAME_NOT_RESOLVED":
            b = 515;
            break;
          case "net::ERR_NAME_RESOLUTION_FAILED":
            b = 516;
            break;
          case "net::ERR_ABORTED":
          case "net::ERR_CONNECTION_ABORTED":
            b = 517;
            break;
          case "net::ERR_CONTENT_DECODING_FAILED":
            b = 518;
            break;
          case "net::ERR_NETWORK_ACCESS_DENIED":
            b = 519;
            break;
          case "net::ERR_NETWORK_CHANGED":
            b = 520;
            break;
          case "net::ERR_INCOMPLETE_CHUNKED_ENCODING":
            b = 521;
            break;
          case "net::ERR_CONNECTION_TIMED_OUT":
          case "net::ERR_TIMED_OUT":
            b = 522;
            break;
          case "net::ERR_CONNECTION_RESET":
            b = 523;
            break;
          case "net::ERR_NETWORK_IO_SUSPENDED":
            b = 524;
            break;
          case "net::ERR_EMPTY_RESPONSE":
            b = 525;
            break;
          case "net::ERR_SSL_PROTOCOL_ERROR":
            b = 526;
            break;
          case "net::ERR_ADDRESS_UNREACHABLE":
            b = 527;
            break;
          case "net::ERR_INTERNET_DISCONNECTED":
            b = 528;
            break;
          case "net::ERR_BLOCKED_BY_ADMINISTRATOR":
            b = 529;
            break;
          case "net::ERR_SSL_VERSION_OR_CIPHER_MISMATCH":
            b = 530;
            break;
          case "net::ERR_CONTENT_LENGTH_MISMATCH":
            b = 531;
            break;
          case "net::ERR_PROXY_CONNECTION_FAILED":
            b = 532;
            break;
          default:
            b = 533;
            return;
        }
        setTimeout(function() {
          w.setStatTime(33);
          w.abortJob(b);
        }, 0);
      }
    }], O = !1, V = !1, M = null, K = null, P = function() {
      V = !0;
      for (var a = 0; a < M.length; a++) {
        var b = M[a], d = window, e = 0;
        try {
          for (; e < b.path.length - 1; e++) {
            d = d[b.path[e]];
          }
          delete b.a.types;
          if (b.b) {
            d[b.path[e]](J[b.index], b.a, b.b);
          } else {
            d[b.path[e]](J[b.index], b.a);
          }
        } catch (q) {
          console.log(q);
        }
      }
      c.console.clear();
    }, Q = ["GET", "HEAD", "POST", "PUT", "DELETE"], C = {}, R = "", F = 1;
    try {
      localStorage.cache && (C = JSON.parse(pako.inflate(localStorage.cache, {to:"string"})));
    } catch (x) {
      setTimeout(function() {
        l.reportBug(x, pako.inflate(localStorage.cache, {to:"string"}));
      }, 2000);
    }
    var N = -2, T = -1, W = -2;
    return {onMessage:function(a) {
      "hhhh" == a.key && chrome.webRequest.onBeforeSendHeaders.addListener(function(a) {
        if (null != m) {
          var b = !0;
          if (a.initiator) {
            if (a.initiator.startsWith("http")) {
              return;
            }
          } else {
            if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
              return;
            }
          }
          m.url == a.url && (N = a.frameId, T = a.tabId, W = a.parentFrameId, b = !1);
          if (-2 != N && N == a.frameId && T == a.tabId && W == a.parentFrameId) {
            a = a.requestHeaders;
            var c = {};
            (m.timeout + "").endsWith("108") || (m.headers.Cookie = b ? "" : R);
            for (var d in m.headers) {
              b = !1;
              for (var e = 0; e < a.length; ++e) {
                if (a[e].name.toLowerCase() == d.toLowerCase()) {
                  "" == m.headers[d] ? a.splice(e, 1) : a[e].value = m.headers[d];
                  b = !0;
                  break;
                }
              }
              b || "" == m.headers[d] || a.push({name:p ? d.toLowerCase() : d, value:m.headers[d]});
            }
            c.requestHeaders = a;
            return c;
          }
        }
      }, {urls:["<all_urls>"]}, ["blocking", "requestHeaders"]);
      switch(a.key) {
        case "o0":
        case "o1":
          m = a, m.stats = {start:Date.now(), times:[]};
      }
      switch(a.key) {
        case "update":
          chrome.runtime.requestUpdateCheck(function(a, b) {
            "update_available" == a && chrome.runtime.reload();
          });
          break;
        case "o0":
          w.clearIframe();
          d(a);
          break;
        case "o1":
          w.clearIframe();
          e(a);
          break;
        case "o2":
          A(a.domainId);
          break;
        case "1":
          document.location.reload(!1);
      }
    }, clearIframe:g, endSession:A, getOutgoingMessage:f, setStatTime:a, getFilters:function() {
      return G;
    }, getMessage:function() {
      return m;
    }, clearMessage:function() {
      m = null;
      if (null != M && V) {
        V = !1;
        for (var a = 0; a < M.length; a++) {
          var b = M[a];
          if (b) {
            try {
              for (var d = window, e = 0; e < b.path.length - 1; e++) {
                d = d[b.path[e]];
              }
              d.removeListener(J[b.index]);
            } catch (q) {
            }
          }
        }
        c.console.clear();
      }
    }, abortJob:E};
  }();
})();

