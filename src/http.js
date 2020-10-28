const net = require("net");
const utils = require("./utils");

/**
 *
 * @param {net.Socket} socket
 */
async function handleConnection(socket) {
  try {
    await utils.writeToSocket(socket, "HTTP/1.1 200 OK\r\n");
    while (true) {
      const header = `X-${utils.generateNumber()}`;
      const value = `${utils.generateNumber()}`;
      await utils.writeToSocket(socket, `${header}: ${value}\r\n`);
      await utils.sleep(5000);
    }
  } catch {}
}

const server = net.createServer();

server.on("connection", handleConnection);

server.listen({
  host: "localhost",
  port: 8080,
});
