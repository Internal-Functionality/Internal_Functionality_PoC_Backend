import { Router } from 'express';
import * as searchController from './search.controller';
const router = Router();

//router.get('/read', searchController.createSearchAndGetFixers); // GET /api/search
router.get('/search', searchController.readSearch); // GET /api/search
router.post('/search', searchController.createSearch); // POST /api/search/capture
router.put('/search', searchController.updateSearch); // PUT /api/search/123
router.delete('/search', searchController.deleteSearch); // DELETE /api/search/123

export default router;
