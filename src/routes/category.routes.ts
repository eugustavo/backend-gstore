/* eslint-disable no-param-reassign */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import Category from '../models/Category';

import CreateCategoryService from '../services/CreateCategoryService';
import UpdateCategoryService from '../services/UpdateCategoryService';

const categoryRouter = Router();

categoryRouter.get('/', async (request, response) => {
  const categoriesRepository = getRepository(Category);
  const findAll = await categoriesRepository.find();

  const categories = findAll.map(category => {
    delete category.products;
    return category;
  });

  return response.json(categories);
});

categoryRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const categoriesRepository = getRepository(Category);

  if (!id) {
    return response.status(404).json({ message: 'Category not found' });
  }

  const category = await categoriesRepository.findOne(id);

  return response.json(category);
});

categoryRouter.post('/', async (request, response) => {
  const { name } = request.body;

  const createCategory = new CreateCategoryService();

  const category = await createCategory.execute({ name });

  return response.json(category);
});

categoryRouter.put('/', async (request, response) => {
  const { id, name } = request.body;

  const updateCategory = new UpdateCategoryService();

  const category = await updateCategory.execute({ id, name });

  return response.json(category);
});

categoryRouter.delete('/', async (request, response) => {
  const { id } = request.body;

  const categoriesRepository = getRepository(Category);

  await categoriesRepository.delete(id);

  return response.status(200).json({ message: 'Category deleted' });
});

export default categoryRouter;
