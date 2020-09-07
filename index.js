const addBtn = document.getElementById("addBtn");
const title = document.getElementById("title");
const textNote = document.getElementById("textNote");
const section = document.getElementById("section");
const editCardSection = document.getElementById("edit-card-section");
const inputCard = document.getElementById("card");
var small = document.getElementsByTagName("small")[0];

addBtn.addEventListener("click", function () {
	if (title.value == "" && textNote.value == "") {
		small.style.display = "block";
	} else {
		var card = document.createElement("div");
		card.setAttribute("class", "card");
		card.style.padding = "0.5rem";
		card.style.border = "1px solid lightgrey";
		card.style.borderRadius = "10px";

		var cardBody = document.createElement("div");
		cardBody.setAttribute("class", "card-body");
		cardBody.style.padding = "10px";
		cardBody.style.borderRadius = "10px";

		var cardTitle = document.createElement("div");
		cardTitle.setAttribute("class", "card-title");
		cardTitle.innerText = title.value;
		cardTitle.style.fontWeight = "500";
		cardTitle.style.fontSize = "20px";
		cardTitle.style.margin = "0px";
		cardTitle.style.padding = "12px 0";
		// cardTitle.style.backgroundColor = "gray";

		var cardText = document.createElement("p");
		cardText.setAttribute("class", "card-text");
		cardText.innerText = textNote.value;
		cardText.style.margin = "0px";
		cardText.style.padding = "5px 0";
		// cardText.style.backgroundColor = "red";

		var buttons = document.createElement("div");
		buttons.setAttribute("id", "card-buttons");
		buttons.style.display = "flex";
		buttons.style.justifyContent = "flex-end";
		buttons.style.padding = "3px 0";
		// buttons.style.backgroundColor = "yellow";

		var deleteIcon = document.createElement("i");
		deleteIcon.setAttribute("class", "fas fa-trash");
		deleteIcon.style.color = "red";
		deleteIcon.style.cursor = "pointer";
		deleteIcon.style.float = "right";
		deleteIcon.style.fontSize = "20px";
		deleteIcon.title = "Delete";

		deleteIcon.addEventListener("click", function () {
			card.remove();
		});

		var editIcon = document.createElement("i");
		editIcon.setAttribute("class", "fas fa-pen");
		editIcon.style.color = "green";
		editIcon.style.float = "right";
		editIcon.style.marginRight = "10px";
		editIcon.style.fontSize = "20px";
		editIcon.style.cursor = "pointer";
		editIcon.title = "Edit";

		buttons.appendChild(editIcon);
		buttons.appendChild(deleteIcon);

		title.value = "";
		textNote.value = "";

		if (cardTitle.innerText == "") {
			section.appendChild(card);
			card.appendChild(cardBody);
			cardBody.appendChild(cardText);
			cardBody.appendChild(buttons);
		} else if (cardText.innerText == "") {
			section.appendChild(card);
			card.appendChild(cardBody);
			cardBody.appendChild(cardTitle);
			cardBody.appendChild(buttons);
		} else {
			section.appendChild(card);
			card.appendChild(cardBody);
			cardBody.appendChild(cardTitle);
			cardBody.appendChild(cardText);
			cardBody.appendChild(buttons);
		}

		editIcon.addEventListener("click", function () {
			inputCard.style.display = "none";
			section.style.opacity = "0.5";
			editIcon.style.display = "none";
			deleteIcon.style.display = "none";

			let editCard = document.createElement("div");
			editCard.setAttribute("id", "edit-card");
			editCard.style.padding = "1rem";
			editCard.style.border = "1px solid lightgrey";
			editCard.style.borderRadius = "10px";
			editCard.style.margin = "auto";

			var inputTitle = document.createElement("input");
			inputTitle.style.width = "100%";
			inputTitle.setAttribute("class", "form-control form-control-lg");
			inputTitle.placeholder = "Title";
			inputTitle.value = cardTitle.innerText;

			var textarea = document.createElement("textarea");
			textarea.style.width = "100%";
			textarea.placeholder = "Take a note...";
			textarea.setAttribute("class", "form-control form-control-lg");
			textarea.value = cardText.innerText;

			let uDiv = document.createElement("div");
			uDiv.style.float = "right";

			let updateIcon = document.createElement("i");
			updateIcon.setAttribute("class", "fas fa-check");
			updateIcon.style.backgroundColor = "rgb(39,203,45)";
			updateIcon.style.borderRadius = "50%";
			updateIcon.style.color = "white";
			updateIcon.style.cursor = "pointer";
			updateIcon.style.padding = "10px";

			uDiv.appendChild(updateIcon);

			updateIcon.addEventListener("click", function () {
				if (inputTitle.value == "" && textarea.value == "") {
					card.remove();
				}

				editCard.style.display = "none";
				inputCard.style.display = "";
				section.style.opacity = "1";
				editIcon.style.display = "";
				deleteIcon.style.display = "";

				if (cardTitle.innerText != "") {
					cardText.innerText = textarea.value;
					let addtextarea = cardBody.appendChild(cardText);
					cardBody.insertBefore(addtextarea, buttons);
				}
				if (cardText.innerText != "") {
					cardTitle.innerText = inputTitle.value;
					let addtitle = cardBody.appendChild(cardTitle);
					cardBody.insertBefore(addtitle, cardText);
				}
				console.log(textarea.value);
			});

			editCardSection.appendChild(editCard);
			editCard.appendChild(inputTitle);
			editCard.appendChild(textarea);
			editCard.appendChild(uDiv);
		});
	}
});

title.addEventListener("keyup", function () {
	small.style.display = "none";
});
textNote.addEventListener("keyup", function () {
	small.style.display = "none";
});

small.style.display = "none";
small.style.fontWeight = "500";
small.style.color = "red";
