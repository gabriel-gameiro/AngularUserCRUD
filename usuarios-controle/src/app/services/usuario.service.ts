import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UtilService } from './util.service';
import { rejects } from 'assert';
import { randomInt } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private utilService: UtilService) { }

  private urlApi = "http://localhost:3000/usuarios";

  async obterUsuarios() : Promise<Usuario[]> {
    const data = await fetch(this.urlApi);
    return await data.json() ?? [];
  }

  async obterUsuario(id: number) : Promise<Usuario> {
    const data = await fetch(`${this.urlApi}/${id}`);
    return await data.json() ?? null;
  }

  async salvarUsuario(usuario: Usuario): Promise<any> {
    // Valida regras do usuario
    if(!this.validarRegrasUsuario(usuario))
      return Promise.reject(new Error('Validação'))

    // Atualizar
    if(Number(usuario.id) > 0) {
      return await fetch(`${this.urlApi}/${usuario.id}`, {
        method: 'put',
        body: JSON.stringify(usuario)
      });
    }

    // Cadastrar
    usuario.id = Math.floor(Math.random() * 999999).toString();
    return await fetch(this.urlApi, {
      method: 'post',
      body: JSON.stringify(usuario)
    });
  }

  async deletarUsuario(id: string): Promise<any> {
    return fetch(`${this.urlApi}/${id}`, {
      method: "DELETE"
    });
  }

  validarRegrasUsuario(usuario: Usuario): boolean {
    // Validaçõe da classe do usuário

    if(usuario.nome.split(" ").length < 2)
      return false;

    let idade = UtilService.calcularIdade(usuario.dataNascimento);
    if(18 > idade || idade > 60)
      return false;

    if(!UtilService.validarCpf(usuario.cpf))
      return false;

    return true;
  }
}
