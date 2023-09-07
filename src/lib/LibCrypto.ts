import CryptoJS  from 'crypto-js';
import AES from 'crypto-js/aes';
const secretKey = import.meta.env.PUBLIC_CRYPTO_KEY;

//
const  LibCrypto = {
    /**
     *
     * @param
     *
     * @return
     */     
    encode: function (value: string): string
    {
        let ret = "";
        // 暗号化
        const encryptedMessage = AES.encrypt(value, secretKey).toString();
//console.log("暗号化されたメッセージ:", encryptedMessage);
        ret = encryptedMessage;
        return ret;
    },
    /**
     *
     * @param
     *
     * @return
     */
    decode: function (value: string): string
    {
        let ret = "";
        // 復号化
        const decryptedBytes = AES.decrypt(value, secretKey);
        const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
//console.log("復号化されたメッセージ:", decryptedMessage); 
        ret = decryptedMessage;       
        return ret;
    },        
}
export default LibCrypto;
