package com.tsumegokai.utils;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

public class SqlUtils {
    public static boolean resultSetHas(ResultSet r, String column) {
        try {
            ResultSetMetaData meta = r.getMetaData();
            int length = meta.getColumnCount();
            for (int i = 1; i <= length; i++) {
                String columnName = meta.getColumnName(i);
                if (columnName.equals(column)) {
                    return true;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // NO-OP
        }
        return false;
    }
}
