import express from 'express';
import * as contactController from '../controllers/contact.controller';

const router = express.Router();

router.post('/contacts', contactController.createContact);
router.get('/contacts', contactController.getContacts);
router.put('/contacts/:id', contactController.updateContact);
router.delete('/contacts/:id', contactController.deleteContact);

export default router;
