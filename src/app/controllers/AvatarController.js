import multer from 'multer';
import Avatar from '../models/Avatar';

import multerConfig from '../../config/multer';

const upload = multer(multerConfig).single('avatar');

class AvatarController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json(error.code);
      }

      const { originalname, filename } = req.file;
      const avatar = await Avatar.create({
        originalname,
        filename,
      });

      return res.json(avatar);
    });
  }
}

export default new AvatarController();
