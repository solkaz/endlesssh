const net = require("net");

/**
 * Generates a random number from 0 - 2^32
 * @returns {number}
 */
function generateNumber() {
  return Math.trunc(Math.random() * 2 ** 32);
}

/**
 * Returns a `Promise` that resolves when a certain amount of milliseconds
 * (specified by `timeout`) has elapsed.
 * 
 * @param {number} timeout
 */
async function sleep(timeout) {
  return new Promise((res) => setTimeout(res, timeout));
}

/**
 * Writes `content` to `socket`.
 * Returns a `Promise` that resolves when the content has been written,
 * or rejects if there was an error.
 * @param {net.Socket} socket
 * @param {*} content
 */
async function writeToSocket(socket, content) {
  return new Promise((res, rej) => {
    socket.write(content, (err) => {
      if (err && err.code !== 'EPIPE') {
        rej(err)
      }
      res()
    })
  });
}

module.exports = {
  generateNumber,
  sleep,
  writeToSocket,
};
