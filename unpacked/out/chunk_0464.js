/* chunk:464 bytes:[10994734, 10995753) size:1019 source:unpacked-cli.js */
var kf1 = E((wO3, axB) => {
    axB.exports = jf1;
    var oK8 = YW(),
        nxB = RM0(),
        tK8 = wf1();

    function jf1(A, B, Q, Z) {
        nxB.call(this), this.nodeType = oK8.DOCUMENT_TYPE_NODE, this.ownerDocument = A || null, this.name = B, this.publicId = Q || "", this.systemId = Z || ""
    }
    jf1.prototype = Object.create(nxB.prototype, {
        nodeName: {
            get: function() {
                return this.name
            }
        },
        nodeValue: {
            get: function() {
                return null
            },
            set: function() {}
        },
        clone: {
            value: function A() {
                return new jf1(this.ownerDocument, this.name, this.publicId, this.systemId)
            }
        },
        isEqual: {
            value: function A(B) {
                return this.name === B.name && this.publicId === B.publicId && this.systemId === B.systemId
            }
        }
    });
    Object.defineProperties(jf1.prototype, tK8)
});