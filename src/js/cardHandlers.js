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

  renderCard(card, columnName);

  onStateChange(updatedCards);
}

export function handleUpdateCard(allCards, cardId, onStateChange) {
  const [newTitle, newDesc] = readCardValues(cardId);
  const updatedCards = updateCard(allCards, cardId, newTitle, newDesc);
  onStateChange(updatedCards);
}

export function handleDeleteCard(allCards, cardId, onStateChange) {
  const updatedCards = deleteCard(allCards, cardId);
  onStateChange(updatedCards);
  destroyCard(cardId);
}

function readCardValues(cardId) {
  const cardBody = document.querySelector(`[data-card-id="${cardId}"`);
  const title = cardBody.querySelector("[data-card-title]").value.trim();
  const desc = cardBody.querySelector("[data-card-desc]").value.trim();

  return [title, desc];
}
