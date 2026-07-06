export function renderColumn(columnCards, columnName) {
  const columnElement = document.querySelector(`[data-column-name="${columnName}"]`);
  const cardElements = columnCards.map((card) => buildCardElement(card));
  columnElement.replaceChildren(...cardElements);
}

export function renderBoard(columnsCards) {
  for (const [columnName, columnCards] of columnsCards) {
    renderColumn(columnCards, columnName);
  }
}

export function renderCard(card, columnName) {
  const columnElement = document.querySelector(`[data-column-name="${columnName}"]`);
  const cardElement = buildCardElement(card);
  columnElement.append(cardElement);
}

function buildCardElement(card) {
  const cardBody = document.createElement("li");
  cardBody.classList.add("board__column-card");
  cardBody.dataset.cardId = card.id;

  const cardTitle = document.createElement("input");
  cardTitle.type = "text";
  cardTitle.placeholder = "Введите название";
  cardTitle.classList.add("board__column-card-title");
  cardTitle.value = card.title;
  cardTitle.dataset.cardTitle = '';

  const cardDesc = document.createElement("textarea");
  cardDesc.classList.add("board__column-card-desc");
  cardDesc.placeholder = "Введите описание";
  cardDesc.value = card.desc;
  cardDesc.dataset.cardDesc = '';

  cardBody.append(cardTitle, cardDesc);
  return cardBody;
}
