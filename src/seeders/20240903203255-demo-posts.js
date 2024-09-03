'use strict';

const sampleData = [
  {
    title: 'My post about the California grizzly bear',
    description: 'The California state animal',
    body: 'Lorem sit provident sunt ratione autem? Laborum autem error minima ab doloremque quidem. Provident tempore eligendi maxime perferendis veritatis, nihil? Hic quibusdam laborum inventore neque corrupti Amet accusantium consequatur aperiam',
    keywords: ['california', 'animal', 'mammal'],
  },
  {
    title: 'My post about the California quail',
    description: 'The California state bird',
    body: 'Lorem obcaecati voluptas veritatis repellendus facere. Est et unde magnam ipsum nihil? Sit vero repudiandae dolorum minus aliquid? In voluptatem iste quasi necessitatibus consectetur tenetur! Delectus repellat at excepturi in',
    keywords: ['california', 'animal', 'bird'],
  },
  {
    title: 'My post about the California golden poppy',
    description: 'The California state flower',
    body: 'Adipisicing eos deleniti placeat ab tempore debitis Commodi explicabo maxime dignissimos necessitatibus temporibus alias! Cum sequi ducimus laudantium reiciendis quae. Voluptates voluptatibus enim vitae totam quam! Pariatur optio saepe ipsum.',
    keywords: ['california', 'plant', 'flower'],
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    for (const { title, description, body, keywords } of sampleData) {
      const postId = await queryInterface.bulkInsert('Posts', [
        {
          title,
          description,
          body,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      await queryInterface.bulkInsert(
        'Keywords',
        keywords.map((keyword) => ({
          postId,
          keyword,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
      );
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Keywords', null, {});
  },
};
