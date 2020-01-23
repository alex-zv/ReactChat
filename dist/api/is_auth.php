<?php
// Выполняем запрос SQL
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('config.php');
    require_once('auth.php');

    echo json_encode($auth->isAuthorized());
}



?>