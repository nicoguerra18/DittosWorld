export const scrollToPlayer = () => {
  const radius = 360; // define the radius within which the player can move without scrolling
  const playerElement = document.querySelector(".player");
  if (playerElement) {
    const playerRect = playerElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;

    if (
      Math.abs(playerRect.left - centerX) > radius ||
      Math.abs(playerRect.top - centerY) > radius
    ) {
      playerElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }
};
