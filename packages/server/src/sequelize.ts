import faker from 'faker';
import shuffle from 'lodash/shuffle';
import { Sequelize } from 'sequelize';
import { Application } from './declarations';
import {
  AdsLocations,
  CartStatuses,
  CategoryTypes,
  Equipments,
  FitnessLevel,
  Forms,
  Gender,
  LanguageCode,
  Muscles,
  Roles,
  Title,
  Goals,
} from './enums';
import {
  content,
  defaultCategories,
  demoImage,
  demoVideo,
  factsImage,
  getGender,
  getStars,
  links,
} from './helperContent';
import logger from './logger';

export default function (app: Application) {
  const connectionString = process.env.DATABASE_URL || app.get('postgres');
  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
    define: {
      freezeTableName: true,
    },
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    sequelize
      .authenticate()
      .then(() => {
        logger.info(
          '%s database (authenticate) Connection established on %s',
          app.get('app'),
          connectionString,
        );
      })
      .catch((err: any) => {
        logger.error(
          '%s unable to connect to the database (authenticate) on %s',
          app.get('app'),
          connectionString,
          err,
        );
      });

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        (models[name] as any).associate(models);
      }
    });

    // Sync to the database
    const force = { force: true };
    const seed = force.force && true;

    sequelize
      .sync(force)
      .then(async () => {
        if (force.force) {
          logger.info(
            '%s sequelize (sync) completed on %s',
            app.get('app'),
            connectionString,
          );
        }

        if (seed) {
          const ARTICLES_COUNT = 30;
          const CARTS_COUNT = 1;
          const CHAMPIONS_COUNT = 10;
          const EVENTS_COUNT = 5;
          const EXERCISES_COUNT = 30;
          const PRODUCTS_COUNT = 30;
          const SLIDES_COUNT = 20;
          const SPORTS_COUNT = 1;
          const USERS_COUNT = 1;

          const client = app.get('client');
          // ! start adding root categories
          defaultCategories.forEach((branch) => {
            branch.forEach((leafs) => {
              app
                .service('api/categories')
                .create({
                  type: leafs.type,
                  name: leafs.label,
                  description: faker.commerce.productAdjective(),
                })
                .then((parentCategory) => {
                  if (leafs.children)
                    leafs.children.forEach((name) => {
                      app.service('api/categories').create({
                        name,
                        description: faker.commerce.productAdjective(),
                        parentId: parentCategory.id,
                        type: leafs.type,
                      });
                    });
                });
            });
          });
          // ! end adding root categories

          Array(SLIDES_COUNT)
            .fill(0)
            .forEach(() => {
              app.service('api/slides').create({
                title: faker.commerce.product(),
                description: faker.commerce.productAdjective(),
                coverImage: demoImage(),
                link: faker.random.arrayElement([
                  faker.internet.url(),
                  `${client}/store`,
                  `${client}/articles`,
                ]),
                location: faker.random.arrayElement(
                  Object.values(AdsLocations),
                ),
              });
            });

          Array(5)
            .fill(0)
            .forEach(() => {
              app.service('api/slides').create({
                title: faker.commerce.product(),
                description: faker.commerce.productAdjective(),
                coverImage: demoImage(),
                link: faker.random.arrayElement([
                  faker.internet.url(),
                  `${client}/store`,
                  `${client}/articles`,
                ]),
                location: AdsLocations.MEGA_MENU,
              });
            });
          // ! start adding test users
          let adminUser = (await app
            .service('users')
            .find({ query: { email: 'o0frego0o@hotmail.com' } })) as any;
          let demoUser = (await app
            .service('users')
            .find({ query: { email: 'demo@demo.com' } })) as any;
          if (adminUser.data.length > 0) {
            logger.info('\nMASTER USER ALREADY EXISTS');
          } else {
            adminUser = await app.service('users').create({
              email: 'o0frego0o@hotmail.com',
              password: 'p@ssw0rd',
              roles: Roles.admin,
              profileImage: demoImage(),
              userName: app.get('app'),
              biography: faker.lorem.sentence(50),
              titles: [Title.Pt],
              certifications: faker.lorem.sentence(50),
              preferredLanguage: LanguageCode.ar,
              phone: '01229823464',
              gender: Gender.Male,
              height: 84,
              weight: 80,
              goal: Goals.Shred,
              links,
              bornAt: Date.now(),
              firstAddress: {
                address1: '84',
                address2: 'test',
                city: 'Alexandria',
              },
            });
            logger.info(
              `Admin user created with id ${adminUser.id} and email ${adminUser.email}`,
            );
          }
          if (demoUser.data.length > 0) {
            logger.info('DEMO USER ALREADY EXISTS\n');
          } else {
            demoUser = await app.service('users').create({
              email: 'demo@demo.com',
              profileImage: demoImage(),
              password: 'demodemo',
              userName: 'Demo',
            });
            logger.info(
              `demo user created with id ${demoUser.id} and email ${demoUser.email}\n`,
            );
          }

          let user;
          for (user = 0; user < USERS_COUNT; user++) {
            await app.service('users').create({
              email: faker.internet.email(),
              password: faker.internet.password(),
              userName: faker.internet.userName(),
              profileImage: demoImage(),
              gender: getGender(),
              height: faker.random.number(220) + 50,
              weight: faker.random.number(160) + 40,
              bornAt: faker.date.past(99),
            });
          }
          // ! end adding test users
          const { data: users }: any = await app
            .service('users')
            .find({ query: { $limit: 50 } });

          const usersIds = users.map((user: any) => user.id);
          const getUser = () => faker.random.number(usersIds.length) || 1;

          const FEEDBACK_COUNT = usersIds.length;

          // ! add content
          const categories = await app
            .service('api/categories')
            .find({ query: { $limit: 50 } })
            .then((res: any) => res.data)
            .catch(console.error);

          const typeFilter = (type: CategoryTypes) => (category: any) =>
            category.type === type;
          const productCategories = categories.filter(
            typeFilter(CategoryTypes.store),
          );

          let products;
          const dummySizes = ['Small', 'Medium', 'Large'];
          const dummyFlavors = ['Cake', 'Chocolate', 'Cinnamon', 'Cream'];

          for (products = 0; products < PRODUCTS_COUNT; products++) {
            await app
              .service('api/products')
              .create({
                name: faker.commerce.productName(),
                articleBody: faker.lorem.sentence(200),
                description: faker.lorem.sentence(50),
                categoryId:
                  productCategories[
                    faker.random.number(productCategories.length - 1)
                  ].id,
              })
              .then((product: any) => {
                shuffle(dummySizes)
                  .slice(0, faker.random.number(dummySizes.length) + 1)
                  .forEach((size: any) => {
                    app
                      .service('api/product-sizes')
                      .create({
                        name: size,
                        price: faker.commerce.price(),
                        productImage: demoImage(),
                        form: faker.random.arrayElement(Object.values(Forms)),
                        productId: product.id,
                      })
                      .then((size: any) => {
                        shuffle(dummyFlavors)
                          .slice(
                            0,
                            faker.random.number(dummyFlavors.length) + 1,
                          )
                          .forEach((flavor: any) => {
                            app
                              .service('api/product-flavors')
                              .create({
                                name: flavor,
                                factsImage: factsImage(),
                                quantity: faker.random.number(50),
                                productSizeId: size.id,
                              })
                              .then((res: any) => {
                                let comment;
                                for (
                                  comment = 0;
                                  comment < FEEDBACK_COUNT;
                                  comment++
                                ) {
                                  app.service('api/product-comments').create({
                                    productFlavorId: res.id,
                                    userId: comment + 1,
                                    comment: faker.lorem.sentence(),
                                  });
                                  app.service('api/product-rates').create({
                                    productFlavorId: res.id,
                                    userId: comment + 1,
                                    stars: getStars(),
                                  });
                                }
                              })
                              .catch(console.error);
                          });
                      });
                  });
              })
              .catch(console.error);
          }

          const totalFlavors = await app
            .service('api/product-flavors')
            .find({ query: { $limit: 0 } })
            .then((res: any) => res.total)
            .catch(console.error);

          for (let carts = 0; carts < CARTS_COUNT; carts++) {
            const status = faker.random.arrayElement(
              Object.values(CartStatuses),
            );

            await app
              .service('api/carts')
              .create({
                userId: getUser(),
                status: status,
                address: faker.address.city(),
              })
              .then(async (cart) => {
                Array(faker.random.number(10))
                  .fill(0)
                  .forEach(async () => {
                    const flavor = await app
                      .service('api/product-flavors')
                      .get(faker.random.number(totalFlavors) || 1);

                    const size = await app
                      .service('api/product-sizes')
                      .get(flavor.productSizeId);

                    app.service('api/cart-items').create({
                      price: size.price,
                      quantity: faker.random.number(flavor.quantity),
                      productFlavorId: flavor.id,
                      cartId: cart.id,
                    });
                  });
              })
              .then(() =>
                Object.values(CartStatuses).forEach(
                  async (status) =>
                    await app
                      .service('api/carts')
                      .create({ userId: adminUser.id, status: status })
                      .then(async (cart) => {
                        Array(faker.random.number(10))
                          .fill(0)
                          .forEach(async () => {
                            const flavor = await app
                              .service('api/product-flavors')
                              .get(faker.random.number(totalFlavors) || 1);

                            const size = await app
                              .service('api/product-sizes')
                              .get(flavor.productSizeId);

                            app.service('api/cart-items').create({
                              price: size.price,
                              quantity: faker.random.number(flavor.quantity),
                              productFlavorId: flavor.id,
                              cartId: cart.id,
                            });
                          });
                      })
                      .catch(console.error),
                ),
              )
              .catch(console.error);
          }

          let exercise;
          for (exercise = 0; exercise < EXERCISES_COUNT; exercise++) {
            const exercisesCategories = categories.filter(
              typeFilter(CategoryTypes.exercises),
            );

            app
              .service('api/exercises')
              .create({
                name: `Exercise ${faker.lorem.sentence()}`,
                startImage: demoImage(),
                endImage: demoImage(),
                muscle: faker.random.arrayElement(Object.values(Muscles)),
                equipment: faker.random.arrayElement(Object.values(Equipments)),
                video: demoVideo(),
                fitnessLevel: faker.random.arrayElement(
                  Object.values(FitnessLevel),
                ),
                cautions: [faker.lorem.sentence()],
                instructions: [faker.lorem.sentence()],
                userId: getUser(),
                categoryId:
                  exercisesCategories[
                    faker.random.number(exercisesCategories.length - 1)
                  ].id,
              })
              .then((res) => {
                let feedback;
                for (feedback = 0; feedback < FEEDBACK_COUNT; feedback++) {
                  app.service('api/exercise-comments').create({
                    exerciseId: res.id,
                    userId: feedback + 1,
                    comment: faker.lorem.sentence(),
                  });
                  app.service('api/exercise-likes').create({
                    exerciseId: res.id,
                    userId: feedback + 1,
                  });
                  app.service('api/exercise-rates').create({
                    exerciseId: res.id,
                    userId: feedback + 1,
                    stars: getStars(),
                  });
                }
              })
              .catch(console.error);
          }
          let event;
          for (event = 0; event < EVENTS_COUNT; event++) {
            app
              .service('api/events')
              .create({
                title: faker.lorem.sentence(),
                articleBody: content,
                coverImage: demoImage(),
                hostName: faker.company.companyName(),
                location: faker.lorem.sentence(),
                startAt: faker.date.past(99),
                endAt: faker.date.future(1),
              })
              .then((res) => {
                let feedback;
                for (feedback = 0; feedback < FEEDBACK_COUNT; feedback++) {
                  app.service('api/event-comments').create({
                    eventId: res.id,
                    userId: feedback + 1,
                    comment: faker.lorem.sentence(),
                  });
                  app.service('api/event-likes').create({
                    eventId: res.id,
                    userId: feedback + 1,
                  });
                  app.service('api/event-rates').create({
                    eventId: res.id,
                    userId: feedback + 1,
                    stars: getStars(),
                  });
                }
              })
              .catch(console.error);
          }
          let article;
          for (article = 0; article < ARTICLES_COUNT; article++) {
            const articleCategories = categories.filter(
              typeFilter(CategoryTypes.articles),
            );

            app
              .service('api/stories')
              .create({
                title: faker.lorem.sentence(),
                articleBody: content,
                featuredImage: demoImage(),
                approved: true,
                video: demoVideo(),
                userId: getUser(),
                categoryId:
                  articleCategories[
                    faker.random.number(articleCategories.length - 1)
                  ].id,
              })
              .then((res) => {
                let feedback;
                for (feedback = 0; feedback < FEEDBACK_COUNT; feedback++) {
                  app.service('api/story-comments').create({
                    storyId: res.id,
                    userId: feedback + 1,
                    comment: faker.lorem.sentence(),
                  });
                  app.service('api/story-likes').create({
                    storyId: res.id,
                    userId: feedback + 1,
                  });
                  app.service('api/story-rates').create({
                    storyId: res.id,
                    userId: feedback + 1,
                    stars: getStars(),
                  });
                }
              })
              .catch(console.error);
          }
          let sports;
          for (sports = 0; sports < SPORTS_COUNT; sports++) {
            app
              .service('api/sports')
              .create({
                name: `Sport ${faker.name.findName()}`,
                description: faker.lorem.lines(faker.random.number(10)),
                class: `Class ${faker.name.jobTitle()}`,
                coverImage: demoImage(),
              })
              .then((sport) => {
                let champions;
                for (champions = 0; champions < CHAMPIONS_COUNT; champions++) {
                  const tile = () => ({
                    tileImage: demoImage(),
                    caption: faker.random.words(5),
                  });
                  app
                    .service('api/champions')
                    .create({
                      name: faker.name.findName(),
                      city: faker.name.findName(),
                      country: faker.address.country(),
                      bornAt: faker.date.past(29),
                      description: faker.lorem.lines(faker.random.number(10)),
                      articleBody: content,
                      class: faker.name.jobTitle(),
                      height: faker.random.number(220) + 50,
                      weight: faker.random.number(160) + 40,
                      gender: getGender(),
                      profileImage: demoImage(),
                      coverImage: demoImage(),
                      sportId: sport.id,
                      links,
                      album: Array(3).fill(0).map(tile),
                    })
                    .then((res) => {
                      let feedback;
                      for (
                        feedback = 0;
                        feedback < FEEDBACK_COUNT;
                        feedback++
                      ) {
                        app.service('api/champion-likes').create({
                          championId: res.id,
                          userId: feedback + 1,
                        });
                        app.service('api/champion-rates').create({
                          championId: res.id,
                          userId: feedback + 1,
                          stars: getStars(),
                        });
                      }
                    });
                }
              })
              .catch(console.error);
          }
          // ! add content
        }
      })
      .then(() => console.log('LONG WAY'))
      .then(() =>
        app.service('api/options').create({
          name: 'server',
          value: true,
        }),
      )
      .catch((err: any) => {
        console.log('app.setup -> err', err);
        logger.error(
          '%s sequelize (sync) unable to connect to the database on %s',
          app.get('app'),
          connectionString,
          err,
        );
      });

    return result;
  };
}
