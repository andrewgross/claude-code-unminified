/* chunk:251 bytes:[5380882, 5401233) size:20351 source:unpacked-cli.js */
var cD2 = E((vq5, dD2) => {
    var {
        defineProperty: jL1,
        getOwnPropertyDescriptor: hN4,
        getOwnPropertyNames: gN4
    } = Object, uN4 = Object.prototype.hasOwnProperty, cY = (A, B) => jL1(A, "name", {
        value: B,
        configurable: !0
    }), mN4 = (A, B) => {
        for (var Q in B) jL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, dN4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of gN4(B))
                if (!uN4.call(A, D) && D !== Q) jL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = hN4(B, D)) || Z.enumerable
                })
        }
        return A
    }, cN4 = (A) => dN4(jL1({}, "__esModule", {
        value: !0
    }), A), $D2 = {};
    mN4($D2, {
        ALGORITHM_IDENTIFIER: () => ML1,
        ALGORITHM_IDENTIFIER_V4A: () => nN4,
        ALGORITHM_QUERY_PARAM: () => qD2,
        ALWAYS_UNSIGNABLE_HEADERS: () => SD2,
        AMZ_DATE_HEADER: () => O30,
        AMZ_DATE_QUERY_PARAM: () => N30,
        AUTH_HEADER: () => R30,
        CREDENTIAL_QUERY_PARAM: () => ND2,
        DATE_HEADER: () => RD2,
        EVENT_ALGORITHM_IDENTIFIER: () => yD2,
        EXPIRES_QUERY_PARAM: () => MD2,
        GENERATED_HEADERS: () => OD2,
        HOST_HEADER: () => pN4,
        KEY_TYPE_IDENTIFIER: () => T30,
        MAX_CACHE_SIZE: () => xD2,
        MAX_PRESIGNED_TTL: () => vD2,
        PROXY_HEADER_PATTERN: () => jD2,
        REGION_SET_PARAM: () => lN4,
        SEC_HEADER_PATTERN: () => kD2,
        SHA256_HEADER: () => SL1,
        SIGNATURE_HEADER: () => TD2,
        SIGNATURE_QUERY_PARAM: () => L30,
        SIGNED_HEADERS_QUERY_PARAM: () => LD2,
        SignatureV4: () => DL4,
        SignatureV4Base: () => mD2,
        TOKEN_HEADER: () => PD2,
        TOKEN_QUERY_PARAM: () => M30,
        UNSIGNABLE_PATTERNS: () => iN4,
        UNSIGNED_PAYLOAD: () => _D2,
        clearCredentialCache: () => sN4,
        createScope: () => OL1,
        getCanonicalHeaders: () => w30,
        getCanonicalQuery: () => uD2,
        getPayloadHash: () => TL1,
        getSigningKey: () => bD2,
        hasHeader: () => fD2,
        moveHeadersToQuery: () => gD2,
        prepareRequest: () => q30,
        signatureV4aContainer: () => GL4
    });
    dD2.exports = cN4($D2);
    var zD2 = lB(),
        qD2 = "X-Amz-Algorithm",
        ND2 = "X-Amz-Credential",
        N30 = "X-Amz-Date",
        LD2 = "X-Amz-SignedHeaders",
        MD2 = "X-Amz-Expires",
        L30 = "X-Amz-Signature",
        M30 = "X-Amz-Security-Token",
        lN4 = "X-Amz-Region-Set",
        R30 = "authorization",
        O30 = N30.toLowerCase(),
        RD2 = "date",
        OD2 = [R30, O30, RD2],
        TD2 = L30.toLowerCase(),
        SL1 = "x-amz-content-sha256",
        PD2 = M30.toLowerCase(),
        pN4 = "host",
        SD2 = {
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
        jD2 = /^proxy-/,
        kD2 = /^sec-/,
        iN4 = [/^proxy-/i, /^sec-/i],
        ML1 = "AWS4-HMAC-SHA256",
        nN4 = "AWS4-ECDSA-P256-SHA256",
        yD2 = "AWS4-HMAC-SHA256-PAYLOAD",
        _D2 = "UNSIGNED-PAYLOAD",
        xD2 = 50,
        T30 = "aws4_request",
        vD2 = 604800,
        E_ = Uk(),
        aN4 = lB(),
        xr = {},
        RL1 = [],
        OL1 = cY((A, B, Q) => `${A}/${B}/${Q}/${T30}`, "createScope"),
        bD2 = cY(async (A, B, Q, Z, D) => {
            let G = await ED2(A, B.secretAccessKey, B.accessKeyId),
                F = `${Q}:${Z}:${D}:${E_.toHex(G)}:${B.sessionToken}`;
            if (F in xr) return xr[F];
            RL1.push(F);
            while (RL1.length > xD2) delete xr[RL1.shift()];
            let I = `AWS4${B.secretAccessKey}`;
            for (let Y of [Q, Z, D, T30]) I = await ED2(A, I, Y);
            return xr[F] = I
        }, "getSigningKey"),
        sN4 = cY(() => {
            RL1.length = 0, Object.keys(xr).forEach((A) => {
                delete xr[A]
            })
        }, "clearCredentialCache"),
        ED2 = cY((A, B, Q) => {
            let Z = new A(B);
            return Z.update(aN4.toUint8Array(Q)), Z.digest()
        }, "hmac"),
        w30 = cY(({
            headers: A
        }, B, Q) => {
            let Z = {};
            for (let D of Object.keys(A).sort()) {
                if (A[D] == null) continue;
                let G = D.toLowerCase();
                if (G in SD2 || B?.has(G) || jD2.test(G) || kD2.test(G)) {
                    if (!Q || Q && !Q.has(G)) continue
                }
                Z[G] = A[D].trim().replace(/\s+/g, " ")
            }
            return Z
        }, "getCanonicalHeaders"),
        rN4 = XD2(),
        oN4 = lB(),
        TL1 = cY(async ({
            headers: A,
            body: B
        }, Q) => {
            for (let Z of Object.keys(A))
                if (Z.toLowerCase() === SL1) return A[Z];
            if (B == null) return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            else if (typeof B === "string" || ArrayBuffer.isView(B) || rN4.isArrayBuffer(B)) {
                let Z = new Q;
                return Z.update(oN4.toUint8Array(B)), E_.toHex(await Z.digest())
            }
            return _D2
        }, "getPayloadHash"),
        UD2 = lB(),
        tN4 = class {
            static {
                cY(this, "HeaderFormatter")
            }
            format(A) {
                let B = [];
                for (let D of Object.keys(A)) {
                    let G = UD2.fromUtf8(D);
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
                        let F = UD2.fromUtf8(A.value),
                            I = new DataView(new ArrayBuffer(3 + F.byteLength));
                        I.setUint8(0, 7), I.setUint16(1, F.byteLength, !1);
                        let Y = new Uint8Array(I.buffer);
                        return Y.set(F, 3), Y;
                    case "timestamp":
                        let W = new Uint8Array(9);
                        return W[0] = 8, W.set(AL4.fromNumber(A.value.valueOf()).bytes, 1), W;
                    case "uuid":
                        if (!eN4.test(A.value)) throw new Error(`Invalid UUID received: ${A.value}`);
                        let J = new Uint8Array(17);
                        return J[0] = 9, J.set(E_.fromHex(A.value.replace(/\-/g, "")), 1), J
                }
            }
        },
        eN4 = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
        AL4 = class A {
            constructor(B) {
                if (this.bytes = B, B.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes")
            }
            static {
                cY(this, "Int64")
            }
            static fromNumber(B) {
                if (B > 9223372036854776000 || B < -9223372036854776000) throw new Error(`${B} is too large (or, if negative, too small) to represent as an Int64`);
                let Q = new Uint8Array(8);
                for (let Z = 7, D = Math.abs(Math.round(B)); Z > -1 && D > 0; Z--, D /= 256) Q[Z] = D;
                if (B < 0) $30(Q);
                return new A(Q)
            }
            valueOf() {
                let B = this.bytes.slice(0),
                    Q = B[0] & 128;
                if (Q) $30(B);
                return parseInt(E_.toHex(B), 16) * (Q ? -1 : 1)
            }
            toString() {
                return String(this.valueOf())
            }
        };

    function $30(A) {
        for (let B = 0; B < 8; B++) A[B] ^= 255;
        for (let B = 7; B > -1; B--)
            if (A[B]++, A[B] !== 0) break
    }
    cY($30, "negate");
    var fD2 = cY((A, B) => {
            A = A.toLowerCase();
            for (let Q of Object.keys(B))
                if (A === Q.toLowerCase()) return !0;
            return !1
        }, "hasHeader"),
        hD2 = vV(),
        gD2 = cY((A, B = {}) => {
            let {
                headers: Q,
                query: Z = {}
            } = hD2.HttpRequest.clone(A);
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
        q30 = cY((A) => {
            A = hD2.HttpRequest.clone(A);
            for (let B of Object.keys(A.headers))
                if (OD2.indexOf(B.toLowerCase()) > -1) delete A.headers[B];
            return A
        }, "prepareRequest"),
        wD2 = E5(),
        BL4 = lB(),
        PL1 = HD2(),
        uD2 = cY(({
            query: A = {}
        }) => {
            let B = [],
                Q = {};
            for (let Z of Object.keys(A)) {
                if (Z.toLowerCase() === TD2) continue;
                let D = PL1.escapeUri(Z);
                B.push(D);
                let G = A[Z];
                if (typeof G === "string") Q[D] = `${D}=${PL1.escapeUri(G)}`;
                else if (Array.isArray(G)) Q[D] = G.slice(0).reduce((F, I) => F.concat([`${D}=${PL1.escapeUri(I)}`]), []).sort().join("&")
            }
            return B.sort().map((Z) => Q[Z]).filter((Z) => Z).join("&")
        }, "getCanonicalQuery"),
        QL4 = cY((A) => ZL4(A).toISOString().replace(/\.\d{3}Z$/, "Z"), "iso8601"),
        ZL4 = cY((A) => {
            if (typeof A === "number") return new Date(A * 1000);
            if (typeof A === "string") {
                if (Number(A)) return new Date(Number(A) * 1000);
                return new Date(A)
            }
            return A
        }, "toDate"),
        mD2 = class {
            static {
                cY(this, "SignatureV4Base")
            }
            constructor({
                applyChecksum: A,
                credentials: B,
                region: Q,
                service: Z,
                sha256: D,
                uriEscapePath: G = !0
            }) {
                this.service = Z, this.sha256 = D, this.uriEscapePath = G, this.applyChecksum = typeof A === "boolean" ? A : !0, this.regionProvider = wD2.normalizeProvider(Q), this.credentialProvider = wD2.normalizeProvider(B)
            }
            createCanonicalRequest(A, B, Q) {
                let Z = Object.keys(B).sort();
                return `${A.method}
${this.getCanonicalPath(A)}
${uD2(A)}
${Z.map((D)=>`${D}:${B[D]}`).join(`
`)}

${Z.join(";")}
${Q}`
            }
            async createStringToSign(A, B, Q, Z) {
                let D = new this.sha256;
                D.update(BL4.toUint8Array(Q));
                let G = await D.digest();
                return `${Z}
${A}
${B}
${E_.toHex(G)}`
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
                    return PL1.escapeUri(Q).replace(/%2F/g, "/")
                }
                return A
            }
            validateResolvedCredentials(A) {
                if (typeof A !== "object" || typeof A.accessKeyId !== "string" || typeof A.secretAccessKey !== "string") throw new Error("Resolved credential object is not valid")
            }
            formatDate(A) {
                let B = QL4(A).replace(/[\-:]/g, "");
                return {
                    longDate: B,
                    shortDate: B.slice(0, 8)
                }
            }
            getCanonicalHeaderList(A) {
                return Object.keys(A).sort().join(";")
            }
        },
        DL4 = class extends mD2 {
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
                this.headerFormatter = new tN4
            }
            static {
                cY(this, "SignatureV4")
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
                if (Z > vD2) return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
                let K = OL1(C, X, W ?? this.service),
                    H = gD2(q30(A), {
                        unhoistableHeaders: G,
                        hoistableHeaders: I
                    });
                if (J.sessionToken) H.query[M30] = J.sessionToken;
                H.query[qD2] = ML1, H.query[ND2] = `${J.accessKeyId}/${K}`, H.query[N30] = V, H.query[MD2] = Z.toString(10);
                let z = w30(H, D, F);
                return H.query[LD2] = this.getCanonicalHeaderList(z), H.query[L30] = await this.getSignature(V, K, this.getSigningKey(J, X, C, W), this.createCanonicalRequest(H, z, await TL1(A, this.sha256))), H
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
                    W = OL1(I, F, G ?? this.service),
                    J = await TL1({
                        headers: {},
                        body: B
                    }, this.sha256),
                    X = new this.sha256;
                X.update(A);
                let V = E_.toHex(await X.digest()),
                    C = [yD2, Y, W, Z, V, J].join(`
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
                return I.update(zD2.toUint8Array(A)), E_.toHex(await I.digest())
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
                    Y = q30(A),
                    {
                        longDate: W,
                        shortDate: J
                    } = this.formatDate(B),
                    X = OL1(J, I, G ?? this.service);
                if (Y.headers[O30] = W, F.sessionToken) Y.headers[PD2] = F.sessionToken;
                let V = await TL1(Y, this.sha256);
                if (!fD2(SL1, Y.headers) && this.applyChecksum) Y.headers[SL1] = V;
                let C = w30(Y, Z, Q),
                    K = await this.getSignature(W, X, this.getSigningKey(F, I, J, G), this.createCanonicalRequest(Y, C, V));
                return Y.headers[R30] = `${ML1} Credential=${F.accessKeyId}/${X}, SignedHeaders=${this.getCanonicalHeaderList(C)}, Signature=${K}`, Y
            }
            async getSignature(A, B, Q, Z) {
                let D = await this.createStringToSign(A, B, Z, ML1),
                    G = new this.sha256(await Q);
                return G.update(zD2.toUint8Array(D)), E_.toHex(await G.digest())
            }
            getSigningKey(A, B, Q, Z) {
                return bD2(this.sha256, A, Q, B, Z || this.service)
            }
        },
        GL4 = {
            SignatureV4a: null
        }
});