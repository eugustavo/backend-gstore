import { Router } from 'express';
import { getRepository } from 'typeorm';

import Product from '../models/Product';
import CreateProductService from '../services/CreateProductService';

const productRouter = Router();

productRouter.get('/', async (request, response) => {
  const productRepository = getRepository(Product);

  const products = await productRepository.find();

  return response.json(products);
});

productRouter.post('/', async (request, response) => {
  const { name, price, description, categories_id } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    name,
    price,
    description,
    categories_id,
  });

  return response.json(product);
});

// productRouter.put('/', async (request, response) => {
//   const { name, price, description, categories } = request.body;
//   const { id } = request.params;

//   const product = await prisma.products.update({
//     where: { id },
//     data: {
//       name,
//       price,
//       description,
//       categories,
//     },
//   });

//   if (!product) {
//     return response.status(404).json({ message: 'Product not found' });
//   }

//   return response.json(product);
// });

// productRouter.delete('/', async (request, response) => {
//   const { id } = request.params;

//   await prisma.products.delete({
//     where: { id },
//   });

//   return response.status(200).json({ message: 'Product deleted' });
// });

export default productRouter;
