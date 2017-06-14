<?php
$app->get('/coursesList', function () {
    $db = new DbHandler();
    $coursesList = $db->getAllRecords("select * from course");
    $courses = array();
    foreach ($coursesList as $course) {
        $prettyCourse = array();
        $id = $course['id'];
        $prettyStudent['id'] = $id;
        $prettyCourse['id'] = $course['id'];
        $prettyCourse['name'] = $course['cour_name'];
        $prettyCourse['description'] = $course['cour_description'];
        $prettyCourse['image'] = $course['cour_image'];
        $prettyCourse['students'] = array();
        $resultRows = $db->getAllRecords("SELECT student_id FROM student_course_junction WHERE course_id = '$id'");
        while ($row = $resultRows->fetch_assoc()) {
            $prettyCourse['students'][] = $row['student_id'];
        }
        $courses[] = $prettyCourse;
    }
    echoResponse(200, $courses);
});

$app->post('/saveCourse', function () use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $course = $r->course;
    if (isset($course->id)) {
        $rowsWereEffected = $db->query("UPDATE course SET cour_name = '$course->name', cour_description = '$course->description', cour_image = '$course->image' WHERE id = '$course->id'");
        if ($rowsWereEffected) {
            echoResponse(200, true);
        } else {
            echoResponse(200, false);
        }
    } else {
        $newId = $db->insertIntoTable("INSERT INTO course (cour_name, cour_description, cour_image) VALUES ('$course->name', '$course->description', '$course->image')");
        echoResponse(200, $newId);
    }
});

$app->post('/deleteCourse', function () use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $courseId = $r->courseId;
    if (isset($courseId)) {
        $rowsWereEffected = $db->query("DELETE FROM course WHERE id = '$courseId'");
        if ($rowsWereEffected) {
            echoResponse(200, true);
        } else {
            echoResponse(200, false);
        }
    }
});

$app->post('/getCourseStudentsIds', function () use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $course = $r->course;
    $id = $course->id;
    $studentsIds = array();
    $resultRows = $db->getAllRecords("SELECT student_id FROM student_course_junction WHERE course_id = '$id'");
    while ($row = $resultRows->fetch_assoc()) {
        $studentsIds[] = $row['student_id'];
    }
    echoResponse(200, $studentsIds);
});