// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const storyComments = sequelizeClient.define(
    'story_comments',
    {
      comment: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      storyId: {
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
  (storyComments as any).associate = function (models: any): void {
    // Define associations here
    (storyComments as any).belongsTo(models.users);
    (storyComments as any).belongsTo(models.stories);
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return storyComments;
}
