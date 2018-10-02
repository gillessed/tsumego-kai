package com.tsumegokai.application.startup;

import com.tsumegokai.application.TsumegoKaiConfiguration;
import org.glassfish.hk2.api.ServiceLocator;

public interface StartupTask {
    void run(TsumegoKaiConfiguration configuration, ServiceLocator serviceLocator);
    String getName();
}
