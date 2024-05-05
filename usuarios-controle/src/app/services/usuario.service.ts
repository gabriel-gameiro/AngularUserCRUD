import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UtilService } from './util.service';
import { rejects } from 'assert';
import { randomInt } from 'crypto';
import { FiltroUsuario } from '../models/filtro-usuario';
import { RetornoPaginacao } from '../models/retorno-paginacao';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  private urlApi = "http://localhost:3000/usuarios";

  async obterUsuarios(filtro: FiltroUsuario) : Promise<RetornoPaginacao<Usuario>> {
    // Idealmente o filtro e a paginação seriam repassados para a API fazer a filtragem diretamente na base de dados, para de fato aplicar a melhora de desempenho.
    // Mas na falta de controle sobre a api, estou fazendo diretamente aqui no front
    const data = await fetch(this.urlApi);
    let usuarios: Usuario[] = await data.json() ?? []

    console.log(usuarios);
  

    if(filtro.cpf)
      usuarios = usuarios.filter((e) => e.cpf == filtro.cpf)

    if(filtro.dataNascimento)
      usuarios = usuarios.filter((e) => e.dataNascimento == filtro.dataNascimento)

    if(filtro.nome)
      usuarios = usuarios.filter((e) => e.nome.toLowerCase().includes(filtro.nome.toLowerCase()))

    const qtdPaginas = Math.ceil(usuarios.length / filtro.tamanhoPagina);

    if(filtro.paginaAtual && filtro.tamanhoPagina) {
      const inicio = filtro.tamanhoPagina * (filtro.paginaAtual - 1)
      usuarios = usuarios.slice(inicio, inicio + filtro.tamanhoPagina);
    }

    const retorno: RetornoPaginacao<Usuario> = {
      quantidadePaginas: qtdPaginas,
      registros: usuarios
    }

    return retorno;
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
