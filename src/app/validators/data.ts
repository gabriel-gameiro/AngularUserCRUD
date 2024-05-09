import { AbstractControl } from '@angular/forms';
import { UtilService } from '../services/util.service';

export class DataValidator {

  constructor() { }

  static validacaoIdade18e60(control: AbstractControl) {
    const data: string = control.value.toString();

    const idade: number = UtilService.calcularIdade(data);
    if(18 > idade || idade > 60)
      return { faixaIdade: false}
      
    return null;
  }
}
