import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  id: string;
  name: string;
}

class UpdateCategoryService {
  public async execute({ id, name }: Request): Promise<Category | undefined> {
    const categoriesRepository = getRepository(Category);

    const category = await categoriesRepository.findOne(id);

    if (!category) {
      throw new Error('Category not found');
    }

    category.name = name;
    await categoriesRepository.save(category);

    return category;
  }
}

export default UpdateCategoryService;
