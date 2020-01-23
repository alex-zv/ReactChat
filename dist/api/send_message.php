<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once 'model.php';

    $result = $model->sendMessage($_POST['message']);
    echo $result;
}
?>