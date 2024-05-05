import { Component, Input } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { JsonPipe, Location, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CpfValidator } from '../../validators/cpf';
import { NomeValidator } from '../../validators/nome';
import { DataValidator } from '../../validators/data';

@Component({
  selector: 'app-detalhe-usuario',
  standalone: true,
  imports: [NgIf, FormsModule, NgxMaskDirective, ReactiveFormsModule, JsonPipe],
  providers: [provideNgxMask({})],
  templateUrl: './detalhe-usuario.component.html',
  styleUrl: './detalhe-usuario.component.css'
})
export class DetalheUsuarioComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder
  ) { }

  public usuario!: Usuario;

  formGroup!: FormGroup;


  ngOnInit(): void {
    this.detalharUsuario();

    this.formGroup = this.formBuilder.group( {
      cpf: ["", [Validators.required, CpfValidator.validacaoIntegridade]],
      nome: ["", [Validators.required, NomeValidator.validacaoNomeSobrenome]],
      dataNascimento: ["", [Validators.required, DataValidator.validacaoIdade18e60]],
      renda: ["", [Validators.required]],
      dataCadastro: ["", [Validators.required]],
      email: ["", [Validators.required]]
    });

  }

  private detalharUsuario(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id > 0)
      this.usuarioService.obterUsuario(id).then((usuario) => {
        if(!usuario) {
          // msg de não encontrado
          this.voltar();
        }

        this.usuario = usuario;

        this.formGroup.setValue({
          cpf: this.usuario.cpf,
          nome: this.usuario.nome,
          dataNascimento: this.usuario.dataNascimento,
          renda: this.usuario.rendaMensal,
          dataCadastro: this.usuario.dataCadastro,
          email: this.usuario.email
        });
        this.formGroup.controls['cpf'].disable();
      });
    else
      this.usuario  = {
        id: "0",
        nome: "",
        cpf: "",
        dataCadastro: "",
        dataNascimento: "",
        email: "",
        rendaMensal: 0
      }
  }

  salvarUsuario(): void {
    this.usuario.cpf = this.formGroup.controls['cpf'].value;
    this.usuario.nome = this.formGroup.controls['nome'].value;
    this.usuario.dataNascimento = this.formGroup.controls['dataNascimento'].value;
    this.usuario.rendaMensal = this.formGroup.controls['renda'].value;
    this.usuario.dataCadastro = this.formGroup.controls['dataCadastro'].value;
    this.usuario.email = this.formGroup.controls['email'].value;
    
    this.usuarioService.salvarUsuario(this.usuario)
    .then(() => {
      // Mensagem avisando sucesso
      this.router.navigateByUrl('/');
    })
    .catch((err) => {
      // Mensagem avisando do erro
      console.log(this.usuario);
      console.log(err);
    });
  }

  voltar(): void {
    this.location.back();
  }
}
