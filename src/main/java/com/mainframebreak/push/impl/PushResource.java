package com.mainframebreak.push.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.guava.GuavaModule;
import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.Multimap;
import com.mainframebreak.push.PushService;
import com.mainframebreak.push.PushUpdate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.websocket.CloseReason;
import javax.websocket.Session;
import java.util.HashMap;
import java.util.Map;

public class PushResource implements PushService {
    private static final Logger log = LoggerFactory.getLogger(PushResource.class);

    private static Thread foo;

    private final Multimap<String, PushSession> sessions;
    private final Map<String, PushSession> sessionIndex;
    private final ObjectMapper objectMapper;

    public PushResource() {
        sessions = ArrayListMultimap.create();
        sessionIndex = new HashMap<>();
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new GuavaModule());
    }

    @Override
    public void onOpen(Session session) {
        log.info("Websocket connection opened with session id {}", session.getId());
    }

    @Override
    public void onClose(Session session, CloseReason closeReason) {
        synchronized (sessions) {
            String gameId = sessionIndex.get(session.getId()).getGameId();
            sessions.remove(gameId, session.getId());
            sessionIndex.remove(session.getId());
        }
    }

    @Override
    public void onError(Session session, Throwable reason) {
        synchronized (sessions) {
            String gameId = sessionIndex.get(session.getId()).getGameId();
            PushSession pushSession = sessionIndex.get(session.getId());
            sessions.remove(gameId, pushSession);
            sessionIndex.remove(session.getId());
        }
    }

    @Override
    public void onMessage(Session session, String message) {
        log.info("Received connection to game " + message);
        synchronized (sessions) {
            if (!sessionIndex.containsKey(message)) {
                PushSession pushSession = new PushSession(
                        session,
                        System.currentTimeMillis(),
                        message
                );
                sessions.put(message, pushSession);
                sessionIndex.put(session.getId(), pushSession);
            }
        }
    }

    @Override
    public void sendToGame(String gameId, PushUpdate message) {
        try {
            String serializedObject = objectMapper.writeValueAsString(message);
            synchronized (sessions) {
                for (PushSession pushSession : sessions.get(gameId)) {
                    pushSession.getSession().getAsyncRemote().sendText(serializedObject);
                }
            }
        } catch (Exception e) {
            log.warn("Error sending push update.", e);
        }
    }
}
