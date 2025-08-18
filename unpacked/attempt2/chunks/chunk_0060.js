/* chunk:60 bytes:[1448374, 1468725) size:20351 source:unpacked-cli.js */
var h9A = E((T15, f9A) => {
    var {
        defineProperty: SK1,
        getOwnPropertyDescriptor: ml9,
        getOwnPropertyNames: dl9
    } = Object, cl9 = Object.prototype.hasOwnProperty, CY = (A, B) => SK1(A, "name", {
        value: B,
        configurable: !0
    }), ll9 = (A, B) => {
        for (var Q in B) SK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, pl9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of dl9(B))
                if (!cl9.call(A, D) && D !== Q) SK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ml9(B, D)) || Z.enumerable
                })
        }
        return A
    }, il9 = (A) => pl9(SK1({}, "__esModule", {
        value: !0
    }), A), H9A = {};
    ll9(H9A, {
        ALGORITHM_IDENTIFIER: () => LK1,
        ALGORITHM_IDENTIFIER_V4A: () => rl9,
        ALGORITHM_QUERY_PARAM: () => z9A,
        ALWAYS_UNSIGNABLE_HEADERS: () => M9A,
        AMZ_DATE_HEADER: () => Ea1,
        AMZ_DATE_QUERY_PARAM: () => Ca1,
        AUTH_HEADER: () => za1,
        CREDENTIAL_QUERY_PARAM: () => E9A,
        DATE_HEADER: () => $9A,
        EVENT_ALGORITHM_IDENTIFIER: () => T9A,
        EXPIRES_QUERY_PARAM: () => w9A,
        GENERATED_HEADERS: () => q9A,
        HOST_HEADER: () => al9,
        KEY_TYPE_IDENTIFIER: () => Ua1,
        MAX_CACHE_SIZE: () => S9A,
        MAX_PRESIGNED_TTL: () => j9A,
        PROXY_HEADER_PATTERN: () => R9A,
        REGION_SET_PARAM: () => nl9,
        SEC_HEADER_PATTERN: () => O9A,
        SHA256_HEADER: () => PK1,
        SIGNATURE_HEADER: () => N9A,
        SIGNATURE_QUERY_PARAM: () => Ka1,
        SIGNED_HEADERS_QUERY_PARAM: () => U9A,
        SignatureV4: () => Ip9,
        SignatureV4Base: () => b9A,
        TOKEN_HEADER: () => L9A,
        TOKEN_QUERY_PARAM: () => Ha1,
        UNSIGNABLE_PATTERNS: () => sl9,
        UNSIGNED_PAYLOAD: () => P9A,
        clearCredentialCache: () => tl9,
        createScope: () => RK1,
        getCanonicalHeaders: () => Ja1,
        getCanonicalQuery: () => v9A,
        getPayloadHash: () => OK1,
        getSigningKey: () => k9A,
        hasHeader: () => y9A,
        moveHeadersToQuery: () => x9A,
        prepareRequest: () => Va1,
        signatureV4aContainer: () => Yp9
    });
    f9A.exports = il9(H9A);
    var X9A = lB(),
        z9A = "X-Amz-Algorithm",
        E9A = "X-Amz-Credential",
        Ca1 = "X-Amz-Date",
        U9A = "X-Amz-SignedHeaders",
        w9A = "X-Amz-Expires",
        Ka1 = "X-Amz-Signature",
        Ha1 = "X-Amz-Security-Token",
        nl9 = "X-Amz-Region-Set",
        za1 = "authorization",
        Ea1 = Ca1.toLowerCase(),
        $9A = "date",
        q9A = [za1, Ea1, $9A],
        N9A = Ka1.toLowerCase(),
        PK1 = "x-amz-content-sha256",
        L9A = Ha1.toLowerCase(),
        al9 = "host",
        M9A = {
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
        R9A = /^proxy-/,
        O9A = /^sec-/,
        sl9 = [/^proxy-/i, /^sec-/i],
        LK1 = "AWS4-HMAC-SHA256",
        rl9 = "AWS4-ECDSA-P256-SHA256",
        T9A = "AWS4-HMAC-SHA256-PAYLOAD",
        P9A = "UNSIGNED-PAYLOAD",
        S9A = 50,
        Ua1 = "aws4_request",
        j9A = 604800,
        qk = Uk(),
        ol9 = lB(),
        op = {},
        MK1 = [],
        RK1 = CY((A, B, Q) => `${A}/${B}/${Q}/${Ua1}`, "createScope"),
        k9A = CY(async (A, B, Q, Z, D) => {
            let G = await V9A(A, B.secretAccessKey, B.accessKeyId),
                F = `${Q}:${Z}:${D}:${qk.toHex(G)}:${B.sessionToken}`;
            if (F in op) return op[F];
            MK1.push(F);
            while (MK1.length > S9A) delete op[MK1.shift()];
            let I = `AWS4${B.secretAccessKey}`;
            for (let Y of [Q, Z, D, Ua1]) I = await V9A(A, I, Y);
            return op[F] = I
        }, "getSigningKey"),
        tl9 = CY(() => {
            MK1.length = 0, Object.keys(op).forEach((A) => {
                delete op[A]
            })
        }, "clearCredentialCache"),
        V9A = CY((A, B, Q) => {
            let Z = new A(B);
            return Z.update(ol9.toUint8Array(Q)), Z.digest()
        }, "hmac"),
        Ja1 = CY(({
            headers: A
        }, B, Q) => {
            let Z = {};
            for (let D of Object.keys(A).sort()) {
                if (A[D] == null) continue;
                let G = D.toLowerCase();
                if (G in M9A || B?.has(G) || R9A.test(G) || O9A.test(G)) {
                    if (!Q || Q && !Q.has(G)) continue
                }
                Z[G] = A[D].trim().replace(/\s+/g, " ")
            }
            return Z
        }, "getCanonicalHeaders"),
        el9 = F9A(),
        Ap9 = lB(),
        OK1 = CY(async ({
            headers: A,
            body: B
        }, Q) => {
            for (let Z of Object.keys(A))
                if (Z.toLowerCase() === PK1) return A[Z];
            if (B == null) return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            else if (typeof B === "string" || ArrayBuffer.isView(B) || el9.isArrayBuffer(B)) {
                let Z = new Q;
                return Z.update(Ap9.toUint8Array(B)), qk.toHex(await Z.digest())
            }
            return P9A
        }, "getPayloadHash"),
        C9A = lB(),
        Bp9 = class {
            static {
                CY(this, "HeaderFormatter")
            }
            format(A) {
                let B = [];
                for (let D of Object.keys(A)) {
                    let G = C9A.fromUtf8(D);
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
                        let F = C9A.fromUtf8(A.value),
                            I = new DataView(new ArrayBuffer(3 + F.byteLength));
                        I.setUint8(0, 7), I.setUint16(1, F.byteLength, !1);
                        let Y = new Uint8Array(I.buffer);
                        return Y.set(F, 3), Y;
                    case "timestamp":
                        let W = new Uint8Array(9);
                        return W[0] = 8, W.set(Zp9.fromNumber(A.value.valueOf()).bytes, 1), W;
                    case "uuid":
                        if (!Qp9.test(A.value)) throw new Error(`Invalid UUID received: ${A.value}`);
                        let J = new Uint8Array(17);
                        return J[0] = 9, J.set(qk.fromHex(A.value.replace(/\-/g, "")), 1), J
                }
            }
        },
        Qp9 = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
        Zp9 = class A {
            constructor(B) {
                if (this.bytes = B, B.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes")
            }
            static {
                CY(this, "Int64")
            }
            static fromNumber(B) {
                if (B > 9223372036854776000 || B < -9223372036854776000) throw new Error(`${B} is too large (or, if negative, too small) to represent as an Int64`);
                let Q = new Uint8Array(8);
                for (let Z = 7, D = Math.abs(Math.round(B)); Z > -1 && D > 0; Z--, D /= 256) Q[Z] = D;
                if (B < 0) Xa1(Q);
                return new A(Q)
            }
            valueOf() {
                let B = this.bytes.slice(0),
                    Q = B[0] & 128;
                if (Q) Xa1(B);
                return parseInt(qk.toHex(B), 16) * (Q ? -1 : 1)
            }
            toString() {
                return String(this.valueOf())
            }
        };

    function Xa1(A) {
        for (let B = 0; B < 8; B++) A[B] ^= 255;
        for (let B = 7; B > -1; B--)
            if (A[B]++, A[B] !== 0) break
    }
    CY(Xa1, "negate");
    var y9A = CY((A, B) => {
            A = A.toLowerCase();
            for (let Q of Object.keys(B))
                if (A === Q.toLowerCase()) return !0;
            return !1
        }, "hasHeader"),
        _9A = CV(),
        x9A = CY((A, B = {}) => {
            let {
                headers: Q,
                query: Z = {}
            } = _9A.HttpRequest.clone(A);
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
        Va1 = CY((A) => {
            A = _9A.HttpRequest.clone(A);
            for (let B of Object.keys(A.headers))
                if (q9A.indexOf(B.toLowerCase()) > -1) delete A.headers[B];
            return A
        }, "prepareRequest"),
        K9A = E5(),
        Dp9 = lB(),
        TK1 = J9A(),
        v9A = CY(({
            query: A = {}
        }) => {
            let B = [],
                Q = {};
            for (let Z of Object.keys(A)) {
                if (Z.toLowerCase() === N9A) continue;
                let D = TK1.escapeUri(Z);
                B.push(D);
                let G = A[Z];
                if (typeof G === "string") Q[D] = `${D}=${TK1.escapeUri(G)}`;
                else if (Array.isArray(G)) Q[D] = G.slice(0).reduce((F, I) => F.concat([`${D}=${TK1.escapeUri(I)}`]), []).sort().join("&")
            }
            return B.sort().map((Z) => Q[Z]).filter((Z) => Z).join("&")
        }, "getCanonicalQuery"),
        Gp9 = CY((A) => Fp9(A).toISOString().replace(/\.\d{3}Z$/, "Z"), "iso8601"),
        Fp9 = CY((A) => {
            if (typeof A === "number") return new Date(A * 1000);
            if (typeof A === "string") {
                if (Number(A)) return new Date(Number(A) * 1000);
                return new Date(A)
            }
            return A
        }, "toDate"),
        b9A = class {
            static {
                CY(this, "SignatureV4Base")
            }
            constructor({
                applyChecksum: A,
                credentials: B,
                region: Q,
                service: Z,
                sha256: D,
                uriEscapePath: G = !0
            }) {
                this.service = Z, this.sha256 = D, this.uriEscapePath = G, this.applyChecksum = typeof A === "boolean" ? A : !0, this.regionProvider = K9A.normalizeProvider(Q), this.credentialProvider = K9A.normalizeProvider(B)
            }
            createCanonicalRequest(A, B, Q) {
                let Z = Object.keys(B).sort();
                return `${A.method}
${this.getCanonicalPath(A)}
${v9A(A)}
${Z.map((D)=>`${D}:${B[D]}`).join(`
`)}

${Z.join(";")}
${Q}`
            }
            async createStringToSign(A, B, Q, Z) {
                let D = new this.sha256;
                D.update(Dp9.toUint8Array(Q));
                let G = await D.digest();
                return `${Z}
${A}
${B}
${qk.toHex(G)}`
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
                    return TK1.escapeUri(Q).replace(/%2F/g, "/")
                }
                return A
            }
            validateResolvedCredentials(A) {
                if (typeof A !== "object" || typeof A.accessKeyId !== "string" || typeof A.secretAccessKey !== "string") throw new Error("Resolved credential object is not valid")
            }
            formatDate(A) {
                let B = Gp9(A).replace(/[\-:]/g, "");
                return {
                    longDate: B,
                    shortDate: B.slice(0, 8)
                }
            }
            getCanonicalHeaderList(A) {
                return Object.keys(A).sort().join(";")
            }
        },
        Ip9 = class extends b9A {
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
                this.headerFormatter = new Bp9
            }
            static {
                CY(this, "SignatureV4")
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
                if (Z > j9A) return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
                let K = RK1(C, X, W ?? this.service),
                    H = x9A(Va1(A), {
                        unhoistableHeaders: G,
                        hoistableHeaders: I
                    });
                if (J.sessionToken) H.query[Ha1] = J.sessionToken;
                H.query[z9A] = LK1, H.query[E9A] = `${J.accessKeyId}/${K}`, H.query[Ca1] = V, H.query[w9A] = Z.toString(10);
                let z = Ja1(H, D, F);
                return H.query[U9A] = this.getCanonicalHeaderList(z), H.query[Ka1] = await this.getSignature(V, K, this.getSigningKey(J, X, C, W), this.createCanonicalRequest(H, z, await OK1(A, this.sha256))), H
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
                    W = RK1(I, F, G ?? this.service),
                    J = await OK1({
                        headers: {},
                        body: B
                    }, this.sha256),
                    X = new this.sha256;
                X.update(A);
                let V = qk.toHex(await X.digest()),
                    C = [T9A, Y, W, Z, V, J].join(`
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
                return I.update(X9A.toUint8Array(A)), qk.toHex(await I.digest())
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
                    Y = Va1(A),
                    {
                        longDate: W,
                        shortDate: J
                    } = this.formatDate(B),
                    X = RK1(J, I, G ?? this.service);
                if (Y.headers[Ea1] = W, F.sessionToken) Y.headers[L9A] = F.sessionToken;
                let V = await OK1(Y, this.sha256);
                if (!y9A(PK1, Y.headers) && this.applyChecksum) Y.headers[PK1] = V;
                let C = Ja1(Y, Z, Q),
                    K = await this.getSignature(W, X, this.getSigningKey(F, I, J, G), this.createCanonicalRequest(Y, C, V));
                return Y.headers[za1] = `${LK1} Credential=${F.accessKeyId}/${X}, SignedHeaders=${this.getCanonicalHeaderList(C)}, Signature=${K}`, Y
            }
            async getSignature(A, B, Q, Z) {
                let D = await this.createStringToSign(A, B, Z, LK1),
                    G = new this.sha256(await Q);
                return G.update(X9A.toUint8Array(D)), qk.toHex(await G.digest())
            }
            getSigningKey(A, B, Q, Z) {
                return k9A(this.sha256, A, Q, B, Z || this.service)
            }
        },
        Yp9 = {
            SignatureV4a: null
        }
});