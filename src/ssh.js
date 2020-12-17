const net = require("net");
const utils = require("./utils");

const {
  host = "0.0.0.0",
  port = 2222,
} = process.env;

const server = net.createServer();

server.on("connection", handleConnection);

server.listen({
  host,
  port,
});

/**
 *
 * @param {net.Socket} socket
 */
async function handleConnection(socket) {
  const { remoteAddress, remotePort } = socket;
  const ip = `${remoteAddress}:${remotePort}`

  console.log(`Connected to ${ip}`);

  socket.once('close', () => console.log(`Closed connection to ${ip}`));
  socket.once('error', err => { });


  try {
    while (true) {
      await utils.sleep(10000);
      await utils.writeToSocket(socket, `${utils.generateNumber()}\r\n`);
    }
  } catch { }
}
