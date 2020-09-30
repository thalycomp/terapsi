import { Model, Sequelize } from 'sequelize';

class Avatar extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: Sequelize.STRING,
        filename: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/avatar/${this.filename}`;
          },
        },
      },
      { sequelize }
    );

    return this;
  }
}

export default Avatar;
