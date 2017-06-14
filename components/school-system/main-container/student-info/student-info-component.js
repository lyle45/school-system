class StudentInfo {

    constructor(coursesService) {
        this._coursesService = coursesService;
        this.availableCourses = coursesService.getCourses();
    }

    $onChanges(changes) {
        this.student = angular.copy(this.selectedStudent);
        if (!changes.selectedStudent.isFirstChange()) {
            if (angular.isUndefined(this.student.id)) {
                this.studentInfo.$show();
                this.newStudent = true;
            } else {
                this.studentInfo.$cancel();
                this.newStudent = false;
            }
        }
        this.currentCourses = this._coursesService.getCoursesByArrayOfIds(this.student.courses);
    }

    $postLink() {
        if (angular.isUndefined(this.student.id)) {
            this.studentInfo.$show();
            this.newStudent = true;
        }
    }

    validateFields(data) {
        if (!data.length > 0) return 'Field Required!'
    }

    validateNumber(data) {
        if (isNaN(data)) return 'Must be a number!';
        return this.validateFields(data)
    }

    checkRemovedCourses(data) {
        this.student.removedCourses = [];
        _.forEach(this.student.courses, (courseId) => {
            if(data.indexOf(courseId) === -1) this.student.removedCourses.push(courseId);
        })
    }

    verifyDelete () {
        if (confirm("Are you sure you want to delete this student?")) this.deleteStudent({student: this.student})
    }

    submitForm() {
        this.saveStudent({student: this.student})
    }
}
myApp.component('studentInfo', {
    templateUrl: 'components/school-system/main-container/student-info/student-info.html',
    controller: StudentInfo,
    bindings: {
        selectedStudent: '<',
        saveStudent: '&',
        deleteStudent: '&'
    }
});
