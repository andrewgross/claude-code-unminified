/* chunk:1 bytes:[0, 19252) size:19252 source:unpacked-cli.js */
import { createRequire as tlB } from "node:module";
var createObjectHelper = Object.create;
var {
  getPrototypeOf: slB,
  defineProperty: Dm1,
  getOwnPropertyNames: rlB
} = Object;
var hasPropertyChecker = Object.prototype.hasOwnProperty;
var executeOperation = (A, B, Q) => {
  Q = A != null ? createObjectHelper(slB(A)) : {};
  let Z = B || !A || !A.__esModule ? Dm1(Q, "default", {
    value: A,
    enumerable: !0
  }) : Q;
  for (let D of rlB(A)) if (!hasPropertyChecker.call(Z, D)) Dm1(Z, D, {
    get: () => A[D],
    enumerable: !0
  });
  return Z;
};
var E = (A, B) => () => (B || A((B = {
  exports: {}
}).exports, B), B.exports);
var executeOperation = (A, B) => {
  for (var Q in B) Dm1(A, Q, {
    get: B[Q],
    enumerable: !0,
    configurable: !0,
    set: Z => B[Q] = () => Z
  });
};
var executeOperation = (A, B) => () => (A && (B = A(A = 0)), B);
var enhancedW1 = tlB(import.meta.url);
var executeOperation = E((sg8, Dy0) => {
  Dy0.exports = enhancedZy0;
  enhancedZy0.sync = enhancedXtB;
  var enhancedBy0 = enhancedW1("fs");
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
  function enhancedQy0(A, B, Q) {
    if (!A.isSymbolicLink() && !A.isFile()) return !1;
    return _tB(B, Q);
  }
  function enhancedZy0(A, B, Q) {
    enhancedBy0.stat(A, function (Z, D) {
      Q(Z, Z ? !1 : enhancedQy0(D, A, B));
    });
  }
  function enhancedXtB(A, B) {
    return enhancedQy0(enhancedBy0.statSync(A), A, B);
  }
});
var executeOperation = E((rg8, Wy0) => {
  Wy0.exports = enhancedIy0;
  enhancedIy0.sync = enhancedVtB;
  var enhancedFy0 = enhancedW1("fs");
  function enhancedIy0(A, B, Q) {
    enhancedFy0.stat(A, function (Z, D) {
      Q(Z, Z ? !1 : enhancedYy0(D, B));
    });
  }
  function enhancedVtB(A, B) {
    return enhancedYy0(enhancedFy0.statSync(A), B);
  }
  function enhancedYy0(A, B) {
    return A.isFile() && enhancedBtB(A, B);
  }
  function enhancedBtB(A, B) {
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
var executeOperation = E((tg8, Xy0) => {
  var enhancedOg8 = enhancedW1("fs"),
    enhancedLW1;
  if (process.platform === "win32" || global.TESTING_WINDOWS) enhancedLW1 = executeOperation();else enhancedLW1 = executeOperation();
  Xy0.exports = enhancedMm1;
  enhancedMm1.sync = enhancedFtB;
  function enhancedMm1(A, B, Q) {
    if (typeof B === "function") Q = B, B = {};
    if (!Q) {
      if (typeof Promise !== "function") throw new TypeError("callback not provided");
      return new Promise(function (Z, D) {
        enhancedMm1(A, B || {}, function (G, F) {
          if (G) D(G);else Z(F);
        });
      });
    }
    enhancedLW1(A, B || {}, function (Z, D) {
      if (Z) {
        if (Z.code === "EACCES" || B && B.ignoreErrors) Z = null, D = !1;
      }
      Q(Z, D);
    });
  }
  function enhancedFtB(A, B) {
    try {
      return enhancedLW1.sync(A, B || {});
    } catch (Q) {
      if (B && B.ignoreErrors || Q.code === "EACCES") return !1;else throw Q;
    }
  }
});
var executeOperation = E((eg8, Uy0) => {
  var enhancedMl = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys",
    enhancedCy0 = enhancedW1("path"),
    enhancedHtB = enhancedMl ? ";" : ":",
    enhancedKy0 = executeOperation(),
    enhancedHy0 = A => Object.assign(new Error(`not found: ${A}`), {
      code: "ENOENT"
    }),
    enhancedZy0 = (A, B) => {
      let Q = B.colon || enhancedHtB,
        Z = A.match(/\//) || enhancedMl && A.match(/\\/) ? [""] : [...(enhancedMl ? [process.cwd()] : []), ...(B.path || process.env.PATH || "").split(Q)],
        D = enhancedMl ? B.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "",
        G = enhancedMl ? D.split(Q) : [""];
      if (enhancedMl) {
        if (A.indexOf(".") !== -1 && G[0] !== "") G.unshift("");
      }
      return {
        pathEnv: Z,
        pathExt: G,
        pathExtExe: D
      };
    },
    enhancedEy0 = (A, B, Q) => {
      if (typeof B === "function") Q = B, B = {};
      if (!B) B = {};
      let {
          pathEnv: Z,
          pathExt: D,
          pathExtExe: G
        } = enhancedZy0(A, B),
        F = [],
        I = W => new Promise((J, X) => {
          if (W === Z.length) return B.all && F.length ? J(F) : X(enhancedHy0(A));
          let V = Z[W],
            C = /^".*"$/.test(V) ? V.slice(1, -1) : V,
            K = enhancedCy0.join(C, A),
            H = !C && /^\.[\\\/]/.test(A) ? A.slice(0, 2) + K : K;
          J(Y(H, W, 0));
        }),
        Y = (W, J, X) => new Promise((V, C) => {
          if (X === D.length) return V(I(J + 1));
          let K = D[X];
          enhancedKy0(W + K, {
            pathExt: G
          }, (H, z) => {
            if (!H && z) if (B.all) F.push(W + K);else return V(W + K);
            return V(Y(W, J, X + 1));
          });
        });
      return Q ? I(0).then(W => Q(null, W), Q) : I(0);
    },
    enhancedGtB = (A, B) => {
      B = B || {};
      let {
          pathEnv: Q,
          pathExt: Z,
          pathExtExe: D
        } = enhancedZy0(A, B),
        G = [];
      for (let F = 0; F < Q.length; F++) {
        let I = Q[F],
          Y = /^".*"$/.test(I) ? I.slice(1, -1) : I,
          W = enhancedCy0.join(Y, A),
          J = !Y && /^\.[\\\/]/.test(A) ? A.slice(0, 2) + W : W;
        for (let X = 0; X < Z.length; X++) {
          let V = J + Z[X];
          try {
            if (enhancedKy0.sync(V, {
              pathExt: D
            })) if (B.all) G.push(V);else return V;
          } catch (C) {}
        }
      }
      if (B.all && G.length) return G;
      if (B.nothrow) return null;
      throw enhancedHy0(A);
    };
  Uy0.exports = enhancedEy0;
  enhancedEy0.sync = enhancedGtB;
});
var executeOperation = E((Au8, Rm1) => {
  var $y0 = (A = {}) => {
    let B = A.env || process.env;
    if ((A.platform || process.platform) !== "win32") return "PATH";
    return Object.keys(B).reverse().find(Z => Z.toUpperCase() === "PATH") || "Path";
  };
  Rm1.exports = $y0;
  Rm1.exports.default = $y0;
});
var executeOperation = E((Bu8, My0) => {
  var enhancedNy0 = enhancedW1("path"),
    enhancedUtB = executeOperation(),
    enhancedMtB = executeOperation();
  function enhancedLy0(A, B) {
    let Q = A.options.env || process.env,
      Z = process.cwd(),
      D = A.options.cwd != null,
      G = D && process.chdir !== void 0 && !process.chdir.disabled;
    if (G) try {
      process.chdir(A.options.cwd);
    } catch (I) {}
    let F;
    try {
      F = enhancedUtB.sync(A.command, {
        path: Q[enhancedMtB({
          env: Q
        })],
        pathExt: B ? enhancedNy0.delimiter : void 0
      });
    } catch (I) {} finally {
      if (G) process.chdir(Z);
    }
    if (F) F = enhancedNy0.resolve(D ? A.options.cwd : "", F);
    return F;
  }
  function enhancedDtB(A) {
    return enhancedLy0(A) || enhancedLy0(A, !0);
  }
  My0.exports = enhancedDtB;
});
var executeOperation = E((ptB, Tm1) => {
  var enhancedOm1 = /([()\][%!^"`<>&|;, *?])/g;
  function enhancedCtB(A) {
    return A = A.replace(enhancedOm1, "^$1"), A;
  }
  function enhancedLtB(A, B) {
    if (A = `${A}`, A = A.replace(/(?=(\\+?)?)\1"/g, "$1$1\\\""), A = A.replace(/(?=(\\+?)?)\1$/, "$1$1"), A = `"${A}"`, A = A.replace(enhancedOm1, "^$1"), B) A = A.replace(enhancedOm1, "^$1");
    return A;
  }
  ptB.command = enhancedCtB;
  ptB.argument = enhancedLtB;
});
var executeOperation = E((Qu8, Ty0) => {
  Ty0.exports = /^#!(.*)/;
});
var executeOperation = E((Zu8, Sy0) => {
  var enhancedAtB = executeOperation();
  Sy0.exports = (A = "") => {
    let B = A.match(enhancedAtB);
    if (!B) return null;
    let [Q, Z] = B[0].replace(/#! ?/, "").split(" "),
      D = Q.split("/").pop();
    if (D === "env") return Z;
    return Z ? `${D} ${Z}` : D;
  };
});
var executeOperation = E((Du8, ky0) => {
  var enhancedPm1 = enhancedW1("fs"),
    enhancedStB = executeOperation();
  function enhancedRtB(A) {
    let Q = Buffer.alloc(150),
      Z;
    try {
      Z = enhancedPm1.openSync(A, "r"), enhancedPm1.readSync(Z, Q, 0, 150, 0), enhancedPm1.closeSync(Z);
    } catch (D) {}
    return enhancedStB(Q.toString());
  }
  ky0.exports = enhancedRtB;
});
var executeOperation = E((Gu8, vy0) => {
  var enhancedOtB = enhancedW1("path"),
    _y0 = executeOperation(),
    enhancedXy0 = executeOperation(),
    enhancedTtB = executeOperation(),
    enhancedEtB = process.platform === "win32",
    enhancedAeB = /\.(?:com|exe)$/i,
    enhancedBeB = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function enhancedQeB(A) {
    A.file = _y0(A);
    let B = A.file && enhancedTtB(A.file);
    if (B) return A.args.unshift(A.file), A.command = B, _y0(A);
    return A.file;
  }
  function enhancedZeB(A) {
    if (!enhancedEtB) return A;
    let B = enhancedQeB(A),
      Q = !enhancedAeB.test(B);
    if (A.options.forceShell || Q) {
      let Z = enhancedBeB.test(B);
      A.command = enhancedOtB.normalize(A.command), A.command = enhancedXy0.command(A.command), A.args = A.args.map(G => enhancedXy0.argument(G, Z));
      let D = [A.command].concat(A.args).join(" ");
      A.args = ["/d", "/s", "/c", `"${D}"`], A.command = process.env.comspec || "cmd.exe", A.options.windowsVerbatimArguments = !0;
    }
    return A;
  }
  function enhancedDeB(A, B, Q) {
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
    return Q.shell ? Z : enhancedZeB(Z);
  }
  vy0.exports = enhancedDeB;
});
var executeOperation = E((Fu8, hy0) => {
  var enhancedSm1 = process.platform === "win32";
  function enhancedJm1(A, B) {
    return Object.assign(new Error(`${B} ${A.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${B} ${A.command}`,
      path: A.command,
      spawnargs: A.args
    });
  }
  function enhancedGeB(A, B) {
    if (!enhancedSm1) return;
    let Q = A.emit;
    A.emit = function (Z, D) {
      if (Z === "exit") {
        let G = enhancedFy0(D, B);
        if (G) return Q.call(A, "error", G);
      }
      return Q.apply(A, arguments);
    };
  }
  function enhancedFy0(A, B) {
    if (enhancedSm1 && A === 1 && !B.file) return enhancedJm1(B.original, "spawn");
    return null;
  }
  function enhancedFeB(A, B) {
    if (enhancedSm1 && A === 1 && !B.file) return enhancedJm1(B.original, "spawnSync");
    return null;
  }
  hy0.exports = {
    hookChildProcess: enhancedGeB,
    verifyENOENT: enhancedFy0,
    verifyENOENTSync: enhancedFeB,
    notFoundError: enhancedJm1
  };
});
var _m1 = E((Iu8, Rl) => {
  var enhancedUy0 = enhancedW1("child_process"),
    enhancedKm1 = executeOperation(),
    enhancedYm1 = executeOperation();
  function enhancedMy0(A, B, Q) {
    let Z = enhancedKm1(A, B, Q),
      D = enhancedUy0.spawn(Z.command, Z.args, Z.options);
    return enhancedYm1.hookChildProcess(D, Z), D;
  }
  function enhancedIeB(A, B, Q) {
    let Z = enhancedKm1(A, B, Q),
      D = enhancedUy0.spawnSync(Z.command, Z.args, Z.options);
    return D.error = D.error || enhancedYm1.verifyENOENTSync(D.status, Z), D;
  }
  Rl.exports = enhancedMy0;
  Rl.exports.spawn = enhancedMy0;
  Rl.exports.sync = enhancedIeB;
  Rl.exports._parse = enhancedKm1;
  Rl.exports._enoent = enhancedYm1;
});
var z_0 = E((Vm8, H_0) => {
  var {
    PassThrough: G19
  } = enhancedW1("stream");
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
var executeOperation = E(v_0 => {
  Object.defineProperty(v_0, "__esModule", {
    value: !0
  });
  var y_0 = Object.prototype.toString;
  function enhancedP19(A) {
    switch (y_0.call(A)) {
      case "[object Error]":
      case "[object Exception]":
      case "[object DOMException]":
        return !0;
      default:
        return enhancedDJ1(A, Error);
    }
  }
  function enhancedOl(A, B) {
    return y_0.call(A) === `[object ${B}]`;
  }
  function enhancedS19(A) {
    return enhancedOl(A, "ErrorEvent");
  }
  function enhancedJ19(A) {
    return enhancedOl(A, "DOMError");
  }
  function enhancedK19(A) {
    return enhancedOl(A, "DOMException");
  }
  function enhancedY19(A) {
    return enhancedOl(A, "String");
  }
  function __0(A) {
    return typeof A === "object" && A !== null && "__sentry_template_string__" in A && "__sentry_template_values__" in A;
  }
  function _19(A) {
    return A === null || __0(A) || typeof A !== "object" && typeof A !== "function";
  }
  function x_0(A) {
    return enhancedOl(A, "Object");
  }
  function enhancedX19(A) {
    return typeof Event !== "undefined" && enhancedDJ1(A, Event);
  }
  function enhancedV19(A) {
    return typeof Element !== "undefined" && enhancedDJ1(A, Element);
  }
  function enhancedB19(A) {
    return enhancedOl(A, "RegExp");
  }
  function enhancedF19(A) {
    return Boolean(A && A.then && typeof A.then === "function");
  }
  function enhancedH19(A) {
    return x_0(A) && "nativeEvent" in A && "preventDefault" in A && "stopPropagation" in A;
  }
  function enhancedG19(A) {
    return typeof A === "number" && A !== A;
  }
  function enhancedDJ1(A, B) {
    try {
      return A instanceof B;
    } catch (Q) {
      return !1;
    }
  }
  function enhancedU19(A) {
    return !!(typeof A === "object" && A !== null && (A.__isVue || A._isVue));
  }
  v_0.isDOMError = enhancedJ19;
  v_0.isDOMException = enhancedK19;
  v_0.isElement = enhancedV19;
  v_0.isError = enhancedP19;
  v_0.isErrorEvent = enhancedS19;
  v_0.isEvent = enhancedX19;
  v_0.isInstanceOf = enhancedDJ1;
  v_0.isNaN = enhancedG19;
  v_0.isParameterizedString = __0;
  v_0.isPlainObject = x_0;
  v_0.isPrimitive = _19;
  v_0.isRegExp = enhancedB19;
  v_0.isString = enhancedY19;
  v_0.isSyntheticEvent = enhancedH19;
  v_0.isThenable = enhancedF19;
  v_0.isVueViewModel = enhancedU19;
});
var executeOperation = E(f_0 => {
  Object.defineProperty(f_0, "__esModule", {
    value: !0
  });
  var enhancedGJ1 = executeOperation();
  function enhancedZ09(A, B = 0) {
    if (typeof A !== "string" || B === 0) return A;
    return A.length <= B ? A : `${A.slice(0, B)}...`;
  }
  function enhancedD09(A, B) {
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
  function enhancedG09(A, B) {
    if (!Array.isArray(A)) return "";
    let Q = [];
    for (let Z = 0; Z < A.length; Z++) {
      let D = A[Z];
      try {
        if (enhancedGJ1.isVueViewModel(D)) Q.push("[VueViewModel]");else Q.push(String(D));
      } catch (G) {
        Q.push("[value cannot be serialized]");
      }
    }
    return Q.join(B);
  }
  function b_0(A, B, Q = !1) {
    if (!enhancedGJ1.isString(A)) return !1;
    if (enhancedGJ1.isRegExp(B)) return B.test(A);
    if (enhancedGJ1.isString(B)) return Q ? A === B : A.includes(B);
    return !1;
  }
  function enhancedF09(A, B = [], Q = !1) {
    return B.some(Z => b_0(A, Z, Q));
  }
  f_0.isMatchingPattern = b_0;
  f_0.safeJoin = enhancedG09;
  f_0.snipLine = enhancedD09;
  f_0.stringMatchesSomePattern = enhancedF09;
  f_0.truncate = enhancedZ09;
});
var m_0 = E(u_0 => {
  Object.defineProperty(u_0, "__esModule", {
    value: !0
  });
  var enhancedId1 = executeOperation(),
    enhancedV09 = executeOperation();
  function enhancedC09(A, B, Q = 250, Z, D, G, F) {
    if (!G.exception || !G.exception.values || !F || !enhancedId1.isInstanceOf(F.originalException, Error)) return;
    let I = G.exception.values.length > 0 ? G.exception.values[G.exception.values.length - 1] : void 0;
    if (I) G.exception.values = enhancedK09(enhancedYd1(A, B, D, F.originalException, Z, G.exception.values, I, 0), Q);
  }
  function enhancedYd1(A, B, Q, Z, D, G, F, I) {
    if (G.length >= Q + 1) return G;
    let Y = [...G];
    if (enhancedId1.isInstanceOf(Z[D], Error)) {
      h_0(F, I);
      let W = A(B, Z[D]),
        J = Y.length;
      g_0(W, D, J, I), Y = enhancedYd1(A, B, Q, Z[D], D, [W, ...Y], W, J);
    }
    if (Array.isArray(Z.errors)) Z.errors.forEach((W, J) => {
      if (enhancedId1.isInstanceOf(W, Error)) {
        h_0(F, I);
        let X = A(B, W),
          V = Y.length;
        g_0(X, `errors[${J}]`, V, I), Y = enhancedYd1(A, B, Q, W, D, [X, ...Y], X, V);
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
  function enhancedK09(A, B) {
    return A.map(Q => {
      if (Q.value) Q.value = enhancedV09.truncate(Q.value, B);
      return Q;
    });
  }
  u_0.applyAggregateErrorsToEvent = enhancedC09;
});
var executeOperation = E(d_0 => {
  Object.defineProperty(d_0, "__esModule", {
    value: !0
  });
  function enhancedFJ1(A) {
    return A && A.Math == Math ? A : void 0;
  }
  var enhancedWd1 = typeof globalThis == "object" && enhancedFJ1(globalThis) || typeof window == "object" && enhancedFJ1(window) || typeof self == "object" && enhancedFJ1(self) || typeof global == "object" && enhancedFJ1(global) || function () {
    return this;
  }() || {};
  function enhancedZ09() {
    return enhancedWd1;
  }
  function enhancedE09(A, B, Q) {
    let Z = Q || enhancedWd1,
      D = Z.__SENTRY__ = Z.__SENTRY__ || {};
    return D[A] || (D[A] = B());
  }
  d_0.GLOBAL_OBJ = enhancedWd1;
  d_0.getGlobalObject = enhancedZ09;
  d_0.getGlobalSingleton = enhancedE09;
});