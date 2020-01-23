<?php

require_once 'model.php';

class Auth {
    public function isAuthorized () {

        return ( isset($_SESSION['login']) && isset($_SESSION['login']['user_id']) ) ? true : false;
    }
    
    public function login($post) {
        $data = array();


        if (isset($post['login']) && isset($post['password'])) {

            $login = quotemeta(strip_tags($post['login']));
            $pass = quotemeta(strip_tags($post['password']));

            if (empty($login) || empty($pass)) {
                $data['error'] = 'Логин или пароль не может быть пустым';
                return $data;
            }

            if ((iconv_strlen($login) < 3 || iconv_strlen($login) > 40) || (iconv_strlen($pass) < 3 || iconv_strlen($pass) > 40)) {
                $data = array(
                    'error' => 'Логин или пароль введены неверно'
                );
                return $data;
            }




            //sql

            $sql = "SELECT * FROM users WHERE `name` = '" . $login . "' AND `password` =  '" . $pass . "' ";

            $result = $this->model->dbSelect($sql)[0];

            if ($result) {
                $data['success'] = 1;
               // $data['success2'] = $result;
                $data['user'] = array(
                    'name' => $result['name']
                );

                session_start();
                $_SESSION['login'] = array();
                $_SESSION['login']['user_id'] = $result['id'];
            }



            return $data;
        }

        return false;
    }

    private function validate () {

    }

    public function register($post) {
        if (isset($post['login']) && isset($post['password']) && isset($post['repeat_password'])) {

            $login = quotemeta(strip_tags($post['login']));
            $pass = quotemeta(strip_tags($post['password']));
            $repeat_pass = quotemeta(strip_tags($post['repeat_password']));

            if (empty($login) || empty($pass) || empty($repeat_pass)) {
                $data['error'] = 'Все поля должны быть заполнены';
                return $data;
            }

            if ((iconv_strlen($login) < 3 || iconv_strlen($login) > 40) || (iconv_strlen($pass) < 3 || iconv_strlen($pass) > 40)) {
                $data = array(
                    'error' => 'Логин или пароль введены неверно'
                );
                return $data;
            }

            if ($pass !== $repeat_pass) {
                $data['error'] = 'Пароли должны совпадать';
                return $data;
            }


            // check if this login free

            $sql = "SELECT * FROM users WHERE `login` = '" . $login . "' ";

            $result = $this->model->dbSelect($sql);

            if ($result) {
                $data['error'] = 'This login is already taken';
                return $data;
            }

            // add new user
            $data = array(
                'name' => $login,
                'password' => $pass
            );

            $user = $this->addUser($data);

            $data['success'] = 1;
            $data['success2'] = $result;
            $data['user'] = array(
                'name' => 'Alex'
            );
            session_start();
            $_SESSION['login'] = array();
            $_SESSION['login']['user_id'] = 1;

            return $data;
        }

        return array('error' => 'error');
    }

    private function addUser($data) {
        $sql = "INSERT INTO users SET 
                        `name` = '" . $data['name'] . "', 
                        password = '" . $data['password'] . "',
                        date_created = NOW()";
        
        $this->model->dbInsert($sql);
    }

}

global $auth;

$auth = new Auth();
$auth->model = $model;
?>