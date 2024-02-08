/* 
===================================
Modals
===================================
*/

// HTML Reference Variables
let openModalBtns = document.querySelectorAll(`[data-role="open-modal"]`);
let closeModalBtns = document.querySelectorAll(`[data-role="close-modal"]`);
console.log(openModalBtns);
console.log(closeModalBtns);
// toggle modal on and off
const toggleModal = modal => {
	document.body.classList.toggle("disable-scroll");
	modal.classList.toggle("hidden");
};

// Global Modal Events
// open modal button events
openModalBtns.forEach(button => {
	button.addEventListener("click", () => {
		let modalElement = document.querySelector(`#${button.dataset.type}`);
		// open modal
		toggleModal(modalElement);
	});
});

// exit via close modal button
closeModalBtns.forEach(button => {
	button.addEventListener("click", () => {
		let modalElement = button.closest(".modal-overlay");
		toggleModal(modalElement);
	});
});

// exit modal via click on modal overlay
document.addEventListener("click", event => {
	if (event.target.classList.contains("modal-overlay")) {
		toggleModal(event.target);
	}
});

// escape key on modal
document.addEventListener("keydown", function (event) {
	console.log(event);
	let allModalElements = document.querySelectorAll(".modal-overlay");

	if (event.key === "Escape") {
		allModalElements.forEach(modal => {
			if (!modal.classList.contains("hidden")) {
				toggleModal(modal);
			}
		});
	}
});

// Populate modal
function populateTeamModal(data) {
	const teamMemberData = {
		imgPath: data.image.url,
		name: data.name,
		role: data.position,
		bio: data.bio,
	};

	const { imgPath, name, role, bio } = teamMemberData;

	// Team modal elements
	const memberImg = document.querySelector("#modal-member-img");
	const memberName = document.querySelector("#modal-member-name");
	const memberRole = document.querySelector("#modal-member-role");
	const memberBio = document.querySelector("#modal-member-bio");

	// picture
	memberImg.src = imgPath;
	memberImg.alt = `A profile picture of ${name}`;

	// text
	memberName.textContent = name;
	memberRole.textContent = role;

	// bio
	appendData(bio, "p", "text", memberBio);
}

function generateCards(items) {
	items.forEach(item => {
		// Single item data
		const data = item.acf;
		// Container elements
		const container = document.getElementById(`team-members-container`);
		const card = document.createElement("div");
		card.classList.add("team-card");

		// Append data to the card
		if (data.image.url) {
			const imageContainer = document.createElement("div");
			imageContainer.classList.add("team-card-picture");
			card.appendChild(imageContainer);
			const img = document.createElement("img");
			img.src = data.image.url;
			data.image.alt ? (img.alt = data.image.alt) : (img.alt = data.name);
			imageContainer.appendChild(img);
		}

		const text = document.createElement("div");
		text.classList.add("text-container");
		card.appendChild(text);

		if (data.name) {
			const name = document.createElement("h2");
			name.classList.add("h4-styles");
			name.textContent = data.name;
			text.appendChild(name);
		}
		if (data.position) {
			const position = document.createElement("h3");
			position.classList.add("h5-styles");
			position.textContent = data.position;
			text.appendChild(position);
		}
		if (data.summary) {
			const summary = document.createElement("p");
			summary.textContent = data.summary;
			text.appendChild(summary);
		}

		if (data.bio && text) {
			const btn = document.createElement("button");
			btn.classList.add("button2", "team-modal-btn");
			btn.setAttribute("data-role", "open-team-modal");
			btn.setAttribute("data-type", "team-modal");
			btn.setAttribute("data-content", slugify(data.name));
			btn.textContent = "Read More";
			text.appendChild(btn);

			btn.addEventListener("click", () => {
				let modalElement = document.querySelector(`#${btn.dataset.type}`);
				let member = btn.dataset.content;

				// opening modals based on data-content attr
				if (member) {
					// populate modal according to data-content
					populateTeamModal(data);

					// open modal
					toggleModal(modalElement);
					member = "";
				} else {
					// open modal
					toggleModal(modalElement);
				}
			});
		}

		// Append this card to the container
		container.appendChild(card);
	});
}

// Fetch all team members
function getAllTeamData() {
	const apiURL =
		"https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/team?acf_format=standard";

	fetch(`${apiURL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(response => {
			const items = response;
			generateCards(items);
			// generateModals(items);
		})
		.catch(error => console.error("Error:", error));
}

getAllTeamData();
