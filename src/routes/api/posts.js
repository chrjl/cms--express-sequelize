const express = require('express');
const createHttpError = require('http-errors');
const models = require('../../models');

const { Post, Keyword } = models;
Post.hasMany(Keyword);
Keyword.belongsTo(Post, { foreignKey: 'postId' });

const router = express.Router();

router.route('/').get(async (req, res) => {
  const posts = await Post.findAll({
    include: [{ model: Keyword, attributes: ['keyword'] }],
  });

  res.json(
    posts.map(
      ({ id, title, description, body, createdAt, updatedAt, Keywords }) => ({
        id,
        title,
        description,
        body,
        createdAt,
        updatedAt,
        keywords: Keywords.map(({ keyword }) => keyword),
      })
    )
  );
});

router.route('/:postId').get(async (req, res, next) => {
  const post = await Post.findByPk(req.params.postId);

  if (post === null) {
    return next(createHttpError(404));
  }

  res.json(post);
});

router.route('/:postId/keywords').get(async (req, res, next) => {
  const post = await Post.findByPk(req.params.postId);

  if (post === null) {
    return next(createHttpError(404));
  }

  const keywords = await Keyword.findAll({
    attributes: ['keyword'],
    where: { postid: req.params.postId },
  });

  res.json(keywords.map(({ keyword }) => keyword));
});

module.exports = router;
