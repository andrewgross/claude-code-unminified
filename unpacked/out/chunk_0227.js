/* chunk:227 bytes:[4923494, 4927974) size:4480 source:unpacked-cli.js */
var mz = E((Hw5, q22) => {
    var {
        defineProperty: HN1,
        getOwnPropertyDescriptor: hY4,
        getOwnPropertyNames: gY4
    } = Object, uY4 = Object.prototype.hasOwnProperty, zN1 = (A, B) => HN1(A, "name", {
        value: B,
        configurable: !0
    }), mY4 = (A, B) => {
        for (var Q in B) HN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, dY4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of gY4(B))
                if (!uY4.call(A, D) && D !== Q) HN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = hY4(B, D)) || Z.enumerable
                })
        }
        return A
    }, cY4 = (A) => dY4(HN1({}, "__esModule", {
        value: !0
    }), A), E22 = {};
    mY4(E22, {
        emitWarningIfUnsupportedVersion: () => lY4,
        setCredentialFeature: () => U22,
        setFeature: () => w22,
        setTokenFeature: () => $22,
        state: () => U60
    });
    q22.exports = cY4(E22);
    var U60 = {
            warningEmitted: !1
        },
        lY4 = zN1((A) => {
            if (A && !U60.warningEmitted && parseInt(A.substring(1, A.indexOf("."))) < 18) U60.warningEmitted = !0, process.emitWarning(`NodeDeprecationWarning: The AWS SDK for JavaScript (v3) will
no longer support Node.js 16.x on January 6, 2025.

To continue receiving updates to AWS services, bug fixes, and security
updates please upgrade to a supported Node.js LTS version.

More information can be found at: https://a.co/74kJMmI`)
        }, "emitWarningIfUnsupportedVersion");

    function U22(A, B, Q) {
        if (!A.$source) A.$source = {};
        return A.$source[B] = Q, A
    }
    zN1(U22, "setCredentialFeature");

    function w22(A, B, Q) {
        if (!A.__aws_sdk_context) A.__aws_sdk_context = {
            features: {}
        };
        else if (!A.__aws_sdk_context.features) A.__aws_sdk_context.features = {};
        A.__aws_sdk_context.features[B] = Q
    }
    zN1(w22, "setFeature");

    function $22(A, B, Q) {
        if (!A.$source) A.$source = {};
        return A.$source[B] = Q, A
    }
    zN1($22, "setTokenFeature")
});
var M22 = E((zw5, L22) => {
    var {
        defineProperty: EN1,
        getOwnPropertyDescriptor: pY4,
        getOwnPropertyNames: iY4
    } = Object, nY4 = Object.prototype.hasOwnProperty, aY4 = (A, B) => EN1(A, "name", {
        value: B,
        configurable: !0
    }), sY4 = (A, B) => {
        for (var Q in B) EN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, rY4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of iY4(B))
                if (!nY4.call(A, D) && D !== Q) EN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = pY4(B, D)) || Z.enumerable
                })
        }
        return A
    }, oY4 = (A) => rY4(EN1({}, "__esModule", {
        value: !0
    }), A), N22 = {};
    sY4(N22, {
        isArrayBuffer: () => tY4
    });
    L22.exports = oY4(N22);
    var tY4 = aY4((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
});
var P22 = E((Ew5, T22) => {
    var {
        defineProperty: UN1,
        getOwnPropertyDescriptor: eY4,
        getOwnPropertyNames: AW4
    } = Object, BW4 = Object.prototype.hasOwnProperty, w60 = (A, B) => UN1(A, "name", {
        value: B,
        configurable: !0
    }), QW4 = (A, B) => {
        for (var Q in B) UN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, ZW4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of AW4(B))
                if (!BW4.call(A, D) && D !== Q) UN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = eY4(B, D)) || Z.enumerable
                })
        }
        return A
    }, DW4 = (A) => ZW4(UN1({}, "__esModule", {
        value: !0
    }), A), R22 = {};
    QW4(R22, {
        escapeUri: () => O22,
        escapeUriPath: () => FW4
    });
    T22.exports = DW4(R22);
    var O22 = w60((A) => encodeURIComponent(A).replace(/[!'()*]/g, GW4), "escapeUri"),
        GW4 = w60((A) => `%${A.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode"),
        FW4 = w60((A) => A.split("/").map(O22).join("/"), "escapeUriPath")
});