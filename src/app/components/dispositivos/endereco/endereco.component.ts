import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    NgIf,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.css'
})
export class EnderecoComponent implements OnInit, AfterViewInit {

  @Input() dispositivo: any;
  @Input() endereco: Endereco = new Endereco;
  protected form: FormGroup;
  protected selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  protected estados = ESTADOS;

  protected cidades: string[] = []
  constructor(
    private http: HttpClient,
    private formBuild: FormBuilder
  ) {

    this.form = this.formBuild.group({
      'cep': [''],
      'state': ['', Validators.required],
      'city': ['', Validators.required],
      'neighborhood': ['', Validators.required],
      'street': ['', Validators.required],
      'numero': ['', Validators.required]
    });


  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {


    if(this.endereco?.state){
      var state = this.endereco?.state;
      var city = this.endereco?.city;
      this.carregarCidade(state, city);
    }
  }

  consultaCep(event: any) {

    if (event.target.value && event.target.value.replace('-','').length == 8)
      this.http.get('https://brasilapi.com.br/api/cep/v2/' + event.target.value.replace('-','')).subscribe((response: any) => {
        response.city = this.normalizeText(response.city);
        this.carregarCidade(response.state, response.city);
        this.endereco.street = response.street;
        this.endereco.state = response.state;
        this.endereco.neighborhood = response.neighborhood;
        this.endereco.city = response.city;
      });
  }

  carregarCidade(state: string, city: string){
    this.cidades.push(city);
    this.listaCidade(state);
  }

  listaCidade(estado: string) {
    this.http.get('https://brasilapi.com.br/api/ibge/municipios/v1/' + estado).subscribe((response: any) => {
      this.cidades = response.map((city:any) => this.normalizeText(city.nome));
    })

  }

  atualizouEstado(){
    console.log('aa', this.endereco);
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
    return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ');
  }

}
