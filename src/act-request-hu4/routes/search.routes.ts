import { Router } from 'express';
import * as searchController from '../controllers/search.controller';
const router = Router();

router.get('/read', searchController.createSearchAndGetFixers); // GET /api/search
router.get('/read', searchController.readSearch); // GET /api/search
router.post('/create', searchController.createSearch); // POST /api/search/capture
router.put('/update', searchController.updateSearch); // PUT /api/search/123
router.delete('/delete', searchController.deleteSearch); // DELETE /api/search/123

export default router;
