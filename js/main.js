// Simple gallery lightbox
document.addEventListener("DOMContentLoaded", function () {
  const thumbs = document.querySelectorAll(".thumb");
  const lightbox = document.getElementById("lightbox");
  const lbImage = document.querySelector(".lb-image");
  const lbClose = document.querySelector(".lb-close");

  thumbs.forEach((t) =>
    t.addEventListener("click", () => {
      const src = t.getAttribute("data-src");
      lbImage.src = src;
      lightbox.classList.remove("hidden");
      lightbox.setAttribute("aria-hidden", "false");
    })
  );

  lbClose.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
    lbImage.src = "";
  });

  // close on backdrop click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lbClose.click();
  });

  // set year in footer
  const y = new Date().getFullYear();
  document.getElementById("year").textContent = y;
});
