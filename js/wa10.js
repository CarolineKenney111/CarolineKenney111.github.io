
const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}


const storyText =
    "It was 94 fahrenheit outside, so :insertx: went for a walk. By the time he got to the :inserty:, he was sweating profusely, then he started :insertz:. Emmy saw the whole thing, but was not surprised — :insertx: can bench 300 pounds, and it was a hot day.";

const insertX = ["Coach Prime", "Baby Raphie", "Anthony Pinter"];
const insertY = ["Leeds School of Business", "Chi Omega sorority house", "ATLAS building", "Pearl Street Mall"];
const insertZ = [
    "him suiting up to hike a fourteener",
    "get ready to hit the Downer",
    "to critique Rystan's awesome March Madness bracket",
];

randomize.addEventListener("click", result);

function result() {
    let newStory = storyText; 


    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);

    newStory = newStory
        .replaceAll(":insertx:", xItem)
        .replaceAll(":inserty:", yItem)
        .replaceAll(":insertz:", zItem);


    if (customName.value !== "") {
        newStory = newStory.replaceAll("Emmy", customName.value);
    }

    if (document.getElementById("uk").checked) {
        const weightInStones = Math.round(300 / 14) + " stones"; 
        const tempInCelsius = Math.round((94 - 32) * (5 / 9)) + " Celsius"; 
        newStory = newStory.replaceAll("300 pounds", weightInStones).replaceAll("94 fahrenheit", tempInCelsius);
    }


    story.textContent = newStory;
    story.style.visibility = "visible";
}
