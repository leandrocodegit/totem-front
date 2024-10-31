export enum Efeito {
    COLORIDO = 'COLORIDO',
    BATIDA = 'BATIDA',
    CONTADOR = 'CONTADOR',
    CILONIO = 'CILONIO',
    GIROFLEX = 'GIROFLEX',
    GIRATORIO = 'GIRATORIO',
    SINALIZADOR = 'SINALIZADOR'
}


export const EfeitoValue: Record<Efeito, string> = {
  [Efeito.COLORIDO]: 'Cor fixa',
  [Efeito.BATIDA]: 'Batida',
  [Efeito.CONTADOR]: 'Contador',
  [Efeito.CILONIO]: 'Cilônio',
  [Efeito.GIROFLEX]: 'Giroflex',
  [Efeito.GIRATORIO]: 'Giratório',
  [Efeito.SINALIZADOR]: 'Sinalizador',
}

