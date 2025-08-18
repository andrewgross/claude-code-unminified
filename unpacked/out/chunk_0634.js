/* chunk:634 bytes:[14427159, 14446266) size:19107 source:unpacked-cli.js */
function TdB(A) {
    let [B, Q] = Lb.useState("INSERT"), Z = Lb.default.useRef(""), D = Lb.default.useRef(null), G = Lb.default.useRef(""), F = Lb.default.useRef(""), I = Lb.default.useRef(null), {
        onMessage: Y
    } = A, W = pj1(A), J = (f, k) => {
        return f === k && (f === "d" || f === "c")
    }, X = (f, k) => {
        switch (f) {
            case "h":
                return k.left();
            case "l":
                return k.right();
            case "j":
                return k.downLogicalLine();
            case "k":
                return k.upLogicalLine();
            case "0":
                return k.startOfLogicalLine();
            case "^":
                return k.firstNonBlankInLogicalLine();
            case "$":
                return k.endOfLogicalLine();
            case "w":
                return k.nextWord();
            case "e":
                return k.endOfWord();
            case "b":
                return k.prevWord();
            case "W":
                return k.nextWORD();
            case "E":
                return k.endOfWORD();
            case "B":
                return k.prevWORD();
            case "gg":
                return k.startOfFirstLine();
            case "G":
                return k.startOfLastLine();
            default:
                return null
        }
    }, V = (f, k, c = 1) => {
        if (J(f, Z.current)) return k.startOfLine();
        let u = k;
        for (let a = 0; a < c; a++) {
            if (!u) break;
            u = X(f, u)
        }
        return u
    }, C = (f, k, c, u = 1) => {
        let a = W.offset,
            l = f === "change";
        if (J(k, Z.current)) {
            let t = c.startOfLogicalLine();
            if (c.text.indexOf(`
`) === -1) A.onChange(""), a = 0;
            else {
                let {
                    line: E1
                } = c.getPosition();
                if (f === "delete") {
                    let C1 = c.text.split(`
`),
                        _1 = Math.min(u, C1.length - E1);
                    C1.splice(E1, _1);
                    let F0 = C1.join(`
`);
                    A.onChange(F0), a = k8.fromText(F0, A.columns, E1 < C1.length ? t.offset : Math.max(0, t.offset - 1)).offset
                } else if (f === "change") {
                    let C1 = c.text.split(`
`);
                    for (let _1 = 0; _1 < Math.min(u, C1.length - E1); _1++) C1[E1 + _1] = "";
                    A.onChange(C1.join(`
`)), a = t.offset
                } else a = t.offset
            }
            return {
                newOffset: a,
                switchToInsert: l
            }
        }
        let y = V(k, c, u);
        if (!y || c.equals(y)) return {
            newOffset: a,
            switchToInsert: l
        };
        if (f === "move") a = y.offset;
        else {
            let [t, E1] = c.offset <= y.offset ? [c, y] : [y, c], C1 = E1;
            if (k === "e" && c.offset <= y.offset) C1 = E1.right();
            else if ((k === "w" || k === "W") && f === "change") C1 = N(c, k, u);
            let _1 = t.modifyText(C1, "");
            if (A.onChange(_1.text), f === "change") a = t.offset;
            else a = _1.offset
        }
        return {
            newOffset: a,
            switchToInsert: l
        }
    }, K = (f) => {
        if (f !== void 0) W.setOffset(f);
        Q("INSERT"), A.onModeChange?.("INSERT"), Y?.(!0, "-- INSERT MODE --"), setTimeout(() => Y?.(!1), 1000)
    }, H = () => {
        Q("NORMAL"), A.onModeChange?.("NORMAL"), Y?.(!0, "-- NORMAL MODE --"), setTimeout(() => Y?.(!1), 1000)
    }, z = (f) => {
        D.current = f
    }, $ = (f, k) => {
        if (k === "below") {
            let u = f.endOfLogicalLine().insert(`
`);
            return A.onChange(u.text), u.offset
        } else {
            let c = f.startOfLogicalLine(),
                u = c.insert(`
`);
            return A.onChange(u.text), c.offset
        }
    }, L = (f, k) => {
        let c = f.text[f.offset] ?? "";
        return k.test(c)
    }, N = (f, k, c) => {
        let a = k === "w" ? /\w/ : /\S/;
        if (!L(f, a)) return V(k, f, c) || f;
        let l = f;
        while (L(l, a) && !l.isAtEnd()) l = l.right();
        if (c > 1)
            for (let y = 1; y < c; y++) {
                while (!L(l, a) && !l.isAtEnd()) l = l.right();
                while (L(l, a) && !l.isAtEnd()) l = l.right()
            }
        return l
    }, R = (f, k, c, u, a = 1) => {
        let l = f.text,
            y = 0;
        if (c === "forward") {
            for (let t = f.offset + 1; t < l.length; t++)
                if (l[t] === k) {
                    if (y++, y === a) {
                        let E1 = u ? Math.max(f.offset, t - 1) : t;
                        return new k8(f.measuredText, E1)
                    }
                }
        } else
            for (let t = f.offset - 1; t >= 0; t--)
                if (l[t] === k) {
                    if (y++, y === a) {
                        let E1 = u ? Math.min(f.offset, t + 1) : t;
                        return new k8(f.measuredText, E1)
                    }
                } return null
    }, O = (f) => {
        let k = D.current;
        if (!k) return;
        switch (k.type) {
            case "delete":
                if (k.motion)
                    if (k.motion.length === 2 && "fFtT".includes(k.motion[0])) {
                        let c = k.motion[0],
                            u = k.motion[1],
                            a = c === "f" || c === "t" ? "forward" : "backward",
                            l = c === "t" || c === "T",
                            y = R(f, u, a, l, k.count || 1);
                        if (y) {
                            let t = f.offset <= y.offset,
                                [E1, C1] = t ? [f, y] : [y, f],
                                _1 = C1,
                                F0 = E1;
                            if (l) _1 = C1.right();
                            else _1 = C1.right();
                            let W0 = F0.modifyText(_1, "");
                            A.onChange(W0.text), W.setOffset(W0.offset)
                        }
                    } else {
                        let {
                            newOffset: c
                        } = C("delete", k.motion, f, k.count || 1);
                        W.setOffset(c)
                    } break;
            case "change":
                if (k.motion)
                    if (k.motion.length === 2 && "fFtT".includes(k.motion[0])) {
                        let c = k.motion[0],
                            u = k.motion[1],
                            a = c === "f" || c === "t" ? "forward" : "backward",
                            l = c === "t" || c === "T",
                            y = R(f, u, a, l, k.count || 1);
                        if (y) {
                            let t = f.offset <= y.offset,
                                [E1, C1] = t ? [f, y] : [y, f],
                                _1 = C1,
                                F0 = E1;
                            if (l) _1 = C1.right();
                            else _1 = C1.right();
                            let W0 = F0.modifyText(_1, "");
                            A.onChange(W0.text), W.setOffset(F0.offset), K(F0.offset)
                        }
                    } else {
                        let {
                            newOffset: c
                        } = C("change", k.motion, f, k.count || 1);
                        W.setOffset(c), K(c)
                    } break;
            case "insert":
                if (k.insertedText) {
                    let c = f.insert(k.insertedText);
                    A.onChange(c.text), W.setOffset(c.offset)
                }
                break;
            case "x": {
                let c = k.count || 1,
                    u = f;
                for (let a = 0; a < c; a++)
                    if (!u.equals(u.del())) u = u.del();
                A.onChange(u.text), W.setOffset(u.offset);
                break
            }
            case "o": {
                let c = $(f, "below");
                K(c);
                break
            }
            case "O": {
                let c = $(f, "above");
                K(c);
                break
            }
            case "replace":
                break;
            case "r": {
                if (k.replacementChar) {
                    let c = k.count || 1,
                        u = f;
                    for (let a = 0; a < c; a++)
                        if (u = u.modifyText(u.right(), k.replacementChar), a < c - 1) u = k8.fromText(u.text, A.columns, u.offset + 1);
                    A.onChange(u.text), W.setOffset(f.offset)
                }
                break
            }
        }
    }, P = (f = !0) => {
        if (!F.current) return 1;
        let k = parseInt(F.current, 10);
        if (isNaN(k)) {
            if (f) F.current = "";
            return 1
        }
        let c = Math.min(k, VR8);
        if (f) F.current = "";
        return c
    };
    return {
        ...W,
        onInput: (f, k) => {
            let c = k8.fromText(A.value, A.columns, W.offset);
            if (k.ctrl) {
                W.onInput(f, k);
                return
            }
            if (k.escape && B === "INSERT") {
                if (G.current) z({
                    type: "insert",
                    insertedText: G.current
                }), G.current = "";
                H();
                return
            }
            if (B === "NORMAL" && I.current) {
                if (I.current === "change" && f === "c" || I.current === "delete" && f === "d") {
                    let E1 = I.current,
                        C1 = P(),
                        {
                            newOffset: _1
                        } = C(E1, f, c, C1);
                    if (W.setOffset(_1), z({
                            type: E1,
                            motion: f,
                            count: C1
                        }), I.current = null, Z.current = "", E1 === "change") K(_1);
                    return
                }
                if (Z.current && "fFtT".includes(Z.current)) {
                    let E1 = Z.current,
                        C1 = P(!1),
                        _1 = E1 === "f" || E1 === "t" ? "forward" : "backward",
                        F0 = E1 === "t" || E1 === "T",
                        W0 = R(c, f, _1, F0, C1 || 1);
                    if (W0) {
                        let g1 = I.current,
                            w1 = c.offset <= W0.offset,
                            [Q1, k1] = w1 ? [c, W0] : [W0, c],
                            H1 = k1,
                            A0 = Q1;
                        if (F0) H1 = k1.right();
                        else H1 = k1.right();
                        let V0 = A0.modifyText(H1, "");
                        A.onChange(V0.text);
                        let o1 = g1 === "change" ? A0.offset : V0.offset;
                        if (W.setOffset(o1), z({
                                type: g1,
                                motion: E1 + f,
                                count: C1 || 1
                            }), g1 === "change") K(o1)
                    }
                    I.current = null, Z.current = "", F.current = "";
                    return
                }
                if ("fFtT".includes(f)) {
                    Z.current = f;
                    return
                }
                if ("0123456789".includes(f)) {
                    F.current += f;
                    return
                }
                let l = I.current,
                    y = P(),
                    {
                        newOffset: t
                    } = C(l, f, c, y);
                if (W.setOffset(t), z({
                        type: l,
                        motion: f,
                        count: y
                    }), I.current = null, Z.current = "", l === "change") K(t);
                return
            }
            let u = (l, y, t) => {
                    let {
                        newOffset: E1
                    } = C(l, y, c, t || 1);
                    if (W.setOffset(E1), l !== "move") z({
                        type: l,
                        motion: y,
                        count: t
                    });
                    if (l === "change") K(E1);
                    Z.current = ""
                },
                a = (l) => {
                    G.current = "", K(l.offset)
                };
            if (B === "NORMAL" && Z.current) {
                let l = Z.current;
                switch (l) {
                    case "d":
                        if (f === "d") {
                            let y = P();
                            u("delete", f, y), I.current = null;
                            return
                        }
                        return;
                    case "c":
                        if (f === "c") {
                            let y = P();
                            u("change", f, y), I.current = null;
                            return
                        }
                        return;
                    case "g":
                        if (f === "g") {
                            let y = P();
                            u("move", "gg", y);
                            return
                        }
                        break;
                    case "r": {
                        let y = P(),
                            t = c;
                        for (let E1 = 0; E1 < y; E1++)
                            if (t = t.modifyText(t.right(), f), E1 < y - 1) t = k8.fromText(t.text, A.columns, t.offset + 1);
                        A.onChange(t.text), W.setOffset(c.offset), z({
                            type: "r",
                            replacementChar: f,
                            count: y
                        }), Z.current = "";
                        return
                    }
                    case "f":
                    case "F":
                    case "t":
                    case "T": {
                        let y = P(),
                            C1 = R(c, f, l === "f" || l === "t" ? "forward" : "backward", l === "t" || l === "T", y);
                        if (C1) W.setOffset(C1.offset);
                        Z.current = "";
                        return
                    }
                }
                Z.current = ""
            }
            if (B === "NORMAL") {
                if ("0123456789".includes(f)) {
                    if (f === "0" && F.current === "") {
                        let {
                            newOffset: l
                        } = C("move", "0", c);
                        W.setOffset(l);
                        return
                    }
                    F.current += f;
                    return
                }
                switch (f) {
                    case ".": {
                        O(c);
                        return
                    }
                    case "u": {
                        if (A.onUndo) A.onUndo();
                        return
                    }
                    case "i":
                        F.current = "", G.current = "", K();
                        return;
                    case "I": {
                        F.current = "", a(c.startOfLogicalLine());
                        return
                    }
                    case "a": {
                        F.current = "", a(c.right());
                        return
                    }
                    case "A": {
                        F.current = "", a(c.endOfLogicalLine());
                        return
                    }
                    case "o": {
                        F.current = "";
                        let l = $(c, "below");
                        z({
                            type: "o"
                        }), a(new k8(c.measuredText, l));
                        return
                    }
                    case "O": {
                        F.current = "";
                        let l = $(c, "above");
                        z({
                            type: "O"
                        }), a(new k8(c.measuredText, l));
                        return
                    }
                    case "h":
                    case "l":
                    case "j":
                    case "k":
                    case "^":
                    case "$":
                    case "w":
                    case "e":
                    case "b":
                    case "W":
                    case "E":
                    case "B":
                    case "G": {
                        let l = P();
                        u("move", f, l);
                        return
                    }
                    case "g": {
                        Z.current = "g";
                        return
                    }
                    case "r": {
                        Z.current = "r";
                        return
                    }
                    case "f":
                    case "F":
                    case "t":
                    case "T": {
                        Z.current = f;
                        return
                    }
                    case "x": {
                        let l = P(),
                            y = c;
                        for (let t = 0; t < l; t++)
                            if (!y.equals(y.del())) y = y.del();
                        A.onChange(y.text), W.setOffset(y.offset), z({
                            type: "x",
                            count: l
                        });
                        return
                    }
                    case "d":
                        Z.current = "d", I.current = "delete";
                        return;
                    case "D": {
                        let l = P();
                        u("delete", "$", l);
                        return
                    }
                    case "c":
                        Z.current = "c", I.current = "change";
                        return;
                    case "C": {
                        let l = P();
                        u("change", "$", l);
                        return
                    }
                    case "?": {
                        A.onChange("?");
                        return
                    }
                }
            }
            if (k.return) {
                W.onInput(f, k);
                return
            }
            if (B === "INSERT") {
                if (k.backspace || k.delete) {
                    if (G.current.length > 0) G.current = G.current.slice(0, -1)
                } else G.current += f;
                W.onInput(f, k)
            }
        },
        mode: B,
        setMode: Q
    }
}