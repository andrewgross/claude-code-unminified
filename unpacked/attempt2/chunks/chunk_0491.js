/* chunk:491 bytes:[11734350, 11774100) size:39750 source:unpacked-cli.js */
var mcB = E((wO8) => {
    var KO8 = W1("node:events").EventEmitter,
        sT0 = W1("node:child_process"),
        aS = W1("node:path"),
        rT0 = W1("node:fs"),
        PD = W1("node:process"),
        {
            Argument: HO8,
            humanReadableArgName: zO8
        } = lg1(),
        {
            CommanderError: oT0
        } = pI1(),
        {
            Help: EO8
        } = nT0(),
        {
            Option: hcB,
            DualOptions: UO8
        } = aT0(),
        {
            suggestSimilar: gcB
        } = fcB();
    class tT0 extends KO8 {
        constructor(A) {
            super();
            this.commands = [], this.options = [], this.parent = null, this._allowUnknownOption = !1, this._allowExcessArguments = !0, this.registeredArguments = [], this._args = this.registeredArguments, this.args = [], this.rawArgs = [], this.processedArgs = [], this._scriptPath = null, this._name = A || "", this._optionValues = {}, this._optionValueSources = {}, this._storeOptionsAsProperties = !1, this._actionHandler = null, this._executableHandler = !1, this._executableFile = null, this._executableDir = null, this._defaultCommandName = null, this._exitCallback = null, this._aliases = [], this._combineFlagAndOptionalValue = !0, this._description = "", this._summary = "", this._argsDescription = void 0, this._enablePositionalOptions = !1, this._passThroughOptions = !1, this._lifeCycleHooks = {}, this._showHelpAfterError = !1, this._showSuggestionAfterError = !0, this._outputConfiguration = {
                writeOut: (B) => PD.stdout.write(B),
                writeErr: (B) => PD.stderr.write(B),
                getOutHelpWidth: () => PD.stdout.isTTY ? PD.stdout.columns : void 0,
                getErrHelpWidth: () => PD.stderr.isTTY ? PD.stderr.columns : void 0,
                outputError: (B, Q) => Q(B)
            }, this._hidden = !1, this._helpOption = void 0, this._addImplicitHelpCommand = void 0, this._helpCommand = void 0, this._helpConfiguration = {}
        }
        copyInheritedSettings(A) {
            return this._outputConfiguration = A._outputConfiguration, this._helpOption = A._helpOption, this._helpCommand = A._helpCommand, this._helpConfiguration = A._helpConfiguration, this._exitCallback = A._exitCallback, this._storeOptionsAsProperties = A._storeOptionsAsProperties, this._combineFlagAndOptionalValue = A._combineFlagAndOptionalValue, this._allowExcessArguments = A._allowExcessArguments, this._enablePositionalOptions = A._enablePositionalOptions, this._showHelpAfterError = A._showHelpAfterError, this._showSuggestionAfterError = A._showSuggestionAfterError, this
        }
        _getCommandAndAncestors() {
            let A = [];
            for (let B = this; B; B = B.parent) A.push(B);
            return A
        }
        command(A, B, Q) {
            let Z = B,
                D = Q;
            if (typeof Z === "object" && Z !== null) D = Z, Z = null;
            D = D || {};
            let [, G, F] = A.match(/([^ ]+) *(.*)/), I = this.createCommand(G);
            if (Z) I.description(Z), I._executableHandler = !0;
            if (D.isDefault) this._defaultCommandName = I._name;
            if (I._hidden = !!(D.noHelp || D.hidden), I._executableFile = D.executableFile || null, F) I.arguments(F);
            if (this._registerCommand(I), I.parent = this, I.copyInheritedSettings(this), Z) return this;
            return I
        }
        createCommand(A) {
            return new tT0(A)
        }
        createHelp() {
            return Object.assign(new EO8, this.configureHelp())
        }
        configureHelp(A) {
            if (A === void 0) return this._helpConfiguration;
            return this._helpConfiguration = A, this
        }
        configureOutput(A) {
            if (A === void 0) return this._outputConfiguration;
            return Object.assign(this._outputConfiguration, A), this
        }
        showHelpAfterError(A = !0) {
            if (typeof A !== "string") A = !!A;
            return this._showHelpAfterError = A, this
        }
        showSuggestionAfterError(A = !0) {
            return this._showSuggestionAfterError = !!A, this
        }
        addCommand(A, B) {
            if (!A._name) throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
            if (B = B || {}, B.isDefault) this._defaultCommandName = A._name;
            if (B.noHelp || B.hidden) A._hidden = !0;
            return this._registerCommand(A), A.parent = this, A._checkForBrokenPassThrough(), this
        }
        createArgument(A, B) {
            return new HO8(A, B)
        }
        argument(A, B, Q, Z) {
            let D = this.createArgument(A, B);
            if (typeof Q === "function") D.default(Z).argParser(Q);
            else D.default(Q);
            return this.addArgument(D), this
        }
        arguments(A) {
            return A.trim().split(/ +/).forEach((B) => {
                this.argument(B)
            }), this
        }
        addArgument(A) {
            let B = this.registeredArguments.slice(-1)[0];
            if (B && B.variadic) throw new Error(`only the last argument can be variadic '${B.name()}'`);
            if (A.required && A.defaultValue !== void 0 && A.parseArg === void 0) throw new Error(`a default value for a required argument is never used: '${A.name()}'`);
            return this.registeredArguments.push(A), this
        }
        helpCommand(A, B) {
            if (typeof A === "boolean") return this._addImplicitHelpCommand = A, this;
            A = A ?? "help [command]";
            let [, Q, Z] = A.match(/([^ ]+) *(.*)/), D = B ?? "display help for command", G = this.createCommand(Q);
            if (G.helpOption(!1), Z) G.arguments(Z);
            if (D) G.description(D);
            return this._addImplicitHelpCommand = !0, this._helpCommand = G, this
        }
        addHelpCommand(A, B) {
            if (typeof A !== "object") return this.helpCommand(A, B), this;
            return this._addImplicitHelpCommand = !0, this._helpCommand = A, this
        }
        _getHelpCommand() {
            if (this._addImplicitHelpCommand ?? (this.commands.length && !this._actionHandler && !this._findCommand("help"))) {
                if (this._helpCommand === void 0) this.helpCommand(void 0, void 0);
                return this._helpCommand
            }
            return null
        }
        hook(A, B) {
            let Q = ["preSubcommand", "preAction", "postAction"];
            if (!Q.includes(A)) throw new Error(`Unexpected value for event passed to hook : '${A}'.
Expecting one of '${Q.join("', '")}'`);
            if (this._lifeCycleHooks[A]) this._lifeCycleHooks[A].push(B);
            else this._lifeCycleHooks[A] = [B];
            return this
        }
        exitOverride(A) {
            if (A) this._exitCallback = A;
            else this._exitCallback = (B) => {
                if (B.code !== "commander.executeSubCommandAsync") throw B
            };
            return this
        }
        _exit(A, B, Q) {
            if (this._exitCallback) this._exitCallback(new oT0(A, B, Q));
            PD.exit(A)
        }
        action(A) {
            let B = (Q) => {
                let Z = this.registeredArguments.length,
                    D = Q.slice(0, Z);
                if (this._storeOptionsAsProperties) D[Z] = this;
                else D[Z] = this.opts();
                return D.push(this), A.apply(this, D)
            };
            return this._actionHandler = B, this
        }
        createOption(A, B) {
            return new hcB(A, B)
        }
        _callParseArg(A, B, Q, Z) {
            try {
                return A.parseArg(B, Q)
            } catch (D) {
                if (D.code === "commander.invalidArgument") {
                    let G = `${Z} ${D.message}`;
                    this.error(G, {
                        exitCode: D.exitCode,
                        code: D.code
                    })
                }
                throw D
            }
        }
        _registerOption(A) {
            let B = A.short && this._findOption(A.short) || A.long && this._findOption(A.long);
            if (B) {
                let Q = A.long && this._findOption(A.long) ? A.long : A.short;
                throw new Error(`Cannot add option '${A.flags}'${this._name&&` to command '${this._name}'`} due to conflicting flag '${Q}'
-  already used by option '${B.flags}'`)
            }
            this.options.push(A)
        }
        _registerCommand(A) {
            let B = (Z) => {
                    return [Z.name()].concat(Z.aliases())
                },
                Q = B(A).find((Z) => this._findCommand(Z));
            if (Q) {
                let Z = B(this._findCommand(Q)).join("|"),
                    D = B(A).join("|");
                throw new Error(`cannot add command '${D}' as already have command '${Z}'`)
            }
            this.commands.push(A)
        }
        addOption(A) {
            this._registerOption(A);
            let B = A.name(),
                Q = A.attributeName();
            if (A.negate) {
                let D = A.long.replace(/^--no-/, "--");
                if (!this._findOption(D)) this.setOptionValueWithSource(Q, A.defaultValue === void 0 ? !0 : A.defaultValue, "default")
            } else if (A.defaultValue !== void 0) this.setOptionValueWithSource(Q, A.defaultValue, "default");
            let Z = (D, G, F) => {
                if (D == null && A.presetArg !== void 0) D = A.presetArg;
                let I = this.getOptionValue(Q);
                if (D !== null && A.parseArg) D = this._callParseArg(A, D, I, G);
                else if (D !== null && A.variadic) D = A._concatValue(D, I);
                if (D == null)
                    if (A.negate) D = !1;
                    else if (A.isBoolean() || A.optional) D = !0;
                else D = "";
                this.setOptionValueWithSource(Q, D, F)
            };
            if (this.on("option:" + B, (D) => {
                    let G = `error: option '${A.flags}' argument '${D}' is invalid.`;
                    Z(D, G, "cli")
                }), A.envVar) this.on("optionEnv:" + B, (D) => {
                let G = `error: option '${A.flags}' value '${D}' from env '${A.envVar}' is invalid.`;
                Z(D, G, "env")
            });
            return this
        }
        _optionEx(A, B, Q, Z, D) {
            if (typeof B === "object" && B instanceof hcB) throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");
            let G = this.createOption(B, Q);
            if (G.makeOptionMandatory(!!A.mandatory), typeof Z === "function") G.default(D).argParser(Z);
            else if (Z instanceof RegExp) {
                let F = Z;
                Z = (I, Y) => {
                    let W = F.exec(I);
                    return W ? W[0] : Y
                }, G.default(D).argParser(Z)
            } else G.default(Z);
            return this.addOption(G)
        }
        option(A, B, Q, Z) {
            return this._optionEx({}, A, B, Q, Z)
        }
        requiredOption(A, B, Q, Z) {
            return this._optionEx({
                mandatory: !0
            }, A, B, Q, Z)
        }
        combineFlagAndOptionalValue(A = !0) {
            return this._combineFlagAndOptionalValue = !!A, this
        }
        allowUnknownOption(A = !0) {
            return this._allowUnknownOption = !!A, this
        }
        allowExcessArguments(A = !0) {
            return this._allowExcessArguments = !!A, this
        }
        enablePositionalOptions(A = !0) {
            return this._enablePositionalOptions = !!A, this
        }
        passThroughOptions(A = !0) {
            return this._passThroughOptions = !!A, this._checkForBrokenPassThrough(), this
        }
        _checkForBrokenPassThrough() {
            if (this.parent && this._passThroughOptions && !this.parent._enablePositionalOptions) throw new Error(`passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`)
        }
        storeOptionsAsProperties(A = !0) {
            if (this.options.length) throw new Error("call .storeOptionsAsProperties() before adding options");
            if (Object.keys(this._optionValues).length) throw new Error("call .storeOptionsAsProperties() before setting option values");
            return this._storeOptionsAsProperties = !!A, this
        }
        getOptionValue(A) {
            if (this._storeOptionsAsProperties) return this[A];
            return this._optionValues[A]
        }
        setOptionValue(A, B) {
            return this.setOptionValueWithSource(A, B, void 0)
        }
        setOptionValueWithSource(A, B, Q) {
            if (this._storeOptionsAsProperties) this[A] = B;
            else this._optionValues[A] = B;
            return this._optionValueSources[A] = Q, this
        }
        getOptionValueSource(A) {
            return this._optionValueSources[A]
        }
        getOptionValueSourceWithGlobals(A) {
            let B;
            return this._getCommandAndAncestors().forEach((Q) => {
                if (Q.getOptionValueSource(A) !== void 0) B = Q.getOptionValueSource(A)
            }), B
        }
        _prepareUserArgs(A, B) {
            if (A !== void 0 && !Array.isArray(A)) throw new Error("first parameter to parse must be array or undefined");
            if (B = B || {}, A === void 0 && B.from === void 0) {
                if (PD.versions?.electron) B.from = "electron";
                let Z = PD.execArgv ?? [];
                if (Z.includes("-e") || Z.includes("--eval") || Z.includes("-p") || Z.includes("--print")) B.from = "eval"
            }
            if (A === void 0) A = PD.argv;
            this.rawArgs = A.slice();
            let Q;
            switch (B.from) {
                case void 0:
                case "node":
                    this._scriptPath = A[1], Q = A.slice(2);
                    break;
                case "electron":
                    if (PD.defaultApp) this._scriptPath = A[1], Q = A.slice(2);
                    else Q = A.slice(1);
                    break;
                case "user":
                    Q = A.slice(0);
                    break;
                case "eval":
                    Q = A.slice(1);
                    break;
                default:
                    throw new Error(`unexpected parse option { from: '${B.from}' }`)
            }
            if (!this._name && this._scriptPath) this.nameFromFilename(this._scriptPath);
            return this._name = this._name || "program", Q
        }
        parse(A, B) {
            let Q = this._prepareUserArgs(A, B);
            return this._parseCommand([], Q), this
        }
        async parseAsync(A, B) {
            let Q = this._prepareUserArgs(A, B);
            return await this._parseCommand([], Q), this
        }
        _executeSubCommand(A, B) {
            B = B.slice();
            let Q = !1,
                Z = [".js", ".ts", ".tsx", ".mjs", ".cjs"];

            function D(W, J) {
                let X = aS.resolve(W, J);
                if (rT0.existsSync(X)) return X;
                if (Z.includes(aS.extname(J))) return;
                let V = Z.find((C) => rT0.existsSync(`${X}${C}`));
                if (V) return `${X}${V}`;
                return
            }
            this._checkForMissingMandatoryOptions(), this._checkForConflictingOptions();
            let G = A._executableFile || `${this._name}-${A._name}`,
                F = this._executableDir || "";
            if (this._scriptPath) {
                let W;
                try {
                    W = rT0.realpathSync(this._scriptPath)
                } catch (J) {
                    W = this._scriptPath
                }
                F = aS.resolve(aS.dirname(W), F)
            }
            if (F) {
                let W = D(F, G);
                if (!W && !A._executableFile && this._scriptPath) {
                    let J = aS.basename(this._scriptPath, aS.extname(this._scriptPath));
                    if (J !== this._name) W = D(F, `${J}-${A._name}`)
                }
                G = W || G
            }
            Q = Z.includes(aS.extname(G));
            let I;
            if (PD.platform !== "win32")
                if (Q) B.unshift(G), B = ucB(PD.execArgv).concat(B), I = sT0.spawn(PD.argv[0], B, {
                    stdio: "inherit"
                });
                else I = sT0.spawn(G, B, {
                    stdio: "inherit"
                });
            else B.unshift(G), B = ucB(PD.execArgv).concat(B), I = sT0.spawn(PD.execPath, B, {
                stdio: "inherit"
            });
            if (!I.killed)["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"].forEach((J) => {
                PD.on(J, () => {
                    if (I.killed === !1 && I.exitCode === null) I.kill(J)
                })
            });
            let Y = this._exitCallback;
            I.on("close", (W) => {
                if (W = W ?? 1, !Y) PD.exit(W);
                else Y(new oT0(W, "commander.executeSubCommandAsync", "(close)"))
            }), I.on("error", (W) => {
                if (W.code === "ENOENT") {
                    let J = F ? `searched for local subcommand relative to directory '${F}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory",
                        X = `'${G}' does not exist
 - if '${A._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${J}`;
                    throw new Error(X)
                } else if (W.code === "EACCES") throw new Error(`'${G}' not executable`);
                if (!Y) PD.exit(1);
                else {
                    let J = new oT0(1, "commander.executeSubCommandAsync", "(error)");
                    J.nestedError = W, Y(J)
                }
            }), this.runningCommand = I
        }
        _dispatchSubcommand(A, B, Q) {
            let Z = this._findCommand(A);
            if (!Z) this.help({
                error: !0
            });
            let D;
            return D = this._chainOrCallSubCommandHook(D, Z, "preSubcommand"), D = this._chainOrCall(D, () => {
                if (Z._executableHandler) this._executeSubCommand(Z, B.concat(Q));
                else return Z._parseCommand(B, Q)
            }), D
        }
        _dispatchHelpCommand(A) {
            if (!A) this.help();
            let B = this._findCommand(A);
            if (B && !B._executableHandler) B.help();
            return this._dispatchSubcommand(A, [], [this._getHelpOption()?.long ?? this._getHelpOption()?.short ?? "--help"])
        }
        _checkNumberOfArguments() {
            if (this.registeredArguments.forEach((A, B) => {
                    if (A.required && this.args[B] == null) this.missingArgument(A.name())
                }), this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) return;
            if (this.args.length > this.registeredArguments.length) this._excessArguments(this.args)
        }
        _processArguments() {
            let A = (Q, Z, D) => {
                let G = Z;
                if (Z !== null && Q.parseArg) {
                    let F = `error: command-argument value '${Z}' is invalid for argument '${Q.name()}'.`;
                    G = this._callParseArg(Q, Z, D, F)
                }
                return G
            };
            this._checkNumberOfArguments();
            let B = [];
            this.registeredArguments.forEach((Q, Z) => {
                let D = Q.defaultValue;
                if (Q.variadic) {
                    if (Z < this.args.length) {
                        if (D = this.args.slice(Z), Q.parseArg) D = D.reduce((G, F) => {
                            return A(Q, F, G)
                        }, Q.defaultValue)
                    } else if (D === void 0) D = []
                } else if (Z < this.args.length) {
                    if (D = this.args[Z], Q.parseArg) D = A(Q, D, Q.defaultValue)
                }
                B[Z] = D
            }), this.processedArgs = B
        }
        _chainOrCall(A, B) {
            if (A && A.then && typeof A.then === "function") return A.then(() => B());
            return B()
        }
        _chainOrCallHooks(A, B) {
            let Q = A,
                Z = [];
            if (this._getCommandAndAncestors().reverse().filter((D) => D._lifeCycleHooks[B] !== void 0).forEach((D) => {
                    D._lifeCycleHooks[B].forEach((G) => {
                        Z.push({
                            hookedCommand: D,
                            callback: G
                        })
                    })
                }), B === "postAction") Z.reverse();
            return Z.forEach((D) => {
                Q = this._chainOrCall(Q, () => {
                    return D.callback(D.hookedCommand, this)
                })
            }), Q
        }
        _chainOrCallSubCommandHook(A, B, Q) {
            let Z = A;
            if (this._lifeCycleHooks[Q] !== void 0) this._lifeCycleHooks[Q].forEach((D) => {
                Z = this._chainOrCall(Z, () => {
                    return D(this, B)
                })
            });
            return Z
        }
        _parseCommand(A, B) {
            let Q = this.parseOptions(B);
            if (this._parseOptionsEnv(), this._parseOptionsImplied(), A = A.concat(Q.operands), B = Q.unknown, this.args = A.concat(B), A && this._findCommand(A[0])) return this._dispatchSubcommand(A[0], A.slice(1), B);
            if (this._getHelpCommand() && A[0] === this._getHelpCommand().name()) return this._dispatchHelpCommand(A[1]);
            if (this._defaultCommandName) return this._outputHelpIfRequested(B), this._dispatchSubcommand(this._defaultCommandName, A, B);
            if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) this.help({
                error: !0
            });
            this._outputHelpIfRequested(Q.unknown), this._checkForMissingMandatoryOptions(), this._checkForConflictingOptions();
            let Z = () => {
                    if (Q.unknown.length > 0) this.unknownOption(Q.unknown[0])
                },
                D = `command:${this.name()}`;
            if (this._actionHandler) {
                Z(), this._processArguments();
                let G;
                if (G = this._chainOrCallHooks(G, "preAction"), G = this._chainOrCall(G, () => this._actionHandler(this.processedArgs)), this.parent) G = this._chainOrCall(G, () => {
                    this.parent.emit(D, A, B)
                });
                return G = this._chainOrCallHooks(G, "postAction"), G
            }
            if (this.parent && this.parent.listenerCount(D)) Z(), this._processArguments(), this.parent.emit(D, A, B);
            else if (A.length) {
                if (this._findCommand("*")) return this._dispatchSubcommand("*", A, B);
                if (this.listenerCount("command:*")) this.emit("command:*", A, B);
                else if (this.commands.length) this.unknownCommand();
                else Z(), this._processArguments()
            } else if (this.commands.length) Z(), this.help({
                error: !0
            });
            else Z(), this._processArguments()
        }
        _findCommand(A) {
            if (!A) return;
            return this.commands.find((B) => B._name === A || B._aliases.includes(A))
        }
        _findOption(A) {
            return this.options.find((B) => B.is(A))
        }
        _checkForMissingMandatoryOptions() {
            this._getCommandAndAncestors().forEach((A) => {
                A.options.forEach((B) => {
                    if (B.mandatory && A.getOptionValue(B.attributeName()) === void 0) A.missingMandatoryOptionValue(B)
                })
            })
        }
        _checkForConflictingLocalOptions() {
            let A = this.options.filter((Q) => {
                let Z = Q.attributeName();
                if (this.getOptionValue(Z) === void 0) return !1;
                return this.getOptionValueSource(Z) !== "default"
            });
            A.filter((Q) => Q.conflictsWith.length > 0).forEach((Q) => {
                let Z = A.find((D) => Q.conflictsWith.includes(D.attributeName()));
                if (Z) this._conflictingOption(Q, Z)
            })
        }
        _checkForConflictingOptions() {
            this._getCommandAndAncestors().forEach((A) => {
                A._checkForConflictingLocalOptions()
            })
        }
        parseOptions(A) {
            let B = [],
                Q = [],
                Z = B,
                D = A.slice();

            function G(I) {
                return I.length > 1 && I[0] === "-"
            }
            let F = null;
            while (D.length) {
                let I = D.shift();
                if (I === "--") {
                    if (Z === Q) Z.push(I);
                    Z.push(...D);
                    break
                }
                if (F && !G(I)) {
                    this.emit(`option:${F.name()}`, I);
                    continue
                }
                if (F = null, G(I)) {
                    let Y = this._findOption(I);
                    if (Y) {
                        if (Y.required) {
                            let W = D.shift();
                            if (W === void 0) this.optionMissingArgument(Y);
                            this.emit(`option:${Y.name()}`, W)
                        } else if (Y.optional) {
                            let W = null;
                            if (D.length > 0 && !G(D[0])) W = D.shift();
                            this.emit(`option:${Y.name()}`, W)
                        } else this.emit(`option:${Y.name()}`);
                        F = Y.variadic ? Y : null;
                        continue
                    }
                }
                if (I.length > 2 && I[0] === "-" && I[1] !== "-") {
                    let Y = this._findOption(`-${I[1]}`);
                    if (Y) {
                        if (Y.required || Y.optional && this._combineFlagAndOptionalValue) this.emit(`option:${Y.name()}`, I.slice(2));
                        else this.emit(`option:${Y.name()}`), D.unshift(`-${I.slice(2)}`);
                        continue
                    }
                }
                if (/^--[^=]+=/.test(I)) {
                    let Y = I.indexOf("="),
                        W = this._findOption(I.slice(0, Y));
                    if (W && (W.required || W.optional)) {
                        this.emit(`option:${W.name()}`, I.slice(Y + 1));
                        continue
                    }
                }
                if (G(I)) Z = Q;
                if ((this._enablePositionalOptions || this._passThroughOptions) && B.length === 0 && Q.length === 0) {
                    if (this._findCommand(I)) {
                        if (B.push(I), D.length > 0) Q.push(...D);
                        break
                    } else if (this._getHelpCommand() && I === this._getHelpCommand().name()) {
                        if (B.push(I), D.length > 0) B.push(...D);
                        break
                    } else if (this._defaultCommandName) {
                        if (Q.push(I), D.length > 0) Q.push(...D);
                        break
                    }
                }
                if (this._passThroughOptions) {
                    if (Z.push(I), D.length > 0) Z.push(...D);
                    break
                }
                Z.push(I)
            }
            return {
                operands: B,
                unknown: Q
            }
        }
        opts() {
            if (this._storeOptionsAsProperties) {
                let A = {},
                    B = this.options.length;
                for (let Q = 0; Q < B; Q++) {
                    let Z = this.options[Q].attributeName();
                    A[Z] = Z === this._versionOptionName ? this._version : this[Z]
                }
                return A
            }
            return this._optionValues
        }
        optsWithGlobals() {
            return this._getCommandAndAncestors().reduce((A, B) => Object.assign(A, B.opts()), {})
        }
        error(A, B) {
            if (this._outputConfiguration.outputError(`${A}
`, this._outputConfiguration.writeErr), typeof this._showHelpAfterError === "string") this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
            else if (this._showHelpAfterError) this._outputConfiguration.writeErr(`
`), this.outputHelp({
                error: !0
            });
            let Q = B || {},
                Z = Q.exitCode || 1,
                D = Q.code || "commander.error";
            this._exit(Z, D, A)
        }
        _parseOptionsEnv() {
            this.options.forEach((A) => {
                if (A.envVar && A.envVar in PD.env) {
                    let B = A.attributeName();
                    if (this.getOptionValue(B) === void 0 || ["default", "config", "env"].includes(this.getOptionValueSource(B)))
                        if (A.required || A.optional) this.emit(`optionEnv:${A.name()}`, PD.env[A.envVar]);
                        else this.emit(`optionEnv:${A.name()}`)
                }
            })
        }
        _parseOptionsImplied() {
            let A = new UO8(this.options),
                B = (Q) => {
                    return this.getOptionValue(Q) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(Q))
                };
            this.options.filter((Q) => Q.implied !== void 0 && B(Q.attributeName()) && A.valueFromOption(this.getOptionValue(Q.attributeName()), Q)).forEach((Q) => {
                Object.keys(Q.implied).filter((Z) => !B(Z)).forEach((Z) => {
                    this.setOptionValueWithSource(Z, Q.implied[Z], "implied")
                })
            })
        }
        missingArgument(A) {
            let B = `error: missing required argument '${A}'`;
            this.error(B, {
                code: "commander.missingArgument"
            })
        }
        optionMissingArgument(A) {
            let B = `error: option '${A.flags}' argument missing`;
            this.error(B, {
                code: "commander.optionMissingArgument"
            })
        }
        missingMandatoryOptionValue(A) {
            let B = `error: required option '${A.flags}' not specified`;
            this.error(B, {
                code: "commander.missingMandatoryOptionValue"
            })
        }
        _conflictingOption(A, B) {
            let Q = (G) => {
                    let F = G.attributeName(),
                        I = this.getOptionValue(F),
                        Y = this.options.find((J) => J.negate && F === J.attributeName()),
                        W = this.options.find((J) => !J.negate && F === J.attributeName());
                    if (Y && (Y.presetArg === void 0 && I === !1 || Y.presetArg !== void 0 && I === Y.presetArg)) return Y;
                    return W || G
                },
                Z = (G) => {
                    let F = Q(G),
                        I = F.attributeName();
                    if (this.getOptionValueSource(I) === "env") return `environment variable '${F.envVar}'`;
                    return `option '${F.flags}'`
                },
                D = `error: ${Z(A)} cannot be used with ${Z(B)}`;
            this.error(D, {
                code: "commander.conflictingOption"
            })
        }
        unknownOption(A) {
            if (this._allowUnknownOption) return;
            let B = "";
            if (A.startsWith("--") && this._showSuggestionAfterError) {
                let Z = [],
                    D = this;
                do {
                    let G = D.createHelp().visibleOptions(D).filter((F) => F.long).map((F) => F.long);
                    Z = Z.concat(G), D = D.parent
                } while (D && !D._enablePositionalOptions);
                B = gcB(A, Z)
            }
            let Q = `error: unknown option '${A}'${B}`;
            this.error(Q, {
                code: "commander.unknownOption"
            })
        }
        _excessArguments(A) {
            if (this._allowExcessArguments) return;
            let B = this.registeredArguments.length,
                Q = B === 1 ? "" : "s",
                D = `error: too many arguments${this.parent?` for '${this.name()}'`:""}. Expected ${B} argument${Q} but got ${A.length}.`;
            this.error(D, {
                code: "commander.excessArguments"
            })
        }
        unknownCommand() {
            let A = this.args[0],
                B = "";
            if (this._showSuggestionAfterError) {
                let Z = [];
                this.createHelp().visibleCommands(this).forEach((D) => {
                    if (Z.push(D.name()), D.alias()) Z.push(D.alias())
                }), B = gcB(A, Z)
            }
            let Q = `error: unknown command '${A}'${B}`;
            this.error(Q, {
                code: "commander.unknownCommand"
            })
        }
        version(A, B, Q) {
            if (A === void 0) return this._version;
            this._version = A, B = B || "-V, --version", Q = Q || "output the version number";
            let Z = this.createOption(B, Q);
            return this._versionOptionName = Z.attributeName(), this._registerOption(Z), this.on("option:" + Z.name(), () => {
                this._outputConfiguration.writeOut(`${A}
`), this._exit(0, "commander.version", A)
            }), this
        }
        description(A, B) {
            if (A === void 0 && B === void 0) return this._description;
            if (this._description = A, B) this._argsDescription = B;
            return this
        }
        summary(A) {
            if (A === void 0) return this._summary;
            return this._summary = A, this
        }
        alias(A) {
            if (A === void 0) return this._aliases[0];
            let B = this;
            if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) B = this.commands[this.commands.length - 1];
            if (A === B._name) throw new Error("Command alias can't be the same as its name");
            let Q = this.parent?._findCommand(A);
            if (Q) {
                let Z = [Q.name()].concat(Q.aliases()).join("|");
                throw new Error(`cannot add alias '${A}' to command '${this.name()}' as already have command '${Z}'`)
            }
            return B._aliases.push(A), this
        }
        aliases(A) {
            if (A === void 0) return this._aliases;
            return A.forEach((B) => this.alias(B)), this
        }
        usage(A) {
            if (A === void 0) {
                if (this._usage) return this._usage;
                let B = this.registeredArguments.map((Q) => {
                    return zO8(Q)
                });
                return [].concat(this.options.length || this._helpOption !== null ? "[options]" : [], this.commands.length ? "[command]" : [], this.registeredArguments.length ? B : []).join(" ")
            }
            return this._usage = A, this
        }
        name(A) {
            if (A === void 0) return this._name;
            return this._name = A, this
        }
        nameFromFilename(A) {
            return this._name = aS.basename(A, aS.extname(A)), this
        }
        executableDir(A) {
            if (A === void 0) return this._executableDir;
            return this._executableDir = A, this
        }
        helpInformation(A) {
            let B = this.createHelp();
            if (B.helpWidth === void 0) B.helpWidth = A && A.error ? this._outputConfiguration.getErrHelpWidth() : this._outputConfiguration.getOutHelpWidth();
            return B.formatHelp(this, B)
        }
        _getHelpContext(A) {
            A = A || {};
            let B = {
                    error: !!A.error
                },
                Q;
            if (B.error) Q = (Z) => this._outputConfiguration.writeErr(Z);
            else Q = (Z) => this._outputConfiguration.writeOut(Z);
            return B.write = A.write || Q, B.command = this, B
        }
        outputHelp(A) {
            let B;
            if (typeof A === "function") B = A, A = void 0;
            let Q = this._getHelpContext(A);
            this._getCommandAndAncestors().reverse().forEach((D) => D.emit("beforeAllHelp", Q)), this.emit("beforeHelp", Q);
            let Z = this.helpInformation(Q);
            if (B) {
                if (Z = B(Z), typeof Z !== "string" && !Buffer.isBuffer(Z)) throw new Error("outputHelp callback must return a string or a Buffer")
            }
            if (Q.write(Z), this._getHelpOption()?.long) this.emit(this._getHelpOption().long);
            this.emit("afterHelp", Q), this._getCommandAndAncestors().forEach((D) => D.emit("afterAllHelp", Q))
        }
        helpOption(A, B) {
            if (typeof A === "boolean") {
                if (A) this._helpOption = this._helpOption ?? void 0;
                else this._helpOption = null;
                return this
            }
            return A = A ?? "-h, --help", B = B ?? "display help for command", this._helpOption = this.createOption(A, B), this
        }
        _getHelpOption() {
            if (this._helpOption === void 0) this.helpOption(void 0, void 0);
            return this._helpOption
        }
        addHelpOption(A) {
            return this._helpOption = A, this
        }
        help(A) {
            this.outputHelp(A);
            let B = PD.exitCode || 0;
            if (B === 0 && A && typeof A !== "function" && A.error) B = 1;
            this._exit(B, "commander.help", "(outputHelp)")
        }
        addHelpText(A, B) {
            let Q = ["beforeAll", "before", "after", "afterAll"];
            if (!Q.includes(A)) throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${Q.join("', '")}'`);
            let Z = `${A}Help`;
            return this.on(Z, (D) => {
                let G;
                if (typeof B === "function") G = B({
                    error: D.error,
                    command: D.command
                });
                else G = B;
                if (G) D.write(`${G}
`)
            }), this
        }
        _outputHelpIfRequested(A) {
            let B = this._getHelpOption();
            if (B && A.find((Z) => B.is(Z))) this.outputHelp(), this._exit(0, "commander.helpDisplayed", "(outputHelp)")
        }
    }

    function ucB(A) {
        return A.map((B) => {
            if (!B.startsWith("--inspect")) return B;
            let Q, Z = "127.0.0.1",
                D = "9229",
                G;
            if ((G = B.match(/^(--inspect(-brk)?)$/)) !== null) Q = G[1];
            else if ((G = B.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null)
                if (Q = G[1], /^\d+$/.test(G[3])) D = G[3];
                else Z = G[3];
            else if ((G = B.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) Q = G[1], Z = G[3], D = G[4];
            if (Q && D !== "0") return `${Q}=${Z}:${parseInt(D)+1}`;
            return B
        })
    }
    wO8.Command = tT0
});