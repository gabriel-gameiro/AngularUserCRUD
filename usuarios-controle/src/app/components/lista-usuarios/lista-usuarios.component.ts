import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CpfPipe } from '../../pipes/cpf.pipe';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, DatePipe, CurrencyPipe, CpfPipe],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {
  constructor(private usuarioService: UsuarioService) {}

  listaUsuarios: Usuario[] = [];

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarioService.obterUsuarios().then((usuarios) => {
      this.listaUsuarios = usuarios;
    });
  }

  deletarUsuario(id: string) {
    this.usuarioService.deletarUsuario(id).then((res) => {
      // Avisar que o usuário foi deletado

      // Recarrega lista
      this.carregarUsuarios();
    })
  }
}
