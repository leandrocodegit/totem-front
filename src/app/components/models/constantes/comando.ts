export enum Comando {
    ENVIAR = 'ENVIAR',
    ENVIADO = 'ENVIADO',
    ACEITO = 'ACEITO',
    SISTEMA = 'SISTEMA',
    NENHUM_DEVICE = 'NENHUM_DEVICE',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export const ComandoValue: Record<Comando, string> = {
  [Comando.ENVIAR]: 'Pendente',
  [Comando.ENVIADO]: 'Enviado',
  [Comando.ACEITO]: 'Aceito',
  [Comando.SISTEMA]: 'Sistema',
  [Comando.NENHUM_DEVICE]: 'Desconhecido',
  [Comando.ONLINE]: 'Online',
  [Comando.OFFLINE]: 'Offline',



};
