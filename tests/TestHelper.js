/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const TestHelper = {
  async cleanTable() {
    await pool.query("DELETE FROM likes WHERE 1=1");
    await pool.query("DELETE FROM comments WHERE 1=1");
    await pool.query("DELETE FROM threads WHERE 1=1");
    await pool.query("DELETE FROM authentications WHERE 1=1");
    await pool.query("DELETE FROM users WHERE 1=1");
  },

  async addUser({
    id = "user-123",
    username = "dicoding",
    password = "secret",
    fullname = "Dicoding Indonesia",
  }) {
    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4)",
      values: [id, username, password, fullname],
    };

    await pool.query(query);
  },

  async findUsersById(id) {
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async addThread({
    id = "thread-123",
    title = "sebuah thread",
    body = "sebuah body thread",
    date = "2021-08-08T07:59:16.198Z",
    owner = "user-123",
  }) {
    const query = {
      text: "INSERT INTO threads VALUES($1, $2, $3, $4, $5)",
      values: [id, title, body, date, owner],
    };

    await pool.query(query);
  },

  async findThreadsById(id) {
    const query = {
      text: "SELECT * FROM threads WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async addComment({
    id = "comment-123",
    content = "sebuah comment",
    date = "2021-08-08T07:59:16.198Z",
    owner = "user-123",
    threadId = "thread-123",
    isDelete = false,
  }) {
    const query = {
      text: "INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6)",
      values: [id, content, date, owner, threadId, isDelete],
    };

    await pool.query(query);
  },

  async findCommentsById(id) {
    const query = {
      text: "SELECT * FROM comments WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },
};

module.exports = TestHelper;
