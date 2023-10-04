//A website that generates parameters for song ideas

//Global variables
const notes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const modes = [
  "Major",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Minor",
  "Locrian",
];
//Get elements
const generateButton = document.getElementById("generate");
const ideaText = document.getElementById("idea");
generateButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const bpm = generateBpm();
  const getChordProgression = generateChordProgession();
  const chordProgression = getChordProgression[0].replaceAll(",", "-");
  const key = getChordProgression[1];
  const genre = await generateGenre();
  ideaText.innerHTML = `BPM: ${bpm} <br> Chord Progression: ${chordProgression} <br> Key: ${key} <br> Genre: ${genre}`;
});

//Functions
function generateBpm() {
  //Generates a random number between 60 and 180
  return Math.floor(Math.random() * 121) + 60;
}
console.log(generateBpm());
function generateKey() {
  //Generates a random key from the notes array

  return (
    //Gets note
    notes[Math.floor(Math.random() * 12)] +
    " " +
    //Gets mode
    modes[Math.floor(Math.random() * 7)]
  );
}
console.log(generateKey());
function generateChordProgession() {
  //generates a chord progression within the key from the key function
  let key = generateKey();
  let chordProgression = [];
  let chordAmount = 4;
  let startingChord = Math.floor(Math.random() * 7);

  chordProgression.push(startingChord);
  for (let i = 1; i < chordAmount; i++) {
    //Generates a random number between 0 and 6
    let chord = Math.floor(Math.random() * 7) + 1;
    //Adds the chord to the chord progression
    chordProgression.push(chord);
  }
  return [chordProgression.toString(), key];
}
console.log(generateChordProgession());

//Import and use genrenator API for genre
async function generateGenre() {
  return axios
    .get("https://binaryjazz.us/wp-json/genrenator/v1/genre/")
    .then((response) => {
      return response.data;
    });
}
