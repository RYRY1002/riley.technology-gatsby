const taglines = {
  "main": "I am a gameplay, graphics, UI, tools, systems and web programmer working mainly in game development in Sydney, Australia.",
  "tripping high people": "Tripping high people since 2021",
  "unreal engine since": "Using Unreal Engine since 2021",
  "programming since": "Writing code since 2016",
  "c++ since": "Writing in C++ since 2021",
  "hlsl since": "Writing in HLSL since 2019",
  "web development since": "Making websites since 2021",
  "ambient music since": "Listening to ambient music non-stop since 2022",
  "good music since": "Listening to cultured music since 2006",
  "coding for no reason": "Programming non-stop for no particular reason",
  "schooling teachers": "Teaching programming teachers new things since 2018",
  "good games since": "Consuming fine interactive entertainment since 2019",
  "good games": "Consumer of fine interactive entertainment",
  "modding games since": "Modding games since 2014"
}
const taglinesArray = Object.values(taglines);
type taglinesEnum = keyof typeof taglines;

const rareTaglines = {
  "here's to you": "Atomic bombs and acid rain: the fallout of your mouth",
  "the motion makes me last 1": "What is it that has my mind so hypnotised?",
  "the motion makes me last 2": "Shapes are for looking at, and their colours create my mood",
  "the motion makes me last 3": "Creation as a pathogen",
  "the motion makes me last 4": "Life is real only when I am (and I am) surprised",
  "for mattia 1": "As time slowly goes by; there's never a next time",
  "for mattia 2": "There's never a next time; there's only a this time",
  "rotten fruit 1": "Everyone's looking around for you, we've got a secret police and camera crew",
  "rotten fruit 2": "Everyone's talking about all the ways that you fuck our empire up, and how you foiled our coup d'état",
  "rotten fruit 3": "Everyone's talking about all the ways that you fuck our engines up, and how you wrecked the banana truck",
  "rotten fruit 4": "This little stunt will cost you half your head, or a thousand oranges",
  "death stranding": "Sam, Sam, he's our man",
  "death stranding 2 1": "The only thing that I'm \"guilty\" of is doing your dirty work",
  "death stranding 2 2": "This thing between us, it was a mistake. No... no, it was not a mistake. It was not a mistake!",
  "death stranding 2 3": "A world divided made whole — with a few \"sticks\" for encouragement",
  "death stranding 2 4": "The more we seek to unite people with metaphorical ropes, the more essential \"sticks\" seem to become",
  "to build a home 1": "Out in the garden where we planted the seeds, there is a tree as old as me",
  "to build a home 2": "I climbed the tree to see the world",
  "to build a home 3": "This is a place where I don't feel alone, this is a place where I feel at home",
  "to build a home 4": "And now it's time to leave and turn to dust"
}
const rareTaglinesArray = Object.values(rareTaglines);
type rareTaglinesEnum = keyof typeof rareTaglines;

export function getRandomTagline() {
  const randomNum = Math.floor(Math.random() * 6);
    
  if (randomNum === 0) {
  return rareTaglinesArray[Math.floor(Math.random() * rareTaglinesArray.length)];
  } else {
    return taglinesArray[Math.floor(Math.random() * taglinesArray.length)];
  }
}

export function getTagline(key: taglinesEnum | rareTaglinesEnum) {
  if (key in rareTaglines) {
    return rareTaglines[key];
  } else {
    return taglines[key];
  }
}