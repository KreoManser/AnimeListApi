import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/card-list/card-list.js";

export class MainView extends AbstractView {
  state = {
    list: [],
    loading: false,
    searchQuery: undefined,
    page: 1,
  };

  constructor(appState) {
    super();
    this.appState = appState;

    // Подписываемся только на состояние, которое необходимо отслеживать
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.appState = onChange(this.appState, this.appStateHook.bind(this)); // Подписываемся на изменения appState, чтобы отслеживать favourites
    this.setTitle("Поиск аниме");
  }

  destroy() {
    // Отписываемся только от состояния, которое было подписано в конструкторе
    onChange.unsubscribe(this.state);
    onChange.unsubscribe(this.appState);
  }

  appStateHook(path) {
    // Если favourites изменилось, перерисовываем заголовок, чтобы отобразить изменения
    if (path === "favourites") {
      this.renderHeader();
    }
  }

  async stateHook(path) {
    if (path === "searchQuery") {
      this.state.loading = true;
      const data = await this.loadList(this.state.searchQuery, this.state.page);
      console.log(data.data);
      this.state.list = data.data;
      this.state.loading = false;
    }
    if (path === "list" || path === "loading") {
      this.render();
    }
  }

  async loadList(q, page = 1) {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?page=${page}&q=${q}`
    );
    return res.json();
  }

  render() {
    const main = document.createElement("div");
    main.innerHTML = `<h1>Найдено аниме - ${this.state.list.length}</h1>`;
    main.append(new Search(this.state).render());
    main.append(new CardList(this.appState, this.state).render());

    this.app.innerHTML = ""; // Очищаем только содержимое, не заголовок
    this.app.append(main);
    this.renderHeader(); // Добавляем заголовок после добавления основного содержимого
  }

  renderHeader() {
    // Убедимся, что заголовок не дублируется
    const existingHeader = this.app.querySelector(".header");
    if (existingHeader) {
      existingHeader.remove();
    }
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
