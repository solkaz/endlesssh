const net = require("net");
const utils = require("./utils");

const {
  host = "0.0.0.0",
  port = 8080,
} = process.env;

const server = net.createServer();

server.once('listening', () => console.log(`Listening at ${host}:${port}`))

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
    await utils.writeToSocket(socket, "HTTP/1.1 200 OK\r\n");
    while (socket.writable) {
      const header = `X-${utils.generateNumber()}`;
      const value = `${utils.generateNumber()}`;
      await utils.writeToSocket(socket, `${header}: ${value}\r\n`);
      await utils.sleep(1000);
    }
  } catch { }
}
