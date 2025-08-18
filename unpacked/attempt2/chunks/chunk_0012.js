/* chunk:12 bytes:[192392, 201683) size:9291 source:unpacked-cli.js */
var fc1 = E((yf0) => {
    Object.defineProperty(yf0, "__esModule", {
        value: !0
    });
    var kG9 = UA(),
        yG9 = sH();
    class kf0 {
        constructor(A, B) {
            if (this._client = A, this.flushTimeout = 60, this._pendingAggregates = {}, this._isEnabled = !0, this._intervalId = setInterval(() => this.flush(), this.flushTimeout * 1000), this._intervalId.unref) this._intervalId.unref();
            this._sessionAttrs = B
        }
        flush() {
            let A = this.getSessionAggregates();
            if (A.aggregates.length === 0) return;
            this._pendingAggregates = {}, this._client.sendSession(A)
        }
        getSessionAggregates() {
            let A = Object.keys(this._pendingAggregates).map((Q) => {
                    return this._pendingAggregates[parseInt(Q)]
                }),
                B = {
                    attrs: this._sessionAttrs,
                    aggregates: A
                };
            return kG9.dropUndefinedKeys(B)
        }
        close() {
            clearInterval(this._intervalId), this._isEnabled = !1, this.flush()
        }
        incrementSessionStatusCount() {
            if (!this._isEnabled) return;
            let A = yG9.getCurrentScope(),
                B = A.getRequestSession();
            if (B && B.status) this._incrementSessionStatusCount(B.status, new Date), A.setRequestSession(void 0)
        }
        _incrementSessionStatusCount(A, B) {
            let Q = new Date(B).setSeconds(0, 0);
            this._pendingAggregates[Q] = this._pendingAggregates[Q] || {};
            let Z = this._pendingAggregates[Q];
            if (!Z.started) Z.started = new Date(Q).toISOString();
            switch (A) {
                case "errored":
                    return Z.errored = (Z.errored || 0) + 1, Z.errored;
                case "ok":
                    return Z.exited = (Z.exited || 0) + 1, Z.exited;
                default:
                    return Z.crashed = (Z.crashed || 0) + 1, Z.crashed
            }
        }
    }
    yf0.SessionFlusher = kf0
});
var tJ1 = E((xf0) => {
    Object.defineProperty(xf0, "__esModule", {
        value: !0
    });
    var hc1 = UA(),
        xG9 = "7";

    function _f0(A) {
        let B = A.protocol ? `${A.protocol}:` : "",
            Q = A.port ? `:${A.port}` : "";
        return `${B}//${A.host}${Q}${A.path?`/${A.path}`:""}/api/`
    }

    function vG9(A) {
        return `${_f0(A)}${A.projectId}/envelope/`
    }

    function bG9(A, B) {
        return hc1.urlEncode({
            sentry_key: A.publicKey,
            sentry_version: xG9,
            ...B && {
                sentry_client: `${B.name}/${B.version}`
            }
        })
    }

    function fG9(A, B = {}) {
        let Q = typeof B === "string" ? B : B.tunnel,
            Z = typeof B === "string" || !B._metadata ? void 0 : B._metadata.sdk;
        return Q ? Q : `${vG9(A)}?${bG9(A,Z)}`
    }

    function hG9(A, B) {
        let Q = hc1.makeDsn(A);
        if (!Q) return "";
        let Z = `${_f0(Q)}embed/error-page/`,
            D = `dsn=${hc1.dsnToString(Q)}`;
        for (let G in B) {
            if (G === "dsn") continue;
            if (G === "onClose") continue;
            if (G === "user") {
                let F = B.user;
                if (!F) continue;
                if (F.name) D += `&name=${encodeURIComponent(F.name)}`;
                if (F.email) D += `&email=${encodeURIComponent(F.email)}`
            } else D += `&${encodeURIComponent(G)}=${encodeURIComponent(B[G])}`
        }
        return `${Z}?${D}`
    }
    xf0.getEnvelopeEndpointWithUrlEncodedAuth = fG9;
    xf0.getReportDialogEndpoint = hG9
});
var zO = E((bf0) => {
    Object.defineProperty(bf0, "__esModule", {
        value: !0
    });
    var eJ1 = UA(),
        gc1 = vG(),
        mG9 = l21(),
        dG9 = sH(),
        cG9 = eq(),
        uc1 = [];

    function lG9(A) {
        let B = {};
        return A.forEach((Q) => {
            let {
                name: Z
            } = Q, D = B[Z];
            if (D && !D.isDefaultInstance && Q.isDefaultInstance) return;
            B[Z] = Q
        }), Object.keys(B).map((Q) => B[Q])
    }

    function pG9(A) {
        let B = A.defaultIntegrations || [],
            Q = A.integrations;
        B.forEach((F) => {
            F.isDefaultInstance = !0
        });
        let Z;
        if (Array.isArray(Q)) Z = [...B, ...Q];
        else if (typeof Q === "function") Z = eJ1.arrayify(Q(B));
        else Z = B;
        let D = lG9(Z),
            G = sG9(D, (F) => F.name === "Debug");
        if (G !== -1) {
            let [F] = D.splice(G, 1);
            D.push(F)
        }
        return D
    }

    function iG9(A, B) {
        let Q = {};
        return B.forEach((Z) => {
            if (Z) vf0(A, Z, Q)
        }), Q
    }

    function nG9(A, B) {
        for (let Q of B)
            if (Q && Q.afterAllSetup) Q.afterAllSetup(A)
    }

    function vf0(A, B, Q) {
        if (Q[B.name]) {
            gc1.DEBUG_BUILD && eJ1.logger.log(`Integration skipped because it was already installed: ${B.name}`);
            return
        }
        if (Q[B.name] = B, uc1.indexOf(B.name) === -1) B.setupOnce(mG9.addGlobalEventProcessor, cG9.getCurrentHub), uc1.push(B.name);
        if (B.setup && typeof B.setup === "function") B.setup(A);
        if (A.on && typeof B.preprocessEvent === "function") {
            let Z = B.preprocessEvent.bind(B);
            A.on("preprocessEvent", (D, G) => Z(D, G, A))
        }
        if (A.addEventProcessor && typeof B.processEvent === "function") {
            let Z = B.processEvent.bind(B),
                D = Object.assign((G, F) => Z(G, F, A), {
                    id: B.name
                });
            A.addEventProcessor(D)
        }
        gc1.DEBUG_BUILD && eJ1.logger.log(`Integration installed: ${B.name}`)
    }

    function aG9(A) {
        let B = dG9.getClient();
        if (!B || !B.addIntegration) {
            gc1.DEBUG_BUILD && eJ1.logger.warn(`Cannot add integration "${A.name}" because no SDK Client is available.`);
            return
        }
        B.addIntegration(A)
    }

    function sG9(A, B) {
        for (let Q = 0; Q < A.length; Q++)
            if (B(A[Q]) === !0) return Q;
        return -1
    }

    function rG9(A, B) {
        return Object.assign(function Q(...Z) {
            return B(...Z)
        }, {
            id: A
        })
    }

    function oG9(A) {
        return A
    }
    bf0.addIntegration = aG9;
    bf0.afterSetupIntegrations = nG9;
    bf0.convertIntegrationFnToClass = rG9;
    bf0.defineIntegration = oG9;
    bf0.getIntegrationsToSetup = pG9;
    bf0.installedIntegrations = uc1;
    bf0.setupIntegration = vf0;
    bf0.setupIntegrations = iG9
});
var BB1 = E((ff0) => {
    Object.defineProperty(ff0, "__esModule", {
        value: !0
    });
    var FF9 = UA();

    function IF9(A, B, Q, Z) {
        let D = Object.entries(FF9.dropUndefinedKeys(Z)).sort((G, F) => G[0].localeCompare(F[0]));
        return `${A}${B}${Q}${D}`
    }

    function YF9(A) {
        let B = 0;
        for (let Q = 0; Q < A.length; Q++) {
            let Z = A.charCodeAt(Q);
            B = (B << 5) - B + Z, B &= B
        }
        return B >>> 0
    }

    function WF9(A) {
        let B = "";
        for (let Q of A) {
            let Z = Object.entries(Q.tags),
                D = Z.length > 0 ? `|#${Z.map(([G,F])=>`${G}:${F}`).join(",")}` : "";
            B += `${Q.name}@${Q.unit}:${Q.metric}|${Q.metricType}${D}|T${Q.timestamp}
`
        }
        return B
    }

    function JF9(A) {
        return A.replace(/[^\w]+/gi, "_")
    }

    function XF9(A) {
        return A.replace(/[^\w\-.]+/gi, "_")
    }

    function VF9(A) {
        return A.replace(/[^\w\-./]+/gi, "")
    }
    var CF9 = [
        [`
`, "\\n"],
        ["\r", "\\r"],
        ["\t", "\\t"],
        ["\\", "\\\\"],
        ["|", "\\u{7c}"],
        [",", "\\u{2c}"]
    ];

    function KF9(A) {
        for (let [B, Q] of CF9)
            if (A === B) return Q;
        return A
    }

    function HF9(A) {
        return [...A].reduce((B, Q) => B + KF9(Q), "")
    }

    function zF9(A) {
        let B = {};
        for (let Q in A)
            if (Object.prototype.hasOwnProperty.call(A, Q)) {
                let Z = VF9(Q);
                B[Z] = HF9(String(A[Q]))
            } return B
    }
    ff0.getBucketKey = IF9;
    ff0.sanitizeMetricKey = XF9;
    ff0.sanitizeTags = zF9;
    ff0.sanitizeUnit = JF9;
    ff0.serializeMetricBuckets = WF9;
    ff0.simpleHash = YF9
});
var uf0 = E((gf0) => {
    Object.defineProperty(gf0, "__esModule", {
        value: !0
    });
    var hf0 = UA(),
        LF9 = BB1();

    function MF9(A, B, Q, Z) {
        let D = {
            sent_at: new Date().toISOString()
        };
        if (Q && Q.sdk) D.sdk = {
            name: Q.sdk.name,
            version: Q.sdk.version
        };
        if (!!Z && B) D.dsn = hf0.dsnToString(B);
        let G = RF9(A);
        return hf0.createEnvelope(D, [G])
    }

    function RF9(A) {
        let B = LF9.serializeMetricBuckets(A);
        return [{
            type: "statsd",
            length: B.length
        }, B]
    }
    gf0.createMetricEnvelope = MF9
});