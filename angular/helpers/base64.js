module.exports = [function () {
    'use strict';
    var service = {};

    /**
     * Encode a array buffer data into base64 string
     */
    service.arrayBufferToBase64 = function (buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    return service;
}];