class MainContainer {

    constructor(mainContainerService, $rootScope) {
        this._mainContainerService = mainContainerService;
        $rootScope.$on('clearContainer', () => this.clearSelection())
    }

    $onInit() {
        this.pickedStudent = null;
        this.pickedCourse = null;
        this.pickedAdmin = null;
        this._mainContainerService.onCoursePick((course) => {
            this.pickedStudent = null;
            this.pickedCourse = course;
            this.pickedAdmin = null;
        });
        this._mainContainerService.onStudentPick((student) => {
            this.pickedStudent = student;
            this.pickedCourse = null;
            this.pickedAdmin = null;
        });
        this._mainContainerService.onAdminPick((admin) => {
            this.pickedStudent = null;
            this.pickedCourse = null;
            this.pickedAdmin = admin;
        })
    }

    clearSelection() {
        this.pickedCourse = null;
        this.pickedStudent = null;
        this.pickedAdmin = null;
    }

    saveStudent(student) {
        this._mainContainerService.saveStudent(student)
    }

    deleteStudent(student) {
        this._mainContainerService.deleteStudent(student);
    }

    saveCourse(course) {
        this._mainContainerService.saveCourse(course);
    }

    deleteCourse(course) {
        this._mainContainerService.deleteCourse(course);
    }

    saveAdmin(admin) {
        this._mainContainerService.saveAdmin(admin);
    }

    deleteAdmin(admin) {
        this._mainContainerService.deleteAdmin(admin);
    }



}
myApp.component('mainContainer', {
    templateUrl: 'components/school-system/main-container/main-container.html',
    controller: MainContainer
});
