const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

function performHeavyCalculations() {
  let result = 0;
  for (let i = 0; i < 100000000; i++) {
    result += Math.sqrt(i);
  }
  return result;
}

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http
    .createServer((req, res) => {
      const startTime = new Date();
      const result = performHeavyCalculations();
      const endTime = new Date();
      const elapsedTime = endTime - startTime;

      res.writeHead(200);
      res.end(
        `Heavy calculations result: ${result}, Elapsed time: ${elapsedTime}ms\n`
      );
    })
    .listen(9000);

  console.log(`Worker ${process.pid} started`);
}
