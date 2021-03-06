/* eslint-disable */
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
    ? define(["exports"], factory)
    : factory((global.CustomerSDK = {}));
})(this, function(exports) {
  "use strict";

  function _extends() {
    _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

    return _extends.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];

    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }

    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");

    return typeof key === "symbol" ? key : String(key);
  }

  var testKey = "__test_storage_support__";
  var testStorageSupport = function testStorageSupport() {
    var type =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : "local";

    try {
      var storage = window[type + "Storage"];
      storage.setItem(testKey, true);
      storage.getItem(testKey);
      storage.removeItem(testKey);
      return true;
    } catch (err) {
      return false;
    }
  };
  var createStorage = function createStorage() {
    var memoryStorage = Object.defineProperties(
      {},
      {
        getItem: {
          value: function value(key) {
            return memoryStorage[key] || null;
          }
        },
        setItem: {
          value: function value(key, _value) {
            try {
              memoryStorage[key] = String(_value);
            } catch (err) {}
          }
        },
        removeItem: {
          value: function value(key) {
            delete memoryStorage[key];
          }
        },
        clear: {
          value: function value() {
            Object.keys(memoryStorage).forEach(memoryStorage.removeItem);
          }
        },
        key: {
          value: function value(index) {
            return Object.keys(memoryStorage)[index] || null;
          }
        },
        length: {
          get: function get() {
            return Object.keys(memoryStorage).length;
          }
        }
      }
    );
    return memoryStorage;
  };
  var memoryStorage /*#__PURE__*/ = createStorage();

  var storage = testStorageSupport() ? window.localStorage : memoryStorage;
  var storage$1 = {
    setItem: function setItem(key, data) {
      return new Promise(function(resolve) {
        return resolve(storage.setItem(key, data));
      });
    },
    getItem: function getItem(key) {
      return new Promise(function(resolve) {
        return resolve(storage.getItem(key));
      });
    },
    removeItem: function removeItem(key) {
      return new Promise(function(resolve) {
        return resolve(storage.removeItem(key));
      });
    }
  };

  function getRoot() {
    return new Promise(function(resolve) {
      var next = function next() {
        if (!document.body) {
          setTimeout(next, 100);
          return;
        }

        resolve(document.body);
      };

      next();
    });
  }

  var _ref = {},
    hasOwnProperty = _ref.hasOwnProperty;
  function hasOwn(prop, obj) {
    return hasOwnProperty.call(obj, prop);
  }

  function flatMap(iteratee, arr) {
    var _ref;

    return (_ref = []).concat.apply(_ref, arr.map(iteratee));
  }

  var isArray = Array.isArray;

  function isObject(obj) {
    return typeof obj === "object" && obj !== null && !isArray(obj);
  }

  function mapValues(mapper, obj) {
    return Object.keys(obj).reduce(function(acc, key) {
      acc[key] = mapper(obj[key]);
      return acc;
    }, {});
  }

  function cloneDeep(value) {
    if (isArray(value)) {
      return value.map(cloneDeep);
    }

    if (isObject(value)) {
      return mapValues(cloneDeep, value);
    }

    return value;
  }

  // slightly simplified version of https://github.com/sindresorhus/camelcase/blob/a526ef0399f9a1310eaacafa0ae4a69da4a2f1ad/index.js

  function compose() {
    for (
      var _len = arguments.length, funcs = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      funcs[_key] = arguments[_key];
    }

    return funcs.reduce(function(composed, next) {
      return function() {
        return composed(next.apply(void 0, arguments));
      };
    });
  }

  function debounce(ms, fn) {
    var timeoutId;
    return function() {
      clearTimeout(timeoutId);

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      timeoutId = setTimeout.apply(void 0, [fn, ms].concat(args));
    };
  }

  // eslint-disable-next-line consistent-return

  // eslint-disable-next-line consistent-return

  // eslint-disable-next-line lodash-fp/prefer-identity
  function identity(value) {
    return value;
  }

  function forOwn(callback, obj) {
    return Object.keys(obj).forEach(function(key) {
      callback(obj[key], key);
    });
  }

  function generateRandomId() {
    return Math.random()
      .toString(36)
      .substring(2);
  }

  function generateUniqueId(map) {
    var id = generateRandomId();
    return hasOwn(id, map) ? generateUniqueId(map) : id;
  }

  // based on https://github.com/developit/dlv/blob/d7ec976d12665f1c25dec2acf955dfc2e8757a9c/index.js
  function get(propPath, obj) {
    var arrPath = typeof propPath === "string" ? propPath.split(".") : propPath;
    var pathPartIndex = 0;
    var result = obj;

    while (result && pathPartIndex < arrPath.length) {
      result = result[arrPath[pathPartIndex++]];
    }

    return result;
  }

  function isEmpty(collection) {
    return (
      (isArray(collection) ? collection : Object.keys(collection)).length === 0
    );
  }

  function keyBy(prop, arr) {
    return arr.reduce(function(acc, el) {
      acc[el[prop]] = el;
      return acc;
    }, {});
  }

  function last(arr) {
    return arr.length > 0 ? arr[arr.length - 1] : null;
  }

  function merge(objA, objB) {
    if (isEmpty(objB)) {
      return objA;
    }

    var result = {};
    forOwn(function(value, key) {
      if (hasOwn(key, objB)) {
        if (isObject(objA[key]) && isObject(objB[key])) {
          result[key] = merge(objA[key], objB[key]);
        } else {
          result[key] = objB[key];
        }
      } else {
        result[key] = objA[key];
      }
    }, objA);
    forOwn(function(value, key) {
      if (!hasOwn(key, result)) {
        result[key] = objB[key];
      }
    }, objB);
    return result;
  }

  function noop() {}

  function values(obj) {
    return Object.keys(obj).map(function(key) {
      return obj[key];
    });
  }

  function numericSortBy(propOrMapper, collection) {
    var mapper =
      typeof propOrMapper === "function"
        ? propOrMapper
        : function(element) {
            return get(propOrMapper, element);
          };
    return (isArray(collection)
      ? [].concat(collection)
      : values(collection)
    ).sort(function(elementA, elementB) {
      return mapper(elementA) - mapper(elementB);
    });
  }

  function omitByIndexed(predicate, obj) {
    return Object.keys(obj).reduce(function(acc, key) {
      if (!predicate(obj[key], key)) {
        acc[key] = obj[key];
      }

      return acc;
    }, {});
  }

  function omit(keys, obj) {
    return omitByIndexed(function(value, key) {
      return keys.indexOf(key) !== -1;
    }, obj);
  }

  function once(fn) {
    var called = false;
    var result;
    return function() {
      if (called) {
        return result;
      }

      called = true;
      return (result = fn.apply(void 0, arguments));
    };
  }

  function pickOwn(props, obj) {
    return props.reduce(function(acc, prop) {
      if (hasOwn(prop, obj)) {
        acc[prop] = obj[prop];
      }

      return acc;
    }, {});
  }

  function set$1(_keys, val, obj) {
    var _extends2;

    var keys = _keys.split ? _keys.split(".") : _keys;
    var index = keys[0];
    var finalVal = val;

    if (keys.length > 1) {
      // eslint-disable-next-line eqeqeq
      var nextObj = obj != null && hasOwn(index, obj) ? obj[index] : {};
      finalVal = set$1(keys.slice(1), val, nextObj);
    }

    return _extends(
      {},
      obj,
      ((_extends2 = {}), (_extends2[index] = finalVal), _extends2)
    );
  }

  // https://github.com/reactjs/react-redux/blob/5d792a283554cff3d2f54fad1be1f79cbcab33fe/src/utils/shallowEqual.js

  function is(first, second) {
    if (first === second) {
      return first !== 0 || second !== 0 || 1 / first === 1 / second;
    } // eslint-disable-next-line no-self-compare

    return first !== first && second !== second;
  }

  function shallowEqual(objA, objB) {
    if (is(objA, objB)) return true;

    if (
      typeof objA !== "object" ||
      objA === null ||
      typeof objB !== "object" ||
      objB === null
    ) {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;

    for (var index = 0; index < keysA.length; index++) {
      if (
        !hasOwn(keysA[index], objB) ||
        !is(objA[keysA[index]], objB[keysA[index]])
      ) {
        return false;
      }
    }

    return true;
  }

  // TODO: this could be written a lot better

  function splitAt(splitPoint, arr) {
    // TODO first item from the tuple could be replaced by dropRight
    return [arr.slice(0, splitPoint), arr.slice(splitPoint, arr.length)];
  }

  function splitRightWhenAccum(fn, acc, arr) {
    var result = false;

    for (var index = arr.length; index > 0; index--) {
      // eslint-disable-next-line no-param-reassign
      var _fn = fn(arr[index - 1], acc);

      result = _fn[0];
      acc = _fn[1];

      if (result) {
        return splitAt(index - 1, arr);
      }
    }

    return [[], arr];
  }

  function toPairs(obj) {
    return Object.keys(obj).map(function(key) {
      return [key, obj[key]];
    });
  }

  function uniqBy(iteratee, arr) {
    // with polyfills this could be just: return Array.from(new Set(arr.map(iteratee)))
    var seen = [];
    return arr.filter(function(element) {
      var key = iteratee(element);

      if (seen.indexOf(key) === -1) {
        seen.push(key);
        return true;
      }

      return false;
    });
  }

  function uniq(arr) {
    return uniqBy(identity, arr);
  }

  var buildQueryString = function(obj) {
    return toPairs(obj)
      .map(function(pair) {
        return pair.map(encodeURIComponent).join("=");
      })
      .join("&");
  };

  var originRegexp = /[^:]+:\/\/[^(\/|\?)\s]+/;
  var getOrigin = function(url) {
    var domain = url.match(originRegexp);
    return domain && domain[0];
  };

  var buildParams = function buildParams(_ref) {
    var clientId = _ref.clientId,
      license = _ref.license,
      redirectUri = _ref.redirectUri,
      state = _ref.state;
    var params = {
      license_id: license,
      flow: "button",
      response_type: "token",
      client_id: clientId,
      redirect_uri: redirectUri,
      post_message_uri: redirectUri
    };

    if (state) {
      params.state = state;
    }

    return params;
  };

  var buildPath = function buildPath(_ref2) {
    var uniqueGroups = _ref2.uniqueGroups,
      license = _ref2.license,
      group = _ref2.group;
    return (
      (uniqueGroups ? "/licence/g" + license + "_" + group : "") + "/customer"
    );
  };

  var buildSrc = function(config, state, env) {
    var url =
      env === "production"
        ? "https://accounts.livechatinc.com"
        : "https://accounts.livechatinc.com".replace(
            "accounts.",
            "accounts." + env + "."
          );
    var path = buildPath(config);
    var query = buildQueryString(
      buildParams(
        _extends({}, config, {
          state: state
        })
      )
    );
    return "" + url + path + "?" + query;
  };

  var ok = function ok(value) {
    return {
      type: "ok",
      value: value
    };
  };
  var error = function error(err) {
    return {
      type: "error",
      error: err
    };
  };
  var fold = function fold(foldErr, foldValue, result) {
    return result.type === "ok"
      ? foldValue(result.value)
      : foldErr(result.error);
  };

  var parseTokenResponse = function parseTokenResponse(tokenResponse, _ref) {
    var license = _ref.license;
    return {
      accessToken: tokenResponse.access_token,
      entityId: tokenResponse.entity_id,
      expiresIn: tokenResponse.expires_in * 1000,
      tokenType: tokenResponse.token_type,
      creationDate: Date.now(),
      license: license
    };
  };

  var parseToken = function(token, extraData) {
    if (token.identity_exception) {
      return error({
        code: "SSO_IDENTITY_EXCEPTION",
        message: token.identity_exception
      });
    }

    if (token.oauth_exception) {
      return error({
        code: "SSO_OAUTH_EXCEPTION",
        message: token.oauth_exception
      });
    }

    return ok(parseTokenResponse(token, extraData));
  };

  // it's hardcoded here because chat.io has its own ACCOUNTS_URL
  // but this variable has to have the same value for both LiveChat and chat.io

  var POST_MESSAGE_ORIGIN = "https://accounts.livechatinc.com";

  var getPostMessageOrigin = function getPostMessageOrigin(env) {
    return env === "production"
      ? POST_MESSAGE_ORIGIN
      : POST_MESSAGE_ORIGIN.replace("accounts.", "accounts." + env + ".");
  };

  var CUSTOMER_AUTH_FOOTPRINT = "@livechat/customer-auth";

  var buildIframe = function buildIframe(config, env) {
    var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.setAttribute(
      "src",
      buildSrc(
        _extends({}, config, {
          redirectUri: getOrigin(String(location)) + location.pathname
        }),
        CUSTOMER_AUTH_FOOTPRINT,
        env
      )
    );
    return iframe;
  };

  var removeNode$1 = function removeNode$$1(node) {
    if (!node.parentNode) {
      return;
    }

    node.parentNode.removeChild(node);
  };

  var createError = function createError(_ref) {
    var code = _ref.code,
      message = _ref.message;
    var err = new Error(message);
    err.code = code;
    return err;
  };

  var fetchToken = function(config, env) {
    var license = config.license;
    var postMessageOrigin = getPostMessageOrigin(env);
    return new Promise(function(resolve, reject) {
      var _window2;

      var iframe = buildIframe(config, env);

      var cleanup = function cleanup() {
        var _window;

        removeNode$1(iframe); // eslint-disable-next-line no-use-before-define

        (_window = window).removeEventListener.apply(_window, listener);
      };

      var timeoutId = setTimeout(function() {
        cleanup();
        reject(
          createError({
            message: "Request timed out.",
            code: "REQUEST_TIMEOUT"
          })
        );
      }, 15 * 1000);
      var listener = [
        "message",
        function(_ref2) {
          var origin = _ref2.origin,
            data = _ref2.data;

          if (origin !== postMessageOrigin) {
            return;
          }

          if (!data || data.state !== CUSTOMER_AUTH_FOOTPRINT) {
            return;
          }

          clearTimeout(timeoutId);
          cleanup();
          fold(
            function(err) {
              return reject(createError(err));
            },
            resolve,
            parseToken(data, {
              license: license
            })
          );
        },
        false
      ];

      (_window2 = window).addEventListener.apply(_window2, listener);

      getRoot().then(function(body) {
        body.appendChild(iframe);
      });
    });
  };

  var validateConfig = function(_ref) {
    var license = _ref.license,
      clientId = _ref.clientId;

    if (typeof license !== "number" || typeof clientId !== "string") {
      throw new Error(
        "You need to pass valid configuration object: { license, clientId }."
      );
    }
  };

  var isExpiredToken = function isExpiredToken(token) {
    return Date.now() >= token.creationDate + token.expiresIn;
  };

  var withDefaults = function withDefaults(_ref) {
    var _ref$uniqueGroups = _ref.uniqueGroups,
      uniqueGroups = _ref$uniqueGroups === void 0 ? false : _ref$uniqueGroups,
      rest = _objectWithoutPropertiesLoose(_ref, ["uniqueGroups"]);

    return _extends(
      {
        uniqueGroups: uniqueGroups
      },
      rest
    );
  };

  var createAuth = function(inputConfig, env) {
    validateConfig(inputConfig);
    var config = withDefaults(inputConfig);
    var pendingTokenRequest;
    var cachedToken;
    var cacheKey =
      "@@lc_auth_token:" +
      config.license +
      (config.uniqueGroups ? ":" + config.group : "");
    var retrievingToken = storage$1.getItem(cacheKey).then(function(token) {
      if (retrievingToken === null) {
        return;
      }

      retrievingToken = null;

      if (!token) {
        return;
      }

      cachedToken = JSON.parse(token);
    });
    var auth = Object.freeze({
      getFreshToken: function getFreshToken() {
        pendingTokenRequest = fetchToken(config, env)
          .then(function(token) {
            pendingTokenRequest = null;
            storage$1.setItem(cacheKey, JSON.stringify(token));
            cachedToken = token;
            return token;
          })
          .catch(function(err) {
            pendingTokenRequest = null;
            throw err;
          });
        return pendingTokenRequest;
      },
      getToken: function getToken() {
        if (pendingTokenRequest) {
          return pendingTokenRequest;
        }

        if (cachedToken && !isExpiredToken(cachedToken)) {
          return Promise.resolve(cachedToken);
        }

        if (retrievingToken) {
          return retrievingToken.then(auth.getToken);
        }

        return auth.getFreshToken();
      },
      invalidate: function invalidate() {
        storage$1.removeItem(cacheKey);
        cachedToken = null;
        retrievingToken = null;
      }
    });
    return auth;
  };

  //
  // An event handler can take an optional event argument
  // and should not return a value
  // An array of all currently registered event handlers for a type
  // A map of event types and their corresponding event handlers.

  /** Mitt: Tiny (~200b) functional event emitter / pubsub.
   *  @name mitt
   *  @returns {Mitt}
   */
  function mitt(all) {
    all = all || Object.create(null);
    return {
      /**
       * Register an event handler for the given type.
       *
       * @param  {String} type	Type of event to listen for, or `"*"` for all events
       * @param  {Function} handler Function to call in response to given event
       * @memberOf mitt
       */
      on: function on(type, handler) {
        (all[type] || (all[type] = [])).push(handler);
      },

      /**
       * Remove an event handler for the given type.
       *
       * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
       * @param  {Function} handler Handler function to remove
       * @memberOf mitt
       */
      off: function off(type, handler) {
        if (all[type]) {
          all[type].splice(all[type].indexOf(handler) >>> 0, 1);
        }
      },

      /**
       * Invoke all handlers for the given type.
       * If present, `"*"` handlers are invoked after type-matched handlers.
       *
       * @param {String} type  The event type to invoke
       * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
       * @memberOf mitt
       */
      emit: function emit(type, evt) {
        (all[type] || []).slice().map(function(handler) {
          handler(evt);
        });
        (all["*"] || []).slice().map(function(handler) {
          handler(type, evt);
        });
      }
    };
  }

  var mitt$1 = function() {
    var eventsMap = {};
    var instance = mitt(eventsMap);
    return _extends({}, instance, {
      off: function off(type, handler) {
        if (!type) {
          Object.keys(eventsMap).forEach(function(key) {
            delete eventsMap[key];
          });
          return;
        }

        instance.off(type, handler);
      },
      once: function once(type, handler) {
        // for '*' type handler is invoked with 2 arguments - type, evt
        instance.on(type, function onceHandler(data, maybeSecondArg) {
          instance.off(type, onceHandler);
          handler(data, maybeSecondArg);
        });
      }
    });
  };

  function symbolObservablePonyfill(root) {
    var result;
    var Symbol = root.Symbol;

    if (typeof Symbol === "function") {
      if (Symbol.observable) {
        result = Symbol.observable;
      } else {
        result = Symbol("observable");
        Symbol.observable = result;
      }
    } else {
      result = "@@observable";
    }

    return result;
  }

  /* global window */
  var root;

  if (typeof self !== "undefined") {
    root = self;
  } else if (typeof window !== "undefined") {
    root = window;
  } else if (typeof global !== "undefined") {
    root = global;
  } else if (typeof module !== "undefined") {
    root = module;
  } else {
    root = Function("return this")();
  }

  var result = symbolObservablePonyfill(root);

  var CHECK_GOALS = "check_goals";
  var CLEAR_CUSTOMER_UPDATE = "clear_customer_update";
  var CLEAR_PUSH_QUEUE = "clear_push_queue";
  var DESTROY = "destroy";
  var EMIT_EVENTS = "emit_events";
  var LOGIN_SUCCESS = "login_success";
  var PREFETCH_TOKEN = "prefetch_token";
  var PUSH_RECEIVED = "push_received";
  var QUEUE_PUSH = "queue_push";
  var RECONNECT = "reconnect";
  var REQUEST_FAILED = "request_failed";
  var RESPONSE_RECEIVED = "response_received";
  var SEND_REQUEST = "send_request";
  var SET_CHAT_ACTIVE = "set_chat_active";
  var SET_CUSTOMER_DATA = "set_customer_data";
  var SET_CUSTOMER_FIELDS = "set_customer_fields";
  var SET_SELF_ID = "set_self_id";
  var SOCKET_CONNECTED = "socket_connected";
  var SOCKET_DISCONNECTED = "socket_disconnected";
  var START_CONNECTION = "start_connection";
  var STOP_CONNECTION = "stop_connection";
  var UPDATE_CUSTOMER = "update_customer";
  var UPDATE_CUSTOMER_PAGE = "update_customer_page";

  var ACTIVATE_CHAT = "activate_chat";
  var CHECK_GOALS$1 = "check_goals";
  var CLOSE_THREAD = "close_thread";
  var DELETE_CHAT_PROPERTIES = "delete_chat_properties";
  var DELETE_CHAT_THREAD_PROPERTIES = "delete_chat_thread_properties";
  var DELETE_EVENT_PROPERTIES = "delete_event_properties";
  var GET_CHAT_THREADS = "get_chat_threads";
  var GET_CHAT_THREADS_SUMMARY = "get_chat_threads_summary";
  var GET_CHATS_SUMMARY = "get_chats_summary";
  var GET_FORM = "get_form";
  var GET_GROUPS_STATUS = "get_groups_status";
  var GET_PREDICTED_AGENT = "get_predicted_agent";
  var GET_URL_DETAILS = "get_url_details";
  var LOGIN = "login";
  var SEND_EVENT = "send_event";
  var SEND_FILE = "send_file";
  var SEND_RICH_MESSAGE_POSTBACK = "send_rich_message_postback";
  var SEND_SNEAK_PEEK = "send_sneak_peek";
  var SET_CUSTOMER_FIELDS$1 = "set_customer_fields";
  var START_CHAT = "start_chat";
  var UPDATE_CHAT_PROPERTIES = "update_chat_properties";
  var UPDATE_CHAT_THREAD_PROPERTIES = "update_chat_thread_properties";
  var UPDATE_CUSTOMER$1 = "update_customer";
  var UPDATE_CUSTOMER_PAGE$1 = "update_customer_page";
  var UPDATE_EVENT_PROPERTIES = "update_event_properties";
  var UPDATE_LAST_SEEN_TIMESTAMP = "update_last_seen_timestamp";

  /** Detect free variable `global` from Node.js. */
  var freeGlobal =
    typeof global == "object" && global && global.Object === Object && global;

  /** Detect free variable `self`. */

  var freeSelf =
    typeof self == "object" && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root$1 = freeGlobal || freeSelf || Function("return this")();

  /** Built-in value references. */

  var Symbol$1 = root$1.Symbol;

  /** Used for built-in method references. */

  var objectProto = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$1 = objectProto.hasOwnProperty;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString = objectProto.toString;
  /** Built-in value references. */

  var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;
  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */

  function getRawTag(value) {
    var isOwn = hasOwnProperty$1.call(value, symToStringTag),
      tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
    } catch (e) {}

    var result = nativeObjectToString.call(value);

    {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }

    return result;
  }

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString$1 = objectProto$1.toString;
  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */

  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  /** `Object#toString` result references. */

  var nullTag = "[object Null]",
    undefinedTag = "[object Undefined]";
  /** Built-in value references. */

  var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;
  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }

    return symToStringTag$1 && symToStringTag$1 in Object(value)
      ? getRawTag(value)
      : objectToString(value);
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /** Built-in value references. */

  var getPrototype = overArg(Object.getPrototypeOf, Object);

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }

  /** `Object#toString` result references. */

  var objectTag = "[object Object]";
  /** Used for built-in method references. */

  var funcProto = Function.prototype,
    objectProto$2 = Object.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString = funcProto.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
  /** Used to infer the `Object` constructor. */

  var objectCtorString = funcToString.call(Object);
  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */

  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
      return false;
    }

    var proto = getPrototype(value);

    if (proto === null) {
      return true;
    }

    var Ctor = hasOwnProperty$2.call(proto, "constructor") && proto.constructor;
    return (
      typeof Ctor == "function" &&
      Ctor instanceof Ctor &&
      funcToString.call(Ctor) == objectCtorString
    );
  }

  /**
   * These are private action types reserved by Redux.
   * For any unknown actions, you must return the current state.
   * If the current state is undefined, you must return the initial state.
   * Do not reference these action types directly in your code.
   */

  var ActionTypes = {
    INIT: "@@redux/INIT"
    /**
     * Creates a Redux store that holds the state tree.
     * The only way to change the data in the store is to call `dispatch()` on it.
     *
     * There should only be a single store in your app. To specify how different
     * parts of the state tree respond to actions, you may combine several reducers
     * into a single reducer function by using `combineReducers`.
     *
     * @param {Function} reducer A function that returns the next state tree, given
     * the current state tree and the action to handle.
     *
     * @param {any} [preloadedState] The initial state. You may optionally specify it
     * to hydrate the state from the server in universal apps, or to restore a
     * previously serialized user session.
     * If you use `combineReducers` to produce the root reducer function, this must be
     * an object with the same shape as `combineReducers` keys.
     *
     * @param {Function} [enhancer] The store enhancer. You may optionally specify it
     * to enhance the store with third-party capabilities such as middleware,
     * time travel, persistence, etc. The only store enhancer that ships with Redux
     * is `applyMiddleware()`.
     *
     * @returns {Store} A Redux store that lets you read the state, dispatch actions
     * and subscribe to changes.
     */
  };
  function createStore(reducer, preloadedState, enhancer) {
    var _ref2;

    if (
      typeof preloadedState === "function" &&
      typeof enhancer === "undefined"
    ) {
      enhancer = preloadedState;
      preloadedState = undefined;
    }

    if (typeof enhancer !== "undefined") {
      if (typeof enhancer !== "function") {
        throw new Error("Expected the enhancer to be a function.");
      }

      return enhancer(createStore)(reducer, preloadedState);
    }

    if (typeof reducer !== "function") {
      throw new Error("Expected the reducer to be a function.");
    }

    var currentReducer = reducer;
    var currentState = preloadedState;
    var currentListeners = [];
    var nextListeners = currentListeners;
    var isDispatching = false;

    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice();
      }
    }
    /**
     * Reads the state tree managed by the store.
     *
     * @returns {any} The current state tree of your application.
     */

    function getState() {
      return currentState;
    }
    /**
     * Adds a change listener. It will be called any time an action is dispatched,
     * and some part of the state tree may potentially have changed. You may then
     * call `getState()` to read the current state tree inside the callback.
     *
     * You may call `dispatch()` from a change listener, with the following
     * caveats:
     *
     * 1. The subscriptions are snapshotted just before every `dispatch()` call.
     * If you subscribe or unsubscribe while the listeners are being invoked, this
     * will not have any effect on the `dispatch()` that is currently in progress.
     * However, the next `dispatch()` call, whether nested or not, will use a more
     * recent snapshot of the subscription list.
     *
     * 2. The listener should not expect to see all state changes, as the state
     * might have been updated multiple times during a nested `dispatch()` before
     * the listener is called. It is, however, guaranteed that all subscribers
     * registered before the `dispatch()` started will be called with the latest
     * state by the time it exits.
     *
     * @param {Function} listener A callback to be invoked on every dispatch.
     * @returns {Function} A function to remove this change listener.
     */

    function subscribe(listener) {
      if (typeof listener !== "function") {
        throw new Error("Expected listener to be a function.");
      }

      var isSubscribed = true;
      ensureCanMutateNextListeners();
      nextListeners.push(listener);
      return function unsubscribe() {
        if (!isSubscribed) {
          return;
        }

        isSubscribed = false;
        ensureCanMutateNextListeners();
        var index = nextListeners.indexOf(listener);
        nextListeners.splice(index, 1);
      };
    }
    /**
     * Dispatches an action. It is the only way to trigger a state change.
     *
     * The `reducer` function, used to create the store, will be called with the
     * current state tree and the given `action`. Its return value will
     * be considered the **next** state of the tree, and the change listeners
     * will be notified.
     *
     * The base implementation only supports plain object actions. If you want to
     * dispatch a Promise, an Observable, a thunk, or something else, you need to
     * wrap your store creating function into the corresponding middleware. For
     * example, see the documentation for the `redux-thunk` package. Even the
     * middleware will eventually dispatch plain object actions using this method.
     *
     * @param {Object} action A plain object representing “what changed”. It is
     * a good idea to keep actions serializable so you can record and replay user
     * sessions, or use the time travelling `redux-devtools`. An action must have
     * a `type` property which may not be `undefined`. It is a good idea to use
     * string constants for action types.
     *
     * @returns {Object} For convenience, the same action object you dispatched.
     *
     * Note that, if you use a custom middleware, it may wrap `dispatch()` to
     * return something else (for example, a Promise you can await).
     */

    function dispatch(action) {
      if (!isPlainObject(action)) {
        throw new Error(
          "Actions must be plain objects. " +
            "Use custom middleware for async actions."
        );
      }

      if (typeof action.type === "undefined") {
        throw new Error(
          'Actions may not have an undefined "type" property. ' +
            "Have you misspelled a constant?"
        );
      }

      if (isDispatching) {
        throw new Error("Reducers may not dispatch actions.");
      }

      try {
        isDispatching = true;
        currentState = currentReducer(currentState, action);
      } finally {
        isDispatching = false;
      }

      var listeners = (currentListeners = nextListeners);

      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        listener();
      }

      return action;
    }
    /**
     * Replaces the reducer currently used by the store to calculate the state.
     *
     * You might need this if your app implements code splitting and you want to
     * load some of the reducers dynamically. You might also need this if you
     * implement a hot reloading mechanism for Redux.
     *
     * @param {Function} nextReducer The reducer for the store to use instead.
     * @returns {void}
     */

    function replaceReducer(nextReducer) {
      if (typeof nextReducer !== "function") {
        throw new Error("Expected the nextReducer to be a function.");
      }

      currentReducer = nextReducer;
      dispatch({
        type: ActionTypes.INIT
      });
    }
    /**
     * Interoperability point for observable/reactive libraries.
     * @returns {observable} A minimal observable of state changes.
     * For more information, see the observable proposal:
     * https://github.com/tc39/proposal-observable
     */

    function observable() {
      var _ref;

      var outerSubscribe = subscribe;
      return (
        (_ref = {
          /**
           * The minimal observable subscription method.
           * @param {Object} observer Any object that can be used as an observer.
           * The observer object should have a `next` method.
           * @returns {subscription} An object with an `unsubscribe` method that can
           * be used to unsubscribe the observable from the store, and prevent further
           * emission of values from the observable.
           */
          subscribe: function subscribe(observer) {
            if (typeof observer !== "object") {
              throw new TypeError("Expected the observer to be an object.");
            }

            function observeState() {
              if (observer.next) {
                observer.next(getState());
              }
            }

            observeState();
            var unsubscribe = outerSubscribe(observeState);
            return {
              unsubscribe: unsubscribe
            };
          }
        }),
        (_ref[result] = function() {
          return this;
        }),
        _ref
      );
    } // When a store is created, an "INIT" action is dispatched so that every
    // reducer returns their initial state. This effectively populates
    // the initial state tree.

    dispatch({
      type: ActionTypes.INIT
    });
    return (
      (_ref2 = {
        dispatch: dispatch,
        subscribe: subscribe,
        getState: getState,
        replaceReducer: replaceReducer
      }),
      (_ref2[result] = observable),
      _ref2
    );
  }

  /**
   * Prints a warning in the console if it exists.
   *
   * @param {String} message The warning message.
   * @returns {void}
   */
  function warning(message) {
    /* eslint-disable no-console */
    if (typeof console !== "undefined" && typeof console.error === "function") {
      console.error(message);
    }
    /* eslint-enable no-console */

    try {
      // This error was thrown as a convenience so that if you enable
      // "break on all exceptions" in your console,
      // it would pause the execution at this line.
      throw new Error(message);
      /* eslint-disable no-empty */
    } catch (e) {}
    /* eslint-enable no-empty */
  }

  /**
   * Composes single-argument functions from right to left. The rightmost
   * function can take multiple arguments as it provides the signature for
   * the resulting composite function.
   *
   * @param {...Function} funcs The functions to compose.
   * @returns {Function} A function obtained by composing the argument functions
   * from right to left. For example, compose(f, g, h) is identical to doing
   * (...args) => f(g(h(...args))).
   */
  function compose$1() {
    for (
      var _len = arguments.length, funcs = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      funcs[_key] = arguments[_key];
    }

    if (funcs.length === 0) {
      return function(arg) {
        return arg;
      };
    }

    if (funcs.length === 1) {
      return funcs[0];
    }

    return funcs.reduce(function(a, b) {
      return function() {
        return a(b.apply(undefined, arguments));
      };
    });
  }

  var _extends$1 =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };
  /**
   * Creates a store enhancer that applies middleware to the dispatch method
   * of the Redux store. This is handy for a variety of tasks, such as expressing
   * asynchronous actions in a concise manner, or logging every action payload.
   *
   * See `redux-thunk` package as an example of the Redux middleware.
   *
   * Because middleware is potentially asynchronous, this should be the first
   * store enhancer in the composition chain.
   *
   * Note that each middleware will be given the `dispatch` and `getState` functions
   * as named arguments.
   *
   * @param {...Function} middlewares The middleware chain to be applied.
   * @returns {Function} A store enhancer applying the middleware.
   */

  function applyMiddleware() {
    for (
      var _len = arguments.length, middlewares = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      middlewares[_key] = arguments[_key];
    }

    return function(createStore) {
      return function(reducer, preloadedState, enhancer) {
        var store = createStore(reducer, preloadedState, enhancer);
        var _dispatch = store.dispatch;
        var chain = [];
        var middlewareAPI = {
          getState: store.getState,
          dispatch: function dispatch(action) {
            return _dispatch(action);
          }
        };
        chain = middlewares.map(function(middleware) {
          return middleware(middlewareAPI);
        });
        _dispatch = compose$1.apply(undefined, chain)(store.dispatch);
        return _extends$1({}, store, {
          dispatch: _dispatch
        });
      };
    };
  }

  /*
   * This is a dummy function to check if the function name has been altered by minification.
   * If the function has been minified and NODE_ENV !== 'production', warn the user.
   */

  function isCrushed() {}

  if (typeof isCrushed.name === "string" && isCrushed.name !== "isCrushed") {
    warning(
      "You are currently using minified code outside of NODE_ENV === 'production'. " +
        "This means that you are running a slower development build of Redux. " +
        "You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify " +
        "or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) " +
        "to ensure you have the correct code for your production build."
    );
  }

  var createSideEffectsMiddleware = function() {
    var handlers = [];

    var sideEffectsMiddleware = function sideEffectsMiddleware(store) {
      return function(next) {
        return function(action) {
          var result = next(action);
          handlers.forEach(function(handler) {
            handler(action, store);
          });
          return result;
        };
      };
    };

    sideEffectsMiddleware.add = function(handler) {
      handlers.push(handler);
    };

    return sideEffectsMiddleware;
  };

  function deferred() {
    var def = {};
    def.promise = new Promise(function(resolve, reject) {
      def.resolve = resolve;
      def.reject = reject;
    });
    return def;
  }

  var createReducer = function createReducer(initialState, reducersMap) {
    return function reducer(state, action) {
      if (state === void 0) {
        state = initialState;
      }

      if (reducersMap.hasOwnProperty(action.type)) {
        return reducersMap[action.type](state, action.payload);
      }

      return state;
    };
  }; // TODO: this is the same as built-in redux's combineReducers, should be remobed

  var CONNECTED = "connected";
  var DISCONNECTED = "disconnected";
  var RECONNECTING = "reconnecting";
  var STOPPED = "stopped";
  var DESTROYED = "destroyed";

  var _createReducer;
  var getAllRequests = function getAllRequests(state) {
    return state.requests;
  };
  var getConnectionStatus = function getConnectionStatus(state) {
    return state.connection.status;
  };
  var getRequest = function getRequest(state, id) {
    return state.requests[id];
  };
  var getSelfData = function getSelfData(state) {
    var data = {};
    var self = state.users.self;

    if (self.name) {
      data.name = self.name;
    }

    if (self.email) {
      data.email = self.email;
    }

    data.fields = self.fields;
    return data;
  };
  var getSelfId = function getSelfId(state) {
    return state.users.self.id;
  };
  var isChatActive = function isChatActive(state, id) {
    var chat = state.chats[id];
    return !!chat && chat.active;
  };
  var isConnected = function isConnected(state) {
    return getConnectionStatus(state) === CONNECTED;
  };
  var isDestroyed = function isDestroyed(state) {
    return getConnectionStatus(state) === DESTROYED;
  };

  var getEnvPart = function getEnvPart(_ref) {
    var license = _ref.license,
      env = _ref.env;

    if (license === 1520) {
      return ".staging";
    }

    if (env === "production") {
      return "";
    }

    return "." + env;
  };

  var getServerUrl = function getServerUrl(initialStateData) {
    var region = initialStateData.region;
    var regionPart = region ? "-" + region : "";
    return (
      "https://api" +
      regionPart +
      getEnvPart(initialStateData) +
      ".livechatinc.com/v3.0/customer"
    );
  };

  var createInitialState = function createInitialState(initialStateData) {
    var license = initialStateData.license,
      _initialStateData$gro = initialStateData.group,
      group = _initialStateData$gro === void 0 ? null : _initialStateData$gro,
      _initialStateData$cus = initialStateData.customer,
      customer = _initialStateData$cus === void 0 ? {} : _initialStateData$cus,
      env = initialStateData.env,
      _initialStateData$pag = initialStateData.page,
      page = _initialStateData$pag === void 0 ? null : _initialStateData$pag,
      region = initialStateData.region,
      _initialStateData$ref = initialStateData.referrer,
      referrer =
        _initialStateData$ref === void 0 ? null : _initialStateData$ref,
      _initialStateData$uni = initialStateData.uniqueGroups,
      uniqueGroups =
        _initialStateData$uni === void 0 ? false : _initialStateData$uni;
    return {
      license: license,
      env: env,
      group: group,
      chats: {},
      connection: {
        status: DISCONNECTED
      },
      page: page,
      queuedPushes: [],
      region: region,
      referrer: referrer,
      requests: {},
      serverUrl: getServerUrl(initialStateData),
      users: {
        self: {
          id: null,
          type: "customer",
          name: null,
          email: null,
          fields: {}
        },
        others: {}
      },
      customerUpdate: {
        name: customer.name || null,
        email: customer.email || null,
        fieldsToSet: customer.fields || null,
        fieldsToUpdate: null
      },
      uniqueGroups: uniqueGroups
    };
  };

  var removeStoredRequest = function removeStoredRequest(state, _ref2) {
    var id = _ref2.id;

    // eslint-disable-next-line no-unused-vars
    var _state$requests = state.requests,
      requests = _objectWithoutPropertiesLoose(
        _state$requests,
        [id].map(_toPropertyKey)
      );

    return _extends({}, state, {
      requests: requests
    });
  };

  var setConnectionStatus = function setConnectionStatus(status, state) {
    return set$1("connection.status", status, state);
  };

  var reducer = createReducer(
    null,
    ((_createReducer = {}),
    (_createReducer[CLEAR_CUSTOMER_UPDATE] = function(state) {
      return _extends({}, state, {
        customerUpdate: {
          name: null,
          email: null,
          fieldsToSet: null,
          fieldsToUpdate: null
        }
      });
    }),
    (_createReducer[CLEAR_PUSH_QUEUE] = function(state) {
      return _extends({}, state, {
        queuedPushes: []
      });
    }),
    (_createReducer[DESTROY] = function(state) {
      return setConnectionStatus(DESTROYED, state);
    }),
    (_createReducer[LOGIN_SUCCESS] = function(state) {
      return setConnectionStatus(CONNECTED, state);
    }),
    (_createReducer[QUEUE_PUSH] = function(state, payload) {
      return _extends({}, state, {
        queuedPushes: [].concat(state.queuedPushes, [payload])
      });
    }),
    (_createReducer[REQUEST_FAILED] = removeStoredRequest),
    (_createReducer[RESPONSE_RECEIVED] = removeStoredRequest),
    (_createReducer[SEND_REQUEST] = function(state, _ref3) {
      var action = _ref3.action,
        promise = _ref3.promise,
        resolve = _ref3.resolve,
        reject$$1 = _ref3.reject,
        id = _ref3.id,
        data = _ref3.data;
      return set$1(
        "requests." + id,
        {
          promise: promise,
          resolve: resolve,
          reject: reject$$1,
          action: action,
          data: data
        },
        state
      );
    }),
    (_createReducer[SET_CHAT_ACTIVE] = function(state, _ref4) {
      var id = _ref4.id,
        active = _ref4.active;
      return set$1("chats." + id + ".active", active, state);
    }),
    (_createReducer[SET_CUSTOMER_DATA] = function(state, payload) {
      // do some hoops here to preserve customer data identity
      var current = getSelfData(state);
      var update$$1 = {};

      if (current.name !== payload.name) {
        update$$1.name = payload.name;
      }

      if (current.email !== payload.email) {
        update$$1.email = payload.email;
      }

      if (!shallowEqual(current.fields, payload.fields)) {
        update$$1.fields = payload.fields;
      }

      if (!Object.keys(update$$1).length) {
        return state;
      }

      return _extends({}, state, {
        users: _extends({}, state.users, {
          self: _extends({}, state.users.self, update$$1)
        })
      });
    }),
    (_createReducer[SET_CUSTOMER_FIELDS] = function(state, _ref5) {
      var fields = _ref5.fields;

      if (isConnected(state)) {
        return state;
      }

      return _extends({}, state, {
        customerUpdate: _extends({}, state.customerUpdate, {
          fieldsToSet: fields,
          fieldsToUpdate: null
        })
      });
    }),
    (_createReducer[SET_SELF_ID] = function(state, payload) {
      return set$1("users.self.id", payload, state);
    }),
    (_createReducer[SOCKET_DISCONNECTED] = function(state) {
      var previousStatus = getConnectionStatus(state);

      if (previousStatus === STOPPED || previousStatus === DESTROYED) {
        throw new Error(
          "Got 'socket_disconnected' action when in " +
            previousStatus +
            " state. This should be an impossible state."
        );
      }

      var state1 = setConnectionStatus(
        previousStatus === DISCONNECTED ? DISCONNECTED : RECONNECTING,
        state
      );
      return _extends({}, state1, {
        queuedPushes: [],
        requests: {}
      });
    }),
    (_createReducer[STOP_CONNECTION] = function(state) {
      return setConnectionStatus(STOPPED, state);
    }),
    (_createReducer[UPDATE_CUSTOMER] = function(state, _ref6) {
      var name = _ref6.name,
        email = _ref6.email,
        fields = _ref6.fields;

      if (isConnected(state)) {
        return state;
      }

      var update$$1 = {};

      if (typeof name === "string") {
        update$$1.name = name;
      }

      if (typeof email === "string") {
        update$$1.email = email;
      }

      if (isObject(fields)) {
        update$$1.fieldsToUpdate = _extends(
          {},
          state.customerUpdate.fieldsToUpdate,
          fields
        );
      }

      if (!Object.keys(update$$1).length) {
        return state;
      }

      return _extends({}, state, {
        customerUpdate: _extends({}, state.customerUpdate, update$$1)
      });
    }),
    (_createReducer[UPDATE_CUSTOMER_PAGE] = function(state, page) {
      return _extends({}, state, {
        page: _extends({}, state.page, page)
      });
    }),
    _createReducer)
  );

  function finalCreateStore(initialStateData) {
    var compose$$1 =
      typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            name: "@livechat/customer-sdk"
          })
        : identity;
    var sideEffectsMiddleware = createSideEffectsMiddleware();
    var store = createStore(
      reducer,
      createInitialState(initialStateData),
      compose$$1(applyMiddleware(sideEffectsMiddleware))
    );
    store.addSideEffectsHandler = sideEffectsMiddleware.add;
    return store;
  }

  var CHAT_PROPERTIES_DELETED = "chat_properties_deleted";
  var CHAT_PROPERTIES_UPDATED = "chat_properties_updated";
  var CHAT_THREAD_PROPERTIES_DELETED = "chat_thread_properties_deleted";
  var CHAT_THREAD_PROPERTIES_UPDATED = "chat_thread_properties_updated";
  var CHAT_USER_ADDED = "chat_user_added";
  var CHAT_USER_REMOVED = "chat_user_removed";
  var CUSTOMER_DISCONNECTED = "customer_disconnected";
  var CUSTOMER_PAGE_UPDATED = "customer_page_updated";
  var CUSTOMER_SIDE_STORAGE_UPDATED = "customer_side_storage_updated";
  var CUSTOMER_UPDATED = "customer_updated";
  var EVENT_PROPERTIES_DELETED = "event_properties_deleted";
  var EVENT_UPDATED = "event_updated";
  var INCOMING_CHAT_THREAD = "incoming_chat_thread";
  var INCOMING_EVENT = "incoming_event";
  var INCOMING_TYPING_INDICATOR = "incoming_typing_indicator";
  var LAST_SEEN_TIMESTAMP_UPDATED = "last_seen_timestamp_updated";
  var THREAD_CLOSED = "thread_closed";

  function createError$1(_ref) {
    var message = _ref.message,
      code = _ref.code;
    var error = new Error(message);
    error.code = code;
    return error;
  }

  // but should we? maybe only in DEV mode?

  var parseEvent = function parseEvent(event) {
    var parsed = {
      type: event.type
    };

    switch (event.type) {
      case "message":
        parsed.text = event.text;
        break;

      default:
        parsed = event;
        break;
    }

    if (typeof event.customId === "string") {
      parsed.custom_id = event.customId;
    }

    if (event.postback) {
      parsed.postback = event.postback;
    }

    if (isObject(event.properties)) {
      parsed.properties = event.properties;
    }

    return parsed;
  };
  var parseFileData = function parseFileData(chat, data) {
    var payload = {};
    payload["payload.chat_id"] = chat;
    payload["payload.file"] = data.file;

    if (data.customId) {
      payload["payload.custom_id"] = data.customId;
    }

    return payload;
  };
  var parseStartChatData = function parseStartChatData(_ref) {
    var access = _ref.access,
      events = _ref.events,
      chatProperties = _ref.chatProperties,
      threadProperties = _ref.threadProperties;
    var chat = {};

    if (access && access.groups) {
      chat.access = {
        group_ids: access.groups
      };
    }

    if (events) {
      chat.thread = {
        events: events.map(parseEvent)
      };
    }

    if (chatProperties) {
      chat.properties = chatProperties;
    }

    if (threadProperties) {
      chat.thread = chat.thread || {};
      chat.thread.properties = threadProperties;
    }

    return {
      chat: chat
    };
  };
  var parseActiveChatData = function parseActiveChatData(chat, data) {
    return merge(parseStartChatData(data), {
      chat: {
        id: chat
      }
    });
  };
  var parseUpdateLastSeenTimestampData = function parseUpdateLastSeenTimestampData(
    data
  ) {
    var parsed = {};
    parsed.chat_id = data.chat;

    if (typeof data.timestamp === "number") {
      parsed.timestamp = Math.floor(data.timestamp / 1000);
    }

    return parsed;
  };

  var sendRequest = function sendRequest(action, data, meta) {
    if (data === void 0) {
      data = null;
    }

    if (meta === void 0) {
      meta = {};
    }

    return {
      type: SEND_REQUEST,
      payload: {
        action: action,
        data: data
      },
      meta: meta
    };
  };
  var sendEvent = function sendEvent(chat, data, meta) {
    var event = parseEvent(data);
    var payload = {
      chat_id: chat,
      event: event
    };

    if (isObject(meta)) {
      if (meta.attachToLastThread) {
        payload.attach_to_last_thread = true;
      }
    }

    var action = sendRequest(SEND_EVENT, payload);
    return action;
  };
  var setChatActive = function setChatActive(id, active) {
    return {
      type: SET_CHAT_ACTIVE,
      payload: {
        id: id,
        active: active
      }
    };
  };

  var SUCCESS = Object.freeze({
    success: true
  });

  var parseAccess = function parseAccess(access) {
    return access.group_ids
      ? {
          groups: access.group_ids
        }
      : {};
  };

  var parseServerTimestamp = function parseServerTimestamp(timestamp) {
    return typeof timestamp === "number" ? timestamp * 1000 : null;
  };

  var parseUsersLastSeenTimestamps = function parseUsersLastSeenTimestamps(
    users
  ) {
    return mapValues(function(user) {
      return parseServerTimestamp(user.last_seen_timestamp);
    }, keyBy("id", users));
  };

  var parseProperties = function parseProperties(properties) {
    return mapValues(function(propNamespace) {
      return mapValues(function(_ref) {
        var value = _ref.value;
        return value;
      }, propNamespace);
    }, properties);
  };

  var parseCommonEventProps = function parseCommonEventProps(thread, event) {
    var parsed = {
      id: event.id,
      author: event.author_id,
      timestamp: parseServerTimestamp(event.timestamp),
      thread: thread,
      properties:
        event.properties !== undefined ? parseProperties(event.properties) : {}
    };

    if (event.custom_id !== undefined) {
      parsed.customId = event.custom_id;
    }

    return parsed;
  };

  var downsizeWithRatio = function downsizeWithRatio(max, dimensions) {
    var _ref3;

    var _ref2 =
        dimensions.height > dimensions.width
          ? ["height", "width"]
          : ["width", "height"],
      biggerProp = _ref2[0],
      smallerProp = _ref2[1];

    var bigger = dimensions[biggerProp],
      smaller = dimensions[smallerProp];
    var ratio = max / bigger;
    return (
      (_ref3 = {}),
      (_ref3[biggerProp] = Math.min(bigger, max)),
      (_ref3[smallerProp] = Math.min(ratio * smaller, smaller)),
      _ref3
    );
  };

  var parseImage = function parseImage(thread, image) {
    var parsed = _extends({}, parseCommonEventProps(thread, image), {
      type: "file",
      contentType: image.content_type,
      url: image.url,
      width: image.width,
      height: image.height
    });

    if (image.thumbnail_url) {
      parsed.thumbnails = {
        default: _extends(
          {
            url: image.thumbnail_url
          },
          mapValues(Math.ceil, downsizeWithRatio(300, image))
        ),
        high: _extends(
          {
            url: image.thumbnail2x_url
          },
          mapValues(Math.ceil, downsizeWithRatio(600, image))
        )
      };
    }

    return parsed;
  };

  var parseFile = function parseFile(thread, file) {
    if (file.width !== undefined && file.height !== undefined) {
      return parseImage(thread, file);
    }

    return _extends({}, parseCommonEventProps(thread, file), {
      type: "file",
      contentType: file.content_type,
      url: file.url
    });
  };

  var parseMessage = function parseMessage(thread, message) {
    return _extends({}, parseCommonEventProps(thread, message), {
      type: "message",
      text: message.text
    });
  };

  var parseRichMessageElement = function parseRichMessageElement(element) {
    var parsed = pickOwn(["title", "subtitle"], element);

    if (element.image) {
      // TODO: we should reuse parseImage here
      parsed.image = {
        url: element.image.url
      };
    }

    if (element.buttons) {
      parsed.buttons = element.buttons.map(function(_ref4) {
        var text = _ref4.text,
          postback = _ref4.postback_id,
          users = _ref4.user_ids,
          type = _ref4.type,
          value = _ref4.value;
        var button = {
          text: text,
          postback: postback,
          users: users
        };

        if (type) {
          button.type = type;
          button.value = value;
        }

        return button;
      });
    }

    return parsed;
  };

  var parseRichMessage = function parseRichMessage(thread, richMessage) {
    return _extends({}, parseCommonEventProps(thread, richMessage), {
      type: "rich_message",
      template: richMessage.template_id,
      elements: richMessage.elements.map(parseRichMessageElement)
    });
  };

  var parseSystemMessage = function parseSystemMessage(thread, systemMessage) {
    var parsed = _extends(
      {},
      parseCommonEventProps(
        thread,
        _extends({}, systemMessage, {
          author_id: "system"
        })
      ),
      {
        type: "system_message",
        text: systemMessage.text,
        systemMessageType: systemMessage.system_message_type
      }
    );

    if (systemMessage.text_vars) {
      parsed.textVars = systemMessage.text_vars;
    }

    return parsed;
  };

  var parseUknownEvent = function parseUknownEvent(thread, event) {
    return _extends(
      {},
      parseCommonEventProps(thread, event),
      omit(["id", "author_id", "timestamp", "custom_id", "order"], event)
    );
  };

  var parseEvent$1 = function parseEvent(thread, event) {
    switch (event.type) {
      case "file":
        return parseFile(thread, event);

      case "message":
        return parseMessage(thread, event);

      case "rich_message":
        return parseRichMessage(thread, event);

      case "system_message":
        return parseSystemMessage(thread, event);

      default:
        return parseUknownEvent(thread, event);
    }
  };

  var parseThread = function parseThread(chat, users, thread) {
    return {
      id: thread.id,
      chat: chat,
      active: thread.active,
      order: thread.order,
      users: thread.user_ids,
      // TODO: is this relevant for anyone?
      lastSeenTimestamps: parseUsersLastSeenTimestamps(users),
      events: numericSortBy("order", thread.events).map(function(event) {
        return parseEvent$1(thread.id, event);
      }),
      properties: parseProperties(thread.properties || {})
    };
  };

  var parseThreadSummary = function parseThreadSummary(thread) {
    return _extends(
      {},
      omit(["events", "users", "lastSeenTimestamps"], thread),
      {
        totalEvents: thread.events.length
      }
    );
  };

  var parseAgent = function parseAgent(agent) {
    return {
      id: agent.id,
      // keep literal here, so every non-customer gets treated as agent
      // currently there are only 2 types of users - customer & agent (bots have type: "agent")
      // so this is purely defensive measure, trying to stay future-proof
      type: "agent",
      name: agent.name,
      avatar: agent.avatar,
      jobTitle: agent.job_title
    };
  };

  var parseCustomer = function parseCustomer(customer) {
    var parsed = {
      id: customer.id,
      type: customer.type,
      fields: customer.fields || {}
    };

    if (customer.name) {
      parsed.name = customer.name;
    }

    if (customer.email) {
      parsed.email = customer.email;
    }

    return parsed;
  };

  var parseUser = function parseUser(user) {
    return user.type === "customer" ? parseCustomer(user) : parseAgent(user);
  };

  var parseNewThreadData = function parseNewThreadData(chat) {
    var id = chat.id,
      _chat$access = chat.access,
      access = _chat$access === void 0 ? {} : _chat$access,
      thread = chat.thread,
      users = chat.users;
    return {
      access: parseAccess(access),
      events: thread.events.map(function(event) {
        return parseEvent$1(thread.id, event);
      }),
      users: users.map(parseUser),
      thread: parseThread(id, users, thread)
    };
  };

  var parseChatPropertiesDeletedPush = function parseChatPropertiesDeletedPush(
    payload
  ) {
    return {
      chat: payload.chat_id,
      properties: payload.properties
    };
  };

  var parseChatPropertiesUpdatedPush = function parseChatPropertiesUpdatedPush(
    payload
  ) {
    return {
      chat: payload.chat_id,
      properties: parseProperties(payload.properties)
    };
  };

  var parseChatThreadPropertiesDeletedPush = function parseChatThreadPropertiesDeletedPush(
    payload
  ) {
    return {
      chat: payload.chat_id,
      thread: payload.thread_id,
      properties: payload.properties
    };
  };

  var parseChatThreadPropertiesUpdatedPush = function parseChatThreadPropertiesUpdatedPush(
    payload
  ) {
    return {
      chat: payload.chat_id,
      thread: payload.thread_id,
      properties: parseProperties(payload.properties)
    };
  };

  var parseChatUserAddedPush = function parseChatUserAddedPush(payload) {
    var chat = payload.chat_id,
      user = payload.user;
    return {
      chat: chat,
      user: parseUser(user)
    };
  };

  var parseChatUserRemovedPush = function parseChatUserRemovedPush(payload) {
    var chat = payload.chat_id,
      user = payload.user_id;
    return {
      chat: chat,
      user: user
    };
  };

  var parseCustomerPageUpdatedPush = function parseCustomerPageUpdatedPush(
    payload
  ) {
    return {
      url: payload.url,
      title: payload.title,
      timestamp: parseServerTimestamp(payload.timestamp)
    };
  };

  var parseCustomerUpdatedPush = function parseCustomerUpdatedPush(payload) {
    return parseCustomer(payload.customer);
  };

  var parseEventPropertiesDeletedPush = function parseEventPropertiesDeletedPush(
    payload
  ) {
    return {
      chat: payload.chat_id,
      thread: payload.thread_id,
      event: payload.event_id,
      properties: payload.properties
    };
  };

  var parseEventUpdatedPush = function parseEventUpdatedPush(payload) {
    var thread = payload.thread_id;
    return {
      chat: payload.chat_id,
      thread: thread,
      event: parseEvent$1(thread, payload.event)
    };
  };

  var parseGetChatThreadsResponse = function parseGetChatThreadsResponse(
    payload
  ) {
    var _payload$chat = payload.chat,
      threads = _payload$chat.threads,
      users = _payload$chat.users,
      id = _payload$chat.id;
    var sortedThreads = numericSortBy("order", threads);
    return {
      threads: sortedThreads.map(function(thread) {
        return parseThread(id, users, thread);
      }),
      users: users.map(parseUser)
    };
  };

  var parseGetChatThreadsSummaryResponse = function parseGetChatThreadsSummaryResponse(
    payload
  ) {
    var chatThreadsSummary = payload.threads_summary,
      totalThreads = payload.total_threads;
    var threadsSummary = numericSortBy(
      "order",
      chatThreadsSummary.map(function(_ref5) {
        var totalEvents = _ref5.total_events,
          id = _ref5.id,
          active = _ref5.active,
          order = _ref5.order;
        return {
          id: id,
          active: active,
          order: order,
          totalEvents: totalEvents
        };
      })
    );
    return {
      threadsSummary: threadsSummary,
      totalThreads: totalThreads
    };
  };

  var parseIncomingChatThreadPush = function parseIncomingChatThreadPush(
    payload
  ) {
    return parseNewThreadData(payload.chat);
  };

  var parseIncomingEventPush = function parseIncomingEventPush(payload) {
    return {
      chat: payload.chat_id,
      event: parseEvent$1(payload.thread_id, payload.event)
    };
  };

  var parseIncomingTypingIndicatorPush = function parseIncomingTypingIndicatorPush(
    payload
  ) {
    var chat = payload.chat_id,
      data = payload.typing_indicator;
    return {
      chat: chat,
      user: data.author_id,
      isTyping: data.is_typing
    };
  };

  var parseLastSeenTimestampUpdatedPush = function parseLastSeenTimestampUpdatedPush(
    payload
  ) {
    return {
      chat: payload.chat_id,
      user: payload.user_id,
      timestamp: parseServerTimestamp(payload.timestamp)
    };
  };

  var parseGetChatsSummaryResponse = function parseGetChatsSummaryResponse(
    payload
  ) {
    var chatsSummary = payload.chats_summary.map(function(_ref6) {
      var id = _ref6.id,
        active = _ref6.active,
        _ref6$access = _ref6.access,
        access = _ref6$access === void 0 ? {} : _ref6$access,
        order = _ref6.order,
        lastThreadId = _ref6.last_thread_id,
        lastEventsPerType = _ref6.last_event_per_type,
        _ref6$properties = _ref6.properties,
        properties = _ref6$properties === void 0 ? {} : _ref6$properties,
        users = _ref6.users;
      var chatSummary = {};
      chatSummary.id = id;
      chatSummary.active = active;
      chatSummary.access = parseAccess(access);
      chatSummary.order = parseServerTimestamp(order);
      chatSummary.properties = parseProperties(properties);
      chatSummary.users = users.map(function(_ref7) {
        var user = _ref7.id;
        return user;
      });
      chatSummary.lastThread = lastThreadId;
      chatSummary.lastSeenTimestamps = parseUsersLastSeenTimestamps(users);

      if (!lastEventsPerType) {
        return chatSummary;
      }

      chatSummary.lastEventsPerType = mapValues(function(_ref8) {
        var thread = _ref8.thread_id,
          event = _ref8.event;
        return parseEvent$1(thread, event);
      }, lastEventsPerType);
      var lastEventsArray = Object.keys(lastEventsPerType).map(function(
        eventType
      ) {
        return lastEventsPerType[eventType];
      });
      var lastEvent = last(
        lastEventsArray.sort(function(eventA, eventB) {
          if (eventA.thread_id === eventB.thread_id) {
            return eventA.event.order - eventB.event.order;
          }

          return eventA.thread_order - eventB.thread_order;
        })
      );

      if (lastEvent) {
        chatSummary.lastEvent = cloneDeep(
          chatSummary.lastEventsPerType[lastEvent.event.type]
        );
      }

      return chatSummary;
    });
    return {
      chatsSummary: numericSortBy(function(_ref9) {
        var lastEvent = _ref9.lastEvent,
          order = _ref9.order;
        return -1 * (lastEvent !== undefined ? lastEvent.timestamp : order);
      }, chatsSummary),
      totalChats: payload.total_chats,
      users: compose(
        function(users) {
          return users.map(parseUser);
        },
        function(users) {
          return uniqBy(function(user) {
            return user.id;
          }, users);
        },
        function(summary) {
          return flatMap(function(_ref10) {
            var users = _ref10.users;
            return users;
          }, summary);
        }
      )(payload.chats_summary)
    };
  };

  var parseGetFormResponse = function parseGetFormResponse(payload) {
    if (!payload.enabled) {
      return payload;
    }

    return _extends({}, payload, {
      form: _extends({}, payload.form, {
        fields: payload.form.fields.map(function(field) {
          if (field.type === "group_chooser") {
            return _extends({}, field, {
              options: field.options.map(function(_ref11) {
                var group = _ref11.group_id,
                  option = _objectWithoutPropertiesLoose(_ref11, ["group_id"]);

                return _extends({}, option, {
                  group: group
                });
              })
            });
          }

          if (field.type === "rating") {
            var commentLabel = field.comment_label,
              parsed = _objectWithoutPropertiesLoose(field, ["comment_label"]);

            return _extends({}, parsed, {
              commentLabel: commentLabel
            });
          }

          return field;
        })
      })
    });
  };

  var parseGetGroupsStatus = function parseGetGroupsStatus(payload) {
    return payload.groups_status;
  };

  var parseGetUrlDetailsResponse = function parseGetUrlDetailsResponse(
    payload
  ) {
    var title = payload.title,
      description = payload.description,
      url = payload.url,
      imageUrl = payload.image_url,
      width = payload.image_width,
      height = payload.image_height;
    return {
      title: title,
      description: description,
      url: url,
      image: {
        url: "https://" + imageUrl,
        width: width,
        height: height
      }
    };
  };

  var parseSendEventResponse = function parseSendEventResponse(payload) {
    if (payload.chat) {
      return parseNewThreadData(payload.chat);
    }

    return {
      event: parseEvent$1(payload.thread_id, payload.event)
    };
  };

  var parseActivatedChatResponse = function parseActivatedChatResponse(
    payload
  ) {
    var _payload$chat2 = payload.chat,
      id = _payload$chat2.id,
      _payload$chat2$access = _payload$chat2.access,
      access = _payload$chat2$access === void 0 ? {} : _payload$chat2$access,
      thread = _payload$chat2.thread,
      users = _payload$chat2.users,
      properties = _payload$chat2.properties;
    var chat = {
      id: id,
      access: parseAccess(access),
      users: users.map(function(_ref12) {
        var userId = _ref12.id;
        return userId;
      }),
      thread: thread.id,
      events: thread.events.map(function(event) {
        return parseEvent$1(thread.id, event);
      }),
      properties: parseProperties(properties || {})
    };
    return {
      chat: chat,
      thread: parseThread(id, users, thread),
      users: users.map(parseUser)
    };
  };

  var parsePush = function parsePush(push) {
    switch (push.action) {
      case CHAT_PROPERTIES_DELETED:
        return parseChatPropertiesDeletedPush(push.payload);

      case CHAT_PROPERTIES_UPDATED:
        return parseChatPropertiesUpdatedPush(push.payload);

      case CHAT_THREAD_PROPERTIES_DELETED:
        return parseChatThreadPropertiesDeletedPush(push.payload);

      case CHAT_THREAD_PROPERTIES_UPDATED:
        return parseChatThreadPropertiesUpdatedPush(push.payload);

      case CHAT_USER_ADDED:
        return parseChatUserAddedPush(push.payload);

      case CHAT_USER_REMOVED:
        return parseChatUserRemovedPush(push.payload);

      case CUSTOMER_PAGE_UPDATED:
        return parseCustomerPageUpdatedPush(push.payload);

      case CUSTOMER_UPDATED:
        return parseCustomerUpdatedPush(push.payload);

      case EVENT_PROPERTIES_DELETED:
        return parseEventPropertiesDeletedPush(push.payload);

      case EVENT_UPDATED:
        return parseEventUpdatedPush(push.payload);

      case INCOMING_CHAT_THREAD:
        return parseIncomingChatThreadPush(push.payload);

      case INCOMING_EVENT:
        return parseIncomingEventPush(push.payload);

      case INCOMING_TYPING_INDICATOR:
        return parseIncomingTypingIndicatorPush(push.payload);

      case LAST_SEEN_TIMESTAMP_UPDATED:
        return parseLastSeenTimestampUpdatedPush(push.payload);

      case THREAD_CLOSED:
        return {
          chat: push.payload.chat_id
        };

      default:
        return push.payload;
    }
  };
  var parseResponse = function parseResponse(action, payload) {
    switch (action) {
      case ACTIVATE_CHAT:
        return parseActivatedChatResponse(payload);

      case CLOSE_THREAD:
        return SUCCESS;

      case DELETE_CHAT_PROPERTIES:
        return SUCCESS;

      case DELETE_CHAT_THREAD_PROPERTIES:
        return SUCCESS;

      case DELETE_EVENT_PROPERTIES:
        return SUCCESS;

      case GET_CHAT_THREADS:
        return parseGetChatThreadsResponse(payload);

      case GET_CHAT_THREADS_SUMMARY:
        return parseGetChatThreadsSummaryResponse(payload);

      case GET_CHATS_SUMMARY:
        return parseGetChatsSummaryResponse(payload);

      case GET_FORM:
        return parseGetFormResponse(payload);

      case GET_GROUPS_STATUS:
        return parseGetGroupsStatus(payload);

      case GET_URL_DETAILS:
        return parseGetUrlDetailsResponse(payload);

      case SEND_EVENT:
        return parseSendEventResponse(payload);

      case SEND_SNEAK_PEEK:
        return SUCCESS;

      case SET_CUSTOMER_FIELDS$1:
        return parseCustomerUpdatedPush(payload);

      case START_CHAT:
        return parseActivatedChatResponse(payload);

      case UPDATE_CHAT_PROPERTIES:
        return SUCCESS;

      case UPDATE_CHAT_THREAD_PROPERTIES:
        return SUCCESS;

      case UPDATE_CUSTOMER$1:
        return parseCustomerUpdatedPush(payload);

      case UPDATE_CUSTOMER_PAGE$1:
        return parseCustomerPageUpdatedPush(payload);

      case UPDATE_LAST_SEEN_TIMESTAMP:
        return {
          timestamp: parseServerTimestamp(payload.timestamp)
        };

      default:
        return payload;
    }
  }; // TODO: rethink this part, is "custom" REQUEST_FAILED needed?
  // can't we just use serverError.type as error.code always?

  var parseServerError = function parseServerError(action, error) {
    switch (error.type) {
      case "authentication": // may be received as error for get_predicted_agent request
      // eslint-disable-next-line no-fallthrough

      case "group_unavailable": // may be received as error for start_chat & activate_chat requests
      // eslint-disable-next-line no-fallthrough

      case "groups_offline": // may be received as error for get_predicted_agent request
      // eslint-disable-next-line no-fallthrough

      case "group_offline":
      case "request_timeout":
      case "users_limit_reached":
      case "validation":
      case "wrong_product_version":
        return {
          code: error.type.toUpperCase(),
          message: error.message
        };

      default:
        return _extends(
          {
            code: "REQUEST_FAILED"
          },
          error
        );
    }
  };

  var sendRequestAction = function(store, action) {
    action.payload.id = generateUniqueId(store.getState().requests);

    var _deferred = deferred(),
      resolve = _deferred.resolve,
      reject$$1 = _deferred.reject,
      promise = _deferred.promise;

    action.payload.promise = promise;
    action.payload.resolve = resolve;
    action.payload.reject = reject$$1;
    store.dispatch(action);
    return promise;
  };

  /**
   * Expose `Backoff`.
   */
  var backo2 = Backoff;
  /**
   * Initialize backoff timer with `opts`.
   *
   * - `min` initial timeout in milliseconds [100]
   * - `max` max timeout [10000]
   * - `jitter` [0]
   * - `factor` [2]
   *
   * @param {Object} opts
   * @api public
   */

  function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
  }
  /**
   * Return the backoff duration.
   *
   * @return {Number}
   * @api public
   */

  Backoff.prototype.duration = function() {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);

    if (this.jitter) {
      var rand = Math.random();
      var deviation = Math.floor(rand * this.jitter * ms);
      ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }

    return Math.min(ms, this.max) | 0;
  };
  /**
   * Reset the number of attempts.
   *
   * @api public
   */

  Backoff.prototype.reset = function() {
    this.attempts = 0;
  };
  /**
   * Set the minimum duration
   *
   * @api public
   */

  Backoff.prototype.setMin = function(min) {
    this.ms = min;
  };
  /**
   * Set the maximum duration
   *
   * @api public
   */

  Backoff.prototype.setMax = function(max) {
    this.max = max;
  };
  /**
   * Set the jitter
   *
   * @api public
   */

  Backoff.prototype.setJitter = function(jitter) {
    this.jitter = jitter;
  };

  var AUTHENTICATION = "AUTHENTICATION";
  var USERS_LIMIT_REACHED = "USERS_LIMIT_REACHED";
  var WRONG_PRODUCT_VERSION = "WRONG_PRODUCT_VERSION";

  var getSideStorageKey = function getSideStorageKey(store) {
    var _store$getState = store.getState(),
      license = _store$getState.license,
      group = _store$getState.group,
      uniqueGroups = _store$getState.uniqueGroups;

    return "side_storage_" + license + (uniqueGroups ? ":" + group : "");
  };

  var getSideStorage = function getSideStorage(store) {
    return storage$1
      .getItem(getSideStorageKey(store))
      .catch(noop)
      .then(function(sideStorage) {
        if (sideStorage === void 0) {
          sideStorage = "{}";
        }

        return JSON.parse(sideStorage);
      }) // shouldnt get triggered, just a defensive measure against malformed storage entries
      .catch(function() {
        return {};
      });
  };
  var saveSideStorage = function saveSideStorage(store, sideStorage) {
    return storage$1
      .setItem(getSideStorageKey(store), JSON.stringify(sideStorage))
      .catch(noop);
  };

  var CANCELLED = "CANCELLED";

  var delay = function delay(ms) {
    return new Promise(function(resolve) {
      setTimeout(resolve, ms);
    });
  };

  var getCommonCustomerData = function getCommonCustomerData(customerUpdate) {
    var customer = {};

    if (customerUpdate.name) {
      customer.name = customerUpdate.name;
    }

    if (customerUpdate.email) {
      customer.email = customerUpdate.email;
    }

    return customer;
  };

  var getCustomerDataForLogin = function getCustomerDataForLogin(
    customerUpdate
  ) {
    var customer = getCommonCustomerData(customerUpdate);

    if (customerUpdate.fieldsToSet) {
      customer.fields = customerUpdate.fieldsToSet;
    }

    return customer;
  };

  var getCustomerDataForPostLogin = function getCustomerDataForPostLogin(
    customerUpdate,
    pendingFieldsToUpdate
  ) {
    var customer = getCommonCustomerData(customerUpdate);

    if (customerUpdate.fieldsToUpdate) {
      customer.fields = _extends(
        {},
        pendingFieldsToUpdate || {},
        customerUpdate.fieldsToUpdate
      );
    }

    return customer;
  };

  function createLoginTask(socket, auth) {
    var store;
    var currentTaskId;
    var pendingFieldsToUpdate = null;
    var sentPage = null;
    var backoff = new backo2({
      min: 300,
      max: 60000,
      jitter: 0.3
    });

    var getTokenAndSideStorage = function getTokenAndSideStorage() {
      return Promise.all([auth.getToken(), getSideStorage(store)]);
    };

    var dispatchSelfId = function dispatchSelfId(_ref) {
      var token = _ref[0],
        sideStorage = _ref[1];

      if (getSelfId(store.getState()) === null) {
        var entityId = token.entityId;
        store.dispatch({
          type: SET_SELF_ID,
          payload: entityId
        });
      }

      return [token, sideStorage];
    };

    var sendLogin = function sendLogin(_ref2) {
      var token = _ref2[0],
        sideStorage = _ref2[1];
      var state = store.getState();
      var group = state.group,
        page = state.page,
        referrer = state.referrer,
        customerUpdate = state.customerUpdate;
      var customer = getCustomerDataForLogin(customerUpdate);
      pendingFieldsToUpdate = customerUpdate.fieldsToUpdate;
      store.dispatch({
        type: CLEAR_CUSTOMER_UPDATE
      });
      var payload = {
        token: token.tokenType + " " + token.accessToken,
        customer: customer,
        customer_side_storage: sideStorage
      };

      if (typeof group === "number") {
        payload.group_id = group;
      }

      if (page !== null) {
        sentPage = page;
        payload.customer_page = page;
      }

      if (referrer !== null) {
        payload.referrer = referrer;
      }

      return Promise.race([
        sendRequestAction(
          store,
          sendRequest(LOGIN, payload, {
            source: "login"
          })
        ),
        delay(15 * 1000).then(function() {
          return Promise.reject(
            createError$1({
              message: "Request timed out.",
              code: "REQUEST_TIMEOUT"
            })
          );
        })
      ]);
    };

    var updateCustomerDataIfNeeded = function updateCustomerDataIfNeeded(
      loginResponse
    ) {
      var _store$getState = store.getState(),
        customerUpdate = _store$getState.customerUpdate,
        page = _store$getState.page;

      if (sentPage !== page) {
        sendRequestAction(
          store,
          sendRequest(UPDATE_CUSTOMER_PAGE$1, page)
        ).catch(noop);
      }

      var fieldsToSet = customerUpdate.fieldsToSet;

      if (fieldsToSet) {
        pendingFieldsToUpdate = null;
        sendRequestAction(
          store,
          sendRequest(SET_CUSTOMER_FIELDS$1, fieldsToSet)
        ).catch(noop);
      }

      var pendingUpdate = getCustomerDataForPostLogin(
        customerUpdate,
        pendingFieldsToUpdate
      );

      if (Object.keys(pendingUpdate).length) {
        sendRequestAction(
          store,
          sendRequest(UPDATE_CUSTOMER$1, pendingUpdate)
        ).catch(noop);
      }

      pendingFieldsToUpdate = null;
      sentPage = null;
      store.dispatch({
        type: CLEAR_CUSTOMER_UPDATE
      });
      return loginResponse;
    };

    var getChatsSummary = function getChatsSummary(loginResponse) {
      return Promise.all([
        loginResponse,
        sendRequestAction(
          store,
          sendRequest(GET_CHATS_SUMMARY, null, {
            source: "login"
          })
        )
      ]);
    };

    var dispatchLoginSuccess = function dispatchLoginSuccess(_ref3) {
      var loginResponse = _ref3[0],
        _ref3$ = _ref3[1],
        chatsSummary = _ref3$.chatsSummary,
        totalChats = _ref3$.totalChats;
      store.dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          previousStatus: getConnectionStatus(store.getState()),
          chatsSummary: chatsSummary,
          totalChats: totalChats,
          dynamicConfig: loginResponse.__priv_dynamic_config
        }
      });
      backoff.reset();
    };

    var reconnect = function reconnect() {
      store.dispatch({
        type: RECONNECT,
        payload: {
          delay: backoff.duration()
        }
      });
    };

    var startNewTask = function startNewTask() {
      var id = generateRandomId();
      currentTaskId = id;
      [
        getTokenAndSideStorage,
        dispatchSelfId,
        sendLogin,
        updateCustomerDataIfNeeded,
        getChatsSummary
      ]
        .reduce(function(prevStep, nextStep) {
          return prevStep.then(function(result) {
            if (id !== currentTaskId) {
              var err = new Error("Cancelled.");
              err.code = CANCELLED;
              throw err;
            }

            return nextStep(result);
          });
        }, Promise.resolve())
        .then(dispatchLoginSuccess, function(error) {
          switch (error.code) {
            case AUTHENTICATION:
              auth.getFreshToken();
              reconnect();
              return;

            case CANCELLED:
              return;

            case "CONNECTION_LOST":
              // this is connectivity problem, not a server error
              // and is taken care of in socket module
              // as it has its own backoff implementation
              return;
            // those are auth errors, we should maybe export those constants from the auth package

            case "SSO_IDENTITY_EXCEPTION":
            case "SSO_OAUTH_EXCEPTION":
              if (
                error.message === "server_error" ||
                error.message === "temporarily_unavailable"
              ) {
                reconnect();
                return;
              }

              store.dispatch({
                type: DESTROY,
                payload: {
                  reason: error.message
                }
              });
              return;

            case USERS_LIMIT_REACHED:
            case WRONG_PRODUCT_VERSION:
              store.dispatch({
                type: DESTROY,
                payload: {
                  reason: error.code.toLowerCase()
                }
              });
              return;

            default:
              reconnect();
              return;
          }
        });
    };

    return function(_store) {
      // after switching to callbags, we should be able to use smth similar to redux-observable
      // and thus just use store given to epic
      store = _store;
      startNewTask();
    };
  }

  var index =
    typeof fetch == "function"
      ? fetch
      : function(url, options) {
          options = options || {};
          return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.open(options.method || "get", url);

            for (var i in options.headers) {
              request.setRequestHeader(i, options.headers[i]);
            }

            request.withCredentials = options.credentials == "include";

            request.onload = function() {
              resolve(response());
            };

            request.onerror = reject;
            request.send(options.body);

            function response() {
              var keys = [],
                all = [],
                headers = {},
                header;
              request
                .getAllResponseHeaders()
                .replace(/^(.*?):\s*([\s\S]*?)$/gm, function(m, key, value) {
                  keys.push((key = key.toLowerCase()));
                  all.push([key, value]);
                  header = headers[key];
                  headers[key] = header ? header + "," + value : value;
                });
              return {
                ok: ((request.status / 200) | 0) == 1,
                // 200-399
                status: request.status,
                statusText: request.statusText,
                url: request.responseURL,
                clone: response,
                text: function() {
                  return Promise.resolve(request.responseText);
                },
                json: function() {
                  return Promise.resolve(request.responseText).then(JSON.parse);
                },
                xml: function() {
                  return Promise.resolve(request.responseXML);
                },
                blob: function() {
                  return Promise.resolve(new Blob([request.response]));
                },
                headers: {
                  keys: function() {
                    return keys;
                  },
                  entries: function() {
                    return all;
                  },
                  get: function(n) {
                    return headers[n.toLowerCase()];
                  },
                  has: function(n) {
                    return n.toLowerCase() in headers;
                  }
                }
              };
            }
          });
        };

  var checkGoals = function(store, auth) {
    var state = store.getState();
    var page = state.page;

    if (!page || !page.url) {
      return;
    }

    auth.getToken().then(function(token) {
      var query = buildQueryString({
        license_id: state.license
      });
      var payload = {
        customer_fields: getSelfData(state).fields,
        group_id: state.group || 0,
        page_url: page.url
      };
      index(state.serverUrl + "/action/" + CHECK_GOALS$1 + "?" + query, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.tokenType + " " + token.accessToken
        },
        body: JSON.stringify({
          payload: payload
        })
      }).catch(noop);
    });
  };

  var hasActivatedNewThread = function hasActivatedNewThread(response) {
    return !!(response.users && response.thread);
  };

  var updateStateIfNeeded = function updateStateIfNeeded(store, action) {
    var state = store.getState();
    var type = action.payload.action;

    if (action.type === PUSH_RECEIVED) {
      var _data = action.payload.push;

      switch (type) {
        case INCOMING_CHAT_THREAD:
          store.dispatch(setChatActive(_data.thread.chat, true));
          return;

        case THREAD_CLOSED:
          store.dispatch(setChatActive(_data.chat, false));
          return;

        case CUSTOMER_UPDATED:
          store.dispatch({
            type: SET_CUSTOMER_DATA,
            payload: _data
          });
          return;

        default:
          return;
      }
    }

    var data = action.payload.response;

    switch (type) {
      case CLOSE_THREAD:
        store.dispatch(setChatActive(action.payload.data.chat_id, false));
        return;

      case GET_CHATS_SUMMARY:
        data.chatsSummary
          .filter(function(_ref) {
            var id = _ref.id,
              active = _ref.active;
            return isChatActive(state, id) !== active;
          })
          .forEach(function(_ref2) {
            var id = _ref2.id,
              active = _ref2.active;
            store.dispatch(setChatActive(id, active));
          });
        return;

      case SEND_EVENT:
        if (hasActivatedNewThread(data)) {
          store.dispatch(setChatActive(action.payload.data.chat_id, true));
        }

        return;

      case ACTIVATE_CHAT:
      case START_CHAT:
        store.dispatch(setChatActive(data.chat.id, true));
        return;

      case UPDATE_CUSTOMER$1:
      case SET_CUSTOMER_FIELDS$1:
        // both those responses are handled through customer_updated push-response
        // so the shape of the "response" objects is the same
        store.dispatch({
          type: SET_CUSTOMER_DATA,
          payload: data
        });
        return;

      default:
        return;
    }
  };

  var sendRequest$1 = function sendRequest$$1(store, socket, _ref3) {
    var _ref3$payload = _ref3.payload,
      id = _ref3$payload.id,
      action = _ref3$payload.action,
      payload = _ref3$payload.data;
    var frame = {};
    frame.request_id = id;
    frame.action = action;

    if (payload !== null) {
      frame.payload = payload;
    }

    socket.emit(frame);
  };

  var emitUsers = function emitUsers(emit, users) {
    users.forEach(function(user) {
      emit("user_data", user);
    });
  };

  var emitNewThreadData = function emitNewThreadData(emit, data) {
    var threadSummary = parseThreadSummary(data.thread);
    emitUsers(emit, data.users);
    emit("thread_summary", threadSummary);
    data.thread.users.forEach(function(user) {
      emit("user_joined_chat", {
        chat: threadSummary.chat,
        user: user
      });
    });
  };

  var failRequest = function failRequest(store, requestAction, error) {
    var _store$getState = store.getState(),
      requests = _store$getState.requests;

    var requestId = requestAction.payload.id;
    store.dispatch({
      type: REQUEST_FAILED,
      payload: {
        id: requestId,
        reject: requests[requestId].reject,
        error: error
      }
    });
  };

  var handlePush = function handlePush(_ref4, _ref5) {
    var emit = _ref4.emit,
      store = _ref4.store;
    var _ref5$payload = _ref5.payload,
      action = _ref5$payload.action,
      push = _ref5$payload.push;

    switch (action) {
      case CHAT_PROPERTIES_UPDATED:
      case CHAT_THREAD_PROPERTIES_UPDATED:
      case LAST_SEEN_TIMESTAMP_UPDATED:
      case THREAD_CLOSED:
        emit(action, push);
        return;

      case CUSTOMER_SIDE_STORAGE_UPDATED:
        saveSideStorage(store, push.customer_side_storage);
        return;

      case CHAT_USER_ADDED:
        emitUsers(emit, [push.user]);
        emit("user_joined_chat", {
          chat: push.chat,
          user: push.user.id
        });
        return;

      case CHAT_USER_REMOVED:
        emit("user_left_chat", push);
        return;

      case CUSTOMER_DISCONNECTED:
        switch (push.reason) {
          case "customer_banned":
          case "license_not_found":
          case "product_version_changed":
          case "unsupported_version":
            // this also emits `disconnected` event - but it's handled in response to this action by destroy handler
            store.dispatch({
              type: DESTROY,
              payload: push
            });
            break;

          default:
            emit("disconnected", push);
            break;
        }

        return;

      case INCOMING_CHAT_THREAD:
        emitNewThreadData(emit, push);
        push.events.forEach(function(event) {
          emit("new_event", {
            chat: push.thread.chat,
            event: event
          });
        });
        return;

      case INCOMING_EVENT:
        emit("new_event", push);
        return;

      case INCOMING_TYPING_INDICATOR:
        emit(push.isTyping ? "user_is_typing" : "user_stopped_typing", {
          chat: push.chat,
          user: push.user
        });
        return;

      default:
        emit(action, push);
        return;
    }
  };

  var handleResponse = function handleResponse(_ref6, _ref7) {
    var emit = _ref6.emit,
      store = _ref6.store;
    var _ref7$payload = _ref7.payload,
      action = _ref7$payload.action,
      promise = _ref7$payload.promise,
      resolve = _ref7$payload.resolve,
      response = _ref7$payload.response;

    switch (action) {
      case GET_CHAT_THREADS:
        emitUsers(emit, response.users);
        resolve(response.threads);
        return;

      case GET_CHATS_SUMMARY:
        {
          var chatsSummary = response.chatsSummary,
            totalChats = response.totalChats,
            users = response.users;
          emitUsers(emit, users);
          resolve({
            chatsSummary: chatsSummary,
            totalChats: totalChats
          });
        }
        return;

      case SEND_EVENT:
        if (hasActivatedNewThread(response)) {
          emitNewThreadData(emit, response);

          var emitEvents = function emitEvents(events) {
            events.forEach(function(event) {
              emit("new_event", {
                chat: response.thread.chat,
                event: event
              });
            });
          };

          if (response.events[0].author === store.getState().users.self.id) {
            var _response$events = response.events,
              event = _response$events[0],
              events = _response$events.slice(1);

            resolve(event);
            promise.then(function() {
              emitEvents(events);
            });
          } else {
            var _splitAt = splitAt(-1, response.events),
              _events = _splitAt[0],
              _splitAt$ = _splitAt[1],
              _event = _splitAt$[0];

            emitEvents(_events);
            resolve(_event);
          }
        }

        resolve(response.event);
        return;

      case ACTIVATE_CHAT:
      case START_CHAT:
        emitNewThreadData(emit, response);
        resolve(response.chat);
        return;

      default:
        resolve(response);
        return;
    }
  };

  var createSideEffectsHandler = function(_ref8) {
    var auth = _ref8.auth,
      emitter = _ref8.emitter,
      socket = _ref8.socket;
    var emit = emitter.emit;
    var login = createLoginTask(socket, auth);
    return function(action, store) {
      var type = action.type,
        payload = action.payload;

      switch (type) {
        case CHECK_GOALS:
          checkGoals(store, auth);
          return;

        case DESTROY:
          socket.destroy();

          if (payload.reason !== "manual") {
            emit("disconnected", payload);
          }

          emitter.off();
          return;

        case EMIT_EVENTS:
          action.payload.forEach(function(_ref9) {
            var eventName = _ref9[0],
              eventData = _ref9[1];
            emit(eventName, eventData);
          });
          return;

        case LOGIN_SUCCESS:
          {
            var eventData = {
              chatsSummary: payload.chatsSummary,
              totalChats: payload.totalChats
            };
            Object.defineProperty(eventData, "__unsafeDynamicConfig", {
              value: payload.dynamicConfig
            });
            emit(
              payload.previousStatus === DISCONNECTED
                ? "connected"
                : "connection_restored",
              eventData
            );

            var _store$getState2 = store.getState(),
              queuedPushes = _store$getState2.queuedPushes;

            if (queuedPushes.length !== 0) {
              queuedPushes.forEach(function(queuedPush) {
                handlePush(
                  {
                    emit: emit,
                    store: store
                  },
                  queuedPush
                );
              });
              store.dispatch({
                type: CLEAR_PUSH_QUEUE
              });
            }
          }
          return;

        case PREFETCH_TOKEN:
          auth.getToken().catch(noop);
          return;

        case PUSH_RECEIVED:
          updateStateIfNeeded(store, action);

          if (!isConnected(store.getState())) {
            store.dispatch({
              type: QUEUE_PUSH,
              payload: action
            });
            return;
          }

          handlePush(
            {
              emit: emit,
              store: store
            },
            action
          );
          return;

        case RECONNECT:
          socket.reconnect(action.payload.delay);
          return;

        case REQUEST_FAILED:
          payload.reject(createError$1(payload.error));
          return;

        case RESPONSE_RECEIVED:
          updateStateIfNeeded(store, action);
          handleResponse(
            {
              emit: emit,
              store: store
            },
            action
          );
          return;

        case SEND_REQUEST:
          {
            var state = store.getState();

            if (isDestroyed(state)) {
              failRequest(store, action, {
                code: "SDK_DESTROYED",
                message: "SDK destroyed."
              });
              return;
            }

            if (!isConnected(state) && action.meta.source !== "login") {
              failRequest(store, action, {
                code: "NO_CONNECTION",
                message: "No connection."
              });
              return;
            }

            sendRequest$1(store, socket, action);
          }
          return;

        case SET_CUSTOMER_FIELDS:
          if (!isConnected(store.getState())) {
            return;
          }

          sendRequestAction(
            store,
            sendRequest(SET_CUSTOMER_FIELDS$1, payload)
          ).catch(noop);
          return;

        case SET_SELF_ID:
          emit("customer_id", payload);
          return;

        case SOCKET_CONNECTED:
          login(store);
          return;

        case SOCKET_DISCONNECTED:
          if (payload.previousStatus === CONNECTED) {
            emit("connection_lost");
          }

          payload.rejects.forEach(function(reject$$1) {
            reject$$1(
              createError$1({
                message: "Connection lost.",
                code: "CONNECTION_LOST"
              })
            );
          });
          return;

        case STOP_CONNECTION:
          socket.disconnect();
          return;

        case START_CONNECTION:
          socket.connect();
          store.dispatch({
            type: PREFETCH_TOKEN
          });
          return;

        case UPDATE_CUSTOMER:
          if (!isConnected(store.getState())) {
            return;
          }

          sendRequestAction(
            store,
            sendRequest(UPDATE_CUSTOMER$1, payload)
          ).catch(noop);
          return;

        case UPDATE_CUSTOMER_PAGE:
          if (!isConnected(store.getState())) {
            return;
          }

          sendRequestAction(
            store,
            sendRequest(UPDATE_CUSTOMER_PAGE$1, payload)
          ).catch(noop);
          return;

        default:
          return;
      }
    };
  };

  var HISTORY_EVENT_COUNT_TARGET = 50;

  var splitSummary = function splitSummary(threadsSummary) {
    var _splitRightWhenAccum = splitRightWhenAccum(
        function(_ref, acc) {
          var totalEvents = _ref.totalEvents;
          var sum$$1 = acc + totalEvents;
          return [sum$$1 >= HISTORY_EVENT_COUNT_TARGET, sum$$1];
        },
        0,
        threadsSummary
      ),
      leftover = _splitRightWhenAccum[0],
      targeted = _splitRightWhenAccum[1];

    return [
      leftover,
      targeted.map(function(threadSummary) {
        return threadSummary.id;
      })
    ];
  };

  var distributeSummary = function distributeSummary(state, threadsSummary) {
    var result = splitSummary(threadsSummary);
    state.threadsSummary = result[0];
    state.threadsToFetch = result[1];
  };

  var createState = function createState() {
    return {
      done: false,
      idle: true,
      leftToFetch: Infinity,
      queuedTasks: [],
      totalThreads: Infinity,
      threadsSummary: null,
      threadsToFetch: []
    };
  };

  var loadThreads = function loadThreads(api, chat, threadsToFetch) {
    return api.getChatThreads(chat, threadsToFetch);
  };

  var loadLatest = function loadLatest(api, chat) {
    return api
      .getChatThreadsSummary(chat, {
        offset: 0
      })
      .then(function(_ref2) {
        var threadsSummary = _ref2.threadsSummary,
          totalThreads = _ref2.totalThreads;

        var _splitSummary = splitSummary(threadsSummary),
          threadsSummaryLeftover = _splitSummary[0],
          threadsToFetch = _splitSummary[1];

        return Promise.all([
          {
            threadsSummary: threadsSummaryLeftover,
            totalThreads: totalThreads
          },
          loadThreads(api, chat, threadsToFetch)
        ]);
      });
  };

  var loadNextSummaryBatch = function loadNextSummaryBatch(api, chat, state) {
    return api
      .getChatThreadsSummary(chat, {
        offset: 0
      })
      .then(function(_ref3) {
        var totalThreads = _ref3.totalThreads;
        var offset = totalThreads - state.leftToFetch;
        return api.getChatThreadsSummary(chat, {
          offset: offset
        });
      });
  };

  var onLoadedThreads = function onLoadedThreads(store, state, threads) {
    state.idle = true;
    state.threadsToFetch = [];
    state.leftToFetch -= threads.length;
    var events = flatMap(function(thread) {
      return thread.events;
    }, threads);
    store.dispatch({
      type: EMIT_EVENTS,
      payload: threads.map(function(thread) {
        return ["thread_summary", parseThreadSummary(thread)];
      })
    });

    if (state.leftToFetch === 0) {
      state.done = true;
      return {
        value: events,
        done: true
      };
    }

    return {
      value: events,
      done: false
    };
  };

  var onFailedLoad = function onFailedLoad(state, err) {
    state.idle = true;
    state.queuedTasks.forEach(function(_ref4) {
      var reject$$1 = _ref4.reject;
      return reject$$1(err);
    });
    return err;
  };

  var chatHistory = function(store, api, chat) {
    var historyState = createState();

    var _next = function next(resolve, reject$$1) {
      if (historyState.done) {
        resolve({
          done: true
        });
        return;
      }

      if (!historyState.idle) {
        historyState.queuedTasks.push({
          resolve: resolve,
          reject: reject$$1
        });
        return;
      }

      var task;
      historyState.idle = false;

      if (!historyState.threadsSummary) {
        task = loadLatest(api, chat).then(function(_ref5) {
          var _ref5$ = _ref5[0],
            threadsSummary = _ref5$.threadsSummary,
            totalThreads = _ref5$.totalThreads,
            threads = _ref5[1];
          historyState.threadsSummary = threadsSummary;
          historyState.totalThreads = historyState.leftToFetch = totalThreads;
          return threads;
        });
      } else if (historyState.threadsToFetch.length > 0) {
        task = loadThreads(api, chat, historyState.threadsToFetch);
      } else if (historyState.threadsSummary.length > 0) {
        distributeSummary(historyState, historyState.threadsSummary);
        task = loadThreads(api, chat, historyState.threadsToFetch);
      } else {
        task = loadNextSummaryBatch(api, chat, historyState).then(function(
          _ref6
        ) {
          var threadsSummary = _ref6.threadsSummary;
          distributeSummary(historyState, threadsSummary);
          return loadThreads(api, chat, historyState.threadsToFetch);
        });
      }

      task
        .then(function(threads) {
          resolve(onLoadedThreads(store, historyState, threads));
          var queuedTask = historyState.queuedTasks.shift();

          if (!queuedTask) {
            return;
          }

          _next(queuedTask.resolve, queuedTask.reject);
        })
        .catch(function(err) {
          return reject$$1(onFailedLoad(historyState, err));
        });
    };

    return {
      next: function next() {
        return new Promise(_next);
      }
    };
  };

  var commonjsGlobal =
    typeof window !== "undefined"
      ? window
      : typeof global !== "undefined"
      ? global
      : typeof self !== "undefined"
      ? self
      : {};

  function createCommonjsModule(fn, module) {
    return (
      (module = { exports: {} }), fn(module, module.exports), module.exports
    );
  }

  var browserCrypto = createCommonjsModule(function(module) {
    if (commonjsGlobal.crypto && commonjsGlobal.crypto.getRandomValues) {
      module.exports.randomBytes = function(length) {
        var bytes = new Uint8Array(length);
        commonjsGlobal.crypto.getRandomValues(bytes);
        return bytes;
      };
    } else {
      module.exports.randomBytes = function(length) {
        var bytes = new Array(length);
        for (var i = 0; i < length; i++) {
          bytes[i] = Math.floor(Math.random() * 256);
        }
        return bytes;
      };
    }
  });

  /* global crypto:true */

  // This string has length 32, a power of 2, so the modulus doesn't introduce a
  // bias.
  var _randomStringChars = "abcdefghijklmnopqrstuvwxyz012345";
  var random = {
    string: function(length) {
      var max = _randomStringChars.length;
      var bytes = browserCrypto.randomBytes(length);
      var ret = [];
      for (var i = 0; i < length; i++) {
        ret.push(_randomStringChars.substr(bytes[i] % max, 1));
      }
      return ret.join("");
    },

    number: function(max) {
      return Math.floor(Math.random() * max);
    },

    numberString: function(max) {
      var t = ("" + (max - 1)).length;
      var p = new Array(t + 1).join("0");
      return (p + this.number(max)).slice(-t);
    }
  };

  var event = createCommonjsModule(function(module) {
    var onUnload = {},
      afterUnload = false,
      // detect google chrome packaged apps because they don't allow the 'unload' event
      isChromePackagedApp =
        commonjsGlobal.chrome &&
        commonjsGlobal.chrome.app &&
        commonjsGlobal.chrome.app.runtime;
    module.exports = {
      attachEvent: function(event, listener) {
        if (typeof commonjsGlobal.addEventListener !== "undefined") {
          commonjsGlobal.addEventListener(event, listener, false);
        } else if (commonjsGlobal.document && commonjsGlobal.attachEvent) {
          // IE quirks.
          // According to: http://stevesouders.com/misc/test-postmessage.php
          // the message gets delivered only to 'document', not 'window'.
          commonjsGlobal.document.attachEvent("on" + event, listener);
          // I get 'window' for ie8.
          commonjsGlobal.attachEvent("on" + event, listener);
        }
      },

      detachEvent: function(event, listener) {
        if (typeof commonjsGlobal.addEventListener !== "undefined") {
          commonjsGlobal.removeEventListener(event, listener, false);
        } else if (commonjsGlobal.document && commonjsGlobal.detachEvent) {
          commonjsGlobal.document.detachEvent("on" + event, listener);
          commonjsGlobal.detachEvent("on" + event, listener);
        }
      },

      unloadAdd: function(listener) {
        if (isChromePackagedApp) {
          return null;
        }

        var ref = random.string(8);
        onUnload[ref] = listener;
        if (afterUnload) {
          setTimeout(this.triggerUnloadCallbacks, 0);
        }
        return ref;
      },

      unloadDel: function(ref) {
        if (ref in onUnload) {
          delete onUnload[ref];
        }
      },

      triggerUnloadCallbacks: function() {
        for (var ref in onUnload) {
          onUnload[ref]();
          delete onUnload[ref];
        }
      }
    };

    var unloadTriggered = function() {
      if (afterUnload) {
        return;
      }
      afterUnload = true;
      module.exports.triggerUnloadCallbacks();
    };

    // 'unload' alone is not reliable in opera within an iframe, but we
    // can't use `beforeunload` as IE fires it on javascript: links.
    if (!isChromePackagedApp) {
      module.exports.attachEvent("unload", unloadTriggered);
    }
  });

  /**
   * Check if we're required to add a port number.
   *
   * @see https://url.spec.whatwg.org/#default-port
   * @param {Number|String} port Port number we need to check
   * @param {String} protocol Protocol we need to check against.
   * @returns {Boolean} Is it a default port for the given protocol
   * @api private
   */

  var requiresPort = function required(port, protocol) {
    protocol = protocol.split(":")[0];
    port = +port;
    if (!port) return false;

    switch (protocol) {
      case "http":
      case "ws":
        return port !== 80;

      case "https":
      case "wss":
        return port !== 443;

      case "ftp":
        return port !== 21;

      case "gopher":
        return port !== 70;

      case "file":
        return false;
    }

    return port !== 0;
  };

  var has = Object.prototype.hasOwnProperty,
    undef;
  /**
   * Decode a URI encoded string.
   *
   * @param {String} input The URI encoded string.
   * @returns {String} The decoded string.
   * @api private
   */

  function decode(input) {
    return decodeURIComponent(input.replace(/\+/g, " "));
  }
  /**
   * Simple query string parser.
   *
   * @param {String} query The query string that needs to be parsed.
   * @returns {Object}
   * @api public
   */

  function querystring(query) {
    var parser = /([^=?&]+)=?([^&]*)/g,
      result = {},
      part;

    while ((part = parser.exec(query))) {
      var key = decode(part[1]),
        value = decode(part[2]); //
      // Prevent overriding of existing properties. This ensures that build-in
      // methods like `toString` or __proto__ are not overriden by malicious
      // querystrings.
      //

      if (key in result) continue;
      result[key] = value;
    }

    return result;
  }
  /**
   * Transform a query string to an object.
   *
   * @param {Object} obj Object that should be transformed.
   * @param {String} prefix Optional prefix.
   * @returns {String}
   * @api public
   */

  function querystringify(obj, prefix) {
    prefix = prefix || "";
    var pairs = [],
      value,
      key; //
    // Optionally prefix with a '?' if needed
    //

    if ("string" !== typeof prefix) prefix = "?";

    for (key in obj) {
      if (has.call(obj, key)) {
        value = obj[key]; //
        // Edge cases where we actually want to encode the value to an empty
        // string instead of the stringified value.
        //

        if (!value && (value === null || value === undef || isNaN(value))) {
          value = "";
        }

        pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
      }
    }

    return pairs.length ? prefix + pairs.join("&") : "";
  } //
  // Expose the module.
  //

  var stringify = querystringify;
  var parse = querystring;

  var querystringify_1 = {
    stringify: stringify,
    parse: parse
  };

  var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
    slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
  /**
   * These are the parse rules for the URL parser, it informs the parser
   * about:
   *
   * 0. The char it Needs to parse, if it's a string it should be done using
   *    indexOf, RegExp using exec and NaN means set as current value.
   * 1. The property we should set when parsing this value.
   * 2. Indication if it's backwards or forward parsing, when set as number it's
   *    the value of extra chars that should be split off.
   * 3. Inherit from location if non existing in the parser.
   * 4. `toLowerCase` the resulting value.
   */

  var rules = [
    ["#", "hash"], // Extract from the back.
    ["?", "query"], // Extract from the back.
    function sanitize(address) {
      // Sanitize what is left of the address
      return address.replace("\\", "/");
    },
    ["/", "pathname"], // Extract from the back.
    ["@", "auth", 1], // Extract from the front.
    [NaN, "host", undefined, 1, 1], // Set left over value.
    [/:(\d+)$/, "port", undefined, 1], // RegExp the back.
    [NaN, "hostname", undefined, 1, 1] // Set left over.
  ];
  /**
   * These properties should not be copied or inherited from. This is only needed
   * for all non blob URL's as a blob URL does not include a hash, only the
   * origin.
   *
   * @type {Object}
   * @private
   */

  var ignore = {
    hash: 1,
    query: 1
  };
  /**
   * The location object differs when your code is loaded through a normal page,
   * Worker or through a worker using a blob. And with the blobble begins the
   * trouble as the location object will contain the URL of the blob, not the
   * location of the page where our code is loaded in. The actual origin is
   * encoded in the `pathname` so we can thankfully generate a good "default"
   * location from it so we can generate proper relative URL's again.
   *
   * @param {Object|String} loc Optional default location object.
   * @returns {Object} lolcation object.
   * @public
   */

  function lolcation(loc) {
    var globalVar;
    if (typeof window !== "undefined") globalVar = window;
    else if (typeof commonjsGlobal !== "undefined") globalVar = commonjsGlobal;
    else if (typeof self !== "undefined") globalVar = self;
    else globalVar = {};
    var location = globalVar.location || {};
    loc = loc || location;
    var finaldestination = {},
      type = typeof loc,
      key;

    if ("blob:" === loc.protocol) {
      finaldestination = new Url(unescape(loc.pathname), {});
    } else if ("string" === type) {
      finaldestination = new Url(loc, {});

      for (key in ignore) delete finaldestination[key];
    } else if ("object" === type) {
      for (key in loc) {
        if (key in ignore) continue;
        finaldestination[key] = loc[key];
      }

      if (finaldestination.slashes === undefined) {
        finaldestination.slashes = slashes.test(loc.href);
      }
    }

    return finaldestination;
  }
  /**
   * @typedef ProtocolExtract
   * @type Object
   * @property {String} protocol Protocol matched in the URL, in lowercase.
   * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
   * @property {String} rest Rest of the URL that is not part of the protocol.
   */

  /**
   * Extract protocol information from a URL with/without double slash ("//").
   *
   * @param {String} address URL we want to extract from.
   * @return {ProtocolExtract} Extracted information.
   * @private
   */

  function extractProtocol(address) {
    var match = protocolre.exec(address);
    return {
      protocol: match[1] ? match[1].toLowerCase() : "",
      slashes: !!match[2],
      rest: match[3]
    };
  }
  /**
   * Resolve a relative URL pathname against a base URL pathname.
   *
   * @param {String} relative Pathname of the relative URL.
   * @param {String} base Pathname of the base URL.
   * @return {String} Resolved pathname.
   * @private
   */

  function resolve(relative, base) {
    var path = (base || "/")
        .split("/")
        .slice(0, -1)
        .concat(relative.split("/")),
      i = path.length,
      last = path[i - 1],
      unshift = false,
      up = 0;

    while (i--) {
      if (path[i] === ".") {
        path.splice(i, 1);
      } else if (path[i] === "..") {
        path.splice(i, 1);
        up++;
      } else if (up) {
        if (i === 0) unshift = true;
        path.splice(i, 1);
        up--;
      }
    }

    if (unshift) path.unshift("");
    if (last === "." || last === "..") path.push("");
    return path.join("/");
  }
  /**
   * The actual URL instance. Instead of returning an object we've opted-in to
   * create an actual constructor as it's much more memory efficient and
   * faster and it pleases my OCD.
   *
   * It is worth noting that we should not use `URL` as class name to prevent
   * clashes with the global URL instance that got introduced in browsers.
   *
   * @constructor
   * @param {String} address URL we want to parse.
   * @param {Object|String} [location] Location defaults for relative paths.
   * @param {Boolean|Function} [parser] Parser for the query string.
   * @private
   */

  function Url(address, location, parser) {
    if (!(this instanceof Url)) {
      return new Url(address, location, parser);
    }

    var relative,
      extracted,
      parse,
      instruction,
      index,
      key,
      instructions = rules.slice(),
      type = typeof location,
      url = this,
      i = 0; //
    // The following if statements allows this module two have compatibility with
    // 2 different API:
    //
    // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
    //    where the boolean indicates that the query string should also be parsed.
    //
    // 2. The `URL` interface of the browser which accepts a URL, object as
    //    arguments. The supplied object will be used as default values / fall-back
    //    for relative paths.
    //

    if ("object" !== type && "string" !== type) {
      parser = location;
      location = null;
    }

    if (parser && "function" !== typeof parser) parser = querystringify_1.parse;
    location = lolcation(location); //
    // Extract protocol information before running the instructions.
    //

    extracted = extractProtocol(address || "");
    relative = !extracted.protocol && !extracted.slashes;
    url.slashes = extracted.slashes || (relative && location.slashes);
    url.protocol = extracted.protocol || location.protocol || "";
    address = extracted.rest; //
    // When the authority component is absent the URL starts with a path
    // component.
    //

    if (!extracted.slashes) instructions[3] = [/(.*)/, "pathname"];

    for (; i < instructions.length; i++) {
      instruction = instructions[i];

      if (typeof instruction === "function") {
        address = instruction(address);
        continue;
      }

      parse = instruction[0];
      key = instruction[1];

      if (parse !== parse) {
        url[key] = address;
      } else if ("string" === typeof parse) {
        if (~(index = address.indexOf(parse))) {
          if ("number" === typeof instruction[2]) {
            url[key] = address.slice(0, index);
            address = address.slice(index + instruction[2]);
          } else {
            url[key] = address.slice(index);
            address = address.slice(0, index);
          }
        }
      } else if ((index = parse.exec(address))) {
        url[key] = index[1];
        address = address.slice(0, index.index);
      }

      url[key] =
        url[key] || (relative && instruction[3] ? location[key] || "" : ""); //
      // Hostname, host and protocol should be lowercased so they can be used to
      // create a proper `origin`.
      //

      if (instruction[4]) url[key] = url[key].toLowerCase();
    } //
    // Also parse the supplied query string in to an object. If we're supplied
    // with a custom parser as function use that instead of the default build-in
    // parser.
    //

    if (parser) url.query = parser(url.query); //
    // If the URL is relative, resolve the pathname against the base URL.
    //

    if (
      relative &&
      location.slashes &&
      url.pathname.charAt(0) !== "/" &&
      (url.pathname !== "" || location.pathname !== "")
    ) {
      url.pathname = resolve(url.pathname, location.pathname);
    } //
    // We should not add port numbers if they are already the default port number
    // for a given protocol. As the host also contains the port number we're going
    // override it with the hostname which contains no port number.
    //

    if (!requiresPort(url.port, url.protocol)) {
      url.host = url.hostname;
      url.port = "";
    } //
    // Parse down the `auth` for the username and password.
    //

    url.username = url.password = "";

    if (url.auth) {
      instruction = url.auth.split(":");
      url.username = instruction[0] || "";
      url.password = instruction[1] || "";
    }

    url.origin =
      url.protocol && url.host && url.protocol !== "file:"
        ? url.protocol + "//" + url.host
        : "null"; //
    // The href is just the compiled result.
    //

    url.href = url.toString();
  }
  /**
   * This is convenience method for changing properties in the URL instance to
   * insure that they all propagate correctly.
   *
   * @param {String} part          Property we need to adjust.
   * @param {Mixed} value          The newly assigned value.
   * @param {Boolean|Function} fn  When setting the query, it will be the function
   *                               used to parse the query.
   *                               When setting the protocol, double slash will be
   *                               removed from the final url if it is true.
   * @returns {URL} URL instance for chaining.
   * @public
   */

  function set$2(part, value, fn) {
    var url = this;

    switch (part) {
      case "query":
        if ("string" === typeof value && value.length) {
          value = (fn || querystringify_1.parse)(value);
        }

        url[part] = value;
        break;

      case "port":
        url[part] = value;

        if (!requiresPort(value, url.protocol)) {
          url.host = url.hostname;
          url[part] = "";
        } else if (value) {
          url.host = url.hostname + ":" + value;
        }

        break;

      case "hostname":
        url[part] = value;
        if (url.port) value += ":" + url.port;
        url.host = value;
        break;

      case "host":
        url[part] = value;

        if (/:\d+$/.test(value)) {
          value = value.split(":");
          url.port = value.pop();
          url.hostname = value.join(":");
        } else {
          url.hostname = value;
          url.port = "";
        }

        break;

      case "protocol":
        url.protocol = value.toLowerCase();
        url.slashes = !fn;
        break;

      case "pathname":
      case "hash":
        if (value) {
          var char = part === "pathname" ? "/" : "#";
          url[part] = value.charAt(0) !== char ? char + value : value;
        } else {
          url[part] = value;
        }

        break;

      default:
        url[part] = value;
    }

    for (var i = 0; i < rules.length; i++) {
      var ins = rules[i];
      if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
    }

    url.origin =
      url.protocol && url.host && url.protocol !== "file:"
        ? url.protocol + "//" + url.host
        : "null";
    url.href = url.toString();
    return url;
  }
  /**
   * Transform the properties back in to a valid and full URL string.
   *
   * @param {Function} stringify Optional query stringify function.
   * @returns {String} Compiled version of the URL.
   * @public
   */

  function toString(stringify) {
    if (!stringify || "function" !== typeof stringify)
      stringify = querystringify_1.stringify;
    var query,
      url = this,
      protocol = url.protocol;
    if (protocol && protocol.charAt(protocol.length - 1) !== ":")
      protocol += ":";
    var result = protocol + (url.slashes ? "//" : "");

    if (url.username) {
      result += url.username;
      if (url.password) result += ":" + url.password;
      result += "@";
    }

    result += url.host + url.pathname;
    query = "object" === typeof url.query ? stringify(url.query) : url.query;
    if (query) result += "?" !== query.charAt(0) ? "?" + query : query;
    if (url.hash) result += url.hash;
    return result;
  }

  Url.prototype = {
    set: set$2,
    toString: toString
  }; //
  // Expose the URL parser and some additional properties that might be useful for
  // others or testing.
  //

  Url.extractProtocol = extractProtocol;
  Url.location = lolcation;
  Url.qs = querystringify_1;
  var urlParse = Url;

  /**
   * Helpers.
   */
  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;
  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms = function(val, options) {
    options = options || {};
    var type = typeof val;

    if (type === "string" && val.length > 0) {
      return parse$1(val);
    } else if (type === "number" && isNaN(val) === false) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }

    throw new Error(
      "val is not a non-empty string or a valid number. val=" +
        JSON.stringify(val)
    );
  };
  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse$1(str) {
    str = String(str);

    if (str.length > 100) {
      return;
    }

    var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str
    );

    if (!match) {
      return;
    }

    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();

    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;

      case "weeks":
      case "week":
      case "w":
        return n * w;

      case "days":
      case "day":
      case "d":
        return n * d;

      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;

      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;

      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;

      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;

      default:
        return undefined;
    }
  }
  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort(ms) {
    var msAbs = Math.abs(ms);

    if (msAbs >= d) {
      return Math.round(ms / d) + "d";
    }

    if (msAbs >= h) {
      return Math.round(ms / h) + "h";
    }

    if (msAbs >= m) {
      return Math.round(ms / m) + "m";
    }

    if (msAbs >= s) {
      return Math.round(ms / s) + "s";
    }

    return ms + "ms";
  }
  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong(ms) {
    var msAbs = Math.abs(ms);

    if (msAbs >= d) {
      return plural(ms, msAbs, d, "day");
    }

    if (msAbs >= h) {
      return plural(ms, msAbs, h, "hour");
    }

    if (msAbs >= m) {
      return plural(ms, msAbs, m, "minute");
    }

    if (msAbs >= s) {
      return plural(ms, msAbs, s, "second");
    }

    return ms + " ms";
  }
  /**
   * Pluralization helper.
   */

  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
  }

  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   */
  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = ms;
    Object.keys(env).forEach(function(key) {
      createDebug[key] = env[key];
    });
    /**
     * Active `debug` instances.
     */

    createDebug.instances = [];
    /**
     * The currently active debug mode names, and names to skip.
     */

    createDebug.names = [];
    createDebug.skips = [];
    /**
     * Map of special "%n" handling functions, for the debug "format" argument.
     *
     * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
     */

    createDebug.formatters = {};
    /**
     * Selects a color for a debug namespace
     * @param {String} namespace The namespace string for the for the debug instance to be colored
     * @return {Number|String} An ANSI color code for the given namespace
     * @api private
     */

    function selectColor(namespace) {
      var hash = 0;

      for (var i = 0; i < namespace.length; i++) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }

      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }

    createDebug.selectColor = selectColor;
    /**
     * Create a debugger with the given `namespace`.
     *
     * @param {String} namespace
     * @return {Function}
     * @api public
     */

    function createDebug(namespace) {
      var prevTime;

      function debug() {
        // Disabled?
        if (!debug.enabled) {
          return;
        }

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        var self = debug; // Set `diff` timestamp

        var curr = Number(new Date());
        var ms$$1 = curr - (prevTime || curr);
        self.diff = ms$$1;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);

        if (typeof args[0] !== "string") {
          // Anything else let's inspect with %O
          args.unshift("%O");
        } // Apply any `formatters` transformations

        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          // If we encounter an escaped % then don't increase the array index
          if (match === "%%") {
            return match;
          }

          index++;
          var formatter = createDebug.formatters[format];

          if (typeof formatter === "function") {
            var val = args[index];
            match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

            args.splice(index, 1);
            index--;
          }

          return match;
        }); // Apply env-specific formatting (colors, etc.)

        createDebug.formatArgs.call(self, args);
        var logFn = self.log || createDebug.log;
        logFn.apply(self, args);
      }

      debug.namespace = namespace;
      debug.enabled = createDebug.enabled(namespace);
      debug.useColors = createDebug.useColors();
      debug.color = selectColor(namespace);
      debug.destroy = destroy;
      debug.extend = extend; // Debug.formatArgs = formatArgs;
      // debug.rawLog = rawLog;
      // env-specific initialization logic for debug instances

      if (typeof createDebug.init === "function") {
        createDebug.init(debug);
      }

      createDebug.instances.push(debug);
      return debug;
    }

    function destroy() {
      var index = createDebug.instances.indexOf(this);

      if (index !== -1) {
        createDebug.instances.splice(index, 1);
        return true;
      }

      return false;
    }

    function extend(namespace, delimiter) {
      return createDebug(
        this.namespace +
          (typeof delimiter === "undefined" ? ":" : delimiter) +
          namespace
      );
    }
    /**
     * Enables a debug mode by namespaces. This can include modes
     * separated by a colon and wildcards.
     *
     * @param {String} namespaces
     * @api public
     */

    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.names = [];
      createDebug.skips = [];
      var i;
      var split = (typeof namespaces === "string" ? namespaces : "").split(
        /[\s,]+/
      );
      var len = split.length;

      for (i = 0; i < len; i++) {
        if (!split[i]) {
          // ignore empty strings
          continue;
        }

        namespaces = split[i].replace(/\*/g, ".*?");

        if (namespaces[0] === "-") {
          createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          createDebug.names.push(new RegExp("^" + namespaces + "$"));
        }
      }

      for (i = 0; i < createDebug.instances.length; i++) {
        var instance = createDebug.instances[i];
        instance.enabled = createDebug.enabled(instance.namespace);
      }
    }
    /**
     * Disable debug output.
     *
     * @api public
     */

    function disable() {
      createDebug.enable("");
    }
    /**
     * Returns true if the given mode name is enabled, false otherwise.
     *
     * @param {String} name
     * @return {Boolean}
     * @api public
     */

    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }

      var i;
      var len;

      for (i = 0, len = createDebug.skips.length; i < len; i++) {
        if (createDebug.skips[i].test(name)) {
          return false;
        }
      }

      for (i = 0, len = createDebug.names.length; i < len; i++) {
        if (createDebug.names[i].test(name)) {
          return true;
        }
      }

      return false;
    }
    /**
     * Coerce `val`.
     *
     * @param {Mixed} val
     * @return {Mixed}
     * @api private
     */

    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }

      return val;
    }

    createDebug.enable(createDebug.load());
    return createDebug;
  }

  var common = setup;

  var browser = createCommonjsModule(function(module, exports) {
    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj &&
            typeof Symbol === "function" &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
            ? "symbol"
            : typeof obj;
        };
      }
      return _typeof(obj);
    }

    /* eslint-env browser */

    /**
     * This is the web browser implementation of `debug()`.
     */
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    /**
     * Colors.
     */

    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    /**
     * Currently only WebKit-based Web Inspectors, Firefox >= v31,
     * and the Firebug extension (any Firefox version) are known
     * to support "%c" CSS customizations.
     *
     * TODO: add a `localStorage` variable to explicitly enable/disable colors
     */
    // eslint-disable-next-line complexity

    function useColors() {
      // NB: In an Electron preload script, document will be defined but not fully
      // initialized. Since we know we're in Chrome, we'll just detect this case
      // explicitly
      if (
        typeof window !== "undefined" &&
        window.process &&
        (window.process.type === "renderer" || window.process.__nwjs)
      ) {
        return true;
      } // Internet Explorer and Edge do not support colors.

      if (
        typeof navigator !== "undefined" &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ) {
        return false;
      } // Is webkit? http://stackoverflow.com/a/16459606/376773
      // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632

      return (
        (typeof document !== "undefined" &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) || // Is firebug? http://stackoverflow.com/a/398120/376773
        (typeof window !== "undefined" &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) || // Is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        (typeof navigator !== "undefined" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) || // Double check webkit in userAgent just in case we are in a worker
        (typeof navigator !== "undefined" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
      );
    }
    /**
     * Colorize log arguments if enabled.
     *
     * @api public
     */

    function formatArgs(args) {
      args[0] =
        (this.useColors ? "%c" : "") +
        this.namespace +
        (this.useColors ? " %c" : " ") +
        args[0] +
        (this.useColors ? "%c " : " ") +
        "+" +
        module.exports.humanize(this.diff);

      if (!this.useColors) {
        return;
      }

      var c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit"); // The final "%c" is somewhat tricky, because there could be other
      // arguments passed either before or after the %c, so we need to
      // figure out the correct index to insert the CSS into

      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if (match === "%%") {
          return;
        }

        index++;

        if (match === "%c") {
          // We only are interested in the *last* %c
          // (the user may have provided their own)
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    /**
     * Invokes `console.log()` when available.
     * No-op when `console.log` is not a "function".
     *
     * @api public
     */

    function log() {
      var _console;

      // This hackery is required for IE8/9, where
      // the `console.log` function doesn't have 'apply'
      return (
        (typeof console === "undefined" ? "undefined" : _typeof(console)) ===
          "object" &&
        console.log &&
        (_console = console).log.apply(_console, arguments)
      );
    }
    /**
     * Save `namespaces`.
     *
     * @param {String} namespaces
     * @api private
     */

    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
        // Swallow
        // XXX (@Qix-) should we be logging these?
      }
    }
    /**
     * Load `namespaces`.
     *
     * @return {String} returns the previously persisted debug modes
     * @api private
     */

    function load() {
      var r;

      try {
        r = exports.storage.getItem("debug");
      } catch (error) {} // Swallow
      // XXX (@Qix-) should we be logging these?
      // If debug isn't set in LS, and we're in Electron, try to load $DEBUG

      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }

      return r;
    }
    /**
     * Localstorage attempts to return the localstorage.
     *
     * This is necessary because safari throws
     * when a user disables cookies/localstorage
     * and you attempt to access it.
     *
     * @return {LocalStorage}
     * @api private
     */

    function localstorage() {
      try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
      } catch (error) {
        // Swallow
        // XXX (@Qix-) should we be logging these?
      }
    }

    module.exports = common(exports);
    var formatters = module.exports.formatters;
    /**
     * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
     */

    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  });

  var debug = function() {};
  {
    debug = browser("sockjs-client:utils:url");
  }

  var url = {
    getOrigin: function(url) {
      if (!url) {
        return null;
      }

      var p = new urlParse(url);
      if (p.protocol === "file:") {
        return null;
      }

      var port = p.port;
      if (!port) {
        port = p.protocol === "https:" ? "443" : "80";
      }

      return p.protocol + "//" + p.hostname + ":" + port;
    },

    isOriginEqual: function(a, b) {
      var res = this.getOrigin(a) === this.getOrigin(b);
      debug("same", a, b, res);
      return res;
    },

    isSchemeEqual: function(a, b) {
      return a.split(":")[0] === b.split(":")[0];
    },

    addPath: function(url, path) {
      var qs = url.split("?");
      return qs[0] + path + (qs[1] ? "?" + qs[1] : "");
    },

    addQuery: function(url, q) {
      return url + (url.indexOf("?") === -1 ? "?" + q : "&" + q);
    }
  };

  var inherits_browser = createCommonjsModule(function(module) {
    if (typeof Object.create === "function") {
      // implementation from standard node.js 'util' module
      module.exports = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      };
    } else {
      // old school shim for old browsers
      module.exports = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;

        var TempCtor = function() {};

        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }
  });

  /* Simplified implementation of DOM2 EventTarget.
   *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
   */

  function EventTarget() {
    this._listeners = {};
  }

  EventTarget.prototype.addEventListener = function(eventType, listener) {
    if (!(eventType in this._listeners)) {
      this._listeners[eventType] = [];
    }
    var arr = this._listeners[eventType];
    // #4
    if (arr.indexOf(listener) === -1) {
      // Make a copy so as not to interfere with a current dispatchEvent.
      arr = arr.concat([listener]);
    }
    this._listeners[eventType] = arr;
  };

  EventTarget.prototype.removeEventListener = function(eventType, listener) {
    var arr = this._listeners[eventType];
    if (!arr) {
      return;
    }
    var idx = arr.indexOf(listener);
    if (idx !== -1) {
      if (arr.length > 1) {
        // Make a copy so as not to interfere with a current dispatchEvent.
        this._listeners[eventType] = arr
          .slice(0, idx)
          .concat(arr.slice(idx + 1));
      } else {
        delete this._listeners[eventType];
      }
      return;
    }
  };

  EventTarget.prototype.dispatchEvent = function() {
    var event = arguments[0];
    var t = event.type;
    // equivalent of Array.prototype.slice.call(arguments, 0);
    var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
    // TODO: This doesn't match the real behavior; per spec, onfoo get
    // their place in line from the /first/ time they're set from
    // non-null. Although WebKit bumps it to the end every time it's
    // set.
    if (this["on" + t]) {
      this["on" + t].apply(this, args);
    }
    if (t in this._listeners) {
      // Grab a reference to the listeners list. removeEventListener may alter the list.
      var listeners = this._listeners[t];
      for (var i = 0; i < listeners.length; i++) {
        listeners[i].apply(this, args);
      }
    }
  };

  var eventtarget = EventTarget;

  function EventEmitter() {
    eventtarget.call(this);
  }

  inherits_browser(EventEmitter, eventtarget);

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (type) {
      delete this._listeners[type];
    } else {
      this._listeners = {};
    }
  };

  EventEmitter.prototype.once = function(type, listener) {
    var self = this,
      fired = false;

    function g() {
      self.removeListener(type, g);

      if (!fired) {
        fired = true;
        listener.apply(this, arguments);
      }
    }

    this.on(type, g);
  };

  EventEmitter.prototype.emit = function() {
    var type = arguments[0];
    var listeners = this._listeners[type];
    if (!listeners) {
      return;
    }
    // equivalent of Array.prototype.slice.call(arguments, 1);
    var l = arguments.length;
    var args = new Array(l - 1);
    for (var ai = 1; ai < l; ai++) {
      args[ai - 1] = arguments[ai];
    }
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(this, args);
    }
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener =
    eventtarget.prototype.addEventListener;
  EventEmitter.prototype.removeListener =
    eventtarget.prototype.removeEventListener;

  var EventEmitter_1 = EventEmitter;

  var emitter = {
    EventEmitter: EventEmitter_1
  };

  var websocket = createCommonjsModule(function(module) {
    var Driver = commonjsGlobal.WebSocket || commonjsGlobal.MozWebSocket;
    if (Driver) {
      module.exports = function WebSocketBrowserDriver(url) {
        return new Driver(url);
      };
    } else {
      module.exports = undefined;
    }
  });

  var EventEmitter$1 = emitter.EventEmitter;
  var debug$1 = function() {};
  {
    debug$1 = browser("sockjs-client:websocket");
  }

  function WebSocketTransport(transUrl, ignore, options) {
    if (!WebSocketTransport.enabled()) {
      throw new Error("Transport created when disabled");
    }

    EventEmitter$1.call(this);
    debug$1("constructor", transUrl);

    var self = this;
    var url$$1 = url.addPath(transUrl, "/websocket");
    if (url$$1.slice(0, 5) === "https") {
      url$$1 = "wss" + url$$1.slice(5);
    } else {
      url$$1 = "ws" + url$$1.slice(4);
    }
    this.url = url$$1;

    this.ws = new websocket(this.url, [], options);
    this.ws.onmessage = function(e) {
      debug$1("message event", e.data);
      self.emit("message", e.data);
    };
    // Firefox has an interesting bug. If a websocket connection is
    // created after onunload, it stays alive even when user
    // navigates away from the page. In such situation let's lie -
    // let's not open the ws connection at all. See:
    // https://github.com/sockjs/sockjs-client/issues/28
    // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
    this.unloadRef = event.unloadAdd(function() {
      debug$1("unload");
      self.ws.close();
    });
    this.ws.onclose = function(e) {
      debug$1("close event", e.code, e.reason);
      self.emit("close", e.code, e.reason);
      self._cleanup();
    };
    this.ws.onerror = function(e) {
      debug$1("error event", e);
      self.emit("close", 1006, "WebSocket connection broken");
      self._cleanup();
    };
  }

  inherits_browser(WebSocketTransport, EventEmitter$1);

  WebSocketTransport.prototype.send = function(data) {
    var msg = "[" + data + "]";
    debug$1("send", msg);
    this.ws.send(msg);
  };

  WebSocketTransport.prototype.close = function() {
    debug$1("close");
    var ws = this.ws;
    this._cleanup();
    if (ws) {
      ws.close();
    }
  };

  WebSocketTransport.prototype._cleanup = function() {
    debug$1("_cleanup");
    var ws = this.ws;
    if (ws) {
      ws.onmessage = ws.onclose = ws.onerror = null;
    }
    event.unloadDel(this.unloadRef);
    this.unloadRef = this.ws = null;
    this.removeAllListeners();
  };

  WebSocketTransport.enabled = function() {
    debug$1("enabled");
    return !!websocket;
  };
  WebSocketTransport.transportName = "websocket";

  // In theory, ws should require 1 round trip. But in chrome, this is
  // not very stable over SSL. Most likely a ws connection requires a
  // separate SSL connection, in which case 2 round trips are an
  // absolute minumum.
  WebSocketTransport.roundTrips = 2;

  var websocket$1 = WebSocketTransport;

  var EventEmitter$2 = emitter.EventEmitter;
  var debug$2 = function() {};
  {
    debug$2 = browser("sockjs-client:buffered-sender");
  }

  function BufferedSender(url, sender) {
    debug$2(url);
    EventEmitter$2.call(this);
    this.sendBuffer = [];
    this.sender = sender;
    this.url = url;
  }

  inherits_browser(BufferedSender, EventEmitter$2);

  BufferedSender.prototype.send = function(message) {
    debug$2("send", message);
    this.sendBuffer.push(message);
    if (!this.sendStop) {
      this.sendSchedule();
    }
  };

  // For polling transports in a situation when in the message callback,
  // new message is being send. If the sending connection was started
  // before receiving one, it is possible to saturate the network and
  // timeout due to the lack of receiving socket. To avoid that we delay
  // sending messages by some small time, in order to let receiving
  // connection be started beforehand. This is only a halfmeasure and
  // does not fix the big problem, but it does make the tests go more
  // stable on slow networks.
  BufferedSender.prototype.sendScheduleWait = function() {
    debug$2("sendScheduleWait");
    var self = this;
    var tref;
    this.sendStop = function() {
      debug$2("sendStop");
      self.sendStop = null;
      clearTimeout(tref);
    };
    tref = setTimeout(function() {
      debug$2("timeout");
      self.sendStop = null;
      self.sendSchedule();
    }, 25);
  };

  BufferedSender.prototype.sendSchedule = function() {
    debug$2("sendSchedule", this.sendBuffer.length);
    var self = this;
    if (this.sendBuffer.length > 0) {
      var payload = "[" + this.sendBuffer.join(",") + "]";
      this.sendStop = this.sender(this.url, payload, function(err) {
        self.sendStop = null;
        if (err) {
          debug$2("error", err);
          self.emit("close", err.code || 1006, "Sending error: " + err);
          self.close();
        } else {
          self.sendScheduleWait();
        }
      });
      this.sendBuffer = [];
    }
  };

  BufferedSender.prototype._cleanup = function() {
    debug$2("_cleanup");
    this.removeAllListeners();
  };

  BufferedSender.prototype.close = function() {
    debug$2("close");
    this._cleanup();
    if (this.sendStop) {
      this.sendStop();
      this.sendStop = null;
    }
  };

  var bufferedSender = BufferedSender;

  var EventEmitter$3 = emitter.EventEmitter;
  var debug$3 = function() {};
  {
    debug$3 = browser("sockjs-client:polling");
  }

  function Polling(Receiver, receiveUrl, AjaxObject) {
    debug$3(receiveUrl);
    EventEmitter$3.call(this);
    this.Receiver = Receiver;
    this.receiveUrl = receiveUrl;
    this.AjaxObject = AjaxObject;
    this._scheduleReceiver();
  }

  inherits_browser(Polling, EventEmitter$3);

  Polling.prototype._scheduleReceiver = function() {
    debug$3("_scheduleReceiver");
    var self = this;
    var poll = (this.poll = new this.Receiver(
      this.receiveUrl,
      this.AjaxObject
    ));

    poll.on("message", function(msg) {
      debug$3("message", msg);
      self.emit("message", msg);
    });

    poll.once("close", function(code, reason) {
      debug$3("close", code, reason, self.pollIsClosing);
      self.poll = poll = null;

      if (!self.pollIsClosing) {
        if (reason === "network") {
          self._scheduleReceiver();
        } else {
          self.emit("close", code || 1006, reason);
          self.removeAllListeners();
        }
      }
    });
  };

  Polling.prototype.abort = function() {
    debug$3("abort");
    this.removeAllListeners();
    this.pollIsClosing = true;
    if (this.poll) {
      this.poll.abort();
    }
  };

  var polling = Polling;

  var debug$4 = function() {};
  {
    debug$4 = browser("sockjs-client:sender-receiver");
  }

  function SenderReceiver(
    transUrl,
    urlSuffix,
    senderFunc,
    Receiver,
    AjaxObject
  ) {
    var pollUrl = url.addPath(transUrl, urlSuffix);
    debug$4(pollUrl);
    var self = this;
    bufferedSender.call(this, transUrl, senderFunc);

    this.poll = new polling(Receiver, pollUrl, AjaxObject);
    this.poll.on("message", function(msg) {
      debug$4("poll message", msg);
      self.emit("message", msg);
    });
    this.poll.once("close", function(code, reason) {
      debug$4("poll close", code, reason);
      self.poll = null;
      self.emit("close", code, reason);
      self.close();
    });
  }

  inherits_browser(SenderReceiver, bufferedSender);

  SenderReceiver.prototype.close = function() {
    bufferedSender.prototype.close.call(this);
    debug$4("close");
    this.removeAllListeners();
    if (this.poll) {
      this.poll.abort();
      this.poll = null;
    }
  };

  var senderReceiver = SenderReceiver;

  var debug$5 = function() {};
  {
    debug$5 = browser("sockjs-client:ajax-based");
  }

  function createAjaxSender(AjaxObject) {
    return function(url$$1, payload, callback) {
      debug$5("create ajax sender", url$$1, payload);
      var opt = {};
      if (typeof payload === "string") {
        opt.headers = { "Content-type": "text/plain" };
      }
      var ajaxUrl = url.addPath(url$$1, "/xhr_send");
      var xo = new AjaxObject("POST", ajaxUrl, payload, opt);
      xo.once("finish", function(status) {
        debug$5("finish", status);
        xo = null;

        if (status !== 200 && status !== 204) {
          return callback(new Error("http status " + status));
        }
        callback();
      });
      return function() {
        debug$5("abort");
        xo.close();
        xo = null;

        var err = new Error("Aborted");
        err.code = 1000;
        callback(err);
      };
    };
  }

  function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
    senderReceiver.call(
      this,
      transUrl,
      urlSuffix,
      createAjaxSender(AjaxObject),
      Receiver,
      AjaxObject
    );
  }

  inherits_browser(AjaxBasedTransport, senderReceiver);

  var ajaxBased = AjaxBasedTransport;

  var EventEmitter$4 = emitter.EventEmitter;
  var debug$6 = function() {};
  {
    debug$6 = browser("sockjs-client:receiver:xhr");
  }

  function XhrReceiver(url, AjaxObject) {
    debug$6(url);
    EventEmitter$4.call(this);
    var self = this;

    this.bufferPosition = 0;

    this.xo = new AjaxObject("POST", url, null);
    this.xo.on("chunk", this._chunkHandler.bind(this));
    this.xo.once("finish", function(status, text) {
      debug$6("finish", status, text);
      self._chunkHandler(status, text);
      self.xo = null;
      var reason = status === 200 ? "network" : "permanent";
      debug$6("close", reason);
      self.emit("close", null, reason);
      self._cleanup();
    });
  }

  inherits_browser(XhrReceiver, EventEmitter$4);

  XhrReceiver.prototype._chunkHandler = function(status, text) {
    debug$6("_chunkHandler", status);
    if (status !== 200 || !text) {
      return;
    }

    for (var idx = -1; ; this.bufferPosition += idx + 1) {
      var buf = text.slice(this.bufferPosition);
      idx = buf.indexOf("\n");
      if (idx === -1) {
        break;
      }
      var msg = buf.slice(0, idx);
      if (msg) {
        debug$6("message", msg);
        this.emit("message", msg);
      }
    }
  };

  XhrReceiver.prototype._cleanup = function() {
    debug$6("_cleanup");
    this.removeAllListeners();
  };

  XhrReceiver.prototype.abort = function() {
    debug$6("abort");
    if (this.xo) {
      this.xo.close();
      debug$6("close");
      this.emit("close", null, "user");
      this.xo = null;
    }
    this._cleanup();
  };

  var xhr = XhrReceiver;

  var EventEmitter$5 = emitter.EventEmitter,
    XHR = commonjsGlobal.XMLHttpRequest;
  var debug$7 = function() {};
  {
    debug$7 = browser("sockjs-client:browser:xhr");
  }

  function AbstractXHRObject(method, url$$1, payload, opts) {
    debug$7(method, url$$1);
    var self = this;
    EventEmitter$5.call(this);

    setTimeout(function() {
      self._start(method, url$$1, payload, opts);
    }, 0);
  }

  inherits_browser(AbstractXHRObject, EventEmitter$5);

  AbstractXHRObject.prototype._start = function(method, url$$1, payload, opts) {
    var self = this;

    try {
      this.xhr = new XHR();
    } catch (x) {
      // intentionally empty
    }

    if (!this.xhr) {
      debug$7("no xhr");
      this.emit("finish", 0, "no xhr support");
      this._cleanup();
      return;
    }

    // several browsers cache POSTs
    url$$1 = url.addQuery(url$$1, "t=" + +new Date());

    // Explorer tends to keep connection open, even after the
    // tab gets closed: http://bugs.jquery.com/ticket/5280
    this.unloadRef = event.unloadAdd(function() {
      debug$7("unload cleanup");
      self._cleanup(true);
    });
    try {
      this.xhr.open(method, url$$1, true);
      if (this.timeout && "timeout" in this.xhr) {
        this.xhr.timeout = this.timeout;
        this.xhr.ontimeout = function() {
          debug$7("xhr timeout");
          self.emit("finish", 0, "");
          self._cleanup(false);
        };
      }
    } catch (e) {
      debug$7("exception", e);
      // IE raises an exception on wrong port.
      this.emit("finish", 0, "");
      this._cleanup(false);
      return;
    }

    if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
      debug$7("withCredentials");
      // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
      // "This never affects same-site requests."

      this.xhr.withCredentials = true;
    }
    if (opts && opts.headers) {
      for (var key in opts.headers) {
        this.xhr.setRequestHeader(key, opts.headers[key]);
      }
    }

    this.xhr.onreadystatechange = function() {
      if (self.xhr) {
        var x = self.xhr;
        var text, status;
        debug$7("readyState", x.readyState);
        switch (x.readyState) {
          case 3:
            // IE doesn't like peeking into responseText or status
            // on Microsoft.XMLHTTP and readystate=3
            try {
              status = x.status;
              text = x.responseText;
            } catch (e) {
              // intentionally empty
            }
            debug$7("status", status);
            // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
            if (status === 1223) {
              status = 204;
            }

            // IE does return readystate == 3 for 404 answers.
            if (status === 200 && text && text.length > 0) {
              debug$7("chunk");
              self.emit("chunk", status, text);
            }
            break;
          case 4:
            status = x.status;
            debug$7("status", status);
            // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
            if (status === 1223) {
              status = 204;
            }
            // IE returns this for a bad port
            // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
            if (status === 12005 || status === 12029) {
              status = 0;
            }

            debug$7("finish", status, x.responseText);
            self.emit("finish", status, x.responseText);
            self._cleanup(false);
            break;
        }
      }
    };

    try {
      self.xhr.send(payload);
    } catch (e) {
      self.emit("finish", 0, "");
      self._cleanup(false);
    }
  };

  AbstractXHRObject.prototype._cleanup = function(abort) {
    debug$7("cleanup");
    if (!this.xhr) {
      return;
    }
    this.removeAllListeners();
    event.unloadDel(this.unloadRef);

    // IE needs this field to be a function
    this.xhr.onreadystatechange = function() {};
    if (this.xhr.ontimeout) {
      this.xhr.ontimeout = null;
    }

    if (abort) {
      try {
        this.xhr.abort();
      } catch (x) {
        // intentionally empty
      }
    }
    this.unloadRef = this.xhr = null;
  };

  AbstractXHRObject.prototype.close = function() {
    debug$7("close");
    this._cleanup(true);
  };

  AbstractXHRObject.enabled = !!XHR;
  // override XMLHttpRequest for IE6/7
  // obfuscate to avoid firewalls
  var axo = ["Active"].concat("Object").join("X");
  if (!AbstractXHRObject.enabled && axo in commonjsGlobal) {
    debug$7("overriding xmlhttprequest");
    XHR = function() {
      try {
        return new commonjsGlobal[axo]("Microsoft.XMLHTTP");
      } catch (e) {
        return null;
      }
    };
    AbstractXHRObject.enabled = !!new XHR();
  }

  var cors = false;
  try {
    cors = "withCredentials" in new XHR();
  } catch (ignored) {
    // intentionally empty
  }

  AbstractXHRObject.supportsCORS = cors;

  var abstractXhr = AbstractXHRObject;

  function XHRCorsObject(method, url, payload, opts) {
    abstractXhr.call(this, method, url, payload, opts);
  }

  inherits_browser(XHRCorsObject, abstractXhr);

  XHRCorsObject.enabled = abstractXhr.enabled && abstractXhr.supportsCORS;

  var xhrCors = XHRCorsObject;

  function XHRLocalObject(method, url, payload /*, opts */) {
    abstractXhr.call(this, method, url, payload, {
      noCredentials: true
    });
  }

  inherits_browser(XHRLocalObject, abstractXhr);

  XHRLocalObject.enabled = abstractXhr.enabled;

  var xhrLocal = XHRLocalObject;

  var browser$1 = {
    isOpera: function() {
      return (
        commonjsGlobal.navigator &&
        /opera/i.test(commonjsGlobal.navigator.userAgent)
      );
    },

    isKonqueror: function() {
      return (
        commonjsGlobal.navigator &&
        /konqueror/i.test(commonjsGlobal.navigator.userAgent)
      );
    },

    // #187 wrap document.domain in try/catch because of WP8 from file:///
    hasDomain: function() {
      // non-browser client always has a domain
      if (!commonjsGlobal.document) {
        return true;
      }

      try {
        return !!commonjsGlobal.document.domain;
      } catch (e) {
        return false;
      }
    }
  };

  function XhrStreamingTransport(transUrl) {
    if (!xhrLocal.enabled && !xhrCors.enabled) {
      throw new Error("Transport created when disabled");
    }
    ajaxBased.call(this, transUrl, "/xhr_streaming", xhr, xhrCors);
  }

  inherits_browser(XhrStreamingTransport, ajaxBased);

  XhrStreamingTransport.enabled = function(info) {
    if (info.nullOrigin) {
      return false;
    }
    // Opera doesn't support xhr-streaming #60
    // But it might be able to #92
    if (browser$1.isOpera()) {
      return false;
    }

    return xhrCors.enabled;
  };

  XhrStreamingTransport.transportName = "xhr-streaming";
  XhrStreamingTransport.roundTrips = 2; // preflight, ajax

  // Safari gets confused when a streaming ajax request is started
  // before onload. This causes the load indicator to spin indefinetely.
  // Only require body when used in a browser
  XhrStreamingTransport.needBody = !!commonjsGlobal.document;

  var xhrStreaming = XhrStreamingTransport;

  var EventEmitter$6 = emitter.EventEmitter;
  var debug$8 = function() {};
  {
    debug$8 = browser("sockjs-client:sender:xdr");
  }

  // References:
  //   http://ajaxian.com/archives/100-line-ajax-wrapper
  //   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

  function XDRObject(method, url$$1, payload) {
    debug$8(method, url$$1);
    var self = this;
    EventEmitter$6.call(this);

    setTimeout(function() {
      self._start(method, url$$1, payload);
    }, 0);
  }

  inherits_browser(XDRObject, EventEmitter$6);

  XDRObject.prototype._start = function(method, url$$1, payload) {
    debug$8("_start");
    var self = this;
    var xdr = new commonjsGlobal.XDomainRequest();
    // IE caches even POSTs
    url$$1 = url.addQuery(url$$1, "t=" + +new Date());

    xdr.onerror = function() {
      debug$8("onerror");
      self._error();
    };
    xdr.ontimeout = function() {
      debug$8("ontimeout");
      self._error();
    };
    xdr.onprogress = function() {
      debug$8("progress", xdr.responseText);
      self.emit("chunk", 200, xdr.responseText);
    };
    xdr.onload = function() {
      debug$8("load");
      self.emit("finish", 200, xdr.responseText);
      self._cleanup(false);
    };
    this.xdr = xdr;
    this.unloadRef = event.unloadAdd(function() {
      self._cleanup(true);
    });
    try {
      // Fails with AccessDenied if port number is bogus
      this.xdr.open(method, url$$1);
      if (this.timeout) {
        this.xdr.timeout = this.timeout;
      }
      this.xdr.send(payload);
    } catch (x) {
      this._error();
    }
  };

  XDRObject.prototype._error = function() {
    this.emit("finish", 0, "");
    this._cleanup(false);
  };

  XDRObject.prototype._cleanup = function(abort) {
    debug$8("cleanup", abort);
    if (!this.xdr) {
      return;
    }
    this.removeAllListeners();
    event.unloadDel(this.unloadRef);

    this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
    if (abort) {
      try {
        this.xdr.abort();
      } catch (x) {
        // intentionally empty
      }
    }
    this.unloadRef = this.xdr = null;
  };

  XDRObject.prototype.close = function() {
    debug$8("close");
    this._cleanup(true);
  };

  // IE 8/9 if the request target uses the same scheme - #79
  XDRObject.enabled = !!(
    commonjsGlobal.XDomainRequest && browser$1.hasDomain()
  );

  var xdr = XDRObject;

  // According to:
  //   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
  //   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

  function XdrStreamingTransport(transUrl) {
    if (!xdr.enabled) {
      throw new Error("Transport created when disabled");
    }
    ajaxBased.call(this, transUrl, "/xhr_streaming", xhr, xdr);
  }

  inherits_browser(XdrStreamingTransport, ajaxBased);

  XdrStreamingTransport.enabled = function(info) {
    if (info.cookie_needed || info.nullOrigin) {
      return false;
    }
    return xdr.enabled && info.sameScheme;
  };

  XdrStreamingTransport.transportName = "xdr-streaming";
  XdrStreamingTransport.roundTrips = 2; // preflight, ajax

  var xdrStreaming = XdrStreamingTransport;

  var eventsource = commonjsGlobal.EventSource;

  var EventEmitter$7 = emitter.EventEmitter;
  var debug$9 = function() {};
  {
    debug$9 = browser("sockjs-client:receiver:eventsource");
  }

  function EventSourceReceiver(url) {
    debug$9(url);
    EventEmitter$7.call(this);

    var self = this;
    var es = (this.es = new eventsource(url));
    es.onmessage = function(e) {
      debug$9("message", e.data);
      self.emit("message", decodeURI(e.data));
    };
    es.onerror = function(e) {
      debug$9("error", es.readyState, e);
      // ES on reconnection has readyState = 0 or 1.
      // on network error it's CLOSED = 2
      var reason = es.readyState !== 2 ? "network" : "permanent";
      self._cleanup();
      self._close(reason);
    };
  }

  inherits_browser(EventSourceReceiver, EventEmitter$7);

  EventSourceReceiver.prototype.abort = function() {
    debug$9("abort");
    this._cleanup();
    this._close("user");
  };

  EventSourceReceiver.prototype._cleanup = function() {
    debug$9("cleanup");
    var es = this.es;
    if (es) {
      es.onmessage = es.onerror = null;
      es.close();
      this.es = null;
    }
  };

  EventSourceReceiver.prototype._close = function(reason) {
    debug$9("close", reason);
    var self = this;
    // Safari and chrome < 15 crash if we close window before
    // waiting for ES cleanup. See:
    // https://code.google.com/p/chromium/issues/detail?id=89155
    setTimeout(function() {
      self.emit("close", null, reason);
      self.removeAllListeners();
    }, 200);
  };

  var eventsource$1 = EventSourceReceiver;

  function EventSourceTransport(transUrl) {
    if (!EventSourceTransport.enabled()) {
      throw new Error("Transport created when disabled");
    }

    ajaxBased.call(this, transUrl, "/eventsource", eventsource$1, xhrCors);
  }

  inherits_browser(EventSourceTransport, ajaxBased);

  EventSourceTransport.enabled = function() {
    return !!eventsource;
  };

  EventSourceTransport.transportName = "eventsource";
  EventSourceTransport.roundTrips = 2;

  var eventsource$2 = EventSourceTransport;

  var json3 = createCommonjsModule(function(module, exports) {
    (function() {
      // Detect the `define` function exposed by asynchronous module loaders. The
      // strict `define` check is necessary for compatibility with `r.js`.
      var isLoader = typeof undefined === "function"; // A set of types used to distinguish objects from primitives.

      var objectTypes = {
        function: true,
        object: true
      }; // Detect the `exports` object exposed by CommonJS implementations.

      var freeExports = exports && !exports.nodeType && exports; // Use the `global` object exposed by Node (including Browserify via
      // `insert-module-globals`), Narwhal, and Ringo as the default context,
      // and the `window` object in browsers. Rhino exports a `global` function
      // instead.

      var root = (objectTypes[typeof window] && window) || this,
        freeGlobal =
          freeExports &&
          objectTypes["object"] &&
          module &&
          !module.nodeType &&
          typeof commonjsGlobal == "object" &&
          commonjsGlobal;

      if (
        freeGlobal &&
        (freeGlobal["global"] === freeGlobal ||
          freeGlobal["window"] === freeGlobal ||
          freeGlobal["self"] === freeGlobal)
      ) {
        root = freeGlobal;
      } // Public: Initializes JSON 3 using the given `context` object, attaching the
      // `stringify` and `parse` functions to the specified `exports` object.

      function runInContext(context, exports) {
        context || (context = root["Object"]());
        exports || (exports = root["Object"]()); // Native constructor aliases.

        var Number = context["Number"] || root["Number"],
          String = context["String"] || root["String"],
          Object = context["Object"] || root["Object"],
          Date = context["Date"] || root["Date"],
          SyntaxError = context["SyntaxError"] || root["SyntaxError"],
          TypeError = context["TypeError"] || root["TypeError"],
          Math = context["Math"] || root["Math"],
          nativeJSON = context["JSON"] || root["JSON"]; // Delegate to the native `stringify` and `parse` implementations.

        if (typeof nativeJSON == "object" && nativeJSON) {
          exports.stringify = nativeJSON.stringify;
          exports.parse = nativeJSON.parse;
        } // Convenience aliases.

        var objectProto = Object.prototype,
          getClass = objectProto.toString,
          isProperty,
          forEach,
          undef; // Test the `Date#getUTC*` methods. Based on work by @Yaffle.

        var isExtended = new Date(-3509827334573292);

        try {
          // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
          // results for certain dates in Opera >= 10.53.
          isExtended =
            isExtended.getUTCFullYear() == -109252 &&
            isExtended.getUTCMonth() === 0 &&
            isExtended.getUTCDate() === 1 && // Safari < 2.0.2 stores the internal millisecond time value correctly,
            // but clips the values returned by the date methods to the range of
            // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
            isExtended.getUTCHours() == 10 &&
            isExtended.getUTCMinutes() == 37 &&
            isExtended.getUTCSeconds() == 6 &&
            isExtended.getUTCMilliseconds() == 708;
        } catch (exception) {} // Internal: Determines whether the native `JSON.stringify` and `parse`
        // implementations are spec-compliant. Based on work by Ken Snyder.

        function has(name) {
          if (has[name] !== undef) {
            // Return cached feature test result.
            return has[name];
          }

          var isSupported;

          if (name == "bug-string-char-index") {
            // IE <= 7 doesn't support accessing string characters using square
            // bracket notation. IE 8 only supports this for primitives.
            isSupported = "a"[0] != "a";
          } else if (name == "json") {
            // Indicates whether both `JSON.stringify` and `JSON.parse` are
            // supported.
            isSupported = has("json-stringify") && has("json-parse");
          } else {
            var value,
              serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'; // Test `JSON.stringify`.

            if (name == "json-stringify") {
              var stringify = exports.stringify,
                stringifySupported =
                  typeof stringify == "function" && isExtended;

              if (stringifySupported) {
                // A test function object with a custom `toJSON` method.
                (value = function() {
                  return 1;
                }).toJSON = value;

                try {
                  stringifySupported = // Firefox 3.1b1 and b2 serialize string, number, and boolean
                    // primitives as object literals.
                    stringify(0) === "0" && // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                    // literals.
                    stringify(new Number()) === "0" &&
                    stringify(new String()) == '""' && // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                    // does not define a canonical JSON representation (this applies to
                    // objects with `toJSON` properties as well, *unless* they are nested
                    // within an object or array).
                    stringify(getClass) === undef && // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                    // FF 3.1b3 pass this test.
                    stringify(undef) === undef && // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                    // respectively, if the value is omitted entirely.
                    stringify() === undef && // FF 3.1b1, 2 throw an error if the given value is not a number,
                    // string, array, object, Boolean, or `null` literal. This applies to
                    // objects with custom `toJSON` methods as well, unless they are nested
                    // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                    // methods entirely.
                    stringify(value) === "1" &&
                    stringify([value]) == "[1]" && // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                    // `"[null]"`.
                    stringify([undef]) == "[null]" && // YUI 3.0.0b1 fails to serialize `null` literals.
                    stringify(null) == "null" && // FF 3.1b1, 2 halts serialization if an array contains a function:
                    // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                    // elides non-JSON values from objects and arrays, unless they
                    // define custom `toJSON` methods.
                    stringify([undef, getClass, null]) == "[null,null,null]" && // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                    // where character escape codes are expected (e.g., `\b` => `\u0008`).
                    stringify({
                      a: [value, true, false, null, "\x00\b\n\f\r\t"]
                    }) == serialized && // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                    stringify(null, value) === "1" &&
                    stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" && // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                    // serialize extended years.
                    stringify(new Date(-8.64e15)) ==
                      '"-271821-04-20T00:00:00.000Z"' && // The milliseconds are optional in ES 5, but required in 5.1.
                    stringify(new Date(8.64e15)) ==
                      '"+275760-09-13T00:00:00.000Z"' && // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                    // four-digit years instead of six-digit years. Credits: @Yaffle.
                    stringify(new Date(-621987552e5)) ==
                      '"-000001-01-01T00:00:00.000Z"' && // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                    // values less than 1000. Credits: @Yaffle.
                    stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
                } catch (exception) {
                  stringifySupported = false;
                }
              }

              isSupported = stringifySupported;
            } // Test `JSON.parse`.

            if (name == "json-parse") {
              var parse = exports.parse;

              if (typeof parse == "function") {
                try {
                  // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                  // Conforming implementations should also coerce the initial argument to
                  // a string prior to parsing.
                  if (parse("0") === 0 && !parse(false)) {
                    // Simple parsing test.
                    value = parse(serialized);
                    var parseSupported =
                      value["a"].length == 5 && value["a"][0] === 1;

                    if (parseSupported) {
                      try {
                        // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                        parseSupported = !parse('"\t"');
                      } catch (exception) {}

                      if (parseSupported) {
                        try {
                          // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                          // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                          // certain octal literals.
                          parseSupported = parse("01") !== 1;
                        } catch (exception) {}
                      }

                      if (parseSupported) {
                        try {
                          // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                          // points. These environments, along with FF 3.1b1 and 2,
                          // also allow trailing commas in JSON objects and arrays.
                          parseSupported = parse("1.") !== 1;
                        } catch (exception) {}
                      }
                    }
                  }
                } catch (exception) {
                  parseSupported = false;
                }
              }

              isSupported = parseSupported;
            }
          }

          return (has[name] = !!isSupported);
        }

        if (!has("json")) {
          // Common `[[Class]]` name aliases.
          var functionClass = "[object Function]",
            dateClass = "[object Date]",
            numberClass = "[object Number]",
            stringClass = "[object String]",
            arrayClass = "[object Array]",
            booleanClass = "[object Boolean]"; // Detect incomplete support for accessing string characters by index.

          var charIndexBuggy = has("bug-string-char-index"); // Define additional utility methods if the `Date` methods are buggy.

          if (!isExtended) {
            var floor = Math.floor; // A mapping between the months of the year and the number of days between
            // January 1st and the first of the respective month.

            var Months = [
              0,
              31,
              59,
              90,
              120,
              151,
              181,
              212,
              243,
              273,
              304,
              334
            ]; // Internal: Calculates the number of days between the Unix epoch and the
            // first day of the given month.

            var getDay = function(year, month) {
              return (
                Months[month] +
                365 * (year - 1970) +
                floor((year - 1969 + (month = +(month > 1))) / 4) -
                floor((year - 1901 + month) / 100) +
                floor((year - 1601 + month) / 400)
              );
            };
          } // Internal: Determines if a property is a direct property of the given
          // object. Delegates to the native `Object#hasOwnProperty` method.

          if (!(isProperty = objectProto.hasOwnProperty)) {
            isProperty = function(property) {
              var members = {},
                constructor;

              if (
                ((members.__proto__ = null),
                (members.__proto__ = {
                  // The *proto* property cannot be set multiple times in recent
                  // versions of Firefox and SeaMonkey.
                  toString: 1
                }),
                members).toString != getClass
              ) {
                // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
                // supports the mutable *proto* property.
                isProperty = function(property) {
                  // Capture and break the object's prototype chain (see section 8.6.2
                  // of the ES 5.1 spec). The parenthesized expression prevents an
                  // unsafe transformation by the Closure Compiler.
                  var original = this.__proto__,
                    result = property in ((this.__proto__ = null), this); // Restore the original prototype chain.

                  this.__proto__ = original;
                  return result;
                };
              } else {
                // Capture a reference to the top-level `Object` constructor.
                constructor = members.constructor; // Use the `constructor` property to simulate `Object#hasOwnProperty` in
                // other environments.

                isProperty = function(property) {
                  var parent = (this.constructor || constructor).prototype;
                  return (
                    property in this &&
                    !(property in parent && this[property] === parent[property])
                  );
                };
              }

              members = null;
              return isProperty.call(this, property);
            };
          } // Internal: Normalizes the `for...in` iteration algorithm across
          // environments. Each enumerated key is yielded to a `callback` function.

          forEach = function(object, callback) {
            var size = 0,
              Properties,
              members,
              property; // Tests for bugs in the current environment's `for...in` algorithm. The
            // `valueOf` property inherits the non-enumerable flag from
            // `Object.prototype` in older versions of IE, Netscape, and Mozilla.

            (Properties = function() {
              this.valueOf = 0;
            }).prototype.valueOf = 0; // Iterate over a new instance of the `Properties` class.

            members = new Properties();

            for (property in members) {
              // Ignore all properties inherited from `Object.prototype`.
              if (isProperty.call(members, property)) {
                size++;
              }
            }

            Properties = members = null; // Normalize the iteration algorithm.

            if (!size) {
              // A list of non-enumerable properties inherited from `Object.prototype`.
              members = [
                "valueOf",
                "toString",
                "toLocaleString",
                "propertyIsEnumerable",
                "isPrototypeOf",
                "hasOwnProperty",
                "constructor"
              ]; // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
              // properties.

              forEach = function(object, callback) {
                var isFunction = getClass.call(object) == functionClass,
                  property,
                  length;
                var hasProperty =
                  (!isFunction &&
                    typeof object.constructor != "function" &&
                    objectTypes[typeof object.hasOwnProperty] &&
                    object.hasOwnProperty) ||
                  isProperty;

                for (property in object) {
                  // Gecko <= 1.0 enumerates the `prototype` property of functions under
                  // certain conditions; IE does not.
                  if (
                    !(isFunction && property == "prototype") &&
                    hasProperty.call(object, property)
                  ) {
                    callback(property);
                  }
                } // Manually invoke the callback for each non-enumerable property.

                for (
                  length = members.length;
                  (property = members[--length]);
                  hasProperty.call(object, property) && callback(property)
                );
              };
            } else if (size == 2) {
              // Safari <= 2.0.4 enumerates shadowed properties twice.
              forEach = function(object, callback) {
                // Create a set of iterated properties.
                var members = {},
                  isFunction = getClass.call(object) == functionClass,
                  property;

                for (property in object) {
                  // Store each property name to prevent double enumeration. The
                  // `prototype` property of functions is not enumerated due to cross-
                  // environment inconsistencies.
                  if (
                    !(isFunction && property == "prototype") &&
                    !isProperty.call(members, property) &&
                    (members[property] = 1) &&
                    isProperty.call(object, property)
                  ) {
                    callback(property);
                  }
                }
              };
            } else {
              // No bugs detected; use the standard `for...in` algorithm.
              forEach = function(object, callback) {
                var isFunction = getClass.call(object) == functionClass,
                  property,
                  isConstructor;

                for (property in object) {
                  if (
                    !(isFunction && property == "prototype") &&
                    isProperty.call(object, property) &&
                    !(isConstructor = property === "constructor")
                  ) {
                    callback(property);
                  }
                } // Manually invoke the callback for the `constructor` property due to
                // cross-environment inconsistencies.

                if (
                  isConstructor ||
                  isProperty.call(object, (property = "constructor"))
                ) {
                  callback(property);
                }
              };
            }

            return forEach(object, callback);
          }; // Public: Serializes a JavaScript `value` as a JSON string. The optional
          // `filter` argument may specify either a function that alters how object and
          // array members are serialized, or an array of strings and numbers that
          // indicates which properties should be serialized. The optional `width`
          // argument may be either a string or number that specifies the indentation
          // level of the output.

          if (!has("json-stringify")) {
            // Internal: A map of control characters and their escaped equivalents.
            var Escapes = {
              92: "\\\\",
              34: '\\"',
              8: "\\b",
              12: "\\f",
              10: "\\n",
              13: "\\r",
              9: "\\t"
            }; // Internal: Converts `value` into a zero-padded string such that its
            // length is at least equal to `width`. The `width` must be <= 6.

            var leadingZeroes = "000000";

            var toPaddedString = function(width, value) {
              // The `|| 0` expression is necessary to work around a bug in
              // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
              return (leadingZeroes + (value || 0)).slice(-width);
            }; // Internal: Double-quotes a string `value`, replacing all ASCII control
            // characters (characters with code unit values between 0 and 31) with
            // their escaped equivalents. This is an implementation of the
            // `Quote(value)` operation defined in ES 5.1 section 15.12.3.

            var unicodePrefix = "\\u00";

            var quote = function(value) {
              var result = '"',
                index = 0,
                length = value.length,
                useCharIndex = !charIndexBuggy || length > 10;
              var symbols =
                useCharIndex && (charIndexBuggy ? value.split("") : value);

              for (; index < length; index++) {
                var charCode = value.charCodeAt(index); // If the character is a control character, append its Unicode or
                // shorthand escape sequence; otherwise, append the character as-is.

                switch (charCode) {
                  case 8:
                  case 9:
                  case 10:
                  case 12:
                  case 13:
                  case 34:
                  case 92:
                    result += Escapes[charCode];
                    break;

                  default:
                    if (charCode < 32) {
                      result +=
                        unicodePrefix +
                        toPaddedString(2, charCode.toString(16));
                      break;
                    }

                    result += useCharIndex
                      ? symbols[index]
                      : value.charAt(index);
                }
              }

              return result + '"';
            }; // Internal: Recursively serializes an object. Implements the
            // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.

            var serialize = function(
              property,
              object,
              callback,
              properties,
              whitespace,
              indentation,
              stack
            ) {
              var value,
                className,
                year,
                month,
                date,
                time,
                hours,
                minutes,
                seconds,
                milliseconds,
                results,
                element,
                index,
                length,
                prefix,
                result;

              try {
                // Necessary for host object support.
                value = object[property];
              } catch (exception) {}

              if (typeof value == "object" && value) {
                className = getClass.call(value);

                if (
                  className == dateClass &&
                  !isProperty.call(value, "toJSON")
                ) {
                  if (value > -1 / 0 && value < 1 / 0) {
                    // Dates are serialized according to the `Date#toJSON` method
                    // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                    // for the ISO 8601 date time string format.
                    if (getDay) {
                      // Manually compute the year, month, date, hours, minutes,
                      // seconds, and milliseconds if the `getUTC*` methods are
                      // buggy. Adapted from @Yaffle's `date-shim` project.
                      date = floor(value / 864e5);

                      for (
                        year = floor(date / 365.2425) + 1970 - 1;
                        getDay(year + 1, 0) <= date;
                        year++
                      );

                      for (
                        month = floor((date - getDay(year, 0)) / 30.42);
                        getDay(year, month + 1) <= date;
                        month++
                      );

                      date = 1 + date - getDay(year, month); // The `time` value specifies the time within the day (see ES
                      // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                      // to compute `A modulo B`, as the `%` operator does not
                      // correspond to the `modulo` operation for negative numbers.

                      time = ((value % 864e5) + 864e5) % 864e5; // The hours, minutes, seconds, and milliseconds are obtained by
                      // decomposing the time within the day. See section 15.9.1.10.

                      hours = floor(time / 36e5) % 24;
                      minutes = floor(time / 6e4) % 60;
                      seconds = floor(time / 1e3) % 60;
                      milliseconds = time % 1e3;
                    } else {
                      year = value.getUTCFullYear();
                      month = value.getUTCMonth();
                      date = value.getUTCDate();
                      hours = value.getUTCHours();
                      minutes = value.getUTCMinutes();
                      seconds = value.getUTCSeconds();
                      milliseconds = value.getUTCMilliseconds();
                    } // Serialize extended years correctly.

                    value =
                      (year <= 0 || year >= 1e4
                        ? (year < 0 ? "-" : "+") +
                          toPaddedString(6, year < 0 ? -year : year)
                        : toPaddedString(4, year)) +
                      "-" +
                      toPaddedString(2, month + 1) +
                      "-" +
                      toPaddedString(2, date) + // Months, dates, hours, minutes, and seconds should have two
                      // digits; milliseconds should have three.
                      "T" +
                      toPaddedString(2, hours) +
                      ":" +
                      toPaddedString(2, minutes) +
                      ":" +
                      toPaddedString(2, seconds) + // Milliseconds are optional in ES 5.0, but required in 5.1.
                      "." +
                      toPaddedString(3, milliseconds) +
                      "Z";
                  } else {
                    value = null;
                  }
                } else if (
                  typeof value.toJSON == "function" &&
                  ((className != numberClass &&
                    className != stringClass &&
                    className != arrayClass) ||
                    isProperty.call(value, "toJSON"))
                ) {
                  // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
                  // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
                  // ignores all `toJSON` methods on these objects unless they are
                  // defined directly on an instance.
                  value = value.toJSON(property);
                }
              }

              if (callback) {
                // If a replacement function was provided, call it to obtain the value
                // for serialization.
                value = callback.call(object, property, value);
              }

              if (value === null) {
                return "null";
              }

              className = getClass.call(value);

              if (className == booleanClass) {
                // Booleans are represented literally.
                return "" + value;
              } else if (className == numberClass) {
                // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
                // `"null"`.
                return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
              } else if (className == stringClass) {
                // Strings are double-quoted and escaped.
                return quote("" + value);
              } // Recursively serialize objects and arrays.

              if (typeof value == "object") {
                // Check for cyclic structures. This is a linear search; performance
                // is inversely proportional to the number of unique nested objects.
                for (length = stack.length; length--; ) {
                  if (stack[length] === value) {
                    // Cyclic structures cannot be serialized by `JSON.stringify`.
                    throw TypeError();
                  }
                } // Add the object to the stack of traversed objects.

                stack.push(value);
                results = []; // Save the current indentation level and indent one additional level.

                prefix = indentation;
                indentation += whitespace;

                if (className == arrayClass) {
                  // Recursively serialize array elements.
                  for (
                    index = 0, length = value.length;
                    index < length;
                    index++
                  ) {
                    element = serialize(
                      index,
                      value,
                      callback,
                      properties,
                      whitespace,
                      indentation,
                      stack
                    );
                    results.push(element === undef ? "null" : element);
                  }

                  result = results.length
                    ? whitespace
                      ? "[\n" +
                        indentation +
                        results.join(",\n" + indentation) +
                        "\n" +
                        prefix +
                        "]"
                      : "[" + results.join(",") + "]"
                    : "[]";
                } else {
                  // Recursively serialize object members. Members are selected from
                  // either a user-specified list of property names, or the object
                  // itself.
                  forEach(properties || value, function(property) {
                    var element = serialize(
                      property,
                      value,
                      callback,
                      properties,
                      whitespace,
                      indentation,
                      stack
                    );

                    if (element !== undef) {
                      // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                      // is not the empty string, let `member` {quote(property) + ":"}
                      // be the concatenation of `member` and the `space` character."
                      // The "`space` character" refers to the literal space
                      // character, not the `space` {width} argument provided to
                      // `JSON.stringify`.
                      results.push(
                        quote(property) +
                          ":" +
                          (whitespace ? " " : "") +
                          element
                      );
                    }
                  });
                  result = results.length
                    ? whitespace
                      ? "{\n" +
                        indentation +
                        results.join(",\n" + indentation) +
                        "\n" +
                        prefix +
                        "}"
                      : "{" + results.join(",") + "}"
                    : "{}";
                } // Remove the object from the traversed object stack.

                stack.pop();
                return result;
              }
            }; // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.

            exports.stringify = function(source, filter, width) {
              var whitespace, callback, properties, className;

              if (objectTypes[typeof filter] && filter) {
                if ((className = getClass.call(filter)) == functionClass) {
                  callback = filter;
                } else if (className == arrayClass) {
                  // Convert the property names array into a makeshift set.
                  properties = {};

                  for (
                    var index = 0, length = filter.length, value;
                    index < length;
                    value = filter[index++],
                      ((className = getClass.call(value)),
                      className == stringClass || className == numberClass) &&
                        (properties[value] = 1)
                  );
                }
              }

              if (width) {
                if ((className = getClass.call(width)) == numberClass) {
                  // Convert the `width` to an integer and create a string containing
                  // `width` number of space characters.
                  if ((width -= width % 1) > 0) {
                    for (
                      whitespace = "", width > 10 && (width = 10);
                      whitespace.length < width;
                      whitespace += " "
                    );
                  }
                } else if (className == stringClass) {
                  whitespace = width.length <= 10 ? width : width.slice(0, 10);
                }
              } // Opera <= 7.54u2 discards the values associated with empty string keys
              // (`""`) only if they are used directly within an object member list
              // (e.g., `!("" in { "": 1})`).

              return serialize(
                "",
                ((value = {}), (value[""] = source), value),
                callback,
                properties,
                whitespace,
                "",
                []
              );
            };
          } // Public: Parses a JSON source string.

          if (!has("json-parse")) {
            var fromCharCode = String.fromCharCode; // Internal: A map of escaped control characters and their unescaped
            // equivalents.

            var Unescapes = {
              92: "\\",
              34: '"',
              47: "/",
              98: "\b",
              116: "\t",
              110: "\n",
              102: "\f",
              114: "\r"
            }; // Internal: Stores the parser state.

            var Index, Source; // Internal: Resets the parser state and throws a `SyntaxError`.

            var abort = function() {
              Index = Source = null;
              throw SyntaxError();
            }; // Internal: Returns the next token, or `"$"` if the parser has reached
            // the end of the source string. A token may be a string, number, `null`
            // literal, or Boolean literal.

            var lex = function() {
              var source = Source,
                length = source.length,
                value,
                begin,
                position,
                isSigned,
                charCode;

              while (Index < length) {
                charCode = source.charCodeAt(Index);

                switch (charCode) {
                  case 9:
                  case 10:
                  case 13:
                  case 32:
                    // Skip whitespace tokens, including tabs, carriage returns, line
                    // feeds, and space characters.
                    Index++;
                    break;

                  case 123:
                  case 125:
                  case 91:
                  case 93:
                  case 58:
                  case 44:
                    // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                    // the current position.
                    value = charIndexBuggy
                      ? source.charAt(Index)
                      : source[Index];
                    Index++;
                    return value;

                  case 34:
                    // `"` delimits a JSON string; advance to the next character and
                    // begin parsing the string. String tokens are prefixed with the
                    // sentinel `@` character to distinguish them from punctuators and
                    // end-of-string tokens.
                    for (value = "@", Index++; Index < length; ) {
                      charCode = source.charCodeAt(Index);

                      if (charCode < 32) {
                        // Unescaped ASCII control characters (those with a code unit
                        // less than the space character) are not permitted.
                        abort();
                      } else if (charCode == 92) {
                        // A reverse solidus (`\`) marks the beginning of an escaped
                        // control character (including `"`, `\`, and `/`) or Unicode
                        // escape sequence.
                        charCode = source.charCodeAt(++Index);

                        switch (charCode) {
                          case 92:
                          case 34:
                          case 47:
                          case 98:
                          case 116:
                          case 110:
                          case 102:
                          case 114:
                            // Revive escaped control characters.
                            value += Unescapes[charCode];
                            Index++;
                            break;

                          case 117:
                            // `\u` marks the beginning of a Unicode escape sequence.
                            // Advance to the first character and validate the
                            // four-digit code point.
                            begin = ++Index;

                            for (
                              position = Index + 4;
                              Index < position;
                              Index++
                            ) {
                              charCode = source.charCodeAt(Index); // A valid sequence comprises four hexdigits (case-
                              // insensitive) that form a single hexadecimal value.

                              if (
                                !(
                                  (charCode >= 48 && charCode <= 57) ||
                                  (charCode >= 97 && charCode <= 102) ||
                                  (charCode >= 65 && charCode <= 70)
                                )
                              ) {
                                // Invalid Unicode escape sequence.
                                abort();
                              }
                            } // Revive the escaped character.

                            value += fromCharCode(
                              "0x" + source.slice(begin, Index)
                            );
                            break;

                          default:
                            // Invalid escape sequence.
                            abort();
                        }
                      } else {
                        if (charCode == 34) {
                          // An unescaped double-quote character marks the end of the
                          // string.
                          break;
                        }

                        charCode = source.charCodeAt(Index);
                        begin = Index; // Optimize for the common case where a string is valid.

                        while (
                          charCode >= 32 &&
                          charCode != 92 &&
                          charCode != 34
                        ) {
                          charCode = source.charCodeAt(++Index);
                        } // Append the string as-is.

                        value += source.slice(begin, Index);
                      }
                    }

                    if (source.charCodeAt(Index) == 34) {
                      // Advance to the next character and return the revived string.
                      Index++;
                      return value;
                    } // Unterminated string.

                    abort();

                  default:
                    // Parse numbers and literals.
                    begin = Index; // Advance past the negative sign, if one is specified.

                    if (charCode == 45) {
                      isSigned = true;
                      charCode = source.charCodeAt(++Index);
                    } // Parse an integer or floating-point value.

                    if (charCode >= 48 && charCode <= 57) {
                      // Leading zeroes are interpreted as octal literals.
                      if (
                        charCode == 48 &&
                        ((charCode = source.charCodeAt(Index + 1)),
                        charCode >= 48 && charCode <= 57)
                      ) {
                        // Illegal octal literal.
                        abort();
                      }

                      isSigned = false; // Parse the integer component.

                      for (
                        ;
                        Index < length &&
                        ((charCode = source.charCodeAt(Index)),
                        charCode >= 48 && charCode <= 57);
                        Index++
                      ); // Floats cannot contain a leading decimal point; however, this
                      // case is already accounted for by the parser.

                      if (source.charCodeAt(Index) == 46) {
                        position = ++Index; // Parse the decimal component.

                        for (
                          ;
                          position < length &&
                          ((charCode = source.charCodeAt(position)),
                          charCode >= 48 && charCode <= 57);
                          position++
                        );

                        if (position == Index) {
                          // Illegal trailing decimal.
                          abort();
                        }

                        Index = position;
                      } // Parse exponents. The `e` denoting the exponent is
                      // case-insensitive.

                      charCode = source.charCodeAt(Index);

                      if (charCode == 101 || charCode == 69) {
                        charCode = source.charCodeAt(++Index); // Skip past the sign following the exponent, if one is
                        // specified.

                        if (charCode == 43 || charCode == 45) {
                          Index++;
                        } // Parse the exponential component.

                        for (
                          position = Index;
                          position < length &&
                          ((charCode = source.charCodeAt(position)),
                          charCode >= 48 && charCode <= 57);
                          position++
                        );

                        if (position == Index) {
                          // Illegal empty exponent.
                          abort();
                        }

                        Index = position;
                      } // Coerce the parsed value to a JavaScript number.

                      return +source.slice(begin, Index);
                    } // A negative sign may only precede numbers.

                    if (isSigned) {
                      abort();
                    } // `true`, `false`, and `null` literals.

                    if (source.slice(Index, Index + 4) == "true") {
                      Index += 4;
                      return true;
                    } else if (source.slice(Index, Index + 5) == "false") {
                      Index += 5;
                      return false;
                    } else if (source.slice(Index, Index + 4) == "null") {
                      Index += 4;
                      return null;
                    } // Unrecognized token.

                    abort();
                }
              } // Return the sentinel `$` character if the parser has reached the end
              // of the source string.

              return "$";
            }; // Internal: Parses a JSON `value` token.

            var get = function(value) {
              var results, hasMembers;

              if (value == "$") {
                // Unexpected end of input.
                abort();
              }

              if (typeof value == "string") {
                if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                  // Remove the sentinel `@` character.
                  return value.slice(1);
                } // Parse object and array literals.

                if (value == "[") {
                  // Parses a JSON array, returning a new JavaScript array.
                  results = [];

                  for (; ; hasMembers || (hasMembers = true)) {
                    value = lex(); // A closing square bracket marks the end of the array literal.

                    if (value == "]") {
                      break;
                    } // If the array literal contains elements, the current token
                    // should be a comma separating the previous element from the
                    // next.

                    if (hasMembers) {
                      if (value == ",") {
                        value = lex();

                        if (value == "]") {
                          // Unexpected trailing `,` in array literal.
                          abort();
                        }
                      } else {
                        // A `,` must separate each array element.
                        abort();
                      }
                    } // Elisions and leading commas are not permitted.

                    if (value == ",") {
                      abort();
                    }

                    results.push(get(value));
                  }

                  return results;
                } else if (value == "{") {
                  // Parses a JSON object, returning a new JavaScript object.
                  results = {};

                  for (; ; hasMembers || (hasMembers = true)) {
                    value = lex(); // A closing curly brace marks the end of the object literal.

                    if (value == "}") {
                      break;
                    } // If the object literal contains members, the current token
                    // should be a comma separator.

                    if (hasMembers) {
                      if (value == ",") {
                        value = lex();

                        if (value == "}") {
                          // Unexpected trailing `,` in object literal.
                          abort();
                        }
                      } else {
                        // A `,` must separate each object member.
                        abort();
                      }
                    } // Leading commas are not permitted, object property names must be
                    // double-quoted strings, and a `:` must separate each property
                    // name and value.

                    if (
                      value == "," ||
                      typeof value != "string" ||
                      (charIndexBuggy ? value.charAt(0) : value[0]) != "@" ||
                      lex() != ":"
                    ) {
                      abort();
                    }

                    results[value.slice(1)] = get(lex());
                  }

                  return results;
                } // Unexpected token encountered.

                abort();
              }

              return value;
            }; // Internal: Updates a traversed object member.

            var update = function(source, property, callback) {
              var element = walk(source, property, callback);

              if (element === undef) {
                delete source[property];
              } else {
                source[property] = element;
              }
            }; // Internal: Recursively traverses a parsed JSON object, invoking the
            // `callback` function for each value. This is an implementation of the
            // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.

            var walk = function(source, property, callback) {
              var value = source[property],
                length;

              if (typeof value == "object" && value) {
                // `forEach` can't be used to traverse an array in Opera <= 8.54
                // because its `Object#hasOwnProperty` implementation returns `false`
                // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
                if (getClass.call(value) == arrayClass) {
                  for (length = value.length; length--; ) {
                    update(value, length, callback);
                  }
                } else {
                  forEach(value, function(property) {
                    update(value, property, callback);
                  });
                }
              }

              return callback.call(source, property, value);
            }; // Public: `JSON.parse`. See ES 5.1 section 15.12.2.

            exports.parse = function(source, callback) {
              var result, value;
              Index = 0;
              Source = "" + source;
              result = get(lex()); // If a JSON string contains multiple tokens, it is invalid.

              if (lex() != "$") {
                abort();
              } // Reset the parser state.

              Index = Source = null;
              return callback && getClass.call(callback) == functionClass
                ? walk(
                    ((value = {}), (value[""] = result), value),
                    "",
                    callback
                  )
                : result;
            };
          }
        }

        exports["runInContext"] = runInContext;
        return exports;
      }

      if (freeExports && !isLoader) {
        // Export for CommonJS environments.
        runInContext(root, freeExports);
      } else {
        // Export for web browsers and JavaScript engines.
        var nativeJSON = root.JSON,
          previousJSON = root["JSON3"],
          isRestored = false;
        var JSON3 = runInContext(
          root,
          (root["JSON3"] = {
            // Public: Restores the original value of the global `JSON` object and
            // returns a reference to the `JSON3` object.
            noConflict: function() {
              if (!isRestored) {
                isRestored = true;
                root.JSON = nativeJSON;
                root["JSON3"] = previousJSON;
                nativeJSON = previousJSON = null;
              }

              return JSON3;
            }
          })
        );
        root.JSON = {
          parse: JSON3.parse,
          stringify: JSON3.stringify
        };
      } // Export for asynchronous module loaders.
    }.call(commonjsGlobal));
  });

  var version = "1.3.0";

  var iframe = createCommonjsModule(function(module) {
    var debug = function() {};
    {
      debug = browser("sockjs-client:utils:iframe");
    }

    module.exports = {
      WPrefix: "_jp",
      currentWindowId: null,

      polluteGlobalNamespace: function() {
        if (!(module.exports.WPrefix in commonjsGlobal)) {
          commonjsGlobal[module.exports.WPrefix] = {};
        }
      },

      postMessage: function(type, data) {
        if (commonjsGlobal.parent !== commonjsGlobal) {
          commonjsGlobal.parent.postMessage(
            json3.stringify({
              windowId: module.exports.currentWindowId,
              type: type,
              data: data || ""
            }),
            "*"
          );
        } else {
          debug("Cannot postMessage, no parent window.", type, data);
        }
      },

      createIframe: function(iframeUrl, errorCallback) {
        var iframe = commonjsGlobal.document.createElement("iframe");
        var tref, unloadRef;
        var unattach = function() {
          debug("unattach");
          clearTimeout(tref);
          // Explorer had problems with that.
          try {
            iframe.onload = null;
          } catch (x) {
            // intentionally empty
          }
          iframe.onerror = null;
        };
        var cleanup = function() {
          debug("cleanup");
          if (iframe) {
            unattach();
            // This timeout makes chrome fire onbeforeunload event
            // within iframe. Without the timeout it goes straight to
            // onunload.
            setTimeout(function() {
              if (iframe) {
                iframe.parentNode.removeChild(iframe);
              }
              iframe = null;
            }, 0);
            event.unloadDel(unloadRef);
          }
        };
        var onerror = function(err) {
          debug("onerror", err);
          if (iframe) {
            cleanup();
            errorCallback(err);
          }
        };
        var post = function(msg, origin) {
          debug("post", msg, origin);
          setTimeout(function() {
            try {
              // When the iframe is not loaded, IE raises an exception
              // on 'contentWindow'.
              if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage(msg, origin);
              }
            } catch (x) {
              // intentionally empty
            }
          }, 0);
        };

        iframe.src = iframeUrl;
        iframe.style.display = "none";
        iframe.style.position = "absolute";
        iframe.onerror = function() {
          onerror("onerror");
        };
        iframe.onload = function() {
          debug("onload");
          // `onload` is triggered before scripts on the iframe are
          // executed. Give it few seconds to actually load stuff.
          clearTimeout(tref);
          tref = setTimeout(function() {
            onerror("onload timeout");
          }, 2000);
        };
        commonjsGlobal.document.body.appendChild(iframe);
        tref = setTimeout(function() {
          onerror("timeout");
        }, 15000);
        unloadRef = event.unloadAdd(cleanup);
        return {
          post: post,
          cleanup: cleanup,
          loaded: unattach
        };
      },

      /* eslint no-undef: "off", new-cap: "off" */
      createHtmlfile: function(iframeUrl, errorCallback) {
        var axo = ["Active"].concat("Object").join("X");
        var doc = new commonjsGlobal[axo]("htmlfile");
        var tref, unloadRef;
        var iframe;
        var unattach = function() {
          clearTimeout(tref);
          iframe.onerror = null;
        };
        var cleanup = function() {
          if (doc) {
            unattach();
            event.unloadDel(unloadRef);
            iframe.parentNode.removeChild(iframe);
            iframe = doc = null;
            CollectGarbage();
          }
        };
        var onerror = function(r) {
          debug("onerror", r);
          if (doc) {
            cleanup();
            errorCallback(r);
          }
        };
        var post = function(msg, origin) {
          try {
            // When the iframe is not loaded, IE raises an exception
            // on 'contentWindow'.
            setTimeout(function() {
              if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage(msg, origin);
              }
            }, 0);
          } catch (x) {
            // intentionally empty
          }
        };

        doc.open();
        doc.write(
          "<html><s" +
            "cript>" +
            'document.domain="' +
            commonjsGlobal.document.domain +
            '";' +
            "</s" +
            "cript></html>"
        );
        doc.close();
        doc.parentWindow[module.exports.WPrefix] =
          commonjsGlobal[module.exports.WPrefix];
        var c = doc.createElement("div");
        doc.body.appendChild(c);
        iframe = doc.createElement("iframe");
        c.appendChild(iframe);
        iframe.src = iframeUrl;
        iframe.onerror = function() {
          onerror("onerror");
        };
        tref = setTimeout(function() {
          onerror("timeout");
        }, 15000);
        unloadRef = event.unloadAdd(cleanup);
        return {
          post: post,
          cleanup: cleanup,
          loaded: unattach
        };
      }
    };

    module.exports.iframeEnabled = false;
    if (commonjsGlobal.document) {
      // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
      // huge delay, or not at all.
      module.exports.iframeEnabled =
        (typeof commonjsGlobal.postMessage === "function" ||
          typeof commonjsGlobal.postMessage === "object") &&
        !browser$1.isKonqueror();
    }
  });

  // Few cool transports do work only for same-origin. In order to make
  // them work cross-domain we shall use iframe, served from the
  // remote domain. New browsers have capabilities to communicate with
  // cross domain iframe using postMessage(). In IE it was implemented
  // from IE 8+, but of course, IE got some details wrong:
  //    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
  //    http://stevesouders.com/misc/test-postmessage.php

  var EventEmitter$8 = emitter.EventEmitter;
  var debug$a = function() {};
  {
    debug$a = browser("sockjs-client:transport:iframe");
  }

  function IframeTransport(transport, transUrl, baseUrl) {
    if (!IframeTransport.enabled()) {
      throw new Error("Transport created when disabled");
    }
    EventEmitter$8.call(this);

    var self = this;
    this.origin = url.getOrigin(baseUrl);
    this.baseUrl = baseUrl;
    this.transUrl = transUrl;
    this.transport = transport;
    this.windowId = random.string(8);

    var iframeUrl = url.addPath(baseUrl, "/iframe.html") + "#" + this.windowId;
    debug$a(transport, transUrl, iframeUrl);

    this.iframeObj = iframe.createIframe(iframeUrl, function(r) {
      debug$a("err callback");
      self.emit("close", 1006, "Unable to load an iframe (" + r + ")");
      self.close();
    });

    this.onmessageCallback = this._message.bind(this);
    event.attachEvent("message", this.onmessageCallback);
  }

  inherits_browser(IframeTransport, EventEmitter$8);

  IframeTransport.prototype.close = function() {
    debug$a("close");
    this.removeAllListeners();
    if (this.iframeObj) {
      event.detachEvent("message", this.onmessageCallback);
      try {
        // When the iframe is not loaded, IE raises an exception
        // on 'contentWindow'.
        this.postMessage("c");
      } catch (x) {
        // intentionally empty
      }
      this.iframeObj.cleanup();
      this.iframeObj = null;
      this.onmessageCallback = this.iframeObj = null;
    }
  };

  IframeTransport.prototype._message = function(e) {
    debug$a("message", e.data);
    if (!url.isOriginEqual(e.origin, this.origin)) {
      debug$a("not same origin", e.origin, this.origin);
      return;
    }

    var iframeMessage;
    try {
      iframeMessage = json3.parse(e.data);
    } catch (ignored) {
      debug$a("bad json", e.data);
      return;
    }

    if (iframeMessage.windowId !== this.windowId) {
      debug$a("mismatched window id", iframeMessage.windowId, this.windowId);
      return;
    }

    switch (iframeMessage.type) {
      case "s":
        this.iframeObj.loaded();
        // window global dependency
        this.postMessage(
          "s",
          json3.stringify([
            version,
            this.transport,
            this.transUrl,
            this.baseUrl
          ])
        );
        break;
      case "t":
        this.emit("message", iframeMessage.data);
        break;
      case "c":
        var cdata;
        try {
          cdata = json3.parse(iframeMessage.data);
        } catch (ignored) {
          debug$a("bad json", iframeMessage.data);
          return;
        }
        this.emit("close", cdata[0], cdata[1]);
        this.close();
        break;
    }
  };

  IframeTransport.prototype.postMessage = function(type, data) {
    debug$a("postMessage", type, data);
    this.iframeObj.post(
      json3.stringify({
        windowId: this.windowId,
        type: type,
        data: data || ""
      }),
      this.origin
    );
  };

  IframeTransport.prototype.send = function(message) {
    debug$a("send", message);
    this.postMessage("m", message);
  };

  IframeTransport.enabled = function() {
    return iframe.iframeEnabled;
  };

  IframeTransport.transportName = "iframe";
  IframeTransport.roundTrips = 2;

  var iframe$1 = IframeTransport;

  var object = {
    isObject: function(obj) {
      var type = typeof obj;
      return type === "function" || (type === "object" && !!obj);
    },

    extend: function(obj) {
      if (!this.isObject(obj)) {
        return obj;
      }
      var source, prop;
      for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        for (prop in source) {
          if (Object.prototype.hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
          }
        }
      }
      return obj;
    }
  };

  var iframeWrap = function(transport) {
    function IframeWrapTransport(transUrl, baseUrl) {
      iframe$1.call(this, transport.transportName, transUrl, baseUrl);
    }

    inherits_browser(IframeWrapTransport, iframe$1);

    IframeWrapTransport.enabled = function(url, info) {
      if (!commonjsGlobal.document) {
        return false;
      }

      var iframeInfo = object.extend({}, info);
      iframeInfo.sameOrigin = true;
      return transport.enabled(iframeInfo) && iframe$1.enabled();
    };

    IframeWrapTransport.transportName = "iframe-" + transport.transportName;
    IframeWrapTransport.needBody = true;
    IframeWrapTransport.roundTrips =
      iframe$1.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)

    IframeWrapTransport.facadeTransport = transport;

    return IframeWrapTransport;
  };

  var EventEmitter$9 = emitter.EventEmitter;
  var debug$b = function() {};
  {
    debug$b = browser("sockjs-client:receiver:htmlfile");
  }

  function HtmlfileReceiver(url$$1) {
    debug$b(url$$1);
    EventEmitter$9.call(this);
    var self = this;
    iframe.polluteGlobalNamespace();

    this.id = "a" + random.string(6);
    url$$1 = url.addQuery(
      url$$1,
      "c=" + decodeURIComponent(iframe.WPrefix + "." + this.id)
    );

    debug$b("using htmlfile", HtmlfileReceiver.htmlfileEnabled);
    var constructFunc = HtmlfileReceiver.htmlfileEnabled
      ? iframe.createHtmlfile
      : iframe.createIframe;

    commonjsGlobal[iframe.WPrefix][this.id] = {
      start: function() {
        debug$b("start");
        self.iframeObj.loaded();
      },
      message: function(data) {
        debug$b("message", data);
        self.emit("message", data);
      },
      stop: function() {
        debug$b("stop");
        self._cleanup();
        self._close("network");
      }
    };
    this.iframeObj = constructFunc(url$$1, function() {
      debug$b("callback");
      self._cleanup();
      self._close("permanent");
    });
  }

  inherits_browser(HtmlfileReceiver, EventEmitter$9);

  HtmlfileReceiver.prototype.abort = function() {
    debug$b("abort");
    this._cleanup();
    this._close("user");
  };

  HtmlfileReceiver.prototype._cleanup = function() {
    debug$b("_cleanup");
    if (this.iframeObj) {
      this.iframeObj.cleanup();
      this.iframeObj = null;
    }
    delete commonjsGlobal[iframe.WPrefix][this.id];
  };

  HtmlfileReceiver.prototype._close = function(reason) {
    debug$b("_close", reason);
    this.emit("close", null, reason);
    this.removeAllListeners();
  };

  HtmlfileReceiver.htmlfileEnabled = false;

  // obfuscate to avoid firewalls
  var axo$1 = ["Active"].concat("Object").join("X");
  if (axo$1 in commonjsGlobal) {
    try {
      HtmlfileReceiver.htmlfileEnabled = !!new commonjsGlobal[axo$1](
        "htmlfile"
      );
    } catch (x) {
      // intentionally empty
    }
  }

  HtmlfileReceiver.enabled =
    HtmlfileReceiver.htmlfileEnabled || iframe.iframeEnabled;

  var htmlfile = HtmlfileReceiver;

  function HtmlFileTransport(transUrl) {
    if (!htmlfile.enabled) {
      throw new Error("Transport created when disabled");
    }
    ajaxBased.call(this, transUrl, "/htmlfile", htmlfile, xhrLocal);
  }

  inherits_browser(HtmlFileTransport, ajaxBased);

  HtmlFileTransport.enabled = function(info) {
    return htmlfile.enabled && info.sameOrigin;
  };

  HtmlFileTransport.transportName = "htmlfile";
  HtmlFileTransport.roundTrips = 2;

  var htmlfile$1 = HtmlFileTransport;

  function XhrPollingTransport(transUrl) {
    if (!xhrLocal.enabled && !xhrCors.enabled) {
      throw new Error("Transport created when disabled");
    }
    ajaxBased.call(this, transUrl, "/xhr", xhr, xhrCors);
  }

  inherits_browser(XhrPollingTransport, ajaxBased);

  XhrPollingTransport.enabled = function(info) {
    if (info.nullOrigin) {
      return false;
    }

    if (xhrLocal.enabled && info.sameOrigin) {
      return true;
    }
    return xhrCors.enabled;
  };

  XhrPollingTransport.transportName = "xhr-polling";
  XhrPollingTransport.roundTrips = 2; // preflight, ajax

  var xhrPolling = XhrPollingTransport;

  function XdrPollingTransport(transUrl) {
    if (!xdr.enabled) {
      throw new Error("Transport created when disabled");
    }
    ajaxBased.call(this, transUrl, "/xhr", xhr, xdr);
  }

  inherits_browser(XdrPollingTransport, ajaxBased);

  XdrPollingTransport.enabled = xdrStreaming.enabled;
  XdrPollingTransport.transportName = "xdr-polling";
  XdrPollingTransport.roundTrips = 2; // preflight, ajax

  var xdrPolling = XdrPollingTransport;

  var EventEmitter$a = emitter.EventEmitter;
  var debug$c = function() {};
  {
    debug$c = browser("sockjs-client:receiver:jsonp");
  }

  function JsonpReceiver(url$$1) {
    debug$c(url$$1);
    var self = this;
    EventEmitter$a.call(this);

    iframe.polluteGlobalNamespace();

    this.id = "a" + random.string(6);
    var urlWithId = url.addQuery(
      url$$1,
      "c=" + encodeURIComponent(iframe.WPrefix + "." + this.id)
    );

    commonjsGlobal[iframe.WPrefix][this.id] = this._callback.bind(this);
    this._createScript(urlWithId);

    // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
    this.timeoutId = setTimeout(function() {
      debug$c("timeout");
      self._abort(new Error("JSONP script loaded abnormally (timeout)"));
    }, JsonpReceiver.timeout);
  }

  inherits_browser(JsonpReceiver, EventEmitter$a);

  JsonpReceiver.prototype.abort = function() {
    debug$c("abort");
    if (commonjsGlobal[iframe.WPrefix][this.id]) {
      var err = new Error("JSONP user aborted read");
      err.code = 1000;
      this._abort(err);
    }
  };

  JsonpReceiver.timeout = 35000;
  JsonpReceiver.scriptErrorTimeout = 1000;

  JsonpReceiver.prototype._callback = function(data) {
    debug$c("_callback", data);
    this._cleanup();

    if (this.aborting) {
      return;
    }

    if (data) {
      debug$c("message", data);
      this.emit("message", data);
    }
    this.emit("close", null, "network");
    this.removeAllListeners();
  };

  JsonpReceiver.prototype._abort = function(err) {
    debug$c("_abort", err);
    this._cleanup();
    this.aborting = true;
    this.emit("close", err.code, err.message);
    this.removeAllListeners();
  };

  JsonpReceiver.prototype._cleanup = function() {
    debug$c("_cleanup");
    clearTimeout(this.timeoutId);
    if (this.script2) {
      this.script2.parentNode.removeChild(this.script2);
      this.script2 = null;
    }
    if (this.script) {
      var script = this.script;
      // Unfortunately, you can't really abort script loading of
      // the script.
      script.parentNode.removeChild(script);
      script.onreadystatechange = script.onerror = script.onload = script.onclick = null;
      this.script = null;
    }
    delete commonjsGlobal[iframe.WPrefix][this.id];
  };

  JsonpReceiver.prototype._scriptError = function() {
    debug$c("_scriptError");
    var self = this;
    if (this.errorTimer) {
      return;
    }

    this.errorTimer = setTimeout(function() {
      if (!self.loadedOkay) {
        self._abort(new Error("JSONP script loaded abnormally (onerror)"));
      }
    }, JsonpReceiver.scriptErrorTimeout);
  };

  JsonpReceiver.prototype._createScript = function(url$$1) {
    debug$c("_createScript", url$$1);
    var self = this;
    var script = (this.script = commonjsGlobal.document.createElement(
      "script"
    ));
    var script2; // Opera synchronous load trick.

    script.id = "a" + random.string(8);
    script.src = url$$1;
    script.type = "text/javascript";
    script.charset = "UTF-8";
    script.onerror = this._scriptError.bind(this);
    script.onload = function() {
      debug$c("onload");
      self._abort(new Error("JSONP script loaded abnormally (onload)"));
    };

    // IE9 fires 'error' event after onreadystatechange or before, in random order.
    // Use loadedOkay to determine if actually errored
    script.onreadystatechange = function() {
      debug$c("onreadystatechange", script.readyState);
      if (/loaded|closed/.test(script.readyState)) {
        if (script && script.htmlFor && script.onclick) {
          self.loadedOkay = true;
          try {
            // In IE, actually execute the script.
            script.onclick();
          } catch (x) {
            // intentionally empty
          }
        }
        if (script) {
          self._abort(
            new Error("JSONP script loaded abnormally (onreadystatechange)")
          );
        }
      }
    };
    // IE: event/htmlFor/onclick trick.
    // One can't rely on proper order for onreadystatechange. In order to
    // make sure, set a 'htmlFor' and 'event' properties, so that
    // script code will be installed as 'onclick' handler for the
    // script object. Later, onreadystatechange, manually execute this
    // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
    // set. For reference see:
    //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
    // Also, read on that about script ordering:
    //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
    if (
      typeof script.async === "undefined" &&
      commonjsGlobal.document.attachEvent
    ) {
      // According to mozilla docs, in recent browsers script.async defaults
      // to 'true', so we may use it to detect a good browser:
      // https://developer.mozilla.org/en/HTML/Element/script
      if (!browser$1.isOpera()) {
        // Naively assume we're in IE
        try {
          script.htmlFor = script.id;
          script.event = "onclick";
        } catch (x) {
          // intentionally empty
        }
        script.async = true;
      } else {
        // Opera, second sync script hack
        script2 = this.script2 = commonjsGlobal.document.createElement(
          "script"
        );
        script2.text =
          "try{var a = document.getElementById('" +
          script.id +
          "'); if(a)a.onerror();}catch(x){};";
        script.async = script2.async = false;
      }
    }
    if (typeof script.async !== "undefined") {
      script.async = true;
    }

    var head = commonjsGlobal.document.getElementsByTagName("head")[0];
    head.insertBefore(script, head.firstChild);
    if (script2) {
      head.insertBefore(script2, head.firstChild);
    }
  };

  var jsonp = JsonpReceiver;

  var debug$d = function() {};
  {
    debug$d = browser("sockjs-client:sender:jsonp");
  }

  var form, area;

  function createIframe(id) {
    debug$d("createIframe", id);
    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      return commonjsGlobal.document.createElement(
        '<iframe name="' + id + '">'
      );
    } catch (x) {
      var iframe = commonjsGlobal.document.createElement("iframe");
      iframe.name = id;
      return iframe;
    }
  }

  function createForm() {
    debug$d("createForm");
    form = commonjsGlobal.document.createElement("form");
    form.style.display = "none";
    form.style.position = "absolute";
    form.method = "POST";
    form.enctype = "application/x-www-form-urlencoded";
    form.acceptCharset = "UTF-8";

    area = commonjsGlobal.document.createElement("textarea");
    area.name = "d";
    form.appendChild(area);

    commonjsGlobal.document.body.appendChild(form);
  }

  var jsonp$1 = function(url$$1, payload, callback) {
    debug$d(url$$1, payload);
    if (!form) {
      createForm();
    }
    var id = "a" + random.string(8);
    form.target = id;
    form.action = url.addQuery(url.addPath(url$$1, "/jsonp_send"), "i=" + id);

    var iframe = createIframe(id);
    iframe.id = id;
    iframe.style.display = "none";
    form.appendChild(iframe);

    try {
      area.value = payload;
    } catch (e) {
      // seriously broken browsers get here
    }
    form.submit();

    var completed = function(err) {
      debug$d("completed", id, err);
      if (!iframe.onerror) {
        return;
      }
      iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
      // Opera mini doesn't like if we GC iframe
      // immediately, thus this timeout.
      setTimeout(function() {
        debug$d("cleaning up", id);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
      }, 500);
      area.value = "";
      // It is not possible to detect if the iframe succeeded or
      // failed to submit our form.
      callback(err);
    };
    iframe.onerror = function() {
      debug$d("onerror", id);
      completed();
    };
    iframe.onload = function() {
      debug$d("onload", id);
      completed();
    };
    iframe.onreadystatechange = function(e) {
      debug$d("onreadystatechange", id, iframe.readyState, e);
      if (iframe.readyState === "complete") {
        completed();
      }
    };
    return function() {
      debug$d("aborted", id);
      completed(new Error("Aborted"));
    };
  };

  // The simplest and most robust transport, using the well-know cross
  // domain hack - JSONP. This transport is quite inefficient - one
  // message could use up to one http request. But at least it works almost
  // everywhere.
  // Known limitations:
  //   o you will get a spinning cursor
  //   o for Konqueror a dumb timer is needed to detect errors

  function JsonPTransport(transUrl) {
    if (!JsonPTransport.enabled()) {
      throw new Error("Transport created when disabled");
    }
    senderReceiver.call(this, transUrl, "/jsonp", jsonp$1, jsonp);
  }

  inherits_browser(JsonPTransport, senderReceiver);

  JsonPTransport.enabled = function() {
    return !!commonjsGlobal.document;
  };

  JsonPTransport.transportName = "jsonp-polling";
  JsonPTransport.roundTrips = 1;
  JsonPTransport.needBody = true;

  var jsonpPolling = JsonPTransport;

  var transportList = [
    // streaming transports
    websocket$1,
    xhrStreaming,
    xdrStreaming,
    eventsource$2,
    iframeWrap(eventsource$2),

    // polling transports
    htmlfile$1,
    iframeWrap(htmlfile$1),
    xhrPolling,
    xdrPolling,
    iframeWrap(xhrPolling),
    jsonpPolling
  ];

  /* eslint-disable */

  // pulled specific shims from https://github.com/es-shims/es5-shim

  var ArrayPrototype = Array.prototype;
  var ObjectPrototype = Object.prototype;
  var FunctionPrototype = Function.prototype;
  var StringPrototype = String.prototype;
  var array_slice = ArrayPrototype.slice;

  var _toString = ObjectPrototype.toString;
  var isFunction = function(val) {
    return ObjectPrototype.toString.call(val) === "[object Function]";
  };
  var isArray$1 = function isArray(obj) {
    return _toString.call(obj) === "[object Array]";
  };
  var isString = function isString(obj) {
    return _toString.call(obj) === "[object String]";
  };

  var supportsDescriptors =
    Object.defineProperty &&
    (function() {
      try {
        Object.defineProperty({}, "x", {});
        return true;
      } catch (e) {
        /* this is ES3 */
        return false;
      }
    })();

  // Define configurable, writable and non-enumerable props
  // if they don't exist.
  var defineProperty;
  if (supportsDescriptors) {
    defineProperty = function(object, name, method, forceAssign) {
      if (!forceAssign && name in object) {
        return;
      }
      Object.defineProperty(object, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: method
      });
    };
  } else {
    defineProperty = function(object, name, method, forceAssign) {
      if (!forceAssign && name in object) {
        return;
      }
      object[name] = method;
    };
  }
  var defineProperties = function(object, map, forceAssign) {
    for (var name in map) {
      if (ObjectPrototype.hasOwnProperty.call(map, name)) {
        defineProperty(object, name, map[name], forceAssign);
      }
    }
  };

  var toObject = function(o) {
    if (o == null) {
      // this matches both null and undefined
      throw new TypeError("can't convert " + o + " to object");
    }
    return Object(o);
  };

  //
  // Util
  // ======
  //

  // ES5 9.4
  // http://es5.github.com/#x9.4
  // http://jsperf.com/to-integer

  function toInteger(num) {
    var n = +num;
    if (n !== n) {
      // isNaN
      n = 0;
    } else if (n !== 0 && n !== 1 / 0 && n !== -(1 / 0)) {
      n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
    return n;
  }

  function ToUint32(x) {
    return x >>> 0;
  }

  //
  // Function
  // ========
  //

  // ES-5 15.3.4.5
  // http://es5.github.com/#x15.3.4.5

  function Empty() {}

  defineProperties(FunctionPrototype, {
    bind: function bind(that) {
      // .length is 1
      // 1. Let Target be the this value.
      var target = this;
      // 2. If IsCallable(Target) is false, throw a TypeError exception.
      if (!isFunction(target)) {
        throw new TypeError(
          "Function.prototype.bind called on incompatible " + target
        );
      }
      // 3. Let A be a new (possibly empty) internal list of all of the
      //   argument values provided after thisArg (arg1, arg2 etc), in order.
      // XXX slicedArgs will stand in for "A" if used
      var args = array_slice.call(arguments, 1); // for normal call
      // 4. Let F be a new native ECMAScript object.
      // 11. Set the [[Prototype]] internal property of F to the standard
      //   built-in Function prototype object as specified in 15.3.3.1.
      // 12. Set the [[Call]] internal property of F as described in
      //   15.3.4.5.1.
      // 13. Set the [[Construct]] internal property of F as described in
      //   15.3.4.5.2.
      // 14. Set the [[HasInstance]] internal property of F as described in
      //   15.3.4.5.3.
      var binder = function() {
        if (this instanceof bound) {
          // 15.3.4.5.2 [[Construct]]
          // When the [[Construct]] internal method of a function object,
          // F that was created using the bind function is called with a
          // list of arguments ExtraArgs, the following steps are taken:
          // 1. Let target be the value of F's [[TargetFunction]]
          //   internal property.
          // 2. If target has no [[Construct]] internal method, a
          //   TypeError exception is thrown.
          // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
          //   property.
          // 4. Let args be a new list containing the same values as the
          //   list boundArgs in the same order followed by the same
          //   values as the list ExtraArgs in the same order.
          // 5. Return the result of calling the [[Construct]] internal
          //   method of target providing args as the arguments.

          var result = target.apply(
            this,
            args.concat(array_slice.call(arguments))
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          // 15.3.4.5.1 [[Call]]
          // When the [[Call]] internal method of a function object, F,
          // which was created using the bind function is called with a
          // this value and a list of arguments ExtraArgs, the following
          // steps are taken:
          // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
          //   property.
          // 2. Let boundThis be the value of F's [[BoundThis]] internal
          //   property.
          // 3. Let target be the value of F's [[TargetFunction]] internal
          //   property.
          // 4. Let args be a new list containing the same values as the
          //   list boundArgs in the same order followed by the same
          //   values as the list ExtraArgs in the same order.
          // 5. Return the result of calling the [[Call]] internal method
          //   of target providing boundThis as the this value and
          //   providing args as the arguments.

          // equiv: target.call(this, ...boundArgs, ...args)
          return target.apply(that, args.concat(array_slice.call(arguments)));
        }
      };

      // 15. If the [[Class]] internal property of Target is "Function", then
      //     a. Let L be the length property of Target minus the length of A.
      //     b. Set the length own property of F to either 0 or L, whichever is
      //       larger.
      // 16. Else set the length own property of F to 0.

      var boundLength = Math.max(0, target.length - args.length);

      // 17. Set the attributes of the length own property of F to the values
      //   specified in 15.3.5.1.
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }

      // XXX Build a dynamic function with desired amount of arguments is the only
      // way to set the length property of a function.
      // In environments where Content Security Policies enabled (Chrome extensions,
      // for ex.) all use of eval or Function costructor throws an exception.
      // However in all of these environments Function.prototype.bind exists
      // and so this code will never be executed.
      var bound = Function(
        "binder",
        "return function (" +
          boundArgs.join(",") +
          "){ return binder.apply(this, arguments); }"
      )(binder);

      if (target.prototype) {
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        // Clean up dangling references.
        Empty.prototype = null;
      }

      // TODO
      // 18. Set the [[Extensible]] internal property of F to true.

      // TODO
      // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
      // 20. Call the [[DefineOwnProperty]] internal method of F with
      //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
      //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
      //   false.
      // 21. Call the [[DefineOwnProperty]] internal method of F with
      //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
      //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
      //   and false.

      // TODO
      // NOTE Function objects created using Function.prototype.bind do not
      // have a prototype property or the [[Code]], [[FormalParameters]], and
      // [[Scope]] internal properties.
      // XXX can't delete prototype in pure-js.

      // 22. Return F.
      return bound;
    }
  });

  //
  // Array
  // =====
  //

  // ES5 15.4.3.2
  // http://es5.github.com/#x15.4.3.2
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
  defineProperties(Array, { isArray: isArray$1 });

  var boxedString = Object("a");
  var splitString = boxedString[0] !== "a" || !(0 in boxedString);

  var properlyBoxesContext = function properlyBoxed(method) {
    // Check node 0.6.21 bug where third parameter is not boxed
    var properlyBoxesNonStrict = true;
    var properlyBoxesStrict = true;
    if (method) {
      method.call("foo", function(_, __, context) {
        if (typeof context !== "object") {
          properlyBoxesNonStrict = false;
        }
      });

      method.call(
        [1],
        function() {
          properlyBoxesStrict = typeof this === "string";
        },
        "x"
      );
    }
    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
  };

  defineProperties(
    ArrayPrototype,
    {
      forEach: function forEach(fun /*, thisp*/) {
        var object = toObject(this),
          self = splitString && isString(this) ? this.split("") : object,
          thisp = arguments[1],
          i = -1,
          length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
          throw new TypeError(); // TODO message
        }

        while (++i < length) {
          if (i in self) {
            // Invoke the callback function with call, passing arguments:
            // context, property value, property key, thisArg object
            // context
            fun.call(thisp, self[i], i, object);
          }
        }
      }
    },
    !properlyBoxesContext(ArrayPrototype.forEach)
  );

  // ES5 15.4.4.14
  // http://es5.github.com/#x15.4.4.14
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
  var hasFirefox2IndexOfBug =
    Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
  defineProperties(
    ArrayPrototype,
    {
      indexOf: function indexOf(sought /*, fromIndex */) {
        var self =
            splitString && isString(this) ? this.split("") : toObject(this),
          length = self.length >>> 0;

        if (!length) {
          return -1;
        }

        var i = 0;
        if (arguments.length > 1) {
          i = toInteger(arguments[1]);
        }

        // handle negative indices
        i = i >= 0 ? i : Math.max(0, length + i);
        for (; i < length; i++) {
          if (i in self && self[i] === sought) {
            return i;
          }
        }
        return -1;
      }
    },
    hasFirefox2IndexOfBug
  );

  //
  // String
  // ======
  //

  // ES5 15.5.4.14
  // http://es5.github.com/#x15.5.4.14

  // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
  // Many browsers do not split properly with regular expressions or they
  // do not perform the split correctly under obscure conditions.
  // See http://blog.stevenlevithan.com/archives/cross-browser-split
  // I've tested in many browsers and this seems to cover the deviant ones:
  //    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
  //    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
  //    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
  //       [undefined, "t", undefined, "e", ...]
  //    ''.split(/.?/) should be [], not [""]
  //    '.'.split(/()()/) should be ["."], not ["", "", "."]

  var string_split = StringPrototype.split;
  if (
    "ab".split(/(?:ab)*/).length !== 2 ||
    ".".split(/(.?)(.?)/).length !== 4 ||
    "tesst".split(/(s)*/)[1] === "t" ||
    "test".split(/(?:)/, -1).length !== 4 ||
    "".split(/.?/).length ||
    ".".split(/()()/).length > 1
  ) {
    (function() {
      var compliantExecNpcg = /()??/.exec("")[1] === void 0; // NPCG: nonparticipating capturing group

      StringPrototype.split = function(separator, limit) {
        var string = this;
        if (separator === void 0 && limit === 0) {
          return [];
        }

        // If `separator` is not a regex, use native split
        if (_toString.call(separator) !== "[object RegExp]") {
          return string_split.call(this, separator, limit);
        }

        var output = [],
          flags =
            (separator.ignoreCase ? "i" : "") +
            (separator.multiline ? "m" : "") +
            (separator.extended ? "x" : "") + // Proposed for ES6
            (separator.sticky ? "y" : ""), // Firefox 3+
          lastLastIndex = 0,
          // Make `global` and avoid `lastIndex` issues by working with a copy
          separator2,
          match,
          lastIndex,
          lastLength;
        separator = new RegExp(separator.source, flags + "g");
        string += ""; // Type-convert
        if (!compliantExecNpcg) {
          // Doesn't need flags gy, but they don't hurt
          separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
        }
        /* Values for `limit`, per the spec:
         * If undefined: 4294967295 // Math.pow(2, 32) - 1
         * If 0, Infinity, or NaN: 0
         * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
         * If negative number: 4294967296 - Math.floor(Math.abs(limit))
         * If other: Type-convert, then use the above rules
         */
        limit =
          limit === void 0
            ? -1 >>> 0 // Math.pow(2, 32) - 1
            : ToUint32(limit);
        while ((match = separator.exec(string))) {
          // `separator.lastIndex` is not reliable cross-browser
          lastIndex = match.index + match[0].length;
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            // Fix browsers whose `exec` methods don't consistently return `undefined` for
            // nonparticipating capturing groups
            if (!compliantExecNpcg && match.length > 1) {
              match[0].replace(separator2, function() {
                for (var i = 1; i < arguments.length - 2; i++) {
                  if (arguments[i] === void 0) {
                    match[i] = void 0;
                  }
                }
              });
            }
            if (match.length > 1 && match.index < string.length) {
              ArrayPrototype.push.apply(output, match.slice(1));
            }
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= limit) {
              break;
            }
          }
          if (separator.lastIndex === match.index) {
            separator.lastIndex++; // Avoid an infinite loop
          }
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !separator.test("")) {
            output.push("");
          }
        } else {
          output.push(string.slice(lastLastIndex));
        }
        return output.length > limit ? output.slice(0, limit) : output;
      };
    })();

    // [bugfix, chrome]
    // If separator is undefined, then the result array contains just one String,
    // which is the this value (converted to a String). If limit is not undefined,
    // then the output array is truncated so that it contains no more than limit
    // elements.
    // "0".split(undefined, 0) -> []
  } else if ("0".split(void 0, 0).length) {
    StringPrototype.split = function split(separator, limit) {
      if (separator === void 0 && limit === 0) {
        return [];
      }
      return string_split.call(this, separator, limit);
    };
  }

  // ECMA-262, 3rd B.2.3
  // Not an ECMAScript standard, although ECMAScript 3rd Edition has a
  // non-normative section suggesting uniform semantics and it should be
  // normalized across all browsers
  // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
  var string_substr = StringPrototype.substr;
  var hasNegativeSubstrBug = "".substr && "0b".substr(-1) !== "b";
  defineProperties(
    StringPrototype,
    {
      substr: function substr(start, length) {
        return string_substr.call(
          this,
          start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
          length
        );
      }
    },
    hasNegativeSubstrBug
  );

  // Some extra characters that Chrome gets wrong, and substitutes with
  // something else on the wire.
  // eslint-disable-next-line no-control-regex
  var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,
    extraLookup;

  // This may be quite slow, so let's delay until user actually uses bad
  // characters.
  var unrollLookup = function(escapable) {
    var unrolled = {};
    escapable.lastIndex = 0;
    escapable.lastIndex = 0;
    return unrolled;
  };

  // Quote string, also taking care of unicode characters that browsers
  // often break. Especially, take care of unicode surrogates:
  // http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
  var _escape = {
    quote: function(string) {
      var quoted = json3.stringify(string);

      // In most cases this should be very fast and good enough.
      extraEscapable.lastIndex = 0;
      if (!extraEscapable.test(quoted)) {
        return quoted;
      }

      if (!extraLookup) {
        extraLookup = unrollLookup(extraEscapable);
      }

      return quoted.replace(extraEscapable, function(a) {
        return extraLookup[a];
      });
    }
  };

  var debug$e = function() {};
  {
    debug$e = browser("sockjs-client:utils:transport");
  }

  var transport = function(availableTransports) {
    return {
      filterToEnabled: function(transportsWhitelist, info) {
        var transports = {
          main: [],
          facade: []
        };
        if (!transportsWhitelist) {
          transportsWhitelist = [];
        } else if (typeof transportsWhitelist === "string") {
          transportsWhitelist = [transportsWhitelist];
        }

        availableTransports.forEach(function(trans) {
          if (!trans) {
            return;
          }

          if (trans.transportName === "websocket" && info.websocket === false) {
            debug$e("disabled from server", "websocket");
            return;
          }

          if (
            transportsWhitelist.length &&
            transportsWhitelist.indexOf(trans.transportName) === -1
          ) {
            debug$e("not in whitelist", trans.transportName);
            return;
          }

          if (trans.enabled(info)) {
            debug$e("enabled", trans.transportName);
            transports.main.push(trans);
            if (trans.facadeTransport) {
              transports.facade.push(trans.facadeTransport);
            }
          } else {
            debug$e("disabled", trans.transportName);
          }
        });
        return transports;
      }
    };
  };

  var logObject = {};
  ["log", "debug", "warn"].forEach(function(level) {
    var levelExists;

    try {
      levelExists =
        commonjsGlobal.console &&
        commonjsGlobal.console[level] &&
        commonjsGlobal.console[level].apply;
    } catch (e) {
      // do nothing
    }

    logObject[level] = levelExists
      ? function() {
          return commonjsGlobal.console[level].apply(
            commonjsGlobal.console,
            arguments
          );
        }
      : level === "log"
      ? function() {}
      : logObject.log;
  });

  var log = logObject;

  function Event(eventType) {
    this.type = eventType;
  }

  Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
    this.type = eventType;
    this.bubbles = canBubble;
    this.cancelable = cancelable;
    this.timeStamp = +new Date();
    return this;
  };

  Event.prototype.stopPropagation = function() {};
  Event.prototype.preventDefault = function() {};

  Event.CAPTURING_PHASE = 1;
  Event.AT_TARGET = 2;
  Event.BUBBLING_PHASE = 3;

  var event$1 = Event;

  var location_1 = commonjsGlobal.location || {
    origin: "http://localhost:80",
    protocol: "http:",
    host: "localhost",
    port: 80,
    href: "http://localhost/",
    hash: ""
  };

  function CloseEvent() {
    event$1.call(this);
    this.initEvent("close", false, false);
    this.wasClean = false;
    this.code = 0;
    this.reason = "";
  }

  inherits_browser(CloseEvent, event$1);

  var close = CloseEvent;

  function TransportMessageEvent(data) {
    event$1.call(this);
    this.initEvent("message", false, false);
    this.data = data;
  }

  inherits_browser(TransportMessageEvent, event$1);

  var transMessage = TransportMessageEvent;

  var EventEmitter$b = emitter.EventEmitter;
  function XHRFake(/* method, url, payload, opts */) {
    var self = this;
    EventEmitter$b.call(this);

    this.to = setTimeout(function() {
      self.emit("finish", 200, "{}");
    }, XHRFake.timeout);
  }

  inherits_browser(XHRFake, EventEmitter$b);

  XHRFake.prototype.close = function() {
    clearTimeout(this.to);
  };

  XHRFake.timeout = 2000;

  var xhrFake = XHRFake;

  var EventEmitter$c = emitter.EventEmitter;
  var debug$f = function() {};
  {
    debug$f = browser("sockjs-client:info-ajax");
  }

  function InfoAjax(url, AjaxObject) {
    EventEmitter$c.call(this);

    var self = this;
    var t0 = +new Date();
    this.xo = new AjaxObject("GET", url);

    this.xo.once("finish", function(status, text) {
      var info, rtt;
      if (status === 200) {
        rtt = +new Date() - t0;
        if (text) {
          try {
            info = json3.parse(text);
          } catch (e) {
            debug$f("bad json", text);
          }
        }

        if (!object.isObject(info)) {
          info = {};
        }
      }
      self.emit("finish", info, rtt);
      self.removeAllListeners();
    });
  }

  inherits_browser(InfoAjax, EventEmitter$c);

  InfoAjax.prototype.close = function() {
    this.removeAllListeners();
    this.xo.close();
  };

  var infoAjax = InfoAjax;

  var EventEmitter$d = emitter.EventEmitter;
  function InfoReceiverIframe(transUrl) {
    var self = this;
    EventEmitter$d.call(this);

    this.ir = new infoAjax(transUrl, xhrLocal);
    this.ir.once("finish", function(info, rtt) {
      self.ir = null;
      self.emit("message", json3.stringify([info, rtt]));
    });
  }

  inherits_browser(InfoReceiverIframe, EventEmitter$d);

  InfoReceiverIframe.transportName = "iframe-info-receiver";

  InfoReceiverIframe.prototype.close = function() {
    if (this.ir) {
      this.ir.close();
      this.ir = null;
    }
    this.removeAllListeners();
  };

  var infoIframeReceiver = InfoReceiverIframe;

  var EventEmitter$e = emitter.EventEmitter;
  var debug$g = function() {};
  {
    debug$g = browser("sockjs-client:info-iframe");
  }

  function InfoIframe(baseUrl, url) {
    var self = this;
    EventEmitter$e.call(this);

    var go = function() {
      var ifr = (self.ifr = new iframe$1(
        infoIframeReceiver.transportName,
        url,
        baseUrl
      ));

      ifr.once("message", function(msg) {
        if (msg) {
          var d;
          try {
            d = json3.parse(msg);
          } catch (e) {
            debug$g("bad json", msg);
            self.emit("finish");
            self.close();
            return;
          }

          var info = d[0],
            rtt = d[1];
          self.emit("finish", info, rtt);
        }
        self.close();
      });

      ifr.once("close", function() {
        self.emit("finish");
        self.close();
      });
    };

    // TODO this seems the same as the 'needBody' from transports
    if (!commonjsGlobal.document.body) {
      event.attachEvent("load", go);
    } else {
      go();
    }
  }

  inherits_browser(InfoIframe, EventEmitter$e);

  InfoIframe.enabled = function() {
    return iframe$1.enabled();
  };

  InfoIframe.prototype.close = function() {
    if (this.ifr) {
      this.ifr.close();
    }
    this.removeAllListeners();
    this.ifr = null;
  };

  var infoIframe = InfoIframe;

  var EventEmitter$f = emitter.EventEmitter;
  var debug$h = function() {};
  {
    debug$h = browser("sockjs-client:info-receiver");
  }

  function InfoReceiver(baseUrl, urlInfo) {
    debug$h(baseUrl);
    var self = this;
    EventEmitter$f.call(this);

    setTimeout(function() {
      self.doXhr(baseUrl, urlInfo);
    }, 0);
  }

  inherits_browser(InfoReceiver, EventEmitter$f);

  // TODO this is currently ignoring the list of available transports and the whitelist

  InfoReceiver._getReceiver = function(baseUrl, url$$1, urlInfo) {
    // determine method of CORS support (if needed)
    if (urlInfo.sameOrigin) {
      return new infoAjax(url$$1, xhrLocal);
    }
    if (xhrCors.enabled) {
      return new infoAjax(url$$1, xhrCors);
    }
    if (xdr.enabled && urlInfo.sameScheme) {
      return new infoAjax(url$$1, xdr);
    }
    if (infoIframe.enabled()) {
      return new infoIframe(baseUrl, url$$1);
    }
    return new infoAjax(url$$1, xhrFake);
  };

  InfoReceiver.prototype.doXhr = function(baseUrl, urlInfo) {
    var self = this,
      url$$1 = url.addPath(baseUrl, "/info");
    debug$h("doXhr", url$$1);

    this.xo = InfoReceiver._getReceiver(baseUrl, url$$1, urlInfo);

    this.timeoutRef = setTimeout(function() {
      debug$h("timeout");
      self._cleanup(false);
      self.emit("finish");
    }, InfoReceiver.timeout);

    this.xo.once("finish", function(info, rtt) {
      debug$h("finish", info, rtt);
      self._cleanup(true);
      self.emit("finish", info, rtt);
    });
  };

  InfoReceiver.prototype._cleanup = function(wasClean) {
    debug$h("_cleanup");
    clearTimeout(this.timeoutRef);
    this.timeoutRef = null;
    if (!wasClean && this.xo) {
      this.xo.close();
    }
    this.xo = null;
  };

  InfoReceiver.prototype.close = function() {
    debug$h("close");
    this.removeAllListeners();
    this._cleanup(false);
  };

  InfoReceiver.timeout = 8000;

  var infoReceiver = InfoReceiver;

  function FacadeJS(transport) {
    this._transport = transport;
    transport.on("message", this._transportMessage.bind(this));
    transport.on("close", this._transportClose.bind(this));
  }

  FacadeJS.prototype._transportClose = function(code, reason) {
    iframe.postMessage("c", json3.stringify([code, reason]));
  };
  FacadeJS.prototype._transportMessage = function(frame) {
    iframe.postMessage("t", frame);
  };
  FacadeJS.prototype._send = function(data) {
    this._transport.send(data);
  };
  FacadeJS.prototype._close = function() {
    this._transport.close();
    this._transport.removeAllListeners();
  };

  var facade = FacadeJS;

  var debug$i = function() {};
  {
    debug$i = browser("sockjs-client:iframe-bootstrap");
  }

  var iframeBootstrap = function(SockJS, availableTransports) {
    var transportMap = {};
    availableTransports.forEach(function(at) {
      if (at.facadeTransport) {
        transportMap[at.facadeTransport.transportName] = at.facadeTransport;
      }
    });

    // hard-coded for the info iframe
    // TODO see if we can make this more dynamic
    transportMap[infoIframeReceiver.transportName] = infoIframeReceiver;
    var parentOrigin;

    /* eslint-disable camelcase */
    SockJS.bootstrap_iframe = function() {
      /* eslint-enable camelcase */
      var facade$$1;
      iframe.currentWindowId = location_1.hash.slice(1);
      var onMessage = function(e) {
        if (e.source !== parent) {
          return;
        }
        if (typeof parentOrigin === "undefined") {
          parentOrigin = e.origin;
        }
        if (e.origin !== parentOrigin) {
          return;
        }

        var iframeMessage;
        try {
          iframeMessage = json3.parse(e.data);
        } catch (ignored) {
          debug$i("bad json", e.data);
          return;
        }

        if (iframeMessage.windowId !== iframe.currentWindowId) {
          return;
        }
        switch (iframeMessage.type) {
          case "s":
            var p;
            try {
              p = json3.parse(iframeMessage.data);
            } catch (ignored) {
              debug$i("bad json", iframeMessage.data);
              break;
            }
            var version = p[0];
            var transport = p[1];
            var transUrl = p[2];
            var baseUrl = p[3];
            debug$i(version, transport, transUrl, baseUrl);
            // change this to semver logic
            if (version !== SockJS.version) {
              throw new Error(
                "Incompatible SockJS! Main site uses:" +
                  ' "' +
                  version +
                  '", the iframe:' +
                  ' "' +
                  SockJS.version +
                  '".'
              );
            }

            if (
              !url.isOriginEqual(transUrl, location_1.href) ||
              !url.isOriginEqual(baseUrl, location_1.href)
            ) {
              throw new Error(
                "Can't connect to different domain from within an " +
                  "iframe. (" +
                  location_1.href +
                  ", " +
                  transUrl +
                  ", " +
                  baseUrl +
                  ")"
              );
            }
            facade$$1 = new facade(
              new transportMap[transport](transUrl, baseUrl)
            );
            break;
          case "m":
            facade$$1._send(iframeMessage.data);
            break;
          case "c":
            if (facade$$1) {
              facade$$1._close();
            }
            facade$$1 = null;
            break;
        }
      };

      event.attachEvent("message", onMessage);

      // Start
      iframe.postMessage("s");
    };
  };

  var debug$j = function() {};
  {
    debug$j = browser("sockjs-client:main");
  }

  var transports;

  // follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
  function SockJS(url$$1, protocols, options) {
    if (!(this instanceof SockJS)) {
      return new SockJS(url$$1, protocols, options);
    }
    if (arguments.length < 1) {
      throw new TypeError(
        "Failed to construct 'SockJS: 1 argument required, but only 0 present"
      );
    }
    eventtarget.call(this);

    this.readyState = SockJS.CONNECTING;
    this.extensions = "";
    this.protocol = "";

    // non-standard extension
    options = options || {};
    if (options.protocols_whitelist) {
      log.warn(
        "'protocols_whitelist' is DEPRECATED. Use 'transports' instead."
      );
    }
    this._transportsWhitelist = options.transports;
    this._transportOptions = options.transportOptions || {};

    var sessionId = options.sessionId || 8;
    if (typeof sessionId === "function") {
      this._generateSessionId = sessionId;
    } else if (typeof sessionId === "number") {
      this._generateSessionId = function() {
        return random.string(sessionId);
      };
    } else {
      throw new TypeError(
        "If sessionId is used in the options, it needs to be a number or a function."
      );
    }

    this._server = options.server || random.numberString(1000);

    // Step 1 of WS spec - parse and validate the url. Issue #8
    var parsedUrl = new urlParse(url$$1);
    if (!parsedUrl.host || !parsedUrl.protocol) {
      throw new SyntaxError("The URL '" + url$$1 + "' is invalid");
    } else if (parsedUrl.hash) {
      throw new SyntaxError("The URL must not contain a fragment");
    } else if (
      parsedUrl.protocol !== "http:" &&
      parsedUrl.protocol !== "https:"
    ) {
      throw new SyntaxError(
        "The URL's scheme must be either 'http:' or 'https:'. '" +
          parsedUrl.protocol +
          "' is not allowed."
      );
    }

    var secure = parsedUrl.protocol === "https:";
    // Step 2 - don't allow secure origin with an insecure protocol
    if (location_1.protocol === "https:" && !secure) {
      throw new Error(
        "SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS"
      );
    }

    // Step 3 - check port access - no need here
    // Step 4 - parse protocols argument
    if (!protocols) {
      protocols = [];
    } else if (!Array.isArray(protocols)) {
      protocols = [protocols];
    }

    // Step 5 - check protocols argument
    var sortedProtocols = protocols.sort();
    sortedProtocols.forEach(function(proto, i) {
      if (!proto) {
        throw new SyntaxError(
          "The protocols entry '" + proto + "' is invalid."
        );
      }
      if (i < sortedProtocols.length - 1 && proto === sortedProtocols[i + 1]) {
        throw new SyntaxError(
          "The protocols entry '" + proto + "' is duplicated."
        );
      }
    });

    // Step 6 - convert origin
    var o = url.getOrigin(location_1.href);
    this._origin = o ? o.toLowerCase() : null;

    // remove the trailing slash
    parsedUrl.set("pathname", parsedUrl.pathname.replace(/\/+$/, ""));

    // store the sanitized url
    this.url = parsedUrl.href;
    debug$j("using url", this.url);

    // Step 7 - start connection in background
    // obtain server info
    // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
    this._urlInfo = {
      nullOrigin: !browser$1.hasDomain(),
      sameOrigin: url.isOriginEqual(this.url, location_1.href),
      sameScheme: url.isSchemeEqual(this.url, location_1.href)
    };

    this._ir = new infoReceiver(this.url, this._urlInfo);
    this._ir.once("finish", this._receiveInfo.bind(this));
  }

  inherits_browser(SockJS, eventtarget);

  function userSetCode(code) {
    return code === 1000 || (code >= 3000 && code <= 4999);
  }

  SockJS.prototype.close = function(code, reason) {
    // Step 1
    if (code && !userSetCode(code)) {
      throw new Error("InvalidAccessError: Invalid code");
    }
    // Step 2.4 states the max is 123 bytes, but we are just checking length
    if (reason && reason.length > 123) {
      throw new SyntaxError("reason argument has an invalid length");
    }

    // Step 3.1
    if (
      this.readyState === SockJS.CLOSING ||
      this.readyState === SockJS.CLOSED
    ) {
      return;
    }

    // TODO look at docs to determine how to set this
    var wasClean = true;
    this._close(code || 1000, reason || "Normal closure", wasClean);
  };

  SockJS.prototype.send = function(data) {
    // #13 - convert anything non-string to string
    // TODO this currently turns objects into [object Object]
    if (typeof data !== "string") {
      data = "" + data;
    }
    if (this.readyState === SockJS.CONNECTING) {
      throw new Error(
        "InvalidStateError: The connection has not been established yet"
      );
    }
    if (this.readyState !== SockJS.OPEN) {
      return;
    }
    this._transport.send(_escape.quote(data));
  };

  SockJS.version = version;

  SockJS.CONNECTING = 0;
  SockJS.OPEN = 1;
  SockJS.CLOSING = 2;
  SockJS.CLOSED = 3;

  SockJS.prototype._receiveInfo = function(info, rtt) {
    debug$j("_receiveInfo", rtt);
    this._ir = null;
    if (!info) {
      this._close(1002, "Cannot connect to server");
      return;
    }

    // establish a round-trip timeout (RTO) based on the
    // round-trip time (RTT)
    this._rto = this.countRTO(rtt);
    // allow server to override url used for the actual transport
    this._transUrl = info.base_url ? info.base_url : this.url;
    info = object.extend(info, this._urlInfo);
    debug$j("info", info);
    // determine list of desired and supported transports
    var enabledTransports = transports.filterToEnabled(
      this._transportsWhitelist,
      info
    );
    this._transports = enabledTransports.main;
    debug$j(this._transports.length + " enabled transports");

    this._connect();
  };

  SockJS.prototype._connect = function() {
    for (
      var Transport = this._transports.shift();
      Transport;
      Transport = this._transports.shift()
    ) {
      debug$j("attempt", Transport.transportName);
      if (Transport.needBody) {
        if (
          !commonjsGlobal.document.body ||
          (typeof commonjsGlobal.document.readyState !== "undefined" &&
            commonjsGlobal.document.readyState !== "complete" &&
            commonjsGlobal.document.readyState !== "interactive")
        ) {
          debug$j("waiting for body");
          this._transports.unshift(Transport);
          event.attachEvent("load", this._connect.bind(this));
          return;
        }
      }

      // calculate timeout based on RTO and round trips. Default to 5s
      var timeoutMs = this._rto * Transport.roundTrips || 5000;
      this._transportTimeoutId = setTimeout(
        this._transportTimeout.bind(this),
        timeoutMs
      );
      debug$j("using timeout", timeoutMs);

      var transportUrl = url.addPath(
        this._transUrl,
        "/" + this._server + "/" + this._generateSessionId()
      );
      var options = this._transportOptions[Transport.transportName];
      debug$j("transport url", transportUrl);
      var transportObj = new Transport(transportUrl, this._transUrl, options);
      transportObj.on("message", this._transportMessage.bind(this));
      transportObj.once("close", this._transportClose.bind(this));
      transportObj.transportName = Transport.transportName;
      this._transport = transportObj;

      return;
    }
    this._close(2000, "All transports failed", false);
  };

  SockJS.prototype._transportTimeout = function() {
    debug$j("_transportTimeout");
    if (this.readyState === SockJS.CONNECTING) {
      if (this._transport) {
        this._transport.close();
      }

      this._transportClose(2007, "Transport timed out");
    }
  };

  SockJS.prototype._transportMessage = function(msg) {
    debug$j("_transportMessage", msg);
    var self = this,
      type = msg.slice(0, 1),
      content = msg.slice(1),
      payload;

    // first check for messages that don't need a payload
    switch (type) {
      case "o":
        this._open();
        return;
      case "h":
        this.dispatchEvent(new event$1("heartbeat"));
        debug$j("heartbeat", this.transport);
        return;
    }

    if (content) {
      try {
        payload = json3.parse(content);
      } catch (e) {
        debug$j("bad json", content);
      }
    }

    if (typeof payload === "undefined") {
      debug$j("empty payload", content);
      return;
    }

    switch (type) {
      case "a":
        if (Array.isArray(payload)) {
          payload.forEach(function(p) {
            debug$j("message", self.transport, p);
            self.dispatchEvent(new transMessage(p));
          });
        }
        break;
      case "m":
        debug$j("message", this.transport, payload);
        this.dispatchEvent(new transMessage(payload));
        break;
      case "c":
        if (Array.isArray(payload) && payload.length === 2) {
          this._close(payload[0], payload[1], true);
        }
        break;
    }
  };

  SockJS.prototype._transportClose = function(code, reason) {
    debug$j("_transportClose", this.transport, code, reason);
    if (this._transport) {
      this._transport.removeAllListeners();
      this._transport = null;
      this.transport = null;
    }

    if (
      !userSetCode(code) &&
      code !== 2000 &&
      this.readyState === SockJS.CONNECTING
    ) {
      this._connect();
      return;
    }

    this._close(code, reason);
  };

  SockJS.prototype._open = function() {
    debug$j("_open", this._transport.transportName, this.readyState);
    if (this.readyState === SockJS.CONNECTING) {
      if (this._transportTimeoutId) {
        clearTimeout(this._transportTimeoutId);
        this._transportTimeoutId = null;
      }
      this.readyState = SockJS.OPEN;
      this.transport = this._transport.transportName;
      this.dispatchEvent(new event$1("open"));
      debug$j("connected", this.transport);
    } else {
      // The server might have been restarted, and lost track of our
      // connection.
      this._close(1006, "Server lost session");
    }
  };

  SockJS.prototype._close = function(code, reason, wasClean) {
    debug$j("_close", this.transport, code, reason, wasClean, this.readyState);
    var forceFail = false;

    if (this._ir) {
      forceFail = true;
      this._ir.close();
      this._ir = null;
    }
    if (this._transport) {
      this._transport.close();
      this._transport = null;
      this.transport = null;
    }

    if (this.readyState === SockJS.CLOSED) {
      throw new Error("InvalidStateError: SockJS has already been closed");
    }

    this.readyState = SockJS.CLOSING;
    setTimeout(
      function() {
        this.readyState = SockJS.CLOSED;

        if (forceFail) {
          this.dispatchEvent(new event$1("error"));
        }

        var e = new close("close");
        e.wasClean = wasClean || false;
        e.code = code || 1000;
        e.reason = reason;

        this.dispatchEvent(e);
        this.onmessage = this.onclose = this.onerror = null;
        debug$j("disconnected");
      }.bind(this),
      0
    );
  };

  // See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
  // and RFC 2988.
  SockJS.prototype.countRTO = function(rtt) {
    // In a local environment, when using IE8/9 and the `jsonp-polling`
    // transport the time needed to establish a connection (the time that pass
    // from the opening of the transport to the call of `_dispatchOpen`) is
    // around 200msec (the lower bound used in the article above) and this
    // causes spurious timeouts. For this reason we calculate a value slightly
    // larger than that used in the article.
    if (rtt > 100) {
      return 4 * rtt; // rto > 400msec
    }
    return 300 + rtt; // 300msec < rto <= 400msec
  };

  var main = function(availableTransports) {
    transports = transport(availableTransports);
    iframeBootstrap(SockJS, availableTransports);
    return SockJS;
  };

  var entry = main(transportList);

  // TODO can't get rid of this until all servers do
  if ("_sockjs_onload" in commonjsGlobal) {
    setTimeout(commonjsGlobal._sockjs_onload, 1);
  }

  var createSocket = function(store) {
    var query = buildQueryString({
      license_id: store.getState().license,
      bh: generateRandomId()
    });
    var emitter = mitt$1();
    var backoff = new backo2({
      min: 1000,
      max: 5000,
      jitter: 0.5
    });
    var opened = false;
    var connected = false;
    var reconnectTimer = null;
    var socket = null;

    var ping = function ping() {
      socket.send('{"action": "ping"}');
    };

    var schedulePing = debounce(30 * 1000, function() {
      if (!opened) {
        return;
      }

      if (connected) {
        ping();
      }

      schedulePing();
    });

    var openHandler = function openHandler() {
      connected = true;
      backoff.reset();
      emitter.emit("connect");
      schedulePing();
    };

    var closeHandler = function closeHandler() {
      connected = false;
      socket = null;
      emitter.emit("disconnect"); // eslint-disable-next-line no-use-before-define

      _reconnect();
    };

    var messageHandler = function messageHandler(_ref) {
      var data = _ref.data;
      var message = JSON.parse(data);

      if (message.action === "ping") {
        return;
      }

      emitter.emit("message", message);
    };

    var heartbeatListener = function heartbeatListener() {
      ping();
      schedulePing();
    };

    var addEventListeners = function addEventListeners(instance) {
      instance.addEventListener("open", openHandler);
      instance.addEventListener("close", closeHandler);
      instance.addEventListener("message", messageHandler);
      instance.addEventListener("heartbeat", heartbeatListener);
    };

    var removeEventListeners = function removeEventListeners(instance) {
      instance.removeEventListener("open", openHandler);
      instance.removeEventListener("close", closeHandler);
      instance.removeEventListener("message", messageHandler);
      instance.removeEventListener("heartbeat", heartbeatListener);
    };

    var close = function close() {
      removeEventListeners(socket);
      connected = false;
      socket.close();
      socket = null;
    };

    var _connect = function connect() {
      opened = true;
      socket = new entry(
        store.getState().serverUrl + "/rtm/sjs?" + query,
        undefined,
        {
          transports: ["websocket", "xhr-polling"]
        }
      );

      {
        window.sockJS = socket;
      }

      addEventListeners(socket);
    };

    var _reconnect = function reconnect(delay) {
      if (delay === void 0) {
        delay = backoff.duration();
      }

      clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(_connect, delay);
    };

    var customerSocket = {
      connect: function connect() {
        if (opened) {
          throw new Error("Socket is already connected or opening.");
        }

        _connect();
      },
      destroy: function destroy() {
        customerSocket.off();
        customerSocket.disconnect();
      },
      disconnect: function disconnect() {
        opened = false;
        clearTimeout(reconnectTimer);

        if (socket === null) {
          return;
        }

        close();
      },
      reconnect: function reconnect(delay) {
        if (!opened) {
          throw new Error("Socket is not opened.");
        }

        if (socket !== null) {
          close();
        }

        _reconnect(delay);
      },
      emit: function emit(frame) {
        if (!connected) {
          throw new Error("Socket is not connected.");
        }

        socket.send(JSON.stringify(frame));
        schedulePing();
      },
      on: emitter.on,
      off: emitter.off
    };

    if (typeof window !== "undefined") {
      window.customerSocket = customerSocket;
    }

    return customerSocket;
  };

  var _METHODS_WITH_DIRECT_, _REQUEST_TO_REQUIRED_;

  var handleResponseError = function handleResponseError(_ref, response) {
    var dispatch = _ref.dispatch,
      getState = _ref.getState;
    var requestId = response.request_id,
      payload = response.payload;

    var _getRequest = getRequest(getState(), requestId),
      reject$$1 = _getRequest.reject,
      action = _getRequest.action;

    dispatch({
      type: REQUEST_FAILED,
      payload: {
        id: requestId,
        reject: reject$$1,
        error: parseServerError(action, payload.error)
      }
    });
  };

  var handleResponse$1 = function handleResponse(_ref2, response) {
    var dispatch = _ref2.dispatch,
      getState = _ref2.getState;
    var requestId = response.request_id,
      payload = response.payload;

    var _getRequest2 = getRequest(getState(), requestId),
      promise = _getRequest2.promise,
      resolve = _getRequest2.resolve,
      action = _getRequest2.action,
      data = _getRequest2.data;

    dispatch({
      type: RESPONSE_RECEIVED,
      payload: {
        id: requestId,
        action: action,
        data: data,
        promise: promise,
        resolve: resolve,
        response: parseResponse(action, payload)
      }
    });
  };

  var handlePush$1 = function handlePush(store, push) {
    store.dispatch({
      type: PUSH_RECEIVED,
      payload: {
        action: push.action,
        push: parsePush(push)
      }
    });
  };

  var handlePushResponse = function handlePushResponse(store, push) {
    // TODO: check if this still happens
    // filter out extraneous pushes, atm there is only a single situation that need to be handled here:
    // - login is also generating `customer_page_updated` push
    if (getRequest(store.getState(), push.request_id) === undefined) {
      {
        // eslint-disable-next-line no-console
        console.error(
          "handlePushResponse got push with no corresponding request stored in the store. Push: " +
            JSON.stringify(push)
        );
      }

      return;
    }

    handleResponse$1(store, push);
  };

  var METHODS_WITH_DIRECT_RESPONSE =
    ((_METHODS_WITH_DIRECT_ = {}),
    (_METHODS_WITH_DIRECT_[CHECK_GOALS$1] = true),
    (_METHODS_WITH_DIRECT_[GET_CHAT_THREADS_SUMMARY] = true),
    (_METHODS_WITH_DIRECT_[GET_CHAT_THREADS] = true),
    (_METHODS_WITH_DIRECT_[GET_CHATS_SUMMARY] = true),
    (_METHODS_WITH_DIRECT_[GET_FORM] = true),
    (_METHODS_WITH_DIRECT_[GET_GROUPS_STATUS] = true),
    (_METHODS_WITH_DIRECT_[GET_PREDICTED_AGENT] = true),
    (_METHODS_WITH_DIRECT_[GET_URL_DETAILS] = true),
    (_METHODS_WITH_DIRECT_[LOGIN] = true),
    (_METHODS_WITH_DIRECT_[SEND_RICH_MESSAGE_POSTBACK] = true),
    (_METHODS_WITH_DIRECT_[SEND_SNEAK_PEEK] = true),
    _METHODS_WITH_DIRECT_);
  var REQUEST_TO_REQUIRED_PUSH_MAP =
    ((_REQUEST_TO_REQUIRED_ = {}),
    (_REQUEST_TO_REQUIRED_[CLOSE_THREAD] = THREAD_CLOSED),
    _REQUEST_TO_REQUIRED_);

  {
    var keysA = Object.keys(METHODS_WITH_DIRECT_RESPONSE);
    var keysB = Object.keys(REQUEST_TO_REQUIRED_PUSH_MAP);

    if (keysA.length + keysB.length !== uniq([].concat(keysA, keysB)).length) {
      throw new Error(
        "METHODS_WITH_DIRECT_RESPONSE & REQUEST_TO_REQUIRED_PUSH_MAP keys can't overlap."
      );
    }
  }

  var socketListener = function(store, socket) {
    var dispatch = store.dispatch,
      getState = store.getState;

    var messageHandler = function messageHandler(message) {
      if (message.type === "response") {
        if (!message.success) {
          handleResponseError(store, message);
          return;
        }

        if (METHODS_WITH_DIRECT_RESPONSE[message.action]) {
          handleResponse$1(store, message);
        }

        return;
      }

      if (typeof message.request_id === "string") {
        var request = getRequest(getState(), message.request_id); // there is a single known situation like this (that there is no request at this moment)
        // it's customer_page_updated push (aka push response) triggered by login request

        if (request) {
          var requiredPushAction = REQUEST_TO_REQUIRED_PUSH_MAP[request.action];

          if (!requiredPushAction || requiredPushAction === message.action) {
            handlePushResponse(store, message);
            return;
          }
        }
      }

      handlePush$1(store, message);
    };

    var connectHandler = function connectHandler() {
      dispatch({
        type: SOCKET_CONNECTED
      });
    };

    var disconnectHandler = function disconnectHandler() {
      var requests = getAllRequests(getState());
      dispatch({
        type: SOCKET_DISCONNECTED,
        payload: {
          previousStatus: getConnectionStatus(getState()),
          rejects: Object.keys(requests).map(function(requestId) {
            return requests[requestId].reject;
          })
        }
      });
    };

    socket.on("connect", connectHandler);
    socket.on("message", messageHandler);
    socket.on("disconnect", disconnectHandler);
    return function() {
      socket.off();
    };
  };

  var toFormData = function toFormData(object) {
    var formData = new FormData();
    Object.keys(object).forEach(function(key) {
      return formData.append(key, object[key]);
    });
    return formData;
  }; // TODO: refactor to use this more explicit version instead of some weirdo extended promise
  // const cancellablePromise = fn => {
  // 	let reject
  // 	return {
  // 		promise: new Promise((resolve, _reject) => {
  // 			reject = _reject
  // 			fn().then(resolve, reject)
  // 		}),
  // 		cancel: reason => {
  // 			reject(reason)
  // 		},
  // 	}
  // }

  var uploadFile = function(url, data, spec) {
    if (spec === void 0) {
      spec = {};
    }

    var xhr = new XMLHttpRequest();
    var upload = new Promise(function(resolve, reject) {
      var _spec = spec,
        headers = _spec.headers,
        _spec$method = _spec.method,
        method = _spec$method === void 0 ? "POST" : _spec$method,
        onProgress = _spec.onProgress,
        _spec$withCredentials = _spec.withCredentials,
        withCredentials =
          _spec$withCredentials === void 0 ? false : _spec$withCredentials;

      if (typeof onProgress === "function") {
        xhr.upload.onprogress = function(event) {
          onProgress(event.loaded / event.total);
        };
      }

      xhr.onload = function() {
        var response;

        try {
          response = JSON.parse(xhr.response);
        } catch (err) {
          response = xhr.response;
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(response);
          return;
        }

        reject(new Error(response));
      };

      xhr.onerror = function(err) {
        reject(err);
      };

      xhr.onabort = function() {
        reject(new Error("Upload cancelled."));
      };

      xhr.open(method, url);
      xhr.withCredentials = withCredentials;

      if (headers) {
        Object.keys(headers).forEach(function(header) {
          return xhr.setRequestHeader(header, headers[header]);
        });
      }

      xhr.send(toFormData(data));
    });
    return {
      then: function then(onResolve, onReject) {
        return upload.then(onResolve, onReject);
      },
      catch: function _catch(onReject) {
        return upload.catch(onReject);
      },
      cancel: function cancel() {
        xhr.abort();
      }
    };
  };

  var KILOBYTE = 1024;
  var MEGABYTE = 1024 * KILOBYTE;
  var GIGABYTE = 1024 * MEGABYTE;
  var SIZE_LIMIT = 10 * MEGABYTE;

  var formatBytes = function formatBytes(bytes, precision) {
    if (precision === void 0) {
      precision = 2;
    }

    if (bytes < KILOBYTE) {
      return bytes + " b";
    }

    var kilobytes = bytes / 1024;

    if (bytes < MEGABYTE) {
      return kilobytes.toFixed(precision) + " kb";
    }

    var megabytes = kilobytes / 1024;

    if (bytes < GIGABYTE) {
      return megabytes.toFixed(precision) + " MB";
    }

    var gigabytes = megabytes / 1024;
    return gigabytes.toFixed(precision) + " GB";
  };

  var validateFile = function(file) {
    if (file.size > SIZE_LIMIT) {
      var err = new Error(
        "The file is too big (max size is " + formatBytes(SIZE_LIMIT) + ")."
      );
      err.code = "TOO_BIG_FILE";
      throw err;
    }
  };

  var _sendFile = function(_ref) {
    var auth = _ref.auth,
      chat = _ref.chat,
      data = _ref.data,
      spec = _ref.spec,
      store = _ref.store;
    var upload;
    var cancelled = false;
    var send = new Promise(function(resolve, reject) {
      validateFile(data.file);

      var _store$getState = store.getState(),
        license = _store$getState.license,
        serverUrl = _store$getState.serverUrl;

      var query = buildQueryString({
        license_id: license
      });
      var url = serverUrl + "/action/" + SEND_FILE + "?" + query;
      var payload = parseFileData(chat, data);
      auth.getToken().then(function(token) {
        if (cancelled) {
          reject(new Error("Upload cancelled."));
          return;
        }

        upload = uploadFile(
          url,
          payload,
          _extends({}, spec, {
            headers: {
              Authorization: token.tokenType + " " + token.accessToken
            }
          })
        );
        upload.then(function(response) {
          return resolve(response.payload);
        }, reject);
      });
    });
    return {
      then: function then(onResolve, onReject) {
        return send.then(onResolve, onReject);
      },
      catch: function _catch(onReject) {
        return send.catch(onReject);
      },
      cancel: function cancel() {
        if (cancelled) {
          return;
        }

        cancelled = true;

        if (upload) {
          upload.cancel();
        }
      }
    };
  };

  var LISTENER_IDENTITY = "LISTENER_IDENTITY";
  var listenersMap = {};

  var createDebuggedMethods = function createDebuggedMethods(methods, prefix) {
    if (prefix === void 0) {
      prefix = "";
    }

    var methodNames = Object.keys(methods);
    return methodNames
      .map(function(methodName) {
        var method = methods[methodName];
        return function() {
          var _console;

          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key];
          }

          (_console = console).info.apply(
            _console,
            [prefix + "." + methodName + "() ===>"].concat(args)
          );

          var result = method.apply(void 0, args);

          if (result && typeof result.then === "function") {
            result
              .then(function(data) {
                console.info(prefix + "." + methodName + "() <===", data);
              })
              .catch(function(err) {
                console.error(prefix + "." + methodName + "() <===", err);
              });
          }

          return result;
        };
      })
      .reduce(function(acc, method, index) {
        acc[methodNames[index]] = method;
        return acc;
      }, {});
  };

  var createEnhancedListener = function createEnhancedListener(
    label,
    event,
    listener
  ) {
    if (listener[LISTENER_IDENTITY] === undefined) {
      Object.defineProperty(listener, LISTENER_IDENTITY, {
        value: {}
      });
    }

    if (listener[LISTENER_IDENTITY][event]) {
      var enhancedListenerId = listener[LISTENER_IDENTITY][event];
      return listenersMap[enhancedListenerId];
    }

    var enhancedListener = function enhancedListener(data) {
      console.info("." + label + '("' + event + '") <===', data);
      listener(data);
    };

    var uniqueId = generateUniqueId(listenersMap);
    listener[LISTENER_IDENTITY][event] = uniqueId;
    listenersMap[uniqueId] = enhancedListener;
    return enhancedListener;
  };

  var debug$k = function(sdk) {
    var _on = sdk.on,
      _once = sdk.once,
      _off = sdk.off,
      _getChatHistory = sdk.getChatHistory,
      auth = sdk.auth,
      rest = _objectWithoutPropertiesLoose(sdk, [
        "on",
        "once",
        "off",
        "getChatHistory",
        "auth"
      ]);

    var methods = createDebuggedMethods(rest);
    return Object.freeze(
      _extends(
        {
          auth: Object.freeze(createDebuggedMethods(auth, ".auth"))
        },
        methods,
        {
          getChatHistory: function getChatHistory() {
            for (
              var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
              _key2 < _len2;
              _key2++
            ) {
              args[_key2] = arguments[_key2];
            }

            console.info(".getChatHistory(" + String(args) + ")");

            var history = _getChatHistory.apply(void 0, args);

            var logLabel = "history.next()";
            return {
              next: function next() {
                var _console2;

                (_console2 = console).info.apply(
                  _console2,
                  [logLabel + " ===>"].concat(args)
                );

                var result = history.next();
                result
                  .then(function(data) {
                    var _console3;

                    (_console3 = console).info.apply(
                      _console3,
                      [logLabel + " <==="].concat(args, [data])
                    );
                  })
                  .catch(function(err) {
                    var _console4;

                    (_console4 = console).error.apply(
                      _console4,
                      [logLabel + " <==="].concat(args, [err])
                    );
                  });
                return result;
              }
            };
          },
          off: function off(event, listener) {
            console.info(
              '.off("' + event + '", ' + (listener.name || "anonymous") + ")"
            );
            var enhancedListener = listener;

            if (listener[LISTENER_IDENTITY] !== undefined) {
              var enhancedListenerId = listener[LISTENER_IDENTITY][event];
              enhancedListener = listenersMap[enhancedListenerId];
            }

            _off(event, enhancedListener);
          },
          on: function on(event, listener) {
            _on(event, createEnhancedListener("on", event, listener));
          },
          once: function once$$1(event, listener) {
            _once(event, createEnhancedListener("once", event, listener));
          }
        }
      )
    );
  };

  var CHATS_PAGINATION_MAX_LIMIT = 25;
  var THREADS_PAGINATION_MAX_LIMIT = 1000;
  var init = function init(config, env) {
    var _Object$freeze;

    if (env === void 0) {
      env = "production";
    }

    validateConfig(config);

    var _config$autoConnect = config.autoConnect,
      autoConnect = _config$autoConnect === void 0 ? true : _config$autoConnect,
      instanceConfig = _objectWithoutPropertiesLoose(config, ["autoConnect"]);

    var store = finalCreateStore(
      _extends({}, instanceConfig, {
        env: env
      })
    );
    var emitter = mitt$1();
    var socket = createSocket(store);
    var auth = createAuth(instanceConfig, env);
    store.addSideEffectsHandler(
      createSideEffectsHandler({
        emitter: emitter,
        socket: socket,
        auth: auth
      })
    );
    socketListener(store, socket);

    var sendRequestAction$$1 = sendRequestAction.bind(null, store);

    var startConnection = function startConnection() {
      store.dispatch({
        type: START_CONNECTION
      });
    };

    var api = Object.freeze(
      ((_Object$freeze = {
        activateChat: function activateChat(chat, data) {
          if (data === void 0) {
            data = {};
          }

          return sendRequestAction$$1(
            sendRequest(ACTIVATE_CHAT, parseActiveChatData(chat, data))
          );
        },
        auth: auth,
        cancelRate: function cancelRate(chat, properties) {
          if (properties === void 0) {
            properties = ["score"];
          }

          return api.getChatThreadsSummary(chat).then(function(_ref) {
            var threadsSummary = _ref.threadsSummary;
            return api.deleteChatThreadProperties(
              chat,
              last(threadsSummary).id,
              {
                rating: properties
              }
            );
          });
        },
        closeThread: function closeThread(chat) {
          return sendRequestAction$$1(
            sendRequest(CLOSE_THREAD, {
              chat_id: chat
            })
          );
        },
        connect: startConnection,
        deleteChatProperties: function deleteChatProperties(chat, properties) {
          return sendRequestAction$$1(
            sendRequest(DELETE_CHAT_PROPERTIES, {
              chat_id: chat,
              properties: properties
            })
          );
        },
        deleteChatThreadProperties: function deleteChatThreadProperties(
          chat,
          thread,
          properties
        ) {
          return sendRequestAction$$1(
            sendRequest(DELETE_CHAT_THREAD_PROPERTIES, {
              chat_id: chat,
              thread_id: thread,
              properties: properties
            })
          );
        },
        deleteEventProperties: function deleteEventProperties(
          chat,
          thread,
          event,
          properties
        ) {
          return sendRequestAction$$1(
            sendRequest(DELETE_CHAT_THREAD_PROPERTIES, {
              chat_id: chat,
              thread_id: thread,
              event_id: event,
              properties: properties
            })
          );
        },
        destroy: function destroy() {
          store.dispatch({
            type: DESTROY,
            payload: {
              reason: "manual"
            }
          });
        },
        disconnect: function disconnect() {
          store.dispatch({
            type: STOP_CONNECTION
          });
        },
        getChatHistory: function getChatHistory(chat) {
          return chatHistory(store, api, chat);
        },
        getChatsSummary: function getChatsSummary(pagination) {
          if (pagination === void 0) {
            pagination = {};
          }

          var _pagination = pagination,
            _pagination$offset = _pagination.offset,
            offset = _pagination$offset === void 0 ? 0 : _pagination$offset,
            _pagination$limit = _pagination.limit,
            limit = _pagination$limit === void 0 ? 10 : _pagination$limit;

          if (limit > CHATS_PAGINATION_MAX_LIMIT) {
            return Promise.reject(
              new Error(
                "Specified limit is too high (max " +
                  CHATS_PAGINATION_MAX_LIMIT +
                  ")."
              )
            );
          }

          return sendRequestAction$$1(
            sendRequest(GET_CHATS_SUMMARY, {
              offset: offset,
              limit: limit
            })
          );
        },
        getChatThreads: function getChatThreads(chat, threads) {
          return sendRequestAction$$1(
            sendRequest(GET_CHAT_THREADS, {
              chat_id: chat,
              thread_ids: threads
            })
          );
        },
        getChatThreadsSummary: function getChatThreadsSummary(
          chat,
          pagination
        ) {
          if (pagination === void 0) {
            pagination = {};
          }

          var _pagination2 = pagination,
            _pagination2$offset = _pagination2.offset,
            offset = _pagination2$offset === void 0 ? 0 : _pagination2$offset,
            _pagination2$limit = _pagination2.limit,
            limit = _pagination2$limit === void 0 ? 25 : _pagination2$limit;

          if (limit > THREADS_PAGINATION_MAX_LIMIT) {
            return Promise.reject(
              new Error(
                "Specified limit is too high (max " +
                  THREADS_PAGINATION_MAX_LIMIT +
                  ")."
              )
            );
          }

          return sendRequestAction$$1(
            sendRequest(GET_CHAT_THREADS_SUMMARY, {
              chat_id: chat,
              offset: offset,
              limit: limit
            })
          );
        },
        getForm: function getForm(group, type) {
          return sendRequestAction$$1(
            sendRequest(GET_FORM, {
              group_id: group,
              type: type
            })
          );
        },
        getGroupsStatus: function getGroupsStatus(groups) {
          return sendRequestAction$$1(
            sendRequest(
              GET_GROUPS_STATUS, // wait for script propagation, then ask API to use `group_ids` instead of `groups` and remove `groups` from here after that
              groups
                ? {
                    groups: groups,
                    group_ids: groups
                  }
                : {
                    all: true
                  }
            )
          );
        },
        getPredictedAgent: function getPredictedAgent() {
          return sendRequestAction$$1(sendRequest(GET_PREDICTED_AGENT));
        },
        getUrlDetails: function getUrlDetails(url) {
          return sendRequestAction$$1(
            sendRequest(GET_URL_DETAILS, {
              url: url
            })
          );
        },
        on: emitter.on,
        once: emitter.once,
        off: emitter.off,
        rateChat: function rateChat(chat, rating) {
          return api.getChatThreadsSummary(chat).then(function(_ref2) {
            var threadsSummary = _ref2.threadsSummary;
            return api.updateChatThreadProperties(
              chat,
              last(threadsSummary).id,
              {
                rating: rating
              }
            );
          });
        },
        sendEvent: function sendEvent$$1(chat, event, meta) {
          return sendRequestAction$$1(sendEvent(chat, event, meta));
        },
        sendFile: function sendFile(chat, data, spec) {
          return _sendFile({
            auth: auth,
            chat: chat,
            data: data,
            spec: spec,
            store: store
          });
        },
        sendPostback: function sendPostback(chat, thread, event, _ref3) {
          var id = _ref3.id,
            _ref3$toggled = _ref3.toggled,
            toggled = _ref3$toggled === void 0 ? true : _ref3$toggled;
          return sendRequestAction$$1(
            sendRequest(SEND_RICH_MESSAGE_POSTBACK, {
              chat_id: chat,
              event_id: event,
              thread_id: thread,
              postback: {
                id: id,
                toggled: toggled
              }
            })
          );
        },
        setCustomerFields: function setCustomerFields(fields) {
          store.dispatch({
            type: SET_CUSTOMER_FIELDS,
            payload: {
              fields: fields
            }
          });
        },
        setSneakPeek: function setSneakPeek(chat, text) {
          var state = store.getState();

          if (!isChatActive(state, chat) || !isConnected(state)) {
            return;
          }

          sendRequestAction$$1(
            sendRequest(SEND_SNEAK_PEEK, {
              chat_id: chat,
              sneak_peek_text: text
            })
          ).catch(noop);
        },
        startChat: function startChat(data) {
          if (data === void 0) {
            data = {};
          }

          return sendRequestAction$$1(
            sendRequest(START_CHAT, parseStartChatData(data))
          );
        },
        updateChatProperties: function updateChatProperties(chat, properties) {
          return sendRequestAction$$1(
            sendRequest(UPDATE_CHAT_PROPERTIES, {
              chat_id: chat,
              properties: properties
            })
          );
        },
        updateChatThreadProperties: function updateChatThreadProperties(
          chat,
          thread,
          properties
        ) {
          return sendRequestAction$$1(
            sendRequest(UPDATE_CHAT_THREAD_PROPERTIES, {
              chat_id: chat,
              thread_id: thread,
              properties: properties
            })
          );
        },
        updateCustomer: function updateCustomer(properties) {
          store.dispatch({
            type: UPDATE_CUSTOMER,
            payload: properties
          });
        },
        updateCustomerPage: function updateCustomerPage(page) {
          store.dispatch({
            type: UPDATE_CUSTOMER_PAGE,
            payload: pickOwn(["title", "url"], page)
          });
        },
        updateEventProperties: function updateEventProperties(
          chat,
          thread,
          event,
          properties
        ) {
          return sendRequestAction$$1(
            sendRequest(UPDATE_EVENT_PROPERTIES, {
              chat_id: chat,
              event_id: event,
              thread_id: thread,
              properties: properties
            })
          );
        },
        updateLastSeenTimestamp: function updateLastSeenTimestamp(
          chat,
          timestamp
        ) {
          return sendRequestAction$$1(
            sendRequest(
              UPDATE_LAST_SEEN_TIMESTAMP,
              parseUpdateLastSeenTimestampData({
                chat: chat,
                timestamp: timestamp
              })
            )
          );
        }
      }),
      (_Object$freeze[result] = once(function() {
        return Object.freeze({
          subscribe: function subscribe(observer) {
            if (!isObject(observer)) {
              throw new TypeError("Expected the observer to be an object.");
            }

            var subscriber = function subscriber(type, event) {
              if (typeof observer.next !== "function") {
                return;
              }

              observer.next([type, event]);
            };

            emitter.on("*", subscriber);
            return function() {
              emitter.off("*", subscriber);
            };
          }
        });
      })),
      _Object$freeze)
    );

    if (autoConnect) {
      startConnection();
    } else {
      store.dispatch({
        type: CHECK_GOALS
      });
    }

    return api;
  };

  exports.init = init;
  exports.debug = debug$k;

  Object.defineProperty(exports, "__esModule", { value: true });
});
