<?php

class DbHandler
{

    private $conn;

    function __construct()
    {
        require_once 'dbConnect.php';
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }

    /**
     * Fetching single record
     */
    public function getOneRecord($query)
    {
        $r = $this->conn->query($query . ' LIMIT 1') or die($this->conn->error . __LINE__);
        return $result = $r->fetch_assoc();
    }

    /**
     * Fetching all record
     */
    public function getAllRecords($query)
    {
        $r = $this->conn->query($query) or die($this->conn->error . __LINE__);
        return $r;
    }

    public function insertIntoTable($query)
    {
        $r = $this->conn->query($query);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
        } else {
            return NULL;
        }
    }

    public function query($query)
    {
        $r = $this->conn->query($query) or die($this->conn->error . __LINE__);
        return $r;
    }

    public function getSession()
    {
        if (!isset($_SESSION)) {
            session_start();
        }
        $sess = array();
        if (isset($_SESSION['user'])) {
            $sess["user"] = $_SESSION['user'];
        } else {
            $sess = false;
        }
        return $sess;
    }

    public function destroySession()
    {
        if (!isset($_SESSION)) {
            session_start();
        }
        if (isSet($_SESSION['user'])) {
            unset($_SESSION['user']);
            $info = 'info';
            if (isSet($_COOKIE[$info])) {
                setcookie($info, '', time() - $cookie_time);
            }
            $status = true;
        } else {
            $status = false;
        }
        return $status;
    }

}

?>
