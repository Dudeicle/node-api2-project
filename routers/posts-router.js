const express = require("express");

const Actions = require("../data/db");

const router = express.Router();

router.get("/", (req, res) => {
	Actions.find()
		.then((array) => {
			res.status(200).json(array);
		})
		.catch((err) => {
			res
				.status(500)
				.json({ error: "The posts information could not be retrieved." });
		});
}); // WORKING
router.get("/:id", (req, res) => {
	Actions.findById(req.params.id)
		.then((arrayItem) => {
			if (arrayItem) {
				res.status(200).json(arrayItem);
			} else {
				res
					.status(500)
					.json({ message: "The post information could not be retrieved." });
			}
		})
		.catch((error) => {
			// log error to database
			console.log(error);
			res.status(404).json({
				message: "The post with the specified ID does not exist.",
			});
		});
}); // WORKING
router.get("/:id/comments", (req, res) => {
	Actions.findById(req.params.id)
		.then((commentId) => {
			Actions.findPostComments(req.params.id)
				.then((comments) => {
					res.status(201).json(comments);
				})
				.catch((err) => {
					res.status(500).json({
						message: "The comments information could not be retrieved.",
					});
				});
		})
		.catch((err) => {
			res
				.status(404)
				.json({ message: "The post with the specified ID does not exist." });
		});
}); // WORKING
router.post("/", (req, res) => {
	const post = req.body;

	if (!post.title || !post.contents) {
		res
			.status(400)
			.json({ errorMessage: "Please provide title and contents to your post" });
	} else {
		try {
			Actions.insert(post);
			res.status(201).json(post);
		} catch {
			res.status(500).json({
				error: "There was an error while saving the post to the database",
			});
		}
	}
}); // WORKING
router.post("/:id/comments", (req, res) => {
	const newComment = req.body;

	Actions.findById(req.params.id)
		.then((comments) => {
			if (!newComment.text) {
				res
					.status(400)
					.json({ message: "Please provide test for the comment." });
			} else {
				Actions.insertComment(newComment)
					.then((result) => {
						res.status(201).json(newComment);
					})
					.catch((err) => {
						res.status(500).json({
							message:
								"There was an error while saving the comment to the database",
						});
					});
			}
		})
		.catch((err) => {
			res
				.status(404)
				.json({ message: "The post with the specified ID does not exist." });
		});
}); // WORKING
router.delete("/:id", (req, res) => {
	Actions.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({ message: "The post has been nuked from orbit" });
			} else {
				res.status(500).json({ message: "The post could not be removed" });
			}
		})
		.catch((error) => {
			// log error to database
			console.log(error);
			res.status(404).json({
				message: "The post with the specified ID does not exist.",
			});
		});
}); // WORKING
router.put("/:id", (req, res) => {
	const updatedPost = req.body;

	Actions.findById(req.params.id)
		.then((arrayItem) => {
			// LEVEL 1
			if (!updatedPost.title || !updatedPost.contents) {
				res.status(400).json({
					errorMessage: "Please provide title and contents for the post.",
				});
			} else {
				try {
					Actions.update(req.params.id, updatedPost)
						.then((thing) => {
							res.status(200).json(thing);
						})
						.catch((error) => {
							res
								.status(500)
								.json({ error: "The post information could not be modified." });
						});
					res.status(201).json(updatedPost);
				} catch {
					res.status(500).json({
						error: "There was an error while trying to update this post",
					});
				}
			}
		})
		.catch((err) => {
			// LEVEL 1
			res
				.status(404)
				.json({ message: "The post with the specified ID does not exist." });
		});
}); // WORKING

module.exports = router;
// export default router
