import {
  addCard,
  removeCard,
  createEmptyCard,
  getColumnCards,
  updateCard,
  deleteCard,
} from "./store.js";
import { renderColumn, renderCard, renderBoard, destroyCard } from "./render.js";

export function handleCreateCard(allCards, columnName, onStateChange) {
  const card = createEmptyCard(columnName);
  const updatedCards = addCard(allCards, card);

  onStateChange(updatedCards);
  renderCard(card, columnName);
}

export function handleUpdateCard(allCards, cardId, onStateChange) {
  const { title, desc } = readCardValues(cardId);
  const updatedCards = updateCard(allCards, cardId, title, desc);
  onStateChange(updatedCards);
}

export function handleDeleteCard(allCards, cardId, onStateChange) {
  const updatedCards = deleteCard(allCards, cardId);
  onStateChange(updatedCards);
  destroyCard(cardId);
}

export function handleCopyCard(allCards, cardId, onStateChange) {
  const { title, desc, columnName } = readCardValues(cardId);
  const newCard = createEmptyCard(columnName);
  newCard.title = title;
  newCard.desc = desc;

  const updatedCards = addCard(allCards, newCard);
  onStateChange(updatedCards);
  renderCard(newCard, columnName);
}

function readCardValues(cardId) {
  const cardBody = document.querySelector(`[data-card-id="${cardId}"`);
  const title = cardBody.querySelector("[data-card-title]").value.trim();
  const desc = cardBody.querySelector("[data-card-desc]").value.trim();
  const columnName = cardBody.closest("[data-column-name]")?.dataset.columnName;

  return { title, desc, columnName };
}
