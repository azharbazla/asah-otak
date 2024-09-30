<?php
require 'config.php';

try {
    $pdo = Config::getInstance();
    $nama_user = $_POST['username'];
    $total_point = $_POST['totalScore'];
    $date = date('Y-m-d H:i:s');
    $stmt = $pdo->prepare('INSERT INTO point_game (nama_user, total_point, date) VALUES (?, ?, ?)');
    $stmt->execute([$nama_user, $total_point, $date]);

    header('Location: http://testangkasapura.test/TestAngkasaPura/');
    exit();
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}