import { DashboardItem } from "./dashboard-item.model";
import { Dispositivo } from "./dispositivo.model";
import { Log } from "./log.model";


export interface Dashboard {
  usuarios: number;  
  dispositivos: Dispositivo[];  
  cores: DashboardItem;
  logs: Log[];
}
