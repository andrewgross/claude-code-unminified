/* chunk:461 bytes:[10926493, 10971009) size:44516 source:unpacked-cli.js */
var Tf1 = E((SK8) => {
    var pM0 = YW(),
        jxB = f01(),
        RK8 = Rf1(),
        GH = MD(),
        kxB = cM0(),
        OK8 = lM0(),
        yS = SK8.elements = {},
        nF1 = Object.create(null);
    SK8.createElement = function(A, B, Q) {
        var Z = nF1[B] || PK8;
        return new Z(A, B, Q)
    };

    function e2(A) {
        return OK8(A, R9, yS, nF1)
    }

    function RD(A) {
        return {
            get: function() {
                var B = this._getattr(A);
                if (B === null) return "";
                var Q = this.doc._resolve(B);
                return Q === null ? B : Q
            },
            set: function(B) {
                this._setattr(A, B)
            }
        }
    }

    function Of1(A) {
        return {
            get: function() {
                var B = this._getattr(A);
                if (B === null) return null;
                if (B.toLowerCase() === "use-credentials") return "use-credentials";
                return "anonymous"
            },
            set: function(B) {
                if (B === null || B === void 0) this.removeAttribute(A);
                else this._setattr(A, B)
            }
        }
    }
    var g01 = {
            type: ["", "no-referrer", "no-referrer-when-downgrade", "same-origin", "origin", "strict-origin", "origin-when-cross-origin", "strict-origin-when-cross-origin", "unsafe-url"],
            missing: ""
        },
        TK8 = {
            A: !0,
            LINK: !0,
            BUTTON: !0,
            INPUT: !0,
            SELECT: !0,
            TEXTAREA: !0,
            COMMAND: !0
        },
        n$ = function(A, B, Q) {
            R9.call(this, A, B, Q), this._form = null
        },
        R9 = SK8.HTMLElement = e2({
            superclass: jxB,
            name: "HTMLElement",
            ctor: function A(B, Q, Z) {
                jxB.call(this, B, Q, GH.NAMESPACE.HTML, Z)
            },
            props: {
                dangerouslySetInnerHTML: {
                    set: function(A) {
                        this._innerHTML = A
                    }
                },
                innerHTML: {
                    get: function() {
                        return this.serialize()
                    },
                    set: function(A) {
                        var B = this.ownerDocument.implementation.mozHTMLParser(this.ownerDocument._address, this);
                        B.parse(A === null ? "" : String(A), !0);
                        var Q = this instanceof nF1.template ? this.content : this;
                        while (Q.hasChildNodes()) Q.removeChild(Q.firstChild);
                        Q.appendChild(B._asDocumentFragment())
                    }
                },
                style: {
                    get: function() {
                        if (!this._style) this._style = new RK8(this);
                        return this._style
                    },
                    set: function(A) {
                        if (A === null || A === void 0) A = "";
                        this._setattr("style", String(A))
                    }
                },
                blur: {
                    value: function() {}
                },
                focus: {
                    value: function() {}
                },
                forceSpellCheck: {
                    value: function() {}
                },
                click: {
                    value: function() {
                        if (this._click_in_progress) return;
                        this._click_in_progress = !0;
                        try {
                            if (this._pre_click_activation_steps) this._pre_click_activation_steps();
                            var A = this.ownerDocument.createEvent("MouseEvent");
                            A.initMouseEvent("click", !0, !0, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null);
                            var B = this.dispatchEvent(A);
                            if (B) {
                                if (this._post_click_activation_steps) this._post_click_activation_steps(A)
                            } else if (this._cancelled_activation_steps) this._cancelled_activation_steps()
                        } finally {
                            this._click_in_progress = !1
                        }
                    }
                },
                submit: {
                    value: GH.nyi
                }
            },
            attributes: {
                title: String,
                lang: String,
                dir: {
                    type: ["ltr", "rtl", "auto"],
                    missing: ""
                },
                draggable: {
                    type: ["true", "false"],
                    treatNullAsEmptyString: !0
                },
                spellcheck: {
                    type: ["true", "false"],
                    missing: ""
                },
                enterKeyHint: {
                    type: ["enter", "done", "go", "next", "previous", "search", "send"],
                    missing: ""
                },
                autoCapitalize: {
                    type: ["off", "on", "none", "sentences", "words", "characters"],
                    missing: ""
                },
                autoFocus: Boolean,
                accessKey: String,
                nonce: String,
                hidden: Boolean,
                translate: {
                    type: ["no", "yes"],
                    missing: ""
                },
                tabIndex: {
                    type: "long",
                    default: function() {
                        if (this.tagName in TK8 || this.contentEditable) return 0;
                        else return -1
                    }
                }
            },
            events: ["abort", "canplay", "canplaythrough", "change", "click", "contextmenu", "cuechange", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "input", "invalid", "keydown", "keypress", "keyup", "loadeddata", "loadedmetadata", "loadstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "pause", "play", "playing", "progress", "ratechange", "readystatechange", "reset", "seeked", "seeking", "select", "show", "stalled", "submit", "suspend", "timeupdate", "volumechange", "waiting", "blur", "error", "focus", "load", "scroll"]
        }),
        PK8 = e2({
            name: "HTMLUnknownElement",
            ctor: function A(B, Q, Z) {
                R9.call(this, B, Q, Z)
            }
        }),
        a$ = {
            form: {
                get: function() {
                    return this._form
                }
            }
        };
    e2({
        tag: "a",
        name: "HTMLAnchorElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        props: {
            _post_click_activation_steps: {
                value: function(A) {
                    if (this.href) this.ownerDocument.defaultView.location = this.href
                }
            }
        },
        attributes: {
            href: RD,
            ping: String,
            download: String,
            target: String,
            rel: String,
            media: String,
            hreflang: String,
            type: String,
            referrerPolicy: g01,
            coords: String,
            charset: String,
            name: String,
            rev: String,
            shape: String
        }
    });
    kxB._inherit(nF1.a.prototype);
    e2({
        tag: "area",
        name: "HTMLAreaElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            alt: String,
            target: String,
            download: String,
            rel: String,
            media: String,
            href: RD,
            hreflang: String,
            type: String,
            shape: String,
            coords: String,
            ping: String,
            referrerPolicy: g01,
            noHref: Boolean
        }
    });
    kxB._inherit(nF1.area.prototype);
    e2({
        tag: "br",
        name: "HTMLBRElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            clear: String
        }
    });
    e2({
        tag: "base",
        name: "HTMLBaseElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            target: String
        }
    });
    e2({
        tag: "body",
        name: "HTMLBodyElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        events: ["afterprint", "beforeprint", "beforeunload", "blur", "error", "focus", "hashchange", "load", "message", "offline", "online", "pagehide", "pageshow", "popstate", "resize", "scroll", "storage", "unload"],
        attributes: {
            text: {
                type: String,
                treatNullAsEmptyString: !0
            },
            link: {
                type: String,
                treatNullAsEmptyString: !0
            },
            vLink: {
                type: String,
                treatNullAsEmptyString: !0
            },
            aLink: {
                type: String,
                treatNullAsEmptyString: !0
            },
            bgColor: {
                type: String,
                treatNullAsEmptyString: !0
            },
            background: String
        }
    });
    e2({
        tag: "button",
        name: "HTMLButtonElement",
        ctor: function A(B, Q, Z) {
            n$.call(this, B, Q, Z)
        },
        props: a$,
        attributes: {
            name: String,
            value: String,
            disabled: Boolean,
            autofocus: Boolean,
            type: {
                type: ["submit", "reset", "button", "menu"],
                missing: "submit"
            },
            formTarget: String,
            formAction: RD,
            formNoValidate: Boolean,
            formMethod: {
                type: ["get", "post", "dialog"],
                invalid: "get",
                missing: ""
            },
            formEnctype: {
                type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
                invalid: "application/x-www-form-urlencoded",
                missing: ""
            }
        }
    });
    e2({
        tag: "dl",
        name: "HTMLDListElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            compact: Boolean
        }
    });
    e2({
        tag: "data",
        name: "HTMLDataElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            value: String
        }
    });
    e2({
        tag: "datalist",
        name: "HTMLDataListElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        }
    });
    e2({
        tag: "details",
        name: "HTMLDetailsElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            open: Boolean
        }
    });
    e2({
        tag: "div",
        name: "HTMLDivElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            align: String
        }
    });
    e2({
        tag: "embed",
        name: "HTMLEmbedElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            src: RD,
            type: String,
            width: String,
            height: String,
            align: String,
            name: String
        }
    });
    e2({
        tag: "fieldset",
        name: "HTMLFieldSetElement",
        ctor: function A(B, Q, Z) {
            n$.call(this, B, Q, Z)
        },
        props: a$,
        attributes: {
            disabled: Boolean,
            name: String
        }
    });
    e2({
        tag: "form",
        name: "HTMLFormElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            action: String,
            autocomplete: {
                type: ["on", "off"],
                missing: "on"
            },
            name: String,
            acceptCharset: {
                name: "accept-charset"
            },
            target: String,
            noValidate: Boolean,
            method: {
                type: ["get", "post", "dialog"],
                invalid: "get",
                missing: "get"
            },
            enctype: {
                type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
                invalid: "application/x-www-form-urlencoded",
                missing: "application/x-www-form-urlencoded"
            },
            encoding: {
                name: "enctype",
                type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
                invalid: "application/x-www-form-urlencoded",
                missing: "application/x-www-form-urlencoded"
            }
        }
    });
    e2({
        tag: "hr",
        name: "HTMLHRElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            align: String,
            color: String,
            noShade: Boolean,
            size: String,
            width: String
        }
    });
    e2({
        tag: "head",
        name: "HTMLHeadElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        }
    });
    e2({
        tags: ["h1", "h2", "h3", "h4", "h5", "h6"],
        name: "HTMLHeadingElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            align: String
        }
    });
    e2({
        tag: "html",
        name: "HTMLHtmlElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            xmlns: RD,
            version: String
        }
    });
    e2({
        tag: "iframe",
        name: "HTMLIFrameElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            src: RD,
            srcdoc: String,
            name: String,
            width: String,
            height: String,
            seamless: Boolean,
            allow: Boolean,
            allowFullscreen: Boolean,
            allowUserMedia: Boolean,
            allowPaymentRequest: Boolean,
            referrerPolicy: g01,
            loading: {
                type: ["eager", "lazy"],
                treatNullAsEmptyString: !0
            },
            align: String,
            scrolling: String,
            frameBorder: String,
            longDesc: RD,
            marginHeight: {
                type: String,
                treatNullAsEmptyString: !0
            },
            marginWidth: {
                type: String,
                treatNullAsEmptyString: !0
            }
        }
    });
    e2({
        tag: "img",
        name: "HTMLImageElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            alt: String,
            src: RD,
            srcset: String,
            crossOrigin: Of1,
            useMap: String,
            isMap: Boolean,
            sizes: String,
            height: {
                type: "unsigned long",
                default: 0
            },
            width: {
                type: "unsigned long",
                default: 0
            },
            referrerPolicy: g01,
            loading: {
                type: ["eager", "lazy"],
                missing: ""
            },
            name: String,
            lowsrc: RD,
            align: String,
            hspace: {
                type: "unsigned long",
                default: 0
            },
            vspace: {
                type: "unsigned long",
                default: 0
            },
            longDesc: RD,
            border: {
                type: String,
                treatNullAsEmptyString: !0
            }
        }
    });
    e2({
        tag: "input",
        name: "HTMLInputElement",
        ctor: function A(B, Q, Z) {
            n$.call(this, B, Q, Z)
        },
        props: {
            form: a$.form,
            _post_click_activation_steps: {
                value: function(A) {
                    if (this.type === "checkbox") this.checked = !this.checked;
                    else if (this.type === "radio") {
                        var B = this.form.getElementsByName(this.name);
                        for (var Q = B.length - 1; Q >= 0; Q--) {
                            var Z = B[Q];
                            Z.checked = Z === this
                        }
                    }
                }
            }
        },
        attributes: {
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            accept: String,
            alt: String,
            max: String,
            min: String,
            pattern: String,
            placeholder: String,
            step: String,
            dirName: String,
            defaultValue: {
                name: "value"
            },
            multiple: Boolean,
            required: Boolean,
            readOnly: Boolean,
            checked: Boolean,
            value: String,
            src: RD,
            defaultChecked: {
                name: "checked",
                type: Boolean
            },
            size: {
                type: "unsigned long",
                default: 20,
                min: 1,
                setmin: 1
            },
            width: {
                type: "unsigned long",
                min: 0,
                setmin: 0,
                default: 0
            },
            height: {
                type: "unsigned long",
                min: 0,
                setmin: 0,
                default: 0
            },
            minLength: {
                type: "unsigned long",
                min: 0,
                setmin: 0,
                default: -1
            },
            maxLength: {
                type: "unsigned long",
                min: 0,
                setmin: 0,
                default: -1
            },
            autocomplete: String,
            type: {
                type: ["text", "hidden", "search", "tel", "url", "email", "password", "datetime", "date", "month", "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio", "file", "submit", "image", "reset", "button"],
                missing: "text"
            },
            formTarget: String,
            formNoValidate: Boolean,
            formMethod: {
                type: ["get", "post"],
                invalid: "get",
                missing: ""
            },
            formEnctype: {
                type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
                invalid: "application/x-www-form-urlencoded",
                missing: ""
            },
            inputMode: {
                type: ["verbatim", "latin", "latin-name", "latin-prose", "full-width-latin", "kana", "kana-name", "katakana", "numeric", "tel", "email", "url"],
                missing: ""
            },
            align: String,
            useMap: String
        }
    });
    e2({
        tag: "keygen",
        name: "HTMLKeygenElement",
        ctor: function A(B, Q, Z) {
            n$.call(this, B, Q, Z)
        },
        props: a$,
        attributes: {
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            challenge: String,
            keytype: {
                type: ["rsa"],
                missing: ""
            }
        }
    });
    e2({
        tag: "li",
        name: "HTMLLIElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            value: {
                type: "long",
                default: 0
            },
            type: String
        }
    });
    e2({
        tag: "label",
        name: "HTMLLabelElement",
        ctor: function A(B, Q, Z) {
            n$.call(this, B, Q, Z)
        },
        props: a$,
        attributes: {
            htmlFor: {
                name: "for",
                type: String
            }
        }
    });
    e2({
        tag: "legend",
        name: "HTMLLegendElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            align: String
        }
    });
    e2({
        tag: "link",
        name: "HTMLLinkElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            href: RD,
            rel: String,
            media: String,
            hreflang: String,
            type: String,
            crossOrigin: Of1,
            nonce: String,
            integrity: String,
            referrerPolicy: g01,
            imageSizes: String,
            imageSrcset: String,
            charset: String,
            rev: String,
            target: String
        }
    });
    e2({
        tag: "map",
        name: "HTMLMapElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            name: String
        }
    });
    e2({
        tag: "menu",
        name: "HTMLMenuElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            type: {
                type: ["context", "popup", "toolbar"],
                missing: "toolbar"
            },
            label: String,
            compact: Boolean
        }
    });
    e2({
        tag: "meta",
        name: "HTMLMetaElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            name: String,
            content: String,
            httpEquiv: {
                name: "http-equiv",
                type: String
            },
            scheme: String
        }
    });
    e2({
        tag: "meter",
        name: "HTMLMeterElement",
        ctor: function A(B, Q, Z) {
            n$.call(this, B, Q, Z)
        },
        props: a$
    });
    e2({
        tags: ["ins", "del"],
        name: "HTMLModElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            cite: RD,
            dateTime: String
        }
    });
    e2({
        tag: "ol",
        name: "HTMLOListElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        props: {
            _numitems: {
                get: function() {
                    var A = 0;
                    return this.childNodes.forEach(function(B) {
                        if (B.nodeType === pM0.ELEMENT_NODE && B.tagName === "LI") A++
                    }), A
                }
            }
        },
        attributes: {
            type: String,
            reversed: Boolean,
            start: {
                type: "long",
                default: function() {
                    if (this.reversed) return this._numitems;
                    else return 1
                }
            },
            compact: Boolean
        }
    });
    e2({
        tag: "object",
        name: "HTMLObjectElement",
        ctor: function A(B, Q, Z) {
            n$.call(this, B, Q, Z)
        },
        props: a$,
        attributes: {
            data: RD,
            type: String,
            name: String,
            useMap: String,
            typeMustMatch: Boolean,
            width: String,
            height: String,
            align: String,
            archive: String,
            code: String,
            declare: Boolean,
            hspace: {
                type: "unsigned long",
                default: 0
            },
            standby: String,
            vspace: {
                type: "unsigned long",
                default: 0
            },
            codeBase: RD,
            codeType: String,
            border: {
                type: String,
                treatNullAsEmptyString: !0
            }
        }
    });
    e2({
        tag: "optgroup",
        name: "HTMLOptGroupElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            disabled: Boolean,
            label: String
        }
    });
    e2({
        tag: "option",
        name: "HTMLOptionElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        props: {
            form: {
                get: function() {
                    var A = this.parentNode;
                    while (A && A.nodeType === pM0.ELEMENT_NODE) {
                        if (A.localName === "select") return A.form;
                        A = A.parentNode
                    }
                }
            },
            value: {
                get: function() {
                    return this._getattr("value") || this.text
                },
                set: function(A) {
                    this._setattr("value", A)
                }
            },
            text: {
                get: function() {
                    return this.textContent.replace(/[ \t\n\f\r]+/g, " ").trim()
                },
                set: function(A) {
                    this.textContent = A
                }
            }
        },
        attributes: {
            disabled: Boolean,
            defaultSelected: {
                name: "selected",
                type: Boolean
            },
            label: String
        }
    });
    e2({
        tag: "output",
        name: "HTMLOutputElement",
        ctor: function A(B, Q, Z) {
            n$.call(this, B, Q, Z)
        },
        props: a$,
        attributes: {
            name: String
        }
    });
    e2({
        tag: "p",
        name: "HTMLParagraphElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            align: String
        }
    });
    e2({
        tag: "param",
        name: "HTMLParamElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            name: String,
            value: String,
            type: String,
            valueType: String
        }
    });
    e2({
        tags: ["pre", "listing", "xmp"],
        name: "HTMLPreElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            width: {
                type: "long",
                default: 0
            }
        }
    });
    e2({
        tag: "progress",
        name: "HTMLProgressElement",
        ctor: function A(B, Q, Z) {
            n$.call(this, B, Q, Z)
        },
        props: a$,
        attributes: {
            max: {
                type: Number,
                float: !0,
                default: 1,
                min: 0
            }
        }
    });
    e2({
        tags: ["q", "blockquote"],
        name: "HTMLQuoteElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            cite: RD
        }
    });
    e2({
        tag: "script",
        name: "HTMLScriptElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        props: {
            text: {
                get: function() {
                    var A = "";
                    for (var B = 0, Q = this.childNodes.length; B < Q; B++) {
                        var Z = this.childNodes[B];
                        if (Z.nodeType === pM0.TEXT_NODE) A += Z._data
                    }
                    return A
                },
                set: function(A) {
                    if (this.removeChildren(), A !== null && A !== "") this.appendChild(this.ownerDocument.createTextNode(A))
                }
            }
        },
        attributes: {
            src: RD,
            type: String,
            charset: String,
            referrerPolicy: g01,
            defer: Boolean,
            async: Boolean,
            nomodule: Boolean,
            crossOrigin: Of1,
            nonce: String,
            integrity: String
        }
    });
    e2({
        tag: "select",
        name: "HTMLSelectElement",
        ctor: function A(B, Q, Z) {
            n$.call(this, B, Q, Z)
        },
        props: {
            form: a$.form,
            options: {
                get: function() {
                    return this.getElementsByTagName("option")
                }
            }
        },
        attributes: {
            autocomplete: String,
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            multiple: Boolean,
            required: Boolean,
            size: {
                type: "unsigned long",
                default: 0
            }
        }
    });
    e2({
        tag: "span",
        name: "HTMLSpanElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        }
    });
    e2({
        tag: "style",
        name: "HTMLStyleElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            media: String,
            type: String,
            scoped: Boolean
        }
    });
    e2({
        tag: "caption",
        name: "HTMLTableCaptionElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            align: String
        }
    });
    e2({
        name: "HTMLTableCellElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            colSpan: {
                type: "unsigned long",
                default: 1
            },
            rowSpan: {
                type: "unsigned long",
                default: 1
            },
            scope: {
                type: ["row", "col", "rowgroup", "colgroup"],
                missing: ""
            },
            abbr: String,
            align: String,
            axis: String,
            height: String,
            width: String,
            ch: {
                name: "char",
                type: String
            },
            chOff: {
                name: "charoff",
                type: String
            },
            noWrap: Boolean,
            vAlign: String,
            bgColor: {
                type: String,
                treatNullAsEmptyString: !0
            }
        }
    });
    e2({
        tags: ["col", "colgroup"],
        name: "HTMLTableColElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            span: {
                type: "limited unsigned long with fallback",
                default: 1,
                min: 1
            },
            align: String,
            ch: {
                name: "char",
                type: String
            },
            chOff: {
                name: "charoff",
                type: String
            },
            vAlign: String,
            width: String
        }
    });
    e2({
        tag: "table",
        name: "HTMLTableElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        props: {
            rows: {
                get: function() {
                    return this.getElementsByTagName("tr")
                }
            }
        },
        attributes: {
            align: String,
            border: String,
            frame: String,
            rules: String,
            summary: String,
            width: String,
            bgColor: {
                type: String,
                treatNullAsEmptyString: !0
            },
            cellPadding: {
                type: String,
                treatNullAsEmptyString: !0
            },
            cellSpacing: {
                type: String,
                treatNullAsEmptyString: !0
            }
        }
    });
    e2({
        tag: "template",
        name: "HTMLTemplateElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z), this._contentFragment = B._templateDoc.createDocumentFragment()
        },
        props: {
            content: {
                get: function() {
                    return this._contentFragment
                }
            },
            serialize: {
                value: function() {
                    return this.content.serialize()
                }
            }
        }
    });
    e2({
        tag: "tr",
        name: "HTMLTableRowElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        props: {
            cells: {
                get: function() {
                    return this.querySelectorAll("td,th")
                }
            }
        },
        attributes: {
            align: String,
            ch: {
                name: "char",
                type: String
            },
            chOff: {
                name: "charoff",
                type: String
            },
            vAlign: String,
            bgColor: {
                type: String,
                treatNullAsEmptyString: !0
            }
        }
    });
    e2({
        tags: ["thead", "tfoot", "tbody"],
        name: "HTMLTableSectionElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        props: {
            rows: {
                get: function() {
                    return this.getElementsByTagName("tr")
                }
            }
        },
        attributes: {
            align: String,
            ch: {
                name: "char",
                type: String
            },
            chOff: {
                name: "charoff",
                type: String
            },
            vAlign: String
        }
    });
    e2({
        tag: "textarea",
        name: "HTMLTextAreaElement",
        ctor: function A(B, Q, Z) {
            n$.call(this, B, Q, Z)
        },
        props: {
            form: a$.form,
            type: {
                get: function() {
                    return "textarea"
                }
            },
            defaultValue: {
                get: function() {
                    return this.textContent
                },
                set: function(A) {
                    this.textContent = A
                }
            },
            value: {
                get: function() {
                    return this.defaultValue
                },
                set: function(A) {
                    this.defaultValue = A
                }
            },
            textLength: {
                get: function() {
                    return this.value.length
                }
            }
        },
        attributes: {
            autocomplete: String,
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            placeholder: String,
            wrap: String,
            dirName: String,
            required: Boolean,
            readOnly: Boolean,
            rows: {
                type: "limited unsigned long with fallback",
                default: 2
            },
            cols: {
                type: "limited unsigned long with fallback",
                default: 20
            },
            maxLength: {
                type: "unsigned long",
                min: 0,
                setmin: 0,
                default: -1
            },
            minLength: {
                type: "unsigned long",
                min: 0,
                setmin: 0,
                default: -1
            },
            inputMode: {
                type: ["verbatim", "latin", "latin-name", "latin-prose", "full-width-latin", "kana", "kana-name", "katakana", "numeric", "tel", "email", "url"],
                missing: ""
            }
        }
    });
    e2({
        tag: "time",
        name: "HTMLTimeElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            dateTime: String,
            pubDate: Boolean
        }
    });
    e2({
        tag: "title",
        name: "HTMLTitleElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        props: {
            text: {
                get: function() {
                    return this.textContent
                }
            }
        }
    });
    e2({
        tag: "ul",
        name: "HTMLUListElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            type: String,
            compact: Boolean
        }
    });
    e2({
        name: "HTMLMediaElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            src: RD,
            crossOrigin: Of1,
            preload: {
                type: ["metadata", "none", "auto", {
                    value: "",
                    alias: "auto"
                }],
                missing: "auto"
            },
            loop: Boolean,
            autoplay: Boolean,
            mediaGroup: String,
            controls: Boolean,
            defaultMuted: {
                name: "muted",
                type: Boolean
            }
        }
    });
    e2({
        name: "HTMLAudioElement",
        tag: "audio",
        superclass: yS.HTMLMediaElement,
        ctor: function A(B, Q, Z) {
            yS.HTMLMediaElement.call(this, B, Q, Z)
        }
    });
    e2({
        name: "HTMLVideoElement",
        tag: "video",
        superclass: yS.HTMLMediaElement,
        ctor: function A(B, Q, Z) {
            yS.HTMLMediaElement.call(this, B, Q, Z)
        },
        attributes: {
            poster: RD,
            width: {
                type: "unsigned long",
                min: 0,
                default: 0
            },
            height: {
                type: "unsigned long",
                min: 0,
                default: 0
            }
        }
    });
    e2({
        tag: "td",
        name: "HTMLTableDataCellElement",
        superclass: yS.HTMLTableCellElement,
        ctor: function A(B, Q, Z) {
            yS.HTMLTableCellElement.call(this, B, Q, Z)
        }
    });
    e2({
        tag: "th",
        name: "HTMLTableHeaderCellElement",
        superclass: yS.HTMLTableCellElement,
        ctor: function A(B, Q, Z) {
            yS.HTMLTableCellElement.call(this, B, Q, Z)
        }
    });
    e2({
        tag: "frameset",
        name: "HTMLFrameSetElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        }
    });
    e2({
        tag: "frame",
        name: "HTMLFrameElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        }
    });
    e2({
        tag: "canvas",
        name: "HTMLCanvasElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        props: {
            getContext: {
                value: GH.nyi
            },
            probablySupportsContext: {
                value: GH.nyi
            },
            setContext: {
                value: GH.nyi
            },
            transferControlToProxy: {
                value: GH.nyi
            },
            toDataURL: {
                value: GH.nyi
            },
            toBlob: {
                value: GH.nyi
            }
        },
        attributes: {
            width: {
                type: "unsigned long",
                default: 300
            },
            height: {
                type: "unsigned long",
                default: 150
            }
        }
    });
    e2({
        tag: "dialog",
        name: "HTMLDialogElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        props: {
            show: {
                value: GH.nyi
            },
            showModal: {
                value: GH.nyi
            },
            close: {
                value: GH.nyi
            }
        },
        attributes: {
            open: Boolean,
            returnValue: String
        }
    });
    e2({
        tag: "menuitem",
        name: "HTMLMenuItemElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        props: {
            _label: {
                get: function() {
                    var A = this._getattr("label");
                    if (A !== null && A !== "") return A;
                    return A = this.textContent, A.replace(/[ \t\n\f\r]+/g, " ").trim()
                }
            },
            label: {
                get: function() {
                    var A = this._getattr("label");
                    if (A !== null) return A;
                    return this._label
                },
                set: function(A) {
                    this._setattr("label", A)
                }
            }
        },
        attributes: {
            type: {
                type: ["command", "checkbox", "radio"],
                missing: "command"
            },
            icon: RD,
            disabled: Boolean,
            checked: Boolean,
            radiogroup: String,
            default: Boolean
        }
    });
    e2({
        tag: "source",
        name: "HTMLSourceElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            srcset: String,
            sizes: String,
            media: String,
            src: RD,
            type: String,
            width: String,
            height: String
        }
    });
    e2({
        tag: "track",
        name: "HTMLTrackElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            src: RD,
            srclang: String,
            label: String,
            default: Boolean,
            kind: {
                type: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
                missing: "subtitles",
                invalid: "metadata"
            }
        },
        props: {
            NONE: {
                get: function() {
                    return 0
                }
            },
            LOADING: {
                get: function() {
                    return 1
                }
            },
            LOADED: {
                get: function() {
                    return 2
                }
            },
            ERROR: {
                get: function() {
                    return 3
                }
            },
            readyState: {
                get: GH.nyi
            },
            track: {
                get: GH.nyi
            }
        }
    });
    e2({
        tag: "font",
        name: "HTMLFontElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            color: {
                type: String,
                treatNullAsEmptyString: !0
            },
            face: {
                type: String
            },
            size: {
                type: String
            }
        }
    });
    e2({
        tag: "dir",
        name: "HTMLDirectoryElement",
        ctor: function A(B, Q, Z) {
            R9.call(this, B, Q, Z)
        },
        attributes: {
            compact: Boolean
        }
    });
    e2({
        tags: ["abbr", "address", "article", "aside", "b", "bdi", "bdo", "cite", "content", "code", "dd", "dfn", "dt", "em", "figcaption", "figure", "footer", "header", "hgroup", "i", "kbd", "main", "mark", "nav", "noscript", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "section", "small", "strong", "sub", "summary", "sup", "u", "var", "wbr", "acronym", "basefont", "big", "center", "nobr", "noembed", "noframes", "plaintext", "strike", "tt"]
    })
});