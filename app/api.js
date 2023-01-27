const http = require("http");

// endpoint api
const { get_api_users, get_user } = require("./requests/GET/users.js");
const { create_users } = require("./requests/POST/users.js");
const { edit_user } = require("./requests/PUT/users.js");
const { delete_user } = require("./requests/DELETE/users.js");
//

require("dotenv").config();

const PORT = process.env.PORT || null;
if (PORT === null) {
  console.log("\nNot set port or not found .env file");
  process.exit();
}

// array data in-memory
const users = [];
// Api server
http
  .createServer(async function (request, response) {
    process.stdout.write(
      "\nMethod: " + request.method + "\nRequest URL: " + request.url + "\n"
    );
    response.setHeader("Content-Type", "application/json");
    try {
      // router
      switch (true) {
        //get all users (get or head request)
        case request.url === "/api/users" &&
          (request.method === "GET" || request.method === "HEAD"):
          get_api_users(request, response, users);
          break;
        // create new user (post request)
        case request.url === "/api/users" && request.method === "POST":
          await create_users(request, response, users);
          break;
        // get user from uuid
        case (request.url.match("/api/users/[a-zA-Z0-9-]+$") ? true : null) &&
          (request.method === "GET" || request.method === "HEAD"):
          get_user(request, response, users);
          break;
        // edit user data
        case (request.url.match("/api/users/[a-zA-Z0-9-]+$") ? true : null) &&
          request.method === "PUT":
          await edit_user(request, response, users);
          break;
        // delete user
        case (request.url.match("/api/users/[a-zA-Z0-9-]+$") ? true : null) &&
          request.method === "DELETE":
          await delete_user(request, response, users);
          break;
        // not found url api
        default:
          await endpoints_not_found(response);
      }
    } catch (err) {
      response.writeHead(JSON.parse(err.message).statusCode);
      response.write(err.message);
      response.end("\n");
    }
  })
  .listen(PORT, "127.0.0.1", () => {
    console.log("Start http server!");
    console.log("Сервер начал прослушивание запросов на порту " + PORT);
  });

// handler not found endpoint api
const endpoints_not_found = async () => {
  process.stdout.write("Status: 404\nResponse: endpoints not found\n");
  const message = {
    statusCode: 404,
    message: "Uri api http not found",
  };
  throw new Error(JSON.stringify(message));
};
