const get = (request) => {
  return new Promise((resolve, reject) => {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk.toString();
    });

    request.on("end", () => {
      resolve(data);
    });

    request.on("error", (err) => {
      reject(err);
    });
  });
};

const getBodyRequest = () => {
  return function (...args) {
    return new Promise((resolve, reject) => {
      let data = "";
      args[0].on("data", (chunk) => {
        data += chunk.toString();
      });

      args[0].on("end", () => {
        resolve(data);
      });

      args[0].on("error", (err) => {
        reject(err);
      });
    });
  };
};

module.exports = { get, getBodyRequest };
