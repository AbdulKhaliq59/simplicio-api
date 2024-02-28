/**
 * @swagger
 * /user/:
 *   post:
 *     summary: Sign in a user
 *     tags: [User]
 *     description: Sign in an existing user with their email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       201:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: A status indicating success
 *                 message:
 *                   type: string
 *                   description: A welcome message for the user
 *                 data:
 *                   type: string
 *                   description: The JWT token assigned to the user
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the user was not found
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the password is incorrect or the account is not verified
 *                 auth_error:
 *                   type: string
 *                   description: Error message indicating that the user is not authorized
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Sign up a new user
 *     tags: [User]
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: The date of birth of the user in YYYY-MM-DD format
 *               role:
 *                 type: string
 *                 enum: [superAdmin, admin, normal]
 *                 default: normal
 *                 description: The role of the user (superAdmin, admin, normal)
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 user:
 *                   type: object
 *                   description: The created user object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the user
 *                     name:
 *                       type: string
 *                       description: The name of the user
 *                     email:
 *                       type: string
 *                       description: The email address of the user
 *                     dateOfBirth:
 *                       type: string
 *                       format: date
 *                       description: The date of birth of the user in YYYY-MM-DD format
 *                     role:
 *                       type: string
 *                       enum: [superAdmin, admin, normal]
 *                       description: The role of the user
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the email is already in use
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Internal Server Error message
 */
