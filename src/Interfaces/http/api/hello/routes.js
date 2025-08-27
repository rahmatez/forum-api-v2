const routes = (handler) => ([
  {
    method: 'GET',
    path: '/hello',
    handler: handler.helloWorldHandler,
  },
]);

module.exports = routes;
