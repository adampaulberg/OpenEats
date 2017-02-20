var apiHost = '';
if (process.env.API_URL) {
  apiHost = process.env.API_URL;
}

var apiUrl = apiHost + '/api/v1';

export var serverURLs = {
  auth_token: apiUrl + '/accounts/obtain-auth-token/',
  browse: apiUrl + '/recipe/recipes/?fields=id,title,pub_date,rating,photo_thumbnail,info',
  mini_browse: apiUrl + '/recipe/mini-browse/?format=json',
  //create: apiUrl + '/recipe/recipes/',
  cuisine: apiUrl + '/recipe_groups/cuisine/',
  course: apiUrl + '/recipe_groups/course/',
  tag: apiUrl + '/recipe_groups/tag/?format=json',
  ingredient: apiUrl + '/ingredient/ingredient/?format=json',
  direction: apiUrl + '/recipe/direction/?format=json',
  news: apiUrl + '/news/entry/?format=json',
  recipe: apiUrl + '/recipe/recipes/',
};

export var measurements = [
  'tablespoon',
  'teaspoon',
  'cup',
  'pint',
  'gallon',
  'gram',
  'kilogram',
];


// http://www.bbc.co.uk/food/ingredients/by/letter/b
export var ingredient = [
  '',
];
