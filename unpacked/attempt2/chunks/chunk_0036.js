/* chunk:36 bytes:[1037004, 1056918) size:19914 source:unpacked-cli.js */
var ka0 = E((Qn8, ja0) => {
    var fp1 = xi0(),
        OS9 = W1("util"),
        xp1 = W1("path"),
        TS9 = W1("http"),
        PS9 = W1("https"),
        SS9 = W1("url").parse,
        jS9 = W1("fs"),
        kS9 = W1("stream").Stream,
        vp1 = di0(),
        yS9 = Gn0(),
        _S9 = Ta0(),
        bp1 = Sa0();
    ja0.exports = G8;
    OS9.inherits(G8, fp1);

    function G8(A) {
        if (!(this instanceof G8)) return new G8(A);
        this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], fp1.call(this), A = A || {};
        for (var B in A) this[B] = A[B]
    }
    G8.LINE_BREAK = `\r
`;
    G8.DEFAULT_CONTENT_TYPE = "application/octet-stream";
    G8.prototype.append = function(A, B, Q) {
        if (Q = Q || {}, typeof Q == "string") Q = {
            filename: Q
        };
        var Z = fp1.prototype.append.bind(this);
        if (typeof B == "number") B = "" + B;
        if (Array.isArray(B)) {
            this._error(new Error("Arrays are not supported."));
            return
        }
        var D = this._multiPartHeader(A, B, Q),
            G = this._multiPartFooter();
        Z(D), Z(B), Z(G), this._trackLength(D, B, Q)
    };
    G8.prototype._trackLength = function(A, B, Q) {
        var Z = 0;
        if (Q.knownLength != null) Z += +Q.knownLength;
        else if (Buffer.isBuffer(B)) Z = B.length;
        else if (typeof B === "string") Z = Buffer.byteLength(B);
        if (this._valueLength += Z, this._overheadLength += Buffer.byteLength(A) + G8.LINE_BREAK.length, !B || !B.path && !(B.readable && Object.prototype.hasOwnProperty.call(B, "httpVersion")) && !(B instanceof kS9)) return;
        if (!Q.knownLength) this._valuesToMeasure.push(B)
    };
    G8.prototype._lengthRetriever = function(A, B) {
        if (Object.prototype.hasOwnProperty.call(A, "fd"))
            if (A.end != null && A.end != 1 / 0 && A.start != null) B(null, A.end + 1 - (A.start ? A.start : 0));
            else jS9.stat(A.path, function(Q, Z) {
                var D;
                if (Q) {
                    B(Q);
                    return
                }
                D = Z.size - (A.start ? A.start : 0), B(null, D)
            });
        else if (Object.prototype.hasOwnProperty.call(A, "httpVersion")) B(null, +A.headers["content-length"]);
        else if (Object.prototype.hasOwnProperty.call(A, "httpModule")) A.on("response", function(Q) {
            A.pause(), B(null, +Q.headers["content-length"])
        }), A.resume();
        else B("Unknown stream")
    };
    G8.prototype._multiPartHeader = function(A, B, Q) {
        if (typeof Q.header == "string") return Q.header;
        var Z = this._getContentDisposition(B, Q),
            D = this._getContentType(B, Q),
            G = "",
            F = {
                "Content-Disposition": ["form-data", 'name="' + A + '"'].concat(Z || []),
                "Content-Type": [].concat(D || [])
            };
        if (typeof Q.header == "object") bp1(F, Q.header);
        var I;
        for (var Y in F)
            if (Object.prototype.hasOwnProperty.call(F, Y)) {
                if (I = F[Y], I == null) continue;
                if (!Array.isArray(I)) I = [I];
                if (I.length) G += Y + ": " + I.join("; ") + G8.LINE_BREAK
            } return "--" + this.getBoundary() + G8.LINE_BREAK + G + G8.LINE_BREAK
    };
    G8.prototype._getContentDisposition = function(A, B) {
        var Q, Z;
        if (typeof B.filepath === "string") Q = xp1.normalize(B.filepath).replace(/\\/g, "/");
        else if (B.filename || A.name || A.path) Q = xp1.basename(B.filename || A.name || A.path);
        else if (A.readable && Object.prototype.hasOwnProperty.call(A, "httpVersion")) Q = xp1.basename(A.client._httpMessage.path || "");
        if (Q) Z = 'filename="' + Q + '"';
        return Z
    };
    G8.prototype._getContentType = function(A, B) {
        var Q = B.contentType;
        if (!Q && A.name) Q = vp1.lookup(A.name);
        if (!Q && A.path) Q = vp1.lookup(A.path);
        if (!Q && A.readable && Object.prototype.hasOwnProperty.call(A, "httpVersion")) Q = A.headers["content-type"];
        if (!Q && (B.filepath || B.filename)) Q = vp1.lookup(B.filepath || B.filename);
        if (!Q && typeof A == "object") Q = G8.DEFAULT_CONTENT_TYPE;
        return Q
    };
    G8.prototype._multiPartFooter = function() {
        return function(A) {
            var B = G8.LINE_BREAK,
                Q = this._streams.length === 0;
            if (Q) B += this._lastBoundary();
            A(B)
        }.bind(this)
    };
    G8.prototype._lastBoundary = function() {
        return "--" + this.getBoundary() + "--" + G8.LINE_BREAK
    };
    G8.prototype.getHeaders = function(A) {
        var B, Q = {
            "content-type": "multipart/form-data; boundary=" + this.getBoundary()
        };
        for (B in A)
            if (Object.prototype.hasOwnProperty.call(A, B)) Q[B.toLowerCase()] = A[B];
        return Q
    };
    G8.prototype.setBoundary = function(A) {
        this._boundary = A
    };
    G8.prototype.getBoundary = function() {
        if (!this._boundary) this._generateBoundary();
        return this._boundary
    };
    G8.prototype.getBuffer = function() {
        var A = new Buffer.alloc(0),
            B = this.getBoundary();
        for (var Q = 0, Z = this._streams.length; Q < Z; Q++)
            if (typeof this._streams[Q] !== "function") {
                if (Buffer.isBuffer(this._streams[Q])) A = Buffer.concat([A, this._streams[Q]]);
                else A = Buffer.concat([A, Buffer.from(this._streams[Q])]);
                if (typeof this._streams[Q] !== "string" || this._streams[Q].substring(2, B.length + 2) !== B) A = Buffer.concat([A, Buffer.from(G8.LINE_BREAK)])
            } return Buffer.concat([A, Buffer.from(this._lastBoundary())])
    };
    G8.prototype._generateBoundary = function() {
        var A = "--------------------------";
        for (var B = 0; B < 24; B++) A += Math.floor(Math.random() * 10).toString(16);
        this._boundary = A
    };
    G8.prototype.getLengthSync = function() {
        var A = this._overheadLength + this._valueLength;
        if (this._streams.length) A += this._lastBoundary().length;
        if (!this.hasKnownLength()) this._error(new Error("Cannot calculate proper length in synchronous way."));
        return A
    };
    G8.prototype.hasKnownLength = function() {
        var A = !0;
        if (this._valuesToMeasure.length) A = !1;
        return A
    };
    G8.prototype.getLength = function(A) {
        var B = this._overheadLength + this._valueLength;
        if (this._streams.length) B += this._lastBoundary().length;
        if (!this._valuesToMeasure.length) {
            process.nextTick(A.bind(this, null, B));
            return
        }
        yS9.parallel(this._valuesToMeasure, this._lengthRetriever, function(Q, Z) {
            if (Q) {
                A(Q);
                return
            }
            Z.forEach(function(D) {
                B += D
            }), A(null, B)
        })
    };
    G8.prototype.submit = function(A, B) {
        var Q, Z, D = {
            method: "post"
        };
        if (typeof A == "string") A = SS9(A), Z = bp1({
            port: A.port,
            path: A.pathname,
            host: A.hostname,
            protocol: A.protocol
        }, D);
        else if (Z = bp1(A, D), !Z.port) Z.port = Z.protocol == "https:" ? 443 : 80;
        if (Z.headers = this.getHeaders(A.headers), Z.protocol == "https:") Q = PS9.request(Z);
        else Q = TS9.request(Z);
        return this.getLength(function(G, F) {
            if (G && G !== "Unknown stream") {
                this._error(G);
                return
            }
            if (F) Q.setHeader("Content-Length", F);
            if (this.pipe(Q), B) {
                var I, Y = function(W, J) {
                    return Q.removeListener("error", Y), Q.removeListener("response", I), B.call(this, W, J)
                };
                I = Y.bind(this, null), Q.on("error", Y), Q.on("response", I)
            }
        }.bind(this)), Q
    };
    G8.prototype._error = function(A) {
        if (!this.error) this.error = A, this.pause(), this.emit("error", A)
    };
    G8.prototype.toString = function() {
        return "[object FormData]"
    };
    _S9(G8, "FormData")
});
var na0 = E((Dj9) => {
    var eS9 = W1("url").parse,
        Aj9 = {
            ftp: 21,
            gopher: 70,
            http: 80,
            https: 443,
            ws: 80,
            wss: 443
        },
        Bj9 = String.prototype.endsWith || function(A) {
            return A.length <= this.length && this.indexOf(A, this.length - A.length) !== -1
        };

    function Qj9(A) {
        var B = typeof A === "string" ? eS9(A) : A || {},
            Q = B.protocol,
            Z = B.host,
            D = B.port;
        if (typeof Z !== "string" || !Z || typeof Q !== "string") return "";
        if (Q = Q.split(":", 1)[0], Z = Z.replace(/:\d*$/, ""), D = parseInt(D) || Aj9[Q] || 0, !Zj9(Z, D)) return "";
        var G = Hp("npm_config_" + Q + "_proxy") || Hp(Q + "_proxy") || Hp("npm_config_proxy") || Hp("all_proxy");
        if (G && G.indexOf("://") === -1) G = Q + "://" + G;
        return G
    }

    function Zj9(A, B) {
        var Q = (Hp("npm_config_no_proxy") || Hp("no_proxy")).toLowerCase();
        if (!Q) return !0;
        if (Q === "*") return !1;
        return Q.split(/[,\s]/).every(function(Z) {
            if (!Z) return !0;
            var D = Z.match(/^(.+):(\d+)$/),
                G = D ? D[1] : Z,
                F = D ? parseInt(D[2]) : 0;
            if (F && F !== B) return !0;
            if (!/^[.*]/.test(G)) return A !== G;
            if (G.charAt(0) === "*") G = G.slice(1);
            return !Bj9.call(A, G)
        })
    }

    function Hp(A) {
        return process.env[A.toLowerCase()] || process.env[A.toUpperCase()] || ""
    }
    Dj9.getProxyForUrl = Qj9
});
var sa0 = E((Ga8, aa0) => {
    var zp = 1000,
        Ep = zp * 60,
        Up = Ep * 60,
        Ah = Up * 24,
        Fj9 = Ah * 7,
        Ij9 = Ah * 365.25;
    aa0.exports = function(A, B) {
        B = B || {};
        var Q = typeof A;
        if (Q === "string" && A.length > 0) return Yj9(A);
        else if (Q === "number" && isFinite(A)) return B.long ? Jj9(A) : Wj9(A);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(A))
    };

    function Yj9(A) {
        if (A = String(A), A.length > 100) return;
        var B = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(A);
        if (!B) return;
        var Q = parseFloat(B[1]),
            Z = (B[2] || "ms").toLowerCase();
        switch (Z) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
                return Q * Ij9;
            case "weeks":
            case "week":
            case "w":
                return Q * Fj9;
            case "days":
            case "day":
            case "d":
                return Q * Ah;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
                return Q * Up;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
                return Q * Ep;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
                return Q * zp;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
                return Q;
            default:
                return
        }
    }

    function Wj9(A) {
        var B = Math.abs(A);
        if (B >= Ah) return Math.round(A / Ah) + "d";
        if (B >= Up) return Math.round(A / Up) + "h";
        if (B >= Ep) return Math.round(A / Ep) + "m";
        if (B >= zp) return Math.round(A / zp) + "s";
        return A + "ms"
    }

    function Jj9(A) {
        var B = Math.abs(A);
        if (B >= Ah) return RV1(A, B, Ah, "day");
        if (B >= Up) return RV1(A, B, Up, "hour");
        if (B >= Ep) return RV1(A, B, Ep, "minute");
        if (B >= zp) return RV1(A, B, zp, "second");
        return A + " ms"
    }

    function RV1(A, B, Q, Z) {
        var D = B >= Q * 1.5;
        return Math.round(A / Q) + " " + Z + (D ? "s" : "")
    }
});
var sp1 = E((Fa8, ra0) => {
    function Xj9(A) {
        Q.debug = Q, Q.default = Q, Q.coerce = Y, Q.disable = F, Q.enable = D, Q.enabled = I, Q.humanize = sa0(), Q.destroy = W, Object.keys(A).forEach((J) => {
            Q[J] = A[J]
        }), Q.names = [], Q.skips = [], Q.formatters = {};

        function B(J) {
            let X = 0;
            for (let V = 0; V < J.length; V++) X = (X << 5) - X + J.charCodeAt(V), X |= 0;
            return Q.colors[Math.abs(X) % Q.colors.length]
        }
        Q.selectColor = B;

        function Q(J) {
            let X, V = null,
                C, K;

            function H(...z) {
                if (!H.enabled) return;
                let $ = H,
                    L = Number(new Date),
                    N = L - (X || L);
                if ($.diff = N, $.prev = X, $.curr = L, X = L, z[0] = Q.coerce(z[0]), typeof z[0] !== "string") z.unshift("%O");
                let R = 0;
                z[0] = z[0].replace(/%([a-zA-Z%])/g, (P, j) => {
                    if (P === "%%") return "%";
                    R++;
                    let f = Q.formatters[j];
                    if (typeof f === "function") {
                        let k = z[R];
                        P = f.call($, k), z.splice(R, 1), R--
                    }
                    return P
                }), Q.formatArgs.call($, z), ($.log || Q.log).apply($, z)
            }
            if (H.namespace = J, H.useColors = Q.useColors(), H.color = Q.selectColor(J), H.extend = Z, H.destroy = Q.destroy, Object.defineProperty(H, "enabled", {
                    enumerable: !0,
                    configurable: !1,
                    get: () => {
                        if (V !== null) return V;
                        if (C !== Q.namespaces) C = Q.namespaces, K = Q.enabled(J);
                        return K
                    },
                    set: (z) => {
                        V = z
                    }
                }), typeof Q.init === "function") Q.init(H);
            return H
        }

        function Z(J, X) {
            let V = Q(this.namespace + (typeof X === "undefined" ? ":" : X) + J);
            return V.log = this.log, V
        }

        function D(J) {
            Q.save(J), Q.namespaces = J, Q.names = [], Q.skips = [];
            let X = (typeof J === "string" ? J : "").trim().replace(" ", ",").split(",").filter(Boolean);
            for (let V of X)
                if (V[0] === "-") Q.skips.push(V.slice(1));
                else Q.names.push(V)
        }

        function G(J, X) {
            let V = 0,
                C = 0,
                K = -1,
                H = 0;
            while (V < J.length)
                if (C < X.length && (X[C] === J[V] || X[C] === "*"))
                    if (X[C] === "*") K = C, H = V, C++;
                    else V++, C++;
            else if (K !== -1) C = K + 1, H++, V = H;
            else return !1;
            while (C < X.length && X[C] === "*") C++;
            return C === X.length
        }

        function F() {
            let J = [...Q.names, ...Q.skips.map((X) => "-" + X)].join(",");
            return Q.enable(""), J
        }

        function I(J) {
            for (let X of Q.skips)
                if (G(J, X)) return !1;
            for (let X of Q.names)
                if (G(J, X)) return !0;
            return !1
        }

        function Y(J) {
            if (J instanceof Error) return J.stack || J.message;
            return J
        }

        function W() {
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")
        }
        return Q.enable(Q.load()), Q
    }
    ra0.exports = Xj9
});
var ta0 = E((oa0, TV1) => {
    oa0.formatArgs = Cj9;
    oa0.save = Kj9;
    oa0.load = Hj9;
    oa0.useColors = Vj9;
    oa0.storage = zj9();
    oa0.destroy = (() => {
        let A = !1;
        return () => {
            if (!A) A = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")
        }
    })();
    oa0.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"];

    function Vj9() {
        if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return !0;
        if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
        let A;
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && (A = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(A[1], 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
    }

    function Cj9(A) {
        if (A[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + A[0] + (this.useColors ? "%c " : " ") + "+" + TV1.exports.humanize(this.diff), !this.useColors) return;
        let B = "color: " + this.color;
        A.splice(1, 0, B, "color: inherit");
        let Q = 0,
            Z = 0;
        A[0].replace(/%[a-zA-Z%]/g, (D) => {
            if (D === "%%") return;
            if (Q++, D === "%c") Z = Q
        }), A.splice(Z, 0, B)
    }
    oa0.log = console.debug || console.log || (() => {});

    function Kj9(A) {
        try {
            if (A) oa0.storage.setItem("debug", A);
            else oa0.storage.removeItem("debug")
        } catch (B) {}
    }

    function Hj9() {
        let A;
        try {
            A = oa0.storage.getItem("debug")
        } catch (B) {}
        if (!A && typeof process !== "undefined" && "env" in process) A = process.env.DEBUG;
        return A
    }

    function zj9() {
        try {
            return localStorage
        } catch (A) {}
    }
    TV1.exports = sp1()(oa0);
    var {
        formatters: Ej9
    } = TV1.exports;
    Ej9.j = function(A) {
        try {
            return JSON.stringify(A)
        } catch (B) {
            return "[UnexpectedJSONParseError]: " + B.message
        }
    }
});