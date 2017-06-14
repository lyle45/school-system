class StudentService {

    constructor(apiService) {
        this._apiService = apiService;
        this._students = [];
        apiService.get('studentsList').then((data) => {
            for (let i = 0; i < data.length; i++) {
                this._students.push(data[i]);
            }
        });
    }

    getStudents() {
        return this._students;
    }

    saveStudent(student) {
        if (student.id) var studentIndex = _.findIndex(this._students, {id: student.id});
        if (angular.equals(this._students[studentIndex], student)) {
            return
        }
        return this._apiService.post('saveStudent', {student: student}).then((data) => {
            if (data === true) {
                this._students[studentIndex] = student;
                return student
            }
            if (!isNaN(data) && typeof data != 'boolean') {
                student.id = data;
                this._students.push(student);
                return student
            }
            return data
        });
    }

    deleteStudent(student) {
        let studentIndex = _.findIndex(this._students, {id: student.id});
        return this._apiService.post('deleteStudent', {studentId: student.id}).then((data) => {
            if (data) this._students.splice(studentIndex, 1);
            return data;
        })
    }

    refreshCourses(studentsToRefresh) {
        _.forEach(studentsToRefresh, (studentId) => {
            let studentIndex = _.findIndex(this._students, {id: studentId});
            let studentToRefresh = this._students[studentIndex];
            this._apiService.post('getStudentCoursesIds', {student: studentToRefresh}).then((data) => {
                studentToRefresh.courses = data;
            })
        })
    }

    getStudentsByArrayOfIds(idArr) {
        return _(this._students)
            .keyBy('id')
            .at(idArr)
            .value();
    }
}

myApp.service('studentsService', StudentService);