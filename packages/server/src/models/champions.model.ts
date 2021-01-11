// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { Gender } from '../enums';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const champions = sequelizeClient.define(
    'champions',
    {
      name: {
        type: DataTypes.TEXT,
      },
      city: {
        type: DataTypes.TEXT,
      },
      country: {
        type: DataTypes.TEXT,
      },
      bornAt: {
        type: DataTypes.DATEONLY,
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
      class: {
        type: DataTypes.TEXT,
      },
      height: {
        type: DataTypes.INTEGER,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      gender: {
        type: DataTypes.ENUM(...Object.values(Gender)),
      },
      profileImage: {
        type: DataTypes.JSONB,
      },
      coverImage: {
        type: DataTypes.JSONB,
      },
      album: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
      links: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      sportId: {
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
  (champions as any).associate = function (models: any): void {
    // Define associations here
    (champions as any).belongsTo(models.sports);
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return champions;
}
