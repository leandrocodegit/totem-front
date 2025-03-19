import { Cor } from "./cor.model";
import { Comando } from "./constantes/comando";
import { Endereco } from "./endereco.model";
import { Configuracao } from "./configuracao.model";
import { Agenda } from "./agenda.model";
import { Cliente } from "./cliente.model";


export interface Dispositivo {
  selecionado: boolean;
  id: number;
  cliente?: Cliente;
  clienteId: string;
  nome: string;
  ip: string;
  versao: string;
  ignorarAgenda: boolean;
  memoria: number;
  ativo: boolean;
  permiteComando: boolean;
  conexao: Conexao;
  cor: Cor;
  comando: Comando,
  endereco?: Endereco,
  enderecoCompleto: string;
  timer: boolean;
  operacao: Operacao;
  sensibilidadeVibracao: number;
}

interface Conexao
{
  ultimaAtualizacao: string;
  status: string;
  tipoConexao: string;
  statusMCU: string;
  habilitarEth: boolean;
  habilitarWifi: boolean;
  habilitarLoraWan: boolean;
  ssid: string;
  senha: string;
  modoLora: number;
  classe: String;
  devEui: String;
  appEui: String;
  appKey: String;
  nwkSKey: String;
  appSKey: String;
  devAddr: String;
  txPower: number;
  dataRate: number;
  adr: boolean;
  snr: number;
  rssi: number;
  autoJoin: boolean;
  tempoAtividade: number;
  fracionarMensagem: boolean;
  latitude: number;
  longitude: number;
}

interface Operacao
{
  modoOperacao: string;
  corTemporizador: Cor;
  corVibracao?: Cor;
  time: Date;
  agenda: Agenda
}
