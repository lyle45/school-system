class AdminInfo {

    constructor(coursesService) {
        this._coursesService = coursesService;
        this.availableRoles = ['manager', 'sales']
    }

    $onChanges(changes) {
        this.admin = angular.copy(this.selectedAdmin);
        if (!changes.selectedAdmin.isFirstChange()) {
            if (angular.isUndefined(this.admin.id)) {
                this.adminInfo.$show();
                this.newAdmin = true;
            } else {
                this.adminInfo.$cancel();
                this.newAdmin = false;
            }
        }
    }

    $postLink() {
        if (angular.isUndefined(this.admin.id)) {
            this.adminInfo.$show();
            this.newAdmin = true;
        }
    }

    validateFields(data) {
        if (!data.length > 0) return 'Field Required!'
    }

    validateNumber(data) {
        if (isNaN(data)) return 'Must be a number!';
        return this.validateFields(data)
    }

    verifyDelete() {
        if (confirm("Are you sure you want to delete this course?")) this.deleteAdmin({admin: this.admin})
    }

    submitForm() {
        this.saveAdmin({admin: this.admin})
    }
}
myApp.component('adminInfo', {
    templateUrl: 'components/school-system/main-container/admin-info/admin-info.html',
    controller: AdminInfo,
    bindings: {
        selectedAdmin: '<',
        saveAdmin: '&',
        deleteAdmin: '&'
    }
});
