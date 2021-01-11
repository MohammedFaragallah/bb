// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const eventComments = sequelizeClient.define(
    'event_comments',
    {
      comment: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      eventId: {
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
  (eventComments as any).associate = function (models: any): void {
    // Define associations here
    (eventComments as any).belongsTo(models.users);
    (eventComments as any).belongsTo(models.events);
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return eventComments;
}
