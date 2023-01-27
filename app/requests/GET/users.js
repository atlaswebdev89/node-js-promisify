const { uuid_valid } = require("../../validates.js");
const get_api_users = (request, response, users) => {
  console.log(__dirname);
  // get all users (get request)
  process.stdout.write("Status: 200\nResponse: request success\n");
  response.statusCode = 200;
  response.write(JSON.stringify(users) + "\n");
  response.end();
};

//get user for UUID
const get_user = (request, response, users) => {
  const uuid = request.url.split("/").slice(-1).join();
  const valid = uuid_valid(uuid);
  if (valid) {
    const result = users.find((item) => item.uuid === uuid);
    if (result) {
      process.stdout.write("Status: 200\nResponse: get user success\n");
      response.writeHead(200);
      response.write(JSON.stringify(result));
      response.end("\n");
    } else {
      process.stdout.write("Status: 404\nResponse: not found user\n");
      const error = {
        statusCode: 404,
        message: "Not found users is get UUID",
      };
      throw new Error(JSON.stringify(error));
    }
  } else {
    process.stdout.write("Status: 400\nResponse: in valid uuid\n");
    const error = {
      statusCode: 400,
      message: "Get parametr uuid not valid",
    };
    throw new Error(JSON.stringify(error));
  }
};

module.exports = { get_api_users, get_user };
