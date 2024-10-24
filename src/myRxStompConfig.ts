
export const myRxStompConfig: any = {
  brokerURL: 'ws://localhost:8000/ws?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwaXp6dXJnLWFwaSIsImlhdCI6MTcyOTc5MTA5MywiZXhwIjoxNzI5ODA1NDkzLCJzdWIiOiJhZG1pbiJ9.oqDkujjyam1l8HY2b6McsL-ohwB-Hx95XrbbIsJdrMU',
  //brokerURL: 'ws://localhost:9001',
  connectHeaders: {
    "Authorization": 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcyOTc4NTMxMSwiZXhwIjoxNzI5Nzg4OTExfQ.U7Cgs1JJzmJ70UmhV96sH_mmDiasxLoGSt3z2FB0MYI',

  },


  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,

  reconnectDelay: 1000,

  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
};
