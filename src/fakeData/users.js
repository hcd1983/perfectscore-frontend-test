const male = ['Sydney Dalton', 'Eli Cain', 'Ignacio Salinas', 'Anderson Elliott', 'Jarrod Norton', 'Quinn Sampson', 'Kerry Chang', 'Anthony Mccormick', 'Lionel Tyler', 'Ivory Krueger', 'Lonnie Allen', 'Otis Lewis', 'Amado Tucker', 'Leslie Berg', 'Ira Holder', 'Christopher Lara', 'Ramon Greene', 'Lanny Beard', 'Junior Walsh', 'Alejandro Acevedo', 'Erik Campos', 'Rickie House', 'Stacey Duke', 'Roland Singh', 'Antonio Cohen', 'Scot Montes', 'Damion Choi', 'Mohamed Diaz', 'Austin Douglas', 'Edgardo Fisher', 'Stefan Craig', 'Olin Choi', 'Jerry Mcclure', 'Emilio Arias', 'Ronny Jefferson', 'Thanh Fleming', 'Rudolph Vance', 'Dusty Ayers', 'Arthur Ramos', 'Terry Gardner', 'Scot Summers', 'Rickie Gill', 'Winfred Haynes', 'Jules Roy', 'Gil Grant', 'Junior Hughes', 'Earle Shaffer', 'Jamie Pierce', 'Willis Ford', 'Max Foley', 'Wallace Hicks', 'Ronny Farrell', 'Elwood Williams', 'Gail Lester', 'Rickey Mueller', 'Brock Mcmillan', 'Nestor Floyd', 'Rafael Odonnell', 'Joan Barton', 'Steven Le', 'Alec Murray', 'Emerson Simmons', 'Dallas Raymond', 'David Velez', 'Rene Powers', 'Chad Morales', 'Judson Mcclain', 'Leland Munoz', 'Stuart Rush', 'Elliot Snow', 'Lawrence Hanna', 'Federico Simon', 'Bennie Stein', 'Rex Pruitt', 'Seth Ball', 'Erin Blair', 'Luke Bautista', 'Clinton Buckley', 'Les Mora', 'Sylvester Forbes', 'Delbert Vasquez', 'Tory Flowers', 'Wilson Farmer', 'Carmen Moreno', 'Jesus Holmes', 'Julio Branch', 'Norberto Eaton', 'Moises Curtis', 'Devon Price', 'Barney Stout', 'Bradley Patterson', 'Angelo Owens', 'Andy Tapia', 'Sam Mora', 'Tommie Arias', 'Trevor Castillo', 'Jarvis Solis', 'Daren Marks', 'Lenny Tapia', 'Caleb Stephens'];
const female = ['Lessie Blanchard', 'Savannah Haas', 'Sybil Foster', 'Kathie Gaines', 'Eva Hess', 'Bonita Bowers', 'Shawn Fuller', 'Traci Poole', 'Kristin Kennedy', 'Ilene Olson', 'Casandra Friedman', 'Cynthia Yu', 'Sophia Ward', 'Marla Mcmahon', 'Maxine Lam', 'Carmela Norris', 'Madge Guerrero', 'Lilia Thomas', 'Lacy Rhodes', 'Cecilia Pearson', 'Kenya Bryan', 'Jacquelyn Ramsey', 'Penny Espinoza', 'Faye Herrera', 'Whitney Rangel', 'Elsie Berg', 'Nellie Yang', 'Maryellen Miller', 'Louisa Bruce', 'Latoya Goodwin', 'Janelle Middleton', 'Penelope Romero', 'Cora Barker', 'Ora Wright', 'Lorrie Lewis', 'Margaret Villa', 'Virgie Beasley', 'Claudette Simpson', 'Deloris Chambers', 'Darcy Schmitt', 'Joyce Gallagher', 'Gladys Fox', 'Jessica Gilmore', 'Mindy Villegas', 'Kimberley Murphy', 'Sherry Lamb', 'Ada Strong', 'Luann Wells', 'Gladys Peck', 'Luann Buckley', 'Phyllis Snow', 'Amber Short', 'Gwen Golden', 'Lenore Brown', 'Camille Cabrera', 'Dionne White', 'Julianne Suarez', 'Jacquelyn Jarvis', 'Geraldine Strong', 'Susana Donovan', 'Lorie Tapia', 'Donna Andrade', 'Edna Weaver', 'Muriel Scott', 'Jaime Wiley', 'Elnora Wilkins', 'Rebecca Krueger', 'Michele Norman', 'Cathleen Bonilla', 'Rosie Tran', 'Ilene Porter', 'Althea Brady', 'Vera Alvarado', 'Janie Best', 'Amalia Carrillo', 'Ola Hanson', 'Opal Bowman', 'Gena Suarez', 'Noreen Prince', 'Karin Rosario', 'Laura Dixon', 'Jessie Miranda', 'Florine Wiggins', 'Judy Marshall', 'Glenna Luna', 'Lynnette Reynolds', 'Ronda Mcdaniel', 'Lorene Bender', 'Jami Mcdaniel', 'Minnie Burgess', 'Katherine Reese', 'Phoebe Cervantes', 'Jeanie English', 'Deidre Valentine', 'Meredith Vasquez', 'Rosa Kramer', 'Elvira Hebert', 'Trudy Henry', 'Aida Huffman', 'Marisol Small'];
const names = [...male, ...female];
function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // eslint-disable-next-line no-param-reassign
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
shuffle(names);
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