/* chunk:606 bytes:[13930934, 13950806) size:19872 source:unpacked-cli.js */
var h2 = G1(z1(), 1);

function wgB({
    commands: A,
    onClose: B
}) {
    let Q = `Learn more at: ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.README_URL}`,
        Z = A.filter((I) => !I.isHidden).sort((I, Y) => I.name.localeCompare(Y.name)),
        [D, G] = h2.useState(0);
    h2.useEffect(() => {
        let I = setTimeout(() => {
            if (D < 3) G(D + 1)
        }, 250);
        return () => clearTimeout(I)
    }, [D]), DA((I, Y) => {
        if (Y.return || Y.escape) B()
    });
    let F = U2(B);
    return h2.createElement(v, {
        flexDirection: "column",
        padding: 1
    }, h2.createElement(T, {
        bold: !0,
        color: "claude"
    }, `Claude Code v${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.VERSION}`), h2.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, h2.createElement(T, null, "Always review Claude's responses, especially when running code. Claude has read access to files in the current directory and can run commands and edit files with your permission.")), D >= 1 && h2.createElement(v, {
        flexDirection: "column",
        marginTop: 1
    }, h2.createElement(T, {
        bold: !0
    }, "Usage Modes:"), h2.createElement(T, null, "• REPL: ", h2.createElement(T, {
        bold: !0
    }, "claude"), " (interactive session)"), h2.createElement(T, null, "• Non-interactive: ", h2.createElement(T, {
        bold: !0
    }, 'claude -p "question"')), h2.createElement(v, {
        marginTop: 1
    }, h2.createElement(T, null, "Run ", h2.createElement(T, {
        bold: !0
    }, "claude -h"), " for all command line options"))), D >= 2 && h2.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, h2.createElement(T, {
        bold: !0
    }, "Common Tasks:"), h2.createElement(T, null, "• Ask questions about your codebase", " ", h2.createElement(T, {
        color: "secondaryText"
    }, "> How does foo.py work?")), h2.createElement(T, null, "• Edit files", " ", h2.createElement(T, {
        color: "secondaryText"
    }, "> Update bar.ts to...")), h2.createElement(T, null, "• Fix errors ", h2.createElement(T, {
        color: "secondaryText"
    }, "> cargo build")), h2.createElement(T, null, "• Run commands ", h2.createElement(T, {
        color: "secondaryText"
    }, "> /help")), h2.createElement(T, null, "• Run bash commands ", h2.createElement(T, {
        color: "secondaryText"
    }, "> !ls"))), D >= 3 && h2.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, h2.createElement(T, {
        bold: !0
    }, "Interactive Mode Commands:"), h2.createElement(v, {
        flexDirection: "column"
    }, Z.map((I, Y) => h2.createElement(v, {
        key: Y,
        marginLeft: 1
    }, h2.createElement(T, null, h2.createElement(T, {
        bold: !0
    }, `/${I.name}`), ` - ${I.description}`))))), h2.createElement(v, {
        marginTop: 1
    }, h2.createElement(T, {
        color: "secondaryText"
    }, Q)), h2.createElement(v, {
        marginTop: 2
    }, F.pending ? h2.createElement(T, {
        dimColor: !0
    }, "Press ", F.keyName, " again to exit") : h2.createElement(Qb, null)))
}
var mO0 = G1(z1(), 1),
    aq8 = {
        type: "local-jsx",
        name: "help",
        description: "Show help and available commands",
        isEnabled: () => !0,
        isHidden: !1,
        async call(A, {
            options: {
                commands: B
            }
        }) {
            return mO0.createElement(wgB, {
                commands: B,
                onClose: A
            })
        },
        userFacingName() {
            return "help"
        }
    },
    $gB = aq8;
var MQ = G1(z1(), 1);
var _X = G1(z1(), 1);

function qgB({
    onComplete: A
}) {
    let B = U2(),
        Q = _X.useCallback(async (D) => {
            let G = D === "yes",
                F = H0();
            gA({
                ...F,
                autoConnectIde: G,
                hasIdeAutoConnectDialogBeenShown: !0
            }), A()
        }, [A]);
    return DA((D, G) => {
        if (G.escape) A()
    }), _X.default.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, _X.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "ide",
        paddingX: 2,
        paddingY: 1,
        width: "100%"
    }, _X.default.createElement(v, {
        marginBottom: 1
    }, _X.default.createElement(T, {
        color: "ide"
    }, "Do you wish to enable auto-connect to IDE?")), _X.default.createElement(v, {
        flexDirection: "column",
        paddingX: 1
    }, _X.default.createElement(uA, {
        options: [{
            label: "Yes",
            value: "yes"
        }, {
            label: "No",
            value: "no"
        }],
        onChange: Q,
        defaultValue: "yes",
        onCancel: () => A()
    })), _X.default.createElement(v, {
        marginTop: 1
    }, _X.default.createElement(T, {
        dimColor: !0
    }, "You can also configure this in /config or with the --ide flag"))), _X.default.createElement(v, {
        paddingX: 1
    }, _X.default.createElement(T, {
        dimColor: !0
    }, B.pending ? _X.default.createElement(_X.default.Fragment, null, "Press ", B.keyName, " again to exit") : "Enter to confirm")))
}

function NgB() {
    let A = H0();
    return !fF() && A.autoConnectIde !== !0 && A.hasIdeAutoConnectDialogBeenShown !== !0
}
import * as MgB from "path";

function sq8({
    availableIDEs: A,
    unavailableIDEs: B,
    selectedIDE: Q,
    onClose: Z,
    onSelect: D
}) {
    let G = U2(),
        [F, I] = MQ.useState(Q?.port?.toString() ?? "None"),
        [Y, W] = MQ.useState(!1),
        J = MQ.useCallback((C) => {
            if (C !== "None" && NgB()) W(!0);
            else D(A.find((K) => K.port === parseInt(C)))
        }, [A, D]),
        X = A.reduce((C, K) => {
            return C[K.name] = (C[K.name] || 0) + 1, C
        }, {}),
        V = A.map((C) => {
            let H = (X[C.name] || 0) > 1 && C.workspaceFolders.length > 0;
            return {
                label: C.name,
                value: C.port.toString(),
                description: H ? LgB(C.workspaceFolders) : void 0
            }
        }).concat([{
            label: "None",
            value: "None",
            description: void 0
        }]);
    return DA((C, K) => {
        if (K.escape) Z()
    }), Y ? MQ.default.createElement(qgB, {
        onComplete: () => J(F)
    }) : MQ.default.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, MQ.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "ide",
        paddingX: 2,
        paddingY: 1,
        width: "100%"
    }, MQ.default.createElement(v, {
        flexDirection: "column"
    }, MQ.default.createElement(T, {
        color: "ide",
        bold: !0
    }, "Select IDE"), MQ.default.createElement(T, {
        dimColor: !0
    }, "Connect to an IDE for integrated development features."), A.length === 0 && MQ.default.createElement(v, {
        marginTop: 1
    }, MQ.default.createElement(T, {
        dimColor: !0
    }, $z0() ? `No available IDEs detected. Please install the plugin and restart your IDE:
https://docs.anthropic.com/s/claude-code-jetbrains` : "No available IDEs detected. Make sure your IDE has the Claude Code extension or plugin installed and is running."))), A.length !== 0 && MQ.default.createElement(v, {
        flexDirection: "column",
        paddingX: 1,
        marginTop: 1
    }, MQ.default.createElement(uA, {
        defaultValue: F,
        focusValue: F,
        options: V,
        onFocus: (C) => I(C),
        onChange: (C) => {
            I(C), J(C)
        },
        onCancel: () => Z()
    })), A.length !== 0 && !fF() && MQ.default.createElement(v, {
        marginTop: 1
    }, MQ.default.createElement(T, {
        dimColor: !0
    }, "※ Tip: You can enable auto-connect to IDE in /config or with the --ide flag")), B.length > 0 && MQ.default.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, MQ.default.createElement(T, {
        dimColor: !0
    }, "Found ", B.length, " other running IDE(s). However, their workspace/project directories do not match the current cwd."), MQ.default.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, B.map((C, K) => MQ.default.createElement(v, {
        key: K,
        paddingLeft: 3
    }, MQ.default.createElement(T, {
        dimColor: !0
    }, "• ", C.name, ": ", LgB(C.workspaceFolders))))))), MQ.default.createElement(v, {
        paddingX: 1
    }, MQ.default.createElement(T, {
        dimColor: !0
    }, G.pending ? MQ.default.createElement(MQ.default.Fragment, null, "Press ", G.keyName, " again to exit") : MQ.default.createElement(MQ.default.Fragment, null, A.length !== 0 && "Enter to confirm · ", "Esc to exit"))))
}
async function rq8(A, B) {
    let Q = B?.ide;
    if (!Q || Q.type !== "sse-ide" && Q.type !== "ws-ide") return null;
    for (let Z of A)
        if (Z.url === Q.url) return Z;
    return null
}

function oq8({
    runningIDEs: A,
    onSelectIDE: B,
    onDone: Q
}) {
    let Z = U2(),
        [D, G] = MQ.useState(A[0] ?? ""),
        F = MQ.useCallback((Y) => {
            B(Y)
        }, [B]),
        I = A.map((Y) => ({
            label: kM(Y),
            value: Y
        }));
    return DA((Y, W) => {
        if (W.escape) Q()
    }), MQ.default.createElement(MQ.default.Fragment, null, MQ.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "ide",
        marginTop: 1,
        paddingX: 2,
        paddingY: 1,
        width: "100%"
    }, MQ.default.createElement(v, {
        marginBottom: 1
    }, MQ.default.createElement(T, {
        color: "ide"
    }, "Select IDE to install extension:")), MQ.default.createElement(v, {
        flexDirection: "column",
        paddingX: 1
    }, MQ.default.createElement(uA, {
        focusValue: D,
        options: I,
        onFocus: (Y) => G(Y),
        onChange: (Y) => {
            G(Y), F(Y)
        },
        onCancel: () => Q()
    }))), MQ.default.createElement(v, {
        paddingLeft: 3
    }, MQ.default.createElement(T, {
        dimColor: !0
    }, Z.pending ? MQ.default.createElement(MQ.default.Fragment, null, "Press ", Z.keyName, " again to exit") : MQ.default.createElement(MQ.default.Fragment, null, "Enter to confirm · Esc to cancel"))))
}
var tq8 = {
        type: "local-jsx",
        name: "ide",
        description: "Manage IDE integrations and show status",
        isEnabled: () => !0,
        isHidden: !1,
        argumentHint: "[open]",
        async call(A, B, Q) {
            X1("tengu_ext_ide_command", {});
            let {
                options: {
                    dynamicMcpConfig: Z
                },
                onChangeDynamicMcpConfig: D
            } = B, G = await zD1(!0);
            if (G.length === 0 && B.onInstallIDEExtension && !fF()) {
                let J = Ky1(),
                    X = (V) => {
                        if (B.onInstallIDEExtension)
                            if (B.onInstallIDEExtension(V), mE(V)) A(`Installed plugin to ${e1.bold(kM(V))}
Please ${e1.bold("restart your IDE")} completely for it to take effect`);
                            else A(`Installed extension to ${e1.bold(kM(V))}`)
                    };
                if (J.length > 1) return MQ.default.createElement(oq8, {
                    runningIDEs: J,
                    onSelectIDE: X,
                    onDone: () => {
                        A("No IDE selected.")
                    }
                });
                else if (J.length === 1) {
                    let V = J[0];
                    return MQ.default.createElement(() => {
                        return MQ.useEffect(() => {
                            X(V)
                        }, []), null
                    }, null)
                }
            }
            let F = G.filter((J) => J.isValid),
                I = G.filter((J) => !J.isValid),
                Y = await rq8(F, Z);
            return MQ.default.createElement(sq8, {
                availableIDEs: F,
                unavailableIDEs: I,
                selectedIDE: Y,
                onClose: () => A(),
                onSelect: async (J) => {
                    try {
                        if (!D) {
                            A("Error connecting to IDE.");
                            return
                        }
                        let X = {
                            ...Z || {}
                        };
                        if (Y) delete X.ide;
                        if (!J) A(Y ? `Disconnected from ${Y.name}.` : "No IDE selected.");
                        else {
                            let V = J.url;
                            X.ide = {
                                type: V.startsWith("ws:") ? "ws-ide" : "sse-ide",
                                url: V,
                                ideName: J.name,
                                authToken: J.authToken,
                                ideRunningInWindows: J.ideRunningInWindows,
                                scope: "dynamic"
                            }, A(`Connected to ${J.name}.`)
                        }
                        D(X)
                    } catch (X) {
                        A("Error connecting to IDE.")
                    }
                }
            })
        },
        userFacingName() {
            return "ide"
        }
    },
    RgB = tq8;

function LgB(A, B = 100) {
    if (A.length === 0) return "";
    let Q = t0(),
        Z = A.slice(0, 2),
        D = A.length > 2,
        G = D ? 3 : 0,
        F = (Z.length - 1) * 2,
        I = B - F - G,
        Y = Math.floor(I / Z.length),
        J = Z.map((X) => {
            if (X.startsWith(Q + MgB.sep)) X = X.slice(Q.length + 1);
            if (X.length <= Y) return X;
            return "…" + X.slice(-(Y - 1))
        }).join(", ");
    if (D) J += ", …";
    return J
}
var eq8 = {
        type: "prompt",
        name: "init",
        description: "Initialize a new CLAUDE.md file with codebase documentation",
        isEnabled: () => !0,
        isHidden: !1,
        progressMessage: "analyzing your codebase",
        userFacingName() {
            return "init"
        },
        source: "builtin",
        async getPromptForCommand() {
            return Ne(), [{
                type: "text",
                text: `Please analyze this codebase and create a CLAUDE.md file, which will be given to future instances of Claude Code to operate in this repository.
            
What to add:
1. Commands that will be commonly used, such as how to build, lint, and run tests. Include the necessary commands to develop in this codebase, such as how to run a single test.
2. High-level code architecture and structure so that future instances can be productive more quickly. Focus on the "big picture" architecture that requires reading multiple files to understand

Usage notes:
- If there's already a CLAUDE.md, suggest improvements to it.
- When you make the initial CLAUDE.md, do not repeat yourself and do not include obvious instructions like "Provide helpful error messages to users", "Write unit tests for all new utilities", "Never include sensitive information (API keys, tokens) in code or commits" 
- Avoid listing every component or file structure that can be easily discovered
- Don't include generic development practices
- If there are Cursor rules (in .cursor/rules/ or .cursorrules) or Copilot rules (in .github/copilot-instructions.md), make sure to include the important parts.
- If there is a README.md, make sure to include the important parts. 
- Do not make up information such as "Common Development Tasks", "Tips for Development", "Support and Documentation" unless this is expressly included in other files that you read.
- Be sure to prefix the file with the following text:

\`\`\`
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
\`\`\``
            }]
        }
    },
    OgB = eq8;
var mI = G1(z1(), 1);
var BB = G1(z1(), 1);
import * as TgB from "http";
import * as PgB from "url";
class dO0 {
    localServer = null;
    promiseResolver = null;
    promiseRejecter = null;
    expectedState = null;
    pendingResponse = null;
    hasPendingResponse() {
        return this.pendingResponse !== null
    }
    async waitForAuthorization(A, B) {
        return new Promise((Q, Z) => {
            this.promiseResolver = Q, this.promiseRejecter = Z, this.expectedState = A, this.startLocalListener(B)
        })
    }
    handleSuccessRedirect(A) {
        if (!this.pendingResponse) return;
        let B = TT(A) ? p8().CLAUDEAI_SUCCESS_URL : p8().CONSOLE_SUCCESS_URL;
        this.pendingResponse.writeHead(302, {
            Location: B
        }), this.pendingResponse.end(), this.pendingResponse = null, X1("tengu_oauth_automatic_redirect", {})
    }
    handleErrorRedirect() {
        if (!this.pendingResponse) return;
        let A = p8().CLAUDEAI_SUCCESS_URL;
        this.pendingResponse.writeHead(302, {
            Location: A
        }), this.pendingResponse.end(), this.pendingResponse = null, X1("tengu_oauth_automatic_redirect_error", {})
    }
    startLocalListener(A) {
        if (this.localServer) this.close();
        this.localServer = TgB.createServer(this.handleRedirect.bind(this)), this.localServer.on("error", this.handleError.bind(this)), this.localServer.listen(p8().REDIRECT_PORT, () => A())
    }
    handleRedirect(A, B) {
        let Q = PgB.parse(A.url || "", !0);
        if (Q.pathname !== "/callback") {
            B.writeHead(404), B.end();
            return
        }
        let Z = Q.query.code,
            D = Q.query.state;
        this.validateAndRespond(Z, D, B)
    }
    validateAndRespond(A, B, Q) {
        if (!A) {
            Q.writeHead(400), Q.end("Authorization code not found"), this.reject(new Error("No authorization code received"));
            return
        }
        if (B !== this.expectedState) {
            Q.writeHead(400), Q.end("Invalid state parameter"), this.reject(new Error("Invalid state parameter"));
            return
        }
        this.pendingResponse = Q, this.resolve(A)
    }
    handleError(A) {
        let Q = A.code === "EADDRINUSE" ? `Port ${p8().REDIRECT_PORT} is already in use. Please ensure no other applications are using this port.` : A.message,
            Z = new Error(Q);
        R1(Z), this.close(), this.reject(Z)
    }
    resolve(A) {
        if (this.promiseResolver) this.promiseResolver(A), this.promiseResolver = null, this.promiseRejecter = null
    }
    reject(A) {
        if (this.promiseRejecter) this.promiseRejecter(A), this.promiseResolver = null, this.promiseRejecter = null
    }
    close() {
        if (this.pendingResponse) this.handleErrorRedirect();
        if (this.localServer) this.localServer.close(), this.localServer = null
    }
}
import * as UI1 from "crypto";

function cO0(A) {
    return A.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
}

function SgB() {
    return cO0(UI1.randomBytes(32))
}

function jgB(A) {
    let B = UI1.createHash("sha256");
    return B.update(A), cO0(B.digest())
}

function kgB() {
    return cO0(UI1.randomBytes(32))
}
var lO0 = G1(z1(), 1);