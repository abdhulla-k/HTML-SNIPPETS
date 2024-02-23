const cardContainer = document.querySelector(".clowing-cards");
const cards = document.querySelectorAll(".clowing-cards .card");

cardContainer.addEventListener('mousemove', e => {
  cards.forEach(card => {
    const react = card.getBoundingClientRect();

    const x = e.clientX - react.left;
    const y = e.clientY - react.top; // Corrected from react.right to react.top

    card.style.setProperty("--x", `${x}px`)
    card.style.setProperty("--y", `${y}px`)
  })
})

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.setProperty('background-color', 'rgba(248, 10, 10, 0.9)');
  });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty("background-color", 'rgba(0, 0, 0, 0)')
  });
});
