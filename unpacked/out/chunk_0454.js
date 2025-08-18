/* chunk:454 bytes:[10815863, 10828995) size:13132 source:unpacked-cli.js */
var Cf1 = E((gR3, D_B) => {
    D_B.exports = Z_B;
    var Q_B = YW(),
        $C8 = kd();

    function Z_B() {
        Q_B.call(this), this._firstChild = this._childNodes = null
    }
    Z_B.prototype = Object.create(Q_B.prototype, {
        hasChildNodes: {
            value: function() {
                if (this._childNodes) return this._childNodes.length > 0;
                return this._firstChild !== null
            }
        },
        childNodes: {
            get: function() {
                return this._ensureChildNodes(), this._childNodes
            }
        },
        firstChild: {
            get: function() {
                if (this._childNodes) return this._childNodes.length === 0 ? null : this._childNodes[0];
                return this._firstChild
            }
        },
        lastChild: {
            get: function() {
                var A = this._childNodes,
                    B;
                if (A) return A.length === 0 ? null : A[A.length - 1];
                if (B = this._firstChild, B === null) return null;
                return B._previousSibling
            }
        },
        _ensureChildNodes: {
            value: function() {
                if (this._childNodes) return;
                var A = this._firstChild,
                    B = A,
                    Q = this._childNodes = new $C8;
                if (A)
                    do Q.push(B), B = B._nextSibling; while (B !== A);
                this._firstChild = null
            }
        },
        removeChildren: {
            value: function A() {
                var B = this.rooted ? this.ownerDocument : null,
                    Q = this.firstChild,
                    Z;
                while (Q !== null) {
                    if (Z = Q, Q = Z.nextSibling, B) B.mutateRemove(Z);
                    Z.parentNode = null
                }
                if (this._childNodes) this._childNodes.length = 0;
                else this._firstChild = null;
                this.modify()
            }
        }
    })
});
var Kf1 = E((SC8) => {
    SC8.isValidName = TC8;
    SC8.isValidQName = PC8;
    var qC8 = /^[_:A-Za-z][-.:\w]+$/,
        NC8 = /^([_A-Za-z][-.\w]+|[_A-Za-z][-.\w]+:[_A-Za-z][-.\w]+)$/,
        vF1 = "_A-Za-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�",
        bF1 = "-._A-Za-z0-9·À-ÖØ-öø-˿̀-ͽͿ-῿‌‍‿⁀⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�",
        yd = "[" + vF1 + "][" + bF1 + "]*",
        YM0 = vF1 + ":",
        WM0 = bF1 + ":",
        LC8 = new RegExp("^[" + YM0 + "][" + WM0 + "]*$"),
        MC8 = new RegExp("^(" + yd + "|" + yd + ":" + yd + ")$"),
        G_B = /[\uD800-\uDB7F\uDC00-\uDFFF]/,
        F_B = /[\uD800-\uDB7F\uDC00-\uDFFF]/g,
        I_B = /[\uD800-\uDB7F][\uDC00-\uDFFF]/g;
    vF1 += "\uD800-\uDB7F\uDC00-\uDFFF";
    bF1 += "\uD800-\uDB7F\uDC00-\uDFFF";
    yd = "[" + vF1 + "][" + bF1 + "]*";
    YM0 = vF1 + ":";
    WM0 = bF1 + ":";
    var RC8 = new RegExp("^[" + YM0 + "][" + WM0 + "]*$"),
        OC8 = new RegExp("^(" + yd + "|" + yd + ":" + yd + ")$");

    function TC8(A) {
        if (qC8.test(A)) return !0;
        if (LC8.test(A)) return !0;
        if (!G_B.test(A)) return !1;
        if (!RC8.test(A)) return !1;
        var B = A.match(F_B),
            Q = A.match(I_B);
        return Q !== null && 2 * Q.length === B.length
    }

    function PC8(A) {
        if (NC8.test(A)) return !0;
        if (MC8.test(A)) return !0;
        if (!G_B.test(A)) return !1;
        if (!OC8.test(A)) return !1;
        var B = A.match(F_B),
            Q = A.match(I_B);
        return Q !== null && 2 * Q.length === B.length
    }
});
var JM0 = E((_C8) => {
    var Y_B = MD();
    _C8.property = function(A) {
        if (Array.isArray(A.type)) {
            var B = Object.create(null);
            A.type.forEach(function(D) {
                B[D.value || D] = D.alias || D
            });
            var Q = A.missing;
            if (Q === void 0) Q = null;
            var Z = A.invalid;
            if (Z === void 0) Z = Q;
            return {
                get: function() {
                    var D = this._getattr(A.name);
                    if (D === null) return Q;
                    if (D = B[D.toLowerCase()], D !== void 0) return D;
                    if (Z !== null) return Z;
                    return D
                },
                set: function(D) {
                    this._setattr(A.name, D)
                }
            }
        } else if (A.type === Boolean) return {
            get: function() {
                return this.hasAttribute(A.name)
            },
            set: function(D) {
                if (D) this._setattr(A.name, "");
                else this.removeAttribute(A.name)
            }
        };
        else if (A.type === Number || A.type === "long" || A.type === "unsigned long" || A.type === "limited unsigned long with fallback") return yC8(A);
        else if (!A.type || A.type === String) return {
            get: function() {
                return this._getattr(A.name) || ""
            },
            set: function(D) {
                if (A.treatNullAsEmptyString && D === null) D = "";
                this._setattr(A.name, D)
            }
        };
        else if (typeof A.type === "function") return A.type(A.name, A);
        throw new Error("Invalid attribute definition")
    };

    function yC8(A) {
        var B;
        if (typeof A.default === "function") B = A.default;
        else if (typeof A.default === "number") B = function() {
            return A.default
        };
        else B = function() {
            Y_B.assert(!1, typeof A.default)
        };
        var Q = A.type === "unsigned long",
            Z = A.type === "long",
            D = A.type === "limited unsigned long with fallback",
            G = A.min,
            F = A.max,
            I = A.setmin;
        if (G === void 0) {
            if (Q) G = 0;
            if (Z) G = -2147483648;
            if (D) G = 1
        }
        if (F === void 0) {
            if (Q || Z || D) F = 2147483647
        }
        return {
            get: function() {
                var Y = this._getattr(A.name),
                    W = A.float ? parseFloat(Y) : parseInt(Y, 10);
                if (Y === null || !isFinite(W) || G !== void 0 && W < G || F !== void 0 && W > F) return B.call(this);
                if (Q || Z || D) {
                    if (!/^[ \t\n\f\r]*[-+]?[0-9]/.test(Y)) return B.call(this);
                    W = W | 0
                }
                return W
            },
            set: function(Y) {
                if (!A.float) Y = Math.floor(Y);
                if (I !== void 0 && Y < I) Y_B.IndexSizeError(A.name + " set to " + Y);
                if (Q) Y = Y < 0 || Y > 2147483647 ? B.call(this) : Y | 0;
                else if (D) Y = Y < 1 || Y > 2147483647 ? B.call(this) : Y | 0;
                else if (Z) Y = Y < -2147483648 || Y > 2147483647 ? B.call(this) : Y | 0;
                this._setattr(A.name, String(Y))
            }
        }
    }
    _C8.registerChangeHandler = function(A, B, Q) {
        var Z = A.prototype;
        if (!Object.prototype.hasOwnProperty.call(Z, "_attributeChangeHandlers")) Z._attributeChangeHandlers = Object.create(Z._attributeChangeHandlers || null);
        Z._attributeChangeHandlers[B] = Q
    }
});
var X_B = E((dR3, J_B) => {
    J_B.exports = W_B;
    var bC8 = YW();

    function W_B(A, B) {
        this.root = A, this.filter = B, this.lastModTime = A.lastModTime, this.done = !1, this.cache = [], this.traverse()
    }
    W_B.prototype = Object.create(Object.prototype, {
        length: {
            get: function() {
                if (this.checkcache(), !this.done) this.traverse();
                return this.cache.length
            }
        },
        item: {
            value: function(A) {
                if (this.checkcache(), !this.done && A >= this.cache.length) this.traverse();
                return this.cache[A]
            }
        },
        checkcache: {
            value: function() {
                if (this.lastModTime !== this.root.lastModTime) {
                    for (var A = this.cache.length - 1; A >= 0; A--) this[A] = void 0;
                    this.cache.length = 0, this.done = !1, this.lastModTime = this.root.lastModTime
                }
            }
        },
        traverse: {
            value: function(A) {
                if (A !== void 0) A++;
                var B;
                while ((B = this.next()) !== null)
                    if (this[this.cache.length] = B, this.cache.push(B), A && this.cache.length === A) return;
                this.done = !0
            }
        },
        next: {
            value: function() {
                var A = this.cache.length === 0 ? this.root : this.cache[this.cache.length - 1],
                    B;
                if (A.nodeType === bC8.DOCUMENT_NODE) B = A.documentElement;
                else B = A.nextElement(this.root);
                while (B) {
                    if (this.filter(B)) return B;
                    B = B.nextElement(this.root)
                }
                return null
            }
        }
    })
});
var VM0 = E((cR3, K_B) => {
    var XM0 = MD();
    K_B.exports = C_B;

    function C_B(A, B) {
        this._getString = A, this._setString = B, this._length = 0, this._lastStringValue = "", this._update()
    }
    Object.defineProperties(C_B.prototype, {
        length: {
            get: function() {
                return this._length
            }
        },
        item: {
            value: function(A) {
                var B = k01(this);
                if (A < 0 || A >= B.length) return null;
                return B[A]
            }
        },
        contains: {
            value: function(A) {
                A = String(A);
                var B = k01(this);
                return B.indexOf(A) > -1
            }
        },
        add: {
            value: function() {
                var A = k01(this);
                for (var B = 0, Q = arguments.length; B < Q; B++) {
                    var Z = fF1(arguments[B]);
                    if (A.indexOf(Z) < 0) A.push(Z)
                }
                this._update(A)
            }
        },
        remove: {
            value: function() {
                var A = k01(this);
                for (var B = 0, Q = arguments.length; B < Q; B++) {
                    var Z = fF1(arguments[B]),
                        D = A.indexOf(Z);
                    if (D > -1) A.splice(D, 1)
                }
                this._update(A)
            }
        },
        toggle: {
            value: function A(B, Q) {
                if (B = fF1(B), this.contains(B)) {
                    if (Q === void 0 || Q === !1) return this.remove(B), !1;
                    return !0
                } else {
                    if (Q === void 0 || Q === !0) return this.add(B), !0;
                    return !1
                }
            }
        },
        replace: {
            value: function A(B, Q) {
                if (String(Q) === "") XM0.SyntaxError();
                B = fF1(B), Q = fF1(Q);
                var Z = k01(this),
                    D = Z.indexOf(B);
                if (D < 0) return !1;
                var G = Z.indexOf(Q);
                if (G < 0) Z[D] = Q;
                else if (D < G) Z[D] = Q, Z.splice(G, 1);
                else Z.splice(D, 1);
                return this._update(Z), !0
            }
        },
        toString: {
            value: function() {
                return this._getString()
            }
        },
        value: {
            get: function() {
                return this._getString()
            },
            set: function(A) {
                this._setString(A), this._update()
            }
        },
        _update: {
            value: function(A) {
                if (A) V_B(this, A), this._setString(A.join(" ").trim());
                else V_B(this, k01(this));
                this._lastStringValue = this._getString()
            }
        }
    });

    function V_B(A, B) {
        var Q = A._length,
            Z;
        A._length = B.length;
        for (Z = 0; Z < B.length; Z++) A[Z] = B[Z];
        for (; Z < Q; Z++) A[Z] = void 0
    }

    function fF1(A) {
        if (A = String(A), A === "") XM0.SyntaxError();
        if (/[ \t\r\n\f]/.test(A)) XM0.InvalidCharacterError();
        return A
    }

    function fC8(A) {
        var B = A._length,
            Q = Array(B);
        for (var Z = 0; Z < B; Z++) Q[Z] = A[Z];
        return Q
    }

    function k01(A) {
        var B = A._getString();
        if (B === A._lastStringValue) return fC8(A);
        var Q = B.replace(/(^[ \t\r\n\f]+)|([ \t\r\n\f]+$)/g, "");
        if (Q === "") return [];
        else {
            var Z = Object.create(null);
            return Q.split(/[ \t\r\n\f]+/g).filter(function(D) {
                var G = "$" + D;
                if (Z[G]) return !1;
                return Z[G] = !0, !0
            })
        }
    }
});