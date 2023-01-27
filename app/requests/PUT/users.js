const post = require("../../promisify.js");
const { validate_post_data, uuid_valid } = require("../../validates.js");

// change user
const edit_user = async (request, response, users) => {
  const body = await post.get(request);

  const prop = validate_post_data(body);
  // Бросам исключение если полученные json данные не полностью заполнены
  if (prop.statusCode) throw new Error(JSON.stringify(prop));

  const uuid = request.url.split("/").slice(-1).join();
  const valid = uuid_valid(uuid);

  if (valid) {
    // Search item for uuid
    const indexItem = users.findIndex((item) => item.uuid === uuid);
    if (indexItem != -1) {
      // change user
      prop.uuid = uuid;
      const changeUser = users.splice(indexItem, 1, prop);
      if (changeUser.length > 0) {
        process.stdout.write("Status: 200\nResponse: change user success\n");
        response.writeHead(200);
        response.write(JSON.stringify(prop));
        response.end("\n");
      } else {
        process.stdout.write("Status: 400\nResponse: change user fail\n");
        const error = {
          statusCode: 400,
          message: "Change user data fail!",
        };
        throw new Error(JSON.stringify(error));
      }
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

module.exports = { edit_user };
