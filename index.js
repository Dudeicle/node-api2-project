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

const port = process.env.PORT || 4000;

server.listen(port, () => {
	console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
