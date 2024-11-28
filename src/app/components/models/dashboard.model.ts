import { Agenda } from "./agenda.model";
import { DashboardItem } from "./dashboard-item.model";
import { Dispositivo } from "./dispositivo.model";
import { Logconexao } from "./log-conexao.model";
import { Log } from "./log.model";


export interface Dashboard {
  usuariosAtivos: number;
  usuariosInativos: number;
  dispositivos: DispositivoDash;
  cores: DashboardItem[];
  agendas: DashboardItem[];
  agendasExecucao: DashboardItem[];
  logs: Log[];
  logsConexao: Logconexao[];
}


export interface DispositivoDash {
  total: number;
  online: number;
  offline: number;
}
