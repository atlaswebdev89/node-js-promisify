const post = require("../../promisify.js");
const { validate_post_data } = require("../../validates.js");
const { randomUUID } = require("crypto");

// create new user (post request)
const create_users = async (request, response, users) => {
  const getBody = post.getBodyRequest();
  const body = await getBody(request);

  //const body = await post.get(request);
  const prop = validate_post_data(body);
  // Бросам исключение если полученные json данные не полностью заполнены
  if (prop.statusCode) throw new Error(JSON.stringify(prop));
  prop.uuid = randomUUID();
  users.push(prop);
  process.stdout.write("Status: 201\nResponse: create user success\n");
  response.writeHead(201);
  response.write(JSON.stringify(prop));
  response.end("\n");
};

module.exports = { create_users };
