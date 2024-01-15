export default function createSortTemplate(sortOptions) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortOptions.map((option) => (
      `<div class="trip-sort__item  trip-sort__item--${option.name}">
          <input
            id="sort-${option.name}"
            class="trip-sort__input  visually-hidden"
            type="radio"
            name="trip-sort"
            value="sort-${option.name}"
            ${option.isChecked ? 'checked' : ''}
            ${option.isDisable ? 'disabled' : ''}
            >
          <label
            class="trip-sort__btn"
            for="sort-${option.name}"
            >
          ${option.name}
          </label>
        </div>`
    )).join('')}
    </form>`
  );
}
