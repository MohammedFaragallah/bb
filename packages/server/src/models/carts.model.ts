// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const carts = sequelizeClient.define(
    'carts',
    {
      status: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      userId: {
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
  (carts as any).associate = function (models: any): void {
    // Define associations here
    (carts as any).hasMany(models.cart_items);
    (carts as any).belongsTo(models.users);
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return carts;
}
