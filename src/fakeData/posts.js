import names from './names';

const keywords = ['hall', 'goal', 'income', 'examination', 'extent', 'percentage', 'fishing', 'president', 'chest', 'debt', 'assumption', 'candidate', 'reaction', 'signature', 'environment', 'inflation', 'obligation', 'love', 'topic', 'church', 'quantity', 'requirement', 'opportunity', 'camera', 'basis', 'version', 'guidance', 'inspector', 'negotiation', 'system', 'presentation', 'river', 'pie', 'injury', 'statement', 'singer', 'cheek', 'relationship', 'intention', 'computer', 'entry', 'potato', 'transportation', 'departure', 'significance', 'childhood', 'road', 'restaurant', 'music', 'library'];

const posts = Array(200).fill(null).map((item, idx) => {
  const randKeyword = [];
  const keywordsPool = [...keywords];
  do {
    // eslint-disable-next-line prefer-destructuring
    randKeyword[randKeyword.length] = keywordsPool.splice(
      Math.floor(Math.random() * keywordsPool.length),
      1,
    )[0];
  } while (randKeyword.length < 2);
  return {
    author: names[Math.floor(Math.random() * 30)],
    title: `This is a title ${idx}`,
    image: `https://source.unsplash.com/random/250×150?${idx}`,
    keywords: randKeyword,
  };
});

export default posts;
