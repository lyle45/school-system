class CoursesService {

    constructor(apiService) {
        this._apiService = apiService;
        this._courses = [];
        apiService.get('coursesList').then((data) => {
            for (let i = 0; i < data.length; i++) {
                this._courses.push(data[i]);
            }
        });
    }

    getCourses() {
        return this._courses
    }

    saveCourse(course) {
        if (course.id) var coursesIndex = _.findIndex(this._courses, {id: course.id});
        if (angular.equals(this._courses[coursesIndex], course)) {
            return
        }
        return this._apiService.post('saveCourse', {course: course}).then((data) => {
            if (data === true) {
                this._courses[coursesIndex] = course;
                return course
            }
            if (!isNaN(data) && typeof data != 'boolean') {
                course.id = data;
                this._courses.push(course);
                return course
            }
            return data
        });
    }

    deleteCourse(course) {
        let courseIndex = _.findIndex(this._courses, {id: course.id});
        return this._apiService.post('deleteCourse', {courseId: course.id}).then((data) => {
            if (data) this._courses.splice(courseIndex, 1);
            return data;
        })
    }

    refreshStudents(coursesToRefresh) {
        _.forEach(coursesToRefresh, (courseId) => {
            let courseIndex = _.findIndex(this._courses, {id: courseId});
            let courseToRefresh = this._courses[courseIndex];
            this._apiService.post('getCourseStudentsIds', {course: courseToRefresh}).then((data) => {
                courseToRefresh.students = data;
            })
        })
    }

    getCoursesByArrayOfIds(idArr) {
        return _(this._courses)
                .keyBy('id')
                .at(idArr)
                .value();
    }
}

myApp.service('coursesService', CoursesService);