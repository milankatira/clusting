const http = require("http");
function performHeavyCalculations() {
  let result = 0;
  for (let i = 0; i < 100000000; i++) {
    // perform 100 million iterations
    result += Math.sqrt(i);
  }
  return result;
}

const server = http.createServer((req, res) => {
  const startTime = new Date();
  const result = performHeavyCalculations();
  const endTime = new Date();
  const elapsedTime = endTime - startTime;

  res.writeHead(200);
  res.end(
    `Heavy calculations result: ${result}, Elapsed time: ${elapsedTime}ms\n`
  );
});

server.listen(8000, () => {
  console.log(`Server running at http://localhost:8000/`);
});
