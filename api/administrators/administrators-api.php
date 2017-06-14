<?php
$app->get('/adminsList', function () {
    $db = new DbHandler();
    $sess = $db->getSession();
    $user = $sess['user'];
    $query = "select * from administrator";
    if ($user['role'] === 'manager' || $user['role'] === 'owner') {
        if ($user['role'] === 'manager') {
            $adminsList = $db->getAllRecords($query . " WHERE admin_role <> 'owner'");
        } else {
            $adminsList = $db->getAllRecords($query);
        }
        $admins = array();
        foreach ($adminsList as $admin) {
            $prettyAdmin = array();
            $prettyAdmin['id'] = $admin['id'];
            $prettyAdmin['name'] = $admin['admin_name'];
            $prettyAdmin['phone'] = $admin['admin_phone'];
            $prettyAdmin['email'] = $admin['admin_email'];
            $prettyAdmin['image'] = $admin['admin_image'];
            $prettyAdmin['role'] = $admin['admin_role'];
            $admins[] = $prettyAdmin;
        }
        echoResponse(200, $admins);
    } else {
        echoResponse(200, false);
    }
});

$app->post('/saveAdmin', function () use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $admin = $r->admin;
    if (isset($admin->id)) {
        $rowsWereEffected = $db->query("UPDATE administrator SET admin_name = '$admin->name', admin_phone = '$admin->phone', admin_email = '$admin->email', admin_image = '$admin->image', admin_role = '$admin->role' WHERE id = '$admin->id'");
        if ($rowsWereEffected) {
            if(isset($admin->currentUser)) {
                $sess = $db->getSession();
                $sess['user'] = $admin;
            }
            echoResponse(200, true);
        } else {
            echoResponse(200, false);
        }
    } else {
        $newId = $db->insertIntoTable("INSERT INTO administrator (admin_name, admin_phone, admin_email, admin_password, admin_image, admin_role) VALUES ('$admin->name', '$admin->phone', '$admin->email', '$admin->password', '$admin->image', '$admin->role')");
        echoResponse(200, $newId);
    }
});

$app->post('/deleteAdmin', function () use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $adminId = $r->adminId;
    if (isset($adminId)) {
        $rowsWereEffected = $db->query("DELETE FROM administrator WHERE id = '$adminId'");
        if ($rowsWereEffected) {
            echoResponse(200, true);
        } else {
            echoResponse(200, false);
        }
    }
});