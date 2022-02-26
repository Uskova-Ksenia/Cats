const containers = document.querySelectorAll(".container_card");

containers.forEach((container) => {
    container.addEventListener("click", (e) => {
        const popup = container.querySelector(".description");
        popup.classList.add("active");

        const cross = popup.querySelector(".close");
        
        cross.addEventListener("click", (e) => {
            e.stopPropagation();
            popup.classList.remove("active");
        });

    });
});