const createServer = require('../src/Infrastructures/http/createServer');
const container = require('../src/Infrastructures/container');

let server;

const init = async () => {
  if (!server) {
    server = await createServer(container);
  }
  return server;
};

module.exports = async (req, res) => {
  try {
    const server = await init();
    
    // Convert Vercel request to Hapi inject format
    const response = await server.inject({
      method: req.method,
      url: req.url,
      payload: req.body,
      headers: req.headers,
    });

    // Set response headers
    Object.keys(response.headers).forEach(key => {
      res.setHeader(key, response.headers[key]);
    });

    // Set status code and send response
    res.status(response.statusCode);
    
    if (typeof response.result === 'string') {
      res.send(response.result);
    } else {
      res.json(response.result);
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};
