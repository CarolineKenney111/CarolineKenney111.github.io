const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Image filenames */
const imageFiles = [
  'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg',
  'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg'
];

/* Alt text for each image */
const altText = {
  'img1.jpg': 'Skiing in the mountains',
  'img2.jpg': 'Sunset by the dock',
  'img3.jpg': 'Girls goofing around downtown',
  'img4.jpg': 'Girls in colorful dresses',
  'img5.jpg': 'Family hug at a bar',
  'img6.jpg': 'Group posing with polar bear sculpture',
  'img7.jpg': 'Friends laughing in the street at sunset',
  'img8.jpg': 'Snowy field with horses and people',
  'img9.jpg': 'Three girls in cowboy hats smiling'
};

/* Create and add thumbnails */
for (let i = 0; i < imageFiles.length; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${imageFiles[i]}`);
  newImage.setAttribute('alt', altText[imageFiles[i]]);
  thumbBar.appendChild(newImage);

  newImage.addEventListener('click', function () {
    displayedImage.setAttribute('src', `images/${imageFiles[i]}`);
    displayedImage.setAttribute('alt', altText[imageFiles[i]]);
  });
}

/* Toggle the overlay */
btn.addEventListener('click', function () {
  const className = btn.getAttribute('class');
  if (className === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  }
});
