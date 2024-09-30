CREATE DATABASE IF NOT EXISTS asah_otak;
USE asah_otak;

CREATE TABLE IF NOT EXISTS master_kata
(
    id   INT(11) AUTO_INCREMENT PRIMARY KEY,
    kata VARCHAR(255),
    clue VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS point_game
(
    id_point    INT(11) AUTO_INCREMENT PRIMARY KEY,
    nama_user   VARCHAR(255),
    total_point INT(20),
    date        DATETIME
);
