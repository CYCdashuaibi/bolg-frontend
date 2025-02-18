import CryptoJS from 'crypto-js';

// 加密密钥
const secretKey = 'CYCSHIDASHUAIBI';

export const encryptData = (data) => {
	const content = typeof data === 'string' ? data : JSON.stringify(data);
	return CryptoJS.AES.encrypt(content, secretKey).toString();
};

export const decryptData = (cipherText) => {
	try {
		const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
		const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
		try {
			return JSON.parse(decryptedStr);
		} catch {
			return decryptedStr;
		}
	} catch (err) {
		console.error('解密失败:', err);
		return null;
	}
};
