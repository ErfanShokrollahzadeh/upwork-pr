// Simple gallery lightbox
document.addEventListener("DOMContentLoaded", function () {
  const thumbs = Array.from(document.querySelectorAll(".thumb"));
  const lightbox = document.getElementById("lightbox");
  const lbImage = document.querySelector(".lb-image");
  const lbClose = document.querySelector(".lb-close");
  const lbTitle = document.querySelector(".lb-title");
  const lbDesc = document.querySelector(".lb-desc");
  const lbPrev = document.querySelector(".lb-prev");
  const lbNext = document.querySelector(".lb-next");

  let currentIndex = -1;

  function openLightbox(index) {
    const t = thumbs[index];
    if (!t) return;
    const src = t.getAttribute("data-src");
    const title = t.getAttribute("data-title") || "";
    const desc = t.getAttribute("data-desc") || "";
    lbImage.src = src;
    lbTitle.textContent = title;
    lbDesc.textContent = desc;
    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");
    currentIndex = index;
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
    lbImage.src = "";
    currentIndex = -1;
  }

  // attach click handlers to thumbs (gallery & cards)
  thumbs.forEach((t, i) => {
    t.addEventListener("click", () => openLightbox(i));
  });

  lbClose.addEventListener("click", closeLightbox);

  // prev/next
  lbPrev &&
    lbPrev.addEventListener("click", () => {
      if (currentIndex > 0) openLightbox(currentIndex - 1);
    });
  lbNext &&
    lbNext.addEventListener("click", () => {
      if (currentIndex < thumbs.length - 1) openLightbox(currentIndex + 1);
    });

  // keyboard
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") lbPrev && lbPrev.click();
    if (e.key === "ArrowRight") lbNext && lbNext.click();
  });

  // close on backdrop click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Filters
  const filters = document.querySelectorAll(".filter");
  const projectCards = document.querySelectorAll(".project-card");
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.getAttribute("data-filter");
      projectCards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        if (f === "all" || cat === f) card.style.display = "";
        else card.style.display = "none";
      });
    })
  );

  // Load more (simple prototype behavior: clone first set once)
  const loadMore = document.getElementById("loadMore");
  if (loadMore) {
    loadMore.addEventListener("click", () => {
      const grid = document.getElementById("projectsGrid");
      if (!grid) return;
      // clone first 3 cards and append
      const cards = Array.from(grid.querySelectorAll(".project-card"));
      if (!cards.length) return;
      const clones = cards.slice(0, 3).map((c) => c.cloneNode(true));
      clones.forEach((cl) => grid.appendChild(cl));
      // refresh thumbs list to include clones
      clones.forEach((cl) => {
        const t = cl.querySelector(".thumb");
        if (t) thumbs.push(t);
      });
      loadMore.textContent = "Daha fazla yüklendi";
      loadMore.disabled = true;
      loadMore.classList.add("disabled");
    });
  }

  // set year in footer
  const y = new Date().getFullYear();
  document.getElementById("year").textContent = y;
});
