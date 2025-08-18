/* chunk:527 bytes:[12426090, 12445576) size:19486 source:unpacked-cli.js */
function dF4() {
    let A = {},
        B = [],
        Q = new Set,
        Z = new Set;
    for (let G of uw) {
        let F = RT(G);
        if (!F) continue;
        let I = Q81(F);
        if (Z.has(I)) continue;
        Z.add(I);
        let {
            settings: Y,
            errors: W
        } = T02(F, G);
        for (let J of W) {
            let X = `${J.file}:${J.path}:${J.message}`;
            if (!Q.has(X)) Q.add(X), B.push(J)
        }
        if (Y) A = _W1(A, Y, (J, X) => {
            if (Array.isArray(J) && Array.isArray(X)) return mF4(J, X);
            return
        })
    }
    let D = ["user", "project", "local"];
    return B.push(...D.flatMap((G) => ZG(G).errors)), {
        settings: A,
        errors: B
    }
}

function GB() {
    let {
        settings: A
    } = qL();
    return A || {}
}

function qL() {
    if (Z81 !== null) return Z81;
    return Z81 = dF4(), Z81
}
import {
    createHash as cF4
} from "crypto";

function I81(A = "") {
    let B = e9(),
        Z = !process.env.CLAUDE_CONFIG_DIR ? "" : `-${cF4("sha256").update(B).digest("hex").substring(0,8)}`;
    return `Claude Code${A}${Z}`
}

function P02() {
    let A = I81("-credentials");
    return {
        name: "keychain",
        read() {
            try {
                let B = zZ(`security find-generic-password -a $USER -w -s "${A}"`);
                if (B) return JSON.parse(B)
            } catch (B) {
                return null
            }
            return null
        },
        update(B) {
            try {
                let Z = JSON.stringify(B).replace(/"/g, "\\\""),
                    D = `security add-generic-password -U -a $USER -s "${A}" -w "${Z}"`;
                return zZ(D), {
                    success: !0
                }
            } catch (Q) {
                return {
                    success: !1
                }
            }
        },
        delete() {
            try {
                return zZ(`security delete-generic-password -a $USER -s "${A}"`), !0
            } catch (B) {
                return !1
            }
        }
    }
}
import {
    join as lF4
} from "path";

function r40() {
    let A = e9(),
        B = ".credentials.json",
        Q = lF4(A, ".credentials.json");
    return {
        name: "plaintext",
        read() {
            if (j1().existsSync(Q)) try {
                let Z = j1().readFileSync(Q, {
                    encoding: "utf8"
                });
                return JSON.parse(Z)
            } catch (Z) {
                return null
            }
            return null
        },
        update(Z) {
            try {
                if (!j1().existsSync(A)) j1().mkdirSync(A);
                return j1().writeFileSync(Q, JSON.stringify(Z), {
                    encoding: "utf8",
                    flush: !1
                }), j1().chmodSync(Q, 384), {
                    success: !0,
                    warning: "Warning: Storing credentials in plaintext."
                }
            } catch (D) {
                return {
                    success: !1
                }
            }
        },
        delete() {
            if (j1().existsSync(Q)) try {
                return j1().unlinkSync(Q), !0
            } catch (Z) {
                return !1
            }
            return !0
        }
    }
}

function pF4(A, B) {
    return {
        name: `${A.name}-with-${B.name}-fallback`,
        read() {
            let Q = A.read();
            if (Q !== null && Q !== void 0) return Q;
            return B.read() || {}
        },
        update(Q) {
            let Z = A.read(),
                D = A.update(Q);
            if (D.success) {
                if (Z === null) B.delete();
                return D
            }
            let G = B.update(Q);
            if (G.success) return {
                success: !0,
                warning: G.warning
            };
            return {
                success: !1
            }
        },
        delete() {
            let Q = A.delete(),
                Z = B.delete();
            return Q || Z
        }
    }
}

function wK() {
    if (process.platform === "darwin") {
        let A = P02(),
            B = r40();
        return pF4(A, B)
    }
    return r40()
}
async function S02(A) {
    let Q = H0().oauthAccount?.accountUuid,
        Z = LY(A);
    if (!Q || !Z) return;
    let D = `${p8().BASE_API_URL}/api/claude_cli_profile`;
    try {
        return (await J9.get(D, {
            headers: {
                "x-api-key": Z,
                "anthropic-beta": gp
            },
            params: {
                account_uuid: Q
            }
        })).data
    } catch (G) {
        R1(G)
    }
}
async function Y81(A) {
    let B = `${p8().BASE_API_URL}/api/oauth/profile`;
    try {
        return (await J9.get(B, {
            headers: {
                Authorization: `Bearer ${A}`,
                "Content-Type": "application/json"
            }
        })).data
    } catch (Q) {
        R1(Q)
    }
}

function TT(A) {
    return Boolean(A?.includes(HC1))
}

function dq1(A) {
    return A?.split(" ").filter(Boolean) ?? []
}

function o40({
    codeChallenge: A,
    state: B,
    isManual: Q,
    loginWithClaudeAi: Z,
    inferenceOnly: D
}) {
    let G = Z ? p8().CLAUDE_AI_AUTHORIZE_URL : p8().CONSOLE_AUTHORIZE_URL,
        F = new URL(G);
    F.searchParams.append("code", "true"), F.searchParams.append("client_id", p8().CLIENT_ID), F.searchParams.append("response_type", "code"), F.searchParams.append("redirect_uri", Q ? p8().MANUAL_REDIRECT_URL : `http://localhost:${p8().REDIRECT_PORT}/callback`);
    let I = D ? [HC1] : p8().SCOPES;
    return F.searchParams.append("scope", I.join(" ")), F.searchParams.append("code_challenge", A), F.searchParams.append("code_challenge_method", "S256"), F.searchParams.append("state", B), F.toString()
}
async function j02(A, B, Q, Z = !1, D) {
    let G = {
        grant_type: "authorization_code",
        code: A,
        redirect_uri: Z ? p8().MANUAL_REDIRECT_URL : `http://localhost:${p8().REDIRECT_PORT}/callback`,
        client_id: p8().CLIENT_ID,
        code_verifier: Q,
        state: B
    };
    if (D !== void 0) G.expires_in = D;
    let F = await J9.post(p8().TOKEN_URL, G, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (F.status !== 200) throw new Error(F.status === 401 ? "Authentication failed: Invalid authorization code" : `Token exchange failed (${F.status}): ${F.statusText}`);
    return F.data
}
async function k02(A) {
    let B = {
        grant_type: "refresh_token",
        refresh_token: A,
        client_id: p8().CLIENT_ID
    };
    try {
        let Q = await J9.post(p8().TOKEN_URL, B, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (Q.status !== 200) throw new Error(`Token refresh failed: ${Q.statusText}`);
        let Z = Q.data,
            {
                access_token: D,
                refresh_token: G = A,
                expires_in: F
            } = Z,
            I = Date.now() + F * 1000,
            Y = dq1(Z.scope);
        X1("tengu_oauth_token_refresh_success", {});
        let W = await t40(D);
        return {
            accessToken: D,
            refreshToken: G,
            expiresAt: I,
            scopes: Y,
            subscriptionType: W
        }
    } catch (Q) {
        throw X1("tengu_oauth_token_refresh_failure", {}), Q
    }
}
async function y02(A) {
    let B = await J9.get(p8().ROLES_URL, {
        headers: {
            Authorization: `Bearer ${A}`
        }
    });
    if (B.status !== 200) throw new Error(`Failed to fetch user roles: ${B.statusText}`);
    let Q = B.data,
        Z = H0();
    if (!Z.oauthAccount) throw new Error("OAuth account information not found in config");
    Z.oauthAccount.organizationRole = Q.organization_role, Z.oauthAccount.workspaceRole = Q.workspace_role, Z.oauthAccount.organizationName = Q.organization_name, gA(Z), X1("tengu_oauth_roles_stored", {
        org_role: Q.organization_role
    })
}
async function _02(A) {
    try {
        let B = await J9.post(p8().API_KEY_URL, null, {
                headers: {
                    Authorization: `Bearer ${A}`
                }
            }),
            Q = B.data?.raw_key;
        if (Q) return x02(Q), X1("tengu_oauth_api_key", {
            status: "success",
            statusCode: B.status
        }), Q;
        return null
    } catch (B) {
        throw X1("tengu_oauth_api_key", {
            status: "failure",
            error: B instanceof Error ? B.message : String(B)
        }), B
    }
}

function cq1(A) {
    if (A === null) return !1;
    let B = 300000;
    return Date.now() + B >= A
}
async function t40(A) {
    switch ((await Y81(A))?.organization?.organization_type) {
        case "claude_max":
            return "max";
        case "claude_pro":
            return "pro";
        case "claude_enterprise":
            return "enterprise";
        case "claude_team":
            return "team";
        default:
            return null
    }
}
async function lq1() {
    let B = H0().oauthAccount?.organizationUuid;
    if (B) return B;
    let Q = CZ()?.accessToken;
    if (Q === void 0) return null;
    let D = (await Y81(Q))?.organization?.uuid;
    if (!D) return null;
    return D
}
var hq2 = G1(QN1(), 1);
var NR1 = G1(z72(), 1),
    xq2 = G1(_G0(), 1);

function vq2(A) {
    return A?.name === "CredentialsProviderError"
}

function bq2(A) {
    if (!A || typeof A !== "object") return !1;
    let B = A;
    if (!B.Credentials || typeof B.Credentials !== "object") return !1;
    let Q = B.Credentials;
    return typeof Q.AccessKeyId === "string" && typeof Q.SecretAccessKey === "string" && typeof Q.SessionToken === "string" && Q.AccessKeyId.length > 0 && Q.SecretAccessKey.length > 0 && Q.SessionToken.length > 0
}
var xG0 = async () => {
    await new NR1.STSClient().send(new NR1.GetCallerIdentityCommand({}))
};
async function fq2() {
    try {
        n1("Clearing AWS credential provider cache"), await xq2.fromIni({
            ignoreCache: !0
        })(), n1("AWS credential provider cache refreshed")
    } catch (A) {
        n1("Failed to clear AWS credential cache (this is expected if no credentials are configured)")
    }
}
import {
    exec as Di4
} from "child_process";
var Gi4 = 300000;

function Fi4() {
    let A = process.env.CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR;
    if (!A) return null;
    let B = parseInt(A, 10);
    if (Number.isNaN(B)) return SA(`CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR must be a valid file descriptor number, got: ${A}`), null;
    try {
        let Z = j1().readFileSync(`/proc/self/fd/${B}`, {
            encoding: "utf8"
        }).trim();
        if (!Z) return SA("File descriptor contained empty token"), null;
        return n1(`Successfully read token from file descriptor ${B}`), Z
    } catch (Q) {
        return SA(`Failed to read token from file descriptor ${B}: ${Q instanceof Error?Q.message:String(Q)}`), null
    }
}

function gq2() {
    let A = process.env.CLAUDE_CODE_SESSION_ACCESS_TOKEN;
    if (A) return A;
    return Fi4()
}

function KE() {
    let A = IQ(process.env.CLAUDE_CODE_USE_BEDROCK) || IQ(process.env.CLAUDE_CODE_USE_VERTEX),
        Q = (GB() || {}).apiKeyHelper,
        Z = process.env.ANTHROPIC_AUTH_TOKEN || Q,
        {
            source: D
        } = DX(Nl());
    return !(A || Z || (D === "ANTHROPIC_API_KEY" || D === "apiKeyHelper"))
}

function Lu() {
    if (process.env.ANTHROPIC_AUTH_TOKEN) return {
        source: "ANTHROPIC_AUTH_TOKEN",
        hasToken: !0
    };
    if (process.env.CLAUDE_CODE_OAUTH_TOKEN) return {
        source: "CLAUDE_CODE_OAUTH_TOKEN",
        hasToken: !0
    };
    if (Mu()) return {
        source: "apiKeyHelper",
        hasToken: !0
    };
    let B = CZ();
    if (TT(B?.scopes) && B?.accessToken) return {
        source: "claude.ai",
        hasToken: !0
    };
    return {
        source: "none",
        hasToken: !1
    }
}

function LY(A) {
    let {
        key: B
    } = DX(A);
    return B
}

function DX(A) {
    if (A && process.env.ANTHROPIC_API_KEY) return {
        key: process.env.ANTHROPIC_API_KEY,
        source: "ANTHROPIC_API_KEY"
    };
    if (IQ(!1)) {
        if (!process.env.ANTHROPIC_API_KEY && !process.env.CLAUDE_CODE_OAUTH_TOKEN) throw new Error("ANTHROPIC_API_KEY or CLAUDE_CODE_OAUTH_TOKEN env var is required");
        if (process.env.ANTHROPIC_API_KEY) return {
            key: process.env.ANTHROPIC_API_KEY,
            source: "ANTHROPIC_API_KEY"
        };
        return {
            key: null,
            source: "none"
        }
    }
    if (process.env.ANTHROPIC_API_KEY && H0().customApiKeyResponses?.approved?.includes(xK(process.env.ANTHROPIC_API_KEY))) return {
        key: process.env.ANTHROPIC_API_KEY,
        source: "ANTHROPIC_API_KEY"
    };
    let B = Mu();
    if (B) return {
        key: B,
        source: "apiKeyHelper"
    };
    let Q = P51();
    if (Q) return Q;
    return {
        key: null,
        source: "none"
    }
}

function Ii4() {
    let A = process.env.CLAUDE_CODE_API_KEY_HELPER_TTL_MS;
    if (A) {
        let B = parseInt(A, 10);
        if (!Number.isNaN(B) && B >= 0) return B;
        SA(`Found CLAUDE_CODE_API_KEY_HELPER_TTL_MS env var, but it was not a valid number. Got ${A}`)
    }
    return Gi4
}
var Mu = C20(() => {
    let B = (GB() || {}).apiKeyHelper;
    if (!B) return null;
    try {
        let Q = zZ(B)?.toString().trim();
        if (!Q) throw new Error("apiKeyHelper did not return a valid value");
        return Q
    } catch (Q) {
        let Z = e1.red("Error getting API key from apiKeyHelper (in settings or ~/.claude.json):");
        if (Q instanceof Error && "stderr" in Q) console.error(Z, String(Q.stderr));
        else if (Q instanceof Error) console.error(Z, Q.message);
        else console.error(Z, Q);
        return " "
    }
}, Ii4());

function uq2() {
    Mu.cache.clear()
}
var Yi4 = 3600000;
async function Wi4() {
    let A = GB()?.awsAuthRefresh;
    if (!A) return !1;
    try {
        return n1("Fetching AWS caller identity for AWS auth refresh command"), await xG0(), n1("Fetched AWS caller identity, skipping AWS auth refresh command"), !1
    } catch {
        return n1("Running AWS auth refresh command"), new Promise((B) => {
            let Q = Di4(A);
            Q.stdout.on("data", (Z) => {
                console.log(Z)
            }), Q.stderr.on("data", (Z) => {
                console.error(Z)
            }), Q.on("close", (Z) => {
                if (Z === 0) n1("AWS auth refresh completed successfully"), B(!0);
                else {
                    let D = e1.red("Error running awsAuthRefresh (in settings or ~/.claude.json):");
                    console.error(D), B(!1)
                }
            })
        })
    }
}
async function Ji4() {
    let A = GB()?.awsCredentialExport;
    if (!A) return null;
    try {
        return n1("Fetching AWS caller identity for credential export command"), await xG0(), n1("Fetched AWS caller identity, skipping AWS credential export command"), null
    } catch {
        try {
            n1("Running AWS credential export command");
            let B = zZ(A)?.toString().trim();
            if (!B) throw new Error("awsCredentialExport did not return a valid value");
            let Q = JSON.parse(B);
            if (!bq2(Q)) throw new Error("awsCredentialExport did not return valid AWS STS output structure");
            return n1("AWS credentials retrieved from awsCredentialExport"), {
                accessKeyId: Q.Credentials.AccessKeyId,
                secretAccessKey: Q.Credentials.SecretAccessKey,
                sessionToken: Q.Credentials.SessionToken
            }
        } catch (B) {
            let Q = e1.red("Error getting AWS credentials from awsCredentialExport (in settings or ~/.claude.json):");
            if (B instanceof Error && "stderr" in B) console.error(Q, String(B.stderr));
            else if (B instanceof Error) console.error(Q, B.message);
            else console.error(Q, B);
            return null
        }
    }
}
var d41 = C20(async () => {
    let A = await Wi4(),
        B = await Ji4();
    if (A || B) await fq2();
    return B
}, Yi4);

function mq2() {
    d41.cache.clear()
}

function xK(A) {
    return A.slice(-20)
}
var P51 = EA(() => {
    if (process.platform === "darwin") {
        let B = I81();
        try {
            let Q = zZ(`security find-generic-password -a $USER -w -s "${B}"`);
            if (Q) return {
                key: Q,
                source: "/login managed key"
            }
        } catch (Q) {
            R1(Q)
        }
    }
    let A = H0();
    if (!A.primaryApiKey) return null;
    return {
        key: A.primaryApiKey,
        source: "/login managed key"
    }
});

function Xi4(A) {
    return /^[a-zA-Z0-9-_]+$/.test(A)
}

function x02(A) {
    if (!Xi4(A)) throw new Error("Invalid API key format. API key must contain only alphanumeric characters, dashes, and underscores.");
    let B = H0();
    if (lq2(), process.platform === "darwin") try {
        let Z = I81();
        zZ(`security add-generic-password -a $USER -s "${Z}" -w ${A}`)
    } catch (Z) {
        R1(Z), B.primaryApiKey = A
    } else B.primaryApiKey = A;
    if (!B.customApiKeyResponses) B.customApiKeyResponses = {
        approved: [],
        rejected: []
    };
    if (!B.customApiKeyResponses.approved) B.customApiKeyResponses.approved = [];
    let Q = xK(A);
    if (!B.customApiKeyResponses.approved.includes(Q)) B.customApiKeyResponses.approved.push(Q);
    gA(B), P51.cache.clear?.()
}

function dq2(A) {
    let B = H0(),
        Q = xK(A);
    return B.customApiKeyResponses?.approved?.includes(Q) ?? !1
}

function cq2() {
    lq2();
    let A = H0();
    A.primaryApiKey = void 0, gA(A), P51.cache.clear?.()
}

function lq2() {
    if (process.platform === "darwin") try {
        let A = I81();
        zZ(`security delete-generic-password -a $USER -s "${A}"`)
    } catch (A) {
        R1(A)
    }
}

function S51(A) {
    if (!TT(A.scopes)) return {
        success: !0
    };
    if (!A.refreshToken || !A.expiresAt) return {
        success: !0
    };
    try {
        let B = wK(),
            Q = B.read() || {};
        Q.claudeAiOauth = {
            accessToken: A.accessToken,
            refreshToken: A.refreshToken,
            expiresAt: A.expiresAt,
            scopes: A.scopes,
            subscriptionType: A.subscriptionType
        };
        let Z = B.update(Q);
        return CZ.cache?.clear?.(), VV.cache?.clear?.(), Z
    } catch (B) {
        return R1(B), {
            success: !1,
            warning: "Failed to save OAuth tokens"
        }
    }
}
var CZ = EA(() => {
    if (process.env.CLAUDE_CODE_OAUTH_TOKEN) return {
        accessToken: process.env.CLAUDE_CODE_OAUTH_TOKEN,
        refreshToken: null,
        expiresAt: null,
        scopes: ["user:inference"],
        subscriptionType: null
    };
    try {
        let Q = wK().read()?.claudeAiOauth;
        if (!Q?.accessToken) return null;
        if (!Q.subscriptionType) {
            let Z = Q.isMax === !1 ? "pro" : "max";
            return {
                ...Q,
                subscriptionType: Z
            }
        }
        return Q
    } catch (A) {
        return R1(A), null
    }
});