import { DivComponent } from "../../common/div-component";
import "./header.css";

export class Header extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    this.el.classList.add("header");
    this.el.innerHTML = `
        <div>
            <img src="./static/logo.png" alt="Логотип" class="logo_size">
        </div>
        <div class="menu">
            <a class="menu__item" href="#">
                <img src="./static/search.svg" alt="Иконка поиска">
                Поиск аниме
            </a>
            <a class="menu__item" href="#favourites">
                <img src="./static/favorite.svg" alt="Иконка избранное">
                Избранное
                <div class="menu__counter">
                    ${this.appState.favourites.length}
                </div>
            </a>
        </div>
    `;
    return this.el;
  }
}
