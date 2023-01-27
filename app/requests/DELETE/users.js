const { uuid_valid } = require("../../validates.js");
//delete user

exports.delete_user = (request, response, users) => {
  const uuid = request.url.split("/").slice(-1).join();
  const valid = uuid_valid(uuid);

  if (valid) {
    // Search item for uuid
    const indexItem = users.findIndex((item) => item.uuid === uuid);
    if (indexItem != -1) {
      // delete user
      if (users.splice(indexItem, 1).length > 0) {
        process.stdout.write("Status: 204\nResponse: delete user success\n");
        const message = {
          statusCode: 204,
          message: "Response: delete user success",
        };
        response.writeHead(200);
        response.write(JSON.stringify(message));
        response.end("\n");
      } else {
        process.stdout.write("Status: 400\nResponse: delete user fail\n");
        const error = {
          statusCode: 400,
          message: "Delete user data fail!",
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
