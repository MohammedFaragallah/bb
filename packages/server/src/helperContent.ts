import faker from 'faker';
import { CategoryTypes, Gender } from './enums';

export const getStars = () => faker.random.number(4) + 1;
export const getGender = () => faker.random.arrayElement(Object.values(Gender));

export const links = [
  'https://www.facebook.com/MohammedAliFaragallah',
  'https://www.instagram.com/mohammedalifaragallah',
  'https://twitter.com/ffragalla',
  'https://github.com/MohammedFaragallah',
  'https://youtube.com/MohammedFaragallah',
];

export const demoImage = () => ({
  secure_url: faker.random.arrayElement([
    'https://res.cloudinary.com/frego/image/upload/v1582459110/mini_markus-spiske-WUehAgqO5hE-unsplash_gico8v.jpg',
    'https://res.cloudinary.com/frego/image/upload/v1582459106/mini_gentrit-sylejmani-JjUyjE-oEbM-unsplash_xodn6n.jpg',
    'https://res.cloudinary.com/frego/image/upload/v1582459105/mini_fitsum-admasu-oGv9xIl7DkY-unsplash_vjoehl.jpg',
    'https://res.cloudinary.com/frego/image/upload/v1582459109/mini_george-pagan-iii-9GdMuamOGlc-unsplash_r6lslh.jpg',
    'https://res.cloudinary.com/frego/image/upload/v1582459107/mini_john-arano-h4i9G-de7Po-unsplash_zbuuhv.jpg',
    'https://res.cloudinary.com/frego/image/upload/v1582459109/mini_victor-freitas-qZ-U9z4TQ6A-unsplash_iezurh.jpg',
    'https://res.cloudinary.com/frego/image/upload/v1582459106/mini_alexander-redl-d3bYmnZ0ank-unsplash_kd72cd.jpg',
    'https://res.cloudinary.com/frego/image/upload/v1582459106/mini_charles-gaudreault-xXofYCc3hqc-unsplash_arcbbg.jpg',
    'https://res.cloudinary.com/frego/image/upload/v1582459105/mini_photo-1568824063321-104f6a7dbf20_ibpbwy.jpg',
  ]),
});

export const demoVideo = () =>
  faker.random.arrayElement([
    'https://www.youtube.com/watch?v=JGwWNGJdvx8',
    '',
  ]);

export const factsImage = () => ({
  secure_url: faker.random.arrayElement([
    'https://res.cloudinary.com/frego/image/upload/v1589387281/chrome_CaACdFchPt_cw5sre.jpg',
    'https://res.cloudinary.com/frego/image/upload/v1589387280/chrome_xV3i8mFvoX_sv9zlu.jpg',
    'https://res.cloudinary.com/frego/image/upload/v1589387280/chrome_UuMgZBZqwg_b6cpc3.jpg',
  ]),
});

export const content =
  '<h3 style="text-align:left;text-indent:2em;">The standard Lorem Ipsum passage, used since the 1500s</h3><p>%%SLIDE/1%%</p><p>%%CHAMPION/1%%</p><p>%%EXERCISE/1%%</p><p style="text-align:justify;text-indent:2em;">&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.&quot;</p><h3 style="text-align:left;text-indent:2em;">Section 1.10.32 of &quot;de Finibus Bonorum et Malorum&quot;, written by Cicero in 45 BC</h3><p style="text-align:justify;text-indent:2em;">&quot;Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?&quot;</p><h3 style="text-align:left;text-indent:2em;">1914 translation by H. Rackham</h3><div class="media-wrap image-wrap"><img src="https://res.cloudinary.com/frego/image/upload/v1582459105/mini_fitsum-admasu-oGv9xIl7DkY-unsplash_vjoehl.jpg" width="100%" style="width:100%"/></div><div class="media-wrap embed-wrap"><div><iframe width="100%" height="315" src="https://www.youtube.com/embed/F6PhNnlb-14" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div><h3 style="text-align:left;text-indent:2em;">Section 1.10.33 of &quot;de Finibus Bonorum et Malorum&quot;, written by Cicero in 45 BC</h3><div class="media-wrap image-wrap"><img src="https://res.cloudinary.com/frego/image/upload/v1582444577/mdl3r6giaoqgpyfhtyo2.jpg" width="100%" style="width:100%"/></div><h3 style="text-align:left;text-indent:2em;">1914 translation by H. Rackham</h3><p style="text-align:justify;text-indent:2em;">&quot;On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.&quot;</p>';

type Root = {
  label: string;
  type: CategoryTypes;
  children: string[];
};

export const defaultCategories: Root[][] = [
  [
    {
      label: 'Store',
      type: CategoryTypes.store,
      children: [
        'Proteins',
        'Amino acids',
        'Energy and focus',
        'Mass gainers',
        'Fat Burners',
        'General health',
        'Mental and Sleeping disorders',
        'Ready to drinks',
        'Bars',
        'Snacks',
        'Others',
      ],
    },
  ],
  [
    {
      label: 'General',
      type: CategoryTypes.articles,
      children: ['Attitude', 'Nutrition', 'Life style', 'Exercise'],
    },
    {
      label: 'Food supplement',
      type: CategoryTypes.articles,
      children: [
        'Proteins',
        'Amino acids',
        'Energy and focus',
        'Mass gainers',
        'Fat burn',
        'General health',
        'Mental & sleeping',
      ],
    },
  ],
  [
    {
      label: 'Exercises',
      type: CategoryTypes.exercises,
      children: [
        'Cardio',
        'Olympic weight lifting',
        'Plyometrics',
        'Power lifting',
        'Strength',
        'Stretching',
        'Strongman',
      ],
    },
  ],
];
