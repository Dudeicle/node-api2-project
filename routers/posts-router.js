const express = require("express");

const Actions = require("../data/db");

const router = express.Router();

router.get("/", (req, res) => {
	Actions.find()
		.then((array) => {
			res.status(200).json(array);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: error.message });
		});
});
router.get("/:id", (req, res) => {
	Actions.findById(req.params.id)
		.then((arrayItem) => {
			if (arrayItem) {
				res.status(200).json(arrayItem);
			} else {
				res.status(404).json({ message: "User not found" });
			}
		})
		.catch((error) => {
			// log error to database
			console.log(error);
			res.status(500).json({
				message: "Error retrieving the item by ID",
			});
		});
});
router.get("/:id/comments", (req, res) => {
	Actions.findPostComments()
		.then((comments) => {})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "Error retrieving the comments",
			});
		});
}); // not finished yet
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
});
router.post("/:id/comments", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {
	const updatedPost = req.body;

	Actions.findById(req.params.id)
		.then((arrayItem) => {
			if (!arrayItem) {
				res.status(404).json({ message: "User Not Found" });
			} else {
				Actions.update(arrayItem.id, updatedPost).then().catch();
			}
		})
		.catch((err) => {
			res.status(500).json({ message: "Find by Id failed" });
		});
});

module.exports = router;
// export default router
