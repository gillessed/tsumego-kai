package com.mainframebreak.api;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mainframebreak.push.PushUpdate;
import org.immutables.value.Value;


@Value.Immutable
@JsonSerialize(as = ImmutableRecord.class)
@JsonDeserialize(as = ImmutableRecord.class)
public interface Record extends PushUpdate {
    String getId();
    String getDateSubmitted();
    int getVersion();

    class Builder extends ImmutableRecord.Builder {}
}
