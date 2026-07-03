export function addCard(currentMap, newCard) {
  const newMap = new Map(currentMap);
  const columnName = newCard.column;
  const columnCards = newMap.get(columnName);

  newMap.set(columnName, [...columnCards, newCard]);

  return newMap;
}

export function removeCard(currentMap, cardId, columnName) {
  const newMap = new Map(currentMap);
  const columnCards = newMap.get(columnName);

  const updatedCards = columnCards.filter((card) => card.id !== cardId);

  newMap.set(columnName, updatedCards);

  return newMap;
}

export function getColumnCards(currentMap, columnName) {
  return currentMap.get(columnName) || [];
}

export function changeCardColumn(currentMap, cardId, oldColumn, newColumn) {
  const sourceColumn = currentMap.get(oldColumn);
  const targetCard = sourceColumn.find((card) => card.id === cardId);

  const updatedCard = { ...targetCard, column: newColumn };

  const mapWithoudCard = removeCard(currentMap, cardId, oldColumn);
  const finalMap = addCard(mapWithoudCard, updatedCard);

  return finalMap;
}

export function saveCards(currentMap) {
  const obj = Object.fromEntries(currentMap);
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
