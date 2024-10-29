import { DashboardItem } from "./dashboard-item.model";
import { Log } from "./log.model";


export interface Dashboard {
  usuarios: DashboardItem;
  cores: DashboardItem;
  conexoes: DashboardItem;
  logs: Log[];
}
