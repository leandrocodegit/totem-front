import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Dispositivo } from '../../models/dispositivo.model';
import { Endereco } from '../../models/endereco.model';
import { ESTADOS } from '../../models/constantes/Estados';

@Component({
  selector: 'app-endereco',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf, NgFor,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.css'
})
export class EnderecoComponent implements OnInit {

  @Input() dispositivo!: Dispositivo;
  protected form: FormGroup;
  protected selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  protected estados = ESTADOS;

  protected cidades: string[] = []
  constructor(
    private http: HttpClient,
    private formBuild: FormBuilder
  ) {

    this.form = this.formBuild.group({
      'cep': ['', Validators.required],
      'state': ['', Validators.required],
      'city': ['', Validators.required],
      'neighborhood': ['', Validators.required],
      'street': ['', Validators.required],
      'numero': ['', Validators.required]
    });


  }

  ngOnInit(): void {
    if(this.dispositivo && !this.dispositivo?.endereco){
      this.dispositivo.endereco = {
        cep: "",
        state: "",
        city: "",
        neighborhood: "",
        street: "",
        complemento: "",
        numero: "",
        location: {
          type: "",
          string: ""
        }
      }
    }else{
      this.cidades.push(this.dispositivo.endereco.city);
      this.listaCidade(this.dispositivo.endereco.state);
    }
  }

  consultaCep(event: any) {

    if (event.target.value && event.target.value.length == 8)
      this.http.get('https://brasilapi.com.br/api/cep/v2/' + event.target.value).subscribe((response: any) => {
        response.city = this.normalizeText(response.city.toUpperCase());
        this.cidades.push(response.city);
        this.listaCidade(response.state);
        this.dispositivo.endereco = response;
        console.log(this.dispositivo.endereco.city);

      });
  }

  listaCidade(estado: string) {
    this.http.get('https://brasilapi.com.br/api/ibge/municipios/v1/' + estado).subscribe((response: any) => {
      this.cidades = response.map((city:any) => city.nome);
    })

  }

  possuiErro(form: any) {
    if (!form || !form.errors || !form.touched) {
      return false
    }
    return form.errors.required
  }

  isValid(name: string): boolean {
    const form = this.form.controls[name];
    if (form)
      return form.valid;
    return false;
  }

  normalizeText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace('\n', ' ').replace(/\s+/g, ' ');;
  }

}
