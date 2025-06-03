function filterInterns() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
  
    cards.forEach(card => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      const school = card.querySelector('p').textContent.toLowerCase();
      if (name.includes(input) || school.includes(input)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }
  