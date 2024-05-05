import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CurrencyPipe, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CpfPipe } from '../../pipes/cpf.pipe';
import { FiltroUsuario } from '../../models/filtro-usuario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, DatePipe, CurrencyPipe, CpfPipe, FormsModule, JsonPipe],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {
  constructor(private usuarioService: UsuarioService) {}

  listaUsuarios: Usuario[] = [];
  qtdPaginas: number = 0;
  filtro: FiltroUsuario = {
    cpf: "",
    dataNascimento: "",
    nome: "",
    paginaAtual: 1,
    tamanhoPagina: 10
  };

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarioService.obterUsuarios(this.filtro).then((retorno) => {
      this.listaUsuarios = retorno.registros;
      this.qtdPaginas = retorno.quantidadePaginas;
    });
  }

  avancarPagina() {
    this.filtro.paginaAtual++;
    this.carregarUsuarios();
  }

  voltarPagina() {
    this.filtro.paginaAtual--;
    this.carregarUsuarios();
  }

  deletarUsuario(id: string) {
    this.usuarioService.deletarUsuario(id).then((res) => {
      // Avisar que o usuário foi deletado

      // Recarrega lista
      this.carregarUsuarios();
    })
  }
}
