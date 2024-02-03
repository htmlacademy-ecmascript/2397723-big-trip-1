function createFilterItemTemplate(filter, currentFilterType) {
  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${filter.type}"
        class="trip-filters__filter-input
        visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filter.type}"
        ${filter.type === currentFilterType ? 'checked' : ''}
        >
      <label
        class="trip-filters__filter-label"
        for="filter-${filter.type}"
        >
      ${filter.type}
      </label>
    </div>`
  );
}

export default function createFilterTemplate(filters, currentFilterType) {
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
    </form>`
  );
}
