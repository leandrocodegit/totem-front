import { WebSocketService } from "./app/broker/websocket.service";
import { myRxStompConfig } from "./myRxStompConfig";


export function rxStompServiceFactory() {
  const rxStomp = new WebSocketService();
  rxStomp.configure(myRxStompConfig);
  rxStomp.activate();
  return rxStomp;
}
