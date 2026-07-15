(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document?document.currentScript: void 0, 950150, (e, t, r) => {
  var n = {
    229: function(e) {
      var t, r, n, o = e.exports = {

      }; function u() {
        throw Error("setTimeout has not been defined")
      }
      function _() {
        throw Error("clearTimeout has not been defined")
      }
      try {
        t = "function" == typeof setTimeout?setTimeout: u
      }catch(e) {
        t = u
      }
      try {
        r = "function" == typeof clearTimeout?clearTimeout: _
      }catch(e) {
        r = _
      }
      function c(e) {
        if(t === setTimeout)return setTimeout(e, 0); if((t === u || !t) && setTimeout)return t = setTimeout, setTimeout(e, 0); try {
          return t(e, 0)
        }catch(r) {
          try {
            return t.call(null, e, 0)
          }catch(r) {
            return t.call(this, e, 0)
          }
        }
      }
      var i = [], E = !1, s = -1; function a() {
        E && n && (E = !1, n.length?i = n.concat(i): s = -1, i.length && f())
      }
      function f() {
        if(!E) {
          var e = c(a); E = !0; for(var t = i.length; t; ) {
            for(n = i, i = []; ++s<t; )n && n[s].run(); s = -1, t = i.length
          }
          n = null, E = !1, function(e) {
            if(r === clearTimeout)return clearTimeout(e); if((r === _ || !r) && clearTimeout)return r = clearTimeout, clearTimeout(e); try {
              r(e)
            }catch(t) {
              try {
                return r.call(null, e)
              }catch(t) {
                return r.call(this, e)
              }
            }
          }
          (e)
        }
      }
      function S(e, t) {
        this.fun = e, this.array = t
      }
      function O() {

      }
      o.nextTick = function(e) {
        var t = Array(arguments.length - 1); if(arguments.length>1)for(var r = 1; r<arguments.length; r++)t[r - 1] = arguments[r]; i.push(new S(e, t)), 1 !== i.length || E || c(f)
      }, S.prototype.run = function() {
        this.fun.apply(null, this.array)
      }, o.title = "browser", o.browser = !0, o.env = {

      }, o.argv = [], o.version = "", o.versions = {

      }, o.on = O, o.addListener = O, o.once = O, o.off = O, o.removeListener = O, o.removeAllListeners = O, o.emit = O, o.prependListener = O, o.prependOnceListener = O, o.listeners = function(e) {
        return[]
      }, o.binding = function(e) {
        throw Error("process.binding is not supported")
      }, o.cwd = function() {
        return"/"
      }, o.chdir = function(e) {
        throw Error("process.chdir is not supported")
      }, o.umask = function() {
        return 0
      }
    }
  }, o = {

  }; function u(e) {
    var t = o[e]; if(void 0 !== t)return t.exports; var r = o[e] = {
      exports: {

      }
    }, _ = !0; try {
      n[e](r, r.exports, u), _ = !1
    }finally {
      _ && delete o[e]
    }
    return r.exports
  }
  u.ab = "/ROOT/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-plugin-macros@3.1.0_babel_c86608cd06aae3a55475e86e10a45f43/node_modules/next/dist/compiled/process/", t.exports = u(229)
}, 824626, (e, t, r) => {
  "use strict"; var n, o; t.exports = (null == (n = e.g.process)?void 0: n.env) && "object" == typeof(null == (o = e.g.process)?void 0: o.env)?e.g.process: e.r(950150)
}, 949401, (e, t, r) => {
  "use strict"; var n = Symbol.for("react.element"), o = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), E = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), a = Symbol.for("react.suspense"), f = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), O = Symbol.iterator, l = {
    isMounted: function() {
      return!1
    }, enqueueForceUpdate: function() {

    }, enqueueReplaceState: function() {

    }, enqueueSetState: function() {

    }
  }, T = Object.assign, p = {

  }; function D(e, t, r) {
    this.props = e, this.context = t, this.refs = p, this.updater = r || l
  }
  function A() {

  }
  function I(e, t, r) {
    this.props = e, this.context = t, this.refs = p, this.updater = r || l
  }
  D.prototype.isReactComponent = {

  }, D.prototype.setState = function(e, t) {
    if("object" != typeof e && "function" != typeof e && null != e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables."); this.updater.enqueueSetState(this, e, t, "setState")
  }, D.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
  }, A.prototype = D.prototype; var y = I.prototype = new A; y.constructor = I, T(y, D.prototype), y.isPureReactComponent = !0; var R = Array.isArray, d = Object.prototype.hasOwnProperty, P = {
    current: null
  }, H = {
    key: !0, ref: !0, __self: !0, __source: !0
  }; function L(e, t, r) {
    var o, u = {

    }, _ = null, c = null; if(null != t)for(o in void 0 !== t.ref && (c = t.ref), void 0 !== t.key && (_ = ""+t.key), t)d.call(t, o) && !H.hasOwnProperty(o) && (u[o] = t[o]); var i = arguments.length - 2; if(1 === i)u.children = r; else if(1<i) {
      for(var E = Array(i), s = 0; s<i; s++)E[s] = arguments[s + 2]; u.children = E
    }
    if(e && e.defaultProps)for(o in i = e.defaultProps)void 0 === u[o] && (u[o] = i[o]); return {
      $$typeof: n, type: e, key: _, ref: c, props: u, _owner: P.current
    }
  }
  function m(e) {
    return"object" == typeof e && null !== e && e.$$typeof === n
  }
  var C = /\/+/g; function b(e, t) {
    var r, n; return"object" == typeof e && null !== e && null != e.key?(r = ""+e.key, n = {
      "=": "=0", ":": "=2"
    }, "$"+r.replace(/[=:]/g, function(e) {
      return n[e]
    })): t.toString(36)
  }
  function v(e, t, r) {
    if(null == e)return e; var u = [], _ = 0; return!function e(t, r, u, _, c) {
      var i, E, s, a = typeof t; ("undefined" === a || "boolean" === a) && (t = null); var f = !1; if(null === t)f = !0; else switch(a) {
        case"string": case"number": f = !0; break; case"object": switch(t.$$typeof) {
          case n: case o: f = !0
        }
      }
      if(f)return c = c(f = t), t = "" === _?"."+b(f, 0): _, R(c)?(u = "", null != t && (u = t.replace(C, "$&/") + "/"), e(c, r, u, "", function(e) {
        return e
      })): null != c && (m(c) && (i = c, E = u + (!c.key || f && f.key === c.key?"": (""+c.key).replace(C, "$&/") + "/") + t, c = {
        $$typeof: n, type: i.type, key: E, ref: i.ref, props: i.props, _owner: i._owner
      }), r.push(c)), 1; if(f = 0, _ = "" === _?".": _ + ":", R(t))for(var S = 0; S<t.length; S++) {
        var l = _ + b(a = t[S], S); f += e(a, r, u, l, c)
      }else if("function" == typeof(l = null === (s = t) || "object" != typeof s?null: "function" == typeof(s = O && s[O] || s["@@iterator"])?s: null))for(t = l.call(t), S = 0; !(a = t.next()).done; )l = _ + b(a = a.value, S++), f += e(a, r, u, l, c); else if("object" === a)throw Error("Objects are not valid as a React child (found: "+("[object Object]" === (r = String(t))?"object with keys {"+Object.keys(t).join(", ") + "}": r) + "). If you meant to render a collection of children, use an array instead."); return f
    }
    (e, u, "", "", function(e) {
      return t.call(r, e, _++)
    }), u
  }
  function M(e) {
    if(-1 === e._status) {
      var t = e._result; (t = t()).then(function(t) {
        (0 === e._status || -1 === e._status) && (e._status = 1, e._result = t)
      }, function(t) {
        (0 === e._status || -1 === e._status) && (e._status = 2, e._result = t)
      }), -1 === e._status && (e._status = 0, e._result = t)
    }
    if(1 === e._status)return e._result.default; throw e._result
  }
  var W = {
    current: null
  }, h = {
    transition: null
  }; function N() {
    throw Error("act(...) is not supported in production builds of React.")
  }
  r.Children = {
    map: v, forEach: function(e, t, r) {
      v(e, function() {
        t.apply(this, arguments)
      }, r)
    }, count: function(e) {
      var t = 0; return v(e, function() {
        t++
      }), t
    }, toArray: function(e) {
      return v(e, function(e) {
        return e
      }) || []
    }, only: function(e) {
      if(!m(e))throw Error("React.Children.only expected to receive a single React element child."); return e
    }
  }, r.Component = D, r.Fragment = u, r.Profiler = c, r.PureComponent = I, r.StrictMode = _, r.Suspense = a, r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
    ReactCurrentDispatcher: W, ReactCurrentBatchConfig: h, ReactCurrentOwner: P
  }, r.act = N, r.cloneElement = function(e, t, r) {
    if(null == e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e + "."); var o = T( {

    }, e.props), u = e.key, _ = e.ref, c = e._owner; if(null != t) {
      if(void 0 !== t.ref && (_ = t.ref, c = P.current), void 0 !== t.key && (u = ""+t.key), e.type && e.type.defaultProps)var i = e.type.defaultProps; for(E in t)d.call(t, E) && !H.hasOwnProperty(E) && (o[E] = void 0 === t[E] && void 0 !== i?i[E]: t[E])
    }
    var E = arguments.length - 2; if(1 === E)o.children = r; else if(1<E) {
      i = Array(E); for(var s = 0; s<E; s++)i[s] = arguments[s + 2]; o.children = i
    }
    return {
      $$typeof: n, type: e.type, key: u, ref: _, props: o, _owner: c
    }
  }, r.createContext = function(e) {
    return(e = {
      $$typeof: E, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null
    }).Provider = {
      $$typeof: i, _context: e
    }, e.Consumer = e
  }, r.createElement = L, r.createFactory = function(e) {
    var t = L.bind(null, e); return t.type = e, t
  }, r.createRef = function() {
    return {
      current: null
    }
  }, r.forwardRef = function(e) {
    return {
      $$typeof: s, render: e
    }
  }, r.isValidElement = m, r.lazy = function(e) {
    return {
      $$typeof: S, _payload: {
        _status: -1, _result: e
      }, _init: M
    }
  }, r.memo = function(e, t) {
    return {
      $$typeof: f, type: e, compare: void 0 === t?null: t
    }
  }, r.startTransition = function(e) {
    var t = h.transition; h.transition = {

    }; try {
      e()
    }finally {
      h.transition = t
    }
  }, r.unstable_act = N, r.useCallback = function(e, t) {
    return W.current.useCallback(e, t)
  }, r.useContext = function(e) {
    return W.current.useContext(e)
  }, r.useDebugValue = function() {

  }, r.useDeferredValue = function(e) {
    return W.current.useDeferredValue(e)
  }, r.useEffect = function(e, t) {
    return W.current.useEffect(e, t)
  }, r.useId = function() {
    return W.current.useId()
  }, r.useImperativeHandle = function(e, t, r) {
    return W.current.useImperativeHandle(e, t, r)
  }, r.useInsertionEffect = function(e, t) {
    return W.current.useInsertionEffect(e, t)
  }, r.useLayoutEffect = function(e, t) {
    return W.current.useLayoutEffect(e, t)
  }, r.useMemo = function(e, t) {
    return W.current.useMemo(e, t)
  }, r.useReducer = function(e, t, r) {
    return W.current.useReducer(e, t, r)
  }, r.useRef = function(e) {
    return W.current.useRef(e)
  }, r.useState = function(e) {
    return W.current.useState(e)
  }, r.useSyncExternalStore = function(e, t, r) {
    return W.current.useSyncExternalStore(e, t, r)
  }, r.useTransition = function() {
    return W.current.useTransition()
  }, r.version = "18.3.1"
}, 389959, (e, t, r) => {
  "use strict"; t.exports = e.r(949401)
}, 256711, (e, t, r) => {
  "use strict"; var n = e.r(389959), o = Symbol.for("react.element"), u = Symbol.for("react.fragment"), _ = Object.prototype.hasOwnProperty, c = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = {
    key: !0, ref: !0, __self: !0, __source: !0
  }; function E(e, t, r) {
    var n, u = {

    }, E = null, s = null; for(n in void 0 !== r && (E = ""+r), void 0 !== t.key && (E = ""+t.key), void 0 !== t.ref && (s = t.ref), t)_.call(t, n) && !i.hasOwnProperty(n) && (u[n] = t[n]); if(e && e.defaultProps)for(n in t = e.defaultProps)void 0 === u[n] && (u[n] = t[n]); return {
      $$typeof: o, type: e, key: E, ref: s, props: u, _owner: c.current
    }
  }
  r.Fragment = u, r.jsx = E, r.jsxs = E
}, 478902, (e, t, r) => {
  "use strict"; t.exports = e.r(256711)
}, 944967, (e, t, r) => {
  !function() {
    "use strict"; var r = {

    }.hasOwnProperty; function n() {
      for(var e = "", t = 0; t<arguments.length; t++) {
        var u = arguments[t]; u && (e = o(e, function(e) {
          if("string" == typeof e || "number" == typeof e)return e; if("object" != typeof e)return""; if(Array.isArray(e))return n.apply(null, e); if(e.toString !== Object.prototype.toString && !e.toString.toString().includes("[native code]"))return e.toString(); var t = ""; for(var u in e)r.call(e, u) && e[u] && (t = o(t, u)); return t
        }
        (u)))
      }
      return e
    }
    function o(e, t) {
      return t?e?e + " "+t: e + t: e
    }
    if(t.exports)n.default = n, t.exports = n; else if("function" == typeof define && "object" == typeof define.amd && define.amd)void 0 !== n && e.v(n); else window.classNames = n
  }
  ()
}, 356535, e => {
  "use strict"; e.s(["AUTH_ERROR", 0, "AUTH_ERROR", "CLEAR_LAST_KEY_DROP", 0, "CLEAR_LAST_KEY_DROP", "CLEAR_ROBUX_DEPOSIT", 0, "CLEAR_ROBUX_DEPOSIT", "DISABLE_GEOBLOCK", 0, "DISABLE_GEOBLOCK", "ENABLE_GEOBLOCK", 0, "ENABLE_GEOBLOCK", "FORCE_AGE_VERIFY_MODAL", 0, "FORCE_AGE_VERIFY_MODAL", "GAME_SOUNDS_TOGGLED", 0, "GAME_SOUNDS_TOGGLED", "HANDLE_KEY_DROP", 0, "HANDLE_KEY_DROP", "HIDE_AGE_VERIFY_MODAL", 0, "HIDE_AGE_VERIFY_MODAL", "HIDE_APPROVALS", 0, "HIDE_APPROVALS", "HIDE_CARDS_DEPOSIT", 0, "HIDE_CARDS_DEPOSIT", "HIDE_CHAT_RULES", 0, "HIDE_CHAT_RULES", "HIDE_CLIENT_SEED", 0, "HIDE_CLIENT_SEED", "HIDE_CONFIRM_LOGOUT", 0, "HIDE_CONFIRM_LOGOUT", "HIDE_CREATE_ROOM", 0, "HIDE_CREATE_ROOM", "HIDE_CRYPTO_DEPOSIT", 0, "HIDE_CRYPTO_DEPOSIT", "HIDE_CRYPTO_WITHDRAW", 0, "HIDE_CRYPTO_WITHDRAW", "HIDE_CURRENCY_WIZARD", 0, "HIDE_CURRENCY_WIZARD", "HIDE_DELETE_MODAL", 0, "HIDE_DELETE_MODAL", "HIDE_DEPOSIT", 0, "HIDE_DEPOSIT", "HIDE_DEPOSIT_PROMOS", 0, "HIDE_DEPOSIT_PROMOS", "HIDE_DEPSOIT_ITEMS_SEMI", 0, "HIDE_DEPSOIT_ITEMS_SEMI", "HIDE_FACTOREDTRADE", 0, "HIDE_TWOFACTORTRADE_MODAL", "HIDE_FAQ", 0, "HIDE_FAQ", "HIDE_FREE_CASE_MODAL", 0, "HIDE_FREE_CASE_MODAL", "HIDE_GIFTCARD_DEPOSIT", 0, "HIDE_GIFTCARD_DEPOSIT", "HIDE_GIVEAWAY_MODAL", 0, "HIDE_GIVEAWAY_MODAL", "HIDE_HISTORY_MODAL", 0, "HIDE_HISTORY_MODAL", "HIDE_HOW_U_FOUND_US", 0, "SHOW_HOW_U_FOUND_US", "HIDE_INFO_MODAL", 0, "HIDE_INFO_MODAL", "HIDE_ITEMS_DEPOSIT", 0, "HIDE_ITEMS_DEPOSIT", "HIDE_LAND_DEPOSIT", 0, "HIDE_LAND_DEPOSIT", "HIDE_LOGIN", 0, "HIDE_MODAL", "HIDE_MARKETPLACE_MODAL", 0, "HIDE_MARKETPLACE_MODAL", "HIDE_MODERATOR_HISTORY", 0, "HIDE_MODERATOR_HISTORY", "HIDE_MUTE_MODAL", 0, "HIDE_MUTE_MODAL", "HIDE_PAYGARDEN_DEPOSIT", 0, "HIDE_PAYGARDEN_DEPOSIT", "HIDE_PROFILE", 0, "HIDE_PROFILE", "HIDE_PROMO_DEPOSIT", 0, "HIDE_PROMO_DEPOSIT", "HIDE_PROVABLY", 0, "HIDE_PROVABLY", "HIDE_PROVABLYCONFIG", 0, "HIDE_PROVABLYCONFIG_MODAL", "HIDE_REGISTRATION", 0, "HIDE_REGISTRATION", "HIDE_RESET_AVATAR_MODAL", 0, "HIDE_RESET_AVATAR_MODAL", "HIDE_RETENTION_MODAL", 0, "HIDE_RETENTION_MODAL", "HIDE_ROBUX_DEPOSIT", 0, "HIDE_ROBUX_DEPOSIT", "HIDE_ROBUX_WITHDRAW", 0, "HIDE_ROBUX_WITHDRAW", "HIDE_SELLIX_DEPOSIT", 0, "HIDE_SELLIX_DEPOSIT", "HIDE_SOCIAL_MEDIA_DEPOSIT", 0, "HIDE_SOCIAL_MEDIA_DEPOSIT", "HIDE_SWAPPED_DEPOSIT", 0, "HIDE_SWAPPED_DEPOSIT", "HIDE_TIP_MODAL", 0, "HIDE_TIP_MODAL", "HIDE_TRANSFER", 0, "HIDE_TRANSFER", "HIDE_TWOFACTOR", 0, "HIDE_TWOFACTOR_MODAL", "HIDE_WITHDRAW", 0, "HIDE_WITHDRAW", "HIDE_XP_SWAP", 0, "HIDE_XP_SWAP", "LOGIN_FAIL", 0, "LOGIN_FAIL", "LOGIN_SUCCESS", 0, "LOGIN_SUCCESS", "LOGOUT", 0, "LOGOUT", "MARK_LEVEL_CLAIMED", 0, "MARK_LEVEL_CLAIMED", "NATURE_SOUNDS_TOGGLED", 0, "NATURE_SOUNDS_TOGGLED", "RACE_LOADED", 0, "RACE_LOADED", "RELOADING_USER", 0, "RELOADING_USER", "SESSION_REFRESH", 0, "SESSION_REFRESH", "SET_AFFILIATE", 0, "SET_AFFILIATE", "SET_ANALYTICSID2", 0, "SET_ANALYTICSID2", "SET_AUTO_BET_MINE", 0, "SET_AUTO_BET_MINE", "SET_AUTO_BET_PLINKO", 0, "SET_AUTO_BET_PLINKO", "SET_AUTO_BET_TOWER", 0, "SET_AUTO_BET_TOWER", "SET_BATCH_DEPOSIT", 0, "SET_BATCH_DEPOSIT", "SET_BLACKJACK_DLS", 0, "SET_BLACKJACK_DLS", "SET_BLACKJACK_TABLE", 0, "SET_BLACKJACK_TABLE", "SET_BLACKJACK_TABLES", 0, "SET_BLACKJACK_TABLES", "SET_COINS_TO_ROBUX_RATE", 0, "SET_COINS_TO_ROBUX_RATE", "SET_CURRENCY", 0, "SET_CURRENCY", "SET_CURRENT_CASE_BATTLE", 0, "SET_CURRENT_CASE_BATTLE", "SET_DISCOUNTS_STATE", 0, "SET_DISCOUNTS_STATE", "SET_ELIGIBLE_GAMEPASSES", 0, "SET_ELIGIBLE_GAMEPASSES", "SET_FFLAGS", 0, "SET_FFLAGS", "SET_FIRST_LOADED", 0, "SET_FIRST_LOADED", "SET_GAME_IDS", 0, "SET_GAME_IDS", "SET_IP_ADDRESS", 0, "SET_IP_ADDRESS", "SET_KEY_BALANCE", 0, "SET_KEY_BALANCE", "SET_KEY_CASES", 0, "SET_KEY_CASES", "SET_LEVEL_REWARDS", 0, "SET_LEVEL_REWARDS", "SET_LOADING_KEYS", 0, "SET_LOADING_KEYS", "SET_LOADING_KEY_CASES", 0, "SET_LOADING_KEY_CASES", "SET_LOADING_LEVELS", 0, "SET_LOADING_LEVELS", "SET_PENDING_ROBUX_DEPOSIT", 0, "SET_PENDING_ROBUX_DEPOSIT", "SET_ROBUX_ACCOUNT", 0, "SET_ROBUX_ACCOUNT", "SET_ROBUX_DEPOSIT_DATA", 0, "SET_ROBUX_DEPOSIT_DATA", "SET_ROBUX_DEPOSIT_ERROR", 0, "SET_ROBUX_DEPOSIT_ERROR", "SET_ROBUX_DEPOSIT_FLAGS", 0, "SET_ROBUX_DEPOSIT_FLAGS", "SET_ROBUX_DEPOSIT_LOADING", 0, "SET_ROBUX_DEPOSIT_LOADING", "SET_ROBUX_DEPOSIT_STEP", 0, "SET_ROBUX_DEPOSIT_STEP", "SET_TIME_REMAINING", 0, "SET_TIME_REMAINING", "SET_WHERE_CAME_FROM", 0, "SET_WHERE_CAME_FROM", "SHOW_AGE_VERIFY_MODAL", 0, "SHOW_AGE_VERIFY_MODAL", "SHOW_APPROVALS", 0, "SHOW_APPROVALS", "SHOW_CARDS_DEPOSIT", 0, "SHOW_CARDS_DEPOSIT", "SHOW_CHAT_RULES", 0, "SHOW_CHAT_RULES", "SHOW_CONFIRM_LGOUT", 0, "SHOW_CONFIRM_LGOUT", "SHOW_CREATE_ROOM", 0, "SHOW_CREATE_ROOM", "SHOW_CRYPTO_DEPOSIT", 0, "SHOW_CRYPTO_DEPOSIT", "SHOW_CRYPTO_WITHDRAW", 0, "SHOW_CRYPTO_WITHDRAW", "SHOW_CURRENCY_WIZARD", 0, "SHOW_CURRENCY_WIZARD", "SHOW_DELETE_MODAL", 0, "SHOW_DELETE_MODAL", "SHOW_DEPOSIT", 0, "SHOW_DEPOSIT", "SHOW_DEPOSIT_PROMOS", 0, "SHOW_DEPOSIT_PROMOS", "SHOW_DEPSOIT_ITEMS_SEMI", 0, "SHOW_DEPSOIT_ITEMS_SEMI", "SHOW_FAQ", 0, "SHOW_FAQ", "SHOW_FREE_CASE_MODAL", 0, "SHOW_FREE_CASE_MODAL", "SHOW_GIFTCARD_DEPOSIT", 0, "SHOW_GIFTCARD_DEPOSIT", "SHOW_GIVEAWAY_MODAL", 0, "SHOW_GIVEAWAY_MODAL", "SHOW_HISTORY_MODAL", 0, "SHOW_HISTORY_MODAL", "SHOW_HOW_U_FOUND_US", 0, "SHOW_HOW_U_FOUND_US", "SHOW_INFO_MODAL", 0, "SHOW_INFO_MODAL", "SHOW_ITEMS_DEPOSIT", 0, "SHOW_ITEMS_DEPOSIT", "SHOW_LAND_DEPOSIT", 0, "SHOW_LAND_DEPOSIT", "SHOW_LOGIN", 0, "SHOW_MODAL", "SHOW_MARKETPLACE_MODAL", 0, "SHOW_MARKETPLACE_MODAL", "SHOW_MODERATOR_HISTORY", 0, "SHOW_MODERATOR_HISTORY", "SHOW_MUTE_MODAL", 0, "SHOW_MUTE_MODAL", "SHOW_PAYGARDEN_DEPOSIT", 0, "SHOW_PAYGARDEN_DEPOSIT", "SHOW_PROMO_DEPOSIT", 0, "SHOW_PROMO_DEPOSIT", "SHOW_PROVABLY", 0, "SHOW_PROVABLY", "SHOW_PROVABLYCONFIG", 0, "SHOW_PROVABLYCONFIG_MODAL", "SHOW_REGISTRATION", 0, "SHOW_REGISTRATION", "SHOW_RESET_AVATAR_MODAL", 0, "SHOW_RESET_AVATAR_MODAL", "SHOW_RETENTION_MODAL", 0, "SHOW_RETENTION_MODAL", "SHOW_ROBUX_DEPOSIT", 0, "SHOW_ROBUX_DEPOSIT", "SHOW_ROBUX_WITHDRAW", 0, "SHOW_ROBUX_WITHDRAW", "SHOW_SELLIX_DEPOSIT", 0, "SHOW_SELLIX_DEPOSIT", "SHOW_SOCIAL_MEDIA_DEPOSIT", 0, "SHOW_SOCIAL_MEDIA_DEPOSIT", "SHOW_SWAPPED_DEPOSIT", 0, "SHOW_SWAPPED_DEPOSIT", "SHOW_TIP_MODAL", 0, "SHOW_TIP_MODAL", "SHOW_TRANSFER", 0, "SHOW_TRANSFER", "SHOW_TWOFACTOR", 0, "SHOW_TWOFACTOR_MODAL", "SHOW_WITHDRAW", 0, "SHOW_WITHDRAW", "SHOW_XP_SWAP", 0, "SHOW_XP_SWAP", "SITE_SOUNDS_TOGGLED", 0, "SITE_SOUNDS_TOGGLED", "UPDATE_BATCH_DEPOSIT", 0, "UPDATE_BATCH_DEPOSIT", "UPDATE_KEY_BALANCE_AFTER_OPEN", 0, "UPDATE_KEY_BALANCE_AFTER_OPEN", "UPDATE_NOTIFICATION_SETTINGS", 0, "UPDATE_NOTIFICATION_SETTINGS", "UPDATE_PRIVACTE_MODE", 0, "UPDATE_PRIVACTE_MODE", "USER_LOADED", 0, "USER_LOADED", "VOLUME_CHANGED", 0, "VOLUME_CHANGED", "WALLET_CHANGE", 0, "WALLET_CHANGE"])
}, 97992, (e, t, r) => {
  "use strict"; t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
}, 133723, (e, t, r) => {
  "use strict"; var n = e.r(97992); function o() {

  }
  function u() {

  }
  u.resetWarningCache = o, t.exports = function() {
    function e(e, t, r, o, u, _) {
      if(_ !== n) {
        var c = Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"); throw c.name = "Invariant Violation", c
      }
    }
    function t() {
      return e
    }
    e.isRequired = e; var r = {
      array: e, bigint: e, bool: e, func: e, number: e, object: e, string: e, symbol: e, any: e, arrayOf: t, element: e, elementType: e, instanceOf: t, node: e, objectOf: t, oneOf: t, oneOfType: t, shape: t, exact: t, checkPropTypes: u, resetWarningCache: o
    }; return r.PropTypes = r, r
  }
}, 203537, (e, t, r) => {
  t.exports = e.r(133723)()
}, 433886, e => {
  "use strict"; function t(e, t) {
    if(null == e)return {

    }; var r = {

    }; for(var n in e)if(( {

    }).hasOwnProperty.call(e, n)) {
      if(-1 !== t.indexOf(n))continue; r[n] = e[n]
    }
    return r
  }
  e.s(["default", () => t])
}, 166852, e => {
  "use strict"; function t() {
    return(t = Object.assign.bind()).apply(null, arguments)
  }
  e.s(["default", () => t])
}, 29750, (e, t, r) => {
  "use strict"; var n = "function" == typeof Symbol && Symbol.for, o = n?Symbol.for("react.element"): 60103, u = n?Symbol.for("react.portal"): 60106, _ = n?Symbol.for("react.fragment"): 60107, c = n?Symbol.for("react.strict_mode"): 60108, i = n?Symbol.for("react.profiler"): 60114, E = n?Symbol.for("react.provider"): 60109, s = n?Symbol.for("react.context"): 60110, a = n?Symbol.for("react.async_mode"): 60111, f = n?Symbol.for("react.concurrent_mode"): 60111, S = n?Symbol.for("react.forward_ref"): 60112, O = n?Symbol.for("react.suspense"): 60113, l = n?Symbol.for("react.suspense_list"): 60120, T = n?Symbol.for("react.memo"): 60115, p = n?Symbol.for("react.lazy"): 60116, D = n?Symbol.for("react.block"): 60121, A = n?Symbol.for("react.fundamental"): 60117, I = n?Symbol.for("react.responder"): 60118, y = n?Symbol.for("react.scope"): 60119; function R(e) {
    if("object" == typeof e && null !== e) {
      var t = e.$$typeof; switch(t) {
        case o: switch(e = e.type) {
          case a: case f: case _: case i: case c: case O: return e; default: switch(e = e && e.$$typeof) {
            case s: case S: case p: case T: case E: return e; default: return t
          }
        }
        case u: return t
      }
    }
  }
  function d(e) {
    return R(e) === f
  }
  r.AsyncMode = a, r.ConcurrentMode = f, r.ContextConsumer = s, r.ContextProvider = E, r.Element = o, r.ForwardRef = S, r.Fragment = _, r.Lazy = p, r.Memo = T, r.Portal = u, r.Profiler = i, r.StrictMode = c, r.Suspense = O, r.isAsyncMode = function(e) {
    return d(e) || R(e) === a
  }, r.isConcurrentMode = d, r.isContextConsumer = function(e) {
    return R(e) === s
  }, r.isContextProvider = function(e) {
    return R(e) === E
  }, r.isElement = function(e) {
    return"object" == typeof e && null !== e && e.$$typeof === o
  }, r.isForwardRef = function(e) {
    return R(e) === S
  }, r.isFragment = function(e) {
    return R(e) === _
  }, r.isLazy = function(e) {
    return R(e) === p
  }, r.isMemo = function(e) {
    return R(e) === T
  }, r.isPortal = function(e) {
    return R(e) === u
  }, r.isProfiler = function(e) {
    return R(e) === i
  }, r.isStrictMode = function(e) {
    return R(e) === c
  }, r.isSuspense = function(e) {
    return R(e) === O
  }, r.isValidElementType = function(e) {
    return"string" == typeof e || "function" == typeof e || e === _ || e === f || e === i || e === c || e === O || e === l || "object" == typeof e && null !== e && (e.$$typeof === p || e.$$typeof === T || e.$$typeof === E || e.$$typeof === s || e.$$typeof === S || e.$$typeof === A || e.$$typeof === I || e.$$typeof === y || e.$$typeof === D)
  }, r.typeOf = R
}, 213784, (e, t, r) => {
  "use strict"; t.exports = e.r(29750)
}, 781979, (e, t, r) => {
  "use strict"; var n = e.r(213784), o = {
    childContextTypes: !0, contextType: !0, contextTypes: !0, defaultProps: !0, displayName: !0, getDefaultProps: !0, getDerivedStateFromError: !0, getDerivedStateFromProps: !0, mixins: !0, propTypes: !0, type: !0
  }, u = {
    name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0
  }, _ = {
    $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0
  }, c = {

  }; function i(e) {
    return n.isMemo(e)?_: c[e.$$typeof] || o
  }
  c[n.ForwardRef] = {
    $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0
  }, c[n.Memo] = _; var E = Object.defineProperty, s = Object.getOwnPropertyNames, a = Object.getOwnPropertySymbols, f = Object.getOwnPropertyDescriptor, S = Object.getPrototypeOf, O = Object.prototype; t.exports = function e(t, r, n) {
    if("string" != typeof r) {
      if(O) {
        var o = S(r); o && o !== O && e(t, o, n)
      }
      var _ = s(r); a && (_ = _.concat(a(r))); for(var c = i(t), l = i(r), T = 0; T<_.length; ++T) {
        var p = _[T]; if(!u[p] && !(n && n[p]) && !(l && l[p]) && !(c && c[p])) {
          var D = f(r, p); try {
            E(t, p, D)
          }catch(e) {

          }
        }
      }
    }
    return t
  }
}, 606413, (e, t, r) => {
  "use strict"; var n = e.r(389959), o = "function" == typeof Object.is?Object.is: function(e, t) {
    return e === t && (0 !== e || 1/e == 1/t) || e != e && t != t
  }, u = n.useState, _ = n.useEffect, c = n.useLayoutEffect, i = n.useDebugValue; function E(e) {
    var t = e.getSnapshot; e = e.value; try {
      var r = t(); return!o(e, r)
    }catch(e) {
      return!0
    }
  }
  var s = "u"<typeof window || void 0 === window.document || void 0 === window.document.createElement?function(e, t) {
    return t()
  }
  : function(e, t) {
    var r = t(), n = u( {
      inst: {
        value: r, getSnapshot: t
      }
    }), o = n[0].inst, s = n[1]; return c(function() {
      o.value = r, o.getSnapshot = t, E(o) && s( {
        inst: o
      })
    }, [e, r, t]), _(function() {
      return E(o) && s( {
        inst: o
      }), e(function() {
        E(o) && s( {
          inst: o
        })
      })
    }, [e]), i(r), r
  }; r.useSyncExternalStore = void 0 !== n.useSyncExternalStore?n.useSyncExternalStore: s
}, 623921, (e, t, r) => {
  "use strict"; t.exports = e.r(606413)
}, 82224, (e, t, r) => {
  "use strict"; var n = e.r(389959), o = e.r(623921), u = "function" == typeof Object.is?Object.is: function(e, t) {
    return e === t && (0 !== e || 1/e == 1/t) || e != e && t != t
  }, _ = o.useSyncExternalStore, c = n.useRef, i = n.useEffect, E = n.useMemo, s = n.useDebugValue; r.useSyncExternalStoreWithSelector = function(e, t, r, n, o) {
    var a = c(null); if(null === a.current) {
      var f = {
        hasValue: !1, value: null
      }; a.current = f
    }else f = a.current; var S = _(e, (a = E(function() {
      function e(e) {
        if(!i) {
          if(i = !0, _ = e, e = n(e), void 0 !== o && f.hasValue) {
            var t = f.value; if(o(t, e))return c = t
          }
          return c = e
        }
        if(t = c, u(_, e))return t; var r = n(e); return void 0 !== o && o(t, r)?(_ = e, t): (_ = e, c = r)
      }
      var _, c, i = !1, E = void 0 === r?null: r; return[function() {
        return e(t())
      }, null === E?void 0: function() {
        return e(E())
      }]
    }, [t, r, n, o]))[0], a[1]); return i(function() {
      f.hasValue = !0, f.value = S
    }, [S]), s(S), S
  }
}, 114095, (e, t, r) => {
  "use strict"; t.exports = e.r(82224)
}, 593968, (e, t, r) => {
  "use strict"; var n, o = Symbol.for("react.element"), u = Symbol.for("react.portal"), _ = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), E = Symbol.for("react.provider"), s = Symbol.for("react.context"), a = Symbol.for("react.server_context"), f = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), O = Symbol.for("react.suspense_list"), l = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"); function D(e) {
    if("object" == typeof e && null !== e) {
      var t = e.$$typeof; switch(t) {
        case o: switch(e = e.type) {
          case _: case i: case c: case S: case O: return e; default: switch(e = e && e.$$typeof) {
            case a: case s: case f: case T: case l: case E: return e; default: return t
          }
        }
        case u: return t
      }
    }
  }
  n = Symbol.for("react.module.reference"), r.ContextConsumer = s, r.ContextProvider = E, r.Element = o, r.ForwardRef = f, r.Fragment = _, r.Lazy = T, r.Memo = l, r.Portal = u, r.Profiler = i, r.StrictMode = c, r.Suspense = S, r.SuspenseList = O, r.isAsyncMode = function() {
    return!1
  }, r.isConcurrentMode = function() {
    return!1
  }, r.isContextConsumer = function(e) {
    return D(e) === s
  }, r.isContextProvider = function(e) {
    return D(e) === E
  }, r.isElement = function(e) {
    return"object" == typeof e && null !== e && e.$$typeof === o
  }, r.isForwardRef = function(e) {
    return D(e) === f
  }, r.isFragment = function(e) {
    return D(e) === _
  }, r.isLazy = function(e) {
    return D(e) === T
  }, r.isMemo = function(e) {
    return D(e) === l
  }, r.isPortal = function(e) {
    return D(e) === u
  }, r.isProfiler = function(e) {
    return D(e) === i
  }, r.isStrictMode = function(e) {
    return D(e) === c
  }, r.isSuspense = function(e) {
    return D(e) === S
  }, r.isSuspenseList = function(e) {
    return D(e) === O
  }, r.isValidElementType = function(e) {
    return"string" == typeof e || "function" == typeof e || e === _ || e === i || e === c || e === S || e === O || e === p || "object" == typeof e && null !== e && (e.$$typeof === T || e.$$typeof === l || e.$$typeof === E || e.$$typeof === s || e.$$typeof === f || e.$$typeof === n || void 0 !== e.getModuleId) || !1
  }, r.typeOf = D
}, 124511, (e, t, r) => {
  "use strict"; t.exports = e.r(593968)
}, 802398, 565252, e => {
  "use strict"; var t = e.i(623921), r = e.i(114095), n = e.i(971131); let o = function(e) {
    e()
  }; e.i(824626); var u = e.i(389959); let _ = Symbol.for("react-redux-context"), c = "u">typeof globalThis?globalThis: {

  }, i = function() {
    var e; if(!u.createContext)return {

    }; let t = null != (e = c[_])?e: c[_] = new Map, r = t.get(u.createContext); return r || (r = u.createContext(null), t.set(u.createContext, r)), r
  }
  (); function E(e = i) {
    return function() {
      return(0, u.useContext)(e)
    }
  }
  let s = E(), a = () => {
    throw Error("uSES not initialized!")
  }, f = a, S = (e, t) => e === t, O = function(e = i) {
    let t = e === i?s: E(e); return function(e, r = {

    }) {
      let {
        equalityFn: n = S, stabilityCheck: o, noopCheck: _
      }
      = "function" == typeof r? {
        equalityFn: r
      }
      : r, {
        store: c, subscription: i, getServerState: E, stabilityCheck: s, noopCheck: a
      }
      = t(); (0, u.useRef)(!0); let O = (0, u.useCallback)( {
        [e.name]: t => e(t)
      }
      [e.name], [e, s, o]), l = f(i.addNestedSub, c.getState, E || c.getState, O, n); return(0, u.useDebugValue)(l), l
    }
  }
  (); var l = e.i(166852), T = e.i(433886), p = e.i(781979), D = e.i(124511); let A = ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]; function I(e) {
    return function(t) {
      let r = e(t); function n() {
        return r
      }
      return n.dependsOnOwnProps = !1, n
    }
  }
  function y(e) {
    return e.dependsOnOwnProps?!!e.dependsOnOwnProps: 1 !== e.length
  }
  function R(e, t) {
    return function(t, {
      displayName: r
    }) {
      let n = function(e, t) {
        return n.dependsOnOwnProps?n.mapToProps(e, t): n.mapToProps(e, void 0)
      }; return n.dependsOnOwnProps = !0, n.mapToProps = function(t, r) {
        n.mapToProps = e, n.dependsOnOwnProps = y(e); let o = n(t, r); return"function" == typeof o && (n.mapToProps = o, n.dependsOnOwnProps = y(o), o = n(t, r)), o
      }, n
    }
  }
  function d(e, t) {
    return(r, n) => {
      throw Error(`Invalid value of type ${typeof e} for ${t} argument when connecting component ${n.wrappedComponentName}.`)
    }
  }
  function P(e, t, r) {
    return(0, l.default)( {

    }, r, e, t)
  }
  let H = {
    notify() {

    }, get: () => []
  }; function L(e, t) {
    let r, n = H, u = 0, _ = !1; function c() {
      s.onStateChange && s.onStateChange()
    }
    function i() {
      if(u++, !r) {
        let u, _, i; r = t?t.addNestedSub(c): e.subscribe(c), u = o, _ = null, i = null, n = {
          clear() {
            _ = null, i = null
          }, notify() {
            u(() => {
              let e = _; for(; e; )e.callback(), e = e.next
            })
          }, get() {
            let e = [], t = _; for(; t; )e.push(t), t = t.next; return e
          }, subscribe(e) {
            let t = !0, r = i = {
              callback: e, next: null, prev: i
            }; return r.prev?r.prev.next = r: _ = r, function() {
              t && null !== _ && (t = !1, r.next?r.next.prev = r.prev: i = r.prev, r.prev?r.prev.next = r.next: _ = r.next)
            }
          }
        }
      }
    }
    function E() {
      u--, r && 0 === u && (r(), r = void 0, n.clear(), n = H)
    }
    let s = {
      addNestedSub: function(e) {
        i(); let t = n.subscribe(e), r = !1; return() => {
          r || (r = !0, t(), E())
        }
      }, notifyNestedSubs: function() {
        n.notify()
      }, handleChangeWrapper: c, isSubscribed: function() {
        return _
      }, trySubscribe: function() {
        _ || (_ = !0, i())
      }, tryUnsubscribe: function() {
        _ && (_ = !1, E())
      }, getListeners: () => n
    }; return s
  }
  let m = "u">typeof window && void 0 !== window.document && void 0 !== window.document.createElement?u.useLayoutEffect: u.useEffect; function C(e, t) {
    return e === t?0 !== e || 0 !== t || 1/e == 1/t: e != e && t != t
  }
  function b(e, t) {
    if(C(e, t))return!0; if("object" != typeof e || null === e || "object" != typeof t || null === t)return!1; let r = Object.keys(e), n = Object.keys(t); if(r.length !== n.length)return!1; for(let n = 0; n<r.length; n++)if(!Object.prototype.hasOwnProperty.call(t, r[n]) || !C(e[r[n]], t[r[n]]))return!1; return!0
  }
  let v = ["reactReduxForwardedRef"], M = a, W = [null, null]; function h(e, t, r, n, o, u) {
    e.current = n, r.current = !1, o.current && (o.current = null, u())
  }
  function N(e, t) {
    return e === t
  }
  function U(e = i) {
    let t = e === i?s: E(e); return function() {
      let {
        store: e
      }
      = t(); return e
    }
  }
  let g = U(), F = function(e = i) {
    let t = e === i?g: U(e); return function() {
      return t().dispatch
    }
  }
  (); e.s([], 373073), e.s([], 264623), f = r.useSyncExternalStoreWithSelector, M = t.useSyncExternalStore, o = n.unstable_batchedUpdates, e.s([], 802398), e.i(264623), e.i(373073), e.s(["Provider", 0, function( {
    store: e, context: t, children: r, serverState: n, stabilityCheck: o = "once", noopCheck: _ = "once"
  }) {
    let c = u.useMemo(() => {
      let t = L(e); return {
        store: e, subscription: t, getServerState: n?() => n: void 0, stabilityCheck: o, noopCheck: _
      }
    }, [e, n, o, _]), E = u.useMemo(() => e.getState(), [e]); return m(() => {
      let {
        subscription: t
      }
      = c; return t.onStateChange = t.notifyNestedSubs, t.trySubscribe(), E !== e.getState() && t.notifyNestedSubs(), () => {
        t.tryUnsubscribe(), t.onStateChange = void 0
      }
    }, [c, E]), u.createElement((t || i).Provider, {
      value: c
    }, r)
  }, "connect", 0, function(e, t, r, {
    pure: n, areStatesEqual: o = N, areOwnPropsEqual: _ = b, areStatePropsEqual: c = b, areMergedPropsEqual: E = b, forwardRef: s = !1, context: a = i
  }
  = {

  }) {
    let f = e?"function" == typeof e?R(e, "mapStateToProps"): d(e, "mapStateToProps"): I(() => ( {

    })), S = t && "object" == typeof t?I(e => (function(e, t) {
      let r = {

      }; for(let n in e) {
        let o = e[n]; "function" == typeof o && (r[n] = (...e) => t(o(...e)))
      }
      return r
    })(t, e)): t?"function" == typeof t?R(t, "mapDispatchToProps"): d(t, "mapDispatchToProps"): I(e => ( {
      dispatch: e
    })), O = r?"function" == typeof r?function(e, {
      displayName: t, areMergedPropsEqual: n
    }) {
      let o, u = !1; return function(e, t, _) {
        let c = r(e, t, _); return u?n(c, o) || (o = c): (u = !0, o = c), o
      }
    }
    : d(r, "mergeProps"): () => P, y = !!e; return e => {
      let t = e.displayName || e.name || "Component", r = `Connect(${t})`, n = {
        shouldHandleStateChanges: y, displayName: r, wrappedComponentName: t, WrappedComponent: e, initMapStateToProps: f, initMapDispatchToProps: S, initMergeProps: O, areStatesEqual: o, areStatePropsEqual: c, areOwnPropsEqual: _, areMergedPropsEqual: E
      }; function i(t) {
        var r; let o, [_, c, i] = u.useMemo(() => {
          let {
            reactReduxForwardedRef: e
          }
          = t, r = (0, T.default)(t, v); return[t.context, e, r]
        }, [t]), E = u.useMemo(() => _ && _.Consumer && (0, D.isContextConsumer)(u.createElement(_.Consumer, null))?_: a, [_, a]), s = u.useContext(E), f = !!t.store && !!t.store.getState && !!t.store.dispatch, S = !!s && !!s.store, O = f?t.store: s.store, p = S?s.getServerState: O.getState, I = u.useMemo(() => (function(e, t) {
          let {
            initMapStateToProps: r, initMapDispatchToProps: n, initMergeProps: o
          }
          = t, u = (0, T.default)(t, A); return function(e, t, r, n, {
            areStatesEqual: o, areOwnPropsEqual: u, areStatePropsEqual: _
          }) {
            let c, i, E, s, a, f = !1; return function(S, O) {
              return f?function(f, S) {
                let O = !u(S, i), l = !o(f, c, S, i); if(c = f, i = S, O && l)return E = e(c, i), t.dependsOnOwnProps && (s = t(n, i)), a = r(E, s, i); if(O)return e.dependsOnOwnProps && (E = e(c, i)), t.dependsOnOwnProps && (s = t(n, i)), a = r(E, s, i); if(l) {
                  let t, n; return n = !_(t = e(c, i), E), E = t, n && (a = r(E, s, i)), a
                }
                return a
              }
              (S, O): (E = e(c = S, i = O), s = t(n, i), a = r(E, s, i), f = !0, a)
            }
          }
          (r(e, u), n(e, u), o(e, u), e, u)
        })(O.dispatch, n), [O]), [R, d] = u.useMemo(() => {
          if(!y)return W; let e = L(O, f?void 0: s.subscription), t = e.notifyNestedSubs.bind(e); return[e, t]
        }, [O, f, s]), P = u.useMemo(() => f?s: (0, l.default)( {

        }, s, {
          subscription: R
        }), [f, s, R]), H = u.useRef(), C = u.useRef(i), b = u.useRef(), N = u.useRef(!1); u.useRef(!1); let U = u.useRef(!1), g = u.useRef(); m(() => (U.current = !0, () => {
          U.current = !1
        }), []); let F = u.useMemo(() => () => b.current && i === C.current?b.current: I(O.getState(), i), [O, i]), w = u.useMemo(() => e => {
          if(!R)return() => {

          }; if(!y)return() => {

          }; let t = !1, r = null, n = () => {
            let n, o; if(t || !U.current)return; let u = O.getState(); try {
              n = I(u, C.current)
            }catch(e) {
              o = e, r = e
            }
            o || (r = null), n === H.current?N.current || d(): (H.current = n, b.current = n, N.current = !0, e())
          }; return R.onStateChange = n, R.trySubscribe(), n(), () => {
            if(t = !0, R.tryUnsubscribe(), R.onStateChange = null, r)throw r
          }
        }, [R]); r = [C, H, N, i, b, d], m(() => h(...r), void 0); try {
          o = M(w, F, p?() => I(p(), i): F)
        }catch(e) {
          throw g.current && (e.message += `
The error may be correlated with this previous error:
${g.current.stack}

`), e
        }
        m(() => {
          g.current = void 0, b.current = void 0, H.current = o
        }); let G = u.useMemo(() => u.createElement(e, (0, l.default)( {

        }, o, {
          ref: c
        })), [c, e, o]); return u.useMemo(() => y?u.createElement(E.Provider, {
          value: P
        }, G): G, [E, G, P])
      }
      let I = u.memo(i); if(I.WrappedComponent = e, I.displayName = i.displayName = r, s) {
        let t = u.forwardRef(function(e, t) {
          return u.createElement(I, (0, l.default)( {

          }, e, {
            reactReduxForwardedRef: t
          }))
        }); return t.displayName = r, t.WrappedComponent = e, (0, p.default)(t, e)
      }
      return(0, p.default)(I, e)
    }
  }, "useDispatch", 0, F, "useSelector", 0, O], 565252)
}]);