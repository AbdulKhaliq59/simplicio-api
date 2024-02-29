/**
 * @swagger
 * /church:
 *   post:
 *     summary: Add a new church
 *     tags: [Church]
 *     description: |
 *       Add a new church with details including image upload and charity actions.
 *       - Ensure you use the "multipart/form-data" content type.
 *       - For charityActions, use the key "charityActions[]" for each item in the array.
 *       - Example: To pass ["action1", "action2"], use "charityActions[]=action1" and "charityActions[]=action2".
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user ID associated with the church
 *               name:
 *                 type: string
 *                 description: The name of the church
 *               sloganMessage:
 *                 type: string
 *                 description: The slogan message of the church
 *               charityActions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of strings representing charity actions
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file representing the church
 *     responses:
 *       201:
 *         description: Church successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the success of the operation
 *                 church:
 *                   type: object
 *                   description: The details of the added church
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: The user ID associated with the church
 *                     name:
 *                       type: string
 *                       description: The name of the church
 *                     sloganMessage:
 *                       type: string
 *                       description: The slogan message of the church
 *                     charityActions:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Array representing charity actions
 *                     image:
 *                       type: string
 *                       description: URL of the uploaded image
 *                 churchWebsiteLink:
 *                   type: string
 *                   description: The link to access the website of the created church
 *                 qrCode:
 *                   type: string
 *                   description: The data URI of the generated QR code
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the failure of the operation
 *                 error:
 *                   type: string
 *                   description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /church:
 *   get:
 *     summary: Get all churches
 *     tags: [Church]
 *     description: Retrieve a list of all churches. This endpoint is accessible only to admin users.
 *     responses:
 *       200:
 *         description: Successful retrieval of churches
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the success of the operation
 *                 churches:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Details of a church
 *                     properties:
 *                       userId:
 *                         type: string
 *                         description: The user ID associated with the church
 *                       name:
 *                         type: string
 *                         description: The name of the church
 *                       sloganMessage:
 *                         type: string
 *                         description: The slogan message of the church
 *                       charityActions:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Array representing charity actions
 *                       image:
 *                         type: string
 *                         description: URL of the uploaded image
 *                       qrCodeData:
 *                         type: string
 *                         description: The data URI of the generated QR code
 *       401:
 *         description: Unauthorized, invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the cause of failure
 *       403:
 *         description: Access denied, user does not have admin privileges
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the cause of failure
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /church/{churchId}:
 *   get:
 *     summary: Get a single church by ID
 *     tags: [Church]
 *     description: Retrieve details of a single church by providing its ID.
 *     parameters:
 *       - in: path
 *         name: churchId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the church to retrieve
 *     responses:
 *       200:
 *         description: Successful retrieval of the church
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the success of the operation
 *                 church:
 *                   type: object
 *                   description: Details of the retrieved church
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: The user ID associated with the church
 *                     name:
 *                       type: string
 *                       description: The name of the church
 *                     sloganMessage:
 *                       type: string
 *                       description: The slogan message of the church
 *                     charityActions:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Array representing charity actions
 *                     image:
 *                       type: string
 *                       description: URL of the uploaded image
 *                     qrCodeData:
 *                       type: string
 *                       description: The data URI of the generated QR code
 *       404:
 *         description: Church not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the failure of the operation
 *                 error:
 *                   type: string
 *                   description: Error message indicating the cause of failure
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the failure of the operation
 *                 error:
 *                   type: string
 *                   description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /church/{churchId}:
 *   put:
 *     summary: Update a church
 *     tags: [Church]
 *     description: Update details of an existing church including name, slogan message, and charity actions.
 *     parameters:
 *       - in: path
 *         name: churchId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the church to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the church
 *               sloganMessage:
 *                 type: string
 *                 description: The updated slogan message of the church
 *               charityActions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated array representing charity actions
 *     responses:
 *       200:
 *         description: Church successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the success of the operation
 *                 church:
 *                   type: object
 *                   description: The details of the updated church
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: The user ID associated with the church
 *                     name:
 *                       type: string
 *                       description: The updated name of the church
 *                     sloganMessage:
 *                       type: string
 *                       description: The updated slogan message of the church
 *                     charityActions:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Updated array representing charity actions
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the failure of the operation
 *                 error:
 *                   type: string
 *                   description: Error message indicating the cause of failure
 *       404:
 *         description: Church not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the failure of the operation
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the church was not found
 */

/**
 * @swagger
 * /church/{churchId}:
 *   delete:
 *     summary: Delete a church
 *     tags: [Church]
 *     description: Delete an existing church by ID.
 *     parameters:
 *       - in: path
 *         name: churchId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the church to be deleted
 *     responses:
 *       200:
 *         description: Church successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the success of the operation
 *                 message:
 *                   type: string
 *                   description: Success message indicating the church was deleted
 *       404:
 *         description: Church not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the failure of the operation
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the church was not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the failure of the operation
 *                 error:
 *                   type: string
 *                   description: Internal server error message
 */
