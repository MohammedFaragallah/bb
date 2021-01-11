// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const cartItems = sequelizeClient.define(
    'cart_items',
    {
      price: {
        type: DataTypes.REAL,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      productFlavorId: {
        type: DataTypes.INTEGER,
      },
      cartId: {
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
  (cartItems as any).associate = function (models: any): void {
    // Define associations here
    (cartItems as any).belongsTo(models.product_flavors);
    (cartItems as any).belongsTo(models.carts);
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return cartItems;
}
