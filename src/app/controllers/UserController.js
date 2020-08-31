import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth from '../../config/auth';

class UserController {
  async store(req, res) {
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
    return res.json();
  }
}

export default new UserController();
