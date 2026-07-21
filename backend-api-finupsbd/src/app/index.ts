/* eslint-disable @typescript-eslint/no-explicit-any */
import serverlessExpress from '@vendia/serverless-express';
import app from '../app';

const server = serverlessExpress({ app });

export default (req: any, res: any) => server(req, res);
