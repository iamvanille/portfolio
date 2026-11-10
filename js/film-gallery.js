(() => {
    const gallery = document.querySelector(".film-gallery");
    const dialog = document.querySelector("#film-gallery-dialog");

    if (!(gallery instanceof HTMLElement) || !(dialog instanceof HTMLDialogElement)) {
        return;
    }

    const cards = Array.from(gallery.querySelectorAll(".film-gallery-card"));
    const dialogImage = dialog.querySelector(".film-gallery-dialog-image");
    const dialogTitle = dialog.querySelector("#film-gallery-title");
    const dialogDescription = dialog.querySelector(".film-gallery-description") || "";
    const previousButton = dialog.querySelector(".film-gallery-previous");
    const nextButton = dialog.querySelector(".film-gallery-next");
    const closeButton = dialog.querySelector(".film-gallery-close");
    let activeIndex = 0;

    function showProject(index) {
        activeIndex = (index + cards.length) % cards.length;
        const card = cards[activeIndex];
        const image = card.querySelector("img");
        const title = card.dataset.title || `Project ${activeIndex + 1}`;

        dialogTitle.textContent = title;
        // dialogDescription.textContent = card.dataset.description || "";
        dialogDescription.innerHTML = card.dataset.description || "";
        dialogImage.alt = title;

        const imageSource = image.getAttribute("src");
        if (imageSource) {
            dialogImage.setAttribute("src", imageSource);
        } else {
            dialogImage.removeAttribute("src");
        }
    }

    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            showProject(index);
            dialog.showModal();
        });
    });

    previousButton.addEventListener("click", () => showProject(activeIndex - 1));
    nextButton.addEventListener("click", () => showProject(activeIndex + 1));
    closeButton.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
    dialog.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            showProject(activeIndex - 1);
        } else if (event.key === "ArrowRight") {
            showProject(activeIndex + 1);
        }
    });
})();
