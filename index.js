const port = process.env.PORT || 2525;
const server = require("./server.js");

server.listen(port, () => console.log(`Listening on port ${port}`));
