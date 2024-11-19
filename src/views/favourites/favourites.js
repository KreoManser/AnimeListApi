import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { CardList } from "../../components/card-list/card-list.js";

export class FavouritesView extends AbstractView {
  constructor(appState) {
    super();
    this.appState = appState;

    // Подписка на изменения в appState для отслеживания изменений в favourites
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle("Мои аниме");
  }

  destroy() {
    // Отписываемся от изменений состояния при уничтожении вида
    onChange.unsubscribe(this.appState);
  }

  appStateHook(path) {
    if (path === "favourites") {
      this.render();
    }
  }

  render() {
    const main = document.createElement("div");

    if (this.appState.favourites.length === 0) {
      main.innerHTML = `<h1>У вас пока нет избранных аниме</h1>`;
    } else {
      main.innerHTML = `<h1>Избранные аниме - ${this.appState.favourites.length}</h1>`;
      main.append(
        new CardList(this.appState, { list: this.appState.favourites }).render()
      );
    }

    this.app.innerHTML = "";
    this.app.append(main);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
