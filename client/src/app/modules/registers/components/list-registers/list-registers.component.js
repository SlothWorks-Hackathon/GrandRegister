import templateUrl from './list-registers.html';

class ListRegistersController {
  $onInit() {
    this.registers = [
      { id: "cref23", name: "Регистър на домашните кучета в община разлог", status: "active", lastModifiedOn: 1273611600000 },
      { id: "cref34", name: "Регистър на издадените разрешения за таксиметров превоз", status: "active", lastModifiedOn: 1333486800000 },
      { id: "cref44", name: "Регистър на заявления за достъп на информация 2017г.", status: "active", lastModifiedOn: 1225663200000 },
      { id: "cref68", name: "Регистър на кандидатите за участие в международните процедури на НАТО", status: "active", lastModifiedOn: 1067896800000 },
      { id: "cref23", name: "Държавен регистър на географските означения", status: "active", lastModifiedOn: 1273611600000 },
      { id: "cref34", name: "Единeн регистър на адвокатите при Висшия адвокатски съвет", status: "active", lastModifiedOn: 1333486800000 },
      { id: "cref44", name: "Национален регистър за правна помощ", status: "active", lastModifiedOn: 1225663200000 },
      { id: "cref68", name: "Национален регистър на обектите за производство и търговия на храни", status: "active", lastModifiedOn: 1067896800000 }
    ];
  }
}

export default {
  templateUrl,
  controller: ListRegistersController
};
