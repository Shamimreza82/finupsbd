import swaggerUi from 'swagger-ui-express';
import { ConfigFile } from '../../config';
import { Request, Response } from 'express';
import { specs } from './api-doc';
import express from 'express'

const router = express.Router()



const protectApiDocs = (req: Request, res: Response, next: () => void) => {
  const docsSecret = ConfigFile.API_DOC_SECRET;

  if (!docsSecret) {
    next();
    return;
  }

  const providedSecret = req.headers['x-api-doc-secret'] || req.query.key;

  if (providedSecret === docsSecret) {
    next();
    return;
  }

  res.status(401).json({
    success: false,
    message: 'Unauthorized API docs access',
  });
};




router.get('/api-docs.json', (_req: Request, res: Response) => {
  res.status(200).json(specs);
});



router.use(
  '/api-docs',
  // protectApiDocs,
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none',
      displayRequestDuration: true,
      filter: true,
      persistAuthorization: true,
      tryItOutEnabled: true,
    },
  }),
);

export const DocRouter = router