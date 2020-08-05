const express = require("express");

const postsRouter = require("./routers/posts-router");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
	res.send(`
    <h2>Lambda Node Day 2</h>
  `);
});

server.use("/api/posts", postsRouter);

server.listen(4000, () => {
	console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
