import { writeFileSync } from 'node:fs';
import qs from 'qs';

const url = 'https://next-reviews-cms-4quo6d5fha-uc.a.run.app/api/reviews'
  + '?' + qs.stringify({
    fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
    populate: { image: { fields: ['url'] } },
    pagination: { pageSize: 6, page: 1 },
  }, { encodeValuesOnly: true });

const response = await fetch(url);
const body = await response.json();
const formatted = JSON.stringify(body, null, 2);
const file = 'scripts/strapi-response.json';
writeFileSync(file, formatted, 'utf8');
//const imageUrl = body.data.map(item => item.attributes.image.data.attributes.url);