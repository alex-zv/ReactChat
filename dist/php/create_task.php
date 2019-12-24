<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
// Выполняем запрос SQL
    require_once 'model.php';
    global $model;

    $result = $model->addTask();

    echo json_encode($result);
}
?>