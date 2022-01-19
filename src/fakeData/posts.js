import names from './names';

const posts = Array(200).fill({}).map((item, idx) => ({
  ...item,
  author: names[Math.floor(Math.random() * 30)],
  title: `This is a title ${idx}`,
  image: `https://source.unsplash.com/random/250×150?${idx}`,
}));

export default posts;
