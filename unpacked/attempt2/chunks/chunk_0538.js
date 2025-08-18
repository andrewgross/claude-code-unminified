/* chunk:538 bytes:[12652222, 12669727) size:17505 source:unpacked-cli.js */
var So4 = {
        components: {
            Alert: VO2,
            Badge: CO2,
            ConfirmInput: KO2,
            MultiSelect: HO2,
            OrderedList: zO2,
            ProgressBar: EO2,
            Select: UO2,
            Spinner: wO2,
            StatusMessage: $O2,
            UnorderedList: qO2,
            TextInput: NO2,
            EmailInput: LO2,
            PasswordInput: MO2
        }
    },
    jo4 = C31.createContext(So4);
var o5 = (A) => {
    return C31.useContext(jo4).components[A]
};
var yo4 = G1(z1(), 1);
var EP = G1(z1(), 1);
var eo = G1(z1(), 1);
var RO2 = G1(z1(), 1);
var K31 = s0.line;
var AT1 = RO2.createContext({
    marker: K31
});

function OO2({
    children: A
}) {
    let {
        marker: B
    } = eo.useContext(AT1), {
        styles: Q
    } = o5("UnorderedList");
    return eo.default.createElement(v, {
        ...Q.listItem()
    }, eo.default.createElement(T, {
        ...Q.marker()
    }, B), eo.default.createElement(v, {
        ...Q.content()
    }, A))
}
var TO2 = G1(z1(), 1),
    WI0 = TO2.createContext({
        depth: 0
    });

function _o4({
    children: A
}) {
    let {
        depth: B
    } = EP.useContext(WI0), {
        styles: Q,
        config: Z
    } = o5("UnorderedList"), D = EP.useMemo(() => ({
        depth: B + 1
    }), [B]), G = EP.useMemo(() => {
        let {
            marker: F
        } = Z();
        if (typeof F === "string") return {
            marker: F
        };
        if (Array.isArray(F)) return {
            marker: F[B] ?? F.at(-1) ?? K31
        };
        return {
            marker: K31
        }
    }, [Z, B]);
    return EP.default.createElement(WI0.Provider, {
        value: D
    }, EP.default.createElement(AT1.Provider, {
        value: G
    }, EP.default.createElement(v, {
        ...Q.list()
    }, A)))
}
_o4.Item = OO2;
var Bt = G1(z1(), 1);
var H31 = G1(z1(), 1);

function PO2({
    isFocused: A,
    isSelected: B,
    children: Q
}) {
    let {
        styles: Z
    } = o5("MultiSelect");
    return H31.default.createElement(v, {
        ...Z.option({
            isFocused: A
        })
    }, A && H31.default.createElement(T, {
        ...Z.focusIndicator()
    }, s0.pointer), H31.default.createElement(T, {
        ...Z.label({
            isFocused: A,
            isSelected: B
        })
    }, Q), B && H31.default.createElement(T, {
        ...Z.selectedIndicator()
    }, s0.tick))
}
var bK = G1(z1(), 1);
import {
    isDeepStrictEqual as SO2
} from "node:util";
class At extends Map {
    first;
    constructor(A) {
        let B = [],
            Q, Z, D = 0;
        for (let G of A) {
            let F = {
                ...G,
                previous: Z,
                next: void 0,
                index: D
            };
            if (Z) Z.next = F;
            Q ||= F, B.push([G.value, F]), D++, Z = F
        }
        super(B);
        this.first = Q
    }
}
var xo4 = (A, B) => {
        switch (B.type) {
            case "focus-next-option": {
                if (!A.focusedValue) return A;
                let Q = A.optionMap.get(A.focusedValue);
                if (!Q) return A;
                let Z = Q.next;
                if (!Z) return A;
                if (!(Z.index >= A.visibleToIndex)) return {
                    ...A,
                    focusedValue: Z.value
                };
                let G = Math.min(A.optionMap.size, A.visibleToIndex + 1),
                    F = G - A.visibleOptionCount;
                return {
                    ...A,
                    focusedValue: Z.value,
                    visibleFromIndex: F,
                    visibleToIndex: G
                }
            }
            case "focus-previous-option": {
                if (!A.focusedValue) return A;
                let Q = A.optionMap.get(A.focusedValue);
                if (!Q) return A;
                let Z = Q.previous;
                if (!Z) return A;
                if (!(Z.index <= A.visibleFromIndex)) return {
                    ...A,
                    focusedValue: Z.value
                };
                let G = Math.max(0, A.visibleFromIndex - 1),
                    F = G + A.visibleOptionCount;
                return {
                    ...A,
                    focusedValue: Z.value,
                    visibleFromIndex: G,
                    visibleToIndex: F
                }
            }
            case "toggle-focused-option": {
                if (!A.focusedValue) return A;
                if (A.value.includes(A.focusedValue)) {
                    let Q = new Set(A.value);
                    return Q.delete(A.focusedValue), {
                        ...A,
                        previousValue: A.value,
                        value: [...Q]
                    }
                }
                return {
                    ...A,
                    previousValue: A.value,
                    value: [...A.value, A.focusedValue]
                }
            }
            case "reset":
                return B.state
        }
    },
    jO2 = ({
        visibleOptionCount: A,
        defaultValue: B,
        options: Q
    }) => {
        let Z = typeof A === "number" ? Math.min(A, Q.length) : Q.length,
            D = new At(Q),
            G = B ?? [];
        return {
            optionMap: D,
            visibleOptionCount: Z,
            focusedValue: D.first?.value,
            visibleFromIndex: 0,
            visibleToIndex: Z,
            previousValue: G,
            value: G
        }
    },
    kO2 = ({
        visibleOptionCount: A = 5,
        options: B,
        defaultValue: Q,
        onChange: Z,
        onSubmit: D
    }) => {
        let [G, F] = bK.useReducer(xo4, {
            visibleOptionCount: A,
            defaultValue: Q,
            options: B
        }, jO2), [I, Y] = bK.useState(B);
        if (B !== I && !SO2(B, I)) F({
            type: "reset",
            state: jO2({
                visibleOptionCount: A,
                defaultValue: Q,
                options: B
            })
        }), Y(B);
        let W = bK.useCallback(() => {
                F({
                    type: "focus-next-option"
                })
            }, []),
            J = bK.useCallback(() => {
                F({
                    type: "focus-previous-option"
                })
            }, []),
            X = bK.useCallback(() => {
                F({
                    type: "toggle-focused-option"
                })
            }, []),
            V = bK.useCallback(() => {
                D?.(G.value)
            }, [G.value, D]),
            C = bK.useMemo(() => {
                return B.map((K, H) => ({
                    ...K,
                    index: H
                })).slice(G.visibleFromIndex, G.visibleToIndex)
            }, [B, G.visibleFromIndex, G.visibleToIndex]);
        return bK.useEffect(() => {
            if (!SO2(G.previousValue, G.value)) Z?.(G.value)
        }, [G.previousValue, G.value, B, Z]), {
            focusedValue: G.focusedValue,
            visibleFromIndex: G.visibleFromIndex,
            visibleToIndex: G.visibleToIndex,
            value: G.value,
            visibleOptions: C,
            focusNextOption: W,
            focusPreviousOption: J,
            toggleFocusedOption: X,
            submit: V
        }
    };
var yO2 = ({
    isDisabled: A = !1,
    state: B
}) => {
    DA((Q, Z) => {
        if (Z.downArrow) B.focusNextOption();
        if (Z.upArrow) B.focusPreviousOption();
        if (Q === " ") B.toggleFocusedOption();
        if (Z.return) B.submit()
    }, {
        isActive: !A
    })
};

function BT1({
    isDisabled: A = !1,
    visibleOptionCount: B = 5,
    highlightText: Q,
    options: Z,
    defaultValue: D,
    onChange: G,
    onSubmit: F
}) {
    let I = kO2({
        visibleOptionCount: B,
        options: Z,
        defaultValue: D,
        onChange: G,
        onSubmit: F
    });
    yO2({
        isDisabled: A,
        state: I
    });
    let {
        styles: Y
    } = o5("MultiSelect");
    return Bt.default.createElement(v, {
        ...Y.container()
    }, I.visibleOptions.map((W) => {
        let J = W.label;
        if (Q && W.label.includes(Q)) {
            let X = W.label.indexOf(Q);
            J = Bt.default.createElement(Bt.default.Fragment, null, W.label.slice(0, X), Bt.default.createElement(T, {
                ...Y.highlightedText()
            }, Q), W.label.slice(X + Q.length))
        }
        return Bt.default.createElement(PO2, {
            key: W.value,
            isFocused: !A && I.focusedValue === W.value,
            isSelected: I.value.includes(W.value)
        }, J)
    }))
}
var _O2 = G1(z1(), 1);
var Qt = G1(z1(), 1);
var z31 = G1(z1(), 1);

function xO2({
    isFocused: A,
    isSelected: B,
    children: Q
}) {
    let {
        styles: Z
    } = o5("Select");
    return z31.default.createElement(v, {
        ...Z.option({
            isFocused: A
        })
    }, A && z31.default.createElement(T, {
        ...Z.focusIndicator()
    }, s0.pointer), z31.default.createElement(T, {
        ...Z.label({
            isFocused: A,
            isSelected: B
        })
    }, Q), B && z31.default.createElement(T, {
        ...Z.selectedIndicator()
    }, s0.tick))
}
var UE = G1(z1(), 1);
import {
    isDeepStrictEqual as vo4
} from "node:util";
var bo4 = (A, B) => {
        switch (B.type) {
            case "focus-next-option": {
                if (!A.focusedValue) return A;
                let Q = A.optionMap.get(A.focusedValue);
                if (!Q) return A;
                let Z = Q.next;
                if (!Z) return A;
                if (!(Z.index >= A.visibleToIndex)) return {
                    ...A,
                    focusedValue: Z.value
                };
                let G = Math.min(A.optionMap.size, A.visibleToIndex + 1),
                    F = G - A.visibleOptionCount;
                return {
                    ...A,
                    focusedValue: Z.value,
                    visibleFromIndex: F,
                    visibleToIndex: G
                }
            }
            case "focus-previous-option": {
                if (!A.focusedValue) return A;
                let Q = A.optionMap.get(A.focusedValue);
                if (!Q) return A;
                let Z = Q.previous;
                if (!Z) return A;
                if (!(Z.index <= A.visibleFromIndex)) return {
                    ...A,
                    focusedValue: Z.value
                };
                let G = Math.max(0, A.visibleFromIndex - 1),
                    F = G + A.visibleOptionCount;
                return {
                    ...A,
                    focusedValue: Z.value,
                    visibleFromIndex: G,
                    visibleToIndex: F
                }
            }
            case "select-focused-option":
                return {
                    ...A, previousValue: A.value, value: A.focusedValue
                };
            case "reset":
                return B.state
        }
    },
    vO2 = ({
        visibleOptionCount: A,
        defaultValue: B,
        options: Q
    }) => {
        let Z = typeof A === "number" ? Math.min(A, Q.length) : Q.length,
            D = new At(Q);
        return {
            optionMap: D,
            visibleOptionCount: Z,
            focusedValue: D.first?.value,
            visibleFromIndex: 0,
            visibleToIndex: Z,
            previousValue: B,
            value: B
        }
    },
    bO2 = ({
        visibleOptionCount: A = 5,
        options: B,
        defaultValue: Q,
        onChange: Z
    }) => {
        let [D, G] = UE.useReducer(bo4, {
            visibleOptionCount: A,
            defaultValue: Q,
            options: B
        }, vO2), [F, I] = UE.useState(B);
        if (B !== F && !vo4(B, F)) G({
            type: "reset",
            state: vO2({
                visibleOptionCount: A,
                defaultValue: Q,
                options: B
            })
        }), I(B);
        let Y = UE.useCallback(() => {
                G({
                    type: "focus-next-option"
                })
            }, []),
            W = UE.useCallback(() => {
                G({
                    type: "focus-previous-option"
                })
            }, []),
            J = UE.useCallback(() => {
                G({
                    type: "select-focused-option"
                })
            }, []),
            X = UE.useMemo(() => {
                return B.map((V, C) => ({
                    ...V,
                    index: C
                })).slice(D.visibleFromIndex, D.visibleToIndex)
            }, [B, D.visibleFromIndex, D.visibleToIndex]);
        return UE.useEffect(() => {
            if (D.value && D.previousValue !== D.value) Z?.(D.value)
        }, [D.previousValue, D.value, B, Z]), {
            focusedValue: D.focusedValue,
            visibleFromIndex: D.visibleFromIndex,
            visibleToIndex: D.visibleToIndex,
            value: D.value,
            visibleOptions: X,
            focusNextOption: Y,
            focusPreviousOption: W,
            selectFocusedOption: J
        }
    };
var fO2 = ({
    isDisabled: A = !1,
    state: B
}) => {
    DA((Q, Z) => {
        if (Z.downArrow) B.focusNextOption();
        if (Z.upArrow) B.focusPreviousOption();
        if (Z.return) B.selectFocusedOption()
    }, {
        isActive: !A
    })
};

function hO2({
    isDisabled: A = !1,
    visibleOptionCount: B = 5,
    highlightText: Q,
    options: Z,
    defaultValue: D,
    onChange: G
}) {
    let F = bO2({
        visibleOptionCount: B,
        options: Z,
        defaultValue: D,
        onChange: G
    });
    fO2({
        isDisabled: A,
        state: F
    });
    let {
        styles: I
    } = o5("Select");
    return Qt.default.createElement(v, {
        ...I.container()
    }, F.visibleOptions.map((Y) => {
        let W = Y.label;
        if (Q && Y.label.includes(Q)) {
            let J = Y.label.indexOf(Q);
            W = Qt.default.createElement(Qt.default.Fragment, null, Y.label.slice(0, J), Qt.default.createElement(T, {
                ...I.highlightedText()
            }, Q), Y.label.slice(J + Q.length))
        }
        return Qt.default.createElement(xO2, {
            key: Y.value,
            isFocused: !A && F.focusedValue === Y.value,
            isSelected: F.value === Y.value
        }, W)
    }))
}
var fo4 = G1(z1(), 1);
var gO2 = G1(z1(), 1);
var go4 = G1(z1(), 1);
var QT1 = G1(z1(), 1);
var ho4 = G1(z1(), 1);
var Qv5 = e1.inverse(" ");
var Q$ = G1(z1(), 1);
var Zt = G1(z1(), 1);
var uO2 = G1(z1(), 1);
var ZT1 = uO2.createContext({
    marker: s0.line
});

function DT1({
    children: A
}) {
    let {
        marker: B
    } = Zt.useContext(ZT1), {
        styles: Q
    } = o5("OrderedList");
    return Zt.default.createElement(v, {
        ...Q.listItem()
    }, Zt.default.createElement(T, {
        ...Q.marker()
    }, B), Zt.default.createElement(v, {
        ...Q.content()
    }, A))
}
var mO2 = G1(z1(), 1),
    JI0 = mO2.createContext({
        marker: ""
    });

function s_({
    children: A
}) {
    let {
        marker: B
    } = Q$.useContext(JI0), {
        styles: Q
    } = o5("OrderedList"), Z = 0;
    for (let G of Q$.default.Children.toArray(A)) {
        if (!Q$.isValidElement(G) || G.type !== DT1) continue;
        Z++
    }
    let D = String(Z).length;
    return Q$.default.createElement(v, {
        ...Q.list()
    }, Q$.default.Children.map(A, (G, F) => {
        if (!Q$.isValidElement(G) || G.type !== DT1) return G;
        let I = `${String(F+1).padStart(D)}.`,
            Y = `${B}${I}`;
        return Q$.default.createElement(JI0.Provider, {
            value: {
                marker: Y
            }
        }, Q$.default.createElement(ZT1.Provider, {
            value: {
                marker: Y
            }
        }, G))
    }))
}
s_.Item = DT1;
var mo4 = G1(z1(), 1);
var XI0 = G1(z1(), 1);
var uo4 = G1(z1(), 1);
var kv5 = e1.inverse(" ");
var do4 = G1(z1(), 1);
var co4 = G1(z1(), 1);
var po4 = G1(z1(), 1);
var GT1 = G1(z1(), 1);
var lo4 = G1(z1(), 1);
var Bb5 = e1.inverse(" ");

function dO2({
    isFocused: A,
    isSelected: B,
    children: Q,
    shouldShowDownArrow: Z,
    shouldShowUpArrow: D
}) {
    let {
        styles: G
    } = o5("Select");
    return r_.default.createElement(v, null, A ? r_.default.createElement(T, {
        ...G.focusIndicator()
    }, s0.pointer, " ") : Z ? r_.default.createElement(T, {
        color: "secondaryText"
    }, s0.arrowDown, " ") : D ? r_.default.createElement(T, {
        color: "secondaryText"
    }, s0.arrowUp, " ") : r_.default.createElement(T, null, "  "), r_.default.createElement(T, {
        ...G.label({
            isFocused: A,
            isSelected: B
        })
    }, Q), B && r_.default.createElement(T, {
        ...G.selectedIndicator()
    }, s0.tick))
}
var fK = G1(z1(), 1);
import {
    isDeepStrictEqual as io4
} from "node:util";
class FT1 extends Map {
    first;
    constructor(A) {
        let B = [],
            Q, Z, D = 0;
        for (let G of A) {
            let F = {
                ...G,
                previous: Z,
                next: void 0,
                index: D
            };
            if (Z) Z.next = F;
            Q ||= F, B.push([G.value, F]), D++, Z = F
        }
        super(B);
        this.first = Q
    }
}