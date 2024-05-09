import { AbstractControl } from '@angular/forms';
import { UtilService } from '../services/util.service';

export class CpfValidator {

  constructor() { }

  static validacaoIntegridade(control: AbstractControl) {
    const cpf: string = control.value.toString();

    if(!UtilService.validarCpf(cpf))
      return { integridade: false}
      
    return null;
  }
}
