<?php
$app->get('/session', function () {
    $db = new DbHandler();
    $session = $db->getSession();
    echoResponse(200, $session);
});

$app->get('/getUserStatus', function () {
    $db = new DbHandler();
    if ($db->getSession()) {
        $session = true;
    } else {
        $session = false;
    }
    echoResponse(200, $session);
});

$app->post('/login', function () use ($app) {
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('username', 'password'), $r->user);
    $response = array();
    $db = new DbHandler();
    $password = $r->user->password;
    $email = $r->user->username;
    $user = $db->getOneRecord("select id,admin_name,admin_password,admin_email,admin_image,admin_role from administrator where admin_email='$email'");
    if ($user != NULL) {
        if ($user['admin_password'] == $password) {
            $response['status'] = "success";
            $response['message'] = 'Logged in successfully.';
            $response['name'] = $user['admin_name'];
            $response['id'] = $user['id'];
            $response['email'] = $user['admin_email'];
            $response['image'] = $user['admin_image'];
            $response['role'] = $user['admin_role'];
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['user'] = $response;
        } else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
        }
    } else {
        $response['status'] = "error";
        $response['message'] = 'No such user is registered';
    }
    echoResponse(200, $response);
});
$app->get('/logout', function () {
    $db = new DbHandler();
    $response["status"] = $db->destroySession();
    echoResponse(200, $response);
});
?>