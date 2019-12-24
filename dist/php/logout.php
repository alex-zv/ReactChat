<?php
// Выполняем запрос SQL
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    session_start();
    unset($_SESSION['login']);
}
?>