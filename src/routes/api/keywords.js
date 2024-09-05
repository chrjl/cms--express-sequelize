const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();

const models = require('../../models');
const { Keyword } = models;

router.get('/', async (req, res) => {
  const keywords = await Keyword.findAll({
    attributes: [
      [sequelize.fn('DISTINCT', sequelize.col('keyword')), 'keyword'],
    ],
  });

  res.json(keywords.map(({ keyword }) => keyword));
});

router.get('/:keyword', async (req, res, next) => {
  const postIds = await Keyword.findAll({
    attributes: ['postId'],
    where: {
      keyword: req.params.keyword,
    },
  });

  res.json(postIds.map(({ postId }) => postId));
});

module.exports = router;
