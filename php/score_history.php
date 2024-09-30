<?php
require 'config.php';
header('Content-Type: application/json');

try {
    $pdo = Config::getInstance();
    $stmt = $pdo->prepare("SELECT nama_user, total_point FROM point_game ORDER BY date DESC LIMIT 10");
    $stmt->execute();
    $scores = $stmt->fetchAll();
    if ($scores)
        echo json_encode($scores);
    else
        echo json_encode(['message' => 'No scores found']);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
