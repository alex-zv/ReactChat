<?php
require_once('config.php');
require_once('auth.php');
session_start();

class MainModel {
    public function index () {
        $this->getChatHistory();
    }

    private function dbDelete($sql) {
        global $mysqli;

        return $mysqli->query($sql);
    }

    private function dbInsert($sql) {
        global $mysqli;

        return $mysqli->query($sql);
    }

    public function dbSelect($sql) {
        global $mysqli;

        $data = false;
        if (!$result = $mysqli->query($sql)) {
            //echo "Извините, возникла проблема в работе сайта.";
            //echo "Ошибка: Наш запрос не удался и вот почему: \n";
            //echo "Запрос: " . $sql . "\n";
            //echo "Номер ошибки: " . $mysqli->errno . "\n";
            //echo "Ошибка: " . $mysqli->error . "\n";
            //exit;
            return $data;
        }
        if ($result->num_rows === 0) {
            //echo "Мы не смогли найти совпадение для, простите. Пожалуйста, попробуйте еще раз.";
            //return false;
            return $data;

        }

        if ($result->num_rows === 1) {
            $data[] = $result->fetch_assoc();
        } else {
            $data = $result->fetch_all(MYSQLI_ASSOC);
        }

        $result->free();
        return $data;
    }


    public function getChatHistory() {

//       return $this->auth->isLogin();



        if ($this->auth->isAuthorized()) {
            $chat_id = isset($_POST['chat_id']) ? (int)$_POST['chat_id'] : false;
            if (!$chat_id) {
                return 'no-data';
            }
            $sql = "SELECT th.*, u.name, u.id FROM chat_history as th
                LEFT JOIN users as u ON (th.user_id = u.id)
                where th.chat_id = $chat_id ORDER BY th.date_send ASC";

            $result = $this->dbSelect($sql);

            if ($result) {
                return $result;
            }
        }


    }

    public function sendMessage ($message) {



        if ($this->auth->isAuthorized()) {

            $user_id = $_SESSION['login']['user_id'];

            $sql = "INSERT INTO chat_history SET 
                        user_id = '" . $user_id . "', 
                        chat_id = '" . 1 . "',
                        message = '" . $message . "',
                        date_send = NOW()";

            //return $this->dbInsert($sql);
            if ($this->dbInsert($sql)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }


    }


}

global $model;

$model = new MainModel();

$model->auth = $auth;

?>