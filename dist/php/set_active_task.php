<?php
// Выполняем запрос SQL
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('config.php');
    session_start();

    require_once 'model.php';
    global $model;

    $result = $model->setActiveTask();

    echo json_encode($result);

    exit;
}
?>