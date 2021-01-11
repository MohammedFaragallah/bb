// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { Gender, Goals, LanguageCode, Roles, Title } from '../enums';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const users = sequelizeClient.define(
    'users',
    {
      profileImage: {
        type: DataTypes.JSONB,
      },
      userName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      biography: {
        type: DataTypes.TEXT,
      },
      titles: {
        type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(Title))),
        defaultValue: [Title.Athlete],
      },
      certifications: {
        type: DataTypes.TEXT,
      },
      preferredLanguage: {
        type: DataTypes.ENUM(...Object.values(LanguageCode)),
        defaultValue: LanguageCode.ar,
      },
      phone: {
        type: DataTypes.TEXT,
      },
      gender: {
        type: DataTypes.ENUM(...Object.values(Gender)),
      },
      height: {
        type: DataTypes.INTEGER,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      goal: {
        type: DataTypes.ENUM(...Object.values(Goals)),
      },
      links: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      bornAt: {
        type: DataTypes.DATEONLY,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      googleId: {
        type: DataTypes.STRING,
      },
      facebookId: {
        type: DataTypes.STRING,
      },
      roles: {
        type: DataTypes.TEXT,
        defaultValue: Roles.user,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verifyToken: {
        type: DataTypes.TEXT,
      },
      verifyShortToken: {
        type: DataTypes.TEXT,
      },
      verifyExpires: {
        type: DataTypes.DATE,
      },
      verifyChanges: {
        type: DataTypes.JSONB,
      },
      resetToken: {
        type: DataTypes.TEXT,
      },
      resetShortToken: {
        type: DataTypes.TEXT,
      },
      resetExpires: {
        type: DataTypes.DATE,
      },
      firstAddressId: {
        type: DataTypes.INTEGER,
      },
      secondAddressId: {
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
  (users as any).associate = function (models: any): void {
    // Define associations here
    (users as any).belongsTo(models.addresses, { as: 'firstAddress' });
    (users as any).belongsTo(models.addresses, { as: 'secondAddress' });
    (users as any).hasMany(models.carts);
    (users as any).hasMany(models.stories);
    (users as any).hasMany(models.exercises);
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return users;
}
