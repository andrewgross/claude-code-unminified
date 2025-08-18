/* chunk:37 bytes:[1056919, 1075974) size:19055 source:unpacked-cli.js */
var uB1 = E((Ya8, ea0) => {
    ea0.exports = (A, B = process.argv) => {
        let Q = A.startsWith("-") ? "" : A.length === 1 ? "-" : "--",
            Z = B.indexOf(Q + A),
            D = B.indexOf("--");
        return Z !== -1 && (D === -1 || Z < D)
    }
});
var Qs0 = E((Wa8, Bs0) => {
    var Rj9 = W1("os"),
        As0 = W1("tty"),
        Az = uB1(),
        {
            env: II
        } = process,
        PV1;
    if (Az("no-color") || Az("no-colors") || Az("color=false") || Az("color=never")) PV1 = 0;
    else if (Az("color") || Az("colors") || Az("color=true") || Az("color=always")) PV1 = 1;

    function Oj9() {
        if ("FORCE_COLOR" in II) {
            if (II.FORCE_COLOR === "true") return 1;
            if (II.FORCE_COLOR === "false") return 0;
            return II.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(II.FORCE_COLOR, 10), 3)
        }
    }

    function Tj9(A) {
        if (A === 0) return !1;
        return {
            level: A,
            hasBasic: !0,
            has256: A >= 2,
            has16m: A >= 3
        }
    }

    function Pj9(A, {
        streamIsTTY: B,
        sniffFlags: Q = !0
    } = {}) {
        let Z = Oj9();
        if (Z !== void 0) PV1 = Z;
        let D = Q ? PV1 : Z;
        if (D === 0) return 0;
        if (Q) {
            if (Az("color=16m") || Az("color=full") || Az("color=truecolor")) return 3;
            if (Az("color=256")) return 2
        }
        if (A && !B && D === void 0) return 0;
        let G = D || 0;
        if (II.TERM === "dumb") return G;
        if (process.platform === "win32") {
            let F = Rj9.release().split(".");
            if (Number(F[0]) >= 10 && Number(F[2]) >= 10586) return Number(F[2]) >= 14931 ? 3 : 2;
            return 1
        }
        if ("CI" in II) {
            if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE", "DRONE"].some((F) => (F in II)) || II.CI_NAME === "codeship") return 1;
            return G
        }
        if ("TEAMCITY_VERSION" in II) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(II.TEAMCITY_VERSION) ? 1 : 0;
        if (II.COLORTERM === "truecolor") return 3;
        if ("TERM_PROGRAM" in II) {
            let F = Number.parseInt((II.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
            switch (II.TERM_PROGRAM) {
                case "iTerm.app":
                    return F >= 3 ? 3 : 2;
                case "Apple_Terminal":
                    return 2
            }
        }
        if (/-256(color)?$/i.test(II.TERM)) return 2;
        if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(II.TERM)) return 1;
        if ("COLORTERM" in II) return 1;
        return G
    }

    function rp1(A, B = {}) {
        let Q = Pj9(A, {
            streamIsTTY: A && A.isTTY,
            ...B
        });
        return Tj9(Q)
    }
    Bs0.exports = {
        supportsColor: rp1,
        stdout: rp1({
            isTTY: As0.isatty(1)
        }),
        stderr: rp1({
            isTTY: As0.isatty(2)
        })
    }
});
var Fs0 = E((Ds0, jV1) => {
    var Sj9 = W1("tty"),
        SV1 = W1("util");
    Ds0.init = bj9;
    Ds0.log = _j9;
    Ds0.formatArgs = kj9;
    Ds0.save = xj9;
    Ds0.load = vj9;
    Ds0.useColors = jj9;
    Ds0.destroy = SV1.deprecate(() => {}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    Ds0.colors = [6, 2, 3, 4, 5, 1];
    try {
        let A = Qs0();
        if (A && (A.stderr || A).level >= 2) Ds0.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221]
    } catch (A) {}
    Ds0.inspectOpts = Object.keys(process.env).filter((A) => {
        return /^debug_/i.test(A)
    }).reduce((A, B) => {
        let Q = B.substring(6).toLowerCase().replace(/_([a-z])/g, (D, G) => {
                return G.toUpperCase()
            }),
            Z = process.env[B];
        if (/^(yes|on|true|enabled)$/i.test(Z)) Z = !0;
        else if (/^(no|off|false|disabled)$/i.test(Z)) Z = !1;
        else if (Z === "null") Z = null;
        else Z = Number(Z);
        return A[Q] = Z, A
    }, {});

    function jj9() {
        return "colors" in Ds0.inspectOpts ? Boolean(Ds0.inspectOpts.colors) : Sj9.isatty(process.stderr.fd)
    }

    function kj9(A) {
        let {
            namespace: B,
            useColors: Q
        } = this;
        if (Q) {
            let Z = this.color,
                D = "\x1B[3" + (Z < 8 ? Z : "8;5;" + Z),
                G = `  ${D};1m${B} \x1B[0m`;
            A[0] = G + A[0].split(`
`).join(`
` + G), A.push(D + "m+" + jV1.exports.humanize(this.diff) + "\x1B[0m")
        } else A[0] = yj9() + B + " " + A[0]
    }

    function yj9() {
        if (Ds0.inspectOpts.hideDate) return "";
        return new Date().toISOString() + " "
    }

    function _j9(...A) {
        return process.stderr.write(SV1.formatWithOptions(Ds0.inspectOpts, ...A) + `
`)
    }

    function xj9(A) {
        if (A) process.env.DEBUG = A;
        else delete process.env.DEBUG
    }

    function vj9() {
        return process.env.DEBUG
    }

    function bj9(A) {
        A.inspectOpts = {};
        let B = Object.keys(Ds0.inspectOpts);
        for (let Q = 0; Q < B.length; Q++) A.inspectOpts[B[Q]] = Ds0.inspectOpts[B[Q]]
    }
    jV1.exports = sp1()(Ds0);
    var {
        formatters: Zs0
    } = jV1.exports;
    Zs0.o = function(A) {
        return this.inspectOpts.colors = this.useColors, SV1.inspect(A, this.inspectOpts).split(`
`).map((B) => B.trim()).join(" ")
    };
    Zs0.O = function(A) {
        return this.inspectOpts.colors = this.useColors, SV1.inspect(A, this.inspectOpts)
    }
});
var mB1 = E((Xa8, op1) => {
    if (typeof process === "undefined" || process.type === "renderer" || !1 || process.__nwjs) op1.exports = ta0();
    else op1.exports = Fs0()
});
var Ys0 = E((Va8, Is0) => {
    var dB1;
    Is0.exports = function() {
        if (!dB1) {
            try {
                dB1 = mB1()("follow-redirects")
            } catch (A) {}
            if (typeof dB1 !== "function") dB1 = function() {}
        }
        dB1.apply(null, arguments)
    }
});
var Cs0 = E((Ca8, Wi1) => {
    var lB1 = W1("url"),
        cB1 = lB1.URL,
        lj9 = W1("http"),
        pj9 = W1("https"),
        Qi1 = W1("stream").Writable,
        Zi1 = W1("assert"),
        Ws0 = Ys0();
    (function A() {
        var B = typeof process !== "undefined",
            Q = typeof window !== "undefined" && typeof document !== "undefined",
            Z = Zh(Error.captureStackTrace);
        if (!B && (Q || !Z)) console.warn("The follow-redirects package should be excluded from browser builds.")
    })();
    var Di1 = !1;
    try {
        Zi1(new cB1(""))
    } catch (A) {
        Di1 = A.code === "ERR_INVALID_URL"
    }
    var ij9 = ["auth", "host", "hostname", "href", "path", "pathname", "port", "protocol", "query", "search", "hash"],
        Gi1 = ["abort", "aborted", "connect", "error", "socket", "timeout"],
        Fi1 = Object.create(null);
    Gi1.forEach(function(A) {
        Fi1[A] = function(B, Q, Z) {
            this._redirectable.emit(A, B, Q, Z)
        }
    });
    var ep1 = pB1("ERR_INVALID_URL", "Invalid URL", TypeError),
        Ai1 = pB1("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed"),
        nj9 = pB1("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded", Ai1),
        aj9 = pB1("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit"),
        sj9 = pB1("ERR_STREAM_WRITE_AFTER_END", "write after end"),
        rj9 = Qi1.prototype.destroy || Xs0;

    function JV(A, B) {
        if (Qi1.call(this), this._sanitizeOptions(A), this._options = A, this._ended = !1, this._ending = !1, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], B) this.on("response", B);
        var Q = this;
        this._onNativeResponse = function(Z) {
            try {
                Q._processResponse(Z)
            } catch (D) {
                Q.emit("error", D instanceof Ai1 ? D : new Ai1({
                    cause: D
                }))
            }
        }, this._performRequest()
    }
    JV.prototype = Object.create(Qi1.prototype);
    JV.prototype.abort = function() {
        Yi1(this._currentRequest), this._currentRequest.abort(), this.emit("abort")
    };
    JV.prototype.destroy = function(A) {
        return Yi1(this._currentRequest, A), rj9.call(this, A), this
    };
    JV.prototype.write = function(A, B, Q) {
        if (this._ending) throw new sj9;
        if (!Qh(A) && !ej9(A)) throw new TypeError("data should be a string, Buffer or Uint8Array");
        if (Zh(B)) Q = B, B = null;
        if (A.length === 0) {
            if (Q) Q();
            return
        }
        if (this._requestBodyLength + A.length <= this._options.maxBodyLength) this._requestBodyLength += A.length, this._requestBodyBuffers.push({
            data: A,
            encoding: B
        }), this._currentRequest.write(A, B, Q);
        else this.emit("error", new aj9), this.abort()
    };
    JV.prototype.end = function(A, B, Q) {
        if (Zh(A)) Q = A, A = B = null;
        else if (Zh(B)) Q = B, B = null;
        if (!A) this._ended = this._ending = !0, this._currentRequest.end(null, null, Q);
        else {
            var Z = this,
                D = this._currentRequest;
            this.write(A, B, function() {
                Z._ended = !0, D.end(null, null, Q)
            }), this._ending = !0
        }
    };
    JV.prototype.setHeader = function(A, B) {
        this._options.headers[A] = B, this._currentRequest.setHeader(A, B)
    };
    JV.prototype.removeHeader = function(A) {
        delete this._options.headers[A], this._currentRequest.removeHeader(A)
    };
    JV.prototype.setTimeout = function(A, B) {
        var Q = this;

        function Z(F) {
            F.setTimeout(A), F.removeListener("timeout", F.destroy), F.addListener("timeout", F.destroy)
        }

        function D(F) {
            if (Q._timeout) clearTimeout(Q._timeout);
            Q._timeout = setTimeout(function() {
                Q.emit("timeout"), G()
            }, A), Z(F)
        }

        function G() {
            if (Q._timeout) clearTimeout(Q._timeout), Q._timeout = null;
            if (Q.removeListener("abort", G), Q.removeListener("error", G), Q.removeListener("response", G), Q.removeListener("close", G), B) Q.removeListener("timeout", B);
            if (!Q.socket) Q._currentRequest.removeListener("socket", D)
        }
        if (B) this.on("timeout", B);
        if (this.socket) D(this.socket);
        else this._currentRequest.once("socket", D);
        return this.on("socket", Z), this.on("abort", G), this.on("error", G), this.on("response", G), this.on("close", G), this
    };
    ["flushHeaders", "getHeader", "setNoDelay", "setSocketKeepAlive"].forEach(function(A) {
        JV.prototype[A] = function(B, Q) {
            return this._currentRequest[A](B, Q)
        }
    });
    ["aborted", "connection", "socket"].forEach(function(A) {
        Object.defineProperty(JV.prototype, A, {
            get: function() {
                return this._currentRequest[A]
            }
        })
    });
    JV.prototype._sanitizeOptions = function(A) {
        if (!A.headers) A.headers = {};
        if (A.host) {
            if (!A.hostname) A.hostname = A.host;
            delete A.host
        }
        if (!A.pathname && A.path) {
            var B = A.path.indexOf("?");
            if (B < 0) A.pathname = A.path;
            else A.pathname = A.path.substring(0, B), A.search = A.path.substring(B)
        }
    };
    JV.prototype._performRequest = function() {
        var A = this._options.protocol,
            B = this._options.nativeProtocols[A];
        if (!B) throw new TypeError("Unsupported protocol " + A);
        if (this._options.agents) {
            var Q = A.slice(0, -1);
            this._options.agent = this._options.agents[Q]
        }
        var Z = this._currentRequest = B.request(this._options, this._onNativeResponse);
        Z._redirectable = this;
        for (var D of Gi1) Z.on(D, Fi1[D]);
        if (this._currentUrl = /^\//.test(this._options.path) ? lB1.format(this._options) : this._options.path, this._isRedirect) {
            var G = 0,
                F = this,
                I = this._requestBodyBuffers;
            (function Y(W) {
                if (Z === F._currentRequest) {
                    if (W) F.emit("error", W);
                    else if (G < I.length) {
                        var J = I[G++];
                        if (!Z.finished) Z.write(J.data, J.encoding, Y)
                    } else if (F._ended) Z.end()
                }
            })()
        }
    };
    JV.prototype._processResponse = function(A) {
        var B = A.statusCode;
        if (this._options.trackRedirects) this._redirects.push({
            url: this._currentUrl,
            headers: A.headers,
            statusCode: B
        });
        var Q = A.headers.location;
        if (!Q || this._options.followRedirects === !1 || B < 300 || B >= 400) {
            A.responseUrl = this._currentUrl, A.redirects = this._redirects, this.emit("response", A), this._requestBodyBuffers = [];
            return
        }
        if (Yi1(this._currentRequest), A.destroy(), ++this._redirectCount > this._options.maxRedirects) throw new nj9;
        var Z, D = this._options.beforeRedirect;
        if (D) Z = Object.assign({
            Host: A.req.getHeader("host")
        }, this._options.headers);
        var G = this._options.method;
        if ((B === 301 || B === 302) && this._options.method === "POST" || B === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) this._options.method = "GET", this._requestBodyBuffers = [], tp1(/^content-/i, this._options.headers);
        var F = tp1(/^host$/i, this._options.headers),
            I = Ii1(this._currentUrl),
            Y = F || I.host,
            W = /^\w+:/.test(Q) ? this._currentUrl : lB1.format(Object.assign(I, {
                host: Y
            })),
            J = oj9(Q, W);
        if (Ws0("redirecting to", J.href), this._isRedirect = !0, Bi1(J, this._options), J.protocol !== I.protocol && J.protocol !== "https:" || J.host !== Y && !tj9(J.host, Y)) tp1(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers);
        if (Zh(D)) {
            var X = {
                    headers: A.headers,
                    statusCode: B
                },
                V = {
                    url: W,
                    method: G,
                    headers: Z
                };
            D(this._options, X, V), this._sanitizeOptions(this._options)
        }
        this._performRequest()
    };

    function Js0(A) {
        var B = {
                maxRedirects: 21,
                maxBodyLength: 10485760
            },
            Q = {};
        return Object.keys(A).forEach(function(Z) {
            var D = Z + ":",
                G = Q[D] = A[Z],
                F = B[Z] = Object.create(G);

            function I(W, J, X) {
                if (Ak9(W)) W = Bi1(W);
                else if (Qh(W)) W = Bi1(Ii1(W));
                else X = J, J = Vs0(W), W = {
                    protocol: D
                };
                if (Zh(J)) X = J, J = null;
                if (J = Object.assign({
                        maxRedirects: B.maxRedirects,
                        maxBodyLength: B.maxBodyLength
                    }, W, J), J.nativeProtocols = Q, !Qh(J.host) && !Qh(J.hostname)) J.hostname = "::1";
                return Zi1.equal(J.protocol, D, "protocol mismatch"), Ws0("options", J), new JV(J, X)
            }

            function Y(W, J, X) {
                var V = F.request(W, J, X);
                return V.end(), V
            }
            Object.defineProperties(F, {
                request: {
                    value: I,
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                },
                get: {
                    value: Y,
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }
            })
        }), B
    }

    function Xs0() {}

    function Ii1(A) {
        var B;
        if (Di1) B = new cB1(A);
        else if (B = Vs0(lB1.parse(A)), !Qh(B.protocol)) throw new ep1({
            input: A
        });
        return B
    }

    function oj9(A, B) {
        return Di1 ? new cB1(A, B) : Ii1(lB1.resolve(B, A))
    }

    function Vs0(A) {
        if (/^\[/.test(A.hostname) && !/^\[[:0-9a-f]+\]$/i.test(A.hostname)) throw new ep1({
            input: A.href || A
        });
        if (/^\[/.test(A.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(A.host)) throw new ep1({
            input: A.href || A
        });
        return A
    }

    function Bi1(A, B) {
        var Q = B || {};
        for (var Z of ij9) Q[Z] = A[Z];
        if (Q.hostname.startsWith("[")) Q.hostname = Q.hostname.slice(1, -1);
        if (Q.port !== "") Q.port = Number(Q.port);
        return Q.path = Q.search ? Q.pathname + Q.search : Q.pathname, Q
    }

    function tp1(A, B) {
        var Q;
        for (var Z in B)
            if (A.test(Z)) Q = B[Z], delete B[Z];
        return Q === null || typeof Q === "undefined" ? void 0 : String(Q).trim()
    }

    function pB1(A, B, Q) {
        function Z(D) {
            if (Zh(Error.captureStackTrace)) Error.captureStackTrace(this, this.constructor);
            Object.assign(this, D || {}), this.code = A, this.message = this.cause ? B + ": " + this.cause.message : B
        }
        return Z.prototype = new(Q || Error), Object.defineProperties(Z.prototype, {
            constructor: {
                value: Z,
                enumerable: !1
            },
            name: {
                value: "Error [" + A + "]",
                enumerable: !1
            }
        }), Z
    }

    function Yi1(A, B) {
        for (var Q of Gi1) A.removeListener(Q, Fi1[Q]);
        A.on("error", Xs0), A.destroy(B)
    }

    function tj9(A, B) {
        Zi1(Qh(A) && Qh(B));
        var Q = A.length - B.length - 1;
        return Q > 0 && A[Q] === "." && A.endsWith(B)
    }

    function Qh(A) {
        return typeof A === "string" || A instanceof String
    }

    function Zh(A) {
        return typeof A === "function"
    }

    function ej9(A) {
        return typeof A === "object" && "length" in A
    }

    function Ak9(A) {
        return cB1 && A instanceof cB1
    }
    Wi1.exports = Js0({
        http: lj9,
        https: pj9
    });
    Wi1.exports.wrap = Js0
});