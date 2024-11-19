import { DivComponent } from "../../common/div-component";
import "./card.css";

export class Card extends DivComponent {
  constructor(appState, cardState) {
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  #addToFavourites() {
    if (
      !this.appState.favourites.some(
        (anime) => anime.mal_id === this.cardState.mal_id
      )
    ) {
      // Создаем новый массив, чтобы изменения отслеживались
      this.appState.favourites = [...this.appState.favourites, this.cardState];
    }
  }

  #deleteFromFavourites() {
    this.appState.favourites = this.appState.favourites.filter(
      (anime) => anime.mal_id !== this.cardState.mal_id
    );
  }

  render() {
    this.el.classList.add("card");

    // Проверяем, находится ли аниме в избранных
    const existInFavourites = this.appState.favourites.some(
      (anime) => anime.mal_id === this.cardState.mal_id
    );

    this.el.innerHTML = `
      <div class="card__image">
        <img src="${this.cardState.images.jpg.image_url}" alt="Постер аниме" />
      </div>
      <div class="card__info">
        <div class="card__tag">
          ${this.cardState.genres.map((genre) => genre.name).join(", ")}
        </div>
        <div class="card__name">
          ${this.cardState.title}
        </div>
        <div class="card__studios">
          ${
            this.cardState.studios
              ? this.cardState.studios.map((studio) => studio.name).join(", ")
              : "undefined"
          }
        </div>
        <div class="card__footer">
          <button class="button__add ${
            existInFavourites ? "button__active" : ""
          }">
            ${
              existInFavourites
                ? '<img src="./static/favorite.svg" />'
                : '<img src="./static/favorite-white.svg" />'
            }
          </button>
        </div>
      </div>
    `;

    const button = this.el.querySelector(".button__add");
    if (button) {
      button.onclick = () => {
        if (existInFavourites) {
          this.#deleteFromFavourites();
        } else {
          this.#addToFavourites();
        }
        this.render(); // Обновляем только текущую карточку после изменения избранного
      };
    }

    return this.el;
  }
}
