const natashaModal = document.querySelector(".natasha-modal");
const marshaModal = document.querySelector(".marsha-modal");
const overlayTeam = document.querySelector(".overlay-team");
const closeModalBtns = document.querySelectorAll(".team-btn-close");
const natashaBtn = document.querySelector("#natasha-modal-open");
const marshaBtn = document.querySelector("#marsha-modal-open");
const bodyTeam = document.body;

// Function for opening the natasha modal
const openNatashaModal = function () {
	natashaModal.classList.remove("hidden");
	overlayTeam.classList.remove("hidden");
	bodyTeam.classList.add("fixed");
};
// Function for opening the marsha modal
const openMarshaModal = function () {
	marshaModal.classList.remove("hidden");
	overlayTeam.classList.remove("hidden");
	bodyTeam.classList.add("fixed");
};
// Event listener for opening the modal when the natasha button is clicked
natashaBtn.addEventListener("click", openNatashaModal);

// Event listener for opening the modal when the marsha button is clicked
marshaBtn.addEventListener("click", openMarshaModal);

// Function for closing the modal
const closeModalTeam = function () {
	natashaModal.classList.add("hidden");
	marshaModal.classList.add("hidden");
	overlayTeam.classList.add("hidden");
	bodyTeam.classList.remove("fixed");
};

// Event listeners for clicking the close button, clicking the overlay, or pressing Esc key
// closeModalBtns.addEventListener("click", closeModal);
closeModalBtns.forEach(btn => {
	btn.addEventListener("click", closeModalTeam);
});

overlayTeam.addEventListener("click", closeModalTeam);

document.addEventListener("keydown", function (e) {
	if (
		e.key === "Escape" &&
		(!natashaModal.classList.contains("hidden") ||
			!marshaModal.classList.contains("hidden"))
	) {
		closeModalTeam();
	}
});
