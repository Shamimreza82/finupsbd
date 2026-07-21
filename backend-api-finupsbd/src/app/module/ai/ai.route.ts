import express from 'express';
import { AiController } from './ai.controller';

const router = express.Router();

router.post('/mcp', AiController.mcp);
// router.post("/assistant/:id/message", AiController.interactWithAssistant);

export const AiRouter = router;
