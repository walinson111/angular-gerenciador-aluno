import { Component, OnInit, inject } from '@angular/core';
import { AlunosService, Aluno } from '../aluno';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alunos',
  imports: [FormsModule],
  templateUrl: './alunos.html',
  standalone: true,
  styleUrl: './alunos.css',
})
export class Alunos {
  private api = inject(AlunosService);

  alunos: Aluno[] = [];
  carregando = false;
  salvando = false;
  erro = '';

  // bindings do form
  nome = '';
  idade: number | null = null;
  curso = '';
  notasCsv = ''; // ex.: "7,8,9"

  ngOnInit() { this.carregar(); }

  carregar() {
    this.carregando = true;
    this.api.listar().subscribe({
      next: xs => { this.alunos = xs; this.carregando = false; },
      error: e => { this.erro = e.message ?? 'Falha ao carregar';
        this.carregando = false; }
    })
  }

  criar() {
    if (!this.nome || this.idade == null || !this.curso) return;

    const notas = this.notasCsv
    .split(',').map(s => Number(s.trim()))
    .filter(n => !Number.isNaN(n));

    const aluno: Aluno = {
      nome: this.nome,
      idade: Number(this.idade),
      curso: this.curso, notas
    };

    this.salvando = true;
    this.api.criar(aluno).subscribe({
      next: _ => {
        this.nome = ''; this.idade = null; this.curso = '';
        this.notasCsv = '';
        this.salvando = false; this.carregar();
      },
      error: e => { this.erro = e.message ?? 'Falha ao criar';
        this.salvando = false; }
    })
  }

    excluir(id?: string) {
      if (!id) return;
      this.api.excluir(id).subscribe({
        next: _ => this.carregar(),
        error: e => this.erro = e.message ?? 'Falha ao excluir'
      });
    }
  }

