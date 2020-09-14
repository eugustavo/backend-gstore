import { Router } from 'express';

import categoryRouter from './category.routes';
import productRouter from './product.routes';
// import fileRouter from './file.routes';

const routes = Router();

routes.use('/categories', categoryRouter);
routes.use('/products', productRouter);
// routes.use('/file', fileRouter);

export default routes;
