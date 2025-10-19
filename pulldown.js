// pulldown.js
document.addEventListener("DOMContentLoaded", () => {
  const pulldownContainer = document.getElementById("pulldown-container");

  if (!pulldownContainer) {
    console.error("Pulldown container not found!");
    return;
  }

  // Load the pulldown HTML
  fetch("pulldown.html")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.text();
    })
    .then((html) => {
      pulldownContainer.innerHTML = html;

      const pulldownMenu = document.getElementById("pulldown-menu");
      const hamburgers = document.querySelectorAll(".hamburger-icon, .hamburger-icon-2");

      if (!pulldownMenu || hamburgers.length === 0) {
        console.error("Missing pulldown menu or hamburger icons!");
        return;
      }

      // Toggle function
      const toggleMenu = (open) => {
        if (open) {
          pulldownMenu.classList.add("open");
          hamburgers.forEach((btn) => btn.setAttribute("aria-expanded", "true"));
        } else {
          pulldownMenu.classList.remove("open");
          hamburgers.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
        }
      };

      // Add event listeners to all hamburger icons
      hamburgers.forEach((hamburger) => {
        hamburger.addEventListener("click", (e) => {
          e.stopPropagation();
          const isOpen = pulldownMenu.classList.contains("open");
          toggleMenu(!isOpen);
        });
      });

      // Close when clicking outside
      document.addEventListener("click", (e) => {
        if (
          pulldownMenu.classList.contains("open") &&
          !pulldownMenu.contains(e.target) &&
          ![...hamburgers].some((btn) => btn.contains(e.target))
        ) {
          toggleMenu(false);
        }
      });

      // Close when clicking a menu link
      pulldownMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => toggleMenu(false));
      });
    })
    .catch((err) => console.error("Error loading pulldown menu:", err));
});
