// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const productFlavors = sequelizeClient.define(
    'product_flavors',
    {
      name: {
        type: DataTypes.TEXT,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      factsImage: {
        type: DataTypes.JSONB,
      },
      productSizeId: {
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
  (productFlavors as any).associate = function (models: any): void {
    // Define associations here
    (productFlavors as any).hasMany(models.product_comments);
    (productFlavors as any).hasMany(models.product_rates);
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return productFlavors;
}
