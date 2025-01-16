import CryptoJS from 'crypto-js';

export const encrypt = (message) => {
    var key = import.meta.env.VITE_APP_ENVRYPTION_KEY;
    var iv = CryptoJS.enc.Utf8.parse(
        import.meta.env.VITE_APP_ENVRYPTION_IV_KEY,
    );

    key = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.AES.encrypt(message, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
    });
    encrypted = encrypted.toString();
    return encrypted;
};

export const decrypt = (encryptedMessage) => {
    var key = import.meta.env.VITE_APP_ENVRYPTION_KEY;
    var iv = CryptoJS.enc.Utf8.parse(
        import.meta.env.VITE_APP_ENVRYPTION_IV_KEY,
    );

    key = CryptoJS.enc.Utf8.parse(key);
    var decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
    });
    decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    return decrypted;
};
