const WebSocket = require('ws');

const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const connection = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);

//Asset Index to check list of request indexes
//Ticks stream to get ticks response
//Check documentation for example of ticks stream syntax

const tickStream = () => {
  const request = { ticks: 'frxAUDJPY' };
  if (connection.readyState === WebSocket.OPEN) {
    connection.send(JSON.stringify(request));
  } else {
    console.log('WebSocket connection is not open yet.');
  }
};

const tickResponse = (data) => {
  const response = JSON.parse(data);
  if (response.error !== undefined) {
    console.log('Error:', response.error.message);
    connection.removeListener('message', tickResponse);
    connection.close();
  }
  if (response.msg_type === 'tick') {
    console.log(response.tick);
  }
};

const subscribeTicks = () => {
  connection.on('open', () => {
    tickStream();
  });

  connection.on('message', tickResponse);
};

const unsubscribeTicks = () => {
  connection.removeListener('message', tickResponse);
  connection.close();
};

subscribeTicks();

// To unsubscribe, uncomment the line below

// unsubscribeTicks();
