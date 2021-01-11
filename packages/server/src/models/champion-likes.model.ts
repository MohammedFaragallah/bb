// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const championLikes = sequelizeClient.define(
    'champion_likes',
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      championId: {
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
  (championLikes as any).associate = function (models: any): void {
    // Define associations here
    (championLikes as any).belongsTo(models.users);
    (championLikes as any).belongsTo(models.champions);
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return championLikes;
}
