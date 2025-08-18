/* chunk:396 bytes:[9265440, 9285264) size:19824 source:unpacked-cli.js */
var DYB = E((zQ3, ZYB) => {
    var {
        defineProperty: hy1,
        getOwnPropertyDescriptor: Vg6,
        getOwnPropertyNames: Cg6
    } = Object, Kg6 = Object.prototype.hasOwnProperty, dz0 = (A, B) => hy1(A, "name", {
        value: B,
        configurable: !0
    }), Hg6 = (A, B) => {
        for (var Q in B) hy1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, zg6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Cg6(B))
                if (!Kg6.call(A, D) && D !== Q) hy1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Vg6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Eg6 = (A) => zg6(hy1({}, "__esModule", {
        value: !0
    }), A), BYB = {};
    Hg6(BYB, {
        escapeUri: () => QYB,
        escapeUriPath: () => wg6
    });
    ZYB.exports = Eg6(BYB);
    var QYB = dz0((A) => encodeURIComponent(A).replace(/[!'()*]/g, Ug6), "escapeUri"),
        Ug6 = dz0((A) => `%${A.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode"),
        wg6 = dz0((A) => A.split("/").map(QYB).join("/"), "escapeUriPath")
});
var MYB = E((EQ3, LYB) => {
    var {
        defineProperty: cy1,
        getOwnPropertyDescriptor: $g6,
        getOwnPropertyNames: qg6
    } = Object, Ng6 = Object.prototype.hasOwnProperty, DF = (A, B) => cy1(A, "name", {
        value: B,
        configurable: !0
    }), Lg6 = (A, B) => {
        for (var Q in B) cy1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Mg6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of qg6(B))
                if (!Ng6.call(A, D) && D !== Q) cy1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = $g6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Rg6 = (A) => Mg6(cy1({}, "__esModule", {
        value: !0
    }), A), WYB = {};
    Lg6(WYB, {
        SignatureV4: () => tg6,
        clearCredentialCache: () => dg6,
        createScope: () => my1,
        getCanonicalHeaders: () => iz0,
        getCanonicalQuery: () => EYB,
        getPayloadHash: () => dy1,
        getSigningKey: () => zYB,
        moveHeadersToQuery: () => qYB,
        prepareRequest: () => az0
    });
    LYB.exports = Rg6(WYB);
    var GYB = fIB(),
        cz0 = ED1(),
        Og6 = "X-Amz-Algorithm",
        Tg6 = "X-Amz-Credential",
        JYB = "X-Amz-Date",
        Pg6 = "X-Amz-SignedHeaders",
        Sg6 = "X-Amz-Expires",
        XYB = "X-Amz-Signature",
        VYB = "X-Amz-Security-Token",
        CYB = "authorization",
        KYB = JYB.toLowerCase(),
        jg6 = "date",
        kg6 = [CYB, KYB, jg6],
        yg6 = XYB.toLowerCase(),
        pz0 = "x-amz-content-sha256",
        _g6 = VYB.toLowerCase(),
        xg6 = {
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
        vg6 = /^proxy-/,
        bg6 = /^sec-/,
        lz0 = "AWS4-HMAC-SHA256",
        fg6 = "AWS4-HMAC-SHA256-PAYLOAD",
        hg6 = "UNSIGNED-PAYLOAD",
        gg6 = 50,
        HYB = "aws4_request",
        ug6 = 604800,
        ox = AYB(),
        mg6 = ED1(),
        re = {},
        uy1 = [],
        my1 = DF((A, B, Q) => `${A}/${B}/${Q}/${HYB}`, "createScope"),
        zYB = DF(async (A, B, Q, Z, D) => {
            let G = await FYB(A, B.secretAccessKey, B.accessKeyId),
                F = `${Q}:${Z}:${D}:${ox.toHex(G)}:${B.sessionToken}`;
            if (F in re) return re[F];
            uy1.push(F);
            while (uy1.length > gg6) delete re[uy1.shift()];
            let I = `AWS4${B.secretAccessKey}`;
            for (let Y of [Q, Z, D, HYB]) I = await FYB(A, I, Y);
            return re[F] = I
        }, "getSigningKey"),
        dg6 = DF(() => {
            uy1.length = 0, Object.keys(re).forEach((A) => {
                delete re[A]
            })
        }, "clearCredentialCache"),
        FYB = DF((A, B, Q) => {
            let Z = new A(B);
            return Z.update(mg6.toUint8Array(Q)), Z.digest()
        }, "hmac"),
        iz0 = DF(({
            headers: A
        }, B, Q) => {
            let Z = {};
            for (let D of Object.keys(A).sort()) {
                if (A[D] == null) continue;
                let G = D.toLowerCase();
                if (G in xg6 || (B == null ? void 0 : B.has(G)) || vg6.test(G) || bg6.test(G)) {
                    if (!Q || Q && !Q.has(G)) continue
                }
                Z[G] = A[D].trim().replace(/\s+/g, " ")
            }
            return Z
        }, "getCanonicalHeaders"),
        UD1 = DYB(),
        EYB = DF(({
            query: A = {}
        }) => {
            let B = [],
                Q = {};
            for (let Z of Object.keys(A).sort()) {
                if (Z.toLowerCase() === yg6) continue;
                B.push(Z);
                let D = A[Z];
                if (typeof D === "string") Q[Z] = `${UD1.escapeUri(Z)}=${UD1.escapeUri(D)}`;
                else if (Array.isArray(D)) Q[Z] = D.slice(0).reduce((G, F) => G.concat([`${UD1.escapeUri(Z)}=${UD1.escapeUri(F)}`]), []).sort().join("&")
            }
            return B.map((Z) => Q[Z]).filter((Z) => Z).join("&")
        }, "getCanonicalQuery"),
        cg6 = hz0(),
        lg6 = ED1(),
        dy1 = DF(async ({
            headers: A,
            body: B
        }, Q) => {
            for (let Z of Object.keys(A))
                if (Z.toLowerCase() === pz0) return A[Z];
            if (B == null) return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
            else if (typeof B === "string" || ArrayBuffer.isView(B) || cg6.isArrayBuffer(B)) {
                let Z = new Q;
                return Z.update(lg6.toUint8Array(B)), ox.toHex(await Z.digest())
            }
            return hg6
        }, "getPayloadHash"),
        IYB = ED1(),
        UYB = class A {
            format(B) {
                let Q = [];
                for (let G of Object.keys(B)) {
                    let F = IYB.fromUtf8(G);
                    Q.push(Uint8Array.from([F.byteLength]), F, this.formatHeaderValue(B[G]))
                }
                let Z = new Uint8Array(Q.reduce((G, F) => G + F.byteLength, 0)),
                    D = 0;
                for (let G of Q) Z.set(G, D), D += G.byteLength;
                return Z
            }
            formatHeaderValue(B) {
                switch (B.type) {
                    case "boolean":
                        return Uint8Array.from([B.value ? 0 : 1]);
                    case "byte":
                        return Uint8Array.from([2, B.value]);
                    case "short":
                        let Q = new DataView(new ArrayBuffer(3));
                        return Q.setUint8(0, 3), Q.setInt16(1, B.value, !1), new Uint8Array(Q.buffer);
                    case "integer":
                        let Z = new DataView(new ArrayBuffer(5));
                        return Z.setUint8(0, 4), Z.setInt32(1, B.value, !1), new Uint8Array(Z.buffer);
                    case "long":
                        let D = new Uint8Array(9);
                        return D[0] = 5, D.set(B.value.bytes, 1), D;
                    case "binary":
                        let G = new DataView(new ArrayBuffer(3 + B.value.byteLength));
                        G.setUint8(0, 6), G.setUint16(1, B.value.byteLength, !1);
                        let F = new Uint8Array(G.buffer);
                        return F.set(B.value, 3), F;
                    case "string":
                        let I = IYB.fromUtf8(B.value),
                            Y = new DataView(new ArrayBuffer(3 + I.byteLength));
                        Y.setUint8(0, 7), Y.setUint16(1, I.byteLength, !1);
                        let W = new Uint8Array(Y.buffer);
                        return W.set(I, 3), W;
                    case "timestamp":
                        let J = new Uint8Array(9);
                        return J[0] = 8, J.set(ng6.fromNumber(B.value.valueOf()).bytes, 1), J;
                    case "uuid":
                        if (!ig6.test(B.value)) throw new Error(`Invalid UUID received: ${B.value}`);
                        let X = new Uint8Array(17);
                        return X[0] = 9, X.set(ox.fromHex(B.value.replace(/\-/g, "")), 1), X
                }
            }
        };
    DF(UYB, "HeaderFormatter");
    var pg6 = UYB,
        ig6 = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
        wYB = class A {
            constructor(B) {
                if (this.bytes = B, B.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes")
            }
            static fromNumber(B) {
                if (B > 9223372036854776000 || B < -9223372036854776000) throw new Error(`${B} is too large (or, if negative, too small) to represent as an Int64`);
                let Q = new Uint8Array(8);
                for (let Z = 7, D = Math.abs(Math.round(B)); Z > -1 && D > 0; Z--, D /= 256) Q[Z] = D;
                if (B < 0) nz0(Q);
                return new A(Q)
            }
            valueOf() {
                let B = this.bytes.slice(0),
                    Q = B[0] & 128;
                if (Q) nz0(B);
                return parseInt(ox.toHex(B), 16) * (Q ? -1 : 1)
            }
            toString() {
                return String(this.valueOf())
            }
        };
    DF(wYB, "Int64");
    var ng6 = wYB;

    function nz0(A) {
        for (let B = 0; B < 8; B++) A[B] ^= 255;
        for (let B = 7; B > -1; B--)
            if (A[B]++, A[B] !== 0) break
    }
    DF(nz0, "negate");
    var ag6 = DF((A, B) => {
            A = A.toLowerCase();
            for (let Q of Object.keys(B))
                if (A === Q.toLowerCase()) return !0;
            return !1
        }, "hasHeader"),
        $YB = DF(({
            headers: A,
            query: B,
            ...Q
        }) => ({
            ...Q,
            headers: {
                ...A
            },
            query: B ? sg6(B) : void 0
        }), "cloneRequest"),
        sg6 = DF((A) => Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {}), "cloneQuery"),
        qYB = DF((A, B = {}) => {
            var Q;
            let {
                headers: Z,
                query: D = {}
            } = typeof A.clone === "function" ? A.clone() : $YB(A);
            for (let G of Object.keys(Z)) {
                let F = G.toLowerCase();
                if (F.slice(0, 6) === "x-amz-" && !((Q = B.unhoistableHeaders) == null ? void 0 : Q.has(F))) D[G] = Z[G], delete Z[G]
            }
            return {
                ...A,
                headers: Z,
                query: D
            }
        }, "moveHeadersToQuery"),
        az0 = DF((A) => {
            A = typeof A.clone === "function" ? A.clone() : $YB(A);
            for (let B of Object.keys(A.headers))
                if (kg6.indexOf(B.toLowerCase()) > -1) delete A.headers[B];
            return A
        }, "prepareRequest"),
        rg6 = DF((A) => og6(A).toISOString().replace(/\.\d{3}Z$/, "Z"), "iso8601"),
        og6 = DF((A) => {
            if (typeof A === "number") return new Date(A * 1000);
            if (typeof A === "string") {
                if (Number(A)) return new Date(Number(A) * 1000);
                return new Date(A)
            }
            return A
        }, "toDate"),
        NYB = class A {
            constructor({
                applyChecksum: B,
                credentials: Q,
                region: Z,
                service: D,
                sha256: G,
                uriEscapePath: F = !0
            }) {
                this.headerFormatter = new pg6, this.service = D, this.sha256 = G, this.uriEscapePath = F, this.applyChecksum = typeof B === "boolean" ? B : !0, this.regionProvider = GYB.normalizeProvider(Z), this.credentialProvider = GYB.normalizeProvider(Q)
            }
            async presign(B, Q = {}) {
                let {
                    signingDate: Z = new Date,
                    expiresIn: D = 3600,
                    unsignableHeaders: G,
                    unhoistableHeaders: F,
                    signableHeaders: I,
                    signingRegion: Y,
                    signingService: W
                } = Q, J = await this.credentialProvider();
                this.validateResolvedCredentials(J);
                let X = Y ?? await this.regionProvider(),
                    {
                        longDate: V,
                        shortDate: C
                    } = gy1(Z);
                if (D > ug6) return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
                let K = my1(C, X, W ?? this.service),
                    H = qYB(az0(B), {
                        unhoistableHeaders: F
                    });
                if (J.sessionToken) H.query[VYB] = J.sessionToken;
                H.query[Og6] = lz0, H.query[Tg6] = `${J.accessKeyId}/${K}`, H.query[JYB] = V, H.query[Sg6] = D.toString(10);
                let z = iz0(H, G, I);
                return H.query[Pg6] = YYB(z), H.query[XYB] = await this.getSignature(V, K, this.getSigningKey(J, X, C, W), this.createCanonicalRequest(H, z, await dy1(B, this.sha256))), H
            }
            async sign(B, Q) {
                if (typeof B === "string") return this.signString(B, Q);
                else if (B.headers && B.payload) return this.signEvent(B, Q);
                else if (B.message) return this.signMessage(B, Q);
                else return this.signRequest(B, Q)
            }
            async signEvent({
                headers: B,
                payload: Q
            }, {
                signingDate: Z = new Date,
                priorSignature: D,
                signingRegion: G,
                signingService: F
            }) {
                let I = G ?? await this.regionProvider(),
                    {
                        shortDate: Y,
                        longDate: W
                    } = gy1(Z),
                    J = my1(Y, I, F ?? this.service),
                    X = await dy1({
                        headers: {},
                        body: Q
                    }, this.sha256),
                    V = new this.sha256;
                V.update(B);
                let C = ox.toHex(await V.digest()),
                    K = [fg6, W, J, D, C, X].join(`
`);
                return this.signString(K, {
                    signingDate: Z,
                    signingRegion: I,
                    signingService: F
                })
            }
            async signMessage(B, {
                signingDate: Q = new Date,
                signingRegion: Z,
                signingService: D
            }) {
                return this.signEvent({
                    headers: this.headerFormatter.format(B.message.headers),
                    payload: B.message.body
                }, {
                    signingDate: Q,
                    signingRegion: Z,
                    signingService: D,
                    priorSignature: B.priorSignature
                }).then((F) => {
                    return {
                        message: B.message,
                        signature: F
                    }
                })
            }
            async signString(B, {
                signingDate: Q = new Date,
                signingRegion: Z,
                signingService: D
            } = {}) {
                let G = await this.credentialProvider();
                this.validateResolvedCredentials(G);
                let F = Z ?? await this.regionProvider(),
                    {
                        shortDate: I
                    } = gy1(Q),
                    Y = new this.sha256(await this.getSigningKey(G, F, I, D));
                return Y.update(cz0.toUint8Array(B)), ox.toHex(await Y.digest())
            }
            async signRequest(B, {
                signingDate: Q = new Date,
                signableHeaders: Z,
                unsignableHeaders: D,
                signingRegion: G,
                signingService: F
            } = {}) {
                let I = await this.credentialProvider();
                this.validateResolvedCredentials(I);
                let Y = G ?? await this.regionProvider(),
                    W = az0(B),
                    {
                        longDate: J,
                        shortDate: X
                    } = gy1(Q),
                    V = my1(X, Y, F ?? this.service);
                if (W.headers[KYB] = J, I.sessionToken) W.headers[_g6] = I.sessionToken;
                let C = await dy1(W, this.sha256);
                if (!ag6(pz0, W.headers) && this.applyChecksum) W.headers[pz0] = C;
                let K = iz0(W, D, Z),
                    H = await this.getSignature(J, V, this.getSigningKey(I, Y, X, F), this.createCanonicalRequest(W, K, C));
                return W.headers[CYB] = `${lz0} Credential=${I.accessKeyId}/${V}, SignedHeaders=${YYB(K)}, Signature=${H}`, W
            }
            createCanonicalRequest(B, Q, Z) {
                let D = Object.keys(Q).sort();
                return `${B.method}
${this.getCanonicalPath(B)}
${EYB(B)}
${D.map((G)=>`${G}:${Q[G]}`).join(`
`)}

${D.join(";")}
${Z}`
            }
            async createStringToSign(B, Q, Z) {
                let D = new this.sha256;
                D.update(cz0.toUint8Array(Z));
                let G = await D.digest();
                return `${lz0}
${B}
${Q}
${ox.toHex(G)}`
            }
            getCanonicalPath({
                path: B
            }) {
                if (this.uriEscapePath) {
                    let Q = [];
                    for (let G of B.split("/")) {
                        if ((G == null ? void 0 : G.length) === 0) continue;
                        if (G === ".") continue;
                        if (G === "..") Q.pop();
                        else Q.push(G)
                    }
                    let Z = `${(B==null?void 0:B.startsWith("/"))?"/":""}${Q.join("/")}${Q.length>0&&(B==null?void 0:B.endsWith("/"))?"/":""}`;
                    return UD1.escapeUri(Z).replace(/%2F/g, "/")
                }
                return B
            }
            async getSignature(B, Q, Z, D) {
                let G = await this.createStringToSign(B, Q, D),
                    F = new this.sha256(await Z);
                return F.update(cz0.toUint8Array(G)), ox.toHex(await F.digest())
            }
            getSigningKey(B, Q, Z, D) {
                return zYB(this.sha256, B, Z, Q, D || this.service)
            }
            validateResolvedCredentials(B) {
                if (typeof B !== "object" || typeof B.accessKeyId !== "string" || typeof B.secretAccessKey !== "string") throw new Error("Resolved credential object is not valid")
            }
        };
    DF(NYB, "SignatureV4");
    var tg6 = NYB,
        gy1 = DF((A) => {
            let B = rg6(A).replace(/[\-:]/g, "");
            return {
                longDate: B,
                shortDate: B.slice(0, 8)
            }
        }, "formatDate"),
        YYB = DF((A) => Object.keys(A).sort().join(";"), "getCanonicalHeaderList")
});