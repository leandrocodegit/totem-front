export enum Comando {
    ENVIAR = 'ENVIAR',
    ENVIADO = 'ENVIADO',
    ACEITO = 'ACEITO',
    SISTEMA = 'SISTEMA',
    NENHUM_DEVICE = 'NENHUM_DEVICE',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    SINCRONIZAR = 'SINCRONIZAR',
    TESTE = 'TESTE',
    CONCLUIDO = 'CONCLUIDO'
}

export const ComandoValue: Record<Comando, string> = {
  [Comando.ENVIAR]: 'Pendente',
  [Comando.ENVIADO]: 'Enviado',
  [Comando.ACEITO]: 'Aceito',
  [Comando.SISTEMA]: 'Sistema',
  [Comando.NENHUM_DEVICE]: 'Desconhecido',
  [Comando.ONLINE]: 'Online',
  [Comando.OFFLINE]: 'Offline',
  [Comando.SINCRONIZAR]: 'Sincronizar',
  [Comando.TESTE]: 'Teste',
  [Comando.CONCLUIDO]: 'Teste concluido',
};
