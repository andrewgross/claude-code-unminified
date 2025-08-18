/* chunk:422 bytes:[10105129, 10124975) size:19846 source:unpacked-cli.js */
var lUB = E((b08) => {
    var E3 = oU0(),
        cUB = tU0(),
        v08 = Bw0();
    b08.implementation = class A {
        constructor(B, [Q, Z]) {
            let D = null;
            if (Z !== void 0) {
                if (D = E3.basicURLParse(Z), D === null) throw new TypeError(`Invalid base URL: ${Z}`)
            }
            let G = E3.basicURLParse(Q, {
                baseURL: D
            });
            if (G === null) throw new TypeError(`Invalid URL: ${Q}`);
            let F = G.query !== null ? G.query : "";
            this._url = G, this._query = v08.createImpl(B, [F], {
                doNotStripQMark: !0
            }), this._query._url = this
        }
        static parse(B, Q, Z) {
            try {
                return new A(B, [Q, Z])
            } catch {
                return null
            }
        }
        static canParse(B, Q) {
            let Z = null;
            if (Q !== void 0) {
                if (Z = E3.basicURLParse(Q), Z === null) return !1
            }
            if (E3.basicURLParse(B, {
                    baseURL: Z
                }) === null) return !1;
            return !0
        }
        get href() {
            return E3.serializeURL(this._url)
        }
        set href(B) {
            let Q = E3.basicURLParse(B);
            if (Q === null) throw new TypeError(`Invalid URL: ${B}`);
            this._url = Q, this._query._list.splice(0);
            let {
                query: Z
            } = Q;
            if (Z !== null) this._query._list = cUB.parseUrlencodedString(Z)
        }
        get origin() {
            return E3.serializeURLOrigin(this._url)
        }
        get protocol() {
            return `${this._url.scheme}:`
        }
        set protocol(B) {
            E3.basicURLParse(`${B}:`, {
                url: this._url,
                stateOverride: "scheme start"
            })
        }
        get username() {
            return this._url.username
        }
        set username(B) {
            if (E3.cannotHaveAUsernamePasswordPort(this._url)) return;
            E3.setTheUsername(this._url, B)
        }
        get password() {
            return this._url.password
        }
        set password(B) {
            if (E3.cannotHaveAUsernamePasswordPort(this._url)) return;
            E3.setThePassword(this._url, B)
        }
        get host() {
            let B = this._url;
            if (B.host === null) return "";
            if (B.port === null) return E3.serializeHost(B.host);
            return `${E3.serializeHost(B.host)}:${E3.serializeInteger(B.port)}`
        }
        set host(B) {
            if (E3.hasAnOpaquePath(this._url)) return;
            E3.basicURLParse(B, {
                url: this._url,
                stateOverride: "host"
            })
        }
        get hostname() {
            if (this._url.host === null) return "";
            return E3.serializeHost(this._url.host)
        }
        set hostname(B) {
            if (E3.hasAnOpaquePath(this._url)) return;
            E3.basicURLParse(B, {
                url: this._url,
                stateOverride: "hostname"
            })
        }
        get port() {
            if (this._url.port === null) return "";
            return E3.serializeInteger(this._url.port)
        }
        set port(B) {
            if (E3.cannotHaveAUsernamePasswordPort(this._url)) return;
            if (B === "") this._url.port = null;
            else E3.basicURLParse(B, {
                url: this._url,
                stateOverride: "port"
            })
        }
        get pathname() {
            return E3.serializePath(this._url)
        }
        set pathname(B) {
            if (E3.hasAnOpaquePath(this._url)) return;
            this._url.path = [], E3.basicURLParse(B, {
                url: this._url,
                stateOverride: "path start"
            })
        }
        get search() {
            if (this._url.query === null || this._url.query === "") return "";
            return `?${this._url.query}`
        }
        set search(B) {
            let Q = this._url;
            if (B === "") {
                Q.query = null, this._query._list = [];
                return
            }
            let Z = B[0] === "?" ? B.substring(1) : B;
            Q.query = "", E3.basicURLParse(Z, {
                url: Q,
                stateOverride: "query"
            }), this._query._list = cUB.parseUrlencodedString(Z)
        }
        get searchParams() {
            return this._query
        }
        get hash() {
            if (this._url.fragment === null || this._url.fragment === "") return "";
            return `#${this._url.fragment}`
        }
        set hash(B) {
            if (B === "") {
                this._url.fragment = null;
                return
            }
            let Q = B[0] === "#" ? B.substring(1) : B;
            this._url.fragment = "", E3.basicURLParse(Q, {
                url: this._url,
                stateOverride: "fragment"
            })
        }
        toJSON() {
            return this.href
        }
    }
});
var aUB = E((u08) => {
    var KJ = wx1(),
        QC = qx1(),
        _8 = QC.implSymbol,
        h08 = QC.ctorRegistrySymbol;
    u08.is = (A) => {
        return QC.isObject(A) && QC.hasOwn(A, _8) && A[_8] instanceof uM.implementation
    };
    u08.isImpl = (A) => {
        return QC.isObject(A) && A instanceof uM.implementation
    };
    u08.convert = (A, B, {
        context: Q = "The provided value"
    } = {}) => {
        if (u08.is(B)) return QC.implForWrapper(B);
        throw new A.TypeError(`${Q} is not of type 'URL'.`)
    };

    function pUB(A, B) {
        let Q;
        if (B !== void 0) Q = B.prototype;
        if (!QC.isObject(Q)) Q = A[h08].URL.prototype;
        return Object.create(Q)
    }
    u08.create = (A, B, Q) => {
        let Z = pUB(A);
        return u08.setup(Z, A, B, Q)
    };
    u08.createImpl = (A, B, Q) => {
        let Z = u08.create(A, B, Q);
        return QC.implForWrapper(Z)
    };
    u08._internalSetup = (A, B) => {};
    u08.setup = (A, B, Q = [], Z = {}) => {
        if (Z.wrapper = A, u08._internalSetup(A, B), Object.defineProperty(A, _8, {
                value: new uM.implementation(B, Q, Z),
                configurable: !0
            }), A[_8][QC.wrapperSymbol] = A, uM.init) uM.init(A[_8]);
        return A
    };
    u08.new = (A, B) => {
        let Q = pUB(A, B);
        if (u08._internalSetup(Q, A), Object.defineProperty(Q, _8, {
                value: Object.create(uM.implementation.prototype),
                configurable: !0
            }), Q[_8][QC.wrapperSymbol] = Q, uM.init) uM.init(Q[_8]);
        return Q[_8]
    };
    var g08 = new Set(["Window", "Worker"]);
    u08.install = (A, B) => {
        if (!B.some((D) => g08.has(D))) return;
        let Q = QC.initCtorRegistry(A);
        class Z {
            constructor(D) {
                if (arguments.length < 1) throw new A.TypeError(`Failed to construct 'URL': 1 argument required, but only ${arguments.length} present.`);
                let G = [];
                {
                    let F = arguments[0];
                    F = KJ.USVString(F, {
                        context: "Failed to construct 'URL': parameter 1",
                        globals: A
                    }), G.push(F)
                } {
                    let F = arguments[1];
                    if (F !== void 0) F = KJ.USVString(F, {
                        context: "Failed to construct 'URL': parameter 2",
                        globals: A
                    });
                    G.push(F)
                }
                return u08.setup(Object.create(new.target.prototype), A, G)
            }
            toJSON() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!u08.is(D)) throw new A.TypeError("'toJSON' called on an object that is not a valid instance of URL.");
                return D[_8].toJSON()
            }
            get href() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!u08.is(D)) throw new A.TypeError("'get href' called on an object that is not a valid instance of URL.");
                return D[_8].href
            }
            set href(D) {
                let G = this !== null && this !== void 0 ? this : A;
                if (!u08.is(G)) throw new A.TypeError("'set href' called on an object that is not a valid instance of URL.");
                D = KJ.USVString(D, {
                    context: "Failed to set the 'href' property on 'URL': The provided value",
                    globals: A
                }), G[_8].href = D
            }
            toString() {
                let D = this;
                if (!u08.is(D)) throw new A.TypeError("'toString' called on an object that is not a valid instance of URL.");
                return D[_8].href
            }
            get origin() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!u08.is(D)) throw new A.TypeError("'get origin' called on an object that is not a valid instance of URL.");
                return D[_8].origin
            }
            get protocol() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!u08.is(D)) throw new A.TypeError("'get protocol' called on an object that is not a valid instance of URL.");
                return D[_8].protocol
            }
            set protocol(D) {
                let G = this !== null && this !== void 0 ? this : A;
                if (!u08.is(G)) throw new A.TypeError("'set protocol' called on an object that is not a valid instance of URL.");
                D = KJ.USVString(D, {
                    context: "Failed to set the 'protocol' property on 'URL': The provided value",
                    globals: A
                }), G[_8].protocol = D
            }
            get username() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!u08.is(D)) throw new A.TypeError("'get username' called on an object that is not a valid instance of URL.");
                return D[_8].username
            }
            set username(D) {
                let G = this !== null && this !== void 0 ? this : A;
                if (!u08.is(G)) throw new A.TypeError("'set username' called on an object that is not a valid instance of URL.");
                D = KJ.USVString(D, {
                    context: "Failed to set the 'username' property on 'URL': The provided value",
                    globals: A
                }), G[_8].username = D
            }
            get password() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!u08.is(D)) throw new A.TypeError("'get password' called on an object that is not a valid instance of URL.");
                return D[_8].password
            }
            set password(D) {
                let G = this !== null && this !== void 0 ? this : A;
                if (!u08.is(G)) throw new A.TypeError("'set password' called on an object that is not a valid instance of URL.");
                D = KJ.USVString(D, {
                    context: "Failed to set the 'password' property on 'URL': The provided value",
                    globals: A
                }), G[_8].password = D
            }
            get host() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!u08.is(D)) throw new A.TypeError("'get host' called on an object that is not a valid instance of URL.");
                return D[_8].host
            }
            set host(D) {
                let G = this !== null && this !== void 0 ? this : A;
                if (!u08.is(G)) throw new A.TypeError("'set host' called on an object that is not a valid instance of URL.");
                D = KJ.USVString(D, {
                    context: "Failed to set the 'host' property on 'URL': The provided value",
                    globals: A
                }), G[_8].host = D
            }
            get hostname() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!u08.is(D)) throw new A.TypeError("'get hostname' called on an object that is not a valid instance of URL.");
                return D[_8].hostname
            }
            set hostname(D) {
                let G = this !== null && this !== void 0 ? this : A;
                if (!u08.is(G)) throw new A.TypeError("'set hostname' called on an object that is not a valid instance of URL.");
                D = KJ.USVString(D, {
                    context: "Failed to set the 'hostname' property on 'URL': The provided value",
                    globals: A
                }), G[_8].hostname = D
            }
            get port() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!u08.is(D)) throw new A.TypeError("'get port' called on an object that is not a valid instance of URL.");
                return D[_8].port
            }
            set port(D) {
                let G = this !== null && this !== void 0 ? this : A;
                if (!u08.is(G)) throw new A.TypeError("'set port' called on an object that is not a valid instance of URL.");
                D = KJ.USVString(D, {
                    context: "Failed to set the 'port' property on 'URL': The provided value",
                    globals: A
                }), G[_8].port = D
            }
            get pathname() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!u08.is(D)) throw new A.TypeError("'get pathname' called on an object that is not a valid instance of URL.");
                return D[_8].pathname
            }
            set pathname(D) {
                let G = this !== null && this !== void 0 ? this : A;
                if (!u08.is(G)) throw new A.TypeError("'set pathname' called on an object that is not a valid instance of URL.");
                D = KJ.USVString(D, {
                    context: "Failed to set the 'pathname' property on 'URL': The provided value",
                    globals: A
                }), G[_8].pathname = D
            }
            get search() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!u08.is(D)) throw new A.TypeError("'get search' called on an object that is not a valid instance of URL.");
                return D[_8].search
            }
            set search(D) {
                let G = this !== null && this !== void 0 ? this : A;
                if (!u08.is(G)) throw new A.TypeError("'set search' called on an object that is not a valid instance of URL.");
                D = KJ.USVString(D, {
                    context: "Failed to set the 'search' property on 'URL': The provided value",
                    globals: A
                }), G[_8].search = D
            }
            get searchParams() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!u08.is(D)) throw new A.TypeError("'get searchParams' called on an object that is not a valid instance of URL.");
                return QC.getSameObject(this, "searchParams", () => {
                    return QC.tryWrapperForImpl(D[_8].searchParams)
                })
            }
            get hash() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!u08.is(D)) throw new A.TypeError("'get hash' called on an object that is not a valid instance of URL.");
                return D[_8].hash
            }
            set hash(D) {
                let G = this !== null && this !== void 0 ? this : A;
                if (!u08.is(G)) throw new A.TypeError("'set hash' called on an object that is not a valid instance of URL.");
                D = KJ.USVString(D, {
                    context: "Failed to set the 'hash' property on 'URL': The provided value",
                    globals: A
                }), G[_8].hash = D
            }
            static parse(D) {
                if (arguments.length < 1) throw new A.TypeError(`Failed to execute 'parse' on 'URL': 1 argument required, but only ${arguments.length} present.`);
                let G = [];
                {
                    let F = arguments[0];
                    F = KJ.USVString(F, {
                        context: "Failed to execute 'parse' on 'URL': parameter 1",
                        globals: A
                    }), G.push(F)
                } {
                    let F = arguments[1];
                    if (F !== void 0) F = KJ.USVString(F, {
                        context: "Failed to execute 'parse' on 'URL': parameter 2",
                        globals: A
                    });
                    G.push(F)
                }
                return QC.tryWrapperForImpl(uM.implementation.parse(A, ...G))
            }
            static canParse(D) {
                if (arguments.length < 1) throw new A.TypeError(`Failed to execute 'canParse' on 'URL': 1 argument required, but only ${arguments.length} present.`);
                let G = [];
                {
                    let F = arguments[0];
                    F = KJ.USVString(F, {
                        context: "Failed to execute 'canParse' on 'URL': parameter 1",
                        globals: A
                    }), G.push(F)
                } {
                    let F = arguments[1];
                    if (F !== void 0) F = KJ.USVString(F, {
                        context: "Failed to execute 'canParse' on 'URL': parameter 2",
                        globals: A
                    });
                    G.push(F)
                }
                return uM.implementation.canParse(...G)
            }
        }
        if (Object.defineProperties(Z.prototype, {
                toJSON: {
                    enumerable: !0
                },
                href: {
                    enumerable: !0
                },
                toString: {
                    enumerable: !0
                },
                origin: {
                    enumerable: !0
                },
                protocol: {
                    enumerable: !0
                },
                username: {
                    enumerable: !0
                },
                password: {
                    enumerable: !0
                },
                host: {
                    enumerable: !0
                },
                hostname: {
                    enumerable: !0
                },
                port: {
                    enumerable: !0
                },
                pathname: {
                    enumerable: !0
                },
                search: {
                    enumerable: !0
                },
                searchParams: {
                    enumerable: !0
                },
                hash: {
                    enumerable: !0
                },
                [Symbol.toStringTag]: {
                    value: "URL",
                    configurable: !0
                }
            }), Object.defineProperties(Z, {
                parse: {
                    enumerable: !0
                },
                canParse: {
                    enumerable: !0
                }
            }), Q.URL = Z, Object.defineProperty(A, "URL", {
                configurable: !0,
                writable: !0,
                value: Z
            }), B.includes("Window")) Object.defineProperty(A, "webkitURL", {
            configurable: !0,
            writable: !0,
            value: Z
        })
    };
    var uM = lUB()
});
var sUB = E((a08) => {
    var i08 = aUB(),
        n08 = Bw0();
    a08.URL = i08;
    a08.URLSearchParams = n08
});