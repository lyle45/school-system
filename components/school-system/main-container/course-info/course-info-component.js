class CourseInfo {

    constructor(studentsService, userService) {
        this._studentsService = studentsService;
        this.currentUserRole = userService.getUser().role;
    }

    $onChanges(changes) {
        this.course = angular.copy(this.selectedCourse);
        if (!changes.selectedCourse.isFirstChange()) {
            if (angular.isUndefined(this.course.id)) {
                this.courseInfo.$show();
                this.newCourse = true;
            } else {
                this.courseInfo.$cancel();
                this.newCourse = false
            }
        }
        if(this.course.students) this.currentStudents = this._studentsService.getStudentsByArrayOfIds(this.course.students);
        else this.currentStudents = []
    }

    $postLink() {
        if (angular.isUndefined(this.course.id)) {
            this.courseInfo.$show();
            this.newCourse = true;
        }
    }

    validateFields(data) {
        if (!data.length > 0) return 'Field Required!'
    }

    submitForm() {
        this.saveCourse({course: this.course})
    }

    verifyDelete() {
        if (confirm("Are you sure you want to delete this course?")) this.deleteCourse({course: this.course})
    }

}
myApp.component('courseInfo', {
    templateUrl: 'components/school-system/main-container/course-info/course-info.html',
    controller: CourseInfo,
    bindings: {
        selectedCourse: '<',
        saveCourse: '&',
        deleteCourse: '&'
    }
});
