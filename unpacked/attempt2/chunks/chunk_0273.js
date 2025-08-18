/* chunk:273 bytes:[5823429, 5843780) size:20351 source:unpacked-cli.js */
var VH2 = E((MM5, XH2) => {
    var {
        defineProperty: uM1,
        getOwnPropertyDescriptor: Uf4,
        getOwnPropertyNames: wf4
    } = Object, $f4 = Object.prototype.hasOwnProperty, iY = (A, B) => uM1(A, "name", {
        value: B,
        configurable: !0
    }), qf4 = (A, B) => {
        for (var Q in B) uM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Nf4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of wf4(B))
                if (!$f4.call(A, D) && D !== Q) uM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Uf4(B, D)) || Z.enumerable
                })
        }
        return A
    }, Lf4 = (A) => Nf4(uM1({}, "__esModule", {
        value: !0
    }), A), cK2 = {};
    qf4(cK2, {
        ALGORITHM_IDENTIFIER: () => xM1,
        ALGORITHM_IDENTIFIER_V4A: () => Tf4,
        ALGORITHM_QUERY_PARAM: () => lK2,
        ALWAYS_UNSIGNABLE_HEADERS: () => tK2,
        AMZ_DATE_HEADER: () => eZ0,
        AMZ_DATE_QUERY_PARAM: () => sZ0,
        AUTH_HEADER: () => tZ0,
        CREDENTIAL_QUERY_PARAM: () => pK2,
        DATE_HEADER: () => aK2,
        EVENT_ALGORITHM_IDENTIFIER: () => BH2,
        EXPIRES_QUERY_PARAM: () => nK2,
        GENERATED_HEADERS: () => sK2,
        HOST_HEADER: () => Rf4,
        KEY_TYPE_IDENTIFIER: () => AD0,
        MAX_CACHE_SIZE: () => ZH2,
        MAX_PRESIGNED_TTL: () => DH2,
        PROXY_HEADER_PATTERN: () => eK2,
        REGION_SET_PARAM: () => Mf4,
        SEC_HEADER_PATTERN: () => AH2,
        SHA256_HEADER: () => gM1,
        SIGNATURE_HEADER: () => rK2,
        SIGNATURE_QUERY_PARAM: () => rZ0,
        SIGNED_HEADERS_QUERY_PARAM: () => iK2,
        SignatureV4: () => hf4,
        SignatureV4Base: () => JH2,
        TOKEN_HEADER: () => oK2,
        TOKEN_QUERY_PARAM: () => oZ0,
        UNSIGNABLE_PATTERNS: () => Of4,
        UNSIGNED_PAYLOAD: () => QH2,
        clearCredentialCache: () => Sf4,
        createScope: () => bM1,
        getCanonicalHeaders: () => iZ0,
        getCanonicalQuery: () => WH2,
        getPayloadHash: () => fM1,
        getSigningKey: () => GH2,
        hasHeader: () => FH2,
        moveHeadersToQuery: () => YH2,
        prepareRequest: () => aZ0,
        signatureV4aContainer: () => gf4
    });
    XH2.exports = Lf4(cK2);
    var gK2 = lB(),
        lK2 = "X-Amz-Algorithm",
        pK2 = "X-Amz-Credential",
        sZ0 = "X-Amz-Date",
        iK2 = "X-Amz-SignedHeaders",
        nK2 = "X-Amz-Expires",
        rZ0 = "X-Amz-Signature",
        oZ0 = "X-Amz-Security-Token",
        Mf4 = "X-Amz-Region-Set",
        tZ0 = "authorization",
        eZ0 = sZ0.toLowerCase(),
        aK2 = "date",
        sK2 = [tZ0, eZ0, aK2],
        rK2 = rZ0.toLowerCase(),
        gM1 = "x-amz-content-sha256",
        oK2 = oZ0.toLowerCase(),
        Rf4 = "host",
        tK2 = {
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
        eK2 = /^proxy-/,
        AH2 = /^sec-/,
        Of4 = [/^proxy-/i, /^sec-/i],
        xM1 = "AWS4-HMAC-SHA256",
        Tf4 = "AWS4-ECDSA-P256-SHA256",
        BH2 = "AWS4-HMAC-SHA256-PAYLOAD",
        QH2 = "UNSIGNED-PAYLOAD",
        ZH2 = 50,
        AD0 = "aws4_request",
        DH2 = 604800,
        O_ = Uk(),
        Pf4 = lB(),
        Fo = {},
        vM1 = [],
        bM1 = iY((A, B, Q) => `${A}/${B}/${Q}/${AD0}`, "createScope"),
        GH2 = iY(async (A, B, Q, Z, D) => {
            let G = await uK2(A, B.secretAccessKey, B.accessKeyId),
                F = `${Q}:${Z}:${D}:${O_.toHex(G)}:${B.sessionToken}`;
            if (F in Fo) return Fo[F];
            vM1.push(F);
            while (vM1.length > ZH2) delete Fo[vM1.shift()];
            let I = `AWS4${B.secretAccessKey}`;
            for (let Y of [Q, Z, D, AD0]) I = await uK2(A, I, Y);
            return Fo[F] = I
        }, "getSigningKey"),
        Sf4 = iY(() => {
            vM1.length = 0, Object.keys(Fo).forEach((A) => {
                delete Fo[A]
            })
        }, "clearCredentialCache"),
        uK2 = iY((A, B, Q) => {
            let Z = new A(B);
            return Z.update(Pf4.toUint8Array(Q)), Z.digest()
        }, "hmac"),
        iZ0 = iY(({
            headers: A
        }, B, Q) => {
            let Z = {};
            for (let D of Object.keys(A).sort()) {
                if (A[D] == null) continue;
                let G = D.toLowerCase();
                if (G in tK2 || B?.has(G) || eK2.test(G) || AH2.test(G)) {
                    if (!Q || Q && !Q.has(G)) continue
                }
                Z[G] = A[D].trim().replace(/\s+/g, " ")
            }
            return Z
        }, "getCanonicalHeaders"),
        jf4 = xK2(),
        kf4 = lB(),
        fM1 = iY(async ({
            headers: A,
            body: B
        }, Q) => {
            for (let Z of Object.keys(A))
                if (Z.toLowerCase() === gM1) return A[Z];
            if (B == null) return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            else if (typeof B === "string" || ArrayBuffer.isView(B) || jf4.isArrayBuffer(B)) {
                let Z = new Q;
                return Z.update(kf4.toUint8Array(B)), O_.toHex(await Z.digest())
            }
            return QH2
        }, "getPayloadHash"),
        mK2 = lB(),
        yf4 = class {
            static {
                iY(this, "HeaderFormatter")
            }
            format(A) {
                let B = [];
                for (let D of Object.keys(A)) {
                    let G = mK2.fromUtf8(D);
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
                        let F = mK2.fromUtf8(A.value),
                            I = new DataView(new ArrayBuffer(3 + F.byteLength));
                        I.setUint8(0, 7), I.setUint16(1, F.byteLength, !1);
                        let Y = new Uint8Array(I.buffer);
                        return Y.set(F, 3), Y;
                    case "timestamp":
                        let W = new Uint8Array(9);
                        return W[0] = 8, W.set(xf4.fromNumber(A.value.valueOf()).bytes, 1), W;
                    case "uuid":
                        if (!_f4.test(A.value)) throw new Error(`Invalid UUID received: ${A.value}`);
                        let J = new Uint8Array(17);
                        return J[0] = 9, J.set(O_.fromHex(A.value.replace(/\-/g, "")), 1), J
                }
            }
        },
        _f4 = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
        xf4 = class A {
            constructor(B) {
                if (this.bytes = B, B.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes")
            }
            static {
                iY(this, "Int64")
            }
            static fromNumber(B) {
                if (B > 9223372036854776000 || B < -9223372036854776000) throw new Error(`${B} is too large (or, if negative, too small) to represent as an Int64`);
                let Q = new Uint8Array(8);
                for (let Z = 7, D = Math.abs(Math.round(B)); Z > -1 && D > 0; Z--, D /= 256) Q[Z] = D;
                if (B < 0) nZ0(Q);
                return new A(Q)
            }
            valueOf() {
                let B = this.bytes.slice(0),
                    Q = B[0] & 128;
                if (Q) nZ0(B);
                return parseInt(O_.toHex(B), 16) * (Q ? -1 : 1)
            }
            toString() {
                return String(this.valueOf())
            }
        };

    function nZ0(A) {
        for (let B = 0; B < 8; B++) A[B] ^= 255;
        for (let B = 7; B > -1; B--)
            if (A[B]++, A[B] !== 0) break
    }
    iY(nZ0, "negate");
    var FH2 = iY((A, B) => {
            A = A.toLowerCase();
            for (let Q of Object.keys(B))
                if (A === Q.toLowerCase()) return !0;
            return !1
        }, "hasHeader"),
        IH2 = SK(),
        YH2 = iY((A, B = {}) => {
            let {
                headers: Q,
                query: Z = {}
            } = IH2.HttpRequest.clone(A);
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
        aZ0 = iY((A) => {
            A = IH2.HttpRequest.clone(A);
            for (let B of Object.keys(A.headers))
                if (sK2.indexOf(B.toLowerCase()) > -1) delete A.headers[B];
            return A
        }, "prepareRequest"),
        dK2 = E5(),
        vf4 = lB(),
        hM1 = hK2(),
        WH2 = iY(({
            query: A = {}
        }) => {
            let B = [],
                Q = {};
            for (let Z of Object.keys(A)) {
                if (Z.toLowerCase() === rK2) continue;
                let D = hM1.escapeUri(Z);
                B.push(D);
                let G = A[Z];
                if (typeof G === "string") Q[D] = `${D}=${hM1.escapeUri(G)}`;
                else if (Array.isArray(G)) Q[D] = G.slice(0).reduce((F, I) => F.concat([`${D}=${hM1.escapeUri(I)}`]), []).sort().join("&")
            }
            return B.sort().map((Z) => Q[Z]).filter((Z) => Z).join("&")
        }, "getCanonicalQuery"),
        bf4 = iY((A) => ff4(A).toISOString().replace(/\.\d{3}Z$/, "Z"), "iso8601"),
        ff4 = iY((A) => {
            if (typeof A === "number") return new Date(A * 1000);
            if (typeof A === "string") {
                if (Number(A)) return new Date(Number(A) * 1000);
                return new Date(A)
            }
            return A
        }, "toDate"),
        JH2 = class {
            static {
                iY(this, "SignatureV4Base")
            }
            constructor({
                applyChecksum: A,
                credentials: B,
                region: Q,
                service: Z,
                sha256: D,
                uriEscapePath: G = !0
            }) {
                this.service = Z, this.sha256 = D, this.uriEscapePath = G, this.applyChecksum = typeof A === "boolean" ? A : !0, this.regionProvider = dK2.normalizeProvider(Q), this.credentialProvider = dK2.normalizeProvider(B)
            }
            createCanonicalRequest(A, B, Q) {
                let Z = Object.keys(B).sort();
                return `${A.method}
${this.getCanonicalPath(A)}
${WH2(A)}
${Z.map((D)=>`${D}:${B[D]}`).join(`
`)}

${Z.join(";")}
${Q}`
            }
            async createStringToSign(A, B, Q, Z) {
                let D = new this.sha256;
                D.update(vf4.toUint8Array(Q));
                let G = await D.digest();
                return `${Z}
${A}
${B}
${O_.toHex(G)}`
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
                    return hM1.escapeUri(Q).replace(/%2F/g, "/")
                }
                return A
            }
            validateResolvedCredentials(A) {
                if (typeof A !== "object" || typeof A.accessKeyId !== "string" || typeof A.secretAccessKey !== "string") throw new Error("Resolved credential object is not valid")
            }
            formatDate(A) {
                let B = bf4(A).replace(/[\-:]/g, "");
                return {
                    longDate: B,
                    shortDate: B.slice(0, 8)
                }
            }
            getCanonicalHeaderList(A) {
                return Object.keys(A).sort().join(";")
            }
        },
        hf4 = class extends JH2 {
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
                this.headerFormatter = new yf4
            }
            static {
                iY(this, "SignatureV4")
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
                if (Z > DH2) return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
                let K = bM1(C, X, W ?? this.service),
                    H = YH2(aZ0(A), {
                        unhoistableHeaders: G,
                        hoistableHeaders: I
                    });
                if (J.sessionToken) H.query[oZ0] = J.sessionToken;
                H.query[lK2] = xM1, H.query[pK2] = `${J.accessKeyId}/${K}`, H.query[sZ0] = V, H.query[nK2] = Z.toString(10);
                let z = iZ0(H, D, F);
                return H.query[iK2] = this.getCanonicalHeaderList(z), H.query[rZ0] = await this.getSignature(V, K, this.getSigningKey(J, X, C, W), this.createCanonicalRequest(H, z, await fM1(A, this.sha256))), H
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
                    W = bM1(I, F, G ?? this.service),
                    J = await fM1({
                        headers: {},
                        body: B
                    }, this.sha256),
                    X = new this.sha256;
                X.update(A);
                let V = O_.toHex(await X.digest()),
                    C = [BH2, Y, W, Z, V, J].join(`
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
                return I.update(gK2.toUint8Array(A)), O_.toHex(await I.digest())
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
                    Y = aZ0(A),
                    {
                        longDate: W,
                        shortDate: J
                    } = this.formatDate(B),
                    X = bM1(J, I, G ?? this.service);
                if (Y.headers[eZ0] = W, F.sessionToken) Y.headers[oK2] = F.sessionToken;
                let V = await fM1(Y, this.sha256);
                if (!FH2(gM1, Y.headers) && this.applyChecksum) Y.headers[gM1] = V;
                let C = iZ0(Y, Z, Q),
                    K = await this.getSignature(W, X, this.getSigningKey(F, I, J, G), this.createCanonicalRequest(Y, C, V));
                return Y.headers[tZ0] = `${xM1} Credential=${F.accessKeyId}/${X}, SignedHeaders=${this.getCanonicalHeaderList(C)}, Signature=${K}`, Y
            }
            async getSignature(A, B, Q, Z) {
                let D = await this.createStringToSign(A, B, Z, xM1),
                    G = new this.sha256(await Q);
                return G.update(gK2.toUint8Array(D)), O_.toHex(await G.digest())
            }
            getSigningKey(A, B, Q, Z) {
                return GH2(this.sha256, A, Q, B, Z || this.service)
            }
        },
        gf4 = {
            SignatureV4a: null
        }
});