import { Router } from 'express';
import ProfileController from '@modules/users/controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
profileRouter.use(ensureAuthenticated);

const profileController = new ProfileController();

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
