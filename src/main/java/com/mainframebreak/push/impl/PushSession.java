package com.mainframebreak.push.impl;

import javax.websocket.Session;

public class PushSession {
    private final Session session;
    private final long timestamp;
    private final String gameId;

    public PushSession(Session session, long timestamp, String gameId) {
        this.session = session;
        this.timestamp = timestamp;
        this.gameId = gameId;
    }

    public Session getSession() {
        return session;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public String getSessionId() {
        return session.getId();
    }

    public String getGameId() {
        return gameId;
    }

    @Override
    public String toString() {
        return "PushSession{" +
                "session=" + session.getId() +
                ", timestamp=" + timestamp +
                ", gameId='" + gameId + '\'' +
                '}';
    }
}
