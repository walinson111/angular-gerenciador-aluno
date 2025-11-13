import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aluno {
  _id?: string;
  nome: string;
  idade: number;
  curso: string;
  notas: number[];
}

@Injectable({
  providedIn: 'root',
})

export class AlunosService{
  private http = inject(HttpClient);
  private base = `http://localhost:3000/alunos`;

  listar(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.base);
  }
  buscarPorId(id: string): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.base}/${id}`);
  }
  criar(aluno: Aluno): Observable<Aluno> {
    console.log(aluno);
    return this.http.post<Aluno>(this.base, aluno);
  }
  atualizar(id: string, aluno: Partial<Aluno>): Observable<Aluno> {
    return this.http.patch<Aluno>(`${this.base}/${id}`, aluno);
  }
  excluir(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
