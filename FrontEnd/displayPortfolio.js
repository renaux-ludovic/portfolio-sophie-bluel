// Nodes to create before display a work.
function displayOneWork(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  const gallery = document.querySelector(".gallery");

  img.src = work.imageUrl;
  img.alt = work.title;
  figcaption.innerText = work.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  
  // Ajouter l'ID du work à l'attribut data-work-id de la figure
  figure.dataset.workId = work.id;

  gallery.appendChild(figure);
}



function createFilterButtons(categories) {
  const filterContainer = document.createElement("div");
  const filterAll = document.createElement("button");

  filterContainer.classList.add("filter-container");
  filterAll.innerText = "Tous";
  filterAll.classList.add("button-filter");
  filterAll.addEventListener("click", () => {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    fetchWorks().then((works) => {
      works.forEach((work) => {
        displayOneWork(work);
      });
    });
  });
  filterContainer.appendChild(filterAll);

  // Rules to create filters and display works by category ID.
  categories.forEach((category) => {
    const filterCategory = document.createElement("button");
    filterCategory.innerText = category.name;
    filterCategory.classList.add("button-filter");
    filterCategory.addEventListener("click", async () => {
      const works = await fetchWorks();
      const filteredWorks = new Set(
        works.filter((work) => work.categoryId === category.id)
      );
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";
      filteredWorks.forEach((work) => {
        displayOneWork(work);
      });
    });
    filterContainer.appendChild(filterCategory);
  });
  return filterContainer;
}

// Async function to display gallery section.
async function displayGallerySection() {
  const categories = await fetchCategories();
  const works = await fetchWorks();
  const filterButtons = createFilterButtons(categories);
  const gallery = document.querySelector(".gallery");
  gallery.parentNode.insertBefore(filterButtons, gallery);
  works.forEach((work) => {
    displayOneWork(work);
  });
}
displayGallerySection();
