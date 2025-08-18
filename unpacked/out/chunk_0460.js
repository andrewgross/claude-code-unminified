/* chunk:460 bytes:[10918129, 10926492) size:8363 source:unpacked-cli.js */
var cM0 = E((JO3, OxB) => {
    var xI = Mf1();
    OxB.exports = iF1;

    function iF1() {}
    iF1.prototype = Object.create(Object.prototype, {
        _url: {
            get: function() {
                return new xI(this.href)
            }
        },
        protocol: {
            get: function() {
                var A = this._url;
                if (A && A.scheme) return A.scheme + ":";
                else return ":"
            },
            set: function(A) {
                var B = this.href,
                    Q = new xI(B);
                if (Q.isAbsolute()) {
                    if (A = A.replace(/:+$/, ""), A = A.replace(/[^-+\.a-zA-Z0-9]/g, xI.percentEncode), A.length > 0) Q.scheme = A, B = Q.toString()
                }
                this.href = B
            }
        },
        host: {
            get: function() {
                var A = this._url;
                if (A.isAbsolute() && A.isAuthorityBased()) return A.host + (A.port ? ":" + A.port : "");
                else return ""
            },
            set: function(A) {
                var B = this.href,
                    Q = new xI(B);
                if (Q.isAbsolute() && Q.isAuthorityBased()) {
                    if (A = A.replace(/[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g, xI.percentEncode), A.length > 0) Q.host = A, delete Q.port, B = Q.toString()
                }
                this.href = B
            }
        },
        hostname: {
            get: function() {
                var A = this._url;
                if (A.isAbsolute() && A.isAuthorityBased()) return A.host;
                else return ""
            },
            set: function(A) {
                var B = this.href,
                    Q = new xI(B);
                if (Q.isAbsolute() && Q.isAuthorityBased()) {
                    if (A = A.replace(/^\/+/, ""), A = A.replace(/[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g, xI.percentEncode), A.length > 0) Q.host = A, B = Q.toString()
                }
                this.href = B
            }
        },
        port: {
            get: function() {
                var A = this._url;
                if (A.isAbsolute() && A.isAuthorityBased() && A.port !== void 0) return A.port;
                else return ""
            },
            set: function(A) {
                var B = this.href,
                    Q = new xI(B);
                if (Q.isAbsolute() && Q.isAuthorityBased()) {
                    if (A = "" + A, A = A.replace(/[^0-9].*$/, ""), A = A.replace(/^0+/, ""), A.length === 0) A = "0";
                    if (parseInt(A, 10) <= 65535) Q.port = A, B = Q.toString()
                }
                this.href = B
            }
        },
        pathname: {
            get: function() {
                var A = this._url;
                if (A.isAbsolute() && A.isHierarchical()) return A.path;
                else return ""
            },
            set: function(A) {
                var B = this.href,
                    Q = new xI(B);
                if (Q.isAbsolute() && Q.isHierarchical()) {
                    if (A.charAt(0) !== "/") A = "/" + A;
                    A = A.replace(/[^-+\._~!$&'()*,;:=@\/a-zA-Z0-9]/g, xI.percentEncode), Q.path = A, B = Q.toString()
                }
                this.href = B
            }
        },
        search: {
            get: function() {
                var A = this._url;
                if (A.isAbsolute() && A.isHierarchical() && A.query !== void 0) return "?" + A.query;
                else return ""
            },
            set: function(A) {
                var B = this.href,
                    Q = new xI(B);
                if (Q.isAbsolute() && Q.isHierarchical()) {
                    if (A.charAt(0) === "?") A = A.substring(1);
                    A = A.replace(/[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g, xI.percentEncode), Q.query = A, B = Q.toString()
                }
                this.href = B
            }
        },
        hash: {
            get: function() {
                var A = this._url;
                if (A == null || A.fragment == null || A.fragment === "") return "";
                else return "#" + A.fragment
            },
            set: function(A) {
                var B = this.href,
                    Q = new xI(B);
                if (A.charAt(0) === "#") A = A.substring(1);
                A = A.replace(/[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g, xI.percentEncode), Q.fragment = A, B = Q.toString(), this.href = B
            }
        },
        username: {
            get: function() {
                var A = this._url;
                return A.username || ""
            },
            set: function(A) {
                var B = this.href,
                    Q = new xI(B);
                if (Q.isAbsolute()) A = A.replace(/[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\:]/g, xI.percentEncode), Q.username = A, B = Q.toString();
                this.href = B
            }
        },
        password: {
            get: function() {
                var A = this._url;
                return A.password || ""
            },
            set: function(A) {
                var B = this.href,
                    Q = new xI(B);
                if (Q.isAbsolute()) {
                    if (A === "") Q.password = null;
                    else A = A.replace(/[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\]/g, xI.percentEncode), Q.password = A;
                    B = Q.toString()
                }
                this.href = B
            }
        },
        origin: {
            get: function() {
                var A = this._url;
                if (A == null) return "";
                var B = function(Q) {
                    var Z = [A.scheme, A.host, +A.port || Q];
                    return Z[0] + "://" + Z[1] + (Z[2] === Q ? "" : ":" + Z[2])
                };
                switch (A.scheme) {
                    case "ftp":
                        return B(21);
                    case "gopher":
                        return B(70);
                    case "http":
                    case "ws":
                        return B(80);
                    case "https":
                    case "wss":
                        return B(443);
                    default:
                        return A.scheme + "://"
                }
            }
        }
    });
    iF1._inherit = function(A) {
        Object.getOwnPropertyNames(iF1.prototype).forEach(function(B) {
            if (B === "constructor" || B === "href") return;
            var Q = Object.getOwnPropertyDescriptor(iF1.prototype, B);
            Object.defineProperty(A, B, Q)
        })
    }
});
var lM0 = E((XO3, SxB) => {
    var TxB = JM0(),
        NK8 = Jf1().isApiWritable;
    SxB.exports = function(A, B, Q, Z) {
        var D = A.ctor;
        if (D) {
            var G = A.props || {};
            if (A.attributes)
                for (var F in A.attributes) {
                    var I = A.attributes[F];
                    if (typeof I !== "object" || Array.isArray(I)) I = {
                        type: I
                    };
                    if (!I.name) I.name = F.toLowerCase();
                    G[F] = TxB.property(I)
                }
            if (G.constructor = {
                    value: D,
                    writable: NK8
                }, D.prototype = Object.create((A.superclass || B).prototype, G), A.events) MK8(D, A.events);
            Q[A.name] = D
        } else D = B;
        return (A.tags || A.tag && [A.tag] || []).forEach(function(Y) {
            Z[Y] = D
        }), D
    };

    function PxB(A, B, Q, Z) {
        this.body = A, this.document = B, this.form = Q, this.element = Z
    }
    PxB.prototype.build = function() {
        return () => {}
    };

    function LK8(A, B, Q, Z) {
        var D = A.ownerDocument || Object.create(null),
            G = A.form || Object.create(null);
        A[B] = new PxB(Z, D, G, A).build()
    }

    function MK8(A, B) {
        var Q = A.prototype;
        B.forEach(function(Z) {
            Object.defineProperty(Q, "on" + Z, {
                get: function() {
                    return this._getEventHandler(Z)
                },
                set: function(D) {
                    this._setEventHandler(Z, D)
                }
            }), TxB.registerChangeHandler(A, "on" + Z, LK8)
        })
    }
});