class CoursesList {

    constructor(coursesService, mainContainerService) {
        this.courses = coursesService.getCourses();
        this._mainContainerService = mainContainerService;
    }

    pickCourse(course) {
        this._mainContainerService.pickCourse(course)
    }

    createCourse() {
        this._mainContainerService.pickCourse({})
    }
}
myApp.component('coursesList', {
    templateUrl: 'components/school-system/courses-list/courses-list.html',
    controller: CoursesList
});
