package com.brandpulse.fv.util;

import org.springframework.util.DigestUtils;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;

public class SecurityUtil {

    private SecurityUtil() {

    }

    private static final Random rand = new Random();

    public static String generateOtp() {
        int n = rand.nextInt(99999) + 100000;
        return n + "";
    }

    public static String hash(String password) {
        return DigestUtils.md5DigestAsHex(salt(password).getBytes());
    }

    public static String hash2(String password) {
        return DigestUtils.md5DigestAsHex(salt2(password).getBytes());
    }

    public static String salt(String password) {
        return "salt_" + password + "_v5_hard";
    }

    public static String salt2(String password) {
        return "salt2_" + password + "_v5_hard_level2";
    }

    public static String sha256(String text) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        return toHexString(md.digest(text.getBytes(StandardCharsets.UTF_8)));
    }

    public static String toHexString(byte[] hash) {
        // Convert byte array into signum representation 
        BigInteger number = new BigInteger(1, hash);

        // Convert message digest into hex value 
        StringBuilder hexString = new StringBuilder(number.toString(16));

        // Pad with leading zeros
        while (hexString.length() < 32) {
            hexString.insert(0, '0');
        }

        return hexString.toString();
    }

    public static String generateOpaque(String userId) {
        SecureRandom random = new SecureRandom();
        long token1 = Math.abs(random.nextLong());
        long token2 = Math.abs(random.nextLong());
        String randomString = Long.toString(token1, 30) + Long.toString(token2, 30) + userId;
        randomString = randomString.replace("/", "").replace("\\", "");
        return randomString;
    }

}
