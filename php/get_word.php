<?php
require 'config.php';

try {
    $pdo = Config::getInstance();
    $stmt = $pdo->query('SELECT kata, clue FROM master_kata ORDER BY RAND() LIMIT 1');
    $word = $stmt->fetch();

    echo json_encode($word);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}