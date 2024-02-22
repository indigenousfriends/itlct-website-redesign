/* HEADER */

// FOR BUTTON DROP DOWN

// Make a function that will drop down a menu.
// Clickable, and hover. (will go away when not clicked?)

// IF CLICKED, THEN MENU SHOWS. MENU STAYS WHEN IS HOVERED. WHEN YOU MOVE OFF MENU THEN IT COLLAPSE.
var mobileMenu = document.getElementById("mobile-menu");
var navLinks = document.getElementById("nav-links-container");
// X button
var mobileClose = document.getElementById("mobileClose");
// Hamburger
var mobileOpen = document.getElementById("mobileOpen");

mobileMenu.addEventListener("click", function () {
	// Toggle Menu Appear
	navLinks.classList.toggle("hidden");
	mobileClose.classList.toggle("hidden");
	mobileOpen.classList.toggle("hidden");
});

function getNavigationData() {
	const apiURL = `https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/pages?slug="home""&acf_format=standard`;

	fetch(`${apiURL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(response => {
			// Page data
			const data = response[0].acf;
			const navButton = document.getElementById("nav-button");
			const navButtonURL = data.navigation.header_navigation_button.url;
			const navButtonLabel = data.navigation.header_navigation_button.title;
			const navButtonTarget = data.navigation.header_navigation_button.target;

			if (navButton && navButtonURL) {
				navButton.href = navButtonURL;
			}

			if (navButton && navButtonLabel) {
				navButton.textContent = navButtonLabel;
			}

			if (navButton && navButtonTarget) {
				navButton.target = navButtonTarget;
			}
		});
}

getNavigationData();

// Footer Modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay-la");
const openModalBtn = document.querySelector(".btn-la");
const closeModalBtn = document.querySelector(".btn-close");
const body = document.body;

// Function for opening the modal
const openModal = function () {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
	body.classList.add("fixed");
};
// Event listener for opening the modal when the button is clicked
openModalBtn.addEventListener("click", openModal);

// Function for closing the modal
const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
	body.classList.remove("fixed");
};

// Event listeners for clicking the close button, clicking the overlay, or pressing Esc key
closeModalBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});
// End of footer modal

// Mailerlite Form (Newsletter)
(function (w, d, e, u, f, l, n) {
	(w[f] =
		w[f] ||
		function () {
			(w[f].q = w[f].q || []).push(arguments);
		}),
		(l = d.createElement(e)),
		(l.async = 1),
		(l.src = u),
		(n = d.getElementsByTagName(e)[0]),
		n.parentNode.insertBefore(l, n);
})(
	window,
	document,
	"script",
	"https://assets.mailerlite.com/js/universal.js?v=4",
	"ml",
);
ml("account", "764283");
