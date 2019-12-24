<?php
header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
?>

<?php

require_once('config.php');
global $db_connect;

$query = mysqli_query($db_connect, "SELECT min FROM info WHERE year = $year AND month = $month");
$json = [];

echo $query;

/*
$month = date('n');
$year = date('Y');

if (isset($_POST['year'])) {
    $year = $_POST['year'];
}

if (isset($_POST['month'])) {
    $month = $_POST['month'];
}

$user_id = 1;
$query = mysqli_query($db_connect, "SELECT min FROM info WHERE year = $year AND month = $month");
$json = [];

if ( mysqli_num_rows($query) > 0) {
    $data = mysqli_fetch_all($query, MYSQLI_ASSOC);

    $total_min = 0;

    foreach ($data as $value) {
        $total_min += (int)$value['min'];
    }

    $json['status'] = true;

    $json['data'] = [];


    $json['data']['days'] = mysqli_num_rows($query);
    $json['data']['min'] = $total_min;

} else {

    $json['status'] = false;
    $json['data'] = 'За данный период нет данных.';
};*/

echo json_encode($json);
die();
?>