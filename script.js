const cardTemplate = document.querySelector('.card_template');
const cardListContainer = document.querySelector('.container_cards');


const popupEditCats = document.querySelector('.edit_popup');
const formEdit = popupEditCats.querySelector('.popup_form');

fetchCats()

function fetchCats() {
    addCreateCatAction()
    addFilterAction()
    addShowAllAction()
    addDeleteAction()
    addEditAction()
    const cats = api.getAllCats().then(data => createCollection(data.data));
}

//------------------------------------------------------------------------------------------------------------------------
// Show Methods
//------------------------------------------------------------------------------------------------------------------------
function createCollection(catsData) {
    cardListContainer.innerHTML = "";
    if (Array.isArray(catsData)) {
        catsData
        .forEach(catData => {
            createCard(catData);
        })
    } else {
        createCard(catsData);
    }
}

function createCard(catData) {
    const newCardElement = cardTemplate.content.querySelector('.card').cloneNode(true)
    
    const cardImage = newCardElement.querySelector('.card_img');
    const cardName = newCardElement.querySelector('.cat_name');
    const cardRate = newCardElement.querySelector('.rate');

    cardImage.src = catData.img_link;
    cardImage.dataset.id = catData.id;
    cardName.textContent = catData.name;
    createRate(cardRate, catData.rate)

    cardListContainer.appendChild(newCardElement);
}

function createRate(rateElement, catData) {
    rateElement.innerHTML = ""
    if (catData != undefined) {
        for (var i = 0; i < 10; i++) {
            if (i < 7 ) {//catData.rate) { //TODO: распарсить рейтинг.
                const rateFillImage = document.createElement("img");
                rateFillImage.src = "img/cat-fill.svg";
                rateFillImage.setAttribute("id", "true");
                rateElement.appendChild(rateFillImage);
            } else {
                const rateEmptyImage = document.createElement("img");
                rateEmptyImage.src = "img/cat-stroke.svg";
                rateEmptyImage.setAttribute("id", "false");
                rateElement.appendChild(rateEmptyImage);
            }
        }
    }
}

//------------------------------------------------------------------------------------------------------------------------
// Actions
//------------------------------------------------------------------------------------------------------------------------
function addCreateCatAction() {
    const form = document.querySelector("#addCat");
    const inputs = form.querySelectorAll("input");
    const button = form.querySelector(".addCatButton");
    button.onclick = (e) => {
      e.preventDefault();
      const bodyJSON = {};
      inputs.forEach((input) => {
        if (input.name === "favourite") {
          bodyJSON[input.name] = input.checked;
        } else {
          bodyJSON[input.name] = input.value;
        }
      });
      console.log(bodyJSON)
      api.addCat(bodyJSON);
    } 
}

function addFilterAction() {
    const buttonShowById = document.querySelector('#buttonShowById');
    const inputShowById = document.querySelector('#inputShowById');

    buttonShowById.onclick = () => {
        api.getCatById(inputShowById.value).then((data) => createCollection(data.data))
    }
}

function addShowAllAction() {
    const buttonShowAll = document.querySelector('#buttonShowAll');
    buttonShowAll.onclick = () => api.getAllCats().then(data => createCollection(data.data));
}

function addDeleteAction() {
    const deleteButton = document.querySelector('.deleteByIdButton')
    const deleteById = document.querySelector('.delete_by_id');
    deleteButton.onclick = () => {
        console.log(deleteById.value)
        api.deleteCat(deleteById.value)
    }
}

function addEditAction() {
    const form = document.querySelector("#editCat");
    const inputs = form.querySelectorAll("input");
    const button = form.querySelector(".editCatButton");
    const idInput = form.querySelector(".id_to_edit");
    button.onclick = (e) => {
        e.preventDefault();
        const bodyJSON = {};
        inputs.forEach((input) => {
            if (input.name === "favourite") {
                bodyJSON[input.name] = input.checked;
            } else {
                bodyJSON[input.name] = input.value;
            }
        });
        console.log(bodyJSON)
        api.updateCat(idInput.value, bodyJSON);
    } 
}

//------------------------------------------------------------------------------------------------------------------------
// PopUp
//------------------------------------------------------------------------------------------------------------------------
const cards = document.querySelectorAll(".container_cards");
console.log(cards)
cards.forEach((card) => {
    card.addEventListener("click", (e) => {
        const popup = document.querySelector(".info_popup");//document instead of container
        popup.classList.add("active");
        const cross = popup.querySelector(".close");
        cross.addEventListener("click", (e) => {
            e.stopPropagation();
            popup.classList.remove("active");
        });
    });
});
