import { Model, Sequelize } from 'sequelize';

class Therapist extends Model {
  static init(sequelize) {
    super.init(
      {
        bio: Sequelize.TEXT,
        crp: Sequelize.STRING,
        approach: Sequelize.STRING,
        cost: Sequelize.INTEGER,
        duration: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.hasMany(models.Schedule);
  }
}

export default Therapist;
