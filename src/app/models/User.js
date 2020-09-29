import { Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        therapist: Sequelize.BOOLEAN,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  comparePassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.Avatar, { foreignKey: 'avatar_id' });
  }
}

export default User;
