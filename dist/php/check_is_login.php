<?php
// Выполняем запрос SQL
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    session_start();

    if ( isset( $_SESSION['login']) ) {
        require_once 'model.php';
        global $model;

        $result = $model->getAccountInfo();
        $result['isLogin'] = 1;

        echo json_encode($result);
    } else {
        $result['isLogin'] = 0;
        echo json_encode($result);
    }
}
















?>