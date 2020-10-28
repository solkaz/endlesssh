const net = require("net");
const utils = require("./utils");

/**
 *
 * @param {net.Socket} socket
 */
async function handleConnection(socket) {
  try {
    while (true) {
      await utils.sleep(10000);
      await utils.writeToSocket(socket, `${utils.generateNumber()}\r\n`);
    }
  } catch {}
}

const server = net.createServer();

server.on("connection", handleConnection);

server.listen({
  host: "localhost",
  port: 2222,
});
