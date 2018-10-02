package com.tsumegokai.dao.collection;

import com.tsumegokai.api.Collection;
import org.jdbi.v3.core.result.LinkedHashMapRowReducer;
import org.jdbi.v3.core.result.RowView;
import java.util.Map;

public class CollectionRowReducer implements LinkedHashMapRowReducer<Integer, Collection> {
    @Override
    public void accumulate(Map<Integer, Collection> map, RowView rowView) {
        Collection f = map.computeIfAbsent(
                rowView.getColumn("c_id", Integer.class),
                (id) -> rowView.getRow(Collection.class));

        Integer recordId = rowView.getColumn("r_id", Integer.class);
        if (recordId != null) {
            map.put(f.getId(), new Collection.Builder().from(f).addRecords(recordId).build());
        }

        Integer tagId = rowView.getColumn("t_id", Integer.class);
        if (tagId != null) {
            map.put(f.getId(), new Collection.Builder().from(f).addTags(tagId).build());
        }

    }
}