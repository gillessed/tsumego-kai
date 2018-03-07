package com.mainframebreak.push;

import javax.websocket.CloseReason;
import javax.websocket.Session;

public interface PushService {
    void onOpen(Session session);
    void onClose(Session session, CloseReason closeReason);
    void onError(Session session, Throwable reason);
    void onMessage(Session session, String message);
    void sendToGame(String gameId, PushUpdate message);
}
