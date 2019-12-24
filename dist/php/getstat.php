<?php
// Выполняем запрос SQL

require_once('config.php');
$month = date('n');
$year = date('Y');

if (isset($_POST['year'])) {
    $year = $_POST['year'];
}

if (isset($_POST['month'])) {
    $month = $_POST['month'];
}

$sql = "SELECT * FROM info";

if (!$result = $mysqli->query($sql)) {
    // О нет! запрос не удался.
    echo "Извините, возникла проблема в работе сайта.";
    // И снова: не делайте этого на реальном сайте, но в этом примере мы покажем,
    // как получить информацию об ошибке:
    echo "Ошибка: Наш запрос не удался и вот почему: \n";
    echo "Запрос: " . $sql . "\n";
    echo "Номер ошибки: " . $mysqli->errno . "\n";
    echo "Ошибка: " . $mysqli->error . "\n";
    exit;
}
// Уфф, мы это сделали. У нас есть соединение с базой данных и успешный запрос.
// Но где же его результат?
if ($result->num_rows === 0) {
    // Упс! в запросе нет ни одной строки! Иногда это ожидаемо и нормально, иногда нет.
    echo "Мы не смогли найти совпадение для $aid, простите. Пожалуйста, попробуйте еще раз.";
    exit;
}

$data = $result->fetch_all (MYSQLI_ASSOC);



echo json_encode($data);

$result->free();
$mysqli->close();
?>