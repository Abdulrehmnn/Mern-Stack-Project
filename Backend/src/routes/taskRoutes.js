const express = require("express");
const router = express.Router();

const {
  createTask,
  getAllTasks,
} = require("../controllers/taskController");

/**
 * @swagger
 * /api/tasks/create:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *             example:
 *               title: Learn MERN
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post("/create", createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: List of all tasks
 */
router.get("/", getAllTasks);

module.exports = router;