/* chunk:566 bytes:[13226355, 13244861) size:18506 source:unpacked-cli.js */
async function o11() {
    let A = await zG1(),
        B = {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://docs.anthropic.com/s/claude-code",
            VERSION: "1.0.83"
        }.VERSION ? {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://docs.anthropic.com/s/claude-code",
            VERSION: "1.0.83"
        }.VERSION : "unknown",
        Q = await a68(),
        Z = tMB(),
        D = await s68(),
        G = r68(A),
        F = H0(),
        I = F.installMethod || "not set",
        Y = F.autoUpdates !== void 0 ? F.autoUpdates.toString() : "default (true)",
        W = null;
    if (A === "npm-global") {
        if (W = (await Kq0()).hasPermissions, !W && !xo()) G.push({
            issue: "Insufficient permissions for auto-updates",
            fix: ["Run: sudo chown -R $USER:$(id -gn) $(npm -g config get prefix)or use `claude migrate-installer` to migrate to local installation"].join(" ")
        })
    }
    return {
        installationType: A,
        version: B,
        installationPath: Q,
        invokedBinary: Z,
        configInstallMethod: I,
        configAutoUpdates: Y,
        hasUpdatePermissions: W,
        multipleInstallations: D,
        warnings: G
    }
}
var eMB = {
    name: "pyright",
    description: "Type checker for Python",
    options: [{
        name: ["--help", "-h"],
        description: "Show help message"
    }, {
        name: "--version",
        description: "Print pyright version and exit"
    }, {
        name: ["--watch", "-w"],
        description: "Continue to run and watch for changes"
    }, {
        name: ["--project", "-p"],
        description: "Use the configuration file at this location",
        args: {
            name: "FILE OR DIRECTORY"
        }
    }, {
        name: "-",
        description: "Read file or directory list from stdin"
    }, {
        name: "--createstub",
        description: "Create type stub file(s) for import",
        args: {
            name: "IMPORT"
        }
    }, {
        name: ["--typeshedpath", "-t"],
        description: "Use typeshed type stubs at this location",
        args: {
            name: "DIRECTORY"
        }
    }, {
        name: "--verifytypes",
        description: "Verify completeness of types in py.typed package",
        args: {
            name: "IMPORT"
        }
    }, {
        name: "--ignoreexternal",
        description: "Ignore external imports for --verifytypes"
    }, {
        name: "--pythonpath",
        description: "Path to the Python interpreter",
        args: {
            name: "FILE"
        }
    }, {
        name: "--pythonplatform",
        description: "Analyze for platform",
        args: {
            name: "PLATFORM"
        }
    }, {
        name: "--pythonversion",
        description: "Analyze for Python version",
        args: {
            name: "VERSION"
        }
    }, {
        name: ["--venvpath", "-v"],
        description: "Directory that contains virtual environments",
        args: {
            name: "DIRECTORY"
        }
    }, {
        name: "--outputjson",
        description: "Output results in JSON format"
    }, {
        name: "--verbose",
        description: "Emit verbose diagnostics"
    }, {
        name: "--stats",
        description: "Print detailed performance stats"
    }, {
        name: "--dependencies",
        description: "Emit import dependency information"
    }, {
        name: "--level",
        description: "Minimum diagnostic level",
        args: {
            name: "LEVEL"
        }
    }, {
        name: "--skipunannotated",
        description: "Skip type analysis of unannotated functions"
    }, {
        name: "--warnings",
        description: "Use exit code of 1 if warnings are reported"
    }, {
        name: "--threads",
        description: "Use up to N threads to parallelize type checking",
        args: {
            name: "N",
            isOptional: !0
        }
    }],
    args: {
        name: "files",
        description: "Specify files or directories to analyze (overrides config file)",
        isVariadic: !0,
        isOptional: !0
    }
};
var o68 = {
        name: "timeout",
        description: "Run a command with a time limit",
        args: [{
            name: "duration",
            description: "Duration to wait before timing out (e.g., 10, 5s, 2m)",
            isOptional: !1
        }, {
            name: "command",
            description: "Command to run",
            isCommand: !0
        }]
    },
    ARB = o68;
var t68 = {
        name: "sleep",
        description: "Delay for a specified amount of time",
        args: {
            name: "duration",
            description: "Duration to sleep (seconds or with suffix like 5s, 2m, 1h)",
            isOptional: !1
        }
    },
    BRB = t68;
var e68 = {
        name: "alias",
        description: "Create or list command aliases",
        args: {
            name: "definition",
            description: "Alias definition in the form name=value",
            isOptional: !0,
            isVariadic: !0
        }
    },
    QRB = e68;
var A88 = {
        name: "nohup",
        description: "Run a command immune to hangups",
        args: {
            name: "command",
            description: "Command to run with nohup",
            isCommand: !0
        }
    },
    ZRB = A88;
var B88 = {
        name: "time",
        description: "Time a command",
        args: {
            name: "command",
            description: "Command to time",
            isCommand: !0
        }
    },
    DRB = B88;
var Q88 = {
        name: "srun",
        description: "Run a command on SLURM cluster nodes",
        options: [{
            name: ["-n", "--ntasks"],
            description: "Number of tasks",
            args: {
                name: "count",
                description: "Number of tasks to run"
            }
        }, {
            name: ["-N", "--nodes"],
            description: "Number of nodes",
            args: {
                name: "count",
                description: "Number of nodes to allocate"
            }
        }],
        args: {
            name: "command",
            description: "Command to run on the cluster",
            isCommand: !0
        }
    },
    GRB = Q88;
var Hq0 = [eMB, ARB, BRB, QRB, ZRB, DRB, GRB];
async function Z88(A) {
    if (!A || A.includes("/") || A.includes("\\")) return null;
    if (A.includes("..")) return null;
    if (A.startsWith("-") && A !== "-") return null;
    try {
        let B = await import(`@withfig/autocomplete/build/${A}.js`);
        return B.default || B
    } catch {
        return null
    }
}
var D88 = Tw1(async (A) => {
    return Hq0.find((Q) => Q.name === A) || await Z88(A) || null
}, (A) => A);
var G88 = /\$\(cat\s*<<-?\s*(?:'([^']+)'|\\([A-Za-z_]\w*))\s*\n[\s\S]*?\n(\1|\2)\s*\)/g,
    zq0 = /\$\(.*<</,
    FRB = [{
        pattern: /<\(/,
        message: "process substitution <()"
    }, {
        pattern: />\(/,
        message: "process substitution >()"
    }, {
        pattern: /`/,
        message: "backticks (`) for command substitution"
    }, {
        pattern: /\$\(/,
        message: "$() command substitution"
    }, {
        pattern: /\$\{/,
        message: "${} parameter substitution"
    }, {
        pattern: /~\[/,
        message: "Zsh-style parameter expansion"
    }, {
        pattern: /\(e:/,
        message: "Zsh-style glob qualifiers"
    }];

function F88(A, B = !1) {
    let Q = "",
        Z = "",
        D = !1,
        G = !1,
        F = !1;
    for (let I = 0; I < A.length; I++) {
        let Y = A[I];
        if (F) {
            if (F = !1, !D) Q += Y;
            if (!D && !G) Z += Y;
            continue
        }
        if (Y === "\\") {
            if (F = !0, !D) Q += Y;
            if (!D && !G) Z += Y;
            continue
        }
        if (Y === "'" && !G) {
            D = !D;
            continue
        }
        if (Y === '"' && !D) {
            if (G = !G, !B) continue
        }
        if (!D) Q += Y;
        if (!D && !G) Z += Y
    }
    return {
        withDoubleQuotes: Q,
        fullyUnquoted: Z
    }
}

function I88(A) {
    return A.replace(/\s+2\s*>&\s*1(?=\s|$)/g, "").replace(/[012]?\s*>\s*\/dev\/null/g, "").replace(/\s*<\s*\/dev\/null/g, "")
}

function Y88(A) {
    if (!A.originalCommand.trim()) return {
        behavior: "allow",
        updatedInput: {
            command: A.originalCommand
        },
        decisionReason: {
            type: "other",
            reason: "Empty command is safe"
        }
    };
    return {
        behavior: "passthrough",
        message: "Command is not empty"
    }
}

function W88(A) {
    let {
        originalCommand: B
    } = A, Q = B.trim();
    if (/^\s*\t/.test(B)) return {
        behavior: "ask",
        message: "Command appears to be an incomplete fragment (starts with tab)"
    };
    if (Q.startsWith("-")) return {
        behavior: "ask",
        message: "Command appears to be an incomplete fragment (starts with flags)"
    };
    if (/^\s*(&&|\|\||;|>>?|<)/.test(B)) return {
        behavior: "ask",
        message: "Command appears to be a continuation line (starts with operator)"
    };
    return {
        behavior: "passthrough",
        message: "Command appears complete"
    }
}

function J88(A) {
    if (!zq0.test(A)) return !1;
    let B = [...A.matchAll(G88)];
    if (B.length === 0) return !1;
    let Q = A;
    for (let Z of B) Q = Q.replace(Z[0], "");
    if (/\$\((?!cat\s*<<)/.test(Q)) return !1;
    return !FRB.some(({
        pattern: Z,
        message: D
    }) => (D.includes("backticks") || D.includes("${}")) && Z.test(Q))
}

function X88(A) {
    let {
        originalCommand: B
    } = A;
    if (!zq0.test(B)) return {
        behavior: "passthrough",
        message: "No heredoc in substitution"
    };
    if (J88(B)) return {
        behavior: "allow",
        updatedInput: {
            command: B
        },
        decisionReason: {
            type: "other",
            reason: "Safe command substitution: cat with quoted/escaped heredoc delimiter"
        }
    };
    return {
        behavior: "passthrough",
        message: "Command substitution needs validation"
    }
}

function V88(A) {
    let {
        originalCommand: B,
        baseCommand: Q
    } = A;
    if (Q !== "git" || !/^git\s+commit\s+/.test(B)) return {
        behavior: "passthrough",
        message: "Not a git commit"
    };
    let Z = B.match(/^git\s+commit\s+.*-m\s+(["'])([\s\S]*?)\1(.*)$/);
    if (Z) {
        let [, D, G, F] = Z;
        if (D === '"' && G && /\$\(|`|\$\{/.test(G)) return {
            behavior: "ask",
            message: "Git commit message contains command substitution patterns"
        };
        if (F && /\$\(|`|\$\{/.test(F)) return {
            behavior: "passthrough",
            message: "Check patterns in flags"
        };
        return {
            behavior: "allow",
            updatedInput: {
                command: B
            },
            decisionReason: {
                type: "other",
                reason: "Git commit with simple quoted message is allowed"
            }
        }
    }
    return {
        behavior: "passthrough",
        message: "Git commit needs validation"
    }
}

function C88(A) {
    let {
        originalCommand: B
    } = A;
    if (zq0.test(B)) return {
        behavior: "passthrough",
        message: "Heredoc in substitution"
    };
    let Q = /<<-?\s*'[^']+'/,
        Z = /<<-?\s*\\\w+/;
    if (Q.test(B) || Z.test(B)) return {
        behavior: "allow",
        updatedInput: {
            command: B
        },
        decisionReason: {
            type: "other",
            reason: "Heredoc with quoted/escaped delimiter is safe"
        }
    };
    return {
        behavior: "passthrough",
        message: "No heredoc patterns"
    }
}

function K88(A) {
    let {
        originalCommand: B,
        baseCommand: Q
    } = A;
    if (Q !== "jq") return {
        behavior: "passthrough",
        message: "Not jq"
    };
    if (/\bsystem\s*\(/.test(B)) return {
        behavior: "ask",
        message: "jq command contains system() function which executes arbitrary commands"
    };
    let Z = B.substring(3).trim();
    if (/(?:^|\s)(?:[^'"\s-][^\s]*\s+)?(?:\/|~|\w+\.\w+)/.test(Z) && !/^\.[^\s]+$/.test(Z)) return {
        behavior: "ask",
        message: "jq command contains file arguments - jq should only read from stdin in read-only mode"
    };
    return {
        behavior: "passthrough",
        message: "jq command is safe"
    }
}

function H88(A) {
    let {
        unquotedContent: B
    } = A, Q = "Command contains shell metacharacters (;, |, or &) in arguments";
    if (/(?:^|\s)["'][^"']*[;&][^"']*["'](?:\s|$)/.test(B)) return {
        behavior: "ask",
        message: "Command contains shell metacharacters (;, |, or &) in arguments"
    };
    if ([/-name\s+["'][^"']*[;|&][^"']*["']/, /-path\s+["'][^"']*[;|&][^"']*["']/, /-iname\s+["'][^"']*[;|&][^"']*["']/].some((D) => D.test(B))) return {
        behavior: "ask",
        message: "Command contains shell metacharacters (;, |, or &) in arguments"
    };
    if (/-regex\s+["'][^"']*[;&][^"']*["']/.test(B)) return {
        behavior: "ask",
        message: "Command contains shell metacharacters (;, |, or &) in arguments"
    };
    return {
        behavior: "passthrough",
        message: "No metacharacters"
    }
}

function z88(A) {
    let {
        fullyUnquotedContent: B
    } = A;
    if (/[<>|]\s*\$[A-Za-z_]/.test(B) || /\$[A-Za-z_][A-Za-z0-9_]*\s*[|<>]/.test(B)) return {
        behavior: "ask",
        message: "Command contains variables in dangerous contexts (redirections or pipes)"
    };
    return {
        behavior: "passthrough",
        message: "No dangerous variables"
    }
}

function E88(A) {
    let {
        unquotedContent: B,
        fullyUnquotedContent: Q
    } = A;
    for (let {
            pattern: Z,
            message: D
        }
        of FRB)
        if (Z.test(B)) return {
            behavior: "ask",
            message: `Command contains ${D}`
        };
    if (/</.test(Q)) return {
        behavior: "ask",
        message: "Command contains input redirection (<) which could read sensitive files"
    };
    if (/>/.test(Q)) return {
        behavior: "ask",
        message: "Command contains output redirection (>) which could write to arbitrary files"
    };
    return {
        behavior: "passthrough",
        message: "No dangerous patterns"
    }
}

function U88(A) {
    let {
        fullyUnquotedContent: B
    } = A;
    if (!/[\n\r]/.test(B)) return {
        behavior: "passthrough",
        message: "No newlines"
    };
    if (/[\n\r]\s*[a-zA-Z/.~]/.test(B)) return {
        behavior: "ask",
        message: "Command contains newlines that could separate multiple commands"
    };
    return {
        behavior: "passthrough",
        message: "Newlines appear to be within data"
    }
}

function Tv(A) {
    let B = A.split(" ")[0] || "",
        {
            withDoubleQuotes: Q,
            fullyUnquoted: Z
        } = F88(A, B === "jq"),
        D = {
            originalCommand: A,
            baseCommand: B,
            unquotedContent: Q,
            fullyUnquotedContent: I88(Z)
        },
        G = [Y88, W88, X88, V88, C88];
    for (let I of G) {
        let Y = I(D);
        if (Y.behavior === "allow") return {
            behavior: "passthrough",
            message: Y.decisionReason?.type === "other" ? Y.decisionReason.reason : "Command allowed"
        };
        if (Y.behavior !== "passthrough") return Y
    }
    let F = [K88, H88, z88, U88, E88];
    for (let I of F) {
        let Y = I(D);
        if (Y.behavior === "ask") return Y
    }
    return {
        behavior: "passthrough",
        message: "Command passed all security checks"
    }
}
var Uq0 = "__SINGLE_QUOTE__",
    wq0 = "__DOUBLE_QUOTE__",
    Eq0 = "__NEW_LINE__",
    t11 = new Set(["0", "1", "2"]);

function qq0(A) {
    let B = [];
    try {
        for (let D of $q0.parse(A.replaceAll('"', `"${wq0}`).replaceAll("'", `'${Uq0}`).replaceAll(`
`, `
${Eq0}
`), (G) => `$${G}`)) {
            if (typeof D === "string") {
                if (B.length > 0 && typeof B[B.length - 1] === "string") {
                    if (D === Eq0) B.push(null);
                    else B[B.length - 1] += " " + D;
                    continue
                }
            } else if ("op" in D && D.op === "glob") {
                if (B.length > 0 && typeof B[B.length - 1] === "string") {
                    B[B.length - 1] += " " + D.pattern;
                    continue
                }
            }
            B.push(D)
        }
        return B.map((D) => {
            if (D === null) return null;
            if (typeof D === "string") return D;
            if ("comment" in D) return "#" + D.comment;
            if ("op" in D && D.op === "glob") return D.pattern;
            if ("op" in D) return D.op;
            return null
        }).filter((D) => D !== null).map((D) => {
            return D.replaceAll(`${Uq0}`, "'").replaceAll(`${wq0}`, '"').replaceAll(`
${Eq0}
`, `
`)
        })
    } catch (Q) {
        return [A]
    }
}

function Nq0(A) {
    return A.filter((B) => !w88.has(B))
}

function aM(A) {
    let B = qq0(A);
    for (let Z = 0; Z < B.length; Z++) {
        let D = B[Z];
        if (D === void 0) continue;
        if (D === ">&" || D === ">") {
            let G = B[Z - 1]?.trim(),
                F = B[Z + 1]?.trim(),
                I = B[Z + 2]?.trim();
            if (G === void 0 || F === void 0) continue;
            let Y = D === ">&" && t11.has(F),
                W = D === ">" && F === "/dev/null",
                J = D === ">" && F.startsWith("&") && F.length > 1 && t11.has(F.slice(1)),
                X = D === ">" && F === "&" && I !== void 0 && t11.has(I);
            if (Y || W || J || X) {
                if (t11.has(G.charAt(G.length - 1))) B[Z - 1] = G.slice(0, -1).trim();
                if (B[Z] = void 0, B[Z + 1] = void 0, X) B[Z + 2] = void 0
            }
        }
    }
    let Q = B.filter((Z) => Z !== void 0);
    return Nq0(Q)
}