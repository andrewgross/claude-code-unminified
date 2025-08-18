/* chunk:607 bytes:[13950808, 13967691) size:16883 source:unpacked-cli.js */
function pO0({
    clearOnboarding: A = !1
}) {
    cq2(), wK().delete(), iO0();
    let Q = H0();
    if (A) {
        if (Q.hasCompletedOnboarding = !1, Q.subscriptionNoticeCount = 0, Q.hasAvailableSubscription = !1, Q.customApiKeyResponses?.approved) Q.customApiKeyResponses.approved = []
    }
    Q.oauthAccount = void 0, gA(Q)
}
var iO0 = () => {
        CZ.cache?.clear?.(), VV.cache?.clear?.(), k_A(), Ha.cache?.clear?.()
    },
    ygB = {
        type: "local-jsx",
        name: "logout",
        description: "Sign out from your Anthropic account",
        isEnabled: () => !process.env.DISABLE_LOGOUT_COMMAND,
        isHidden: !1,
        async call() {
            await V7(), pO0({
                clearOnboarding: !0
            });
            let A = lO0.createElement(T, null, "Successfully logged out from your Anthropic account.");
            return setTimeout(() => {
                O5(0)
            }, 200), A
        },
        userFacingName() {
            return "logout"
        }
    };
class wI1 {
    codeVerifier;
    authCodeListener;
    manualAuthCodeResolver = null;
    constructor() {
        this.codeVerifier = SgB(), this.authCodeListener = new dO0
    }
    async startOAuthFlow(A, B) {
        let Q = jgB(this.codeVerifier),
            Z = kgB(),
            D = {
                codeChallenge: Q,
                state: Z,
                loginWithClaudeAi: B?.loginWithClaudeAi,
                inferenceOnly: B?.inferenceOnly
            },
            G = o40({
                ...D,
                isManual: !0
            }),
            F = o40({
                ...D,
                isManual: !1
            }),
            I = await this.waitForAuthorizationCode(Z, async () => {
                await A(G), await ZU(F)
            }),
            Y = this.authCodeListener.hasPendingResponse();
        try {
            let W = await j02(I, Z, this.codeVerifier, !Y, B?.expiresIn);
            if (pO0({
                    clearOnboarding: !1
                }), W.account) this.storeAccountInfo(W);
            if (Y) {
                let X = dq1(W.scope);
                this.authCodeListener.handleSuccessRedirect(X)
            }
            let J = await t40(W.access_token);
            return this.formatTokens(W, J)
        } catch (W) {
            if (Y) this.authCodeListener.handleErrorRedirect();
            throw W
        } finally {
            this.authCodeListener.close()
        }
    }
    async waitForAuthorizationCode(A, B) {
        return new Promise((Q, Z) => {
            this.manualAuthCodeResolver = Q, this.authCodeListener.waitForAuthorization(A, B).then((D) => {
                this.manualAuthCodeResolver = null, Q(D)
            }).catch((D) => {
                this.manualAuthCodeResolver = null, Z(D)
            })
        })
    }
    handleManualAuthCodeInput(A) {
        if (this.manualAuthCodeResolver) this.manualAuthCodeResolver(A.authorizationCode), this.manualAuthCodeResolver = null, this.authCodeListener.close()
    }
    storeAccountInfo(A) {
        let B = {
                accountUuid: A.account.uuid,
                emailAddress: A.account.email_address,
                organizationUuid: A.organization?.uuid
            },
            Q = H0();
        Q.oauthAccount = B, gA(Q)
    }
    formatTokens(A, B) {
        return {
            accessToken: A.access_token,
            refreshToken: A.refresh_token,
            expiresAt: Date.now() + A.expires_in * 1000,
            scopes: dq1(A.scope),
            subscriptionType: B
        }
    }
    cleanup() {
        this.authCodeListener.close(), this.manualAuthCodeResolver = null
    }
}
var nO0 = G1(z1(), 1);

function _gB() {
    return nO0.default.createElement(v, {
        flexDirection: "column",
        alignItems: "flex-start"
    }, nO0.default.createElement(T, {
        color: "claude"
    }, ` ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
██║     ██║     ███████║██║   ██║██║  ██║█████╗  
██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝  
╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
 ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
 ██████╗ ██████╗ ██████╗ ███████╗                
██╔════╝██╔═══██╗██╔══██╗██╔════╝                
██║     ██║   ██║██║  ██║█████╗                  
██║     ██║   ██║██║  ██║██╔══╝                  
╚██████╗╚██████╔╝██████╔╝███████╗                
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝`))
}
var mQ = G1(z1(), 1);
var RJ = G1(z1(), 1);

function ih1({
    customApiKeyTruncated: A,
    onDone: B
}) {
    function Q(D) {
        let G = H0();
        switch (D) {
            case "yes": {
                gA({
                    ...G,
                    customApiKeyResponses: {
                        ...G.customApiKeyResponses,
                        approved: [...G.customApiKeyResponses?.approved ?? [], A]
                    }
                }), B();
                break
            }
            case "no": {
                gA({
                    ...G,
                    customApiKeyResponses: {
                        ...G.customApiKeyResponses,
                        rejected: [...G.customApiKeyResponses?.rejected ?? [], A]
                    }
                }), B();
                break
            }
        }
    }
    let Z = U2();
    return RJ.default.createElement(RJ.default.Fragment, null, RJ.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: "warning"
    }, RJ.default.createElement(T, {
        bold: !0,
        color: "warning"
    }, "Detected a custom API key in your environment"), RJ.default.createElement(T, null, RJ.default.createElement(T, {
        bold: !0
    }, "ANTHROPIC_API_KEY"), RJ.default.createElement(T, null, ": sk-ant-...", A)), RJ.default.createElement(T, null, "Do you want to use this API key?"), RJ.default.createElement(uA, {
        defaultValue: "no",
        focusValue: "no",
        options: [{
            label: "Yes",
            value: "yes"
        }, {
            label: `No (${e1.bold("recommended")})`,
            value: "no"
        }],
        onChange: (D) => Q(D),
        onCancel: () => Q("no")
    })), RJ.default.createElement(v, {
        marginLeft: 3
    }, RJ.default.createElement(T, {
        dimColor: !0
    }, Z.pending ? RJ.default.createElement(RJ.default.Fragment, null, "Press ", Z.keyName, " again to exit") : RJ.default.createElement(RJ.default.Fragment, null, "Enter to confirm ", s0.dot, " Esc to cancel"))))
}
var uI = G1(z1(), 1);
var nh1 = G1(z1(), 1);

function xgB(A) {
    let [B, Q] = nh1.useState(!1);
    return nh1.useEffect(() => {
        let Z = setTimeout(() => {
            Q(!0)
        }, A);
        return () => clearTimeout(Z)
    }, [A]), B
}
async function BN8() {
    try {
        let A = ["https://api.anthropic.com/api/hello", "https://console.anthropic.com/v1/oauth/hello"],
            B = async (D) => {
                try {
                    let G = await J9.get(D, {
                        headers: {
                            "User-Agent": Cy()
                        }
                    });
                    if (G.status !== 200) return {
                        success: !1,
                        error: `Failed to connect to ${new URL(D).hostname}: Status ${G.status}`
                    };
                    return {
                        success: !0
                    }
                } catch (G) {
                    return {
                        success: !1,
                        error: `Failed to connect to ${new URL(D).hostname}: ${G instanceof Error?G.code||G.message:String(G)}`
                    }
                }
            }, Z = (await Promise.all(A.map(B))).find((D) => !D.success);
        if (Z) X1("tengu_preflight_check_failed", {
            isConnectivityError: !1,
            hasErrorMessage: !!Z.error
        });
        return Z || {
            success: !0
        }
    } catch (A) {
        return R1(A), X1("tengu_preflight_check_failed", {
            isConnectivityError: !0
        }), {
            success: !1,
            error: `Connectivity check error: ${A instanceof Error?A.code||A.message:String(A)}`
        }
    }
}

function vgB({
    onSuccess: A
}) {
    let [B, Q] = uI.useState(null), [Z, D] = uI.useState(!0), G = xgB(1000) && Z;
    return uI.useEffect(() => {
        async function F() {
            let I = await BN8();
            Q(I), D(!1)
        }
        F()
    }, []), uI.useEffect(() => {
        if (B?.success) A();
        else if (B && !B.success) {
            let F = setTimeout(() => process.exit(1), 100);
            return () => clearTimeout(F)
        }
    }, [B, A]), uI.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        paddingLeft: 1
    }, Z && G ? uI.default.createElement(v, {
        paddingLeft: 1
    }, uI.default.createElement(g6, null), uI.default.createElement(T, null, "Checking connectivity...")) : !B?.success && !Z && uI.default.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, uI.default.createElement(T, {
        color: "error"
    }, "Unable to connect to Anthropic services"), uI.default.createElement(T, {
        color: "error"
    }, B?.error), uI.default.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, uI.default.createElement(T, null, "Please check your internet connection and network settings."), uI.default.createElement(T, null, "Note: Claude Code might not be available in your country. Check supported countries at", " ", uI.default.createElement(T, {
        color: "suggestion"
    }, "https://anthropic.com/supported-countries")))))
}

function fgB({
    onDone: A
}) {
    let [B, Q] = mQ.useState(0), Z = KE(), [D, G] = fB();
    mQ.useEffect(() => {
        X1("tengu_began_setup", {
            oauthEnabled: Z
        })
    }, [Z]);

    function F() {
        if (B < C.length - 1) {
            let K = B + 1;
            Q(K), X1("tengu_onboarding_step", {
                oauthEnabled: Z,
                stepId: C[K]?.id
            })
        } else A()
    }

    function I(K) {
        G(K), F()
    }
    let Y = U2();
    DA(async (K, H) => {
        let z = C[B];
        if (H.return && z && ["security"].includes(z.id))
            if (B === C.length - 1) {
                A();
                return
            } else {
                if (z.id === "security") await V7();
                F()
            }
        else if (H.escape && z?.id === "terminal-setup") F()
    });
    let W = mQ.default.createElement(ef1, {
            initialTheme: D,
            onThemeSelect: I,
            showIntroText: !0,
            helpText: "To change this later, run /theme",
            hideEscToCancel: !0,
            skipExitHandling: !0
        }),
        J = mQ.default.createElement(v, {
            flexDirection: "column",
            gap: 1,
            paddingLeft: 1
        }, mQ.default.createElement(T, {
            bold: !0
        }, "Security notes:"), mQ.default.createElement(v, {
            flexDirection: "column",
            width: 70
        }, mQ.default.createElement(s_, null, mQ.default.createElement(s_.Item, null, mQ.default.createElement(T, null, "Claude can make mistakes"), mQ.default.createElement(T, {
            color: "secondaryText",
            wrap: "wrap"
        }, "You should always review Claude's responses, especially when", mQ.default.createElement(S7, null), "running code.", mQ.default.createElement(S7, null))), mQ.default.createElement(s_.Item, null, mQ.default.createElement(T, null, "Due to prompt injection risks, only use it with code you trust"), mQ.default.createElement(T, {
            color: "secondaryText",
            wrap: "wrap"
        }, "For more details see:", mQ.default.createElement(S7, null), mQ.default.createElement(C3, {
            url: "https://docs.anthropic.com/s/claude-code-security"
        }))))), mQ.default.createElement(Qb, null)),
        X = mQ.default.createElement(vgB, {
            onSuccess: F
        }),
        V = mQ.useMemo(() => {
            if (!process.env.ANTHROPIC_API_KEY) return "";
            let K = xK(process.env.ANTHROPIC_API_KEY);
            if (PR1(K) === "new") return K
        }, []),
        C = [];
    if (Z) C.push({
        id: "preflight",
        component: X
    });
    if (C.push({
            id: "theme",
            component: W
        }), Z) C.push({
        id: "oauth",
        component: mQ.default.createElement(Hb, {
            onDone: F
        })
    });
    if (V) C.push({
        id: "api-key",
        component: mQ.default.createElement(ih1, {
            customApiKeyTruncated: V,
            onDone: F
        })
    });
    if (C.push({
            id: "security",
            component: J
        }), CZ1()) C.push({
        id: "terminal-setup",
        component: mQ.default.createElement(v, {
            flexDirection: "column",
            gap: 1,
            paddingLeft: 1
        }, mQ.default.createElement(T, {
            bold: !0
        }, "Use Claude Code's terminal setup?"), mQ.default.createElement(v, {
            flexDirection: "column",
            width: 70,
            gap: 1
        }, mQ.default.createElement(T, null, "For the optimal coding experience, enable the recommended settings", mQ.default.createElement(S7, null), "for your terminal:", " ", sA.terminal === "Apple_Terminal" ? "Option+Enter for newlines and visual bell" : "Shift+Enter for newlines"), mQ.default.createElement(uA, {
            options: [{
                label: "Yes, use recommended settings",
                value: "install"
            }, {
                label: "No, maybe later with /terminal-setup",
                value: "no"
            }],
            onChange: (K) => {
                if (K === "install") UK0(D).then(() => {
                    F()
                });
                else F()
            },
            onCancel: () => F()
        }), mQ.default.createElement(T, {
            dimColor: !0
        }, Y.pending ? mQ.default.createElement(mQ.default.Fragment, null, "Press ", Y.keyName, " again to exit") : mQ.default.createElement(mQ.default.Fragment, null, "Enter to confirm · Esc to skip"))))
    });
    return mQ.default.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, C[B]?.id !== "oauth" && mQ.default.createElement(aO0, null), mQ.default.createElement(v, {
        flexDirection: "column",
        padding: 0,
        gap: 0
    }, C[B]?.component, Y.pending && mQ.default.createElement(v, {
        padding: 1
    }, mQ.default.createElement(T, {
        dimColor: !0
    }, "Press ", Y.keyName, " again to exit"))))
}
var bgB = 28;

function aO0() {
    let {
        columns: A
    } = r9(), B = A < bgB;
    return mQ.default.createElement(v, {
        ...B ? {} : {
            borderColor: "claude",
            borderStyle: "round"
        },
        paddingX: 1,
        width: bgB
    }, mQ.default.createElement(T, null, mQ.default.createElement(T, {
        color: "claude"
    }, "✻"), " Welcome to ", mQ.default.createElement(T, {
        bold: !0
    }, "Claude Code")))
}
import {
    PassThrough as QN8
} from "stream";

function sO0(A) {
    return new Promise((B) => {
        let Q = "",
            Z = new QN8;
        Z.on("data", (G) => {
            Q += G.toString()
        });
        let D = S8(A, {
            stdout: Z,
            patchConsole: !1
        });
        process.nextTick(() => {
            D.unmount(), B(Q)
        })
    })
}
async function $I1(A) {
    let B = await sO0(A);
    console.log(B), process.stdout.write("\x1B[?25l")
}
class qI1 {
    alreadyRendered = {};
    async renderStatic(A) {
        for (let B in A)
            if (!this.alreadyRendered[B] && A[B]) await $I1(A[B]), this.alreadyRendered[B] = !0
    }
    reset() {
        this.alreadyRendered = {}
    }
}
var hgB = "Paste code here if prompted > ";