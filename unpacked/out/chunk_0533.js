/* chunk:533 bytes:[12558061, 12576968) size:18907 source:unpacked-cli.js */
var on4 = /^[\uD800-\uDBFF][\uDC00-\uDFFF]$/,
    _L2 = ["\x1B", ""],
    XO1 = (A) => `${_L2[0]}[${A}m`,
    yL2 = (A, B, Q) => {
        let Z = [];
        A = [...A];
        for (let D of A) {
            let G = D;
            if (D.includes(";")) D = D.split(";")[0][0] + "0";
            let F = OZ.codes.get(Number.parseInt(D, 10));
            if (F) {
                let I = A.indexOf(F.toString());
                if (I === -1) Z.push(XO1(B ? F : G));
                else A.splice(I, 1)
            } else if (B) {
                Z.push(XO1(0));
                break
            } else Z.push(XO1(G))
        }
        if (B) {
            if (Z = Z.filter((D, G) => Z.indexOf(D) === G), Q !== void 0) {
                let D = XO1(OZ.codes.get(Number.parseInt(Q, 10)));
                Z = Z.reduce((G, F) => F === D ? [F, ...G] : [...G, F], [])
            }
        }
        return Z.join("")
    };

function iL(A, B, Q) {
    let Z = [...A],
        D = [],
        G = typeof Q === "number" ? Q : Z.length,
        F = !1,
        I, Y = 0,
        W = "";
    for (let [J, X] of Z.entries()) {
        let V = !1;
        if (_L2.includes(X)) {
            let C = /\d[^m]*/.exec(A.slice(J, J + 18));
            if (I = C && C.length > 0 ? C[0] : void 0, Y < G) {
                if (F = !0, I !== void 0) D.push(I)
            }
        } else if (F && X === "m") F = !1, V = !0;
        if (!F && !V) Y++;
        if (!on4.test(X) && s51(X.codePointAt())) {
            if (Y++, typeof Q !== "number") G++
        }
        if (Y > B && Y <= G) W += X;
        else if (Y === B && !F && I !== void 0) W = yL2(D);
        else if (Y >= G) {
            W += yL2(D, !0, I);
            break
        }
    }
    return W
}
var bL2 = G1(vL2(), 1),
    tn4 = new Intl.Segmenter,
    en4 = /^\p{Default_Ignorable_Code_Point}$/u;

function go(A, B = {}) {
    if (typeof A !== "string" || A.length === 0) return 0;
    let {
        ambiguousIsNarrow: Q = !0,
        countAnsiEscapeCodes: Z = !1
    } = B;
    if (!Z) A = eG(A);
    if (A.length === 0) return 0;
    let D = 0,
        G = {
            ambiguousAsWide: !Q
        };
    for (let {
            segment: F
        }
        of tn4.segment(A)) {
        let I = F.codePointAt(0);
        if (I <= 31 || I >= 127 && I <= 159) continue;
        if (I >= 8203 && I <= 8207 || I === 65279) continue;
        if (I >= 768 && I <= 879 || I >= 6832 && I <= 6911 || I >= 7616 && I <= 7679 || I >= 8400 && I <= 8447 || I >= 65056 && I <= 65071) continue;
        if (I >= 55296 && I <= 57343) continue;
        if (I >= 65024 && I <= 65039) continue;
        if (en4.test(F)) continue;
        if (bL2.default().test(F)) {
            D += 2;
            continue
        }
        D += u_(I, G)
    }
    return D
}

function VO1(A, B, Q) {
    if (A.charAt(B) === " ") return B;
    let Z = Q ? 1 : -1;
    for (let D = 0; D <= 3; D++) {
        let G = B + D * Z;
        if (A.charAt(G) === " ") return G
    }
    return B
}

function VF0(A, B, Q = {}) {
    let {
        position: Z = "end",
        space: D = !1,
        preferTruncationOnSpace: G = !1
    } = Q, {
        truncationCharacter: F = "…"
    } = Q;
    if (typeof A !== "string") throw new TypeError(`Expected \`input\` to be a string, got ${typeof A}`);
    if (typeof B !== "number") throw new TypeError(`Expected \`columns\` to be a number, got ${typeof B}`);
    if (B < 1) return "";
    if (B === 1) return F;
    let I = go(A);
    if (I <= B) return A;
    if (Z === "start") {
        if (G) {
            let Y = VO1(A, I - B + 1, !0);
            return F + iL(A, Y, I).trim()
        }
        if (D === !0) F += " ";
        return F + iL(A, I - B + go(F), I)
    }
    if (Z === "middle") {
        if (D === !0) F = ` ${F} `;
        let Y = Math.floor(B / 2);
        if (G) {
            let W = VO1(A, Y),
                J = VO1(A, I - (B - Y) + 1, !0);
            return iL(A, 0, W) + F + iL(A, J, I).trim()
        }
        return iL(A, 0, Y) + F + iL(A, I - (B - Y) + go(F), I)
    }
    if (Z === "end") {
        if (G) {
            let Y = VO1(A, B - 1);
            return iL(A, 0, Y) + F
        }
        if (D === !0) F = ` ${F}`;
        return iL(A, 0, B - go(F)) + F
    }
    throw new Error(`Expected \`options.position\` to be either \`start\`, \`middle\` or \`end\`, got ${Z}`)
}
var fL2 = {},
    Aa4 = (A, B, Q) => {
        let Z = A + String(B) + String(Q),
            D = fL2[Z];
        if (D) return D;
        let G = A;
        if (Q === "wrap") G = a51(A, B, {
            trim: !1,
            hard: !0
        });
        if (Q.startsWith("truncate")) {
            let F = "end";
            if (Q === "truncate-middle") F = "middle";
            if (Q === "truncate-start") F = "start";
            G = VF0(A, B, {
                position: F
            })
        }
        return fL2[Z] = G, G
    },
    uo = Aa4;
var hL2 = (A) => {
        let B = "";
        for (let Q = 0; Q < A.childNodes.length; Q++) {
            let Z = A.childNodes[Q];
            if (Z === void 0) continue;
            let D = "";
            if (Z.nodeName === "#text") D = Z.nodeValue;
            else {
                if (Z.nodeName === "ink-text" || Z.nodeName === "ink-virtual-text") D = hL2(Z);
                if (D.length > 0 && typeof Z.internal_transform === "function") D = Z.internal_transform(D, Q)
            }
            B += D
        }
        return B
    },
    CO1 = hL2;
var KO1 = (A) => {
        let B = {
            nodeName: A,
            style: {},
            attributes: {},
            childNodes: [],
            parentNode: void 0,
            yogaNode: A === "ink-virtual-text" ? void 0 : YO1.Node.create()
        };
        if (A === "ink-text") B.yogaNode?.setMeasureFunc(Ba4.bind(null, B));
        return B
    },
    HO1 = (A, B) => {
        if (B.parentNode) r51(B.parentNode, B);
        if (B.parentNode = A, A.childNodes.push(B), B.yogaNode) A.yogaNode?.insertChild(B.yogaNode, A.yogaNode.getChildCount());
        if (A.nodeName === "ink-text" || A.nodeName === "ink-virtual-text") zO1(A)
    },
    CF0 = (A, B, Q) => {
        if (B.parentNode) r51(B.parentNode, B);
        B.parentNode = A;
        let Z = A.childNodes.indexOf(Q);
        if (Z >= 0) {
            if (A.childNodes.splice(Z, 0, B), B.yogaNode) A.yogaNode?.insertChild(B.yogaNode, Z);
            return
        }
        if (A.childNodes.push(B), B.yogaNode) A.yogaNode?.insertChild(B.yogaNode, A.yogaNode.getChildCount());
        if (A.nodeName === "ink-text" || A.nodeName === "ink-virtual-text") zO1(A)
    },
    r51 = (A, B) => {
        if (B.yogaNode) B.parentNode?.yogaNode?.removeChild(B.yogaNode);
        B.parentNode = void 0;
        let Q = A.childNodes.indexOf(B);
        if (Q >= 0) A.childNodes.splice(Q, 1);
        if (A.nodeName === "ink-text" || A.nodeName === "ink-virtual-text") zO1(A)
    },
    KF0 = (A, B, Q) => {
        A.attributes[B] = Q
    },
    HF0 = (A, B) => {
        A.style = B
    },
    gL2 = (A) => {
        let B = {
            nodeName: "#text",
            nodeValue: A,
            yogaNode: void 0,
            parentNode: void 0,
            style: {}
        };
        return o51(B, A), B
    },
    Ba4 = function(A, B) {
        let Q = A.nodeName === "#text" ? A.nodeValue : CO1(A),
            Z = WF0(Q);
        if (Z.width <= B) return Z;
        if (Z.width >= 1 && B > 0 && B < 1) return Z;
        let D = A.style?.textWrap ?? "wrap",
            G = uo(Q, B, D);
        return WF0(G)
    },
    uL2 = (A) => {
        if (!A?.parentNode) return;
        return A.yogaNode ?? uL2(A.parentNode)
    },
    zO1 = (A) => {
        uL2(A)?.markDirty()
    },
    o51 = (A, B) => {
        if (typeof B !== "string") B = String(B);
        A.nodeValue = B, zO1(A)
    };
var Za4 = (A, B) => {
        if ("position" in B) A.setPositionType(B.position === "absolute" ? ZO1 : QO1)
    },
    Da4 = (A, B) => {
        if ("margin" in B) A.setMargin(i51, B.margin ?? 0);
        if ("marginX" in B) A.setMargin(l51, B.marginX ?? 0);
        if ("marginY" in B) A.setMargin(p51, B.marginY ?? 0);
        if ("marginLeft" in B) A.setMargin(mR1, B.marginLeft || 0);
        if ("marginRight" in B) A.setMargin(dR1, B.marginRight || 0);
        if ("marginTop" in B) A.setMargin(h_, B.marginTop || 0);
        if ("marginBottom" in B) A.setMargin(g_, B.marginBottom || 0)
    },
    Ga4 = (A, B) => {
        if ("padding" in B) A.setPadding(i51, B.padding ?? 0);
        if ("paddingX" in B) A.setPadding(l51, B.paddingX ?? 0);
        if ("paddingY" in B) A.setPadding(p51, B.paddingY ?? 0);
        if ("paddingLeft" in B) A.setPadding(lL, B.paddingLeft || 0);
        if ("paddingRight" in B) A.setPadding(pL, B.paddingRight || 0);
        if ("paddingTop" in B) A.setPadding(h_, B.paddingTop || 0);
        if ("paddingBottom" in B) A.setPadding(g_, B.paddingBottom || 0)
    },
    Fa4 = (A, B) => {
        if ("flexGrow" in B) A.setFlexGrow(B.flexGrow ?? 0);
        if ("flexShrink" in B) A.setFlexShrink(typeof B.flexShrink === "number" ? B.flexShrink : 1);
        if ("flexWrap" in B) {
            if (B.flexWrap === "nowrap") A.setFlexWrap(DO1);
            if (B.flexWrap === "wrap") A.setFlexWrap(GO1);
            if (B.flexWrap === "wrap-reverse") A.setFlexWrap(FO1)
        }
        if ("flexDirection" in B) {
            if (B.flexDirection === "row") A.setFlexDirection(pR1);
            if (B.flexDirection === "row-reverse") A.setFlexDirection(iR1);
            if (B.flexDirection === "column") A.setFlexDirection(cR1);
            if (B.flexDirection === "column-reverse") A.setFlexDirection(lR1)
        }
        if ("flexBasis" in B)
            if (typeof B.flexBasis === "number") A.setFlexBasis(B.flexBasis);
            else if (typeof B.flexBasis === "string") A.setFlexBasisPercent(Number.parseInt(B.flexBasis, 10));
        else A.setFlexBasis(Number.NaN);
        if ("alignItems" in B) {
            if (B.alignItems === "stretch" || !B.alignItems) A.setAlignItems(uR1);
            if (B.alignItems === "flex-start") A.setAlignItems(m51);
            if (B.alignItems === "center") A.setAlignItems(d51);
            if (B.alignItems === "flex-end") A.setAlignItems(c51)
        }
        if ("alignSelf" in B) {
            if (B.alignSelf === "auto" || !B.alignSelf) A.setAlignSelf(gR1);
            if (B.alignSelf === "flex-start") A.setAlignSelf(m51);
            if (B.alignSelf === "center") A.setAlignSelf(d51);
            if (B.alignSelf === "flex-end") A.setAlignSelf(c51)
        }
        if ("justifyContent" in B) {
            if (B.justifyContent === "flex-start" || !B.justifyContent) A.setJustifyContent(rR1);
            if (B.justifyContent === "center") A.setJustifyContent(oR1);
            if (B.justifyContent === "flex-end") A.setJustifyContent(tR1);
            if (B.justifyContent === "space-between") A.setJustifyContent(eR1);
            if (B.justifyContent === "space-around") A.setJustifyContent(AO1);
            if (B.justifyContent === "space-evenly") A.setJustifyContent(BO1)
        }
    },
    Ia4 = (A, B) => {
        if ("width" in B)
            if (typeof B.width === "number") A.setWidth(B.width);
            else if (typeof B.width === "string") A.setWidthPercent(Number.parseInt(B.width, 10));
        else A.setWidthAuto();
        if ("height" in B)
            if (typeof B.height === "number") A.setHeight(B.height);
            else if (typeof B.height === "string") A.setHeightPercent(Number.parseInt(B.height, 10));
        else A.setHeightAuto();
        if ("minWidth" in B)
            if (typeof B.minWidth === "string") A.setMinWidthPercent(Number.parseInt(B.minWidth, 10));
            else A.setMinWidth(B.minWidth ?? 0);
        if ("minHeight" in B)
            if (typeof B.minHeight === "string") A.setMinHeightPercent(Number.parseInt(B.minHeight, 10));
            else A.setMinHeight(B.minHeight ?? 0)
    },
    Ya4 = (A, B) => {
        if ("display" in B) A.setDisplay(B.display === "flex" ? fo : f_)
    },
    Wa4 = (A, B) => {
        if ("borderStyle" in B) {
            let Q = B.borderStyle ? 1 : 0;
            if (B.borderTop !== !1) A.setBorder(h_, Q);
            if (B.borderBottom !== !1) A.setBorder(g_, Q);
            if (B.borderLeft !== !1) A.setBorder(lL, Q);
            if (B.borderRight !== !1) A.setBorder(pL, Q)
        }
    },
    Ja4 = (A, B) => {
        if ("gap" in B) A.setGap(sR1, B.gap ?? 0);
        if ("columnGap" in B) A.setGap(nR1, B.columnGap ?? 0);
        if ("rowGap" in B) A.setGap(aR1, B.rowGap ?? 0)
    },
    Xa4 = (A, B = {}) => {
        Za4(A, B), Da4(A, B), Ga4(A, B), Fa4(A, B), Ia4(A, B), Ya4(A, B), Wa4(A, B), Ja4(A, B)
    },
    zF0 = Xa4;
if (process.env.DEV === "true") try {
    Promise.resolve().then(() => iM2())
} catch (A) {
    if (A.code === "ERR_MODULE_NOT_FOUND") console.warn(`
The environment variable DEV is set to true, so Ink tried to import \`react-devtools-core\`,
but this failed as it was not installed. Debugging with React Devtools requires it.

To install use this command:

$ npm install --save-dev react-devtools-core
				`.trim() + `
`);
    else throw A
}
var nM2 = (A, B) => {
        if (A === B) return;
        if (!A) return B;
        let Q = {},
            Z = !1;
        for (let D of Object.keys(A))
            if (B ? !Object.hasOwn(B, D) : !0) Q[D] = void 0, Z = !0;
        if (B) {
            for (let D of Object.keys(B))
                if (B[D] !== A[D]) Q[D] = B[D], Z = !0
        }
        return Z ? Q : void 0
    },
    aM2 = (A) => {
        A?.unsetMeasureFunc(), A?.freeRecursive()
    },
    ku = sM2.default({
        getRootHostContext: () => ({
            isInsideText: !1
        }),
        prepareForCommit: () => null,
        preparePortalMount: () => null,
        clearContainer: () => !1,
        resetAfterCommit(A) {
            if (typeof A.onComputeLayout === "function") A.onComputeLayout();
            if (A.isStaticDirty) {
                if (A.isStaticDirty = !1, typeof A.onImmediateRender === "function") A.onImmediateRender();
                return
            }
            if (typeof A.onRender === "function") A.onRender()
        },
        getChildHostContext(A, B) {
            let Q = A.isInsideText,
                Z = B === "ink-text" || B === "ink-virtual-text";
            if (Q === Z) return A;
            return {
                isInsideText: Z
            }
        },
        shouldSetTextContent: () => !1,
        createInstance(A, B, Q, Z) {
            if (Z.isInsideText && A === "ink-box") throw new Error("<Box> can’t be nested inside <Text> component");
            let D = A === "ink-text" && Z.isInsideText ? "ink-virtual-text" : A,
                G = KO1(D);
            for (let [F, I] of Object.entries(B)) {
                if (F === "children") continue;
                if (F === "style") {
                    if (HF0(G, I), G.yogaNode) zF0(G.yogaNode, I);
                    continue
                }
                if (F === "internal_transform") {
                    G.internal_transform = I;
                    continue
                }
                if (F === "internal_static") {
                    G.internal_static = !0;
                    continue
                }
                KF0(G, F, I)
            }
            return G
        },
        createTextInstance(A, B, Q) {
            if (!Q.isInsideText) throw new Error(`Text string "${A}" must be rendered inside <Text> component`);
            return gL2(A)
        },
        resetTextContent() {},
        hideTextInstance(A) {
            o51(A, "")
        },
        unhideTextInstance(A, B) {
            o51(A, B)
        },
        getPublicInstance: (A) => A,
        hideInstance(A) {
            A.yogaNode?.setDisplay(f_)
        },
        unhideInstance(A) {
            A.yogaNode?.setDisplay(fo)
        },
        appendInitialChild: HO1,
        appendChild: HO1,
        insertBefore: CF0,
        finalizeInitialChildren(A, B, Q, Z) {
            if (A.internal_static) Z.isStaticDirty = !0, Z.staticNode = A;
            return !1
        },
        isPrimaryRenderer: !0,
        supportsMutation: !0,
        supportsPersistence: !1,
        supportsHydration: !1,
        scheduleTimeout: setTimeout,
        cancelTimeout: clearTimeout,
        noTimeout: -1,
        getCurrentEventPriority: () => IF0,
        beforeActiveInstanceBlur() {},
        afterActiveInstanceBlur() {},
        detachDeletedInstance() {},
        getInstanceFromNode: () => null,
        prepareScopeUpdate() {},
        getInstanceFromScope: () => null,
        appendChildToContainer: HO1,
        insertInContainerBefore: CF0,
        removeChildFromContainer(A, B) {
            r51(A, B), aM2(B.yogaNode)
        },
        prepareUpdate(A, B, Q, Z, D) {
            if (A.internal_static) D.isStaticDirty = !0;
            let G = nM2(Q, Z),
                F = nM2(Q.style, Z.style);
            if (!G && !F) return null;
            return {
                props: G,
                style: F
            }
        },
        commitUpdate(A, {
            props: B,
            style: Q
        }) {
            if (B)
                for (let [Z, D] of Object.entries(B)) {
                    if (Z === "style") {
                        HF0(A, D);
                        continue
                    }
                    if (Z === "internal_transform") {
                        A.internal_transform = D;
                        continue
                    }
                    if (Z === "internal_static") {
                        A.internal_static = !0;
                        continue
                    }
                    KF0(A, Z, D)
                }
            if (Q && A.yogaNode) zF0(A.yogaNode, Q)
        },
        commitTextUpdate(A, B, Q) {
            o51(A, Q)
        },
        removeChild(A, B) {
            r51(A, B), aM2(B.yogaNode)
        }
    });

function yF0(A, B = 1, Q = {}) {
    let {
        indent: Z = " ",
        includeEmptyLines: D = !1
    } = Q;
    if (typeof A !== "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof A}\``);
    if (typeof B !== "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof B}\``);
    if (B < 0) throw new RangeError(`Expected \`count\` to be at least 0, got \`${B}\``);
    if (typeof Z !== "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof Z}\``);
    if (B === 0) return A;
    let G = D ? /^/gm : /^(?!\s*$)/gm;
    return A.replace(G, Z.repeat(B))
}
var xs4 = (A) => {
        return A.getComputedWidth() - A.getComputedPadding(lL) - A.getComputedPadding(pL) - A.getComputedBorder(lL) - A.getComputedBorder(pL)
    },
    rM2 = xs4;
var BR2 = G1(eM2(), 1);