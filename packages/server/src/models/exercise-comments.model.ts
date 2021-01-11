// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const exerciseComments = sequelizeClient.define(
    'exercise_comments',
    {
      comment: {
        type: DataTypes.TEXT,
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
  (exerciseComments as any).associate = function (models: any): void {
    // Define associations here
    (exerciseComments as any).belongsTo(models.users);
    (exerciseComments as any).belongsTo(models.exercises);
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return exerciseComments;
}
