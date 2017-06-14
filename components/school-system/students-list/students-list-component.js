class StudentsList {

    constructor(studentsService, mainContainerService) {
        this._mainContainerService = mainContainerService;
        this.students = studentsService.getStudents();
    }

    pickStudent(student) {
        this._mainContainerService.pickStudent(student)
    }

    createStudent() {
        this._mainContainerService.pickStudent({})
    }
}
myApp.component('studentsList', {
    templateUrl: 'components/school-system/students-list/students-list.html',
    controller: StudentsList
});
