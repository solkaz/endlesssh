const net = require("net");

/**
 * Generates a random number from 0 - 2^32
 * @returns {number}
 */
function generateNumber() {
  return Math.trunc(Math.random() * 2 ** 32);
}

/**
 *
 * @param {number} ms
 */
async function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

/**
 *
 * @param {net.Socket} socket
 * @param {*} content
 */
async function writeToSocket(socket, content) {
  return new Promise((res) => socket.write(content, res));
}

module.exports = {
  generateNumber,
  sleep,
  writeToSocket,
};
