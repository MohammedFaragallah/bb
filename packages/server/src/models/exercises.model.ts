// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const exercises = sequelizeClient.define(
    'exercises',
    {
      name: {
        type: DataTypes.TEXT,
      },
      startImage: {
        type: DataTypes.JSONB,
      },
      endImage: {
        type: DataTypes.JSONB,
      },
      video: {
        type: DataTypes.TEXT,
      },
      muscle: {
        type: DataTypes.TEXT,
      },
      equipment: {
        type: DataTypes.TEXT,
      },
      fitnessLevel: {
        type: DataTypes.TEXT,
      },
      cautions: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      instructions: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      notes: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      categoryId: {
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
  (exercises as any).associate = function (models: any): void {
    // Define associations here
    (exercises as any).belongsTo(models.users);
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return exercises;
}
