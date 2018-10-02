package com.tsumegokai.application.startup;

import com.tsumegokai.api.User;
import com.tsumegokai.application.TsumegoKaiConfiguration;
import com.tsumegokai.application.UserSeedConfiguration;
import com.tsumegokai.dao.user.UserDao;
import com.tsumegokai.hash.HashService;
import org.glassfish.hk2.api.ServiceLocator;
import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;

import java.util.List;

public class UserSeedTask implements StartupTask {
    @Override
    public void run(TsumegoKaiConfiguration configuration, ServiceLocator serviceLocator) {
        Jdbi jdbi = serviceLocator.getService(Jdbi.class);
        HashService hashService = serviceLocator.getService(HashService.class);
        List<UserSeedConfiguration> seeds = configuration.getUserSeeds();
        try (Handle handle = jdbi.open()) {
            UserDao userDao = handle.attach(UserDao.class);
            for (UserSeedConfiguration seed : seeds) {
                User user = userDao.getUser(seed.getUsername());
                if (user == null) {
                    userDao.createUser(
                            seed.getUsername(),
                            hashService.hash(seed.getPassword()),
                            seed.getFirstName(),
                            seed.getLastName(),
                            seed.getEmail()
                    );
                }
            }
        }
    }

    @Override
    public String getName() {
        return "Seed Default Users";
    }
}
