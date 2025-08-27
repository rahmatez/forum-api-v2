const HelloHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'hello',
  register: async (server) => {
    const helloHandler = new HelloHandler();
    server.route(routes(helloHandler));
  },
};
