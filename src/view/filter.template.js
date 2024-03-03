function createFilterItemTemplate({filter, currentFilterType, disabledFilters}) {
  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${filter.type}"
        class="trip-filters__filter-input
        visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filter.type}"
        ${disabledFilters.includes(filter.type) ? 'disabled' : ''}
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

export default function createFilterTemplate({filters, currentFilterType, disabledFilters}) {
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate({filter, currentFilterType, disabledFilters}))
    .join('');
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
    </form>`
  );
}
