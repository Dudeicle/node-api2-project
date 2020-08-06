const express = require("express");
const helmet = require("helmet");

const apiRouter = require("./routers/posts-router");

const server = express();

server.use(helmet());

server.use("/api", apiRouter);

module.exports = server;
