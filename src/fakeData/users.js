import names from './names';

const users = names.map((name) => {
  const partOne = Math.floor(Math.random() * 2)
    ? String.prototype.split.call(name, ' ').join('.')
    : String.prototype.split.call(name, ' ')[Math.floor(Math.random() * 2)];
  const partTwo = Math.floor(Math.random() * 100) + 10;
  const username = `${partOne}${partTwo}`;
  const avatar = `https://i.pravatar.cc/150?u=${username}`;
  const isFollowing = !!Math.floor(Math.random() * 2);
  return {
    name,
    username,
    avatar,
    isFollowing,
  };
});
export default users;
