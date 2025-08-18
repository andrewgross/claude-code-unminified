/* chunk:228 bytes:[4927975, 4948326) size:20351 source:unpacked-cli.js */
var QB2 = E((Uw5, BB2) => {
    var {
        defineProperty: RN1,
        getOwnPropertyDescriptor: IW4,
        getOwnPropertyNames: YW4
    } = Object, WW4 = Object.prototype.hasOwnProperty, fY = (A, B) => RN1(A, "name", {
        value: B,
        configurable: !0
    }), JW4 = (A, B) => {
        for (var Q in B) RN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, XW4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of YW4(B))
                if (!WW4.call(A, D) && D !== Q) RN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = IW4(B, D)) || Z.enumerable
                })
        }
        return A
    }, VW4 = (A) => XW4(RN1({}, "__esModule", {
        value: !0
    }), A), _22 = {};
    JW4(_22, {
        ALGORITHM_IDENTIFIER: () => wN1,
        ALGORITHM_IDENTIFIER_V4A: () => zW4,
        ALGORITHM_QUERY_PARAM: () => x22,
        ALWAYS_UNSIGNABLE_HEADERS: () => d22,
        AMZ_DATE_HEADER: () => T60,
        AMZ_DATE_QUERY_PARAM: () => L60,
        AUTH_HEADER: () => O60,
        CREDENTIAL_QUERY_PARAM: () => v22,
        DATE_HEADER: () => h22,
        EVENT_ALGORITHM_IDENTIFIER: () => p22,
        EXPIRES_QUERY_PARAM: () => f22,
        GENERATED_HEADERS: () => g22,
        HOST_HEADER: () => KW4,
        KEY_TYPE_IDENTIFIER: () => P60,
        MAX_CACHE_SIZE: () => n22,
        MAX_PRESIGNED_TTL: () => a22,
        PROXY_HEADER_PATTERN: () => c22,
        REGION_SET_PARAM: () => CW4,
        SEC_HEADER_PATTERN: () => l22,
        SHA256_HEADER: () => MN1,
        SIGNATURE_HEADER: () => u22,
        SIGNATURE_QUERY_PARAM: () => M60,
        SIGNED_HEADERS_QUERY_PARAM: () => b22,
        SignatureV4: () => TW4,
        SignatureV4Base: () => AB2,
        TOKEN_HEADER: () => m22,
        TOKEN_QUERY_PARAM: () => R60,
        UNSIGNABLE_PATTERNS: () => HW4,
        UNSIGNED_PAYLOAD: () => i22,
        clearCredentialCache: () => UW4,
        createScope: () => qN1,
        getCanonicalHeaders: () => $60,
        getCanonicalQuery: () => e22,
        getPayloadHash: () => NN1,
        getSigningKey: () => s22,
        hasHeader: () => r22,
        moveHeadersToQuery: () => t22,
        prepareRequest: () => N60,
        signatureV4aContainer: () => PW4
    });
    BB2.exports = VW4(_22);
    var S22 = lB(),
        x22 = "X-Amz-Algorithm",
        v22 = "X-Amz-Credential",
        L60 = "X-Amz-Date",
        b22 = "X-Amz-SignedHeaders",
        f22 = "X-Amz-Expires",
        M60 = "X-Amz-Signature",
        R60 = "X-Amz-Security-Token",
        CW4 = "X-Amz-Region-Set",
        O60 = "authorization",
        T60 = L60.toLowerCase(),
        h22 = "date",
        g22 = [O60, T60, h22],
        u22 = M60.toLowerCase(),
        MN1 = "x-amz-content-sha256",
        m22 = R60.toLowerCase(),
        KW4 = "host",
        d22 = {
            authorization: !0,
            "cache-control": !0,
            connection: !0,
            expect: !0,
            from: !0,
            "keep-alive": !0,
            "max-forwards": !0,
            pragma: !0,
            referer: !0,
            te: !0,
            trailer: !0,
            "transfer-encoding": !0,
            upgrade: !0,
            "user-agent": !0,
            "x-amzn-trace-id": !0
        },
        c22 = /^proxy-/,
        l22 = /^sec-/,
        HW4 = [/^proxy-/i, /^sec-/i],
        wN1 = "AWS4-HMAC-SHA256",
        zW4 = "AWS4-ECDSA-P256-SHA256",
        p22 = "AWS4-HMAC-SHA256-PAYLOAD",
        i22 = "UNSIGNED-PAYLOAD",
        n22 = 50,
        P60 = "aws4_request",
        a22 = 604800,
        F_ = Uk(),
        EW4 = lB(),
        ts = {},
        $N1 = [],
        qN1 = fY((A, B, Q) => `${A}/${B}/${Q}/${P60}`, "createScope"),
        s22 = fY(async (A, B, Q, Z, D) => {
            let G = await j22(A, B.secretAccessKey, B.accessKeyId),
                F = `${Q}:${Z}:${D}:${F_.toHex(G)}:${B.sessionToken}`;
            if (F in ts) return ts[F];
            $N1.push(F);
            while ($N1.length > n22) delete ts[$N1.shift()];
            let I = `AWS4${B.secretAccessKey}`;
            for (let Y of [Q, Z, D, P60]) I = await j22(A, I, Y);
            return ts[F] = I
        }, "getSigningKey"),
        UW4 = fY(() => {
            $N1.length = 0, Object.keys(ts).forEach((A) => {
                delete ts[A]
            })
        }, "clearCredentialCache"),
        j22 = fY((A, B, Q) => {
            let Z = new A(B);
            return Z.update(EW4.toUint8Array(Q)), Z.digest()
        }, "hmac"),
        $60 = fY(({
            headers: A
        }, B, Q) => {
            let Z = {};
            for (let D of Object.keys(A).sort()) {
                if (A[D] == null) continue;
                let G = D.toLowerCase();
                if (G in d22 || B?.has(G) || c22.test(G) || l22.test(G)) {
                    if (!Q || Q && !Q.has(G)) continue
                }
                Z[G] = A[D].trim().replace(/\s+/g, " ")
            }
            return Z
        }, "getCanonicalHeaders"),
        wW4 = M22(),
        $W4 = lB(),
        NN1 = fY(async ({
            headers: A,
            body: B
        }, Q) => {
            for (let Z of Object.keys(A))
                if (Z.toLowerCase() === MN1) return A[Z];
            if (B == null) return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            else if (typeof B === "string" || ArrayBuffer.isView(B) || wW4.isArrayBuffer(B)) {
                let Z = new Q;
                return Z.update($W4.toUint8Array(B)), F_.toHex(await Z.digest())
            }
            return i22
        }, "getPayloadHash"),
        k22 = lB(),
        qW4 = class {
            static {
                fY(this, "HeaderFormatter")
            }
            format(A) {
                let B = [];
                for (let D of Object.keys(A)) {
                    let G = k22.fromUtf8(D);
                    B.push(Uint8Array.from([G.byteLength]), G, this.formatHeaderValue(A[D]))
                }
                let Q = new Uint8Array(B.reduce((D, G) => D + G.byteLength, 0)),
                    Z = 0;
                for (let D of B) Q.set(D, Z), Z += D.byteLength;
                return Q
            }
            formatHeaderValue(A) {
                switch (A.type) {
                    case "boolean":
                        return Uint8Array.from([A.value ? 0 : 1]);
                    case "byte":
                        return Uint8Array.from([2, A.value]);
                    case "short":
                        let B = new DataView(new ArrayBuffer(3));
                        return B.setUint8(0, 3), B.setInt16(1, A.value, !1), new Uint8Array(B.buffer);
                    case "integer":
                        let Q = new DataView(new ArrayBuffer(5));
                        return Q.setUint8(0, 4), Q.setInt32(1, A.value, !1), new Uint8Array(Q.buffer);
                    case "long":
                        let Z = new Uint8Array(9);
                        return Z[0] = 5, Z.set(A.value.bytes, 1), Z;
                    case "binary":
                        let D = new DataView(new ArrayBuffer(3 + A.value.byteLength));
                        D.setUint8(0, 6), D.setUint16(1, A.value.byteLength, !1);
                        let G = new Uint8Array(D.buffer);
                        return G.set(A.value, 3), G;
                    case "string":
                        let F = k22.fromUtf8(A.value),
                            I = new DataView(new ArrayBuffer(3 + F.byteLength));
                        I.setUint8(0, 7), I.setUint16(1, F.byteLength, !1);
                        let Y = new Uint8Array(I.buffer);
                        return Y.set(F, 3), Y;
                    case "timestamp":
                        let W = new Uint8Array(9);
                        return W[0] = 8, W.set(LW4.fromNumber(A.value.valueOf()).bytes, 1), W;
                    case "uuid":
                        if (!NW4.test(A.value)) throw new Error(`Invalid UUID received: ${A.value}`);
                        let J = new Uint8Array(17);
                        return J[0] = 9, J.set(F_.fromHex(A.value.replace(/\-/g, "")), 1), J
                }
            }
        },
        NW4 = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
        LW4 = class A {
            constructor(B) {
                if (this.bytes = B, B.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes")
            }
            static {
                fY(this, "Int64")
            }
            static fromNumber(B) {
                if (B > 9223372036854776000 || B < -9223372036854776000) throw new Error(`${B} is too large (or, if negative, too small) to represent as an Int64`);
                let Q = new Uint8Array(8);
                for (let Z = 7, D = Math.abs(Math.round(B)); Z > -1 && D > 0; Z--, D /= 256) Q[Z] = D;
                if (B < 0) q60(Q);
                return new A(Q)
            }
            valueOf() {
                let B = this.bytes.slice(0),
                    Q = B[0] & 128;
                if (Q) q60(B);
                return parseInt(F_.toHex(B), 16) * (Q ? -1 : 1)
            }
            toString() {
                return String(this.valueOf())
            }
        };

    function q60(A) {
        for (let B = 0; B < 8; B++) A[B] ^= 255;
        for (let B = 7; B > -1; B--)
            if (A[B]++, A[B] !== 0) break
    }
    fY(q60, "negate");
    var r22 = fY((A, B) => {
            A = A.toLowerCase();
            for (let Q of Object.keys(B))
                if (A === Q.toLowerCase()) return !0;
            return !1
        }, "hasHeader"),
        o22 = QX(),
        t22 = fY((A, B = {}) => {
            let {
                headers: Q,
                query: Z = {}
            } = o22.HttpRequest.clone(A);
            for (let D of Object.keys(Q)) {
                let G = D.toLowerCase();
                if (G.slice(0, 6) === "x-amz-" && !B.unhoistableHeaders?.has(G) || B.hoistableHeaders?.has(G)) Z[D] = Q[D], delete Q[D]
            }
            return {
                ...A,
                headers: Q,
                query: Z
            }
        }, "moveHeadersToQuery"),
        N60 = fY((A) => {
            A = o22.HttpRequest.clone(A);
            for (let B of Object.keys(A.headers))
                if (g22.indexOf(B.toLowerCase()) > -1) delete A.headers[B];
            return A
        }, "prepareRequest"),
        y22 = E5(),
        MW4 = lB(),
        LN1 = P22(),
        e22 = fY(({
            query: A = {}
        }) => {
            let B = [],
                Q = {};
            for (let Z of Object.keys(A)) {
                if (Z.toLowerCase() === u22) continue;
                let D = LN1.escapeUri(Z);
                B.push(D);
                let G = A[Z];
                if (typeof G === "string") Q[D] = `${D}=${LN1.escapeUri(G)}`;
                else if (Array.isArray(G)) Q[D] = G.slice(0).reduce((F, I) => F.concat([`${D}=${LN1.escapeUri(I)}`]), []).sort().join("&")
            }
            return B.sort().map((Z) => Q[Z]).filter((Z) => Z).join("&")
        }, "getCanonicalQuery"),
        RW4 = fY((A) => OW4(A).toISOString().replace(/\.\d{3}Z$/, "Z"), "iso8601"),
        OW4 = fY((A) => {
            if (typeof A === "number") return new Date(A * 1000);
            if (typeof A === "string") {
                if (Number(A)) return new Date(Number(A) * 1000);
                return new Date(A)
            }
            return A
        }, "toDate"),
        AB2 = class {
            static {
                fY(this, "SignatureV4Base")
            }
            constructor({
                applyChecksum: A,
                credentials: B,
                region: Q,
                service: Z,
                sha256: D,
                uriEscapePath: G = !0
            }) {
                this.service = Z, this.sha256 = D, this.uriEscapePath = G, this.applyChecksum = typeof A === "boolean" ? A : !0, this.regionProvider = y22.normalizeProvider(Q), this.credentialProvider = y22.normalizeProvider(B)
            }
            createCanonicalRequest(A, B, Q) {
                let Z = Object.keys(B).sort();
                return `${A.method}
${this.getCanonicalPath(A)}
${e22(A)}
${Z.map((D)=>`${D}:${B[D]}`).join(`
`)}

${Z.join(";")}
${Q}`
            }
            async createStringToSign(A, B, Q, Z) {
                let D = new this.sha256;
                D.update(MW4.toUint8Array(Q));
                let G = await D.digest();
                return `${Z}
${A}
${B}
${F_.toHex(G)}`
            }
            getCanonicalPath({
                path: A
            }) {
                if (this.uriEscapePath) {
                    let B = [];
                    for (let D of A.split("/")) {
                        if (D?.length === 0) continue;
                        if (D === ".") continue;
                        if (D === "..") B.pop();
                        else B.push(D)
                    }
                    let Q = `${A?.startsWith("/")?"/":""}${B.join("/")}${B.length>0&&A?.endsWith("/")?"/":""}`;
                    return LN1.escapeUri(Q).replace(/%2F/g, "/")
                }
                return A
            }
            validateResolvedCredentials(A) {
                if (typeof A !== "object" || typeof A.accessKeyId !== "string" || typeof A.secretAccessKey !== "string") throw new Error("Resolved credential object is not valid")
            }
            formatDate(A) {
                let B = RW4(A).replace(/[\-:]/g, "");
                return {
                    longDate: B,
                    shortDate: B.slice(0, 8)
                }
            }
            getCanonicalHeaderList(A) {
                return Object.keys(A).sort().join(";")
            }
        },
        TW4 = class extends AB2 {
            constructor({
                applyChecksum: A,
                credentials: B,
                region: Q,
                service: Z,
                sha256: D,
                uriEscapePath: G = !0
            }) {
                super({
                    applyChecksum: A,
                    credentials: B,
                    region: Q,
                    service: Z,
                    sha256: D,
                    uriEscapePath: G
                });
                this.headerFormatter = new qW4
            }
            static {
                fY(this, "SignatureV4")
            }
            async presign(A, B = {}) {
                let {
                    signingDate: Q = new Date,
                    expiresIn: Z = 3600,
                    unsignableHeaders: D,
                    unhoistableHeaders: G,
                    signableHeaders: F,
                    hoistableHeaders: I,
                    signingRegion: Y,
                    signingService: W
                } = B, J = await this.credentialProvider();
                this.validateResolvedCredentials(J);
                let X = Y ?? await this.regionProvider(),
                    {
                        longDate: V,
                        shortDate: C
                    } = this.formatDate(Q);
                if (Z > a22) return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
                let K = qN1(C, X, W ?? this.service),
                    H = t22(N60(A), {
                        unhoistableHeaders: G,
                        hoistableHeaders: I
                    });
                if (J.sessionToken) H.query[R60] = J.sessionToken;
                H.query[x22] = wN1, H.query[v22] = `${J.accessKeyId}/${K}`, H.query[L60] = V, H.query[f22] = Z.toString(10);
                let z = $60(H, D, F);
                return H.query[b22] = this.getCanonicalHeaderList(z), H.query[M60] = await this.getSignature(V, K, this.getSigningKey(J, X, C, W), this.createCanonicalRequest(H, z, await NN1(A, this.sha256))), H
            }
            async sign(A, B) {
                if (typeof A === "string") return this.signString(A, B);
                else if (A.headers && A.payload) return this.signEvent(A, B);
                else if (A.message) return this.signMessage(A, B);
                else return this.signRequest(A, B)
            }
            async signEvent({
                headers: A,
                payload: B
            }, {
                signingDate: Q = new Date,
                priorSignature: Z,
                signingRegion: D,
                signingService: G
            }) {
                let F = D ?? await this.regionProvider(),
                    {
                        shortDate: I,
                        longDate: Y
                    } = this.formatDate(Q),
                    W = qN1(I, F, G ?? this.service),
                    J = await NN1({
                        headers: {},
                        body: B
                    }, this.sha256),
                    X = new this.sha256;
                X.update(A);
                let V = F_.toHex(await X.digest()),
                    C = [p22, Y, W, Z, V, J].join(`
`);
                return this.signString(C, {
                    signingDate: Q,
                    signingRegion: F,
                    signingService: G
                })
            }
            async signMessage(A, {
                signingDate: B = new Date,
                signingRegion: Q,
                signingService: Z
            }) {
                return this.signEvent({
                    headers: this.headerFormatter.format(A.message.headers),
                    payload: A.message.body
                }, {
                    signingDate: B,
                    signingRegion: Q,
                    signingService: Z,
                    priorSignature: A.priorSignature
                }).then((G) => {
                    return {
                        message: A.message,
                        signature: G
                    }
                })
            }
            async signString(A, {
                signingDate: B = new Date,
                signingRegion: Q,
                signingService: Z
            } = {}) {
                let D = await this.credentialProvider();
                this.validateResolvedCredentials(D);
                let G = Q ?? await this.regionProvider(),
                    {
                        shortDate: F
                    } = this.formatDate(B),
                    I = new this.sha256(await this.getSigningKey(D, G, F, Z));
                return I.update(S22.toUint8Array(A)), F_.toHex(await I.digest())
            }
            async signRequest(A, {
                signingDate: B = new Date,
                signableHeaders: Q,
                unsignableHeaders: Z,
                signingRegion: D,
                signingService: G
            } = {}) {
                let F = await this.credentialProvider();
                this.validateResolvedCredentials(F);
                let I = D ?? await this.regionProvider(),
                    Y = N60(A),
                    {
                        longDate: W,
                        shortDate: J
                    } = this.formatDate(B),
                    X = qN1(J, I, G ?? this.service);
                if (Y.headers[T60] = W, F.sessionToken) Y.headers[m22] = F.sessionToken;
                let V = await NN1(Y, this.sha256);
                if (!r22(MN1, Y.headers) && this.applyChecksum) Y.headers[MN1] = V;
                let C = $60(Y, Z, Q),
                    K = await this.getSignature(W, X, this.getSigningKey(F, I, J, G), this.createCanonicalRequest(Y, C, V));
                return Y.headers[O60] = `${wN1} Credential=${F.accessKeyId}/${X}, SignedHeaders=${this.getCanonicalHeaderList(C)}, Signature=${K}`, Y
            }
            async getSignature(A, B, Q, Z) {
                let D = await this.createStringToSign(A, B, Z, wN1),
                    G = new this.sha256(await Q);
                return G.update(S22.toUint8Array(D)), F_.toHex(await G.digest())
            }
            getSigningKey(A, B, Q, Z) {
                return s22(this.sha256, A, Q, B, Z || this.service)
            }
        },
        PW4 = {
            SignatureV4a: null
        }
});