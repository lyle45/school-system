class AdminsService {
    constructor(apiService, userService) {
        this._apiService = apiService;
        this._admins = [];
        apiService.get('adminsList').then((data) => {
            let currentUserId = userService.getUser().id;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === currentUserId) {
                    data[i].currentUser = true;
                }
                this._admins.push(data[i]);
            }
        });
    }

    getAdmins() {
        return this._admins;
    }

    saveAdmin(admin) {
        if (admin.id) var adminsIndex = _.findIndex(this._admins, {id: admin.id});
        if (angular.equals(this._admins[adminsIndex], admin)) {
            return
        }
        return this._apiService.post('saveAdmin', {admin: admin}).then((data) => {
            if (data === true) {
                this._admins[adminsIndex] = admin;
                return admin;
            }
            if (!isNaN(data) && typeof data != 'boolean') {
                admin.id = data;
                this._admins.push(admin);
                return admin
            }
            return data
        });
    }

    deleteAdmin(admin) {
        let adminIndex = _.findIndex(this._admins, {id: admin.id});
        return this._apiService.post('deleteAdmin', {adminId: admin.id}).then((data) => {
            if (data) this._admins.splice(adminIndex, 1);
            return data;
        })
    }
}

myApp.service('adminsService', AdminsService);