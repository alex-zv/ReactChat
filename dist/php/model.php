<?php
require_once('config.php');
session_start();

class MainModel {
    public function index () {

    }

    private function dbDelete($sql) {
        global $mysqli;

        return $mysqli->query($sql);
    }

    private function dbInsert($sql) {
        global $mysqli;

        return $mysqli->query($sql);
    }

    private function dbSelect($sql) {
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

    public function setActiveTask() {
        global $mysqli;
        if (isset($_POST['task_id'])) {
            if ( isset($_SESSION['login']) ) {
                $task_id = (int)$_POST['task_id'];
                $user_id = $_SESSION['login']['user_id'];
                $sql = "SELECT * FROM active_task_user where `user_id` = $user_id";

                $result = $this->dbSelect($sql);

                if ($result) { // active = true;

                    $data = $result[0];
                    $sql = "DELETE FROM active_task_user WHERE active_task_id = ".$data['active_task_id']." ";
                    // $result = $mysqli->query($sql);

                    $this->dbDelete($sql);

                    $this->addTaskHistory($data);

                    if ($data['task_id'] != $task_id) {

                        $sql = "INSERT INTO active_task_user (user_id, task_id, task_start)
                    VALUES ($user_id,$task_id, NOW());";
                        //$mysqli->query($sql);
                        $this->dbInsert($sql);
                    }
                } else {
                    $sql = "INSERT INTO active_task_user (user_id, task_id, task_start)
                    VALUES ($user_id,$task_id, NOW());";

                    $this->dbInsert($sql);

                    //$mysqli->query($sql);
                }

            } else {
                echo 'пожалуйста авторизуйтесь';
                exit;
            }
        } else {
            exit();
        }

        return $this->getAllTask();
    }

    public function addTask() {


        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $title = quotemeta (strip_tags ( $_POST['title']) );
            $description = quotemeta (strip_tags ($_POST['description']));
            $PMName = quotemeta (strip_tags ($_POST['PMName']));


            if ( isset($_SESSION['login']) ) {
                $user_id = (int)$_SESSION['login']['user_id'];

                $sql = "INSERT INTO task SET 
                        user_id = '" . $user_id . "', 
                        title = '" . $title . "',
                        description = '" . $description . "',
                        author = '". $user_id ."',
                        pm_name = '".$PMName."',
                        date_create = NOW(),
                        date_update = NOW(),
                        active = 0,
                        status = 1";


                //$mysqli->query($sql);
                $data = array();

                if ($this->dbInsert($sql)) {
                    $data['success'] = 1;
                }  else {
                    $data['error'] = $this->dbInsert($sql);
                }
            } else {
                $data['error'] = 'Нужно зарегистрироваться';
            }
        } else {
            return false;
        }

        return $data;
    }

    public function getAllTask() {

        $data = false;
        //$sql = "SELECT t.*, ast.active_task_id, ast.task_id as task_id_d FROM task t LEFT JOIN active_task_user ast ON (t.task_id = ast.task_id)";

        $user_id = $user_id = $_SESSION['login']['user_id'];

        $sql = "SELECT t.*, ast.active_task_id, ast.task_start, ast.task_id as task_id_d FROM task t 
                LEFT JOIN active_task_user ast ON (t.task_id = ast.task_id)
                where t.user_id = $user_id";

        $result = $this->dbSelect($sql);

        if ($result) {

            $tasks = $result;
            $data = [];
            foreach ($tasks as $task) {
                $active = 0;

                if (!empty($task['task_id_d'])) {
                    $active = 1;
                }

                $task_history = $this->getTaskHistory($user_id, $task['task_id']);

                $data[] = array(
                    'id' => $task['task_id'],
                    'title' => $task['title'],
                    'description' => nl2br($task['description']),
                    'active' => $active,
                    'author' => $task['author'],
                    'pm_name' => $task['pm_name'],
                    'task_start' => $task['task_start'],
                    'task_history' => $task_history,
                );
            }
        }


        return $data;
    }

    public function getAccountInfo () {


        $data = false;

        if ( isset($_SESSION['login']) ) {
            $user_id = $_SESSION['login']['user_id'];

            $sql = "SELECT * FROM users where `id` = $user_id";

            $result = $this->dbSelect($sql);

            if ($result) {
                $data = $result[0];
                $data['task_history'] = $this->getDayTaskHistory();
            }
        }
        return $data;
    }

    private function getDayTaskHistory () {
        $data = false;

        if ( isset($_SESSION['login']) ) {
            $user_id = $_SESSION['login']['user_id'];

            if (!$user_id) {
                return false;
            }

            global $mysqli;

            $dates = array(
                'start_date' => date('Y-m-d').' 00:00:00',
                'end_date' => date('Y-m-d') . ' 23:59:59'
            );
            /* $sql = "SELECT * FROM task_history th
                 where th.task_end >= '".$dates['start_date']."'
                 AND th.task_end <= '".$dates['end_date']."'
                 AND th.user_id = $user_id";*/

            $sql = "SELECT th.*, t.*, th.task_id as task_main_id FROM task_history th 
                    LEFT JOIN task t ON (t.task_id = th.task_id)
                    where th.task_end BETWEEN '".$dates['start_date']."' and '".$dates['end_date']."'
                    AND th.user_id = $user_id";

            /*$sql = "SELECT th.*, t.*, th.task_id as task_main_id FROM task_history th
            LEFT JOIN task t ON (t.task_id = th.task_id)
            where th.task_end >= '".$dates['start_date']."'
            AND th.task_end <= '".$dates['end_date']."'
            AND th.user_id = $user_id";*/



            /*$sql .= " AND `task_end` <= ".$dates['start_date']."";
            $sql .= " AND `task_end` >= ".$dates['end_date'].""; */

            /*$sql .= " AND `task_end` <= ".$dates['start_date']."";
            $sql .= " AND `task_end` >= ".$dates['end_date']."";*/


            $result = $mysqli->query($sql);

            if ($result && $result->num_rows > 0) {
                $data = $result->fetch_all (MYSQLI_ASSOC);
                $result->free();
            }
        }

        return $data;
    }

    public function getMonthTaskHistory ($year, $month) {
        $data = false;

        if ( isset($_SESSION['login']) ) {
            $user_id = $_SESSION['login']['user_id'];

            if (!$user_id) {
                return false;
            }

            global $mysqli;
            $dates = array(
                'start_date' => (int)$year.'-'.(int)$month.'-01 00:00:00',
                'end_date' => (int)$year.'-'.(int)$month.'-31 23:59:59',
            );


            /*$sql = "SELECT th.*, t.*, th.task_id as task_main_id FROM task_history th
                LEFT JOIN task t ON (t.task_id = th.task_id)
                where th.task_end BETWEEN '".$dates['start_date']."' and '".$dates['end_date']."'
                AND th.user_id = $user_id";*/
            $sql = "SELECT th.*, t.*, th.task_id as task_main_id FROM task_history th 
                LEFT JOIN task t ON (t.task_id = th.task_id)
                where th.task_end BETWEEN '".$dates['start_date']."' and '".$dates['end_date']."'
                AND th.user_id = $user_id";


            $result = $mysqli->query($sql);

            if ($result && $result->num_rows > 0) {
                $data = $result->fetch_all (MYSQLI_ASSOC);
                $result->free();
            }
        }

        return $data;
    }

    public function getTaskHistory ($user_id = 0, $task_id = 0) {
        if (!$user_id) {
            return false;
        }
        global $mysqli;

        $data = false;

        $sql = "SELECT * FROM task_history 
                where 1";
        $sql .= " AND `user_id` = $user_id";

        if ($task_id) {
            $sql .= " AND `task_id` = $task_id";
        }


        $result = $mysqli->query($sql);

        if ($result && $result->num_rows > 0) {
            $data = $result->fetch_all (MYSQLI_ASSOC);
            $result->free();
        }

        return $data;
    }

    private function addTaskHistory ($data = array()) {
        global $mysqli;

        $sql = "INSERT INTO task_history SET 
                    user_id = '" . (int)$data['user_id'] . "', 
					task_id = '" . (int)$data['task_id'] . "', 
					task_start = '" . $data['task_start'] . "',
					task_end = NOW()";

        $mysqli->query($sql);
    }
}

global $model;

$model = new MainModel();

?>