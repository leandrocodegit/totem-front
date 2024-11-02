import { DashboardItem } from "./dashboard-item.model";
import { Dispositivo } from "./dispositivo.model";
import { Logconexao } from "./log-conexao.model";
import { Log } from "./log.model";


export interface Dashboard {
  usuariosAtivos: number;
  usuariosInativos: number;
  dispositivos: Dispositivo[];
  cores: DashboardItem[];
  agendas: DashboardItem[];
  logs: Log[];
  logsConexao: Logconexao[];
}
