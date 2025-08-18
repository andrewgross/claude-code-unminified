/* chunk:554 bytes:[12950140, 12969752) size:19612 source:unpacked-cli.js */
class Wz0 {
    constructor(A, B) {
        var Q;
        this._url = A, this._resourceMetadataUrl = void 0, this._requestInit = B === null || B === void 0 ? void 0 : B.requestInit, this._authProvider = B === null || B === void 0 ? void 0 : B.authProvider, this._fetch = B === null || B === void 0 ? void 0 : B.fetch, this._sessionId = B === null || B === void 0 ? void 0 : B.sessionId, this._reconnectionOptions = (Q = B === null || B === void 0 ? void 0 : B.reconnectionOptions) !== null && Q !== void 0 ? Q : Kx6
    }
    async _authThenStart() {
        var A;
        if (!this._authProvider) throw new nK("No auth provider");
        let B;
        try {
            B = await q$(this._authProvider, {
                serverUrl: this._url,
                resourceMetadataUrl: this._resourceMetadataUrl
            })
        } catch (Q) {
            throw (A = this.onerror) === null || A === void 0 || A.call(this, Q), Q
        }
        if (B !== "AUTHORIZED") throw new nK;
        return await this._startOrAuthSse({
            resumptionToken: void 0
        })
    }
    async _commonHeaders() {
        var A;
        let B = {};
        if (this._authProvider) {
            let Z = await this._authProvider.tokens();
            if (Z) B.Authorization = `Bearer ${Z.access_token}`
        }
        if (this._sessionId) B["mcp-session-id"] = this._sessionId;
        if (this._protocolVersion) B["mcp-protocol-version"] = this._protocolVersion;
        let Q = this._normalizeHeaders((A = this._requestInit) === null || A === void 0 ? void 0 : A.headers);
        return new Headers({
            ...B,
            ...Q
        })
    }
    async _startOrAuthSse(A) {
        var B, Q, Z;
        let {
            resumptionToken: D
        } = A;
        try {
            let G = await this._commonHeaders();
            if (G.set("Accept", "text/event-stream"), D) G.set("last-event-id", D);
            let F = await ((B = this._fetch) !== null && B !== void 0 ? B : fetch)(this._url, {
                method: "GET",
                headers: G,
                signal: (Q = this._abortController) === null || Q === void 0 ? void 0 : Q.signal
            });
            if (!F.ok) {
                if (F.status === 401 && this._authProvider) return await this._authThenStart();
                if (F.status === 405) return;
                throw new Dy1(F.status, `Failed to open SSE stream: ${F.statusText}`)
            }
            this._handleSseStream(F.body, A)
        } catch (G) {
            throw (Z = this.onerror) === null || Z === void 0 || Z.call(this, G), G
        }
    }
    _getNextReconnectionDelay(A) {
        let B = this._reconnectionOptions.initialReconnectionDelay,
            Q = this._reconnectionOptions.reconnectionDelayGrowFactor,
            Z = this._reconnectionOptions.maxReconnectionDelay;
        return Math.min(B * Math.pow(Q, A), Z)
    }
    _normalizeHeaders(A) {
        if (!A) return {};
        if (A instanceof Headers) return Object.fromEntries(A.entries());
        if (Array.isArray(A)) return Object.fromEntries(A);
        return {
            ...A
        }
    }
    _scheduleReconnection(A, B = 0) {
        var Q;
        let Z = this._reconnectionOptions.maxRetries;
        if (Z > 0 && B >= Z) {
            (Q = this.onerror) === null || Q === void 0 || Q.call(this, new Error(`Maximum reconnection attempts (${Z}) exceeded.`));
            return
        }
        let D = this._getNextReconnectionDelay(B);
        setTimeout(() => {
            this._startOrAuthSse(A).catch((G) => {
                var F;
                (F = this.onerror) === null || F === void 0 || F.call(this, new Error(`Failed to reconnect SSE stream: ${G instanceof Error?G.message:String(G)}`)), this._scheduleReconnection(A, B + 1)
            })
        }, D)
    }
    _handleSseStream(A, B) {
        if (!A) return;
        let {
            onresumptiontoken: Q,
            replayMessageId: Z
        } = B, D;
        (async () => {
            var F, I, Y, W;
            try {
                let J = A.pipeThrough(new TextDecoderStream).pipeThrough(new Yz0).getReader();
                while (!0) {
                    let {
                        value: X,
                        done: V
                    } = await J.read();
                    if (V) break;
                    if (X.id) D = X.id, Q === null || Q === void 0 || Q(X.id);
                    if (!X.event || X.event === "message") try {
                        let C = jM.parse(JSON.parse(X.data));
                        if (Z !== void 0 && eZ1(C)) C.id = Z;
                        (F = this.onmessage) === null || F === void 0 || F.call(this, C)
                    } catch (C) {
                        (I = this.onerror) === null || I === void 0 || I.call(this, C)
                    }
                }
            } catch (J) {
                if ((Y = this.onerror) === null || Y === void 0 || Y.call(this, new Error(`SSE stream disconnected: ${J}`)), this._abortController && !this._abortController.signal.aborted) {
                    if (D !== void 0) try {
                        this._scheduleReconnection({
                            resumptionToken: D,
                            onresumptiontoken: Q,
                            replayMessageId: Z
                        }, 0)
                    } catch (X) {
                        (W = this.onerror) === null || W === void 0 || W.call(this, new Error(`Failed to reconnect: ${X instanceof Error?X.message:String(X)}`))
                    }
                }
            }
        })()
    }
    async start() {
        if (this._abortController) throw new Error("StreamableHTTPClientTransport already started! If using Client class, note that connect() calls start() automatically.");
        this._abortController = new AbortController
    }
    async finishAuth(A) {
        if (!this._authProvider) throw new nK("No auth provider");
        if (await q$(this._authProvider, {
                serverUrl: this._url,
                authorizationCode: A,
                resourceMetadataUrl: this._resourceMetadataUrl
            }) !== "AUTHORIZED") throw new nK("Failed to authorize")
    }
    async close() {
        var A, B;
        (A = this._abortController) === null || A === void 0 || A.abort(), (B = this.onclose) === null || B === void 0 || B.call(this)
    }
    async send(A, B) {
        var Q, Z, D, G;
        try {
            let {
                resumptionToken: F,
                onresumptiontoken: I
            } = B || {};
            if (F) {
                this._startOrAuthSse({
                    resumptionToken: F,
                    replayMessageId: Ok1(A) ? A.id : void 0
                }).catch((H) => {
                    var z;
                    return (z = this.onerror) === null || z === void 0 ? void 0 : z.call(this, H)
                });
                return
            }
            let Y = await this._commonHeaders();
            Y.set("content-type", "application/json"), Y.set("accept", "application/json, text/event-stream");
            let W = {
                    ...this._requestInit,
                    method: "POST",
                    headers: Y,
                    body: JSON.stringify(A),
                    signal: (Q = this._abortController) === null || Q === void 0 ? void 0 : Q.signal
                },
                J = await ((Z = this._fetch) !== null && Z !== void 0 ? Z : fetch)(this._url, W),
                X = J.headers.get("mcp-session-id");
            if (X) this._sessionId = X;
            if (!J.ok) {
                if (J.status === 401 && this._authProvider) {
                    if (this._resourceMetadataUrl = XD1(J), await q$(this._authProvider, {
                            serverUrl: this._url,
                            resourceMetadataUrl: this._resourceMetadataUrl
                        }) !== "AUTHORIZED") throw new nK;
                    return this.send(A)
                }
                let H = await J.text().catch(() => null);
                throw new Error(`Error POSTing to endpoint (HTTP ${J.status}): ${H}`)
            }
            if (J.status === 202) {
                if (R3B(A)) this._startOrAuthSse({
                    resumptionToken: void 0
                }).catch((H) => {
                    var z;
                    return (z = this.onerror) === null || z === void 0 ? void 0 : z.call(this, H)
                });
                return
            }
            let C = (Array.isArray(A) ? A : [A]).filter((H) => ("method" in H) && ("id" in H) && H.id !== void 0).length > 0,
                K = J.headers.get("content-type");
            if (C)
                if (K === null || K === void 0 ? void 0 : K.includes("text/event-stream")) this._handleSseStream(J.body, {
                    onresumptiontoken: I
                });
                else if (K === null || K === void 0 ? void 0 : K.includes("application/json")) {
                let H = await J.json(),
                    z = Array.isArray(H) ? H.map(($) => jM.parse($)) : [jM.parse(H)];
                for (let $ of z)(D = this.onmessage) === null || D === void 0 || D.call(this, $)
            } else throw new Dy1(-1, `Unexpected content type: ${K}`)
        } catch (F) {
            throw (G = this.onerror) === null || G === void 0 || G.call(this, F), F
        }
    }
    get sessionId() {
        return this._sessionId
    }
    async terminateSession() {
        var A, B, Q;
        if (!this._sessionId) return;
        try {
            let Z = await this._commonHeaders(),
                D = {
                    ...this._requestInit,
                    method: "DELETE",
                    headers: Z,
                    signal: (A = this._abortController) === null || A === void 0 ? void 0 : A.signal
                },
                G = await ((B = this._fetch) !== null && B !== void 0 ? B : fetch)(this._url, D);
            if (!G.ok && G.status !== 405) throw new Dy1(G.status, `Failed to terminate session: ${G.statusText}`);
            this._sessionId = void 0
        } catch (Z) {
            throw (Q = this.onerror) === null || Q === void 0 || Q.call(this, Z), Z
        }
    }
    setProtocolVersion(A) {
        this._protocolVersion = A
    }
    get protocolVersion() {
        return this._protocolVersion
    }
}
var WGB = G1(ax(), 1);
import {
    execSync as Ab6
} from "child_process";
import {
    join as KD1,
    resolve as ie,
    sep as Jy1
} from "path";
import {
    fileURLToPath as Bb6
} from "url";
import {
    rmdirSync as ov6
} from "fs";
import * as rZ from "path";
import * as CD1 from "os";
var AGB = G1(ax(), 1),
    BGB = "claude-code-jetbrains-plugin",
    Hz0 = {
        pycharm: ["PyCharm"],
        intellij: ["IntelliJIdea", "IdeaIC"],
        webstorm: ["WebStorm"],
        phpstorm: ["PhpStorm"],
        rubymine: ["RubyMine"],
        clion: ["CLion"],
        goland: ["GoLand"],
        rider: ["Rider"],
        datagrip: ["DataGrip"],
        appcode: ["AppCode"],
        dataspell: ["DataSpell"],
        aqua: ["Aqua"],
        gateway: ["Gateway"],
        fleet: ["Fleet"],
        androidstudio: ["AndroidStudio"]
    };

function tv6(A) {
    let B = CD1.homedir(),
        Q = [],
        Z = Hz0[A.toLowerCase()];
    if (!Z) return Q;
    let D = process.env.APPDATA || rZ.join(B, "AppData", "Roaming"),
        G = process.env.LOCALAPPDATA || rZ.join(B, "AppData", "Local");
    switch (CD1.platform()) {
        case "darwin":
            if (Q.push(rZ.join(B, "Library", "Application Support", "JetBrains"), rZ.join(B, "Library", "Application Support")), A.toLowerCase() === "androidstudio") Q.push(rZ.join(B, "Library", "Application Support", "Google"));
            break;
        case "win32":
            if (Q.push(rZ.join(D, "JetBrains"), rZ.join(G, "JetBrains"), rZ.join(D)), A.toLowerCase() === "androidstudio") Q.push(rZ.join(G, "Google"));
            break;
        case "linux":
            Q.push(rZ.join(B, ".config", "JetBrains"), rZ.join(B, ".local", "share", "JetBrains"));
            for (let F of Z) Q.push(rZ.join(B, "." + F));
            if (A.toLowerCase() === "androidstudio") Q.push(rZ.join(B, ".config", "Google"));
            break;
        default:
            break
    }
    return Q
}

function QGB(A) {
    let B = [],
        Q = j1(),
        Z = tv6(A),
        D = Hz0[A.toLowerCase()];
    if (!D) return B;
    for (let G of Z) {
        if (!Q.existsSync(G)) continue;
        for (let F of D) {
            let I = new RegExp("^" + F + ".*$"),
                Y = Q.readdirSync(G).filter((W) => I.test(W.name) && Q.statSync(rZ.join(G, W.name)).isDirectory()).map((W) => rZ.join(G, W.name));
            for (let W of Y) {
                let J = CD1.platform() === "linux" ? W : rZ.join(W, "plugins");
                if (Q.existsSync(J)) B.push(J)
            }
        }
    }
    return B.filter((G, F) => B.indexOf(G) === F)
}

function eDB(A) {
    let B = rZ.join(A, "lib"),
        Q = j1();
    if (Q.existsSync(B)) {
        let Z = Q.readdirSync(B),
            D = new RegExp("^claude-code-jetbrains-plugin-(\\d+\\.\\d+\\.\\d+(?:-[a-zA-Z0-9.]+)?)\\.jar$");
        for (let G of Z) {
            let F = G.name.match(D);
            if (F) return F[1]
        }
    }
    return null
}

function Iy1(A, B) {
    let Q = j1();
    if (!Q.existsSync(B)) Q.mkdirSync(B);
    let Z = Q.readdirSync(A);
    for (let D of Z) {
        let G = rZ.join(A, D.name),
            F = rZ.join(B, D.name);
        if (Q.statSync(G).isDirectory()) Iy1(G, F);
        else Q.copyFileSync(G, F)
    }
}

function Yy1(A) {
    let B = j1();
    if (B.existsSync(A)) B.readdirSync(A).forEach((Q) => {
        let Z = rZ.join(A, Q.name);
        if (B.statSync(Z).isDirectory()) Yy1(Z);
        else B.unlinkSync(Z)
    }), ov6(A)
}
async function ZGB(A, B) {
    let Q = j1(),
        Z = [];
    if (!Hz0[A.toLowerCase()]) throw X1("tengu_ext_jetbrains_extension_install_unknown_ide", {}), new Error(`Unsupported IDE: ${A}`);
    if (!Q.existsSync(B) || !Q.statSync(B).isDirectory()) throw X1("tengu_ext_jetbrains_extension_install_source_missing", {}), new Error("Plugin source missing");
    let D = eDB(B);
    if (!D) throw X1("tengu_ext_jetbrains_extension_install_error_reading_version", {}), new Error("Error reading version from plugin");
    let G = QGB(A);
    if (G.length === 0) throw X1("tengu_ext_jetbrains_extension_install_no_plugin_directories", {}), new Error(`Could not find plugin directories for ${A}`);
    for (let F of G) try {
        let I = rZ.join(F, BGB);
        if (Q.existsSync(I)) {
            let Y = eDB(I);
            if (!Y) Yy1(I), Iy1(B, I), Z.push(I);
            else if (AGB.gt(D, Y, {
                    loose: !0
                })) Yy1(I), Iy1(B, I), Z.push(I);
            else Z.push(I)
        } else Yy1(I), Iy1(B, I), Z.push(I)
    } catch (I) {}
    if (!Z.length) throw X1("tengu_ext_jetbrains_extension_install_error_installing", {}), new Error("Could not write plugin to any of the directories");
    return D
}

function DGB(A) {
    let B = QGB(A);
    for (let Q of B) {
        let Z = rZ.join(Q, BGB);
        if (j1().existsSync(Z)) return !0
    }
    return !1
}
import {
    createConnection as Qb6
} from "net";
var T5 = G1(z1(), 1);

function GGB({
    onDone: A,
    installationStatus: B
}) {
    let Q = U2();
    ev6(), DA((J, X) => {
        if (X.escape || X.return) A()
    });
    let Z = B?.ideType ?? null,
        D = mE(Z),
        G = kM(Z),
        F = B?.installedVersion,
        I = D ? "plugin" : "extension",
        Y = sA.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
        W = sA.platform === "darwin" ? "Cmd+Option+K" : "Ctrl+Alt+K";
    return T5.default.createElement(T5.default.Fragment, null, T5.default.createElement(v, {
        flexDirection: "column"
    }, T5.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "ide",
        paddingLeft: 1,
        paddingRight: 1,
        gap: 1
    }, T5.default.createElement(v, null, T5.default.createElement(T, {
        color: "claude"
    }, "✻ "), T5.default.createElement(v, {
        flexDirection: "column"
    }, T5.default.createElement(T, null, "Welcome to ", T5.default.createElement(T, {
        bold: !0
    }, "Claude Code"), " for", " ", T5.default.createElement(T, {
        color: "ide",
        bold: !0
    }, G)), T5.default.createElement(T, {
        color: "secondaryText"
    }, "installed ", I, " v", F))), D && T5.default.createElement(v, {
        marginTop: 1
    }, T5.default.createElement(T, {
        color: "warning"
    }, s0.warning, " Restart ", G, " (", Y, ") to continue (may require multiple restarts)")), T5.default.createElement(v, {
        flexDirection: "column",
        paddingLeft: 1,
        gap: 1
    }, T5.default.createElement(T, null, "• Claude has context of", " ", T5.default.createElement(T, {
        color: "suggestion"
    }, "⧉ open files"), " and", " ", T5.default.createElement(T, {
        color: "suggestion"
    }, "⧉ selected lines")), T5.default.createElement(T, null, "• Review Claude Code's changes", " ", T5.default.createElement(T, {
        color: "diffAddedWord"
    }, "+11"), " ", T5.default.createElement(T, {
        color: "diffRemovedWord"
    }, "-22"), " in the comfort of your IDE"), T5.default.createElement(T, null, "• Cmd+Esc", T5.default.createElement(T, {
        color: "secondaryText"
    }, " for Quick Launch")), T5.default.createElement(T, null, "• ", W, T5.default.createElement(T, {
        color: "secondaryText"
    }, " ", "to reference files or lines in your input")))), T5.default.createElement(v, {
        marginLeft: 3
    }, T5.default.createElement(T, {
        dimColor: !0
    }, Q.pending ? T5.default.createElement(T5.default.Fragment, null, "Press ", Q.keyName, " again to exit") : T5.default.createElement(T5.default.Fragment, null, "Press Enter to continue")))))
}

function zz0() {
    let A = H0(),
        B = sA.terminal || "unknown";
    return A.hasIdeOnboardingBeenShown?.[B] === !0
}

function ev6() {
    if (zz0()) return;
    let A = sA.terminal || "unknown",
        B = H0();
    gA({
        ...B,
        hasIdeOnboardingBeenShown: {
            ...B.hasIdeOnboardingBeenShown,
            [A]: !0
        }
    })
}
import {
    execFileSync as FGB
} from "node:child_process";
class le {
    wslDistroName;
    constructor(A) {
        this.wslDistroName = A
    }
    toLocalPath(A) {
        if (!A) return A;
        if (this.wslDistroName) {
            let B = A.match(/^\\\\wsl(?:\.localhost|\$)\\([^\\]+)(.*)$/);
            if (B && B[1] !== this.wslDistroName) return A
        }
        try {
            return FGB("wslpath", ["-u", A], {
                encoding: "utf8",
                stdio: ["pipe", "pipe", "ignore"]
            }).trim()
        } catch {
            return A.replace(/\\/g, "/").replace(/^([A-Z]):/i, (B, Q) => `/mnt/${Q.toLowerCase()}`)
        }
    }
    toIDEPath(A) {
        if (!A) return A;
        try {
            return FGB("wslpath", ["-w", A], {
                encoding: "utf8",
                stdio: ["pipe", "pipe", "ignore"]
            }).trim()
        } catch {
            return A
        }
    }
}

function IGB(A, B) {
    let Q = A.match(/^\\\\wsl(?:\.localhost|\$)\\([^\\]+)(.*)$/);
    if (Q) return Q[1] === B;
    return !0
}

function JGB(A) {
    try {
        return process.kill(A, 0), !0
    } catch {
        return !1
    }
}