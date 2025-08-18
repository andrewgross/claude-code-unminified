/* chunk:568 bytes:[13264765, 13266716) size:1951 source:unpacked-cli.js */
function KRB(A, B) {
    let Q = A.replace($X.findPipe, (G, F, I) => {
            let Y = !1,
                W = F;
            while (--W >= 0 && I[W] === "\\") Y = !Y;
            if (Y) return "|";
            else return " |"
        }),
        Z = Q.split($X.splitPipe),
        D = 0;
    if (!Z[0].trim()) Z.shift();
    if (Z.length > 0 && !Z.at(-1)?.trim()) Z.pop();
    if (B)
        if (Z.length > B) Z.splice(B);
        else
            while (Z.length < B) Z.push("");
    for (; D < Z.length; D++) Z[D] = Z[D].trim().replace($X.slashPipe, "|");
    return Z
}

function UG1(A, B, Q) {
    let Z = A.length;
    if (Z === 0) return "";
    let D = 0;
    while (D < Z)
        if (A.charAt(Z - D - 1) === B) D++;
        else break;
    return A.slice(0, Z - D)
}

function e88(A, B) {
    if (A.indexOf(B[1]) === -1) return -1;
    let Q = 0;
    for (let Z = 0; Z < A.length; Z++)
        if (A[Z] === "\\") Z++;
        else if (A[Z] === B[0]) Q++;
    else if (A[Z] === B[1]) {
        if (Q--, Q < 0) return Z
    }
    return -1
}

function HRB(A, B, Q, Z, D) {
    let G = B.href,
        F = B.title || null,
        I = A[1].replace(D.other.outputLinkReplace, "$1");
    if (A[0].charAt(0) !== "!") {
        Z.state.inLink = !0;
        let Y = {
            type: "link",
            raw: Q,
            href: G,
            title: F,
            text: I,
            tokens: Z.inlineTokens(I)
        };
        return Z.state.inLink = !1, Y
    }
    return {
        type: "image",
        raw: Q,
        href: G,
        title: F,
        text: I
    }
}

function A58(A, B, Q) {
    let Z = A.match(Q.other.indentCodeCompensation);
    if (Z === null) return B;
    let D = Z[1];
    return B.split(`
`).map((G) => {
        let F = G.match(Q.other.beginningSpace);
        if (F === null) return G;
        let [I] = F;
        if (I.length >= D.length) return G.slice(D.length);
        return G
    }).join(`
`)
}