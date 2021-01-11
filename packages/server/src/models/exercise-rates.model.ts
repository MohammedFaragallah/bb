// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const exerciseRates = sequelizeClient.define(
    'exercise_rates',
    {
      stars: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      exerciseId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      hooks: {
        beforeCount(options: any): HookReturn {
          options.raw = true;
        },
      },
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (exerciseRates as any).associate = function (models: any): void {
    // Define associations here
    (exerciseRates as any).belongsTo(models.users);
    (exerciseRates as any).belongsTo(models.exercises);
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return exerciseRates;
}
