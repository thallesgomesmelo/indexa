import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CantainerComponent } from './componentes/cantainer/cantainer.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { SeparadorComponent } from './componentes/separador/separador.component';
import { ContatoComponent } from './componentes/contato/contato.component';
import { FormsModule } from '@angular/forms';

interface Contato {
  id: number;
  nome: string;
  telefone: string;
}

import agenda from './agenda.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CantainerComponent,
    CabecalhoComponent,
    SeparadorComponent,
    ContatoComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz';
  contatos: Contato[] = agenda;

  filtroPorTexto: string = '';

  private removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filtrarContatosPortexto(): Contato[] {
    if (!this.filtroPorTexto) {
      return this.contatos;
    }

    return this.contatos.filter((contato) => {
      return contato.nome
        .toLowerCase()
        .includes(this.filtroPorTexto.toLowerCase());
    });
  }

  filtrarContatosPorLetraInicial(letra: string): Contato[] {
    return this.filtrarContatosPortexto().filter((contato) =>
      this.removerAcentos(contato.nome)
        .toLowerCase()
        .startsWith(this.removerAcentos(letra).toLowerCase())
    );
  }
}
