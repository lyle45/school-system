class AdminsList {

    constructor(adminsService, mainContainerService) {
        this.admins = adminsService.getAdmins();
        this._mainContainerService = mainContainerService;
    }

    pickAdmin(admin) {
        this._mainContainerService.pickAdmin(admin);
    }

    createAdmin() {
        this._mainContainerService.pickAdmin({});
    }
}

myApp.component('adminsList', {
    templateUrl: 'components/school-system/admins-list/admins-list.html',
    controller: AdminsList
});