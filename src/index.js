import express from "express";

import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3030, () => {
  console.log("Server up and running at port 3030");
});
