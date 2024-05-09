import { AbstractControl } from '@angular/forms';
import { UtilService } from '../services/util.service';

export class NomeValidator {

  constructor() { }

  static validacaoNomeSobrenome(control: AbstractControl) {
    const nome: string = control.value.toString();

    if(nome.trim().split(" ").length < 2)
      return { nomeSobrenome: false}
      
    return null;
  }
}
