package com.tsumegokai.utils;

import java.security.SecureRandom;

public class RandomString {
    private static final String CHARS =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private static final SecureRandom rnd = new SecureRandom();

    public static String create(int length) {
        StringBuilder s = new StringBuilder(length);
        for(int i = 0; i < length; i++) {
            s.append(CHARS.charAt(rnd.nextInt(CHARS.length())));
        }
        return s.toString();
    }
}
