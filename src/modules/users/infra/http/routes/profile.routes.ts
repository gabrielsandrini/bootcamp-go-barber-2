import { Router } from 'express';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
profileRouter.use(ensureAuthenticated);

const profileController = new ProfileController();

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
