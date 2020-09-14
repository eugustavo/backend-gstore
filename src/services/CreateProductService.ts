import { getRepository } from 'typeorm';

import Product from '../models/Product';

interface Request {
  name: string;
  price: string;
  description: string;
  categories_id: string;
}

class CreateProductService {
  public async execute({
    name,
    description,
    price,
    categories_id,
  }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);

    const product: Product = productsRepository.create({
      name,
      price,
      description,
      categories_id,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
