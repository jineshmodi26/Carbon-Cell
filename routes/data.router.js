const express = require("express")
const router = express.Router()
const dataCtrl = require("../controllers/data.controller")
const auth = require("../middlewares/authentication")

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/data/v1:
 *   get:
 *     summary: Get data with optional category and limit
 *     description: Retrieve data with optional category filter and limit.
 *     parameters:
 *      - in: query
 *        name: category
 *        schema:
 *          type: string
 *        required: false
 *        description: Filter data by category
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        required: false
 *        description: Limit the number of data entries (default is no limit)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Protected data
 *       401:
 *         description: Unauthorized. Authorization token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating unauthorized access
 *       400:
 *         description: Bad request. Authorization token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating invalid token or failed authorization
 */

router.get("/", auth, dataCtrl.getData);

module.exports = router