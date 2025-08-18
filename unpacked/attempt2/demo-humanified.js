import { createRequire as tlB } from 'node:module';
var funcALB = Object.create;
var {
  getPrototypeOf: slB,
  defineProperty: Dm1,
  getOwnPropertyNames: rlB,
} = Object;
var objOLB = Object.prototype.hasOwnProperty;
var handlerG = (A, B, Q) => {
  Q = A != null ? funcALB(slB(A)) : {};
  let Z =
    B || !A || !A.__esModule
      ? Dm1(Q, 'default', {
          value: A,
          enumerable: !0,
        })
      : Q;
  for (let D of rlB(A))
    if (!objOLB.call(Z, D))
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
var handlerBJ = (A, B) => {
  for (var Q in B)
    Dm1(A, Q, {
      get: B[Q],
      enumerable: !0,
      configurable: !0,
      set: (Z) => (B[Q] = () => Z),
    });
};
var handlerK = (A, B) => () => (A && (B = A((A = 0))), B);
var funcW = tlB(import.meta.url);
var funcGY = E((paramSG, paramDY) => {
  paramDY.exports = funcZY;
  funcZY.sync = funcXTB;
  var objBY = funcW('fs');
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
  function checkQY(A, B, Q) {
    if (!A.isSymbolicLink() && !A.isFile()) return !1;
    return _tB(B, Q);
  }
  function funcZY(A, B, Q) {
    objBY.stat(A, function (Z, D) {
      Q(Z, Z ? !1 : checkQY(D, A, B));
    });
  }
  function funcXTB(A, B) {
    return checkQY(objBY.statSync(A), A, B);
  }
});
var funcJY = E((paramRG, paramWY) => {
  paramWY.exports = funcIY;
  funcIY.sync = funcVTB;
  var objFY = funcW('fs');
  function funcIY(A, B, Q) {
    objFY.stat(A, function (Z, D) {
      Q(Z, Z ? !1 : checkYY(D, B));
    });
  }
  function funcVTB(A, B) {
    return checkYY(objFY.statSync(A), B);
  }
  function checkYY(A, B) {
    return A.isFile() && funcBTB(A, B);
  }
  function funcBTB(A, B) {
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
var funcVY = E((paramTG, paramXY) => {
  var varOG = funcW('fs'),
    funcLW;
  if (process.platform === 'win32' || global.TESTING_WINDOWS) funcLW = funcGY();
  else funcLW = funcJY();
  paramXY.exports = checkMM;
  checkMM.sync = funcFTB;
  function checkMM(A, B, Q) {
    if (typeof B === 'function') ((Q = B), (B = {}));
    if (!Q) {
      if (typeof Promise !== 'function')
        throw new TypeError('callback not provided');
      return new Promise(function (Z, D) {
        checkMM(A, B || {}, function (G, F) {
          if (G) D(G);
          else Z(F);
        });
      });
    }
    funcLW(A, B || {}, function (Z, D) {
      if (Z) {
        if (Z.code === 'EACCES' || (B && B.ignoreErrors))
          ((Z = null), (D = !1));
      }
      Q(Z, D);
    });
  }
  function funcFTB(A, B) {
    try {
      return funcLW.sync(A, B || {});
    } catch (Q) {
      if ((B && B.ignoreErrors) || Q.code === 'EACCES') return !1;
      else throw Q;
    }
  }
});
var funcWY = E((paramEG, paramUY) => {
  var varML =
      process.platform === 'win32' ||
      process.env.OSTYPE === 'cygwin' ||
      process.env.OSTYPE === 'msys',
    objCY = funcW('path'),
    varHTB = varML ? ';' : ':',
    funcKY = funcVY(),
    handlerHY = (A) =>
      Object.assign(new Error(`not found: ${A}`), {
        code: 'ENOENT',
      }),
    handlerZY = (A, B) => {
      let Q = B.colon || varHTB,
        Z =
          A.match(/\//) || (varML && A.match(/\\/))
            ? ['']
            : [
                ...(varML ? [process.cwd()] : []),
                ...(B.path || process.env.PATH || '').split(Q),
              ],
        D = varML
          ? B.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'
          : '',
        G = varML ? D.split(Q) : [''];
      if (varML) {
        if (A.indexOf('.') !== -1 && G[0] !== '') G.unshift('');
      }
      return {
        pathEnv: Z,
        pathExt: G,
        pathExtExe: D,
      };
    },
    handlerEY = (A, B, Q) => {
      if (typeof B === 'function') ((Q = B), (B = {}));
      if (!B) B = {};
      let { pathEnv: Z, pathExt: D, pathExtExe: G } = handlerZY(A, B),
        F = [],
        I = (W) =>
          new Promise((J, X) => {
            if (W === Z.length)
              return B.all && F.length ? J(F) : X(handlerHY(A));
            let V = Z[W],
              C = /^".*"$/.test(V) ? V.slice(1, -1) : V,
              K = objCY.join(C, A),
              H = !C && /^\.[\\\/]/.test(A) ? A.slice(0, 2) + K : K;
            J(Y(H, W, 0));
          }),
        Y = (W, J, X) =>
          new Promise((V, C) => {
            if (X === D.length) return V(I(J + 1));
            let K = D[X];
            funcKY(
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
    handlerGTB = (A, B) => {
      B = B || {};
      let { pathEnv: Q, pathExt: Z, pathExtExe: D } = handlerZY(A, B),
        G = [];
      for (let F = 0; F < Q.length; F++) {
        let I = Q[F],
          Y = /^".*"$/.test(I) ? I.slice(1, -1) : I,
          W = objCY.join(Y, A),
          J = !Y && /^\.[\\\/]/.test(A) ? A.slice(0, 2) + W : W;
        for (let X = 0; X < Z.length; X++) {
          let V = J + Z[X];
          try {
            if (
              funcKY.sync(V, {
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
      throw handlerHY(A);
    };
  paramUY.exports = handlerEY;
  handlerEY.sync = handlerGTB;
});
var funcQY = E((paramAU, paramRM) => {
  var $y0 = (A = {}) => {
    let B = A.env || process.env;
    if ((A.platform || process.platform) !== 'win32') return 'PATH';
    return (
      Object.keys(B)
        .reverse()
        .find((Z) => Z.toUpperCase() === 'PATH') || 'Path'
    );
  };
  paramRM.exports = $y0;
  paramRM.exports.default = $y0;
});
var funcRY = E((paramBU, paramMY) => {
  var objNY = funcW('path'),
    objUTB = funcWY(),
    funcMTB = funcQY();
  function funcLY(A, B) {
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
      F = objUTB.sync(A.command, {
        path: Q[
          funcMTB({
            env: Q,
          })
        ],
        pathExt: B ? objNY.delimiter : void 0,
      });
    } catch (I) {
    } finally {
      if (G) process.chdir(Z);
    }
    if (F) F = objNY.resolve(D ? A.options.cwd : '', F);
    return F;
  }
  function funcDTB(A) {
    return funcLY(A) || funcLY(A, !0);
  }
  paramMY.exports = funcDTB;
});
var funcOY = E((paramPTB, paramTM) => {
  var varOM = /([()\][%!^"`<>&|;, *?])/g;
  function funcCTB(A) {
    return ((A = A.replace(varOM, '^$1')), A);
  }
  function funcLTB(A, B) {
    if (
      ((A = `${A}`),
      (A = A.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"')),
      (A = A.replace(/(?=(\\+?)?)\1$/, '$1$1')),
      (A = `"${A}"`),
      (A = A.replace(varOM, '^$1')),
      B)
    )
      A = A.replace(varOM, '^$1');
    return A;
  }
  paramPTB.command = funcCTB;
  paramPTB.argument = funcLTB;
});
var funcPY = E((paramQU, paramTY) => {
  paramTY.exports = /^#!(.*)/;
});
var funcJY1 = E((paramZU, paramSY) => {
  var varATB = funcPY();
  paramSY.exports = (A = '') => {
    let B = A.match(varATB);
    if (!B) return null;
    let [Q, Z] = B[0].replace(/#! ?/, '').split(' '),
      D = Q.split('/').pop();
    if (D === 'env') return Z;
    return Z ? `${D} ${Z}` : D;
  };
});
var funcYY = E((paramDU, paramKY) => {
  var fileSystemPM = funcW('fs'),
    funcSTB = funcJY1();
  function funcRTB(A) {
    let Q = Buffer.alloc(150),
      Z;
    try {
      ((Z = fileSystemPM.openSync(A, 'r')),
        fileSystemPM.readSync(Z, Q, 0, 150, 0),
        fileSystemPM.closeSync(Z));
    } catch (D) {}
    return funcSTB(Q.toString());
  }
  paramKY.exports = funcRTB;
});
var funcBY = E((paramGU, paramVY) => {
  var objOTB = funcW('path'),
    _y0 = funcRY(),
    objXY = funcOY(),
    funcTTB = funcYY(),
    varETB = process.platform === 'win32',
    objAEB = /\.(?:com|exe)$/i,
    objBEB = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function funcQEB(A) {
    A.file = _y0(A);
    let B = A.file && funcTTB(A.file);
    if (B) return (A.args.unshift(A.file), (A.command = B), _y0(A));
    return A.file;
  }
  function checkZEB(A) {
    if (!varETB) return A;
    let B = funcQEB(A),
      Q = !objAEB.test(B);
    if (A.options.forceShell || Q) {
      let Z = objBEB.test(B);
      ((A.command = objOTB.normalize(A.command)),
        (A.command = objXY.command(A.command)),
        (A.args = A.args.map((G) => objXY.argument(G, Z))));
      let D = [A.command].concat(A.args).join(' ');
      ((A.args = ['/d', '/s', '/c', `"${D}"`]),
        (A.command = process.env.comspec || 'cmd.exe'),
        (A.options.windowsVerbatimArguments = !0));
    }
    return A;
  }
  function funcDEB(A, B, Q) {
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
    return Q.shell ? Z : checkZEB(Z);
  }
  paramVY.exports = funcDEB;
});
var funcGY1 = E((paramFU, paramHY) => {
  var varSM = process.platform === 'win32';
  function checkJM(A, B) {
    return Object.assign(new Error(`${B} ${A.command} ENOENT`), {
      code: 'ENOENT',
      errno: 'ENOENT',
      syscall: `${B} ${A.command}`,
      path: A.command,
      spawnargs: A.args,
    });
  }
  function funcGEB(A, B) {
    if (!varSM) return;
    let Q = A.emit;
    A.emit = function (Z, D) {
      if (Z === 'exit') {
        let G = checkFY(D, B);
        if (G) return Q.call(A, 'error', G);
      }
      return Q.apply(A, arguments);
    };
  }
  function checkFY(A, B) {
    if (varSM && A === 1 && !B.file) return checkJM(B.original, 'spawn');
    return null;
  }
  function funcFEB(A, B) {
    if (varSM && A === 1 && !B.file) return checkJM(B.original, 'spawnSync');
    return null;
  }
  paramHY.exports = {
    hookChildProcess: funcGEB,
    verifyENOENT: checkFY,
    verifyENOENTSync: funcFEB,
    notFoundError: checkJM,
  };
});
var _m1 = E((paramIU, paramRL) => {
  var objUY = funcW('child_process'),
    funcKM = funcBY(),
    objYM = funcGY1();
  function funcMY(A, B, Q) {
    let Z = funcKM(A, B, Q),
      D = objUY.spawn(Z.command, Z.args, Z.options);
    return (objYM.hookChildProcess(D, Z), D);
  }
  function funcIEB(A, B, Q) {
    let Z = funcKM(A, B, Q),
      D = objUY.spawnSync(Z.command, Z.args, Z.options);
    return ((D.error = D.error || objYM.verifyENOENTSync(D.status, Z)), D);
  }
  paramRL.exports = funcMY;
  paramRL.exports.spawn = funcMY;
  paramRL.exports.sync = funcIEB;
  paramRL.exports._parse = funcKM;
  paramRL.exports._enoent = objYM;
});
var z_0 = E((paramVM, H_0) => {
  var { PassThrough: G19 } = funcW('stream');
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
var funcIH = E((v_0) => {
  Object.defineProperty(v_0, '__esModule', {
    value: !0,
  });
  var y_0 = Object.prototype.toString;
  function funcP(A) {
    switch (y_0.call(A)) {
      case '[object Error]':
      case '[object Exception]':
      case '[object DOMException]':
        return !0;
      default:
        return checkDJ(A, Error);
    }
  }
  function utilOL(A, B) {
    return y_0.call(A) === `[object ${B}]`;
  }
  function funcS(A) {
    return utilOL(A, 'ErrorEvent');
  }
  function funcJ(A) {
    return utilOL(A, 'DOMError');
  }
  function funcK(A) {
    return utilOL(A, 'DOMException');
  }
  function funcY(A) {
    return utilOL(A, 'String');
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
    return utilOL(A, 'Object');
  }
  function funcX(A) {
    return typeof Event !== 'undefined' && checkDJ(A, Event);
  }
  function funcV(A) {
    return typeof Element !== 'undefined' && checkDJ(A, Element);
  }
  function funcB(A) {
    return utilOL(A, 'RegExp');
  }
  function funcF(A) {
    return Boolean(A && A.then && typeof A.then === 'function');
  }
  function funcH(A) {
    return (
      x_0(A) &&
      'nativeEvent' in A &&
      'preventDefault' in A &&
      'stopPropagation' in A
    );
  }
  function funcG(A) {
    return typeof A === 'number' && A !== A;
  }
  function checkDJ(A, B) {
    try {
      return A instanceof B;
    } catch (Q) {
      return !1;
    }
  }
  function funcU(A) {
    return !!(typeof A === 'object' && A !== null && (A.__isVue || A._isVue));
  }
  v_0.isDOMError = funcJ;
  v_0.isDOMException = funcK;
  v_0.isElement = funcV;
  v_0.isError = funcP;
  v_0.isErrorEvent = funcS;
  v_0.isEvent = funcX;
  v_0.isInstanceOf = checkDJ;
  v_0.isNaN = funcG;
  v_0.isParameterizedString = __0;
  v_0.isPlainObject = x_0;
  v_0.isPrimitive = _19;
  v_0.isRegExp = funcB;
  v_0.isString = funcY;
  v_0.isSyntheticEvent = funcH;
  v_0.isThenable = funcF;
  v_0.isVueViewModel = funcU;
});
var funcK1 = E((f_0) => {
  Object.defineProperty(f_0, '__esModule', {
    value: !0,
  });
  var objGJ = funcIH();
  function funcZ(A, B = 0) {
    if (typeof A !== 'string' || B === 0) return A;
    return A.length <= B ? A : `${A.slice(0, B)}...`;
  }
  function funcD(A, B) {
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
  function funcG1(A, B) {
    if (!Array.isArray(A)) return '';
    let Q = [];
    for (let Z = 0; Z < A.length; Z++) {
      let D = A[Z];
      try {
        if (objGJ.isVueViewModel(D)) Q.push('[VueViewModel]');
        else Q.push(String(D));
      } catch (G) {
        Q.push('[value cannot be serialized]');
      }
    }
    return Q.join(B);
  }
  function b_0(A, B, Q = !1) {
    if (!objGJ.isString(A)) return !1;
    if (objGJ.isRegExp(B)) return B.test(A);
    if (objGJ.isString(B)) return Q ? A === B : A.includes(B);
    return !1;
  }
  function funcF1(A, B = [], Q = !1) {
    return B.some((Z) => b_0(A, Z, Q));
  }
  f_0.isMatchingPattern = b_0;
  f_0.safeJoin = funcG1;
  f_0.snipLine = funcD;
  f_0.stringMatchesSomePattern = funcF1;
  f_0.truncate = funcZ;
});
var m_0 = E((u_0) => {
  Object.defineProperty(u_0, '__esModule', {
    value: !0,
  });
  var objID = funcIH(),
    objV = funcK1();
  function funcC(A, B, Q = 250, Z, D, G, F) {
    if (
      !G.exception ||
      !G.exception.values ||
      !F ||
      !objID.isInstanceOf(F.originalException, Error)
    )
      return;
    let I =
      G.exception.values.length > 0
        ? G.exception.values[G.exception.values.length - 1]
        : void 0;
    if (I)
      G.exception.values = checkK(
        checkYD(A, B, D, F.originalException, Z, G.exception.values, I, 0),
        Q
      );
  }
  function checkYD(A, B, Q, Z, D, G, F, I) {
    if (G.length >= Q + 1) return G;
    let Y = [...G];
    if (objID.isInstanceOf(Z[D], Error)) {
      h_0(F, I);
      let W = A(B, Z[D]),
        J = Y.length;
      (g_0(W, D, J, I), (Y = checkYD(A, B, Q, Z[D], D, [W, ...Y], W, J)));
    }
    if (Array.isArray(Z.errors))
      Z.errors.forEach((W, J) => {
        if (objID.isInstanceOf(W, Error)) {
          h_0(F, I);
          let X = A(B, W),
            V = Y.length;
          (g_0(X, `errors[${J}]`, V, I),
            (Y = checkYD(A, B, Q, W, D, [X, ...Y], X, V)));
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
  function checkK(A, B) {
    return A.map((Q) => {
      if (Q.value) Q.value = objV.truncate(Q.value, B);
      return Q;
    });
  }
  u_0.applyAggregateErrorsToEvent = funcC;
});
var varVW = E((d_0) => {
  Object.defineProperty(d_0, '__esModule', {
    value: !0,
  });
  function utilFJ(A) {
    return A && A.Math == Math ? A : void 0;
  }
  var varWD =
    (typeof globalThis == 'object' && utilFJ(globalThis)) ||
    (typeof window == 'object' && utilFJ(window)) ||
    (typeof self == 'object' && utilFJ(self)) ||
    (typeof global == 'object' && utilFJ(global)) ||
    (function () {
      return this;
    })() ||
    {};
  function funcZ1() {
    return varWD;
  }
  function funcE(A, B, Q) {
    let Z = Q || varWD,
      D = (Z.__SENTRY__ = Z.__SENTRY__ || {});
    return D[A] || (D[A] = B());
  }
  d_0.GLOBAL_OBJ = varWD;
  d_0.getGlobalObject = funcZ1;
  d_0.getGlobalSingleton = funcE;
});
var funcJD = E((c_0) => {
  Object.defineProperty(c_0, '__esModule', {
    value: !0,
  });
  var objQ = iH(),
    objN = vW(),
    N09TL = objN.getGlobalObject(),
    numL = 80;
  function funcM(A, B = {}) {
    if (!A) return '<unknown>';
    try {
      let Q = A,
        Z = 5,
        D = [],
        G = 0,
        F = 0,
        I = ' > ',
        Y = I.length,
        W,
        J = Array.isArray(B) ? B : B.keyAttrs,
        X = (!Array.isArray(B) && B.maxStringLength) || numL;
      while (Q && G++ < Z) {
        if (
          ((W = checkR(Q, J)),
          W === 'html' || (G > 1 && F + D.length * Y + W.length >= X))
        )
          break;
        (D.push(W), (F += W.length), (Q = Q.parentNode));
      }
      return D.reverse().join(I);
    } catch (Q) {
      return '<unknown>';
    }
  }
  function checkR(A, B) {
    let Q = A,
      Z = [],
      D,
      G,
      F,
      I,
      Y;
    if (!Q || !Q.tagName) return '';
    if (N09TL.HTMLElement) {
      if (Q instanceof HTMLElement && Q.dataset && Q.dataset.sentryComponent)
        return Q.dataset.sentryComponent;
    }
    Z.push(Q.tagName.toLowerCase());
    let W =
      B && B.length
        ? B.filter((X) => Q.getAttribute(X)).map((X) => [X, Q.getAttribute(X)])
        : null;
    if (W && W.length)
      W.forEach((X) => {
        Z.push(`[${X[0]}="${X[1]}"]`);
      });
    else {
      if (Q.id) Z.push(`#${Q.id}`);
      if (((D = Q.className), D && objQ.isString(D))) {
        G = D.split(/\s+/);
        for (Y = 0; Y < G.length; Y++) Z.push(`.${G[Y]}`);
      }
    }
    let J = ['aria-label', 'type', 'name', 'title', 'alt'];
    for (Y = 0; Y < J.length; Y++)
      if (((F = J[Y]), (I = Q.getAttribute(F)), I)) Z.push(`[${F}="${I}"]`);
    return Z.join('');
  }
  function funcO() {
    try {
      return N09TL.document.location.href;
    } catch (A) {
      return '';
    }
  }
  function funcT(A) {
    if (N09TL.document && N09TL.document.querySelector)
      return N09TL.document.querySelector(A);
    return null;
  }
  function funcP1(A) {
    if (!N09TL.HTMLElement) return null;
    let B = A,
      Q = 5;
    for (let Z = 0; Z < Q; Z++) {
      if (!B) return null;
      if (B instanceof HTMLElement && B.dataset.sentryComponent)
        return B.dataset.sentryComponent;
      B = B.parentNode;
    }
    return null;
  }
  c_0.getComponentName = funcP1;
  c_0.getDomElement = funcT;
  c_0.getLocationHref = funcO;
  c_0.htmlTreeAsString = funcM;
});
var funcRQ = E((l_0) => {
  Object.defineProperty(l_0, '__esModule', {
    value: !0,
  });
  var _09 = typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__;
  l_0.DEBUG_BUILD = _09;
});
var funcBW = E((i_0) => {
  Object.defineProperty(i_0, '__esModule', {
    value: !0,
  });
  var objV1 = funcRQ(),
    objXD = vW(),
    varB = 'Sentry Logger ',
    listVD = ['debug', 'info', 'warn', 'error', 'log', 'assert', 'trace'],
    configCD = {};
  function p_0(A) {
    if (!('console' in objXD.GLOBAL_OBJ)) return A();
    let B = objXD.GLOBAL_OBJ.console,
      Q = {},
      Z = Object.keys(configCD);
    Z.forEach((D) => {
      let G = configCD[D];
      ((Q[D] = B[D]), (B[D] = G));
    });
    try {
      return A();
    } finally {
      Z.forEach((D) => {
        B[D] = Q[D];
      });
    }
  }
  function funcF2() {
    let A = !1,
      B = {
        enable: () => {
          A = !0;
        },
        disable: () => {
          A = !1;
        },
        isEnabled: () => A,
      };
    if (objV1.DEBUG_BUILD)
      listVD.forEach((Q) => {
        B[Q] = (...Z) => {
          if (A)
            p_0(() => {
              objXD.GLOBAL_OBJ.console[Q](`${varB}[${Q}]:`, ...Z);
            });
        };
      });
    else
      listVD.forEach((Q) => {
        B[Q] = () => {
          return;
        };
      });
    return B;
  }
  var varH = funcF2();
  i_0.CONSOLE_LEVELS = listVD;
  i_0.consoleSandbox = p_0;
  i_0.logger = varH;
  i_0.originalConsoleMethods = configCD;
});
var varKD = E((s_0) => {
  Object.defineProperty(s_0, '__esModule', {
    value: !0,
  });
  var objC = funcRQ(),
    objY = funcBW(),
    objL = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
  function checkP(A) {
    return A === 'http' || A === 'https';
  }
  function funcI(A, B = !1) {
    let {
      host: Q,
      path: Z,
      pass: D,
      port: G,
      projectId: F,
      protocol: I,
      publicKey: Y,
    } = A;
    return `${I}://${Y}${B && D ? `:${D}` : ''}@${Q}${G ? `:${G}` : ''}/${Z ? `${Z}/` : Z}${F}`;
  }
  function n_0(A) {
    let B = objL.exec(A);
    if (!B) {
      objY.consoleSandbox(() => {
        console.error(`Invalid Sentry Dsn: ${A}`);
      });
      return;
    }
    let [Q, Z, D = '', G, F = '', I] = B.slice(1),
      Y = '',
      W = I,
      J = W.split('/');
    if (J.length > 1) ((Y = J.slice(0, -1).join('/')), (W = J.pop()));
    if (W) {
      let X = W.match(/^\d+/);
      if (X) W = X[0];
    }
    return a_0({
      host: G,
      pass: D,
      path: Y,
      projectId: W,
      port: F,
      protocol: Q,
      publicKey: Z,
    });
  }
  function a_0(A) {
    return {
      protocol: A.protocol,
      publicKey: A.publicKey || '',
      pass: A.pass || '',
      host: A.host,
      port: A.port || '',
      path: A.path || '',
      projectId: A.projectId,
    };
  }
  function checkN(A) {
    if (!objC.DEBUG_BUILD) return !0;
    let { port: B, projectId: Q, protocol: Z } = A;
    if (
      ['protocol', 'publicKey', 'host', 'projectId'].find((F) => {
        if (!A[F])
          return (objY.logger.error(`Invalid Sentry Dsn: ${F} missing`), !0);
        return !1;
      })
    )
      return !1;
    if (!Q.match(/^\d+$/))
      return (
        objY.logger.error(`Invalid Sentry Dsn: Invalid projectId ${Q}`),
        !1
      );
    if (!checkP(Z))
      return (
        objY.logger.error(`Invalid Sentry Dsn: Invalid protocol ${Z}`),
        !1
      );
    if (B && isNaN(parseInt(B, 10)))
      return (objY.logger.error(`Invalid Sentry Dsn: Invalid port ${B}`), !1);
    return !0;
  }
  function funcA(A) {
    let B = typeof A === 'string' ? n_0(A) : a_0(A);
    if (!B || !checkN(B)) return;
    return B;
  }
  s_0.dsnFromString = n_0;
  s_0.dsnToString = funcI;
  s_0.makeDsn = funcA;
});
var varHD = E((o_0) => {
  Object.defineProperty(o_0, '__esModule', {
    value: !0,
  });
  class r_0 extends Error {
    constructor(A, B = 'warn') {
      super(A);
      ((this.message = A),
        (this.name = new.target.prototype.constructor.name),
        Object.setPrototypeOf(this, new.target.prototype),
        (this.logLevel = B));
    }
  }
  o_0.SentryError = r_0;
});
var funcNH = E((paramDX) => {
  Object.defineProperty(paramDX, '__esModule', {
    value: !0,
  });
  var objE = funcJD(),
    objAA = funcRQ(),
    objPL = iH(),
    objBA = funcBW(),
    t_0 = k21();
  function funcQA(A, B, Q) {
    if (!(B in A)) return;
    let Z = A[B],
      D = Q(Z);
    if (typeof D === 'function') checkQX(D, Z);
    A[B] = D;
  }
  function funcBX(A, B, Q) {
    try {
      Object.defineProperty(A, B, {
        value: Q,
        writable: !0,
        configurable: !0,
      });
    } catch (Z) {
      objAA.DEBUG_BUILD &&
        objBA.logger.log(
          `Failed to add non-enumerable property "${B}" to object`,
          A
        );
    }
  }
  function checkQX(A, B) {
    try {
      let Q = B.prototype || {};
      ((A.prototype = B.prototype = Q), funcBX(A, '__sentry_original__', B));
    } catch (Q) {}
  }
  function funcZA(A) {
    return A.__sentry_original__;
  }
  function funcDA(A) {
    return Object.keys(A)
      .map((B) => `${encodeURIComponent(B)}=${encodeURIComponent(A[B])}`)
      .join('&');
  }
  function funcZX(A) {
    if (objPL.isError(A))
      return {
        message: A.message,
        name: A.name,
        stack: A.stack,
        ...checkAX(A),
      };
    else if (objPL.isEvent(A)) {
      let B = {
        type: A.type,
        target: e_0(A.target),
        currentTarget: e_0(A.currentTarget),
        ...checkAX(A),
      };
      if (
        typeof CustomEvent !== 'undefined' &&
        objPL.isInstanceOf(A, CustomEvent)
      )
        B.detail = A.detail;
      return B;
    } else return A;
  }
  function e_0(A) {
    try {
      return objPL.isElement(A)
        ? objE.htmlTreeAsString(A)
        : Object.prototype.toString.call(A);
    } catch (B) {
      return '<unknown>';
    }
  }
  function checkAX(A) {
    if (typeof A === 'object' && A !== null) {
      let B = {};
      for (let Q in A)
        if (Object.prototype.hasOwnProperty.call(A, Q)) B[Q] = A[Q];
      return B;
    } else return {};
  }
  function funcGA(A, B = 40) {
    let Q = Object.keys(funcZX(A));
    if ((Q.sort(), !Q.length)) return '[object has no keys]';
    if (Q[0].length >= B) return t_0.truncate(Q[0], B);
    for (let Z = Q.length; Z > 0; Z--) {
      let D = Q.slice(0, Z).join(', ');
      if (D.length > B) continue;
      if (Z === Q.length) return D;
      return t_0.truncate(D, B);
    }
    return '';
  }
  function funcFA(A) {
    return checkZD(A, new Map());
  }
  function checkZD(A, B) {
    if (checkIA(A)) {
      let Q = B.get(A);
      if (Q !== void 0) return Q;
      let Z = {};
      B.set(A, Z);
      for (let D of Object.keys(A))
        if (typeof A[D] !== 'undefined') Z[D] = checkZD(A[D], B);
      return Z;
    }
    if (Array.isArray(A)) {
      let Q = B.get(A);
      if (Q !== void 0) return Q;
      let Z = [];
      return (
        B.set(A, Z),
        A.forEach((D) => {
          Z.push(checkZD(D, B));
        }),
        Z
      );
    }
    return A;
  }
  function checkIA(A) {
    if (!objPL.isPlainObject(A)) return !1;
    try {
      let B = Object.getPrototypeOf(A).constructor.name;
      return !B || B === 'Object';
    } catch (B) {
      return !0;
    }
  }
  function funcYA(A) {
    let B;
    switch (!0) {
      case A === void 0 || A === null:
        B = new String(A);
        break;
      case typeof A === 'symbol' || typeof A === 'bigint':
        B = Object(A);
        break;
      case objPL.isPrimitive(A):
        B = new A.constructor(A);
        break;
      default:
        B = A;
        break;
    }
    return B;
  }
  paramDX.addNonEnumerableProperty = funcBX;
  paramDX.convertToPlainObject = funcZX;
  paramDX.dropUndefinedKeys = funcFA;
  paramDX.extractExceptionKeysForMessage = funcGA;
  paramDX.fill = funcQA;
  paramDX.getOriginalFunction = funcZA;
  paramDX.markFunctionWrapped = checkQX;
  paramDX.objectify = funcYA;
  paramDX.urlEncode = funcDA;
});
var funcIJ = E((paramFX) => {
  Object.defineProperty(paramFX, '__esModule', {
    value: !0,
  });
  function checkGX(A, B = !1) {
    return (
      !(
        B ||
        (A &&
          !A.startsWith('/') &&
          !A.match(/^[A-Z]:/) &&
          !A.startsWith('.') &&
          !A.match(/^[a-zA-Z]([a-zA-Z0-9.\-+])*:\/\//))
      ) &&
      A !== void 0 &&
      !A.includes('node_modules/')
    );
  }
  function funcUA(A) {
    let B = /^\s*[-]{4,}$/,
      Q = /at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/;
    return (Z) => {
      let D = Z.match(Q);
      if (D) {
        let G, F, I, Y, W;
        if (D[1]) {
          I = D[1];
          let V = I.lastIndexOf('.');
          if (I[V - 1] === '.') V--;
          if (V > 0) {
            ((G = I.slice(0, V)), (F = I.slice(V + 1)));
            let C = G.indexOf('.Module');
            if (C > 0) ((I = I.slice(C + 1)), (G = G.slice(0, C)));
          }
          Y = void 0;
        }
        if (F) ((Y = G), (W = F));
        if (F === '<anonymous>') ((W = void 0), (I = void 0));
        if (I === void 0) ((W = W || '<anonymous>'), (I = Y ? `${Y}.${W}` : W));
        let J = D[2] && D[2].startsWith('file://') ? D[2].slice(7) : D[2],
          X = D[5] === 'native';
        if (J && J.match(/\/[A-Z]:/)) J = J.slice(1);
        if (!J && D[5] && !X) J = D[5];
        return {
          filename: J,
          module: A ? A(J) : void 0,
          function: I,
          lineno: parseInt(D[3], 10) || void 0,
          colno: parseInt(D[4], 10) || void 0,
          in_app: checkGX(J, X),
        };
      }
      if (Z.match(B))
        return {
          filename: Z,
        };
      return;
    };
  }
  paramFX.filenameIsInApp = checkGX;
  paramFX.node = funcUA;
});
var funcYJ = E((paramCX) => {
  Object.defineProperty(paramCX, '__esModule', {
    value: !0,
  });
  var objWX = funcIJ(),
    numJX = 50,
    objIX = /\(error: (.*)\)/,
    objYX = /captureMessage|captureException/;
  function checkXX(...A) {
    let B = A.sort((Q, Z) => Q[0] - Z[0]).map((Q) => Q[1]);
    return (Q, Z = 0) => {
      let D = [],
        G = Q.split(`
`);
      for (let F = Z; F < G.length; F++) {
        let I = G[F];
        if (I.length > 1024) continue;
        let Y = objIX.test(I) ? I.replace(objIX, '$1') : I;
        if (Y.match(/\S*Error: /)) continue;
        for (let W of B) {
          let J = W(Y);
          if (J) {
            D.push(J);
            break;
          }
        }
        if (D.length >= numJX) break;
      }
      return funcVX(D);
    };
  }
  function funcQA1(A) {
    if (Array.isArray(A)) return checkXX(...A);
    return A;
  }
  function funcVX(A) {
    if (!A.length) return [];
    let B = Array.from(A);
    if (/sentryWrapped/.test(B[B.length - 1].function || '')) B.pop();
    if ((B.reverse(), objYX.test(B[B.length - 1].function || ''))) {
      if ((B.pop(), objYX.test(B[B.length - 1].function || ''))) B.pop();
    }
    return B.slice(0, numJX).map((Q) => ({
      ...Q,
      filename: Q.filename || B[B.length - 1].filename,
      function: Q.function || '?',
    }));
  }
  var varED = '<anonymous>';
  function funcNA(A) {
    try {
      if (!A || typeof A !== 'function') return varED;
      return A.name || varED;
    } catch (B) {
      return varED;
    }
  }
  function funcLA(A) {
    return [90, objWX.node(A)];
  }
  paramCX.filenameIsInApp = objWX.filenameIsInApp;
  paramCX.createStackParser = checkXX;
  paramCX.getFunctionName = funcNA;
  paramCX.nodeStackLineParser = funcLA;
  paramCX.stackParserFromStackParserOptions = funcQA1;
  paramCX.stripSentryFramesAndReverse = funcVX;
});
var XO = E((paramHX) => {
  Object.defineProperty(paramHX, '__esModule', {
    value: !0,
  });
  var objJA = funcRQ(),
    objKA = funcBW(),
    objYA = funcYJ(),
    configSL = {},
    configKX = {};
  function _A9(A, B) {
    ((configSL[A] = configSL[A] || []), configSL[A].push(B));
  }
  function funcXA() {
    Object.keys(configSL).forEach((A) => {
      configSL[A] = void 0;
    });
  }
  function funcVA(A, B) {
    if (!configKX[A]) (B(), (configKX[A] = !0));
  }
  function funcBA(A, B) {
    let Q = A && configSL[A];
    if (!Q) return;
    for (let Z of Q)
      try {
        Z(B);
      } catch (D) {
        objJA.DEBUG_BUILD &&
          objKA.logger.error(
            `Error while triggering instrumentation handler.
Type: ${A}
Name: ${objYA.getFunctionName(Z)}
Error:`,
            D
          );
      }
  }
  paramHX.addHandler = _A9;
  paramHX.maybeInstrument = funcVA;
  paramHX.resetInstrumentationHandlers = funcXA;
  paramHX.triggerHandlers = funcBA;
});
var $d1 = E((paramZX) => {
  Object.defineProperty(paramZX, '__esModule', {
    value: !0,
  });
  var objUD = funcBW(),
    objMA = funcNH(),
    objWJ = vW(),
    objWD = XO();
  function funcDA1(A) {
    (objWD.addHandler('console', A), objWD.maybeInstrument('console', funcCA));
  }
  function funcCA() {
    if (!('console' in objWJ.GLOBAL_OBJ)) return;
    objUD.CONSOLE_LEVELS.forEach(function (A) {
      if (!(A in objWJ.GLOBAL_OBJ.console)) return;
      objMA.fill(objWJ.GLOBAL_OBJ.console, A, function (B) {
        return (
          (objUD.originalConsoleMethods[A] = B),
          function (...Q) {
            let Z = {
              args: Q,
              level: A,
            };
            objWD.triggerHandlers('console', Z);
            let D = objUD.originalConsoleMethods[A];
            D && D.apply(objWJ.GLOBAL_OBJ.console, Q);
          }
        );
      });
    });
  }
  paramZX.addConsoleInstrumentationHandler = funcDA1;
});
var _21 = E((paramUX) => {
  Object.defineProperty(paramUX, '__esModule', {
    value: !0,
  });
  var objPA = nH(),
    objQD = k21(),
    objIA = vW();
  function funcNA1() {
    let A = objIA.GLOBAL_OBJ,
      B = A.crypto || A.msCrypto,
      Q = () => Math.random() * 16;
    try {
      if (B && B.randomUUID) return B.randomUUID().replace(/-/g, '');
      if (B && B.getRandomValues)
        Q = () => {
          let Z = new Uint8Array(1);
          return (B.getRandomValues(Z), Z[0]);
        };
    } catch (Z) {}
    return ([1e7] + 1000 + 4000 + 8000 + 100000000000).replace(/[018]/g, (Z) =>
      (Z ^ ((Q() & 15) >> (Z / 4))).toString(16)
    );
  }
  function funcEX(A) {
    return A.exception && A.exception.values ? A.exception.values[0] : void 0;
  }
  function funcAA(A) {
    let { message: B, event_id: Q } = A;
    if (B) return B;
    let Z = funcEX(A);
    if (Z) {
      if (Z.type && Z.value) return `${Z.type}: ${Z.value}`;
      return Z.type || Z.value || Q || '<unknown>';
    }
    return Q || '<unknown>';
  }
  function funcSA(A, B, Q) {
    let Z = (A.exception = A.exception || {}),
      D = (Z.values = Z.values || []),
      G = (D[0] = D[0] || {});
    if (!G.value) G.value = B || '';
    if (!G.type) G.type = Q || 'Error';
  }
  function funcRA(A, B) {
    let Q = funcEX(A);
    if (!Q) return;
    let Z = {
        type: 'generic',
        handled: !0,
      },
      D = Q.mechanism;
    if (
      ((Q.mechanism = {
        ...Z,
        ...D,
        ...B,
      }),
      B && 'data' in B)
    ) {
      let G = {
        ...(D && D.data),
        ...B.data,
      };
      Q.mechanism.data = G;
    }
  }
  var varOA =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
  function funcTA(A) {
    let B = A.match(varOA) || [],
      Q = parseInt(B[1], 10),
      Z = parseInt(B[2], 10),
      D = parseInt(B[3], 10);
    return {
      buildmetadata: B[5],
      major: isNaN(Q) ? void 0 : Q,
      minor: isNaN(Z) ? void 0 : Z,
      patch: isNaN(D) ? void 0 : D,
      prerelease: B[4],
    };
  }
  function funcEA(A, B, Q = 5) {
    if (B.lineno === void 0) return;
    let Z = A.length,
      D = Math.max(Math.min(Z - 1, B.lineno - 1), 0);
    ((B.pre_context = A.slice(Math.max(0, D - Q), D).map((G) =>
      objQD.snipLine(G, 0)
    )),
      (B.context_line = objQD.snipLine(A[Math.min(Z - 1, D)], B.colno || 0)),
      (B.post_context = A.slice(Math.min(D + 1, Z), D + 1 + Q).map((G) =>
        objQD.snipLine(G, 0)
      )));
  }
  function funcA1(A) {
    if (A && A.__sentry_captured__) return !0;
    try {
      objPA.addNonEnumerableProperty(A, '__sentry_captured__', !0);
    } catch (B) {}
    return !1;
  }
  function funcB1(A) {
    return Array.isArray(A) ? A : [A];
  }
  paramUX.addContextToFrame = funcEA;
  paramUX.addExceptionMechanism = funcRA;
  paramUX.addExceptionTypeValue = funcSA;
  paramUX.arrayify = funcB1;
  paramUX.checkOrSetAlreadyCaught = funcA1;
  paramUX.getEventDescription = funcAA;
  paramUX.parseSemver = funcTA;
  paramUX.uuid4 = funcNA1;
});
var funcRD = E((paramNX) => {
  Object.defineProperty(paramNX, '__esModule', {
    value: !0,
  });
  var objJ = _21(),
    objJJ = nH(),
    objX = vW(),
    objND = XO(),
    objJL = objX.GLOBAL_OBJ,
    numV = 1000,
    varWX,
    varLD,
    varMD;
  function funcC1(A) {
    (objND.addHandler('dom', A), objND.maybeInstrument('dom', funcQX));
  }
  function funcQX() {
    if (!objJL.document) return;
    let A = objND.triggerHandlers.bind(null, 'dom'),
      B = $x0(A, !0);
    (objJL.document.addEventListener('click', B, !1),
      objJL.document.addEventListener('keypress', B, !1),
      ['EventTarget', 'Node'].forEach((Q) => {
        let Z = objJL[Q] && objJL[Q].prototype;
        if (!Z || !Z.hasOwnProperty || !Z.hasOwnProperty('addEventListener'))
          return;
        (objJJ.fill(Z, 'addEventListener', function (D) {
          return function (G, F, I) {
            if (G === 'click' || G == 'keypress')
              try {
                let Y = this,
                  W = (Y.__sentry_instrumentation_handlers__ =
                    Y.__sentry_instrumentation_handlers__ || {}),
                  J = (W[G] = W[G] || {
                    refCount: 0,
                  });
                if (!J.handler) {
                  let X = $x0(A);
                  ((J.handler = X), D.call(this, G, X, I));
                }
                J.refCount++;
              } catch (Y) {}
            return D.call(this, G, F, I);
          };
        }),
          objJJ.fill(Z, 'removeEventListener', function (D) {
            return function (G, F, I) {
              if (G === 'click' || G == 'keypress')
                try {
                  let Y = this,
                    W = Y.__sentry_instrumentation_handlers__ || {},
                    J = W[G];
                  if (J) {
                    if ((J.refCount--, J.refCount <= 0))
                      (D.call(this, G, J.handler, I),
                        (J.handler = void 0),
                        delete W[G]);
                    if (Object.keys(W).length === 0)
                      delete Y.__sentry_instrumentation_handlers__;
                  }
                } catch (Y) {}
              return D.call(this, G, F, I);
            };
          }));
      }));
  }
  function checkK1(A) {
    if (A.type !== varLD) return !1;
    try {
      if (!A.target || A.target._sentryId !== varMD) return !1;
    } catch (B) {}
    return !0;
  }
  function checkH(A, B) {
    if (A !== 'keypress') return !1;
    if (!B || !B.tagName) return !0;
    if (
      B.tagName === 'INPUT' ||
      B.tagName === 'TEXTAREA' ||
      B.isContentEditable
    )
      return !1;
    return !0;
  }
  function $x0(A, B = !1) {
    return (Q) => {
      if (!Q || Q._sentryCaptured) return;
      let Z = funcZ2(Q);
      if (checkH(Q.type, Z)) return;
      if (
        (objJJ.addNonEnumerableProperty(Q, '_sentryCaptured', !0),
        Z && !Z._sentryId)
      )
        objJJ.addNonEnumerableProperty(Z, '_sentryId', objJ.uuid4());
      let D = Q.type === 'keypress' ? 'input' : Q.type;
      if (!checkK1(Q))
        (A({
          event: Q,
          name: D,
          global: B,
        }),
          (varLD = Q.type),
          (varMD = Z ? Z._sentryId : void 0));
      (clearTimeout(varWX),
        (varWX = objJL.setTimeout(() => {
          ((varMD = void 0), (varLD = void 0));
        }, numV)));
    };
  }
  function funcZ2(A) {
    try {
      return A.target;
    } catch (B) {
      return null;
    }
  }
  paramNX.addClickKeypressInstrumentationHandler = funcC1;
  paramNX.instrumentDOM = funcQX;
});
var funcPD = E((paramLX) => {
  Object.defineProperty(paramLX, '__esModule', {
    value: !0,
  });
  var objW = rq(),
    $29 = Bw(),
    objQ1 = vW(),
    q29XJ = objQ1.getGlobalObject();
  function funcN() {
    try {
      return (new ErrorEvent(''), !0);
    } catch (A) {
      return !1;
    }
  }
  function funcL() {
    try {
      return (new DOMError(''), !0);
    } catch (A) {
      return !1;
    }
  }
  function funcM1() {
    try {
      return (new DOMException(''), !0);
    } catch (A) {
      return !1;
    }
  }
  function checkTD() {
    if (!('fetch' in q29XJ)) return !1;
    try {
      return (new Request('http://www.example.com'), !0);
    } catch (A) {
      return !1;
    }
  }
  function checkOD(A) {
    return (
      A && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(A.toString())
    );
  }
  function funcR() {
    if (typeof EdgeRuntime === 'string') return !0;
    if (!checkTD()) return !1;
    if (checkOD(q29XJ.fetch)) return !0;
    let A = !1,
      B = q29XJ.document;
    if (B && typeof B.createElement === 'function')
      try {
        let Q = B.createElement('iframe');
        if (
          ((Q.hidden = !0),
          B.head.appendChild(Q),
          Q.contentWindow && Q.contentWindow.fetch)
        )
          A = checkOD(Q.contentWindow.fetch);
        B.head.removeChild(Q);
      } catch (Q) {
        objW.DEBUG_BUILD &&
          $29.logger.warn(
            'Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ',
            Q
          );
      }
    return A;
  }
  function funcO1() {
    return 'ReportingObserver' in q29XJ;
  }
  function funcT1() {
    if (!checkTD()) return !1;
    try {
      return (
        new Request('_', {
          referrerPolicy: 'origin',
        }),
        !0
      );
    } catch (A) {
      return !1;
    }
  }
  paramLX.isNativeFetch = checkOD;
  paramLX.supportsDOMError = funcL;
  paramLX.supportsDOMException = funcM1;
  paramLX.supportsErrorEvent = funcN;
  paramLX.supportsFetch = checkTD;
  paramLX.supportsNativeFetch = funcR;
  paramLX.supportsReferrerPolicy = funcT1;
  paramLX.supportsReportingObserver = funcO1;
});
var funcJD1 = E((paramTX) => {
  Object.defineProperty(paramTX, '__esModule', {
    value: !0,
  });
  var objB = nH(),
    objF = funcPD(),
    objMX = vW(),
    objX1 = XO();
  function funcH1(A) {
    (objX1.addHandler('fetch', A), objX1.maybeInstrument('fetch', funcG2));
  }
  function funcG2() {
    if (!objF.supportsNativeFetch()) return;
    objB.fill(objMX.GLOBAL_OBJ, 'fetch', function (A) {
      return function (...B) {
        let { method: Q, url: Z } = funcOX(B),
          D = {
            args: B,
            fetchData: {
              method: Q,
              url: Z,
            },
            startTimestamp: Date.now(),
          };
        return (
          objX1.triggerHandlers('fetch', {
            ...D,
          }),
          A.apply(objMX.GLOBAL_OBJ, B).then(
            (G) => {
              let F = {
                ...D,
                endTimestamp: Date.now(),
                response: G,
              };
              return (objX1.triggerHandlers('fetch', F), G);
            },
            (G) => {
              let F = {
                ...D,
                endTimestamp: Date.now(),
                error: G,
              };
              throw (objX1.triggerHandlers('fetch', F), G);
            }
          )
        );
      };
    });
  }
  function checkSD(A, B) {
    return !!A && typeof A === 'object' && !!A[B];
  }
  function checkRX(A) {
    if (typeof A === 'string') return A;
    if (!A) return '';
    if (checkSD(A, 'url')) return A.url;
    if (A.toString) return A.toString();
    return '';
  }
  function funcOX(A) {
    if (A.length === 0)
      return {
        method: 'GET',
        url: '',
      };
    if (A.length === 2) {
      let [Q, Z] = A;
      return {
        url: checkRX(Q),
        method: checkSD(Z, 'method') ? String(Z.method).toUpperCase() : 'GET',
      };
    }
    let B = A[0];
    return {
      url: checkRX(B),
      method: checkSD(B, 'method') ? String(B.method).toUpperCase() : 'GET',
    };
  }
  paramTX.addFetchInstrumentationHandler = funcH1;
  paramTX.parseFetchArgs = funcOX;
});
var _d1 = E((paramPX) => {
  Object.defineProperty(paramPX, '__esModule', {
    value: !0,
  });
  var objKD = vW(),
    objYD = XO(),
    objVJ = null;
  function funcD1(A) {
    (objYD.addHandler('error', A), objYD.maybeInstrument('error', funcC2));
  }
  function funcC2() {
    ((objVJ = objKD.GLOBAL_OBJ.onerror),
      (objKD.GLOBAL_OBJ.onerror = function (A, B, Q, Z, D) {
        let G = {
          column: Z,
          error: D,
          line: Q,
          msg: A,
          url: B,
        };
        if (
          (objYD.triggerHandlers('error', G), objVJ && !objVJ.__SENTRY_LOADER__)
        )
          return objVJ.apply(this, arguments);
        return !1;
      }),
      (objKD.GLOBAL_OBJ.onerror.__SENTRY_INSTRUMENTED__ = !0));
  }
  paramPX.addGlobalErrorInstrumentationHandler = funcD1;
});
var funcBD = E((paramSX) => {
  Object.defineProperty(paramSX, '__esModule', {
    value: !0,
  });
  var objXD1 = vW(),
    objVD = XO(),
    objCJ = null;
  function funcP2(A) {
    (objVD.addHandler('unhandledrejection', A),
      objVD.maybeInstrument('unhandledrejection', funcI1));
  }
  function funcI1() {
    ((objCJ = objXD1.GLOBAL_OBJ.onunhandledrejection),
      (objXD1.GLOBAL_OBJ.onunhandledrejection = function (A) {
        let B = A;
        if (
          (objVD.triggerHandlers('unhandledrejection', B),
          objCJ && !objCJ.__SENTRY_LOADER__)
        )
          return objCJ.apply(this, arguments);
        return !0;
      }),
      (objXD1.GLOBAL_OBJ.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0));
  }
  paramSX.addGlobalUnhandledRejectionInstrumentationHandler = funcP2;
});
var funcFD = E((paramJX) => {
  Object.defineProperty(paramJX, '__esModule', {
    value: !0,
  });
  var objA = vW(),
    a29KJ = objA.getGlobalObject();
  function funcS1() {
    let A = a29KJ.chrome,
      B = A && A.app && A.app.runtime,
      Q =
        'history' in a29KJ &&
        !!a29KJ.history.pushState &&
        !!a29KJ.history.replaceState;
    return !B && Q;
  }
  paramJX.supportsHistory = funcS1;
});
var funcHD = E((paramYX) => {
  Object.defineProperty(paramYX, '__esModule', {
    value: !0,
  });
  var objKX = nH();
  rq();
  Bw();
  var objO = vW(),
    objT = funcFD(),
    objZJ = XO(),
    objV2 = objO.GLOBAL_OBJ,
    varHJ;
  function funcE1(A) {
    (objZJ.addHandler('history', A), objZJ.maybeInstrument('history', funcAB));
  }
  function funcAB() {
    if (!objT.supportsHistory()) return;
    let A = objV2.onpopstate;
    objV2.onpopstate = function (...Q) {
      let Z = objV2.location.href,
        D = varHJ;
      varHJ = Z;
      let G = {
        from: D,
        to: Z,
      };
      if ((objZJ.triggerHandlers('history', G), A))
        try {
          return A.apply(this, Q);
        } catch (F) {}
    };
    function B(Q) {
      return function (...Z) {
        let D = Z.length > 2 ? Z[2] : void 0;
        if (D) {
          let G = varHJ,
            F = String(D);
          varHJ = F;
          let I = {
            from: G,
            to: F,
          };
          objZJ.triggerHandlers('history', I);
        }
        return Q.apply(this, Z);
      };
    }
    (objKX.fill(objV2.history, 'pushState', B),
      objKX.fill(objV2.history, 'replaceState', B));
  }
  paramYX.addHistoryInstrumentationHandler = funcE1;
});
var funcGD = E((paramXX) => {
  Object.defineProperty(paramXX, '__esModule', {
    value: !0,
  });
  var objUJ = iH(),
    objEJ = nH(),
    objQB = vW(),
    objWJ1 = XO(),
    objZB = objQB.GLOBAL_OBJ,
    varB1 = '__sentry_xhr_v3__';
  function funcDB(A) {
    (objWJ1.addHandler('xhr', A), objWJ1.maybeInstrument('xhr', _x0));
  }
  function _x0() {
    if (!objZB.XMLHttpRequest) return;
    let A = XMLHttpRequest.prototype;
    (objEJ.fill(A, 'open', function (B) {
      return function (...Q) {
        let Z = Date.now(),
          D = objUJ.isString(Q[0]) ? Q[0].toUpperCase() : void 0,
          G = funcGB(Q[1]);
        if (!D || !G) return B.apply(this, Q);
        if (
          ((this[varB1] = {
            method: D,
            url: G,
            request_headers: {},
          }),
          D === 'POST' && G.match(/sentry_key/))
        )
          this.__sentry_own_request__ = !0;
        let F = () => {
          let I = this[varB1];
          if (!I) return;
          if (this.readyState === 4) {
            try {
              I.status_code = this.status;
            } catch (W) {}
            let Y = {
              args: [D, G],
              endTimestamp: Date.now(),
              startTimestamp: Z,
              xhr: this,
            };
            objWJ1.triggerHandlers('xhr', Y);
          }
        };
        if (
          'onreadystatechange' in this &&
          typeof this.onreadystatechange === 'function'
        )
          objEJ.fill(this, 'onreadystatechange', function (I) {
            return function (...Y) {
              return (F(), I.apply(this, Y));
            };
          });
        else this.addEventListener('readystatechange', F);
        return (
          objEJ.fill(this, 'setRequestHeader', function (I) {
            return function (...Y) {
              let [W, J] = Y,
                X = this[varB1];
              if (X && objUJ.isString(W) && objUJ.isString(J))
                X.request_headers[W.toLowerCase()] = J;
              return I.apply(this, Y);
            };
          }),
          B.apply(this, Q)
        );
      };
    }),
      objEJ.fill(A, 'send', function (B) {
        return function (...Q) {
          let Z = this[varB1];
          if (!Z) return B.apply(this, Q);
          if (Q[0] !== void 0) Z.body = Q[0];
          let D = {
            args: [Z.method, Z.url],
            startTimestamp: Date.now(),
            xhr: this,
          };
          return (objWJ1.triggerHandlers('xhr', D), B.apply(this, Q));
        };
      }));
  }
  function funcGB(A) {
    if (objUJ.isString(A)) return A;
    try {
      return A.toString();
    } catch (B) {}
    return;
  }
  paramXX.SENTRY_XHR_DATA_KEY = varB1;
  paramXX.addXhrInstrumentationHandler = funcDB;
  paramXX.instrumentXHR = _x0;
});
var varDX = E((paramMX) => {
  Object.defineProperty(paramMX, '__esModule', {
    value: !0,
  });
  var objWB = rq(),
    objJB = Bw(),
    objVX = $d1(),
    objBX = funcRD(),
    objFX = funcJD1(),
    objHX = _d1(),
    objGX = funcBD(),
    objUX = funcHD(),
    objUD1 = funcGD();
  function funcXB(A, B) {
    switch (A) {
      case 'console':
        return objVX.addConsoleInstrumentationHandler(B);
      case 'dom':
        return objBX.addClickKeypressInstrumentationHandler(B);
      case 'xhr':
        return objUD1.addXhrInstrumentationHandler(B);
      case 'fetch':
        return objFX.addFetchInstrumentationHandler(B);
      case 'history':
        return objUX.addHistoryInstrumentationHandler(B);
      case 'error':
        return objHX.addGlobalErrorInstrumentationHandler(B);
      case 'unhandledrejection':
        return objGX.addGlobalUnhandledRejectionInstrumentationHandler(B);
      default:
        objWB.DEBUG_BUILD &&
          objJB.logger.warn('unknown instrumentation type:', A);
    }
  }
  paramMX.addConsoleInstrumentationHandler =
    objVX.addConsoleInstrumentationHandler;
  paramMX.addClickKeypressInstrumentationHandler =
    objBX.addClickKeypressInstrumentationHandler;
  paramMX.addFetchInstrumentationHandler = objFX.addFetchInstrumentationHandler;
  paramMX.addGlobalErrorInstrumentationHandler =
    objHX.addGlobalErrorInstrumentationHandler;
  paramMX.addGlobalUnhandledRejectionInstrumentationHandler =
    objGX.addGlobalUnhandledRejectionInstrumentationHandler;
  paramMX.addHistoryInstrumentationHandler =
    objUX.addHistoryInstrumentationHandler;
  paramMX.SENTRY_XHR_DATA_KEY = objUD1.SENTRY_XHR_DATA_KEY;
  paramMX.addXhrInstrumentationHandler = objUD1.addXhrInstrumentationHandler;
  paramMX.addInstrumentationHandler = funcXB;
});
var funcMD = E((paramCX1) => {
  Object.defineProperty(paramCX1, '__esModule', {
    value: !0,
  });
  function funcQB() {
    return (
      typeof __SENTRY_BROWSER_BUNDLE__ !== 'undefined' &&
      !!__SENTRY_BROWSER_BUNDLE__
    );
  }
  function funcNB() {
    return 'npm';
  }
  paramCX1.getSDKSource = funcNB;
  paramCX1.isBrowserBundle = funcQB;
});
var funcDD = E((paramLX1, paramQJ) => {
  Object.defineProperty(paramLX1, '__esModule', {
    value: !0,
  });
  var objRB = funcMD();
  function funcOB() {
    return (
      !objRB.isBrowserBundle() &&
      Object.prototype.toString.call(
        typeof process !== 'undefined' ? process : 0
      ) === '[object process]'
    );
  }
  function $J1(A, B) {
    return A.require(B);
  }
  function funcTB(A) {
    let B;
    try {
      B = $J1(paramQJ, A);
    } catch (Q) {}
    try {
      let { cwd: Q } = $J1(paramQJ, 'process');
      B = $J1(paramQJ, `${Q()}/node_modules/${A}`);
    } catch (Q) {}
    return B;
  }
  paramLX1.dynamicRequire = $J1;
  paramLX1.isNodeEnv = funcOB;
  paramLX1.loadModule = funcTB;
});
var varNX = E((paramIX) => {
  Object.defineProperty(paramIX, '__esModule', {
    value: !0,
  });
  var objKB = funcDD(),
    objPX = vW();
  function funcYB() {
    return typeof window !== 'undefined' && (!objKB.isNodeEnv() || _B9());
  }
  function _B9() {
    return (
      objPX.GLOBAL_OBJ.process !== void 0 &&
      objPX.GLOBAL_OBJ.process.type === 'renderer'
    );
  }
  paramIX.isBrowser = funcYB;
});
var funcCD = E((paramAX) => {
  Object.defineProperty(paramAX, '__esModule', {
    value: !0,
  });
  function funcVB() {
    let A = typeof WeakSet === 'function',
      B = A ? new WeakSet() : [];
    function Q(D) {
      if (A) {
        if (B.has(D)) return !0;
        return (B.add(D), !1);
      }
      for (let G = 0; G < B.length; G++) if (B[G] === D) return !0;
      return (B.push(D), !1);
    }
    function Z(D) {
      if (A) B.delete(D);
      else
        for (let G = 0; G < B.length; G++)
          if (B[G] === D) {
            B.splice(G, 1);
            break;
          }
    }
    return [Q, Z];
  }
  paramAX.memoBuilder = funcVB;
});
var varF = E((paramOX) => {
  Object.defineProperty(paramOX, '__esModule', {
    value: !0,
  });
  var objLD = iH(),
    objFB = funcCD(),
    objHB = nH(),
    objGB = YJ1();
  function funcSX(A, B = 100, Q = 1 / 0) {
    try {
      return checkNJ('', A, B, Q);
    } catch (Z) {
      return {
        ERROR: `**non-serializable** (${Z})`,
      };
    }
  }
  function checkRX1(A, B = 3, Q = 102400) {
    let Z = funcSX(A, B);
    if (checkCB(Z) > Q) return checkRX1(A, B - 1, Q);
    return Z;
  }
  function checkNJ(A, B, Q = 1 / 0, Z = 1 / 0, D = objFB.memoBuilder()) {
    let [G, F] = D;
    if (
      B == null ||
      (['number', 'boolean', 'string'].includes(typeof B) && !objLD.isNaN(B))
    )
      return B;
    let I = funcUB(A, B);
    if (!I.startsWith('[object ')) return I;
    if (B.__sentry_skip_normalization__) return B;
    let Y =
      typeof B.__sentry_override_normalization_depth__ === 'number'
        ? B.__sentry_override_normalization_depth__
        : Q;
    if (Y === 0) return I.replace('object ', '');
    if (G(B)) return '[Circular ~]';
    let W = B;
    if (W && typeof W.toJSON === 'function')
      try {
        let C = W.toJSON();
        return checkNJ('', C, Y - 1, Z, D);
      } catch (C) {}
    let J = Array.isArray(B) ? [] : {},
      X = 0,
      V = objHB.convertToPlainObject(B);
    for (let C in V) {
      if (!Object.prototype.hasOwnProperty.call(V, C)) continue;
      if (X >= Z) {
        J[C] = '[MaxProperties ~]';
        break;
      }
      let K = V[C];
      ((J[C] = checkNJ(C, K, Y - 1, Z, D)), X++);
    }
    return (F(B), J);
  }
  function funcUB(A, B) {
    try {
      if (A === 'domain' && B && typeof B === 'object' && B._events)
        return '[Domain]';
      if (A === 'domainEmitter') return '[DomainEmitter]';
      if (typeof global !== 'undefined' && B === global) return '[Global]';
      if (typeof window !== 'undefined' && B === window) return '[Window]';
      if (typeof document !== 'undefined' && B === document)
        return '[Document]';
      if (objLD.isVueViewModel(B)) return '[VueViewModel]';
      if (objLD.isSyntheticEvent(B)) return '[SyntheticEvent]';
      if (typeof B === 'number' && B !== B) return '[NaN]';
      if (typeof B === 'function')
        return `[Function: ${objGB.getFunctionName(B)}]`;
      if (typeof B === 'symbol') return `[${String(B)}]`;
      if (typeof B === 'bigint') return `[BigInt: ${String(B)}]`;
      let Q = funcMB(B);
      if (/^HTML(\w*)Element$/.test(Q)) return `[HTMLElement: ${Q}]`;
      return `[object ${Q}]`;
    } catch (Q) {
      return `**non-serializable** (${Q})`;
    }
  }
  function funcMB(A) {
    let B = Object.getPrototypeOf(A);
    return B ? B.constructor.name : 'null prototype';
  }
  function funcDB1(A) {
    return ~-encodeURI(A).split(/%..|./).length;
  }
  function checkCB(A) {
    return funcDB1(JSON.stringify(A));
  }
  function funcLB(A, B) {
    let Q = B.replace(/\\/g, '/').replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'),
      Z = A;
    try {
      Z = decodeURI(A);
    } catch (D) {}
    return Z.replace(/\\/g, '/')
      .replace(/webpack:\/?/g, '')
      .replace(new RegExp(`(file://)?/*${Q}/*`, 'ig'), 'app:///');
  }
  paramOX.normalize = funcSX;
  paramOX.normalizeToSize = checkRX1;
  paramOX.normalizeUrlToBase = funcLB;
  paramOX.walk = checkNJ;
});
var varDV = E((paramZV) => {
  Object.defineProperty(paramZV, '__esModule', {
    value: !0,
  });
  function funcEX1(A, B) {
    let Q = 0;
    for (let Z = A.length - 1; Z >= 0; Z--) {
      let D = A[Z];
      if (D === '.') A.splice(Z, 1);
      else if (D === '..') (A.splice(Z, 1), Q++);
      else if (Q) (A.splice(Z, 1), Q--);
    }
    if (B) for (; Q--; Q) A.unshift('..');
    return A;
  }
  var objSB =
    /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;
  function funcAV(A) {
    let B = A.length > 1024 ? `<truncated>${A.slice(-1024)}` : A,
      Q = objSB.exec(B);
    return Q ? Q.slice(1) : [];
  }
  function funcPD1(...A) {
    let B = '',
      Q = !1;
    for (let Z = A.length - 1; Z >= -1 && !Q; Z--) {
      let D = Z >= 0 ? A[Z] : '/';
      if (!D) continue;
      ((B = `${D}/${B}`), (Q = D.charAt(0) === '/'));
    }
    return (
      (B = funcEX1(
        B.split('/').filter((Z) => !!Z),
        !Q
      ).join('/')),
      (Q ? '/' : '') + B || '.'
    );
  }
  function funcTX(A) {
    let B = 0;
    for (; B < A.length; B++) if (A[B] !== '') break;
    let Q = A.length - 1;
    for (; Q >= 0; Q--) if (A[Q] !== '') break;
    if (B > Q) return [];
    return A.slice(B, Q - B + 1);
  }
  function funcRB(A, B) {
    ((A = funcPD1(A).slice(1)), (B = funcPD1(B).slice(1)));
    let Q = funcTX(A.split('/')),
      Z = funcTX(B.split('/')),
      D = Math.min(Q.length, Z.length),
      G = D;
    for (let I = 0; I < D; I++)
      if (Q[I] !== Z[I]) {
        G = I;
        break;
      }
    let F = [];
    for (let I = G; I < Q.length; I++) F.push('..');
    return ((F = F.concat(Z.slice(G))), F.join('/'));
  }
  function funcBV(A) {
    let B = funcQV(A),
      Q = A.slice(-1) === '/',
      Z = funcEX1(
        A.split('/').filter((D) => !!D),
        !B
      ).join('/');
    if (!Z && !B) Z = '.';
    if (Z && Q) Z += '/';
    return (B ? '/' : '') + Z;
  }
  function funcQV(A) {
    return A.charAt(0) === '/';
  }
  function funcOB1(...A) {
    return funcBV(A.join('/'));
  }
  function funcTB1(A) {
    let B = funcAV(A),
      Q = B[0],
      Z = B[1];
    if (!Q && !Z) return '.';
    if (Z) Z = Z.slice(0, Z.length - 1);
    return Q + Z;
  }
  function funcEB(A, B) {
    let Q = funcAV(A)[2];
    if (B && Q.slice(B.length * -1) === B) Q = Q.slice(0, Q.length - B.length);
    return Q;
  }
  paramZV.basename = funcEB;
  paramZV.dirname = funcTB1;
  paramZV.isAbsolute = funcQV;
  paramZV.join = funcOB1;
  paramZV.normalizePath = funcBV;
  paramZV.relative = funcRB;
  paramZV.resolve = funcPD1;
});
var funcID = E((paramGV) => {
  Object.defineProperty(paramGV, '__esModule', {
    value: !0,
  });
  var objI = iH(),
    VO;
  (function (A) {
    A[(A.PENDING = 0)] = 'PENDING';
    let Q = 1;
    A[(A.RESOLVED = Q)] = 'RESOLVED';
    let Z = 2;
    A[(A.REJECTED = Z)] = 'REJECTED';
  })(VO || (VO = {}));
  function funcY1(A) {
    return new oq((B) => {
      B(A);
    });
  }
  function funcW1(A) {
    return new oq((B, Q) => {
      Q(A);
    });
  }
  class oq {
    constructor(A) {
      (oq.prototype.__init.call(this),
        oq.prototype.__init2.call(this),
        oq.prototype.__init3.call(this),
        oq.prototype.__init4.call(this),
        (this._state = VO.PENDING),
        (this._handlers = []));
      try {
        A(this._resolve, this._reject);
      } catch (B) {
        this._reject(B);
      }
    }
    then(A, B) {
      return new oq((Q, Z) => {
        (this._handlers.push([
          !1,
          (D) => {
            if (!A) Q(D);
            else
              try {
                Q(A(D));
              } catch (G) {
                Z(G);
              }
          },
          (D) => {
            if (!B) Z(D);
            else
              try {
                Q(B(D));
              } catch (G) {
                Z(G);
              }
          },
        ]),
          this._executeHandlers());
      });
    }
    catch(A) {
      return this.then((B) => B, A);
    }
    finally(A) {
      return new oq((B, Q) => {
        let Z, D;
        return this.then(
          (G) => {
            if (((D = !1), (Z = G), A)) A();
          },
          (G) => {
            if (((D = !0), (Z = G), A)) A();
          }
        ).then(() => {
          if (D) {
            Q(Z);
            return;
          }
          B(Z);
        });
      });
    }
    __init() {
      this._resolve = (A) => {
        this._setResult(VO.RESOLVED, A);
      };
    }
    __init2() {
      this._reject = (A) => {
        this._setResult(VO.REJECTED, A);
      };
    }
    __init3() {
      this._setResult = (A, B) => {
        if (this._state !== VO.PENDING) return;
        if (objI.isThenable(B)) {
          B.then(this._resolve, this._reject);
          return;
        }
        ((this._state = A), (this._value = B), this._executeHandlers());
      };
    }
    __init4() {
      this._executeHandlers = () => {
        if (this._state === VO.PENDING) return;
        let A = this._handlers.slice();
        ((this._handlers = []),
          A.forEach((B) => {
            if (B[0]) return;
            if (this._state === VO.RESOLVED) B[1](this._value);
            if (this._state === VO.REJECTED) B[2](this._value);
            B[0] = !0;
          }));
      };
    }
  }
  paramGV.SyncPromise = oq;
  paramGV.rejectedSyncPromise = funcW1;
  paramGV.resolvedSyncPromise = funcY1;
});
var varIV = E((paramFV) => {
  Object.defineProperty(paramFV, '__esModule', {
    value: !0,
  });
  var objC1 = Hd1(),
    objND1 = funcID();
  function funcK2(A) {
    let B = [];
    function Q() {
      return A === void 0 || B.length < A;
    }
    function Z(F) {
      return B.splice(B.indexOf(F), 1)[0];
    }
    function D(F) {
      if (!Q())
        return objND1.rejectedSyncPromise(
          new objC1.SentryError(
            'Not adding Promise because buffer limit was reached.'
          )
        );
      let I = F();
      if (B.indexOf(I) === -1) B.push(I);
      return (
        I.then(() => Z(I)).then(null, () => Z(I).then(null, () => {})),
        I
      );
    }
    function G(F) {
      return new objND1.SyncPromise((I, Y) => {
        let W = B.length;
        if (!W) return I(!0);
        let J = setTimeout(() => {
          if (F && F > 0) I(!1);
        }, F);
        B.forEach((X) => {
          objND1.resolvedSyncPromise(X).then(() => {
            if (!--W) (clearTimeout(J), I(!0));
          }, Y);
        });
      });
    }
    return {
      $: B,
      add: D,
      drain: G,
    };
  }
  paramFV.makePromiseBuffer = funcK2;
});
var varWV = E((paramYV) => {
  Object.defineProperty(paramYV, '__esModule', {
    value: !0,
  });
  function funcZ3(A) {
    let B = {},
      Q = 0;
    while (Q < A.length) {
      let Z = A.indexOf('=', Q);
      if (Z === -1) break;
      let D = A.indexOf(';', Q);
      if (D === -1) D = A.length;
      else if (D < Z) {
        Q = A.lastIndexOf(';', Z - 1) + 1;
        continue;
      }
      let G = A.slice(Q, Z).trim();
      if (B[G] === void 0) {
        let F = A.slice(Z + 1, D).trim();
        if (F.charCodeAt(0) === 34) F = F.slice(1, -1);
        try {
          B[G] = F.indexOf('%') !== -1 ? decodeURIComponent(F) : F;
        } catch (I) {
          B[G] = F;
        }
      }
      Q = D + 1;
    }
    return B;
  }
  paramYV.parseCookie = funcZ3;
});
var varAD = E((paramJV) => {
  Object.defineProperty(paramJV, '__esModule', {
    value: !0,
  });
  function funcU1(A) {
    if (!A) return {};
    let B = A.match(
      /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
    );
    if (!B) return {};
    let Q = B[6] || '',
      Z = B[8] || '';
    return {
      host: B[4],
      path: B[5],
      protocol: B[2],
      search: Q,
      hash: Z,
      relative: B[5] + Q + Z,
    };
  }
  function funcW2(A) {
    return A.split(/[\?#]/, 1)[0];
  }
  function $99(A) {
    return A.split(/\\?\//).filter((B) => B.length > 0 && B !== ',').length;
  }
  function funcQ(A) {
    let { protocol: B, host: Q, path: Z } = A,
      D =
        (Q &&
          Q.replace(/^.*@/, '[filtered]:[filtered]@')
            .replace(/(:80)$/, '')
            .replace(/(:443)$/, '')) ||
        '';
    return `${B ? `${B}://` : ''}${D}${Z}`;
  }
  paramJV.getNumberOfUrlSegments = $99;
  paramJV.getSanitizedUrlString = funcQ;
  paramJV.parseUrl = funcU1;
  paramJV.stripUrlQueryAndFragment = funcW2;
});
var varZV = E((paramHV) => {
  Object.defineProperty(paramHV, '__esModule', {
    value: !0,
  });
  var objO1 = Wv0(),
    objT1 = rq(),
    objXV = iH(),
    objP = Bw(),
    objS = f21(),
    objJ1 = ad1(),
    configK = {
      ip: !1,
      request: !0,
      transaction: !0,
      user: !0,
    },
    listY = ['cookies', 'data', 'headers', 'method', 'query_string', 'url'],
    listVV = ['id', 'username', 'email'];
  function _99(A, B, Q) {
    if (!A) return;
    if (!A.metadata.source || A.metadata.source === 'url') {
      let [Z, D] = checkLJ(B, {
        path: !0,
        method: !0,
      });
      (A.updateName(Z),
        A.setMetadata({
          source: D,
        }));
    }
    if ((A.setAttribute('url', B.originalUrl || B.url), B.baseUrl))
      A.setAttribute('baseUrl', B.baseUrl);
    A.setData('query', checkCV(B, Q));
  }
  function checkLJ(A, B = {}) {
    let Q = A.method && A.method.toUpperCase(),
      Z = '',
      D = 'url';
    if (B.customRoute || A.route)
      ((Z = B.customRoute || `${A.baseUrl || ''}${A.route && A.route.path}`),
        (D = 'route'));
    else if (A.originalUrl || A.url)
      Z = objJ1.stripUrlQueryAndFragment(A.originalUrl || A.url || '');
    let G = '';
    if (B.method && Q) G += Q;
    if (B.method && B.path) G += ' ';
    if (B.path && Z) G += Z;
    return [G, D];
  }
  function checkX(A, B) {
    switch (B) {
      case 'path':
        return checkLJ(A, {
          path: !0,
        })[0];
      case 'handler':
        return (
          (A.route &&
            A.route.stack &&
            A.route.stack[0] &&
            A.route.stack[0].name) ||
          '<anonymous>'
        );
      case 'methodPath':
      default: {
        let Q = A._reconstructedRoute ? A._reconstructedRoute : void 0;
        return checkLJ(A, {
          path: !0,
          method: !0,
          customRoute: Q,
        })[0];
      }
    }
  }
  function checkV(A, B) {
    let Q = {};
    return (
      (Array.isArray(B) ? B : listVV).forEach((D) => {
        if (A && D in A) Q[D] = A[D];
      }),
      Q
    );
  }
  function checkSD1(A, B) {
    let { include: Q = listY, deps: Z } = B || {},
      D = {},
      G = A.headers || {},
      F = A.method,
      I = G.host || A.hostname || A.host || '<no host>',
      Y =
        A.protocol === 'https' || (A.socket && A.socket.encrypted)
          ? 'https'
          : 'http',
      W = A.originalUrl || A.url || '',
      J = W.startsWith(Y) ? W : `${Y}://${I}${W}`;
    return (
      Q.forEach((X) => {
        switch (X) {
          case 'headers': {
            if (((D.headers = G), !Q.includes('cookies')))
              delete D.headers.cookie;
            break;
          }
          case 'method': {
            D.method = F;
            break;
          }
          case 'url': {
            D.url = J;
            break;
          }
          case 'cookies': {
            D.cookies =
              A.cookies || (G.cookie && objO1.parseCookie(G.cookie)) || {};
            break;
          }
          case 'query_string': {
            D.query_string = checkCV(A, Z);
            break;
          }
          case 'data': {
            if (F === 'GET' || F === 'HEAD') break;
            if (A.body !== void 0)
              D.data = objXV.isString(A.body)
                ? A.body
                : JSON.stringify(objS.normalize(A.body));
            break;
          }
          default:
            if ({}.hasOwnProperty.call(A, X)) D[X] = A[X];
        }
      }),
      D
    );
  }
  function funcB2(A, B, Q) {
    let Z = {
      ...configK,
      ...(Q && Q.include),
    };
    if (Z.request) {
      let D = Array.isArray(Z.request)
        ? checkSD1(B, {
            include: Z.request,
            deps: Q && Q.deps,
          })
        : checkSD1(B, {
            deps: Q && Q.deps,
          });
      A.request = {
        ...A.request,
        ...D,
      };
    }
    if (Z.user) {
      let D =
        B.user && objXV.isPlainObject(B.user) ? checkV(B.user, Z.user) : {};
      if (Object.keys(D).length)
        A.user = {
          ...A.user,
          ...D,
        };
    }
    if (Z.ip) {
      let D = B.ip || (B.socket && B.socket.remoteAddress);
      if (D)
        A.user = {
          ...A.user,
          ip_address: D,
        };
    }
    if (Z.transaction && !A.transaction)
      A.transaction = checkX(B, Z.transaction);
    return A;
  }
  function checkCV(A, B) {
    let Q = A.originalUrl || A.url || '';
    if (!Q) return;
    if (Q.startsWith('/')) Q = `http://dogs.are.great${Q}`;
    try {
      return (
        A.query ||
        (typeof URL !== 'undefined' && new URL(Q).search.slice(1)) ||
        (B && B.url && B.url.parse(Q).query) ||
        void 0
      );
    } catch (Z) {
      return;
    }
  }
  function funcKV(A) {
    let B = {};
    try {
      A.forEach((Q, Z) => {
        if (typeof Q === 'string') B[Z] = Q;
      });
    } catch (Q) {
      objT1.DEBUG_BUILD &&
        objP.logger.warn(
          'Sentry failed extracting headers from a request object. If you see this, please file an issue.'
        );
    }
    return B;
  }
  function funcF3(A) {
    let B = funcKV(A.headers);
    return {
      method: A.method,
      url: A.url,
      headers: B,
    };
  }
  paramHV.DEFAULT_USER_INCLUDES = listVV;
  paramHV.addRequestDataToEvent = funcB2;
  paramHV.addRequestDataToTransaction = _99;
  paramHV.extractPathForTransaction = checkLJ;
  paramHV.extractRequestData = checkSD1;
  paramHV.winterCGHeadersToDict = funcKV;
  paramHV.winterCGRequestToRequestData = funcF3;
});
var $v0 = E((paramWV) => {
  Object.defineProperty(paramWV, '__esModule', {
    value: !0,
  });
  var listEV = ['fatal', 'error', 'warning', 'log', 'info', 'debug'];
  function funcP3(A) {
    return funcUV(A);
  }
  function funcUV(A) {
    return A === 'warn' ? 'warning' : listEV.includes(A) ? A : 'log';
  }
  paramWV.severityFromString = funcP3;
  paramWV.severityLevelFromString = funcUV;
  paramWV.validSeverityLevels = listEV;
});
var funcRD1 = E((paramRV) => {
  Object.defineProperty(paramRV, '__esModule', {
    value: !0,
  });
  var objQV = vW(),
    numNV = 1000;
  function checkLV() {
    return Date.now() / numNV;
  }
  function funcS2() {
    let { performance: A } = objQV.GLOBAL_OBJ;
    if (!A || !A.now) return checkLV;
    let B = Date.now() - A.now(),
      Q = A.timeOrigin == null ? B : A.timeOrigin;
    return () => {
      return (Q + A.now()) / numNV;
    };
  }
  var varMV = funcS2(),
    varR = varMV;
  paramRV._browserPerformanceTimeOriginMode = void 0;
  var varO = (() => {
    let { performance: A } = objQV.GLOBAL_OBJ;
    if (!A || !A.now) {
      paramRV._browserPerformanceTimeOriginMode = 'none';
      return;
    }
    let B = 3600000,
      Q = A.now(),
      Z = Date.now(),
      D = A.timeOrigin ? Math.abs(A.timeOrigin + Q - Z) : B,
      G = D < B,
      F = A.timing && A.timing.navigationStart,
      Y = typeof F === 'number' ? Math.abs(F + Q - Z) : B,
      W = Y < B;
    if (G || W)
      if (D <= Y)
        return (
          (paramRV._browserPerformanceTimeOriginMode = 'timeOrigin'),
          A.timeOrigin
        );
      else
        return (
          (paramRV._browserPerformanceTimeOriginMode = 'navigationStart'),
          F
        );
    return ((paramRV._browserPerformanceTimeOriginMode = 'dateNow'), Z);
  })();
  paramRV.browserPerformanceTimeOrigin = varO;
  paramRV.dateTimestampInSeconds = checkLV;
  paramRV.timestampInSeconds = varMV;
  paramRV.timestampWithMs = varR;
});
var funcTD = E((paramSV) => {
  Object.defineProperty(paramSV, '__esModule', {
    value: !0,
  });
  var objQQ = rq(),
    objZQ = iH(),
    objDQ = Bw(),
    varGQ = 'baggage',
    objOD = 'sentry-',
    varTV = /^sentry-/,
    numPV = 8192;
  function funcFQ(A) {
    if (!objZQ.isString(A) && !Array.isArray(A)) return;
    let B = {};
    if (Array.isArray(A))
      B = A.reduce((Z, D) => {
        let G = checkOV(D);
        for (let F of Object.keys(G)) Z[F] = G[F];
        return Z;
      }, {});
    else {
      if (!A) return;
      B = checkOV(A);
    }
    let Q = Object.entries(B).reduce((Z, [D, G]) => {
      if (D.match(varTV)) {
        let F = D.slice(objOD.length);
        Z[F] = G;
      }
      return Z;
    }, {});
    if (Object.keys(Q).length > 0) return Q;
    else return;
  }
  function funcIQ(A) {
    if (!A) return;
    let B = Object.entries(A).reduce((Q, [Z, D]) => {
      if (D) Q[`${objOD}${Z}`] = D;
      return Q;
    }, {});
    return funcYQ(B);
  }
  function checkOV(A) {
    return A.split(',')
      .map((B) => B.split('=').map((Q) => decodeURIComponent(Q.trim())))
      .reduce((B, [Q, Z]) => {
        return ((B[Q] = Z), B);
      }, {});
  }
  function funcYQ(A) {
    if (Object.keys(A).length === 0) return;
    return Object.entries(A).reduce((B, [Q, Z], D) => {
      let G = `${encodeURIComponent(Q)}=${encodeURIComponent(Z)}`,
        F = D === 0 ? G : `${B},${G}`;
      if (F.length > numPV)
        return (
          objQQ.DEBUG_BUILD &&
            objDQ.logger.warn(
              `Not adding key: ${Q} with val: ${Z} to baggage header due to exceeding baggage size limits.`
            ),
          B
        );
      else return F;
    }, '');
  }
  paramSV.BAGGAGE_HEADER_NAME = varGQ;
  paramSV.MAX_BAGGAGE_STRING_LENGTH = numPV;
  paramSV.SENTRY_BAGGAGE_KEY_PREFIX = objOD;
  paramSV.SENTRY_BAGGAGE_KEY_PREFIX_REGEX = varTV;
  paramSV.baggageHeaderToDynamicSamplingContext = funcFQ;
  paramSV.dynamicSamplingContextToSentryBaggageHeader = funcIQ;
});
var _v0 = E((paramYV1) => {
  Object.defineProperty(paramYV1, '__esModule', {
    value: !0,
  });
  var objJV = funcTD(),
    objAH = _21(),
    varKV = new RegExp(
      '^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$'
    );
  function funcED(A) {
    if (!A) return;
    let B = A.match(varKV);
    if (!B) return;
    let Q;
    if (B[3] === '1') Q = !0;
    else if (B[3] === '0') Q = !1;
    return {
      traceId: B[1],
      parentSampled: Q,
      parentSpanId: B[2],
    };
  }
  function funcHQ(A, B) {
    let Q = funcED(A),
      Z = objJV.baggageHeaderToDynamicSamplingContext(B),
      { traceId: D, parentSpanId: G, parentSampled: F } = Q || {};
    if (!Q)
      return {
        traceparentData: Q,
        dynamicSamplingContext: void 0,
        propagationContext: {
          traceId: D || objAH.uuid4(),
          spanId: objAH.uuid4().substring(16),
        },
      };
    else
      return {
        traceparentData: Q,
        dynamicSamplingContext: Z || {},
        propagationContext: {
          traceId: D || objAH.uuid4(),
          parentSpanId: G || objAH.uuid4().substring(16),
          spanId: objAH.uuid4().substring(16),
          sampled: F,
          dsc: Z || {},
        },
      };
  }
  function funcZQ(A, B) {
    let Q = funcED(A),
      Z = objJV.baggageHeaderToDynamicSamplingContext(B),
      { traceId: D, parentSpanId: G, parentSampled: F } = Q || {};
    if (!Q)
      return {
        traceId: D || objAH.uuid4(),
        spanId: objAH.uuid4().substring(16),
      };
    else
      return {
        traceId: D || objAH.uuid4(),
        parentSpanId: G || objAH.uuid4().substring(16),
        spanId: objAH.uuid4().substring(16),
        sampled: F,
        dsc: Z || {},
      };
  }
  function funcEQ(A = objAH.uuid4(), B = objAH.uuid4().substring(16), Q) {
    let Z = '';
    if (Q !== void 0) Z = Q ? '-1' : '-0';
    return `${A}-${B}${Z}`;
  }
  paramYV1.TRACEPARENT_REGEXP = varKV;
  paramYV1.extractTraceparentData = funcED;
  paramYV1.generateSentryTraceHeader = funcEQ;
  paramYV1.propagationContextFromHeaders = funcZQ;
  paramYV1.tracingContextFromHeaders = funcHQ;
});
var funcBC = E((paramBV) => {
  Object.defineProperty(paramBV, '__esModule', {
    value: !0,
  });
  var objLQ = Kd1(),
    objMQ = f21(),
    objXV1 = nH();
  function funcRQ1(A, B = []) {
    return [A, B];
  }
  function funcOQ(A, B) {
    let [Q, Z] = A;
    return [Q, [...Z, B]];
  }
  function funcVV(A, B) {
    let Q = A[1];
    for (let Z of Q) {
      let D = Z[0].type;
      if (B(Z, D)) return !0;
    }
    return !1;
  }
  function funcTQ(A, B) {
    return funcVV(A, (Q, Z) => B.includes(Z));
  }
  function checkAC(A, B) {
    return (B || new TextEncoder()).encode(A);
  }
  function funcPQ(A, B) {
    let [Q, Z] = A,
      D = JSON.stringify(Q);
    function G(F) {
      if (typeof D === 'string')
        D = typeof F === 'string' ? D + F : [checkAC(D, B), F];
      else D.push(typeof F === 'string' ? checkAC(F, B) : F);
    }
    for (let F of Z) {
      let [I, Y] = F;
      if (
        (G(`
${JSON.stringify(I)}
`),
        typeof Y === 'string' || Y instanceof Uint8Array)
      )
        G(Y);
      else {
        let W;
        try {
          W = JSON.stringify(Y);
        } catch (J) {
          W = JSON.stringify(objMQ.normalize(Y));
        }
        G(W);
      }
    }
    return typeof D === 'string' ? D : checkSQ(D);
  }
  function checkSQ(A) {
    let B = A.reduce((D, G) => D + G.length, 0),
      Q = new Uint8Array(B),
      Z = 0;
    for (let D of A) (Q.set(D, Z), (Z += D.length));
    return Q;
  }
  function funcJQ(A, B, Q) {
    let Z = typeof A === 'string' ? B.encode(A) : A;
    function D(Y) {
      let W = Z.subarray(0, Y);
      return ((Z = Z.subarray(Y + 1)), W);
    }
    function G() {
      let Y = Z.indexOf(10);
      if (Y < 0) Y = Z.length;
      return JSON.parse(Q.decode(D(Y)));
    }
    let F = G(),
      I = [];
    while (Z.length) {
      let Y = G(),
        W = typeof Y.length === 'number' ? Y.length : void 0;
      I.push([Y, W ? D(W) : G()]);
    }
    return [F, I];
  }
  function funcKQ(A, B) {
    let Q = typeof A.data === 'string' ? checkAC(A.data, B) : A.data;
    return [
      objXV1.dropUndefinedKeys({
        type: 'attachment',
        length: Q.length,
        filename: A.filename,
        content_type: A.contentType,
        attachment_type: A.attachmentType,
      }),
      Q,
    ];
  }
  var configYQ = {
    session: 'session',
    sessions: 'session',
    attachment: 'attachment',
    transaction: 'transaction',
    event: 'error',
    client_report: 'internal',
    user_report: 'default',
    profile: 'profile',
    replay_event: 'replay',
    replay_recording: 'replay',
    check_in: 'monitor',
    feedback: 'feedback',
    span: 'span',
    statsd: 'metric_bucket',
  };
  function _Q9(A) {
    return configYQ[A];
  }
  function funcXQ(A) {
    if (!A || !A.sdk) return;
    let { name: B, version: Q } = A.sdk;
    return {
      name: B,
      version: Q,
    };
  }
  function funcVQ(A, B, Q, Z) {
    let D =
      A.sdkProcessingMetadata && A.sdkProcessingMetadata.dynamicSamplingContext;
    return {
      event_id: A.event_id,
      sent_at: new Date().toISOString(),
      ...(B && {
        sdk: B,
      }),
      ...(!!Q &&
        Z && {
          dsn: objLQ.dsnToString(Z),
        }),
      ...(D && {
        trace: objXV1.dropUndefinedKeys({
          ...D,
        }),
      }),
    };
  }
  paramBV.addItemToEnvelope = funcOQ;
  paramBV.createAttachmentEnvelopeItem = funcKQ;
  paramBV.createEnvelope = funcRQ1;
  paramBV.createEventEnvelopeHeaders = funcVQ;
  paramBV.envelopeContainsItemType = funcTQ;
  paramBV.envelopeItemTypeToDataCategory = _Q9;
  paramBV.forEachEnvelopeItem = funcVV;
  paramBV.getSdkMetadataForEnvelopeHeader = funcXQ;
  paramBV.parseEnvelope = funcJQ;
  paramBV.serializeEnvelope = funcPQ;
});
var varHV = E((paramFV1) => {
  Object.defineProperty(paramFV1, '__esModule', {
    value: !0,
  });
  var objIQ = funcBC(),
    objNQ = funcRD1();
  function funcAQ(A, B, Q) {
    let Z = [
      {
        type: 'client_report',
      },
      {
        timestamp: Q || objNQ.dateTimestampInSeconds(),
        discarded_events: A,
      },
    ];
    return objIQ.createEnvelope(
      B
        ? {
            dsn: B,
          }
        : {},
      [Z]
    );
  }
  paramFV1.createClientReportEnvelope = funcAQ;
});
var varCV = E((paramDV) => {
  Object.defineProperty(paramDV, '__esModule', {
    value: !0,
  });
  var numGV = 60000;
  function checkUV(A, B = Date.now()) {
    let Q = parseInt(`${A}`, 10);
    if (!isNaN(Q)) return Q * 1000;
    let Z = Date.parse(`${A}`);
    if (!isNaN(Z)) return Z - B;
    return numGV;
  }
  function funcMV(A, B) {
    return A[B] || A.all || 0;
  }
  function funcRQ2(A, B, Q = Date.now()) {
    return funcMV(A, B) > Q;
  }
  function funcOQ1(A, { statusCode: B, headers: Q }, Z = Date.now()) {
    let D = {
        ...A,
      },
      G = Q && Q['x-sentry-rate-limits'],
      F = Q && Q['retry-after'];
    if (G)
      for (let I of G.trim().split(',')) {
        let [Y, W, , , J] = I.split(':', 5),
          X = parseInt(Y, 10),
          V = (!isNaN(X) ? X : 60) * 1000;
        if (!W) D.all = Z + V;
        else
          for (let C of W.split(';'))
            if (C === 'metric_bucket') {
              if (!J || J.split(';').includes('custom')) D[C] = Z + V;
            } else D[C] = Z + V;
      }
    else if (F) D.all = Z + checkUV(F, Z);
    else if (B === 429) D.all = Z + 60000;
    return D;
  }
  paramDV.DEFAULT_RETRY_AFTER = numGV;
  paramDV.disabledUntil = funcMV;
  paramDV.isRateLimited = funcRQ2;
  paramDV.parseRetryAfterHeader = checkUV;
  paramDV.updateRateLimits = funcOQ1;
});
var varNV = E((paramIV) => {
  Object.defineProperty(paramIV, '__esModule', {
    value: !0,
  });
  function checkLV1(A, B, Q) {
    let Z = B.match(/([a-z_]+)\.(.*)/i);
    if (Z === null) A[B] = Q;
    else {
      let D = A[Z[1]];
      checkLV1(D, Z[2], Q);
    }
  }
  function funcZ4(A, B, Q = {}) {
    return Array.isArray(B) ? checkPV(A, B, Q) : checkD(A, B, Q);
  }
  function checkPV(A, B, Q) {
    let Z = B.find((D) => D.name === A.name);
    if (Z) {
      for (let [D, G] of Object.entries(Q)) checkLV1(Z, D, G);
      return B;
    }
    return [...B, A];
  }
  function checkD(A, B, Q) {
    return (D) => {
      let G = B(D);
      if (A.allowExclusionByUser) {
        if (!G.find((I) => I.name === A.name)) return G;
      }
      return checkPV(A, G, Q);
    };
  }
  paramIV.addOrUpdateIntegration = funcZ4;
});
