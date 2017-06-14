<html ng-app="myApp">
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>School System</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="app.css">
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="bower_components/angular-material/angular-material.css">
    <link rel="stylesheet" href="bower_components/angular-xeditable/dist/css/xeditable.css">
    <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.css">
</head>
<body>
    <div ui-view layout="column"></div>
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
    <script src="bower_components/angular-animate/angular-animate.js"></script>
    <script src="bower_components/angular-aria/angular-aria.js"></script>
    <script src="bower_components/angular-messages/angular-messages.js"></script>
    <script src="bower_components/angular-material/angular-material.js"></script>
    <script src="bower_components/angular-resource/angular-resource.js"></script>
    <script src="bower_components/lodash/dist/lodash.js"></script>
    <script src="bower_components/angular-xeditable/dist/js/xeditable.js"></script>
    <script src="bower_components/checklist-model/checklist-model.js"></script>

    <!--user services-->
    <script src="app.js"></script>
    <script src="services/api-service.js"></script>
    <script src="services/user-service.js"></script>
    <script src="services/students-service.js"></script>
    <script src="services/courses-service.js"></script>
    <script src="services/admins-service.js"></script>
    <script src="services/main-container-service.js"></script>

    <!--user components-->
    <script src="components/login/login-component.js"></script>
    <script src="components/school-system/toolbar/toolbar-component.js"></script>
    <script src="components/school-system/school-system-component.js"></script>
    <script src="components/school-system/students-list/students-list-component.js"></script>
    <script src="components/school-system/courses-list/courses-list-component.js"></script>
    <script src="components/school-system/admins-list/admins-list-component.js"></script>
    <script src="components/school-system/main-container/main-container-component.js"></script>
    <script src="components/school-system/main-container/student-info/student-info-component.js"></script>
    <script src="components/school-system/main-container/course-info/course-info-component.js"></script>
    <script src="components/school-system/main-container/admin-info/admin-info-component.js"></script>
</body>
</html>
