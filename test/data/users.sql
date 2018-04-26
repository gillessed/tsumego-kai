TRUNCATE users CASCADE;

INSERT INTO users (password, login, first_name, last_name, email, rank)
    VALUES ('palantir', 'admin', 'Admin', 'User', 'admin@tsumegokai.com', 0);
INSERT INTO roles (role, "user") VALUES (2, (SELECT id FROM users WHERE login = 'admin'));

INSERT INTO users (password, login, first_name, last_name, email, rank)
VALUES ('123', 'user1', 'User', 'One', 'user1@tsumegokai.com', 0);

INSERT INTO users (password, login, first_name, last_name, email, rank)
VALUES ('123', 'user2', 'User', 'Two', 'user2@tsumegokai.com', 0);

INSERT INTO users (password, login, first_name, last_name, email, rank)
VALUES ('123', 'user3', 'User', 'Three', 'user3@tsumegokai.com', 0);