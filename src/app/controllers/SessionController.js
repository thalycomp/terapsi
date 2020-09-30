import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth from '../../config/auth';
import Avatar from '../models/Avatar';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not exist. Create a user.' });
    }

    const checkPassword = await user.comparePassword(password);

    if (!checkPassword) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    const avatarUser = await User.findOne({
      where: { email },
      attributes: ['avatar_id'],
      include: [
        {
          model: Avatar,
          attributes: ['url', 'originalname', 'filename'],
        },
      ],
    });

    const { id, name, therapist } = user;

    return res.json({
      user: {
        id,
        name,
        therapist,
        avatarUser,
      },
      token: jwt.sign({ id, therapist }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
