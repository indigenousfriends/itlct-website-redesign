const natashaModal = document.querySelector(".natasha-modal");
const marshaModal = document.querySelector(".marsha-modal");
const overlay = document.querySelector(".overlay-la");
const closeModalBtn = document.querySelector(".btn-close");
const natashaBtn = document.querySelector("#natasha-modal-open");
const marshaBtn = document.querySelector("#marsha-modal-open");

console.log(natashaModal);

// Function for opening the natasha modal
const openNatashaModal = function () {
  natashaModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
// Function for opening the marsha modal
const openMarshaModal = function () {
    marshaModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };
// Event listener for opening the modal when the natasha button is clicked
natashaBtn.addEventListener("click", openNatashaModal);

// Event listener for opening the modal when the marsha button is clicked
marshaBtn.addEventListener("click", openMarshaModal);

// Function for closing the modal
const closeModal = function () {
  natashaModal.classList.add("hidden");
  marshaModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Event listeners for clicking the close button, clicking the overlay, or pressing Esc key
closeModalBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
