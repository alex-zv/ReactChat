<?php
// Выполняем запрос SQL
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('config.php');

    if (isset($_POST['login']) && isset($_POST['password'])) {
        $login = quotemeta(strip_tags($_POST['login']));
        $pass = quotemeta(strip_tags($_POST['password']));

        if (empty($login) || empty($pass)) {
            $data = array(
                'error' => 'Логин или пароль не может быть пустым'
            );
            echo json_encode($data);

            exit;
        }

        if ((iconv_strlen($login) < 3 || iconv_strlen($login) > 40) || (iconv_strlen($pass) < 3 || iconv_strlen($pass) > 40)) {
            $data = array(
                'error' => 'Логин или пароль введены неверно'
            );
            echo json_encode($data);

            exit;
        }

        $sql = "SELECT * FROM users WHERE `login` = '" . $login . "' AND `password` =  '" . $pass . "' ";

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
        if ($result->num_rows > 0) {
            session_start();
            $user_id = $result->fetch_assoc()['id'];
            $_SESSION['login'] = array();
            $_SESSION['login']['user_id'] = $user_id;
            //setcookie("login", $value, time()+3600, "/", "", 0);

            $data = array(
                'success' => '1'
            );
        } else {
            $data = array(
                'error' => 'Логин или пароль введены неверно'
            );
        }


        echo json_encode($data);
        $result->free();
        $mysqli->close();
    }


}



?>