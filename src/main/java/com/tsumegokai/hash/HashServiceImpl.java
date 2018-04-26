package com.tsumegokai.hash;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HashServiceImpl implements HashService {
    private final MessageDigest digest;

    public HashServiceImpl() {
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }

    @Override
    public String hash(String message) {
        digest.reset();
        byte[] result = digest.digest(message.getBytes());
        return bytesToHex(result);
    }

    private static String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder();
        for (byte aHash : hash) {
            String hex = Integer.toHexString(0xff & aHash);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
