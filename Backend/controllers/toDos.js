const { pool } = require("../module/db");

const getToDos = async (req, res) => {
  const QUERY = `SELECT * FROM todo WHERE is_deleted = 0 ORDER BY todo_id;`;
  try {
    const result = await pool.query(QUERY);
    res.json(result.rows);
  } catch (error) {
    res.json(error.message);
  }
};

const createTodo = async (req, res) => {
  const { title } = req.body;
  const VALUE = [title];
  const QUERY = `INSERT INTO todo (title) VALUES ($1) RETURNING *;`;
  const GETALL = `SELECT * FROM todo WHERE is_deleted = 0 ORDER BY todo_id;`
  try {
    const result = await pool.query(QUERY, VALUE);
    const data = await pool.query(GETALL);
    res.json(data.rows);
  } catch (error) {
    res.json(error.message);
  }
};
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const delQuery = `UPDATE todo SET is_deleted = 1 WHERE todo_id = ${id};`;
  const QUERY = `SELECT * FROM todo WHERE is_deleted = 0 ORDER BY todo_id ;`;
  try {
    const SendReq = await pool.query(delQuery);
    const result = await pool.query(QUERY);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const toggleComplete = async (req, res) => {
  const { id } = req.params;
  const toggleQuery = `UPDATE todo SET complete = NOT complete WHERE todo_id = ${id};`;
  const QUERY = `SELECT * FROM todo WHERE is_deleted = 0 ORDER BY todo_id ;`;
  try {
    const update = await pool.query(toggleQuery);
    const result = await pool.query(QUERY);
    res.json(result.rows);
  } catch (error) {
    res.json(error);
  }
};
module.exports = { getToDos, createTodo, deleteTodo, toggleComplete };
