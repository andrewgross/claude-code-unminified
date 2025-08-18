/* chunk:1 bytes:[0, 19252) size:19252 source:unpacked-cli.js */
import { createRequire as tlB } from "node:module";
var config_alB = Object.create;
var {
  getPrototypeOf: slB,
  defineProperty: Dm1,
  getOwnPropertyNames: rlB
} = Object;
var config_olB = Object.prototype.hasOwnProperty;
var handler_G1 = (A, B, Q) => {
  Q = A != null ? config_alB(slB(A)) : {};
  let Z = B || !A || !A.__esModule ? Dm1(Q, "default", {
    value: A,
    enumerable: !0
  }) : Q;
  for (let D of rlB(A)) if (!config_olB.call(Z, D)) Dm1(Z, D, {
    get: () => A[D],
    enumerable: !0
  });
  return Z;
};
var E = (A, B) => () => (B || A((B = {
  exports: {}
}).exports, B), B.exports);
var handler_bj = (A, B) => {
  for (var Q in B) Dm1(A, Q, {
    get: B[Q],
    enumerable: !0,
    configurable: !0,
    set: Z => B[Q] = () => Z
  });
};
var handler_K21 = (A, B) => () => (A && (B = A(A = 0)), B);
var imported_W1 = tlB(import.meta.url);
var handler_Gy0 = E((param_sg8, param_Dy0) => {
  param_Dy0.exports = processZy0;
  processZy0.sync = processXtB;
  var variable_By0 = imported_W1("fs");
  function _tB(A, B) {
    var Q = B.pathExt !== void 0 ? B.pathExt : process.env.PATHEXT;
    if (!Q) return !0;
    if (Q = Q.split(";"), Q.indexOf("") !== -1) return !0;
    for (var Z = 0; Z < Q.length; Z++) {
      var D = Q[Z].toLowerCase();
      if (D && A.substr(-D.length).toLowerCase() === D) return !0;
    }
    return !1;
  }
  function processQy0(A, B, Q) {
    if (!A.isSymbolicLink() && !A.isFile()) return !1;
    return _tB(B, Q);
  }
  function processZy0(A, B, Q) {
    variable_By0.stat(A, function (Z, D) {
      Q(Z, Z ? !1 : processQy0(D, A, B));
    });
  }
  function processXtB(A, B) {
    return processQy0(variable_By0.statSync(A), A, B);
  }
});
var handler_Jy0 = E((param_rg8, param_Wy0) => {
  param_Wy0.exports = function_Iy0;
  function_Iy0.sync = function_vtB;
  var variable_Fy0 = imported_W1("fs");
  function function_Iy0(A, B, Q) {
    variable_Fy0.stat(A, function (Z, D) {
      Q(Z, Z ? !1 : function_Yy0(D, B));
    });
  }
  function function_vtB(A, B) {
    return function_Yy0(variable_Fy0.statSync(A), B);
  }
  function function_Yy0(A, B) {
    return A.isFile() && function_btB(A, B);
  }
  function function_btB(A, B) {
    var {
        mode: Q,
        uid: Z,
        gid: D
      } = A,
      G = B.uid !== void 0 ? B.uid : process.getuid && process.getuid(),
      F = B.gid !== void 0 ? B.gid : process.getgid && process.getgid(),
      I = parseInt("100", 8),
      Y = parseInt("010", 8),
      W = parseInt("001", 8),
      J = I | Y,
      X = Q & W || Q & Y && D === F || Q & I && Z === G || Q & J && G === 0;
    return X;
  }
});
var handler_Vy0 = E((param_tg8, param_Xy0) => {
  var variable_og8 = imported_W1("fs"),
    variable_lW1;
  if (process.platform === "win32" || global.TESTING_WINDOWS) variable_lW1 = handler_Gy0();else variable_lW1 = handler_Jy0();
  param_Xy0.exports = processMm1;
  processMm1.sync = processFtB;
  function processMm1(A, B, Q) {
    if (typeof B === "function") Q = B, B = {};
    if (!Q) {
      if (typeof Promise !== "function") throw new TypeError("callback not provided");
      return new Promise(function (Z, D) {
        processMm1(A, B || {}, function (G, F) {
          if (G) D(G);else Z(F);
        });
      });
    }
    variable_lW1(A, B || {}, function (Z, D) {
      if (Z) {
        if (Z.code === "EACCES" || B && B.ignoreErrors) Z = null, D = !1;
      }
      Q(Z, D);
    });
  }
  function processFtB(A, B) {
    try {
      return variable_lW1.sync(A, B || {});
    } catch (Q) {
      if (B && B.ignoreErrors || Q.code === "EACCES") return !1;else throw Q;
    }
  }
});
var handler_wy0 = E((param_eg8, param_Uy0) => {
  var handler_Ml = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys",
    handler_Cy0 = imported_W1("path"),
    handler_htB = handler_Ml ? ";" : ":",
    handler_Ky0 = handler_Vy0(),
    handler_Hy0 = A => Object.assign(new Error(`not found: ${A}`), {
      code: "ENOENT"
    }),
    handler_zy0 = (A, B) => {
      let Q = B.colon || handler_htB,
        Z = A.match(/\//) || handler_Ml && A.match(/\\/) ? [""] : [...(handler_Ml ? [process.cwd()] : []), ...(B.path || process.env.PATH || "").split(Q)],
        D = handler_Ml ? B.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "",
        G = handler_Ml ? D.split(Q) : [""];
      if (handler_Ml) {
        if (A.indexOf(".") !== -1 && G[0] !== "") G.unshift("");
      }
      return {
        pathEnv: Z,
        pathExt: G,
        pathExtExe: D
      };
    },
    handler_Ey0 = (A, B, Q) => {
      if (typeof B === "function") Q = B, B = {};
      if (!B) B = {};
      let {
          pathEnv: Z,
          pathExt: D,
          pathExtExe: G
        } = handler_zy0(A, B),
        F = [],
        I = W => new Promise((J, X) => {
          if (W === Z.length) return B.all && F.length ? J(F) : X(handler_Hy0(A));
          let V = Z[W],
            C = /^".*"$/.test(V) ? V.slice(1, -1) : V,
            K = handler_Cy0.join(C, A),
            H = !C && /^\.[\\\/]/.test(A) ? A.slice(0, 2) + K : K;
          J(Y(H, W, 0));
        }),
        Y = (W, J, X) => new Promise((V, C) => {
          if (X === D.length) return V(I(J + 1));
          let K = D[X];
          handler_Ky0(W + K, {
            pathExt: G
          }, (H, z) => {
            if (!H && z) if (B.all) F.push(W + K);else return V(W + K);
            return V(Y(W, J, X + 1));
          });
        });
      return Q ? I(0).then(W => Q(null, W), Q) : I(0);
    },
    handler_gtB = (A, B) => {
      B = B || {};
      let {
          pathEnv: Q,
          pathExt: Z,
          pathExtExe: D
        } = handler_zy0(A, B),
        G = [];
      for (let F = 0; F < Q.length; F++) {
        let I = Q[F],
          Y = /^".*"$/.test(I) ? I.slice(1, -1) : I,
          W = handler_Cy0.join(Y, A),
          J = !Y && /^\.[\\\/]/.test(A) ? A.slice(0, 2) + W : W;
        for (let X = 0; X < Z.length; X++) {
          let V = J + Z[X];
          try {
            if (handler_Ky0.sync(V, {
              pathExt: D
            })) if (B.all) G.push(V);else return V;
          } catch (C) {}
        }
      }
      if (B.all && G.length) return G;
      if (B.nothrow) return null;
      throw handler_Hy0(A);
    };
  param_Uy0.exports = handler_Ey0;
  handler_Ey0.sync = handler_gtB;
});
var handler_qy0 = E((param_Au8, param_Rm1) => {
  var $y0 = (A = {}) => {
    let B = A.env || process.env;
    if ((A.platform || process.platform) !== "win32") return "PATH";
    return Object.keys(B).reverse().find(Z => Z.toUpperCase() === "PATH") || "Path";
  };
  param_Rm1.exports = $y0;
  param_Rm1.exports.default = $y0;
});
var handler_Ry0 = E((param_Bu8, param_My0) => {
  var variable_Ny0 = imported_W1("path"),
    variable_utB = handler_wy0(),
    variable_mtB = handler_qy0();
  function processLy0(A, B) {
    let Q = A.options.env || process.env,
      Z = process.cwd(),
      D = A.options.cwd != null,
      G = D && process.chdir !== void 0 && !process.chdir.disabled;
    if (G) try {
      process.chdir(A.options.cwd);
    } catch (I) {}
    let F;
    try {
      F = variable_utB.sync(A.command, {
        path: Q[variable_mtB({
          env: Q
        })],
        pathExt: B ? variable_Ny0.delimiter : void 0
      });
    } catch (I) {} finally {
      if (G) process.chdir(Z);
    }
    if (F) F = variable_Ny0.resolve(D ? A.options.cwd : "", F);
    return F;
  }
  function processDtB(A) {
    return processLy0(A) || processLy0(A, !0);
  }
  param_My0.exports = processDtB;
});
var handler_Oy0 = E((param_ptB, param_Tm1) => {
  var variable_Om1 = /([()\][%!^"`<>&|;, *?])/g;
  function function_ctB(A) {
    return A = A.replace(variable_Om1, "^$1"), A;
  }
  function function_ltB(A, B) {
    if (A = `${A}`, A = A.replace(/(?=(\\+?)?)\1"/g, "$1$1\\\""), A = A.replace(/(?=(\\+?)?)\1$/, "$1$1"), A = `"${A}"`, A = A.replace(variable_Om1, "^$1"), B) A = A.replace(variable_Om1, "^$1");
    return A;
  }
  param_ptB.command = function_ctB;
  param_ptB.argument = function_ltB;
});
var handler_Py0 = E((param_Qu8, param_Ty0) => {
  param_Ty0.exports = /^#!(.*)/;
});
var handler_jy0 = E((param_Zu8, param_Sy0) => {
  var variable_atB = handler_Py0();
  param_Sy0.exports = (A = "") => {
    let B = A.match(variable_atB);
    if (!B) return null;
    let [Q, Z] = B[0].replace(/#! ?/, "").split(" "),
      D = Q.split("/").pop();
    if (D === "env") return Z;
    return Z ? `${D} ${Z}` : D;
  };
});
var handler_yy0 = E((param_Du8, param_ky0) => {
  var variable_Pm1 = imported_W1("fs"),
    variable_stB = handler_jy0();
  function function_rtB(A) {
    let Q = Buffer.alloc(150),
      Z;
    try {
      Z = variable_Pm1.openSync(A, "r"), variable_Pm1.readSync(Z, Q, 0, 150, 0), variable_Pm1.closeSync(Z);
    } catch (D) {}
    return variable_stB(Q.toString());
  }
  param_ky0.exports = function_rtB;
});
var handler_by0 = E((param_Gu8, param_vy0) => {
  var variable_otB = imported_W1("path"),
    _y0 = handler_Ry0(),
    variable_xy0 = handler_Oy0(),
    variable_ttB = handler_yy0(),
    variable_etB = process.platform === "win32",
    variable_AeB = /\.(?:com|exe)$/i,
    variable_BeB = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function processQeB(A) {
    A.file = _y0(A);
    let B = A.file && variable_ttB(A.file);
    if (B) return A.args.unshift(A.file), A.command = B, _y0(A);
    return A.file;
  }
  function processZeB(A) {
    if (!variable_etB) return A;
    let B = processQeB(A),
      Q = !variable_AeB.test(B);
    if (A.options.forceShell || Q) {
      let Z = variable_BeB.test(B);
      A.command = variable_otB.normalize(A.command), A.command = variable_xy0.command(A.command), A.args = A.args.map(G => variable_xy0.argument(G, Z));
      let D = [A.command].concat(A.args).join(" ");
      A.args = ["/d", "/s", "/c", `"${D}"`], A.command = process.env.comspec || "cmd.exe", A.options.windowsVerbatimArguments = !0;
    }
    return A;
  }
  function processDeB(A, B, Q) {
    if (B && !Array.isArray(B)) Q = B, B = null;
    B = B ? B.slice(0) : [], Q = Object.assign({}, Q);
    let Z = {
      command: A,
      args: B,
      options: Q,
      file: void 0,
      original: {
        command: A,
        args: B
      }
    };
    return Q.shell ? Z : processZeB(Z);
  }
  param_vy0.exports = processDeB;
});
var handler_gy0 = E((param_Fu8, param_hy0) => {
  var variable_Sm1 = process.platform === "win32";
  function processJm1(A, B) {
    return Object.assign(new Error(`${B} ${A.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${B} ${A.command}`,
      path: A.command,
      spawnargs: A.args
    });
  }
  function processGeB(A, B) {
    if (!variable_Sm1) return;
    let Q = A.emit;
    A.emit = function (Z, D) {
      if (Z === "exit") {
        let G = processFy0(D, B);
        if (G) return Q.call(A, "error", G);
      }
      return Q.apply(A, arguments);
    };
  }
  function processFy0(A, B) {
    if (variable_Sm1 && A === 1 && !B.file) return processJm1(B.original, "spawn");
    return null;
  }
  function processFeB(A, B) {
    if (variable_Sm1 && A === 1 && !B.file) return processJm1(B.original, "spawnSync");
    return null;
  }
  param_hy0.exports = {
    hookChildProcess: processGeB,
    verifyENOENT: processFy0,
    verifyENOENTSync: processFeB,
    notFoundError: processJm1
  };
});
var _m1 = E((param_Iu8, param_Rl) => {
  var variable_uy0 = imported_W1("child_process"),
    variable_km1 = handler_by0(),
    variable_ym1 = handler_gy0();
  function processMy0(A, B, Q) {
    let Z = variable_km1(A, B, Q),
      D = variable_uy0.spawn(Z.command, Z.args, Z.options);
    return variable_ym1.hookChildProcess(D, Z), D;
  }
  function processIeB(A, B, Q) {
    let Z = variable_km1(A, B, Q),
      D = variable_uy0.spawnSync(Z.command, Z.args, Z.options);
    return D.error = D.error || variable_ym1.verifyENOENTSync(D.status, Z), D;
  }
  param_Rl.exports = processMy0;
  param_Rl.exports.spawn = processMy0;
  param_Rl.exports.sync = processIeB;
  param_Rl.exports._parse = variable_km1;
  param_Rl.exports._enoent = variable_ym1;
});
var z_0 = E((param_Vm8, H_0) => {
  var {
    PassThrough: G19
  } = imported_W1("stream");
  H_0.exports = function () {
    var A = [],
      B = new G19({
        objectMode: !0
      });
    return B.setMaxListeners(0), B.add = Q, B.isEmpty = Z, B.on("unpipe", D), Array.prototype.slice.call(arguments).forEach(Q), B;
    function Q(G) {
      if (Array.isArray(G)) return G.forEach(Q), this;
      return A.push(G), G.once("end", D.bind(null, G)), G.once("error", B.emit.bind(B, "error")), G.pipe(B, {
        end: !1
      }), this;
    }
    function Z() {
      return A.length == 0;
    }
    function D(G) {
      if (A = A.filter(function (F) {
        return F !== G;
      }), !A.length && B.readable) B.end();
    }
  };
});
var handler_iH = E(v_0 => {
  Object.defineProperty(v_0, "__esModule", {
    value: !0
  });
  var y_0 = Object.prototype.toString;
  function function_P19(A) {
    switch (y_0.call(A)) {
      case "[object Error]":
      case "[object Exception]":
      case "[object DOMException]":
        return !0;
      default:
        return function_DJ1(A, Error);
    }
  }
  function function_Ol(A, B) {
    return y_0.call(A) === `[object ${B}]`;
  }
  function function_S19(A) {
    return function_Ol(A, "ErrorEvent");
  }
  function function_j19(A) {
    return function_Ol(A, "DOMError");
  }
  function function_k19(A) {
    return function_Ol(A, "DOMException");
  }
  function function_y19(A) {
    return function_Ol(A, "String");
  }
  function __0(A) {
    return typeof A === "object" && A !== null && "__sentry_template_string__" in A && "__sentry_template_values__" in A;
  }
  function _19(A) {
    return A === null || __0(A) || typeof A !== "object" && typeof A !== "function";
  }
  function x_0(A) {
    return function_Ol(A, "Object");
  }
  function function_x19(A) {
    return typeof Event !== "undefined" && function_DJ1(A, Event);
  }
  function function_v19(A) {
    return typeof Element !== "undefined" && function_DJ1(A, Element);
  }
  function function_b19(A) {
    return function_Ol(A, "RegExp");
  }
  function function_f19(A) {
    return Boolean(A && A.then && typeof A.then === "function");
  }
  function function_h19(A) {
    return x_0(A) && "nativeEvent" in A && "preventDefault" in A && "stopPropagation" in A;
  }
  function function_g19(A) {
    return typeof A === "number" && A !== A;
  }
  function function_DJ1(A, B) {
    try {
      return A instanceof B;
    } catch (Q) {
      return !1;
    }
  }
  function function_u19(A) {
    return !!(typeof A === "object" && A !== null && (A.__isVue || A._isVue));
  }
  v_0.isDOMError = function_j19;
  v_0.isDOMException = function_k19;
  v_0.isElement = function_v19;
  v_0.isError = function_P19;
  v_0.isErrorEvent = function_S19;
  v_0.isEvent = function_x19;
  v_0.isInstanceOf = function_DJ1;
  v_0.isNaN = function_g19;
  v_0.isParameterizedString = __0;
  v_0.isPlainObject = x_0;
  v_0.isPrimitive = _19;
  v_0.isRegExp = function_b19;
  v_0.isString = function_y19;
  v_0.isSyntheticEvent = function_h19;
  v_0.isThenable = function_f19;
  v_0.isVueViewModel = function_u19;
});
var handler_k21 = E(f_0 => {
  Object.defineProperty(f_0, "__esModule", {
    value: !0
  });
  var variable_GJ1 = handler_iH();
  function function_Z09(A, B = 0) {
    if (typeof A !== "string" || B === 0) return A;
    return A.length <= B ? A : `${A.slice(0, B)}...`;
  }
  function function_D09(A, B) {
    let Q = A,
      Z = Q.length;
    if (Z <= 150) return Q;
    if (B > Z) B = Z;
    let D = Math.max(B - 60, 0);
    if (D < 5) D = 0;
    let G = Math.min(D + 140, Z);
    if (G > Z - 5) G = Z;
    if (G === Z) D = Math.max(G - 140, 0);
    if (Q = Q.slice(D, G), D > 0) Q = `'{snip} ${Q}`;
    if (G < Z) Q += " {snip}";
    return Q;
  }
  function function_G09(A, B) {
    if (!Array.isArray(A)) return "";
    let Q = [];
    for (let Z = 0; Z < A.length; Z++) {
      let D = A[Z];
      try {
        if (variable_GJ1.isVueViewModel(D)) Q.push("[VueViewModel]");else Q.push(String(D));
      } catch (G) {
        Q.push("[value cannot be serialized]");
      }
    }
    return Q.join(B);
  }
  function b_0(A, B, Q = !1) {
    if (!variable_GJ1.isString(A)) return !1;
    if (variable_GJ1.isRegExp(B)) return B.test(A);
    if (variable_GJ1.isString(B)) return Q ? A === B : A.includes(B);
    return !1;
  }
  function function_F09(A, B = [], Q = !1) {
    return B.some(Z => b_0(A, Z, Q));
  }
  f_0.isMatchingPattern = b_0;
  f_0.safeJoin = function_G09;
  f_0.snipLine = function_D09;
  f_0.stringMatchesSomePattern = function_F09;
  f_0.truncate = function_Z09;
});
var m_0 = E(u_0 => {
  Object.defineProperty(u_0, "__esModule", {
    value: !0
  });
  var variable_Id1 = handler_iH(),
    variable_V09 = handler_k21();
  function function_C09(A, B, Q = 250, Z, D, G, F) {
    if (!G.exception || !G.exception.values || !F || !variable_Id1.isInstanceOf(F.originalException, Error)) return;
    let I = G.exception.values.length > 0 ? G.exception.values[G.exception.values.length - 1] : void 0;
    if (I) G.exception.values = function_K09(function_Yd1(A, B, D, F.originalException, Z, G.exception.values, I, 0), Q);
  }
  function function_Yd1(A, B, Q, Z, D, G, F, I) {
    if (G.length >= Q + 1) return G;
    let Y = [...G];
    if (variable_Id1.isInstanceOf(Z[D], Error)) {
      h_0(F, I);
      let W = A(B, Z[D]),
        J = Y.length;
      g_0(W, D, J, I), Y = function_Yd1(A, B, Q, Z[D], D, [W, ...Y], W, J);
    }
    if (Array.isArray(Z.errors)) Z.errors.forEach((W, J) => {
      if (variable_Id1.isInstanceOf(W, Error)) {
        h_0(F, I);
        let X = A(B, W),
          V = Y.length;
        g_0(X, `errors[${J}]`, V, I), Y = function_Yd1(A, B, Q, W, D, [X, ...Y], X, V);
      }
    });
    return Y;
  }
  function h_0(A, B) {
    A.mechanism = A.mechanism || {
      type: "generic",
      handled: !0
    }, A.mechanism = {
      ...A.mechanism,
      ...(A.type === "AggregateError" && {
        is_exception_group: !0
      }),
      exception_id: B
    };
  }
  function g_0(A, B, Q, Z) {
    A.mechanism = A.mechanism || {
      type: "generic",
      handled: !0
    }, A.mechanism = {
      ...A.mechanism,
      type: "chained",
      source: B,
      exception_id: Q,
      parent_id: Z
    };
  }
  function function_K09(A, B) {
    return A.map(Q => {
      if (Q.value) Q.value = variable_V09.truncate(Q.value, B);
      return Q;
    });
  }
  u_0.applyAggregateErrorsToEvent = function_C09;
});
var handler_vW = E(d_0 => {
  Object.defineProperty(d_0, "__esModule", {
    value: !0
  });
  function function_FJ1(A) {
    return A && A.Math == Math ? A : void 0;
  }
  var handler_Wd1 = typeof globalThis == "object" && function_FJ1(globalThis) || typeof window == "object" && function_FJ1(window) || typeof self == "object" && function_FJ1(self) || typeof global == "object" && function_FJ1(global) || function () {
    return this;
  }() || {};
  function function_z09() {
    return handler_Wd1;
  }
  function function_E09(A, B, Q) {
    let Z = Q || handler_Wd1,
      D = Z.__SENTRY__ = Z.__SENTRY__ || {};
    return D[A] || (D[A] = B());
  }
  d_0.GLOBAL_OBJ = handler_Wd1;
  d_0.getGlobalObject = function_z09;
  d_0.getGlobalSingleton = function_E09;
});