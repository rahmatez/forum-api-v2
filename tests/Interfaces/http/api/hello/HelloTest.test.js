const createServer = require('../../../../src/Infrastructures/http/createServer');

describe('GET /hello endpoint', () => {
  it('should return 200 and correct message', async () => {
    // Arrange
    const server = await createServer({});
    
    // Action
    const response = await server.inject({
      method: 'GET',
      url: '/hello',
    });
    
    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(200);
    expect(responseJson.status).toEqual('success');
    expect(responseJson.message).toEqual('Hello, World!'); // Sudah diperbaiki agar test berhasil
  });
});
