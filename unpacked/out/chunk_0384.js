/* chunk:384 bytes:[9049970, 9068116) size:18146 source:unpacked-cli.js */
var B7B = E((V23, A7B) => {
    var lk1 = dk1(),
        ik1 = vm(),
        t3B = ck1(),
        my6 = yH0(),
        o3B = _H0(),
        dy6 = ik1.ucs2length,
        cy6 = vk1(),
        ly6 = t3B.Validation;
    A7B.exports = xH0;

    function xH0(A, B, Q, Z) {
        var D = this,
            G = this._opts,
            F = [void 0],
            I = {},
            Y = [],
            W = {},
            J = [],
            X = {},
            V = [];
        B = B || {
            schema: A,
            refVal: F,
            refs: I
        };
        var C = py6.call(this, A, B, Z),
            K = this._compilations[C.index];
        if (C.compiling) return K.callValidate = N;
        var H = this._formats,
            z = this.RULES;
        try {
            var $ = R(A, B, Q, Z);
            K.validate = $;
            var L = K.callValidate;
            if (L) {
                if (L.schema = $.schema, L.errors = null, L.refs = $.refs, L.refVal = $.refVal, L.root = $.root, L.$async = $.$async, G.sourceCode) L.source = $.source
            }
            return $
        } finally {
            iy6.call(this, A, B, Z)
        }

        function N() {
            var l = K.validate,
                y = l.apply(this, arguments);
            return N.errors = l.errors, y
        }

        function R(l, y, t, E1) {
            var C1 = !y || y && y.schema == l;
            if (y.schema != B.schema) return xH0.call(D, l, y, t, E1);
            var _1 = l.$async === !0,
                F0 = o3B({
                    isTop: !0,
                    schema: l,
                    isRoot: C1,
                    baseId: E1,
                    root: y,
                    schemaPath: "",
                    errSchemaPath: "#",
                    errorPath: '""',
                    MissingRefError: t3B.MissingRef,
                    RULES: z,
                    validate: o3B,
                    util: ik1,
                    resolve: lk1,
                    resolveRef: O,
                    usePattern: c,
                    useDefault: u,
                    useCustomRule: a,
                    opts: G,
                    formats: H,
                    logger: D.logger,
                    self: D
                });
            if (F0 = pk1(F, sy6) + pk1(Y, ny6) + pk1(J, ay6) + pk1(V, ry6) + F0, G.processCode) F0 = G.processCode(F0, l);
            var W0;
            try {
                var g1 = new Function("self", "RULES", "formats", "root", "refVal", "defaults", "customRules", "equal", "ucs2length", "ValidationError", F0);
                W0 = g1(D, z, H, B, F, J, V, cy6, dy6, ly6), F[0] = W0
            } catch (w1) {
                throw D.logger.error("Error compiling schema, function code:", F0), w1
            }
            if (W0.schema = l, W0.errors = null, W0.refs = I, W0.refVal = F, W0.root = C1 ? W0 : y, _1) W0.$async = !0;
            if (G.sourceCode === !0) W0.source = {
                code: F0,
                patterns: Y,
                defaults: J
            };
            return W0
        }

        function O(l, y, t) {
            y = lk1.url(l, y);
            var E1 = I[y],
                C1, _1;
            if (E1 !== void 0) return C1 = F[E1], _1 = "refVal[" + E1 + "]", k(C1, _1);
            if (!t && B.refs) {
                var F0 = B.refs[y];
                if (F0 !== void 0) return C1 = B.refVal[F0], _1 = P(y, C1), k(C1, _1)
            }
            _1 = P(y);
            var W0 = lk1.call(D, R, B, y);
            if (W0 === void 0) {
                var g1 = Q && Q[y];
                if (g1) W0 = lk1.inlineRef(g1, G.inlineRefs) ? g1 : xH0.call(D, g1, B, Q, l)
            }
            if (W0 === void 0) j(y);
            else return f(y, W0), k(W0, _1)
        }

        function P(l, y) {
            var t = F.length;
            return F[t] = y, I[l] = t, "refVal" + t
        }

        function j(l) {
            delete I[l]
        }

        function f(l, y) {
            var t = I[l];
            F[t] = y
        }

        function k(l, y) {
            return typeof l == "object" || typeof l == "boolean" ? {
                code: y,
                schema: l,
                inline: !0
            } : {
                code: y,
                $async: l && !!l.$async
            }
        }

        function c(l) {
            var y = W[l];
            if (y === void 0) y = W[l] = Y.length, Y[y] = l;
            return "pattern" + y
        }

        function u(l) {
            switch (typeof l) {
                case "boolean":
                case "number":
                    return "" + l;
                case "string":
                    return ik1.toQuotedString(l);
                case "object":
                    if (l === null) return "null";
                    var y = my6(l),
                        t = X[y];
                    if (t === void 0) t = X[y] = J.length, J[t] = l;
                    return "default" + t
            }
        }

        function a(l, y, t, E1) {
            if (D._opts.validateSchema !== !1) {
                var C1 = l.definition.dependencies;
                if (C1 && !C1.every(function(A0) {
                        return Object.prototype.hasOwnProperty.call(t, A0)
                    })) throw new Error("parent schema must have all required keywords: " + C1.join(","));
                var _1 = l.definition.validateSchema;
                if (_1) {
                    var F0 = _1(y);
                    if (!F0) {
                        var W0 = "keyword schema is invalid: " + D.errorsText(_1.errors);
                        if (D._opts.validateSchema == "log") D.logger.error(W0);
                        else throw new Error(W0)
                    }
                }
            }
            var g1 = l.definition.compile,
                w1 = l.definition.inline,
                Q1 = l.definition.macro,
                k1;
            if (g1) k1 = g1.call(D, y, t, E1);
            else if (Q1) {
                if (k1 = Q1.call(D, y, t, E1), G.validateSchema !== !1) D.validateSchema(k1, !0)
            } else if (w1) k1 = w1.call(D, E1, l.keyword, y, t);
            else if (k1 = l.definition.validate, !k1) return;
            if (k1 === void 0) throw new Error('custom keyword "' + l.keyword + '"failed to compile');
            var H1 = V.length;
            return V[H1] = k1, {
                code: "customRule" + H1,
                validate: k1
            }
        }
    }

    function py6(A, B, Q) {
        var Z = e3B.call(this, A, B, Q);
        if (Z >= 0) return {
            index: Z,
            compiling: !0
        };
        return Z = this._compilations.length, this._compilations[Z] = {
            schema: A,
            root: B,
            baseId: Q
        }, {
            index: Z,
            compiling: !1
        }
    }

    function iy6(A, B, Q) {
        var Z = e3B.call(this, A, B, Q);
        if (Z >= 0) this._compilations.splice(Z, 1)
    }

    function e3B(A, B, Q) {
        for (var Z = 0; Z < this._compilations.length; Z++) {
            var D = this._compilations[Z];
            if (D.schema == A && D.root == B && D.baseId == Q) return Z
        }
        return -1
    }

    function ny6(A, B) {
        return "var pattern" + A + " = new RegExp(" + ik1.toQuotedString(B[A]) + ");"
    }

    function ay6(A) {
        return "var default" + A + " = defaults[" + A + "];"
    }

    function sy6(A, B) {
        return B[A] === void 0 ? "" : "var refVal" + A + " = refVal[" + A + "];"
    }

    function ry6(A) {
        return "var customRule" + A + " = customRules[" + A + "];"
    }

    function pk1(A, B) {
        if (!A.length) return "";
        var Q = "";
        for (var Z = 0; Z < A.length; Z++) Q += B(Z, A);
        return Q
    }
});
var Z7B = E((C23, Q7B) => {
    var nk1 = Q7B.exports = function A() {
        this._cache = {}
    };
    nk1.prototype.put = function A(B, Q) {
        this._cache[B] = Q
    };
    nk1.prototype.get = function A(B) {
        return this._cache[B]
    };
    nk1.prototype.del = function A(B) {
        delete this._cache[B]
    };
    nk1.prototype.clear = function A() {
        this._cache = {}
    }
});
var H7B = E((K23, K7B) => {
    var oy6 = vm(),
        ty6 = /^(\d\d\d\d)-(\d\d)-(\d\d)$/,
        ey6 = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        A_6 = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i,
        D7B = /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
        B_6 = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
        Q_6 = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
        G7B = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
        F7B = /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-)*(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-)*(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i,
        I7B = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
        Y7B = /^(?:\/(?:[^~/]|~0|~1)*)*$/,
        W7B = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
        J7B = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;
    K7B.exports = ak1;

    function ak1(A) {
        return A = A == "full" ? "full" : "fast", oy6.copy(ak1[A])
    }
    ak1.fast = {
        date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/,
        time: /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i,
        "date-time": /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i,
        uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
        "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
        "uri-template": G7B,
        url: F7B,
        email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
        hostname: D7B,
        ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
        ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
        regex: C7B,
        uuid: I7B,
        "json-pointer": Y7B,
        "json-pointer-uri-fragment": W7B,
        "relative-json-pointer": J7B
    };
    ak1.full = {
        date: X7B,
        time: V7B,
        "date-time": G_6,
        uri: I_6,
        "uri-reference": Q_6,
        "uri-template": G7B,
        url: F7B,
        email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
        hostname: D7B,
        ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
        ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
        regex: C7B,
        uuid: I7B,
        "json-pointer": Y7B,
        "json-pointer-uri-fragment": W7B,
        "relative-json-pointer": J7B
    };

    function Z_6(A) {
        return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
    }

    function X7B(A) {
        var B = A.match(ty6);
        if (!B) return !1;
        var Q = +B[1],
            Z = +B[2],
            D = +B[3];
        return Z >= 1 && Z <= 12 && D >= 1 && D <= (Z == 2 && Z_6(Q) ? 29 : ey6[Z])
    }

    function V7B(A, B) {
        var Q = A.match(A_6);
        if (!Q) return !1;
        var Z = Q[1],
            D = Q[2],
            G = Q[3],
            F = Q[5];
        return (Z <= 23 && D <= 59 && G <= 59 || Z == 23 && D == 59 && G == 60) && (!B || F)
    }
    var D_6 = /t|\s/i;

    function G_6(A) {
        var B = A.split(D_6);
        return B.length == 2 && X7B(B[0]) && V7B(B[1], !0)
    }
    var F_6 = /\/|:/;

    function I_6(A) {
        return F_6.test(A) && B_6.test(A)
    }
    var Y_6 = /[^\\]\\Z/;

    function C7B(A) {
        if (Y_6.test(A)) return !1;
        try {
            return new RegExp(A), !0
        } catch (B) {
            return !1
        }
    }
});