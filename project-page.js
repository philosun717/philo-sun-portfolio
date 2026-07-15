function currentProject() {
  const id = document.body.dataset.projectId;
  return window.portfolioWorks.find((project) => project.id === id);
}

function assetPath(path) {
  return `../${path}`;
}

function projectHref(project) {
  return project.detailUrl.replace("projects/", "");
}

function imageBlock(src, label, className = "project-image") {
  return `
    <figure class="${className}">
      <img src="${assetPath(src)}" alt="${label}" loading="lazy" onerror="this.parentElement.classList.add('is-missing'); this.remove();" />
      <figcaption class="project-image-placeholder">${label}</figcaption>
    </figure>
  `;
}

function renderProjectPage() {
  const project = currentProject();
  if (!project) return;

  const currentIndex = window.portfolioWorks.findIndex((item) => item.id === project.id);
  const previous = window.portfolioWorks[(currentIndex - 1 + window.portfolioWorks.length) % window.portfolioWorks.length];
  const next = window.portfolioWorks[(currentIndex + 1) % window.portfolioWorks.length];

  document.title = `${project.title} | Philo SUN`;
  document.querySelector("#projectNumber").textContent = project.number;
  document.querySelector("#projectTitle").textContent = project.title;
  document.querySelector("#projectTitleCn").textContent = project.titleCn;
  document.querySelector("#projectCategory").textContent = project.category;
  document.querySelector("#projectYear").textContent = project.year;
  document.querySelector("#projectDescription").textContent = project.description;
  document.querySelector("#projectDescriptionCn").textContent = project.descriptionCn;
  document.querySelector("#projectHeroImage").innerHTML = imageBlock(project.cover, `${project.title} cover`, "project-image project-hero-cover");

  document.querySelector("#overviewBackground").textContent = project.description;
  document.querySelector("#overviewGoal").textContent = `Build a coherent visual language for ${project.titleCn}, from identity foundations to applied brand communication.`;
  document.querySelector("#overviewRole").textContent = "Brand identity, visual system design, layout direction and case presentation.";

  const selected = project.selectedImages.length ? project.selectedImages : [project.cover];
  document.querySelector("#identityGrid").innerHTML = selected
    .map((src, index) => imageBlock(src, `${project.title} selected image ${index + 1}`, "project-image case-figure"))
    .join("");

  document.querySelector("#applicationGrid").innerHTML = selected
    .slice(0, 4)
    .map((src, index) => imageBlock(src, `${project.title} application image ${index + 1}`, "project-image case-figure"))
    .join("");

  const manualSection = document.querySelector("#manualSection");
  const manualGrid = document.querySelector("#manualGrid");
  if (project.manualImages.length) {
    manualGrid.innerHTML = project.manualImages
      .map((src, index) => imageBlock(src, `${project.title} manual page ${index + 1}`, "project-image manual-thumb"))
      .join("");
  } else {
    manualSection.style.display = "none";
  }

  document.querySelector("#previousProject").textContent = `Previous / ${previous.title}`;
  document.querySelector("#previousProject").href = projectHref(previous);
  document.querySelector("#nextProject").textContent = `Next / ${next.title}`;
  document.querySelector("#nextProject").href = projectHref(next);

  initManualToggle();
  initImageModal();
}

function initManualToggle() {
  const button = document.querySelector("#manualToggle");
  const grid = document.querySelector("#manualGrid");
  if (!button || !grid) return;

  button.addEventListener("click", () => {
    const isOpen = grid.classList.toggle("is-open");
    button.textContent = isOpen ? "Hide Full Manual" : "View Full Manual";
  });
}

function initImageModal() {
  const modal = document.querySelector("#imageModal");
  const modalImage = document.querySelector("#modalImage");
  const closeButton = document.querySelector("#modalClose");
  if (!modal || !modalImage || !closeButton) return;

  document.querySelectorAll(".manual-thumb img").forEach((image) => {
    image.addEventListener("click", () => {
      modalImage.src = image.src;
      modal.classList.add("is-open");
    });
  });

  closeButton.addEventListener("click", () => modal.classList.remove("is-open"));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.classList.remove("is-open");
  });
}

function initProjectNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.classList.toggle("is-open");
    nav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", () => {
    toggle.classList.remove("is-open");
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
}

renderProjectPage();
initProjectNavigation();
