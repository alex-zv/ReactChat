<?php



class Auth {
    public function isLogin () {
        return true;
    }
    
    public function login($post) {
        $data = array();

        if (isset($post['login']) && isset($post['password'])) {
            echo '<pre>';
            print_r('123123');
            exit();
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
        }
    }
}

global $auth;

$auth = new Auth();
?>