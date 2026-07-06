const initState = Object.freeze({
  activeCardId: null,
});

let currentState = initState;

export function toggleCardContextMenu(cardId) {
  if (currentState.activeCardId !== cardId) {
    dispatch({ type: "OPEN_MENU", payload: cardId });
  } else if (!cardId) {
    dispatch({ type: "CLOSE_MENU" });
  }
}

function dispatch(action) {
  const previousState = currentState;
  currentState = menuReducer(previousState, action);

  renderUI(previousState, currentState);
}

function renderUI(previousState, newState) {
  if (previousState.activeCardId === newState.activeCardId) return;

  if (previousState.activeCardId) {
    closeLastCardContextMenu(previousState.activeCardId);
  }

  if (newState.activeCardId) {
    insertCardContextMenu(newState.activeCardId);
  }
}

function insertCardContextMenu(cardId) {
  const cardBody = document.querySelector(`[data-card-id="${cardId}"]`);
  const menuHtml = getContextMenuHTML();
  cardBody.insertAdjacentHTML("afterbegin", menuHtml);
}

function closeLastCardContextMenu(cardId) {
  const cardBody = document.querySelector(`[data-card-id="${cardId}"]`);
  const contextMenu = cardBody.querySelector(`[data-card-context-menu]`);
  contextMenu.remove();
}

function getContextMenuHTML() {
  const menuHtml = `<div class="card-context-menu" data-card-context-menu>
                      <button class="card-context-menu__copy-btn" data-action="copyCard">
                        <i class="fa-solid fa-clone"></i>
                      </button>
                      <button class="card-context-menu__del-btn" data-action="deleteCard">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>`;
  return menuHtml;
}

function menuReducer(state, action) {
  switch (action.type) {
    case "OPEN_MENU":
      return { ...state, activeCardId: action.payload };
    case "CLOSE_MENU":
      return { ...state, activeCardId: null };
    default:
      return state;
  }
}
