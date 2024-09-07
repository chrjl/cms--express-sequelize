const express = require('express');
const createHttpError = require('http-errors');
const models = require('../../models');

const { Post, Keyword } = models;
Post.hasMany(Keyword);
Keyword.belongsTo(Post, { foreignKey: 'postId' });

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
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
  })
  .post(async (req, res) => {
    const post = await Post.create(req.body);
    res.json({ id: post.id });
  });

router
  .route('/:postId')
  .all(async (req, res, next) => {
    const post = await Post.findByPk(req.params.postId);

    if (post === null && req.method !== 'DELETE') {
      return next(createHttpError(404));
    }

    res.locals.post = post;
    next();
  })
  .get(async (req, res) => {
    res.json(res.locals.post);
  })
  .put(async (req, res, next) => {
    const id = req.params.postId;
    const { title, description, body } = req.body;

    await Post.update({ title, description, body }, { where: { id } });
    res.sendStatus(200);
  })
  .delete(async (req, res) => {
    await Post.destroy({
      where: { id: req.params.postId },
    });

    await Keyword.destroy({
      where: { postId: req.params.postId },
    });

    res.sendStatus(204);
  });

router
  .route('/:postId/keywords')
  .get(async (req, res, next) => {
    const post = await Post.findByPk(req.params.postId);

    if (post === null) {
      return next(createHttpError(404));
    }

    const keywords = await Keyword.findAll({
      attributes: ['keyword'],
      where: { postid: req.params.postId },
    });

    res.json(keywords.map(({ keyword }) => keyword));
  })
  .post(async (req, res, next) => {
    const post = await Post.findByPk(req.params.postId);

    if (post === null) {
      return next(createHttpError(404));
    }

    const [keyword, created] = await Keyword.findOrCreate({
      where: {
        postId: req.params.postId,
        keyword: req.body.keyword,
      },
    });

    res.sendStatus(201);
  });

router.route('/:postId/keywords/:keyword').delete(async (req, res) => {
  await Keyword.destroy({
    where: {
      postId: req.params.postId,
      keyword: req.params.keyword,
    },
  });

  res.sendStatus(204);
});

module.exports = router;
