<?php
// Выполняем запрос SQL
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once 'model.php';

    $result = $model->getChatHistory();

    echo json_encode($result);
}


?>