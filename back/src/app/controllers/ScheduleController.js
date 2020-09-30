import User from '../models/User';
import Schedule from '../models/Schedule';
import Therapist from '../models/Therapist';

class ScheduleController {
  async store(req, res) {
    const { therapist } = await User.findOne({
      where: { id: req.userId },
      attributes: ['id', 'email', 'therapist'],
    });

    if (!therapist) {
      return res.status(400).json({ error: 'Access denied. Not a therapist.' });
    }

    const therapistId = await Therapist.findOne({
      where: { user_id: req.userId },
      include: [
        {
          model: User,
          attributes: ['id'],
        },
      ],
      attributes: ['id', 'crp'],
    });

    try {
      const { crp } = therapistId;

      if (!crp) {
        return res
          .status(400)
          .json({ error: 'Access denied. No registered CRP.' });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Access denied. No registered CRP.' });
    }

    const { id } = therapistId;

    const { from, to, week_day } = req.body;

    const checkWeekDayExist = await Schedule.findOne({
      where: { therapist_id: id, week_day },
      include: [
        {
          model: Therapist,
          attributes: ['id'],
        },
      ],
    });

    if (checkWeekDayExist) {
      return res.status(401).json({ error: 'Week day already exist.' });
    }

    if (from - to < 30 || from < to) {
      return res.status(401).json({ error: 'Invalid date.' });
    }

    if (week_day < 1 || week_day > 7) {
      return res.status(401).json({ error: 'Invalid week day.' });
    }

    await Schedule.create({ therapist_id: id, week_day, from, to });

    return res.json({
      id_user: req.userId,
      from,
      to,
      week_day,
    });
  }
}

export default new ScheduleController();
