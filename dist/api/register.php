<?php
// Выполняем запрос SQL
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('config.php');
    require_once('auth.php');


    $result = $auth->login($_POST);

    echo json_encode($result);
}



?>