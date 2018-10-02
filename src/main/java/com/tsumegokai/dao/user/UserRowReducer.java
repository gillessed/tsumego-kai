package com.tsumegokai.dao.user;

import com.tsumegokai.api.User;
import org.jdbi.v3.core.result.LinkedHashMapRowReducer;
import org.jdbi.v3.core.result.RowView;

import java.util.Map;

public class UserRowReducer implements LinkedHashMapRowReducer<Integer, User> {
    @Override
    public void accumulate(Map<Integer, User> map, RowView rowView) {
        User u = map.computeIfAbsent(
                rowView.getColumn("id", Integer.class),
                (id) -> rowView.getRow(User.class));

        Integer role = rowView.getColumn("role", Integer.class);
        if (role != null) {
            map.put(u.getId(), new User.Builder().from(u).addRoles(role).build());
        }
    }
}