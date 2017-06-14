<?php
$app->get('/studentsList', function () {
    $db = new DbHandler();
    $studentsList = $db->getAllRecords("select * from cour_student");
    $students = array();
    foreach ($studentsList as $student) {
        $prettyStudent = array();
        $id = $student['id'];
        $prettyStudent['id'] = $id;
        $prettyStudent['name'] = $student['stud_name'];
        $prettyStudent['phone'] = $student['stud_phone'];
        $prettyStudent['email'] = $student['stud_email'];
        $prettyStudent['image'] = $student['stud_image'];
        $prettyStudent['courses'] = array();
        $resultRows = $db->getAllRecords("SELECT course_id FROM student_course_junction WHERE student_id = '$id'");
        while ($row = $resultRows->fetch_assoc()) {
            $prettyStudent['courses'][] = $row['course_id'];
        }
        $students[] = $prettyStudent;
    }
    echoResponse(200, $students);
});

$app->post('/saveStudent', function () use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $student = $r->student;
    if (isset($student->id)) {
        $rowsWereEffected = $db->query("UPDATE cour_student SET stud_name = '$student->name', stud_phone = '$student->phone', stud_email = '$student->email', stud_image = '$student->image' WHERE id = '$student->id'");
        foreach ($student->courses as $courseId) {
            $db->insertIntoTable("INSERT INTO student_course_junction (student_id, course_id) VALUES ('$student->id', '$courseId')");
        }
        foreach ($student->removedCourses as $courseId) {
            $db->query("DELETE FROM student_course_junction WHERE student_id = '$student->id' AND course_id = '$courseId'");
        }
        if ($rowsWereEffected) {
            echoResponse(200, true);
        } else {
            echoResponse(200, false);
        }
    } else {
        $newId = $db->insertIntoTable("INSERT INTO cour_student (stud_name, stud_phone, stud_email, stud_image) VALUES ('$student->name', '$student->phone', '$student->email', '$student->image')");
        foreach ($student->courses as $courseId) {
            $db->insertIntoTable("INSERT INTO student_course_junction (student_id, course_id) VALUES ('$newId', '$courseId')");
        }
        echoResponse(200, $newId);
    }
});

$app->post('/deleteStudent', function () use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $studentId = $r->studentId;
    if (isset($studentId)) {
        $rowsWereEffected = $db->query("DELETE FROM cour_student WHERE id = '$studentId'");
        if ($rowsWereEffected) {
            echoResponse(200, true);
        } else {
            echoResponse(200, false);
        }
    }
});

$app->post('/getStudentCoursesIds', function () use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $student = $r->student;
    $id = $student->id;
    $coursesIds = array();
    $resultRows = $db->getAllRecords("SELECT course_id FROM student_course_junction WHERE student_id = '$id'");
    while ($row = $resultRows->fetch_assoc()) {
        $coursesIds[] = $row['course_id'];
    }
    echoResponse(200, $coursesIds);
});