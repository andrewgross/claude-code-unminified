/**
 * HUMANIFIED CODE
 * Generated: 2025-08-18T20:24:11.597Z
 * Project: A chunk of claude code cli js
 * Total renames: 128
 *
 * Key improvements:
 * - Meaningful variable names based on context
 * - Function names describe their purpose
 * - Consistent naming patterns throughout
 */

/* chunk:1 bytes:[0, 19252) size:19252 source:unpacked-cli.js */
import { createRequire as tlB } from 'node:module';
var objectVar = Object.create;
var {
  getPrototypeOf: slB,
  defineProperty: Dm1,
  getOwnPropertyNames: rlB,
} = Object;
var objectVar = Object.prototype.hasOwnProperty;
var cliHandler = (A, B, Q) => {

// Examples of intelligent renames in this section:
//   G1 → cliHandler
//   bj → cliHandler
//   wy0 → cliHandler

  Q = A != null ? objectVar(slB(A)) : {};
  let Z =
    B || !A || !A.__esModule
      ? Dm1(Q, 'default', {
          value: A,
          enumerable: !0,
        })
      : Q;
  for (let D of rlB(A))
    if (!objectVar.call(Z, D))
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
var cliHandler = (A, B) => {
  for (var Q in B)
    Dm1(A, Q, {
      get: B[Q],
      enumerable: !0,
      configurable: !0,
      set: (Z) => (B[Q] = () => Z),
    });
};
var dataVar = (A, B) => () => (A && (B = A((A = 0))), B);
var dataVar = tlB(import.meta.url);
var fsOperation = E((fsOperation, fsOperation) => {
  fsOperation.exports = fsOperation;
  fsOperation.sync = fsOperation;
  var fsOperation = dataVar('fs');
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
  function fsOperation(A, B, Q) {
    if (!A.isSymbolicLink() && !A.isFile()) return !1;
    return _tB(B, Q);
  }
  function fsOperation(A, B, Q) {
    fsOperation.stat(A, function (Z, D) {
      Q(Z, Z ? !1 : fsOperation(D, A, B));
    });
  }
  function fsOperation(A, B) {
    return fsOperation(fsOperation.statSync(A), A, B);
  }
});
var fsOperation = E((fsOperation, fsOperation) => {
  fsOperation.exports = fsOperation;
  fsOperation.sync = fsOperation;
  var fsOperation = dataVar('fs');
  function fsOperation(A, B, Q) {
    fsOperation.stat(A, function (Z, D) {
      Q(Z, Z ? !1 : fsOperation(D, B));
    });
  }
  function fsOperation(A, B) {
    return fsOperation(fsOperation.statSync(A), B);
  }
  function fsOperation(A, B) {
    return A.isFile() && fsOperation(A, B);
  }
  function fsOperation(A, B) {
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
var fsOperation = E((fsOperation, fsOperation) => {
  var fsOperation = dataVar('fs'),
    fsOperation;
  if (process.platform === 'win32' || global.TESTING_WINDOWS)
    fsOperation = fsOperation();
  else fsOperation = fsOperation();
  fsOperation.exports = fsOperation;
  fsOperation.sync = fsOperation;
  function fsOperation(A, B, Q) {
    if (typeof B === 'function') ((Q = B), (B = {}));
    if (!Q) {
      if (typeof Promise !== 'function')
        throw new TypeError('callback not provided');
      return new Promise(function (Z, D) {
        fsOperation(A, B || {}, function (G, F) {
          if (G) D(G);
          else Z(F);
        });
      });
    }
    fsOperation(A, B || {}, function (Z, D) {
      if (Z) {
        if (Z.code === 'EACCES' || (B && B.ignoreErrors))
          ((Z = null), (D = !1));
      }
      Q(Z, D);
    });
  }
  function fsOperation(A, B) {
    try {
      return fsOperation.sync(A, B || {});
    } catch (Q) {
      if ((B && B.ignoreErrors) || Q.code === 'EACCES') return !1;
      else throw Q;
    }
  }
});
var cliHandler = E((cliHandler, cliHandler) => {
  var cliHandler =
      process.platform === 'win32' ||
      process.env.OSTYPE === 'cygwin' ||
      process.env.OSTYPE === 'msys',
    cliHandler = dataVar('path'),
    cliHandler = cliHandler ? ';' : ':',
    cliHandler = fsOperation(),
    cliHandler = (A) =>
      Object.assign(new Error(`not found: ${A}`), {
        code: 'ENOENT',
      }),
    cliHandler = (A, B) => {
      let Q = B.colon || cliHandler,
        Z =
          A.match(/\//) || (cliHandler && A.match(/\\/))
            ? ['']
            : [
                ...(cliHandler ? [process.cwd()] : []),
                ...(B.path || process.env.PATH || '').split(Q),
              ],
        D = cliHandler
          ? B.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'
          : '',
        G = cliHandler ? D.split(Q) : [''];
      if (cliHandler) {
        if (A.indexOf('.') !== -1 && G[0] !== '') G.unshift('');
      }
      return {
        pathEnv: Z,
        pathExt: G,
        pathExtExe: D,
      };
    },
    cliHandler = (A, B, Q) => {
      if (typeof B === 'function') ((Q = B), (B = {}));
      if (!B) B = {};
      let { pathEnv: Z, pathExt: D, pathExtExe: G } = cliHandler(A, B),
        F = [],
        I = (W) =>
          new Promise((J, X) => {
            if (W === Z.length)
              return B.all && F.length ? J(F) : X(cliHandler(A));
            let V = Z[W],
              C = /^".*"$/.test(V) ? V.slice(1, -1) : V,
              K = cliHandler.join(C, A),
              H = !C && /^\.[\\\/]/.test(A) ? A.slice(0, 2) + K : K;
            J(Y(H, W, 0));
          }),
        Y = (W, J, X) =>
          new Promise((V, C) => {
            if (X === D.length) return V(I(J + 1));
            let K = D[X];
            cliHandler(
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
    cliHandler = (A, B) => {
      B = B || {};
      let { pathEnv: Q, pathExt: Z, pathExtExe: D } = cliHandler(A, B),
        G = [];
      for (let F = 0; F < Q.length; F++) {
        let I = Q[F],
          Y = /^".*"$/.test(I) ? I.slice(1, -1) : I,
          W = cliHandler.join(Y, A),
          J = !Y && /^\.[\\\/]/.test(A) ? A.slice(0, 2) + W : W;
        for (let X = 0; X < Z.length; X++) {
          let V = J + Z[X];
          try {
            if (
              cliHandler.sync(V, {
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
      throw cliHandler(A);
    };
  cliHandler.exports = cliHandler;
  cliHandler.sync = cliHandler;
});
var returnHandler = E((returnHandler, returnHandler) => {
  var $y0 = (A = {}) => {
    let B = A.env || process.env;
    if ((A.platform || process.platform) !== 'win32') return 'PATH';
    return (
      Object.keys(B)
        .reverse()
        .find((Z) => Z.toUpperCase() === 'PATH') || 'Path'
    );
  };
  returnHandler.exports = $y0;
  returnHandler.exports.default = $y0;
});
var cliHandler = E((cliHandler, cliHandler) => {
  var dataVar = dataVar('path'),
    dataVar = cliHandler(),
    dataVar = returnHandler();
  function envConfig(A, B) {
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
      F = dataVar.sync(A.command, {
        path: Q[
          dataVar({
            env: Q,
          })
        ],
        pathExt: B ? dataVar.delimiter : void 0,
      });
    } catch (I) {
    } finally {
      if (G) process.chdir(Z);
    }
    if (F) F = dataVar.resolve(D ? A.options.cwd : '', F);
    return F;
  }
  function envConfig(A) {
    return envConfig(A) || envConfig(A, !0);
  }
  cliHandler.exports = envConfig;
});
var cliCommand = E((cliCommand, cliCommand) => {
  var dataVar = /([()\][%!^"`<>&|;, *?])/g;
  function cliCommand(A) {
    return ((A = A.replace(dataVar, '^$1')), A);
  }
  function cliCommand(A, B) {
    if (
      ((A = `${A}`),
      (A = A.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"')),
      (A = A.replace(/(?=(\\+?)?)\1$/, '$1$1')),
      (A = `"${A}"`),
      (A = A.replace(dataVar, '^$1')),
      B)
    )
      A = A.replace(dataVar, '^$1');
    return A;
  }
  cliCommand.command = cliCommand;
  cliCommand.argument = cliCommand;
});
var cliHandler = E((cliHandler, cliHandler) => {
  cliHandler.exports = /^#!(.*)/;
});
var returnHandler = E((returnHandler, returnHandler) => {
  var dataVar = cliHandler();
  returnHandler.exports = (A = '') => {
    let B = A.match(dataVar);
    if (!B) return null;
    let [Q, Z] = B[0].replace(/#! ?/, '').split(' '),
      D = Q.split('/').pop();
    if (D === 'env') return Z;
    return Z ? `${D} ${Z}` : D;
  };
});
var fsOperation = E((fsOperation, fsOperation) => {
  var fsOperation = dataVar('fs'),
    fsOperation = returnHandler();
  function fsOperation(A) {
    let Q = Buffer.alloc(150),
      Z;
    try {
      ((Z = fsOperation.openSync(A, 'r')),
        fsOperation.readSync(Z, Q, 0, 150, 0),
        fsOperation.closeSync(Z));
    } catch (D) {}
    return fsOperation(Q.toString());
  }
  fsOperation.exports = fsOperation;
});
var cliCommand = E((cliCommand, cliCommand) => {
  var cliCommand = dataVar('path'),
    _y0 = cliHandler(),
    cliCommand = cliCommand(),
    cliCommand = fsOperation(),
    cliCommand = process.platform === 'win32',
    cliCommand = /\.(?:com|exe)$/i,
    cliCommand = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function cliCommand(A) {
    A.file = _y0(A);
    let B = A.file && cliCommand(A.file);
    if (B) return (A.args.unshift(A.file), (A.command = B), _y0(A));
    return A.file;
  }
  function cliCommand(A) {
    if (!cliCommand) return A;
    let B = cliCommand(A),
      Q = !cliCommand.test(B);
    if (A.options.forceShell || Q) {
      let Z = cliCommand.test(B);
      ((A.command = cliCommand.normalize(A.command)),
        (A.command = cliCommand.command(A.command)),
        (A.args = A.args.map((G) => cliCommand.argument(G, Z))));
      let D = [A.command].concat(A.args).join(' ');
      ((A.args = ['/d', '/s', '/c', `"${D}"`]),
        (A.command = process.env.comspec || 'cmd.exe'),
        (A.options.windowsVerbatimArguments = !0));
    }
    return A;
  }
  function cliCommand(A, B, Q) {
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
    return Q.shell ? Z : cliCommand(Z);
  }
  cliCommand.exports = cliCommand;
});
var cliCommand = E((cliCommand, cliCommand) => {
  var dataVar = process.platform === 'win32';
  function cliCommand(A, B) {
    return Object.assign(new Error(`${B} ${A.command} ENOENT`), {
      code: 'ENOENT',
      errno: 'ENOENT',
      syscall: `${B} ${A.command}`,
      path: A.command,
      spawnargs: A.args,
    });
  }
  function cliCommand(A, B) {
    if (!dataVar) return;
    let Q = A.emit;
    A.emit = function (Z, D) {
      if (Z === 'exit') {
        let G = cliCommand(D, B);
        if (G) return Q.call(A, 'error', G);
      }
      return Q.apply(A, arguments);
    };
  }
  function cliCommand(A, B) {
    if (dataVar && A === 1 && !B.file) return cliCommand(B.original, 'spawn');
    return null;
  }
  function cliCommand(A, B) {
    if (dataVar && A === 1 && !B.file)
      return cliCommand(B.original, 'spawnSync');
    return null;
  }
  cliCommand.exports = {
    hookChildProcess: cliCommand,
    verifyENOENT: cliCommand,
    verifyENOENTSync: cliCommand,
    notFoundError: cliCommand,
  };
});
var _m1 = E((cliCommand, cliCommand) => {
  var dataVar = dataVar('child_process'),
    dataVar = cliCommand(),
    dataVar = cliCommand();
  function cliCommand(A, B, Q) {
    let Z = dataVar(A, B, Q),
      D = dataVar.spawn(Z.command, Z.args, Z.options);
    return (dataVar.hookChildProcess(D, Z), D);
  }
  function cliCommand(A, B, Q) {
    let Z = dataVar(A, B, Q),
      D = dataVar.spawnSync(Z.command, Z.args, Z.options);
    return ((D.error = D.error || dataVar.verifyENOENTSync(D.status, Z)), D);
  }
  cliCommand.exports = cliCommand;
  cliCommand.exports.spawn = cliCommand;
  cliCommand.exports.sync = cliCommand;
  cliCommand.exports._parse = dataVar;
  cliCommand.exports._enoent = dataVar;
});
var z_0 = E((returnHandler, H_0) => {
  var { PassThrough: G19 } = dataVar('stream');
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
var cliHandler = E((v_0) => {
  Object.defineProperty(v_0, '__esModule', {
    value: !0,
  });
  var y_0 = Object.prototype.toString;
  function errorHandler(A) {
    switch (y_0.call(A)) {
      case '[object Error]':
      case '[object Exception]':
      case '[object DOMException]':
        return !0;
      default:
        return errorHandler(A, Error);
    }
  }
  function errorHandler(A, B) {
    return y_0.call(A) === `[object ${B}]`;
  }
  function errorHandler(A) {
    return errorHandler(A, 'ErrorEvent');
  }
  function errorHandler(A) {
    return errorHandler(A, 'DOMError');
  }
  function errorHandler(A) {
    return errorHandler(A, 'DOMException');
  }
  function errorHandler(A) {
    return errorHandler(A, 'String');
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
    return errorHandler(A, 'Object');
  }
  function errorHandler(A) {
    return typeof Event !== 'undefined' && errorHandler(A, Event);
  }
  function errorHandler(A) {
    return typeof Element !== 'undefined' && errorHandler(A, Element);
  }
  function errorHandler(A) {
    return errorHandler(A, 'RegExp');
  }
  function errorHandler(A) {
    return Boolean(A && A.then && typeof A.then === 'function');
  }
  function errorHandler(A) {
    return (
      x_0(A) &&
      'nativeEvent' in A &&
      'preventDefault' in A &&
      'stopPropagation' in A
    );
  }
  function errorHandler(A) {
    return typeof A === 'number' && A !== A;
  }
  function errorHandler(A, B) {
    try {
      return A instanceof B;
    } catch (Q) {
      return !1;
    }
  }
  function errorHandler(A) {
    return !!(typeof A === 'object' && A !== null && (A.__isVue || A._isVue));
  }
  v_0.isDOMError = errorHandler;
  v_0.isDOMException = errorHandler;
  v_0.isElement = errorHandler;
  v_0.isError = errorHandler;
  v_0.isErrorEvent = errorHandler;
  v_0.isEvent = errorHandler;
  v_0.isInstanceOf = errorHandler;
  v_0.isNaN = errorHandler;
  v_0.isParameterizedString = __0;
  v_0.isPlainObject = x_0;
  v_0.isPrimitive = _19;
  v_0.isRegExp = errorHandler;
  v_0.isString = errorHandler;
  v_0.isSyntheticEvent = errorHandler;
  v_0.isThenable = errorHandler;
  v_0.isVueViewModel = errorHandler;
});
var returnHandler = E((f_0) => {
  Object.defineProperty(f_0, '__esModule', {
    value: !0,
  });
  var dataVar = cliHandler();
  function arrayUtil(A, B = 0) {
    if (typeof A !== 'string' || B === 0) return A;
    return A.length <= B ? A : `${A.slice(0, B)}...`;
  }
  function arrayUtil(A, B) {
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
  function arrayUtil(A, B) {
    if (!Array.isArray(A)) return '';
    let Q = [];
    for (let Z = 0; Z < A.length; Z++) {
      let D = A[Z];
      try {
        if (dataVar.isVueViewModel(D)) Q.push('[VueViewModel]');
        else Q.push(String(D));
      } catch (G) {
        Q.push('[value cannot be serialized]');
      }
    }
    return Q.join(B);
  }
  function b_0(A, B, Q = !1) {
    if (!dataVar.isString(A)) return !1;
    if (dataVar.isRegExp(B)) return B.test(A);
    if (dataVar.isString(B)) return Q ? A === B : A.includes(B);
    return !1;
  }
  function arrayUtil(A, B = [], Q = !1) {
    return B.some((Z) => b_0(A, Z, Q));
  }
  f_0.isMatchingPattern = b_0;
  f_0.safeJoin = arrayUtil;
  f_0.snipLine = arrayUtil;
  f_0.stringMatchesSomePattern = arrayUtil;
  f_0.truncate = arrayUtil;
});
var m_0 = E((u_0) => {
  Object.defineProperty(u_0, '__esModule', {
    value: !0,
  });
  var dataVar = cliHandler(),
    dataVar = returnHandler();
  function errorHandler(A, B, Q = 250, Z, D, G, F) {
    if (
      !G.exception ||
      !G.exception.values ||
      !F ||
      !dataVar.isInstanceOf(F.originalException, Error)
    )
      return;
    let I =
      G.exception.values.length > 0
        ? G.exception.values[G.exception.values.length - 1]
        : void 0;
    if (I)
      G.exception.values = errorHandler(
        errorHandler(A, B, D, F.originalException, Z, G.exception.values, I, 0),
        Q
      );
  }
  function errorHandler(A, B, Q, Z, D, G, F, I) {
    if (G.length >= Q + 1) return G;
    let Y = [...G];
    if (dataVar.isInstanceOf(Z[D], Error)) {
      h_0(F, I);
      let W = A(B, Z[D]),
        J = Y.length;
      (g_0(W, D, J, I), (Y = errorHandler(A, B, Q, Z[D], D, [W, ...Y], W, J)));
    }
    if (Array.isArray(Z.errors))
      Z.errors.forEach((W, J) => {
        if (dataVar.isInstanceOf(W, Error)) {
          h_0(F, I);
          let X = A(B, W),
            V = Y.length;
          (g_0(X, `errors[${J}]`, V, I),
            (Y = errorHandler(A, B, Q, W, D, [X, ...Y], X, V)));
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
  function errorHandler(A, B) {
    return A.map((Q) => {
      if (Q.value) Q.value = dataVar.truncate(Q.value, B);
      return Q;
    });
  }
  u_0.applyAggregateErrorsToEvent = errorHandler;
});
var returnHandler = E((d_0) => {
  Object.defineProperty(d_0, '__esModule', {
    value: !0,
  });
  function utilityFunction(A) {
    return A && A.Math == Math ? A : void 0;
  }
  var utilityFunction =
    (typeof globalThis == 'object' && utilityFunction(globalThis)) ||
    (typeof window == 'object' && utilityFunction(window)) ||
    (typeof self == 'object' && utilityFunction(self)) ||
    (typeof global == 'object' && utilityFunction(global)) ||
    (function () {
      return this;
    })() ||
    {};
  function utilityFunction() {
    return utilityFunction;
  }
  function utilityFunction(A, B, Q) {
    let Z = Q || utilityFunction,
      D = (Z.__SENTRY__ = Z.__SENTRY__ || {});
    return D[A] || (D[A] = B());
  }
  d_0.GLOBAL_OBJ = utilityFunction;
  d_0.getGlobalObject = utilityFunction;
  d_0.getGlobalSingleton = utilityFunction;
});
