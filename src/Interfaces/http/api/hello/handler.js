class HelloHandler {
  constructor() {
    this.helloWorldHandler = this.helloWorldHandler.bind(this);
  }

  async helloWorldHandler(request, h) {
    return {
      status: 'success',
      message: 'Hello, World!',
    };
  }
}

module.exports = HelloHandler;
