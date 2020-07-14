import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';
import UserController from '@modules/users/infra/http/controllers/UserController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig.config.multer);

const userController = new UserController();
const userAvatarController = new UserAvatarController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
