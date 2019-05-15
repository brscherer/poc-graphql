const express = require("express");
const graphql = require("express-graphql");
const schema = require("./schema");

const app = express();

app.use(
  "/graphql",
  graphql({
    schema: schema,
    graphiql: true
  })
);

console.log("Server is running on http://localhost:3000");
app.listen(3000);
