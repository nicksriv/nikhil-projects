package com.wavelabs.sb.utils;

import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.annotation.PostConstruct;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.services.LoggerService;

import java.security.MessageDigest;

import java.util.Arrays;


@Service
public class AesEncryptionUtil {
    
    private SecretKeySpec secretKey;
    private static final String aesKey = "70c349b29b184dc3b5f6";

    @Autowired
    LoggerService loggerService;

    @PostConstruct
    public void setKey() {
        MessageDigest sha = null;
        try {
            byte[] key = aesKey.getBytes(StandardCharsets.UTF_8);
            sha = MessageDigest.getInstance("SHA-256");
            key = sha.digest(key);
            key = Arrays.copyOf(key, 16);
            secretKey = new SecretKeySpec(key, "AES");
        } catch (NoSuchAlgorithmException e) {
            loggerService.info("NoSuchAlgorithmException for Encryption");
        }
    }

    public String encrypt(String strToEncrypt) {
        if (strToEncrypt == null || strToEncrypt.isEmpty()) {
            return "";
        }
        try {
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            return Base64.getEncoder().encodeToString(cipher.doFinal(strToEncrypt.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            loggerService.info("Failed to encrypt data [" + strToEncrypt + "]");
            return "";
        }
    }


    
    public String decrypt(String strToDecrypt) {
        if (strToDecrypt == null || strToDecrypt.isEmpty()) {
            return "";
        }
        try {
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            return new String(cipher.doFinal(Base64.getDecoder().decode(strToDecrypt)));
        } catch (Exception e) {
            loggerService.info("Failed to decrypt data [" + strToDecrypt + "]");
            return "";
        }
    }
}
