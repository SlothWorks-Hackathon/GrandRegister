import templateUrl from './edit-authorized-user.html';

class EditAuthorizedUserController {
  $onInit() {
    this.user = this.resolve.user;

    this.userRoles = [
      { key: 'tenant-admin', title: 'tenant admin' },
      { key: 'tenant-user', title: 'tenant user' }
    ];
  }

  closeModal(user) {
    this.close({ $value: user });
  }

  dismissModal() {
    this.dismiss({ $value: 'cancel' });
  }
}

export default {
  templateUrl,
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: EditAuthorizedUserController
};
