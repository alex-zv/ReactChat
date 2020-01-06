<?php
// Выполняем запрос SQL
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once 'model.php';
    global $model;

    $result = $model->getAllTask();

    echo json_encode($result);
}


?>