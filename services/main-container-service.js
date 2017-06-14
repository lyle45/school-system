class MainContainerService {

    constructor(studentsService, coursesService, adminsService, userService) {
        this._studentsService = studentsService;
        this._coursesService = coursesService;
        this._adminsService = adminsService;
        this._userService = userService;

        this.pickedCourse = null;
        this.pickedStudent = null;
        this.pickedAdmin = null;
        this.pickCourseListenersFn = [];
        this.pickStudentListenerFn = [];
        this.pickAdminListenerFn = [];
    }

    pickCourse(course) {
        this.pickedCourse = course;
        this.pickedStudent = null;
        this.pickedAdmin = null;
        this._notifyCourseListeners();
    }

    pickStudent(student) {
        this.pickedCourse = null;
        this.pickedStudent = student;
        this.pickedAdmin = null;
        this._notifyStudentListeners();
    }

    pickAdmin(admin) {
        this.pickedCourse = null;
        this.pickedStudent = null;
        this.pickedAdmin = admin;
        this._notifyAdminListeners();
    }

    onCoursePick(fn) {
        this.pickCourseListenersFn.push(fn)
    }

    onStudentPick(fn) {
        this.pickStudentListenerFn.push(fn)
    }

    onAdminPick(fn) {
        this.pickAdminListenerFn.push(fn)
    }

    _notifyCourseListeners() {
        _.forEach(this.pickCourseListenersFn, (cb) => {
            cb(this.pickedCourse)
        })
    }

    _notifyStudentListeners() {
        _.forEach(this.pickStudentListenerFn, (cb) => {
            cb(this.pickedStudent)
        })
    }

    _notifyAdminListeners() {
        _.forEach(this.pickAdminListenerFn, (cb) => {
            cb(this.pickedAdmin)
        })
    }

    saveStudent(student) {
        let changesPromise = this._studentsService.saveStudent(student);
        if (changesPromise) changesPromise.then((newStudent) => {
            if (newStudent) {
                let changedCourses = _.concat(student.courses, student.removedCourses);
                this._coursesService.refreshStudents(changedCourses);
                this.pickStudent(newStudent);
            }
        });
    }

    deleteStudent(student) {
        this._studentsService.deleteStudent(student).then((data) => {
            if (data) {
                this._coursesService.refreshStudents(student.courses);
                this.pickStudent(null);
            }
        })
    }

    saveCourse(course) {
        let changesPromise = this._coursesService.saveCourse(course);
        if (changesPromise) changesPromise.then((newCourse) => {
            if (newCourse) this.pickCourse(newCourse)
        });
    }

    deleteCourse(course) {
        this._coursesService.deleteCourse(course).then((data) => {
            if (data) {
                this._studentsService.refreshCourses(course.students);
                this.pickCourse(null);
            }
        })
    }

    saveAdmin(admin) {
        let changesPromise = this._adminsService.saveAdmin(admin);
        if (changesPromise) changesPromise.then((newAdmin) => {
            if (newAdmin) {
                this.pickAdmin(newAdmin);
                if (newAdmin.currentUser) this._userService.setUser(admin);
            }
        });
    }

    deleteAdmin(admin) {
        this._adminsService.deleteAdmin(admin).then((data) => {
            if (data) {
                this.pickAdmin(null);
            }
        })
    }

}

myApp.service('mainContainerService', MainContainerService);