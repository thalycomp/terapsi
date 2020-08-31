import jwt from 'jsonwebtoken';
import auth from '../../config/auth';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'login required' });
  }
  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, auth.secret);
    const { id, therapist } = data;
    req.userId = id;
    req.therapist = therapist;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'login required' });
  }
};
