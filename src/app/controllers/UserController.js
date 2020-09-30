import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import auth from '../../config/auth';
import Avatar from '../models/Avatar';

class UserController {
  async store(req, res) {
    const schemaValidation = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(5),
      therapist: Yup.boolean(),
    });

    const checkSchema = await schemaValidation.isValid(req.body);

    if (!checkSchema) {
      return res.status(400).json({ error: 'validations fails' });
    }

    const emailExist = await User.findOne({ where: { email: req.body.email } });

    if (emailExist) {
      return res.status(400).json({ error: 'email already exist' });
    }
    const { id, name, email, therapist } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      therapist,
      token: jwt.sign({ id, therapist }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }

  async update(req, res) {
    const { email, password } = req.body;

    const schemaValidation = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      newPassword: Yup.string().min(5),
    });

    const checkSchema = await schemaValidation.isValid(req.body);

    if (!checkSchema) {
      return res.status(400).json({ error: 'validations fails' });
    }

    const user = await User.findByPk(req.userId);

    console.log(user);
    const checkPassword = await user.comparePassword(password);

    if (!checkPassword) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    if (req.body.newPassword) {
      req.body.password = req.body.newPassword;
    }

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    const { id, name } = await user.update(req.body);

    const avatarUser = await User.findByPk(req.userId, {
      attributes: ['avatar_id'],
      include: [
        {
          model: Avatar,
          attributes: ['url', 'originalname', 'filename'],
        },
      ],
    });
    return res.json({
      id,
      email,
      name,
      avatarUser,
    });
  }

  async delete(req, res) {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'validations fails' });
    }

    const user = await User.findByPk(req.userId);

    const checkPassword = await user.comparePassword(password);

    if (!checkPassword) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    try {
      await user.destroy(req.userId);

      return res.status(200).json({ message: 'user successfully deleted' });
    } catch (e) {
      return res.status(400).json({ error: 'failed to delete user' });
    }
  }
}

export default new UserController();
