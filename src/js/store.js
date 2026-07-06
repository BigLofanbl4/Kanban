export function addCard(cardsMap, newCard) {
  const newMap = new Map(cardsMap);
  newMap.set(newCard.id, newCard);
  return newMap;
}

export function getColumnsFromCards(cardsMap, columnNames) {
  const columnsMap = new Map();
  columnNames.forEach((column) => columnsMap.set(column, []));
  for (const [cardId, card] of cardsMap) {
    const columnName = card.column;
    if (columnNames.includes(columnName)) {
      const currentColumnCards = columnsMap.get(columnName);
      columnsMap.set(columnName, [...currentColumnCards, cardId]);
    }
  }
  return columnsMap;
}

export function removeCard(cardsMap, cardId) {
  const newMap = new Map(cardsMap);
  newMap.delete(cardId);
  return newMap;
}

export function getColumnCards(cardsMap, columnsMap) {
  const columnsCards = new Map();
  for (const [columnName, cardIds] of columnsMap) {
    const columnCardsObjs = cardIds.map((id) => cardsMap.get(id));
    columnsCards.set(columnName, columnCardsObjs);
  }
  return columnsCards;
}

export function changeCardColumn(cardsMap, cardId, newColumn) {
  const newMap = new Map(cardsMap);
  const targetCard = newMap.get(cardId);
  newMap.set(cardId, { ...targetCard, column: newColumn });
  return newMap;
}

export function saveCards(cardsMap) {
  const obj = Object.fromEntries(cardsMap);
  localStorage.setItem("store", JSON.stringify(obj));
}

export function loadCards() {
  try {
    const rawStore = localStorage.getItem("store");

    if (!rawStore) return new Map();

    const obj = JSON.parse(rawStore);

    return new Map(Object.entries(obj));
  } catch (err) {
    console.error(err);
    return new Map();
  }
}

export function createEmptyCard(columnName) {
  return {
    id: crypto.randomUUID(),
    title: "",
    desc: "",
    column: columnName,
  };
}

export function updateCard(currentMap, cardId, newTitle, newDesc = "") {
  const newMap = new Map(currentMap);
  const targetCard = newMap.get(cardId);
  newMap.set(cardId, { ...targetCard, title: newTitle, desc: newDesc });
  return newMap;
}

export function deleteCard(currentMap, cardId) {
  const newMap = new Map(currentMap);
  newMap.delete(cardId);
  return newMap;
}