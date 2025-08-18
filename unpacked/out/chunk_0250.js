/* chunk:250 bytes:[5376401, 5380881) size:4480 source:unpacked-cli.js */
var ow = E((yq5, YD2) => {
    var {
        defineProperty: $L1,
        getOwnPropertyDescriptor: HN4,
        getOwnPropertyNames: zN4
    } = Object, EN4 = Object.prototype.hasOwnProperty, qL1 = (A, B) => $L1(A, "name", {
        value: B,
        configurable: !0
    }), UN4 = (A, B) => {
        for (var Q in B) $L1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, wN4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of zN4(B))
                if (!EN4.call(A, D) && D !== Q) $L1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = HN4(B, D)) || Z.enumerable
                })
        }
        return A
    }, $N4 = (A) => wN4($L1({}, "__esModule", {
        value: !0
    }), A), DD2 = {};
    UN4(DD2, {
        emitWarningIfUnsupportedVersion: () => qN4,
        setCredentialFeature: () => GD2,
        setFeature: () => FD2,
        setTokenFeature: () => ID2,
        state: () => E30
    });
    YD2.exports = $N4(DD2);
    var E30 = {
            warningEmitted: !1
        },
        qN4 = qL1((A) => {
            if (A && !E30.warningEmitted && parseInt(A.substring(1, A.indexOf("."))) < 18) E30.warningEmitted = !0, process.emitWarning(`NodeDeprecationWarning: The AWS SDK for JavaScript (v3) will
no longer support Node.js 16.x on January 6, 2025.

To continue receiving updates to AWS services, bug fixes, and security
updates please upgrade to a supported Node.js LTS version.

More information can be found at: https://a.co/74kJMmI`)
        }, "emitWarningIfUnsupportedVersion");

    function GD2(A, B, Q) {
        if (!A.$source) A.$source = {};
        return A.$source[B] = Q, A
    }
    qL1(GD2, "setCredentialFeature");

    function FD2(A, B, Q) {
        if (!A.__aws_sdk_context) A.__aws_sdk_context = {
            features: {}
        };
        else if (!A.__aws_sdk_context.features) A.__aws_sdk_context.features = {};
        A.__aws_sdk_context.features[B] = Q
    }
    qL1(FD2, "setFeature");

    function ID2(A, B, Q) {
        if (!A.$source) A.$source = {};
        return A.$source[B] = Q, A
    }
    qL1(ID2, "setTokenFeature")
});
var XD2 = E((_q5, JD2) => {
    var {
        defineProperty: NL1,
        getOwnPropertyDescriptor: NN4,
        getOwnPropertyNames: LN4
    } = Object, MN4 = Object.prototype.hasOwnProperty, RN4 = (A, B) => NL1(A, "name", {
        value: B,
        configurable: !0
    }), ON4 = (A, B) => {
        for (var Q in B) NL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, TN4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of LN4(B))
                if (!MN4.call(A, D) && D !== Q) NL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = NN4(B, D)) || Z.enumerable
                })
        }
        return A
    }, PN4 = (A) => TN4(NL1({}, "__esModule", {
        value: !0
    }), A), WD2 = {};
    ON4(WD2, {
        isArrayBuffer: () => SN4
    });
    JD2.exports = PN4(WD2);
    var SN4 = RN4((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
});
var HD2 = E((xq5, KD2) => {
    var {
        defineProperty: LL1,
        getOwnPropertyDescriptor: jN4,
        getOwnPropertyNames: kN4
    } = Object, yN4 = Object.prototype.hasOwnProperty, U30 = (A, B) => LL1(A, "name", {
        value: B,
        configurable: !0
    }), _N4 = (A, B) => {
        for (var Q in B) LL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, xN4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of kN4(B))
                if (!yN4.call(A, D) && D !== Q) LL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = jN4(B, D)) || Z.enumerable
                })
        }
        return A
    }, vN4 = (A) => xN4(LL1({}, "__esModule", {
        value: !0
    }), A), VD2 = {};
    _N4(VD2, {
        escapeUri: () => CD2,
        escapeUriPath: () => fN4
    });
    KD2.exports = vN4(VD2);
    var CD2 = U30((A) => encodeURIComponent(A).replace(/[!'()*]/g, bN4), "escapeUri"),
        bN4 = U30((A) => `%${A.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode"),
        fN4 = U30((A) => A.split("/").map(CD2).join("/"), "escapeUriPath")
});