// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const products = sequelizeClient.define(
    'products',
    {
      name: {
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
  (products as any).associate = function (models: any): void {
    // Define associations here
    (products as any).belongsTo(models.categories);
    (products as any).hasMany(models.product_sizes);
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return products;
}
