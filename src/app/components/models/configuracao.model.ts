
export class Configuracao {

  leds: number;
  faixa: number;
  intensidade: number;


  constructor(
    leds = 255,
    faixa = 2,
    intensidade = 255,
  ) {
    this.leds = leds;
    this.faixa = faixa;
    this.intensidade = intensidade;
  }
}
