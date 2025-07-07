import http from "node:http";
import chalk from "chalk";
import fs from "node:fs/promises";
import path from "node:path";

const port = 4000;
const indexPath = path.join(path.resolve(), "/pages/index.html");

const getIndex = async () => {
  return await fs.readFile(indexPath);
};

const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    const index = await getIndex();
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(index);
  }
});

server.listen(port, () => {
  console.log(chalk.green(`server is running on port ${port}`));
});
