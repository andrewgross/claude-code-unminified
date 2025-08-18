/* chunk:484 bytes:[11585580, 11587090) size:1510 source:unpacked-cli.js */
var KO0 = E((wy3, NhB) => {
    var Xb = j4();
    t$();
    Ib();
    IO0();
    ud();
    wh1();
    VO0();
    Oh1();
    XI1();
    b8();
    Sh1();
    var CO0 = Xb.asn1,
        GA1 = NhB.exports = Xb.pki = Xb.pki || {};
    GA1.pemToDer = function(A) {
        var B = Xb.pem.decode(A)[0];
        if (B.procType && B.procType.type === "ENCRYPTED") throw new Error("Could not convert PEM to DER; PEM is encrypted.");
        return Xb.util.createBuffer(B.body)
    };
    GA1.privateKeyFromPem = function(A) {
        var B = Xb.pem.decode(A)[0];
        if (B.type !== "PRIVATE KEY" && B.type !== "RSA PRIVATE KEY") {
            var Q = new Error('Could not convert private key from PEM; PEM header type is not "PRIVATE KEY" or "RSA PRIVATE KEY".');
            throw Q.headerType = B.type, Q
        }
        if (B.procType && B.procType.type === "ENCRYPTED") throw new Error("Could not convert private key from PEM; PEM is encrypted.");
        var Z = CO0.fromDer(B.body);
        return GA1.privateKeyFromAsn1(Z)
    };
    GA1.privateKeyToPem = function(A, B) {
        var Q = {
            type: "RSA PRIVATE KEY",
            body: CO0.toDer(GA1.privateKeyToAsn1(A)).getBytes()
        };
        return Xb.pem.encode(Q, {
            maxline: B
        })
    };
    GA1.privateKeyInfoToPem = function(A, B) {
        var Q = {
            type: "PRIVATE KEY",
            body: CO0.toDer(A).getBytes()
        };
        return Xb.pem.encode(Q, {
            maxline: B
        })
    }
});