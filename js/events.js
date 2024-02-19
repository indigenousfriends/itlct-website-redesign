// Fetch all events
function getAllEventsData() {
	const apiURL =
		"https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/events?acf_format=standard";

	fetch(`${apiURL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(response => {
			const items = response;

			// Generate cards for each item
			items.forEach((item, index) => {
				// Single item data
				const data = item.acf;

				// Using dates to sort events
				const currentDate = new Date();
				data.enddate ? (endDate = new Date(data.enddate)) : null;
				endDate ? (past = endDate < currentDate) : null;

				// Container elements
				const container = document.getElementById(`events-container`);
				const pastEventsContainer = document.getElementById(
					"previous-events-container",
				);

				const card = document.createElement("div");
				card.classList.add("card", "event");
				const cardLink = document.createElement("a");
				cardLink.href = `events/event.html?e=${item.slug}`;
				card.appendChild(cardLink);

				// Append data to the card
				if (data.featured_image.url) {
					const image = document.createElement("img");
					image.src = data.featured_image.url;
					data.featured_image.alt
						? (image.alt = data.featured_image.alt)
						: "If These Lands Could Talk";
					cardLink.appendChild(image);
				}
				if (response[index].title) {
					const infoWrapper = document.createElement("div");
					infoWrapper.classList.add("event-info");
					cardLink.appendChild(infoWrapper);

					const title = document.createElement("h3");
					title.textContent = response[index].title.rendered;
					title.classList.add("h4-styles");
					infoWrapper.appendChild(title);
					if (data.excerpt) {
						const excerpt = document.createElement("p");
						excerpt.textContent = data.excerpt;
						infoWrapper.appendChild(excerpt);
					}
				}

				// Append this card to the container
				if (past && pastEventsContainer) {
					pastEventsContainer.appendChild(card);
				} else if (!past && container) {
					container.appendChild(card);
				} else {
					null;
				}
			});
		})
		.catch(error => console.error("Error:", error));
}

// Fetch single event data
function getSingleEventData() {
	const urlParams = new URLSearchParams(window.location.search);
	const slug = urlParams.get("e");
	const apiURL = `https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/events?slug=${slug}&acf_format=standard`;

	fetch(`${apiURL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(response => {
			const data = response[0].acf;
			const posterContainer = document.getElementById("poster-container");
			const title = document.getElementById("post-title");
			const description = document.getElementById("description-container");
			const highlights = document.getElementById("highlights-container");
			const btnContainer = document.getElementById("button-container");
			console.log(btnContainer);
			if (data.featured_image.url) {
				const imageContainer = document.createElement("div");
				imageContainer.classList.add("template-hero-img");

				const image = document.createElement("img");
				image.src = data.featured_image.url;
				data.featured_image.alt
					? (image.alt = data.featured_image.alt)
					: "If These Lands Could Talk";

				imageContainer.appendChild(image);
				posterContainer.appendChild(imageContainer);
			}

			response[0].title.rendered && title // Using the WordPress title field (not ACF)
				? appendData(response[0].title.rendered, "h1", "text", title) // Change "markup" to
				: null;
			data.content && description
				? appendData(data.content, "div", "markup", description)
				: null;
			data.button_1 && btnContainer
				? appendData(data.button_1, "button-1", "link", btnContainer)
				: null;
			data.button_2 && btnContainer
				? appendData(data.button_2, "button-2", "link", btnContainer)
				: null;
			data.highlights && highlights
				? appendData(data.highlights, "div", "markup", highlights)
				: null;
		})
		.catch(error => console.error("Error:", error));
}
