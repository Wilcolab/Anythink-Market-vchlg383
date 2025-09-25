/**
 * @module routes/api/comments
 * @description Express router for handling comment-related API endpoints.
 */

 /**
    * GET /
    * Retrieves all comments from the database.
    * @async
    * @function
    * @param {express.Request} req - Express request object.
    * @param {express.Response} res - Express response object.
    * @returns {Object[]} 200 - Array of comment objects.
    * @returns {Object} 500 - Error message if fetching fails.
    */

 /**
    * DELETE /:id
    * Deletes a comment by its ID.
    * @function
    * @param {express.Request} req - Express request object, with comment ID in params.
    * @param {express.Response} res - Express response object.
    * @returns {Object} 200 - Success message if comment is deleted.
    * @returns {Object} 404 - Error message if comment not found.
    * @returns {Object} 500 - Error message if deletion fails.
    */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

//add another endpoint for deleting a comment by its ID
router.delete("/:id", (req, res) => {
    Comment.findByIdAndDelete(req.params.id, (err, comment) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete comment" });
        }
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
    });
});
