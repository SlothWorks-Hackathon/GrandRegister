import templateUrl from './create-register.html';

class CreateRegisterController {
  constructor($uibModal) {
    this.$uibModal = $uibModal;

    this.registerName = null;
    this.fieldName = null;
    this.fieldType = null;
    this.registerFields = [];
    this.authorizedUsers = [];
  }

  $onInit() {
    this.dataTypes = [
      { key: 'string', title: 'текст' },
      { key: 'number', title: 'число' },
      { key: 'date', title: 'дата' },
      { key: 'dateTime', title: 'дата и час' },
      { key: 'email', title: 'email' },
      { key: 'IBAN', title: 'IBAN' },
      { key: 'EGN', title: 'ЕГН' },
      { key: 'regNo', title: 'регистрационен номер' },
      { key: 'personalId', title: 'номер на лична карта' }
    ];
  }

  addField(field) {
    this.registerFields.push(field);

    this.fieldName = null;
    this.fieldType = null;
  }

  removeField(index) {
    this.registerFields.splice(index, 1);
  }

  saveRegister(name, fields) {
    const register = {
      name,
      schema: fields.map(field => {
        return {
          id: field.name,
          name: field.name,
          type: field.type.key
        };
      })
    };
  }

  fieldNameExists(fieldName) {
    return this.registerFields.some(field => {
      return field.name === fieldName;
    });
  }

  openEditAuthorizedUserModal(user = {}) {
    const modal = this.$uibModal.open({
      component: 'editAuthorizedUser',
      resolve: {
        user: () => user
      }
    });

    modal.result
      .then(user => {
        this.authorizedUsers.push(user)
      }, () => {
        console.log('cancel');
      });
  }

  removeAuthorizedUser(index) {
    this.authorizedUsers.splice(index, 1);
  }
}

export default {
  templateUrl,
  controller: CreateRegisterController
};
