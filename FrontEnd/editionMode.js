//  To display edition mode
const admin = sessionStorage.getItem("admin");
const token = admin ? JSON.parse(admin).token : null;
if (admin) {
  adminConnected();
}

function adminConnected() {
  createLogoutLink();
  createAdministrationBar();
  displayEditionButton();
}

function createLogoutLink() {
  const loginLinkMenu = document.querySelector("#login-link-menu");
  const adminLinkMenu = document.createElement("a");
  adminLinkMenu.href = "#";
  adminLinkMenu.classList.add("#logout-link-menu");
  adminLinkMenu.textContent = "logout";
  loginLinkMenu.innerHTML = "";
  loginLinkMenu.appendChild(adminLinkMenu);
  adminLinkMenu.addEventListener("click", function (event) {
    event.preventDefault();
    sessionStorage.removeItem("connected");
    sessionStorage.removeItem("admin");
    window.location.href = "login.html";
  });
}

function createAdministrationBar() {
  const body = document.querySelector("body");
  const administrationBar = document.createElement("div");
  administrationBar.classList.add("administration-bar");
  body.parentNode.insertBefore(administrationBar, body);

  const editionWhiteIcon = document.createElement("img");
  editionWhiteIcon.src = "assets/icons/white-edition.png";
  editionWhiteIcon.classList.add("edition-icon");

  const editionMode = document.createElement("p");
  editionMode.classList.add("edition-mode");
  editionMode.textContent = " Mode édition";

  const submitChangesButton = document.createElement("button");
  submitChangesButton.classList.add("submit-changes-button");
  submitChangesButton.addEventListener("click", handleChanges);
  submitChangesButton.textContent = "publier les changements";
  administrationBar.appendChild(editionWhiteIcon);
  administrationBar.appendChild(editionMode);
  administrationBar.appendChild(submitChangesButton);
}

function handleChanges() {
  console.log("Comming soon");
}

function displayEditionButton() {
  const editionButton = document.querySelector("#modal-open-btn");
  editionButton.style.display = null;
  document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
  });
}

// Settings Edit modal
const addImgContent = document.querySelector(".add-img-content");
const editModalContent = document.querySelector(".modal-content");
const divModalClose = document.querySelector(".div-js-modal-close");
const divModalReturnClose = document.querySelector(
  ".div-js-modal-return-close"
);
const addBtnContainer = document.querySelector(".add-btn-container");
const imgPreviewContainer = document.querySelector(".img-preview-container");

document.addEventListener("DOMContentLoaded", function () {
  const modalOpenBton = document.querySelector("#modal-open-btn");
  modalOpenBton.addEventListener("click", displayWorksEditModal());
});

//  To open modal
function openModal(event) {
  event.preventDefault();
  modal = document.querySelector(".modal");
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close-2")
    .addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
}

//  To close modal
function closeModal(event) {
  event.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close-2")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  addImgContent.style.display = "none";
  editModalContent.style.display = null;
  divModalReturnClose.style.display = "none";
  divModalClose.style.display = null;
  if (imgPreviewContainer.hasChildNodes()) {
    imgPreviewContainer.innerHTML = "";
  }
  addBtnContainer.style.display = null;
}
function stopPropagation(event) {
  event.stopPropagation();
}

// To display works in the modal
const displayWorksEditModal = async () => {
  const works = await fetchWorks();
  const divEditWorks = document.getElementById("div-edit-works");

  works.forEach((work) => {
    const workContainer = createWorkContainer(work);
    divEditWorks.appendChild(workContainer);
  });
};

// To create each work
const createWorkContainer = (work) => {
  const workContainer = document.createElement("div");
  const workImgContainer = document.createElement("div");
  const editButton = document.createElement("button");
  const binButton = document.createElement("button");
  const binIcon = document.createElement("img");

  workContainer.classList.add("work-container");
  workImgContainer.classList.add("work-img-container");
  editButton.classList.add("edit-button");
  binButton.classList.add("bin-button");
  binIcon.classList.add("bin-icon");
  editButton.textContent = "Editer";
  workImgContainer.style.backgroundImage = `url(${work.imageUrl})`;
  workContainer.dataset.workId = work.id;
  binIcon.src = "assets/icons/bin.png";

  workContainer.appendChild(workImgContainer);
  workImgContainer.appendChild(binButton);
  workContainer.appendChild(editButton);
  binButton.appendChild(binIcon);

  binButton.addEventListener("click", async (event) => {
    const gallery = document.querySelector(".gallery");
    const figure = gallery.querySelector(`figure[data-work-id="${work.id}"]`);
    event.preventDefault();
    await deleteWork(work.id);
    workContainer.remove();
    gallery.removeChild(figure);
  });
  return workContainer;
};

//  Settings add work modal
document.addEventListener("DOMContentLoaded", function () {
  const buttonAddImg = document.querySelector("#button-add-img");
  const addImgContent = document.querySelector(".add-img-content");
  const editModalContent = document.querySelector(".modal-content");

  // To reset fields and display add work modal on click
  buttonAddImg.addEventListener("click", function () {
    const fileInput = document.querySelector("#picture-upload");
    fileInput.value = "";
    fileInput.type = "";
    fileInput.type = "file";
    titleInput.value = "";
    categorySelect.value = "Choice";
    pictureUploadInput.value = "";
    submitButton.classList.remove("active");
    addImgContent.style.display = null;
    editModalContent.style.display = "none";
    displayDivReturnClose();
  });
});

//  To display return arrow and go back to edit modal on click
function displayDivReturnClose() {
  const returnButton = document.querySelector(".js-modal-return");
  divModalReturnClose.style.display = null;
  divModalClose.style.display = "none";

  returnButton.addEventListener("click", function () {
    addImgContent.style.display = "none";
    editModalContent.style.display = null;
    divModalReturnClose.style.display = "none";
    divModalClose.style.display = null;
    addBtnContainer.style.display = null;
    imgPreviewContainer.innerHTML = "";
  });
}

// To check file
const fileInput = document.querySelector("#picture-upload");
fileInput.addEventListener("change", handleFileSelect);

function handleFileSelect(event) {
  const file = event.target.files[0];

  if (file) {
    const maxSizeInBytes = 4 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert(
        "La taille du fichier dépasse la limite autorisée (4 Mo). Veuillez sélectionner un fichier plus petit."
      );
      return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", function () {
      const imgPreview = document.createElement("img");
      imgPreview.src = reader.result;
      addBtnContainer.style.display = "none";
      imgPreviewContainer.innerHTML = "";
      imgPreviewContainer.appendChild(imgPreview);
    });
    reader.readAsDataURL(file);
  }
}

// To post a new work
const form = document.querySelector(".form-add-picture");
const titleInput = document.querySelector("#title-input");
const categorySelect = document.querySelector("#category-select");
const pictureUploadInput = document.querySelector("#picture-upload");
const submitButton = document.querySelector(".submit-add-picture");

// To generate category choice
async function generateCategories() {
  const selectElement = document.querySelector("#category-select");
  const response = await fetchCategories();

  response.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    selectElement.appendChild(option);
  });
}
document.addEventListener("DOMContentLoaded", generateCategories);

// To submit a new work if the form is valid
const formAddPicture = document.querySelector(".form-add-picture");

titleInput.addEventListener("input", validateForm);
categorySelect.addEventListener("change", validateForm);
pictureUploadInput.addEventListener("change", validateForm);

function validateForm() {
  const isTitleValid = titleInput.value.trim() !== "";
  const isCategoryValid = categorySelect.value !== "";
  const isPictureValid = pictureUploadInput.files.length > 0;

  if (isTitleValid && isCategoryValid && isPictureValid) {
    submitButton.disabled = false;
    submitButton.classList.add("active");
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove("active");
  }
}

// To submit a new work
formAddPicture.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fileInput = document.querySelector("#picture-upload");
  const titleInput = document.querySelector("#title-input");
  const categorySelect = document.querySelector("#category-select");
  const formData = new FormData();

  formData.append("image", fileInput.files[0]);
  formData.append("title", titleInput.value);
  formData.append("category", categorySelect.value);

  const response = await uploadData(formData);
  const newWork = {
    imageUrl: response.data.imageUrl,
    title: response.data.title,
  };
  createWorkContainer(newWork);
  displayOneWork(newWork);
  displayNewWork(newWork);

  fileInput.value = "";
  titleInput.value = "";
  categorySelect.value = "";
  imgPreviewContainer.innerHTML = "";
  addBtnContainer.style.display = null;
});

function displayNewWork(work) {
  const workContainer = document.createElement("div");
  const workImgContainer = document.createElement("div");
  const editButton = document.createElement("button");
  const binButton = document.createElement("button");
  const binIcon = document.createElement("img");

  workContainer.classList.add("work-container");
  workImgContainer.classList.add("work-img-container");
  editButton.classList.add("edit-button");
  binButton.classList.add("bin-button");
  binIcon.classList.add("bin-icon");
  editButton.textContent = "Editer";
  workImgContainer.style.backgroundImage = `url(${work.imageUrl})`;
  workContainer.dataset.workId = work.id;
  binIcon.src = "assets/icons/bin.png";

  workContainer.appendChild(workImgContainer);
  workImgContainer.appendChild(binButton);
  workContainer.appendChild(editButton);
  binButton.appendChild(binIcon);
  const divEditWorks = document.querySelector("#div-edit-works");
  divEditWorks.appendChild(workContainer);

  binButton.addEventListener("click", async (event) => {
    const gallery = document.querySelector(".gallery");
    const figure = gallery.querySelector(`figure[data-work-id="${work.id}"]`);
    event.preventDefault();
    await deleteWork(work.id);
    workContainer.remove();

    if (figure) {
      gallery.removeChild(figure); 
    } else {
      console.error(
        "Travail non trouvé."
      );
    }
  });
  return workContainer;
}
