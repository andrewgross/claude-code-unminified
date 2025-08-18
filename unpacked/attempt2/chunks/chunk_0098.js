/* chunk:98 bytes:[2346676, 2367028) size:20352 source:unpacked-cli.js */
var JHA = E((c95, WHA) => {
    var {
        defineProperty: uz1,
        getOwnPropertyDescriptor: FXQ,
        getOwnPropertyNames: IXQ
    } = Object, YXQ = Object.prototype.hasOwnProperty, UY = (A, B) => uz1(A, "name", {
        value: B,
        configurable: !0
    }), WXQ = (A, B) => {
        for (var Q in B) uz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, JXQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of IXQ(B))
                if (!YXQ.call(A, D) && D !== Q) uz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = FXQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, XXQ = (A) => JXQ(uz1({}, "__esModule", {
        value: !0
    }), A), mKA = {};
    WXQ(mKA, {
        ALGORITHM_IDENTIFIER: () => xz1,
        ALGORITHM_IDENTIFIER_V4A: () => HXQ,
        ALGORITHM_QUERY_PARAM: () => dKA,
        ALWAYS_UNSIGNABLE_HEADERS: () => rKA,
        AMZ_DATE_HEADER: () => Rt1,
        AMZ_DATE_QUERY_PARAM: () => qt1,
        AUTH_HEADER: () => Mt1,
        CREDENTIAL_QUERY_PARAM: () => cKA,
        DATE_HEADER: () => iKA,
        EVENT_ALGORITHM_IDENTIFIER: () => eKA,
        EXPIRES_QUERY_PARAM: () => pKA,
        GENERATED_HEADERS: () => nKA,
        HOST_HEADER: () => CXQ,
        KEY_TYPE_IDENTIFIER: () => Ot1,
        MAX_CACHE_SIZE: () => BHA,
        MAX_PRESIGNED_TTL: () => QHA,
        PROXY_HEADER_PATTERN: () => oKA,
        REGION_SET_PARAM: () => VXQ,
        SEC_HEADER_PATTERN: () => tKA,
        SHA256_HEADER: () => gz1,
        SIGNATURE_HEADER: () => aKA,
        SIGNATURE_QUERY_PARAM: () => Nt1,
        SIGNED_HEADERS_QUERY_PARAM: () => lKA,
        SignatureV4: () => OXQ,
        SignatureV4Base: () => YHA,
        TOKEN_HEADER: () => sKA,
        TOKEN_QUERY_PARAM: () => Lt1,
        UNSIGNABLE_PATTERNS: () => KXQ,
        UNSIGNED_PAYLOAD: () => AHA,
        clearCredentialCache: () => EXQ,
        createScope: () => bz1,
        getCanonicalHeaders: () => Ut1,
        getCanonicalQuery: () => IHA,
        getPayloadHash: () => fz1,
        getSigningKey: () => ZHA,
        hasHeader: () => DHA,
        moveHeadersToQuery: () => FHA,
        prepareRequest: () => $t1,
        signatureV4aContainer: () => TXQ
    });
    WHA.exports = XXQ(mKA);
    var fKA = lB(),
        dKA = "X-Amz-Algorithm",
        cKA = "X-Amz-Credential",
        qt1 = "X-Amz-Date",
        lKA = "X-Amz-SignedHeaders",
        pKA = "X-Amz-Expires",
        Nt1 = "X-Amz-Signature",
        Lt1 = "X-Amz-Security-Token",
        VXQ = "X-Amz-Region-Set",
        Mt1 = "authorization",
        Rt1 = qt1.toLowerCase(),
        iKA = "date",
        nKA = [Mt1, Rt1, iKA],
        aKA = Nt1.toLowerCase(),
        gz1 = "x-amz-content-sha256",
        sKA = Lt1.toLowerCase(),
        CXQ = "host",
        rKA = {
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
        oKA = /^proxy-/,
        tKA = /^sec-/,
        KXQ = [/^proxy-/i, /^sec-/i],
        xz1 = "AWS4-HMAC-SHA256",
        HXQ = "AWS4-ECDSA-P256-SHA256",
        eKA = "AWS4-HMAC-SHA256-PAYLOAD",
        AHA = "UNSIGNED-PAYLOAD",
        BHA = 50,
        Ot1 = "aws4_request",
        QHA = 604800,
        uk = Uk(),
        zXQ = lB(),
        _i = {},
        vz1 = [],
        bz1 = UY((A, B, Q) => `${A}/${B}/${Q}/${Ot1}`, "createScope"),
        ZHA = UY(async (A, B, Q, Z, D) => {
            let G = await hKA(A, B.secretAccessKey, B.accessKeyId),
                F = `${Q}:${Z}:${D}:${uk.toHex(G)}:${B.sessionToken}`;
            if (F in _i) return _i[F];
            vz1.push(F);
            while (vz1.length > BHA) delete _i[vz1.shift()];
            let I = `AWS4${B.secretAccessKey}`;
            for (let Y of [Q, Z, D, Ot1]) I = await hKA(A, I, Y);
            return _i[F] = I
        }, "getSigningKey"),
        EXQ = UY(() => {
            vz1.length = 0, Object.keys(_i).forEach((A) => {
                delete _i[A]
            })
        }, "clearCredentialCache"),
        hKA = UY((A, B, Q) => {
            let Z = new A(B);
            return Z.update(zXQ.toUint8Array(Q)), Z.digest()
        }, "hmac"),
        Ut1 = UY(({
            headers: A
        }, B, Q) => {
            let Z = {};
            for (let D of Object.keys(A).sort()) {
                if (A[D] == null) continue;
                let G = D.toLowerCase();
                if (G in rKA || B?.has(G) || oKA.test(G) || tKA.test(G)) {
                    if (!Q || Q && !Q.has(G)) continue
                }
                Z[G] = A[D].trim().replace(/\s+/g, " ")
            }
            return Z
        }, "getCanonicalHeaders"),
        UXQ = yKA(),
        wXQ = lB(),
        fz1 = UY(async ({
            headers: A,
            body: B
        }, Q) => {
            for (let Z of Object.keys(A))
                if (Z.toLowerCase() === gz1) return A[Z];
            if (B == null) return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            else if (typeof B === "string" || ArrayBuffer.isView(B) || UXQ.isArrayBuffer(B)) {
                let Z = new Q;
                return Z.update(wXQ.toUint8Array(B)), uk.toHex(await Z.digest())
            }
            return AHA
        }, "getPayloadHash"),
        gKA = lB(),
        $XQ = class {
            static {
                UY(this, "HeaderFormatter")
            }
            format(A) {
                let B = [];
                for (let D of Object.keys(A)) {
                    let G = gKA.fromUtf8(D);
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
                        let F = gKA.fromUtf8(A.value),
                            I = new DataView(new ArrayBuffer(3 + F.byteLength));
                        I.setUint8(0, 7), I.setUint16(1, F.byteLength, !1);
                        let Y = new Uint8Array(I.buffer);
                        return Y.set(F, 3), Y;
                    case "timestamp":
                        let W = new Uint8Array(9);
                        return W[0] = 8, W.set(NXQ.fromNumber(A.value.valueOf()).bytes, 1), W;
                    case "uuid":
                        if (!qXQ.test(A.value)) throw new Error(`Invalid UUID received: ${A.value}`);
                        let J = new Uint8Array(17);
                        return J[0] = 9, J.set(uk.fromHex(A.value.replace(/\-/g, "")), 1), J
                }
            }
        },
        qXQ = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
        NXQ = class A {
            constructor(B) {
                if (this.bytes = B, B.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes")
            }
            static {
                UY(this, "Int64")
            }
            static fromNumber(B) {
                if (B > 9223372036854776000 || B < -9223372036854776000) throw new Error(`${B} is too large (or, if negative, too small) to represent as an Int64`);
                let Q = new Uint8Array(8);
                for (let Z = 7, D = Math.abs(Math.round(B)); Z > -1 && D > 0; Z--, D /= 256) Q[Z] = D;
                if (B < 0) wt1(Q);
                return new A(Q)
            }
            valueOf() {
                let B = this.bytes.slice(0),
                    Q = B[0] & 128;
                if (Q) wt1(B);
                return parseInt(uk.toHex(B), 16) * (Q ? -1 : 1)
            }
            toString() {
                return String(this.valueOf())
            }
        };

    function wt1(A) {
        for (let B = 0; B < 8; B++) A[B] ^= 255;
        for (let B = 7; B > -1; B--)
            if (A[B]++, A[B] !== 0) break
    }
    UY(wt1, "negate");
    var DHA = UY((A, B) => {
            A = A.toLowerCase();
            for (let Q of Object.keys(B))
                if (A === Q.toLowerCase()) return !0;
            return !1
        }, "hasHeader"),
        GHA = YQ1(),
        FHA = UY((A, B = {}) => {
            let {
                headers: Q,
                query: Z = {}
            } = GHA.HttpRequest.clone(A);
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
        $t1 = UY((A) => {
            A = GHA.HttpRequest.clone(A);
            for (let B of Object.keys(A.headers))
                if (nKA.indexOf(B.toLowerCase()) > -1) delete A.headers[B];
            return A
        }, "prepareRequest"),
        uKA = E5(),
        LXQ = lB(),
        hz1 = bKA(),
        IHA = UY(({
            query: A = {}
        }) => {
            let B = [],
                Q = {};
            for (let Z of Object.keys(A)) {
                if (Z.toLowerCase() === aKA) continue;
                let D = hz1.escapeUri(Z);
                B.push(D);
                let G = A[Z];
                if (typeof G === "string") Q[D] = `${D}=${hz1.escapeUri(G)}`;
                else if (Array.isArray(G)) Q[D] = G.slice(0).reduce((F, I) => F.concat([`${D}=${hz1.escapeUri(I)}`]), []).sort().join("&")
            }
            return B.sort().map((Z) => Q[Z]).filter((Z) => Z).join("&")
        }, "getCanonicalQuery"),
        MXQ = UY((A) => RXQ(A).toISOString().replace(/\.\d{3}Z$/, "Z"), "iso8601"),
        RXQ = UY((A) => {
            if (typeof A === "number") return new Date(A * 1000);
            if (typeof A === "string") {
                if (Number(A)) return new Date(Number(A) * 1000);
                return new Date(A)
            }
            return A
        }, "toDate"),
        YHA = class {
            static {
                UY(this, "SignatureV4Base")
            }
            constructor({
                applyChecksum: A,
                credentials: B,
                region: Q,
                service: Z,
                sha256: D,
                uriEscapePath: G = !0
            }) {
                this.service = Z, this.sha256 = D, this.uriEscapePath = G, this.applyChecksum = typeof A === "boolean" ? A : !0, this.regionProvider = uKA.normalizeProvider(Q), this.credentialProvider = uKA.normalizeProvider(B)
            }
            createCanonicalRequest(A, B, Q) {
                let Z = Object.keys(B).sort();
                return `${A.method}
${this.getCanonicalPath(A)}
${IHA(A)}
${Z.map((D)=>`${D}:${B[D]}`).join(`
`)}

${Z.join(";")}
${Q}`
            }
            async createStringToSign(A, B, Q, Z) {
                let D = new this.sha256;
                D.update(LXQ.toUint8Array(Q));
                let G = await D.digest();
                return `${Z}
${A}
${B}
${uk.toHex(G)}`
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
                    return hz1.escapeUri(Q).replace(/%2F/g, "/")
                }
                return A
            }
            validateResolvedCredentials(A) {
                if (typeof A !== "object" || typeof A.accessKeyId !== "string" || typeof A.secretAccessKey !== "string") throw new Error("Resolved credential object is not valid")
            }
            formatDate(A) {
                let B = MXQ(A).replace(/[\-:]/g, "");
                return {
                    longDate: B,
                    shortDate: B.slice(0, 8)
                }
            }
            getCanonicalHeaderList(A) {
                return Object.keys(A).sort().join(";")
            }
        },
        OXQ = class extends YHA {
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
                this.headerFormatter = new $XQ
            }
            static {
                UY(this, "SignatureV4")
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
                if (Z > QHA) return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
                let K = bz1(C, X, W ?? this.service),
                    H = FHA($t1(A), {
                        unhoistableHeaders: G,
                        hoistableHeaders: I
                    });
                if (J.sessionToken) H.query[Lt1] = J.sessionToken;
                H.query[dKA] = xz1, H.query[cKA] = `${J.accessKeyId}/${K}`, H.query[qt1] = V, H.query[pKA] = Z.toString(10);
                let z = Ut1(H, D, F);
                return H.query[lKA] = this.getCanonicalHeaderList(z), H.query[Nt1] = await this.getSignature(V, K, this.getSigningKey(J, X, C, W), this.createCanonicalRequest(H, z, await fz1(A, this.sha256))), H
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
                    W = bz1(I, F, G ?? this.service),
                    J = await fz1({
                        headers: {},
                        body: B
                    }, this.sha256),
                    X = new this.sha256;
                X.update(A);
                let V = uk.toHex(await X.digest()),
                    C = [eKA, Y, W, Z, V, J].join(`
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
                return I.update(fKA.toUint8Array(A)), uk.toHex(await I.digest())
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
                    Y = $t1(A),
                    {
                        longDate: W,
                        shortDate: J
                    } = this.formatDate(B),
                    X = bz1(J, I, G ?? this.service);
                if (Y.headers[Rt1] = W, F.sessionToken) Y.headers[sKA] = F.sessionToken;
                let V = await fz1(Y, this.sha256);
                if (!DHA(gz1, Y.headers) && this.applyChecksum) Y.headers[gz1] = V;
                let C = Ut1(Y, Z, Q),
                    K = await this.getSignature(W, X, this.getSigningKey(F, I, J, G), this.createCanonicalRequest(Y, C, V));
                return Y.headers[Mt1] = `${xz1} Credential=${F.accessKeyId}/${X}, SignedHeaders=${this.getCanonicalHeaderList(C)}, Signature=${K}`, Y
            }
            async getSignature(A, B, Q, Z) {
                let D = await this.createStringToSign(A, B, Z, xz1),
                    G = new this.sha256(await Q);
                return G.update(fKA.toUint8Array(D)), uk.toHex(await G.digest())
            }
            getSigningKey(A, B, Q, Z) {
                return ZHA(this.sha256, A, Q, B, Z || this.service)
            }
        },
        TXQ = {
            SignatureV4a: null
        }
});