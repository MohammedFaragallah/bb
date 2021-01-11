// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const stories = sequelizeClient.define(
    'stories',
    {
      title: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      readingTime: {
        type: DataTypes.JSONB,
      },
      articleBody: {
        type: DataTypes.JSONB,
      },
      featuredImage: {
        type: DataTypes.JSONB,
      },
      video: {
        type: DataTypes.TEXT,
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
  (stories as any).associate = function (models: any): void {
    // Define associations here
    (stories as any).belongsTo(models.categories);
    (stories as any).belongsTo(models.users);
    (stories as any).hasMany(models.story_comments);
    (stories as any).hasMany(models.story_likes);
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return stories;
}
