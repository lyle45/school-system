class SchoolSystem {

    constructor(studentsService, coursesService) {
        this.students = studentsService.getStudents();
        this.courses = coursesService.getCourses();
    }
}
myApp.component('schoolSystem', {
    templateUrl: 'components/school-system/school-system.html',
    controller: SchoolSystem
});
