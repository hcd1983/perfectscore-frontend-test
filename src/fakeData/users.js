import names from './names';

const avatarStyles = ['adventurer', 'adventurer-neutral', 'avataaars', 'big-ears', 'big-ears-neutral', 'big-smile', 'bottts', 'pixel-art', 'initials'];
const avatarBgs = ['black', 'blue', 'yellow', 'purple', 'white', 'gray', 'lightgray', 'lightblue', 'pink', 'coral', 'green', 'pink', 'lightgreen', '#ff8800', '#4e3f3f'];
const users = names.map((name) => {
  const partOne = Math.floor(Math.random() * 2)
    ? String.prototype.split.call(name, ' ').join('.')
    : String.prototype.split.call(name, ' ')[Math.floor(Math.random() * 2)];
  const partTwo = Math.floor(Math.random() * 100) + 10;
  const username = `${partOne}${partTwo}`;
  // const avatar = `https://i.pravatar.cc/150?u=${username}`;
  const avatarStyle = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
  const avatarBg = avatarBgs[Math.floor(Math.random() * avatarBgs.length)];
  const avatar = `https://avatars.dicebear.com/api/${avatarStyle}/${username}.svg?background=${encodeURIComponent(avatarBg)}`;
  const isFollowing = !!Math.floor(Math.random() * 2);
  return {
    name,
    username,
    avatar,
    isFollowing,
  };
});
export default users;
