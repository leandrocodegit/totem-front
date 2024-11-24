
export class Configuracao {

  leds: number;
  faixa: number;
  intensidade: number;
  tipoCor: string;


  constructor(
    leds = 255,
    faixa = 2,
    intensidade = 255,
    tipoCor = 'RGB'
  ) {
    this.leds = leds;
    this.faixa = faixa;
    this.intensidade = intensidade;
    this.tipoCor = tipoCor;
  }
}
