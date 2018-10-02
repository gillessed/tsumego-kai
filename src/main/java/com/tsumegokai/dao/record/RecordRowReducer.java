package com.tsumegokai.dao.record;

import com.tsumegokai.api.Record;
import org.jdbi.v3.core.result.LinkedHashMapRowReducer;
import org.jdbi.v3.core.result.RowView;

import java.util.Map;

public class RecordRowReducer implements LinkedHashMapRowReducer<Integer, Record> {
    @Override
    public void accumulate(Map<Integer, Record> map, RowView rowView) {
        Record r = map.computeIfAbsent(
                rowView.getColumn("id", Integer.class),
                (id) -> rowView.getRow(Record.class));

        Integer tag = rowView.getColumn("tag", Integer.class);
        if (tag != null) {
            map.put(r.getId(), new Record.Builder().from(r).addTags(tag).build());
        }
    }
}