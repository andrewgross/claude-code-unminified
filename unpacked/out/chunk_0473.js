/* chunk:473 bytes:[11331429, 11351180) size:19751 source:unpacked-cli.js */
var t$ = E((rk3, zfB) => {
    var h7 = j4();
    b8();
    Ib();
    var n2 = zfB.exports = h7.asn1 = h7.asn1 || {};
    n2.Class = {
        UNIVERSAL: 0,
        APPLICATION: 64,
        CONTEXT_SPECIFIC: 128,
        PRIVATE: 192
    };
    n2.Type = {
        NONE: 0,
        BOOLEAN: 1,
        INTEGER: 2,
        BITSTRING: 3,
        OCTETSTRING: 4,
        NULL: 5,
        OID: 6,
        ODESC: 7,
        EXTERNAL: 8,
        REAL: 9,
        ENUMERATED: 10,
        EMBEDDED: 11,
        UTF8: 12,
        ROID: 13,
        SEQUENCE: 16,
        SET: 17,
        PRINTABLESTRING: 19,
        IA5STRING: 22,
        UTCTIME: 23,
        GENERALIZEDTIME: 24,
        BMPSTRING: 30
    };
    n2.create = function(A, B, Q, Z, D) {
        if (h7.util.isArray(Z)) {
            var G = [];
            for (var F = 0; F < Z.length; ++F)
                if (Z[F] !== void 0) G.push(Z[F]);
            Z = G
        }
        var I = {
            tagClass: A,
            type: B,
            constructed: Q,
            composed: Q || h7.util.isArray(Z),
            value: Z
        };
        if (D && "bitStringContents" in D) I.bitStringContents = D.bitStringContents, I.original = n2.copy(I);
        return I
    };
    n2.copy = function(A, B) {
        var Q;
        if (h7.util.isArray(A)) {
            Q = [];
            for (var Z = 0; Z < A.length; ++Z) Q.push(n2.copy(A[Z], B));
            return Q
        }
        if (typeof A === "string") return A;
        if (Q = {
                tagClass: A.tagClass,
                type: A.type,
                constructed: A.constructed,
                composed: A.composed,
                value: n2.copy(A.value, B)
            }, B && !B.excludeBitStringContents) Q.bitStringContents = A.bitStringContents;
        return Q
    };
    n2.equals = function(A, B, Q) {
        if (h7.util.isArray(A)) {
            if (!h7.util.isArray(B)) return !1;
            if (A.length !== B.length) return !1;
            for (var Z = 0; Z < A.length; ++Z)
                if (!n2.equals(A[Z], B[Z])) return !1;
            return !0
        }
        if (typeof A !== typeof B) return !1;
        if (typeof A === "string") return A === B;
        var D = A.tagClass === B.tagClass && A.type === B.type && A.constructed === B.constructed && A.composed === B.composed && n2.equals(A.value, B.value);
        if (Q && Q.includeBitStringContents) D = D && A.bitStringContents === B.bitStringContents;
        return D
    };
    n2.getBerValueLength = function(A) {
        var B = A.getByte();
        if (B === 128) return;
        var Q, Z = B & 128;
        if (!Z) Q = B;
        else Q = A.getInt((B & 127) << 3);
        return Q
    };

    function FI1(A, B, Q) {
        if (Q > B) {
            var Z = new Error("Too few bytes to parse DER.");
            throw Z.available = A.length(), Z.remaining = B, Z.requested = Q, Z
        }
    }
    var AU8 = function(A, B) {
        var Q = A.getByte();
        if (B--, Q === 128) return;
        var Z, D = Q & 128;
        if (!D) Z = Q;
        else {
            var G = Q & 127;
            FI1(A, B, G), Z = A.getInt(G << 3)
        }
        if (Z < 0) throw new Error("Negative length: " + Z);
        return Z
    };
    n2.fromDer = function(A, B) {
        if (B === void 0) B = {
            strict: !0,
            parseAllBytes: !0,
            decodeBitStrings: !0
        };
        if (typeof B === "boolean") B = {
            strict: B,
            parseAllBytes: !0,
            decodeBitStrings: !0
        };
        if (!("strict" in B)) B.strict = !0;
        if (!("parseAllBytes" in B)) B.parseAllBytes = !0;
        if (!("decodeBitStrings" in B)) B.decodeBitStrings = !0;
        if (typeof A === "string") A = h7.util.createBuffer(A);
        var Q = A.length(),
            Z = Vh1(A, A.length(), 0, B);
        if (B.parseAllBytes && A.length() !== 0) {
            var D = new Error("Unparsed DER bytes remain after ASN.1 parsing.");
            throw D.byteCount = Q, D.remaining = A.length(), D
        }
        return Z
    };

    function Vh1(A, B, Q, Z) {
        var D;
        FI1(A, B, 2);
        var G = A.getByte();
        B--;
        var F = G & 192,
            I = G & 31;
        D = A.length();
        var Y = AU8(A, B);
        if (B -= D - A.length(), Y !== void 0 && Y > B) {
            if (Z.strict) {
                var W = new Error("Too few bytes to read ASN.1 value.");
                throw W.available = A.length(), W.remaining = B, W.requested = Y, W
            }
            Y = B
        }
        var J, X, V = (G & 32) === 32;
        if (V)
            if (J = [], Y === void 0)
                for (;;) {
                    if (FI1(A, B, 2), A.bytes(2) === String.fromCharCode(0, 0)) {
                        A.getBytes(2), B -= 2;
                        break
                    }
                    D = A.length(), J.push(Vh1(A, B, Q + 1, Z)), B -= D - A.length()
                } else
                    while (Y > 0) D = A.length(), J.push(Vh1(A, Y, Q + 1, Z)), B -= D - A.length(), Y -= D - A.length();
        if (J === void 0 && F === n2.Class.UNIVERSAL && I === n2.Type.BITSTRING) X = A.bytes(Y);
        if (J === void 0 && Z.decodeBitStrings && F === n2.Class.UNIVERSAL && I === n2.Type.BITSTRING && Y > 1) {
            var C = A.read,
                K = B,
                H = 0;
            if (I === n2.Type.BITSTRING) FI1(A, B, 1), H = A.getByte(), B--;
            if (H === 0) try {
                D = A.length();
                var z = {
                        strict: !0,
                        decodeBitStrings: !0
                    },
                    $ = Vh1(A, B, Q + 1, z),
                    L = D - A.length();
                if (B -= L, I == n2.Type.BITSTRING) L++;
                var N = $.tagClass;
                if (L === Y && (N === n2.Class.UNIVERSAL || N === n2.Class.CONTEXT_SPECIFIC)) J = [$]
            } catch (O) {}
            if (J === void 0) A.read = C, B = K
        }
        if (J === void 0) {
            if (Y === void 0) {
                if (Z.strict) throw new Error("Non-constructed ASN.1 object of indefinite length.");
                Y = B
            }
            if (I === n2.Type.BMPSTRING) {
                J = "";
                for (; Y > 0; Y -= 2) FI1(A, B, 2), J += String.fromCharCode(A.getInt16()), B -= 2
            } else J = A.getBytes(Y), B -= Y
        }
        var R = X === void 0 ? null : {
            bitStringContents: X
        };
        return n2.create(F, I, V, J, R)
    }
    n2.toDer = function(A) {
        var B = h7.util.createBuffer(),
            Q = A.tagClass | A.type,
            Z = h7.util.createBuffer(),
            D = !1;
        if ("bitStringContents" in A) {
            if (D = !0, A.original) D = n2.equals(A, A.original)
        }
        if (D) Z.putBytes(A.bitStringContents);
        else if (A.composed) {
            if (A.constructed) Q |= 32;
            else Z.putByte(0);
            for (var G = 0; G < A.value.length; ++G)
                if (A.value[G] !== void 0) Z.putBuffer(n2.toDer(A.value[G]))
        } else if (A.type === n2.Type.BMPSTRING)
            for (var G = 0; G < A.value.length; ++G) Z.putInt16(A.value.charCodeAt(G));
        else if (A.type === n2.Type.INTEGER && A.value.length > 1 && (A.value.charCodeAt(0) === 0 && (A.value.charCodeAt(1) & 128) === 0 || A.value.charCodeAt(0) === 255 && (A.value.charCodeAt(1) & 128) === 128)) Z.putBytes(A.value.substr(1));
        else Z.putBytes(A.value);
        if (B.putByte(Q), Z.length() <= 127) B.putByte(Z.length() & 127);
        else {
            var F = Z.length(),
                I = "";
            do I += String.fromCharCode(F & 255), F = F >>> 8; while (F > 0);
            B.putByte(I.length | 128);
            for (var G = I.length - 1; G >= 0; --G) B.putByte(I.charCodeAt(G))
        }
        return B.putBuffer(Z), B
    };
    n2.oidToDer = function(A) {
        var B = A.split("."),
            Q = h7.util.createBuffer();
        Q.putByte(40 * parseInt(B[0], 10) + parseInt(B[1], 10));
        var Z, D, G, F;
        for (var I = 2; I < B.length; ++I) {
            Z = !0, D = [], G = parseInt(B[I], 10);
            do {
                if (F = G & 127, G = G >>> 7, !Z) F |= 128;
                D.push(F), Z = !1
            } while (G > 0);
            for (var Y = D.length - 1; Y >= 0; --Y) Q.putByte(D[Y])
        }
        return Q
    };
    n2.derToOid = function(A) {
        var B;
        if (typeof A === "string") A = h7.util.createBuffer(A);
        var Q = A.getByte();
        B = Math.floor(Q / 40) + "." + Q % 40;
        var Z = 0;
        while (A.length() > 0)
            if (Q = A.getByte(), Z = Z << 7, Q & 128) Z += Q & 127;
            else B += "." + (Z + Q), Z = 0;
        return B
    };
    n2.utcTimeToDate = function(A) {
        var B = new Date,
            Q = parseInt(A.substr(0, 2), 10);
        Q = Q >= 50 ? 1900 + Q : 2000 + Q;
        var Z = parseInt(A.substr(2, 2), 10) - 1,
            D = parseInt(A.substr(4, 2), 10),
            G = parseInt(A.substr(6, 2), 10),
            F = parseInt(A.substr(8, 2), 10),
            I = 0;
        if (A.length > 11) {
            var Y = A.charAt(10),
                W = 10;
            if (Y !== "+" && Y !== "-") I = parseInt(A.substr(10, 2), 10), W += 2
        }
        if (B.setUTCFullYear(Q, Z, D), B.setUTCHours(G, F, I, 0), W) {
            if (Y = A.charAt(W), Y === "+" || Y === "-") {
                var J = parseInt(A.substr(W + 1, 2), 10),
                    X = parseInt(A.substr(W + 4, 2), 10),
                    V = J * 60 + X;
                if (V *= 60000, Y === "+") B.setTime(+B - V);
                else B.setTime(+B + V)
            }
        }
        return B
    };
    n2.generalizedTimeToDate = function(A) {
        var B = new Date,
            Q = parseInt(A.substr(0, 4), 10),
            Z = parseInt(A.substr(4, 2), 10) - 1,
            D = parseInt(A.substr(6, 2), 10),
            G = parseInt(A.substr(8, 2), 10),
            F = parseInt(A.substr(10, 2), 10),
            I = parseInt(A.substr(12, 2), 10),
            Y = 0,
            W = 0,
            J = !1;
        if (A.charAt(A.length - 1) === "Z") J = !0;
        var X = A.length - 5,
            V = A.charAt(X);
        if (V === "+" || V === "-") {
            var C = parseInt(A.substr(X + 1, 2), 10),
                K = parseInt(A.substr(X + 4, 2), 10);
            if (W = C * 60 + K, W *= 60000, V === "+") W *= -1;
            J = !0
        }
        if (A.charAt(14) === ".") Y = parseFloat(A.substr(14), 10) * 1000;
        if (J) B.setUTCFullYear(Q, Z, D), B.setUTCHours(G, F, I, Y), B.setTime(+B + W);
        else B.setFullYear(Q, Z, D), B.setHours(G, F, I, Y);
        return B
    };
    n2.dateToUtcTime = function(A) {
        if (typeof A === "string") return A;
        var B = "",
            Q = [];
        Q.push(("" + A.getUTCFullYear()).substr(2)), Q.push("" + (A.getUTCMonth() + 1)), Q.push("" + A.getUTCDate()), Q.push("" + A.getUTCHours()), Q.push("" + A.getUTCMinutes()), Q.push("" + A.getUTCSeconds());
        for (var Z = 0; Z < Q.length; ++Z) {
            if (Q[Z].length < 2) B += "0";
            B += Q[Z]
        }
        return B += "Z", B
    };
    n2.dateToGeneralizedTime = function(A) {
        if (typeof A === "string") return A;
        var B = "",
            Q = [];
        Q.push("" + A.getUTCFullYear()), Q.push("" + (A.getUTCMonth() + 1)), Q.push("" + A.getUTCDate()), Q.push("" + A.getUTCHours()), Q.push("" + A.getUTCMinutes()), Q.push("" + A.getUTCSeconds());
        for (var Z = 0; Z < Q.length; ++Z) {
            if (Q[Z].length < 2) B += "0";
            B += Q[Z]
        }
        return B += "Z", B
    };
    n2.integerToDer = function(A) {
        var B = h7.util.createBuffer();
        if (A >= -128 && A < 128) return B.putSignedInt(A, 8);
        if (A >= -32768 && A < 32768) return B.putSignedInt(A, 16);
        if (A >= -8388608 && A < 8388608) return B.putSignedInt(A, 24);
        if (A >= -2147483648 && A < 2147483648) return B.putSignedInt(A, 32);
        var Q = new Error("Integer too large; max is 32-bits.");
        throw Q.integer = A, Q
    };
    n2.derToInteger = function(A) {
        if (typeof A === "string") A = h7.util.createBuffer(A);
        var B = A.length() * 8;
        if (B > 32) throw new Error("Integer too large; max is 32-bits.");
        return A.getSignedInt(B)
    };
    n2.validate = function(A, B, Q, Z) {
        var D = !1;
        if ((A.tagClass === B.tagClass || typeof B.tagClass === "undefined") && (A.type === B.type || typeof B.type === "undefined")) {
            if (A.constructed === B.constructed || typeof B.constructed === "undefined") {
                if (D = !0, B.value && h7.util.isArray(B.value)) {
                    var G = 0;
                    for (var F = 0; D && F < B.value.length; ++F) {
                        if (D = B.value[F].optional || !1, A.value[G]) {
                            if (D = n2.validate(A.value[G], B.value[F], Q, Z), D) ++G;
                            else if (B.value[F].optional) D = !0
                        }
                        if (!D && Z) Z.push("[" + B.name + '] Tag class "' + B.tagClass + '", type "' + B.type + '" expected value length "' + B.value.length + '", got "' + A.value.length + '"')
                    }
                }
                if (D && Q) {
                    if (B.capture) Q[B.capture] = A.value;
                    if (B.captureAsn1) Q[B.captureAsn1] = A;
                    if (B.captureBitStringContents && "bitStringContents" in A) Q[B.captureBitStringContents] = A.bitStringContents;
                    if (B.captureBitStringValue && "bitStringContents" in A) {
                        var I;
                        if (A.bitStringContents.length < 2) Q[B.captureBitStringValue] = "";
                        else {
                            var Y = A.bitStringContents.charCodeAt(0);
                            if (Y !== 0) throw new Error("captureBitStringValue only supported for zero unused bits");
                            Q[B.captureBitStringValue] = A.bitStringContents.slice(1)
                        }
                    }
                }
            } else if (Z) Z.push("[" + B.name + '] Expected constructed "' + B.constructed + '", got "' + A.constructed + '"')
        } else if (Z) {
            if (A.tagClass !== B.tagClass) Z.push("[" + B.name + '] Expected tag class "' + B.tagClass + '", got "' + A.tagClass + '"');
            if (A.type !== B.type) Z.push("[" + B.name + '] Expected type "' + B.type + '", got "' + A.type + '"')
        }
        return D
    };
    var HfB = /[^\\u0000-\\u00ff]/;
    n2.prettyPrint = function(A, B, Q) {
        var Z = "";
        if (B = B || 0, Q = Q || 2, B > 0) Z += `
`;
        var D = "";
        for (var G = 0; G < B * Q; ++G) D += " ";
        switch (Z += D + "Tag: ", A.tagClass) {
            case n2.Class.UNIVERSAL:
                Z += "Universal:";
                break;
            case n2.Class.APPLICATION:
                Z += "Application:";
                break;
            case n2.Class.CONTEXT_SPECIFIC:
                Z += "Context-Specific:";
                break;
            case n2.Class.PRIVATE:
                Z += "Private:";
                break
        }
        if (A.tagClass === n2.Class.UNIVERSAL) switch (Z += A.type, A.type) {
            case n2.Type.NONE:
                Z += " (None)";
                break;
            case n2.Type.BOOLEAN:
                Z += " (Boolean)";
                break;
            case n2.Type.INTEGER:
                Z += " (Integer)";
                break;
            case n2.Type.BITSTRING:
                Z += " (Bit string)";
                break;
            case n2.Type.OCTETSTRING:
                Z += " (Octet string)";
                break;
            case n2.Type.NULL:
                Z += " (Null)";
                break;
            case n2.Type.OID:
                Z += " (Object Identifier)";
                break;
            case n2.Type.ODESC:
                Z += " (Object Descriptor)";
                break;
            case n2.Type.EXTERNAL:
                Z += " (External or Instance of)";
                break;
            case n2.Type.REAL:
                Z += " (Real)";
                break;
            case n2.Type.ENUMERATED:
                Z += " (Enumerated)";
                break;
            case n2.Type.EMBEDDED:
                Z += " (Embedded PDV)";
                break;
            case n2.Type.UTF8:
                Z += " (UTF8)";
                break;
            case n2.Type.ROID:
                Z += " (Relative Object Identifier)";
                break;
            case n2.Type.SEQUENCE:
                Z += " (Sequence)";
                break;
            case n2.Type.SET:
                Z += " (Set)";
                break;
            case n2.Type.PRINTABLESTRING:
                Z += " (Printable String)";
                break;
            case n2.Type.IA5String:
                Z += " (IA5String (ASCII))";
                break;
            case n2.Type.UTCTIME:
                Z += " (UTC time)";
                break;
            case n2.Type.GENERALIZEDTIME:
                Z += " (Generalized time)";
                break;
            case n2.Type.BMPSTRING:
                Z += " (BMP String)";
                break
        } else Z += A.type;
        if (Z += `
`, Z += D + "Constructed: " + A.constructed + `
`, A.composed) {
            var F = 0,
                I = "";
            for (var G = 0; G < A.value.length; ++G)
                if (A.value[G] !== void 0) {
                    if (F += 1, I += n2.prettyPrint(A.value[G], B + 1, Q), G + 1 < A.value.length) I += ","
                } Z += D + "Sub values: " + F + I
        } else {
            if (Z += D + "Value: ", A.type === n2.Type.OID) {
                var Y = n2.derToOid(A.value);
                if (Z += Y, h7.pki && h7.pki.oids) {
                    if (Y in h7.pki.oids) Z += " (" + h7.pki.oids[Y] + ") "
                }
            }
            if (A.type === n2.Type.INTEGER) try {
                Z += n2.derToInteger(A.value)
            } catch (J) {
                Z += "0x" + h7.util.bytesToHex(A.value)
            } else if (A.type === n2.Type.BITSTRING) {
                if (A.value.length > 1) Z += "0x" + h7.util.bytesToHex(A.value.slice(1));
                else Z += "(none)";
                if (A.value.length > 0) {
                    var W = A.value.charCodeAt(0);
                    if (W == 1) Z += " (1 unused bit shown)";
                    else if (W > 1) Z += " (" + W + " unused bits shown)"
                }
            } else if (A.type === n2.Type.OCTETSTRING) {
                if (!HfB.test(A.value)) Z += "(" + A.value + ") ";
                Z += "0x" + h7.util.bytesToHex(A.value)
            } else if (A.type === n2.Type.UTF8) try {
                    Z += h7.util.decodeUtf8(A.value)
                } catch (J) {
                    if (J.message === "URI malformed") Z += "0x" + h7.util.bytesToHex(A.value) + " (malformed UTF8)";
                    else throw J
                } else if (A.type === n2.Type.PRINTABLESTRING || A.type === n2.Type.IA5String) Z += A.value;
                else if (HfB.test(A.value)) Z += "0x" + h7.util.bytesToHex(A.value);
            else if (A.value.length === 0) Z += "[null]";
            else Z += A.value
        }
        return Z
    }
});
var IR = E((ok3, EfB) => {
    var Ch1 = j4();
    EfB.exports = Ch1.md = Ch1.md || {};
    Ch1.md.algorithms = Ch1.md.algorithms || {}
});