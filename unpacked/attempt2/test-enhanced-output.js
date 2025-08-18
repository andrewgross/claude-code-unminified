/* chunk:1 bytes:[0, 19252) size:19252 source:unpacked-cli.js */
import { createRequire as tlB } from 'node:module';
var identifier = Object.create;
var {
  getPrototypeOf: slB,
  defineProperty: Dm1,
  getOwnPropertyNames: rlB,
} = Object;
var identifier = Object.prototype.hasOwnProperty;
var identifier = (A, B, Q) => {
  Q = A != null ? identifier(slB(A)) : {};
  let Z =
    B || !A || !A.__esModule
      ? Dm1(Q, 'default', {
          value: A,
          enumerable: !0,
        })
      : Q;
  for (let D of rlB(A))
    if (!identifier.call(Z, D))
      Dm1(Z, D, {
        get: () => A[D],
        enumerable: !0,
      });
  return Z;
};
var E = (A, B) => () => (
  B ||
    A(
      (B = {
        exports: {},
      }).exports,
      B
    ),
  B.exports
);
var identifier = (A, B) => {
  for (var Q in B)
    Dm1(A, Q, {
      get: B[Q],
      enumerable: !0,
      configurable: !0,
      set: (Z) => (B[Q] = () => Z),
    });
};
var identifier = (A, B) => () => (A && (B = A((A = 0))), B);
var identifier = tlB(import.meta.url);
var identifier = E((identifier, identifier) => {
  identifier.exports = filePath;
  filePath.sync = filePath;
  var filePath = identifier('fs');
  function _tB(A, B) {
    var Q = B.pathExt !== void 0 ? B.pathExt : process.env.PATHEXT;
    if (!Q) return !0;
    if (((Q = Q.split(';')), Q.indexOf('') !== -1)) return !0;
    for (var Z = 0; Z < Q.length; Z++) {
      var D = Q[Z].toLowerCase();
      if (D && A.substr(-D.length).toLowerCase() === D) return !0;
    }
    return !1;
  }
  function filePath(A, B, Q) {
    if (!A.isSymbolicLink() && !A.isFile()) return !1;
    return _tB(B, Q);
  }
  function filePath(A, B, Q) {
    filePath.stat(A, function (Z, D) {
      Q(Z, Z ? !1 : filePath(D, A, B));
    });
  }
  function filePath(A, B) {
    return filePath(filePath.statSync(A), A, B);
  }
});
var identifier = E((identifier, identifier) => {
  identifier.exports = filePath;
  filePath.sync = filePath;
  var filePath = identifier('fs');
  function filePath(A, B, Q) {
    filePath.stat(A, function (Z, D) {
      Q(Z, Z ? !1 : filePath(D, B));
    });
  }
  function filePath(A, B) {
    return filePath(filePath.statSync(A), B);
  }
  function filePath(A, B) {
    return A.isFile() && filePath(A, B);
  }
  function filePath(A, B) {
    var { mode: Q, uid: Z, gid: D } = A,
      G = B.uid !== void 0 ? B.uid : process.getuid && process.getuid(),
      F = B.gid !== void 0 ? B.gid : process.getgid && process.getgid(),
      I = parseInt('100', 8),
      Y = parseInt('010', 8),
      W = parseInt('001', 8),
      J = I | Y,
      X =
        Q & W || (Q & Y && D === F) || (Q & I && Z === G) || (Q & J && G === 0);
    return X;
  }
});
var identifier = E((identifier, identifier) => {
  var filePath = identifier('fs'),
    filePath;
  if (process.platform === 'win32' || global.TESTING_WINDOWS)
    filePath = identifier();
  else filePath = identifier();
  identifier.exports = filePath;
  filePath.sync = filePath;
  function filePath(A, B, Q) {
    if (typeof B === 'function') ((Q = B), (B = {}));
    if (!Q) {
      if (typeof Promise !== 'function')
        throw new TypeError('callback not provided');
      return new Promise(function (Z, D) {
        filePath(A, B || {}, function (G, F) {
          if (G) D(G);
          else Z(F);
        });
      });
    }
    filePath(A, B || {}, function (Z, D) {
      if (Z) {
        if (Z.code === 'EACCES' || (B && B.ignoreErrors))
          ((Z = null), (D = !1));
      }
      Q(Z, D);
    });
  }
  function filePath(A, B) {
    try {
      return filePath.sync(A, B || {});
    } catch (Q) {
      if ((B && B.ignoreErrors) || Q.code === 'EACCES') return !1;
      else throw Q;
    }
  }
});
var identifier = E((identifier, identifier) => {
  var errorInfo =
      process.platform === 'win32' ||
      process.env.OSTYPE === 'cygwin' ||
      process.env.OSTYPE === 'msys',
    errorInfo = identifier('path'),
    errorInfo = errorInfo ? ';' : ':',
    errorInfo = identifier(),
    errorInfo = (A) =>
      Object.assign(new Error(`not found: ${A}`), {
        code: 'ENOENT',
      }),
    errorInfo = (A, B) => {
      let Q = B.colon || errorInfo,
        Z =
          A.match(/\//) || (errorInfo && A.match(/\\/))
            ? ['']
            : [
                ...(errorInfo ? [process.cwd()] : []),
                ...(B.path || process.env.PATH || '').split(Q),
              ],
        D = errorInfo
          ? B.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'
          : '',
        G = errorInfo ? D.split(Q) : [''];
      if (errorInfo) {
        if (A.indexOf('.') !== -1 && G[0] !== '') G.unshift('');
      }
      return {
        pathEnv: Z,
        pathExt: G,
        pathExtExe: D,
      };
    },
    errorInfo = (A, B, Q) => {
      if (typeof B === 'function') ((Q = B), (B = {}));
      if (!B) B = {};
      let { pathEnv: Z, pathExt: D, pathExtExe: G } = errorInfo(A, B),
        F = [],
        I = (W) =>
          new Promise((J, X) => {
            if (W === Z.length)
              return B.all && F.length ? J(F) : X(errorInfo(A));
            let V = Z[W],
              C = /^".*"$/.test(V) ? V.slice(1, -1) : V,
              K = errorInfo.join(C, A),
              H = !C && /^\.[\\\/]/.test(A) ? A.slice(0, 2) + K : K;
            J(Y(H, W, 0));
          }),
        Y = (W, J, X) =>
          new Promise((V, C) => {
            if (X === D.length) return V(I(J + 1));
            let K = D[X];
            errorInfo(
              W + K,
              {
                pathExt: G,
              },
              (H, z) => {
                if (!H && z)
                  if (B.all) F.push(W + K);
                  else return V(W + K);
                return V(Y(W, J, X + 1));
              }
            );
          });
      return Q ? I(0).then((W) => Q(null, W), Q) : I(0);
    },
    errorInfo = (A, B) => {
      B = B || {};
      let { pathEnv: Q, pathExt: Z, pathExtExe: D } = errorInfo(A, B),
        G = [];
      for (let F = 0; F < Q.length; F++) {
        let I = Q[F],
          Y = /^".*"$/.test(I) ? I.slice(1, -1) : I,
          W = errorInfo.join(Y, A),
          J = !Y && /^\.[\\\/]/.test(A) ? A.slice(0, 2) + W : W;
        for (let X = 0; X < Z.length; X++) {
          let V = J + Z[X];
          try {
            if (
              errorInfo.sync(V, {
                pathExt: D,
              })
            )
              if (B.all) G.push(V);
              else return V;
          } catch (C) {}
        }
      }
      if (B.all && G.length) return G;
      if (B.nothrow) return null;
      throw errorInfo(A);
    };
  identifier.exports = errorInfo;
  errorInfo.sync = errorInfo;
});
var identifier = E((identifier, identifier) => {
  var $y0 = (A = {}) => {
    let B = A.env || process.env;
    if ((A.platform || process.platform) !== 'win32') return 'PATH';
    return (
      Object.keys(B)
        .reverse()
        .find((Z) => Z.toUpperCase() === 'PATH') || 'Path'
    );
  };
  identifier.exports = $y0;
  identifier.exports.default = $y0;
});
var identifier = E((identifier, identifier) => {
  var errorInfo = identifier('path'),
    errorInfo = identifier(),
    errorInfo = identifier();
  function errorInfo(A, B) {
    let Q = A.options.env || process.env,
      Z = process.cwd(),
      D = A.options.cwd != null,
      G = D && process.chdir !== void 0 && !process.chdir.disabled;
    if (G)
      try {
        process.chdir(A.options.cwd);
      } catch (I) {}
    let F;
    try {
      F = errorInfo.sync(A.command, {
        path: Q[
          errorInfo({
            env: Q,
          })
        ],
        pathExt: B ? errorInfo.delimiter : void 0,
      });
    } catch (I) {
    } finally {
      if (G) process.chdir(Z);
    }
    if (F) F = errorInfo.resolve(D ? A.options.cwd : '', F);
    return F;
  }
  function errorInfo(A) {
    return errorInfo(A) || errorInfo(A, !0);
  }
  identifier.exports = errorInfo;
});
var identifier = E((identifier, identifier) => {
  var identifier = /([()\][%!^"`<>&|;, *?])/g;
  function identifier(A) {
    return ((A = A.replace(identifier, '^$1')), A);
  }
  function identifier(A, B) {
    if (
      ((A = `${A}`),
      (A = A.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"')),
      (A = A.replace(/(?=(\\+?)?)\1$/, '$1$1')),
      (A = `"${A}"`),
      (A = A.replace(identifier, '^$1')),
      B)
    )
      A = A.replace(identifier, '^$1');
    return A;
  }
  identifier.command = identifier;
  identifier.argument = identifier;
});
var identifier = E((identifier, identifier) => {
  identifier.exports = /^#!(.*)/;
});
var identifier = E((identifier, identifier) => {
  var configValue = identifier();
  identifier.exports = (A = '') => {
    let B = A.match(configValue);
    if (!B) return null;
    let [Q, Z] = B[0].replace(/#! ?/, '').split(' '),
      D = Q.split('/').pop();
    if (D === 'env') return Z;
    return Z ? `${D} ${Z}` : D;
  };
});
var identifier = E((identifier, identifier) => {
  var filePath = identifier('fs'),
    filePath = identifier();
  function filePath(A) {
    let Q = Buffer.alloc(150),
      Z;
    try {
      ((Z = filePath.openSync(A, 'r')),
        filePath.readSync(Z, Q, 0, 150, 0),
        filePath.closeSync(Z));
    } catch (D) {}
    return filePath(Q.toString());
  }
  identifier.exports = filePath;
});
var identifier = E((identifier, identifier) => {
  var identifier = identifier('path'),
    _y0 = identifier(),
    identifier = identifier(),
    identifier = identifier(),
    identifier = process.platform === 'win32',
    identifier = /\.(?:com|exe)$/i,
    identifier = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function identifier(A) {
    A.file = _y0(A);
    let B = A.file && identifier(A.file);
    if (B) return (A.args.unshift(A.file), (A.command = B), _y0(A));
    return A.file;
  }
  function identifier(A) {
    if (!identifier) return A;
    let B = identifier(A),
      Q = !identifier.test(B);
    if (A.options.forceShell || Q) {
      let Z = identifier.test(B);
      ((A.command = identifier.normalize(A.command)),
        (A.command = identifier.command(A.command)),
        (A.args = A.args.map((G) => identifier.argument(G, Z))));
      let D = [A.command].concat(A.args).join(' ');
      ((A.args = ['/d', '/s', '/c', `"${D}"`]),
        (A.command = process.env.comspec || 'cmd.exe'),
        (A.options.windowsVerbatimArguments = !0));
    }
    return A;
  }
  function identifier(A, B, Q) {
    if (B && !Array.isArray(B)) ((Q = B), (B = null));
    ((B = B ? B.slice(0) : []), (Q = Object.assign({}, Q)));
    let Z = {
      command: A,
      args: B,
      options: Q,
      file: void 0,
      original: {
        command: A,
        args: B,
      },
    };
    return Q.shell ? Z : identifier(Z);
  }
  identifier.exports = identifier;
});
var identifier = E((identifier, identifier) => {
  var errorInfo = process.platform === 'win32';
  function errorInfo(A, B) {
    return Object.assign(new Error(`${B} ${A.command} ENOENT`), {
      code: 'ENOENT',
      errno: 'ENOENT',
      syscall: `${B} ${A.command}`,
      path: A.command,
      spawnargs: A.args,
    });
  }
  function errorInfo(A, B) {
    if (!errorInfo) return;
    let Q = A.emit;
    A.emit = function (Z, D) {
      if (Z === 'exit') {
        let G = errorInfo(D, B);
        if (G) return Q.call(A, 'error', G);
      }
      return Q.apply(A, arguments);
    };
  }
  function errorInfo(A, B) {
    if (errorInfo && A === 1 && !B.file) return errorInfo(B.original, 'spawn');
    return null;
  }
  function errorInfo(A, B) {
    if (errorInfo && A === 1 && !B.file)
      return errorInfo(B.original, 'spawnSync');
    return null;
  }
  identifier.exports = {
    hookChildProcess: errorInfo,
    verifyENOENT: errorInfo,
    verifyENOENTSync: errorInfo,
    notFoundError: errorInfo,
  };
});
var _m1 = E((identifier, identifier) => {
  var errorInfo = identifier('child_process'),
    errorInfo = identifier(),
    errorInfo = identifier();
  function errorInfo(A, B, Q) {
    let Z = errorInfo(A, B, Q),
      D = errorInfo.spawn(Z.command, Z.args, Z.options);
    return (errorInfo.hookChildProcess(D, Z), D);
  }
  function errorInfo(A, B, Q) {
    let Z = errorInfo(A, B, Q),
      D = errorInfo.spawnSync(Z.command, Z.args, Z.options);
    return ((D.error = D.error || errorInfo.verifyENOENTSync(D.status, Z)), D);
  }
  identifier.exports = errorInfo;
  identifier.exports.spawn = errorInfo;
  identifier.exports.sync = errorInfo;
  identifier.exports._parse = errorInfo;
  identifier.exports._enoent = errorInfo;
});
var z_0 = E((identifier, H_0) => {
  var { PassThrough: G19 } = identifier('stream');
  H_0.exports = function () {
    var A = [],
      B = new G19({
        objectMode: !0,
      });
    return (
      B.setMaxListeners(0),
      (B.add = Q),
      (B.isEmpty = Z),
      B.on('unpipe', D),
      Array.prototype.slice.call(arguments).forEach(Q),
      B
    );
    function Q(G) {
      if (Array.isArray(G)) return (G.forEach(Q), this);
      return (
        A.push(G),
        G.once('end', D.bind(null, G)),
        G.once('error', B.emit.bind(B, 'error')),
        G.pipe(B, {
          end: !1,
        }),
        this
      );
    }
    function Z() {
      return A.length == 0;
    }
    function D(G) {
      if (
        ((A = A.filter(function (F) {
          return F !== G;
        })),
        !A.length && B.readable)
      )
        B.end();
    }
  };
});
var identifier = E((v_0) => {
  Object.defineProperty(v_0, '__esModule', {
    value: !0,
  });
  var y_0 = Object.prototype.toString;
  function errorInfo(A) {
    switch (y_0.call(A)) {
      case '[object Error]':
      case '[object Exception]':
      case '[object DOMException]':
        return !0;
      default:
        return errorInfo(A, Error);
    }
  }
  function errorInfo(A, B) {
    return y_0.call(A) === `[object ${B}]`;
  }
  function errorInfo(A) {
    return errorInfo(A, 'ErrorEvent');
  }
  function errorInfo(A) {
    return errorInfo(A, 'DOMError');
  }
  function errorInfo(A) {
    return errorInfo(A, 'DOMException');
  }
  function errorInfo(A) {
    return errorInfo(A, 'String');
  }
  function __0(A) {
    return (
      typeof A === 'object' &&
      A !== null &&
      '__sentry_template_string__' in A &&
      '__sentry_template_values__' in A
    );
  }
  function _19(A) {
    return (
      A === null || __0(A) || (typeof A !== 'object' && typeof A !== 'function')
    );
  }
  function x_0(A) {
    return errorInfo(A, 'Object');
  }
  function errorInfo(A) {
    return typeof Event !== 'undefined' && errorInfo(A, Event);
  }
  function errorInfo(A) {
    return typeof Element !== 'undefined' && errorInfo(A, Element);
  }
  function errorInfo(A) {
    return errorInfo(A, 'RegExp');
  }
  function errorInfo(A) {
    return Boolean(A && A.then && typeof A.then === 'function');
  }
  function errorInfo(A) {
    return (
      x_0(A) &&
      'nativeEvent' in A &&
      'preventDefault' in A &&
      'stopPropagation' in A
    );
  }
  function errorInfo(A) {
    return typeof A === 'number' && A !== A;
  }
  function errorInfo(A, B) {
    try {
      return A instanceof B;
    } catch (Q) {
      return !1;
    }
  }
  function errorInfo(A) {
    return !!(typeof A === 'object' && A !== null && (A.__isVue || A._isVue));
  }
  v_0.isDOMError = errorInfo;
  v_0.isDOMException = errorInfo;
  v_0.isElement = errorInfo;
  v_0.isError = errorInfo;
  v_0.isErrorEvent = errorInfo;
  v_0.isEvent = errorInfo;
  v_0.isInstanceOf = errorInfo;
  v_0.isNaN = errorInfo;
  v_0.isParameterizedString = __0;
  v_0.isPlainObject = x_0;
  v_0.isPrimitive = _19;
  v_0.isRegExp = errorInfo;
  v_0.isString = errorInfo;
  v_0.isSyntheticEvent = errorInfo;
  v_0.isThenable = errorInfo;
  v_0.isVueViewModel = errorInfo;
});
var identifier = E((f_0) => {
  Object.defineProperty(f_0, '__esModule', {
    value: !0,
  });
  var identifier = identifier();
  function identifier(A, B = 0) {
    if (typeof A !== 'string' || B === 0) return A;
    return A.length <= B ? A : `${A.slice(0, B)}...`;
  }
  function identifier(A, B) {
    let Q = A,
      Z = Q.length;
    if (Z <= 150) return Q;
    if (B > Z) B = Z;
    let D = Math.max(B - 60, 0);
    if (D < 5) D = 0;
    let G = Math.min(D + 140, Z);
    if (G > Z - 5) G = Z;
    if (G === Z) D = Math.max(G - 140, 0);
    if (((Q = Q.slice(D, G)), D > 0)) Q = `'{snip} ${Q}`;
    if (G < Z) Q += ' {snip}';
    return Q;
  }
  function identifier(A, B) {
    if (!Array.isArray(A)) return '';
    let Q = [];
    for (let Z = 0; Z < A.length; Z++) {
      let D = A[Z];
      try {
        if (identifier.isVueViewModel(D)) Q.push('[VueViewModel]');
        else Q.push(String(D));
      } catch (G) {
        Q.push('[value cannot be serialized]');
      }
    }
    return Q.join(B);
  }
  function b_0(A, B, Q = !1) {
    if (!identifier.isString(A)) return !1;
    if (identifier.isRegExp(B)) return B.test(A);
    if (identifier.isString(B)) return Q ? A === B : A.includes(B);
    return !1;
  }
  function identifier(A, B = [], Q = !1) {
    return B.some((Z) => b_0(A, Z, Q));
  }
  f_0.isMatchingPattern = b_0;
  f_0.safeJoin = identifier;
  f_0.snipLine = identifier;
  f_0.stringMatchesSomePattern = identifier;
  f_0.truncate = identifier;
});
var m_0 = E((u_0) => {
  Object.defineProperty(u_0, '__esModule', {
    value: !0,
  });
  var errorInfo = identifier(),
    errorInfo = identifier();
  function errorInfo(A, B, Q = 250, Z, D, G, F) {
    if (
      !G.exception ||
      !G.exception.values ||
      !F ||
      !errorInfo.isInstanceOf(F.originalException, Error)
    )
      return;
    let I =
      G.exception.values.length > 0
        ? G.exception.values[G.exception.values.length - 1]
        : void 0;
    if (I)
      G.exception.values = errorInfo(
        errorInfo(A, B, D, F.originalException, Z, G.exception.values, I, 0),
        Q
      );
  }
  function errorInfo(A, B, Q, Z, D, G, F, I) {
    if (G.length >= Q + 1) return G;
    let Y = [...G];
    if (errorInfo.isInstanceOf(Z[D], Error)) {
      h_0(F, I);
      let W = A(B, Z[D]),
        J = Y.length;
      (g_0(W, D, J, I), (Y = errorInfo(A, B, Q, Z[D], D, [W, ...Y], W, J)));
    }
    if (Array.isArray(Z.errors))
      Z.errors.forEach((W, J) => {
        if (errorInfo.isInstanceOf(W, Error)) {
          h_0(F, I);
          let X = A(B, W),
            V = Y.length;
          (g_0(X, `errors[${J}]`, V, I),
            (Y = errorInfo(A, B, Q, W, D, [X, ...Y], X, V)));
        }
      });
    return Y;
  }
  function h_0(A, B) {
    ((A.mechanism = A.mechanism || {
      type: 'generic',
      handled: !0,
    }),
      (A.mechanism = {
        ...A.mechanism,
        ...(A.type === 'AggregateError' && {
          is_exception_group: !0,
        }),
        exception_id: B,
      }));
  }
  function g_0(A, B, Q, Z) {
    ((A.mechanism = A.mechanism || {
      type: 'generic',
      handled: !0,
    }),
      (A.mechanism = {
        ...A.mechanism,
        type: 'chained',
        source: B,
        exception_id: Q,
        parent_id: Z,
      }));
  }
  function errorInfo(A, B) {
    return A.map((Q) => {
      if (Q.value) Q.value = errorInfo.truncate(Q.value, B);
      return Q;
    });
  }
  u_0.applyAggregateErrorsToEvent = errorInfo;
});
var identifier = E((d_0) => {
  Object.defineProperty(d_0, '__esModule', {
    value: !0,
  });
  function identifier(A) {
    return A && A.Math == Math ? A : void 0;
  }
  var identifier =
    (typeof globalThis == 'object' && identifier(globalThis)) ||
    (typeof window == 'object' && identifier(window)) ||
    (typeof self == 'object' && identifier(self)) ||
    (typeof global == 'object' && identifier(global)) ||
    (function () {
      return this;
    })() ||
    {};
  function identifier() {
    return identifier;
  }
  function identifier(A, B, Q) {
    let Z = Q || identifier,
      D = (Z.__SENTRY__ = Z.__SENTRY__ || {});
    return D[A] || (D[A] = B());
  }
  d_0.GLOBAL_OBJ = identifier;
  d_0.getGlobalObject = identifier;
  d_0.getGlobalSingleton = identifier;
});
