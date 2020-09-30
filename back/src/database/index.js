import Sequelize from 'sequelize';

import User from '../app/models/User';
import config from '../config/database';
import Therapist from '../app/models/Therapist';
import Schedule from '../app/models/Schedule';
import Avatar from '../app/models/Avatar';

const models = [User, Therapist, Schedule, Avatar];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(config);
    //
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
