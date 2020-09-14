import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  name: string;
}

class CreateCategoryService {
  public async execute({ name }: Request): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const category = categoriesRepository.create({ name });
    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
