<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    require_once 'model.php';
    global $model;

    $year = isset($_POST['year']) ? $_POST['year'] : 2019;
    $month = isset($_POST['month']) ? $_POST['month'] : 2019;

    $result = $model->getMonthTaskHistory($year, $month);

    echo json_encode($result);

}


?>