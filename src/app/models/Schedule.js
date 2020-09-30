import { Model, Sequelize } from 'sequelize';

class Schedule extends Model {
  static init(sequelize) {
    super.init(
      {
        week_day: Sequelize.INTEGER,
        to: Sequelize.INTEGER,
        from: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Therapist, {
      foreignKey: 'therapist_id',
    });
  }
}

export default Schedule;
