export default function createFilterTemplate(filters) {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filters.map((filter) => (
      `<div class="trip-filters__filter">
          <input
            id="filter-${filter.name}"
            class="trip-filters__filter-input
            visually-hidden"
            type="radio"
            name="trip-filter"
            value="${filter.name}"
            ${filter.isChecked && 'checked'}
            >
          <label
            class="trip-filters__filter-label"
            for="filter-${filter.name}"
            >
          ${filter.name}
          </label>
        </div>`
    )
    ).join('')}
    </form>`
  );
}
