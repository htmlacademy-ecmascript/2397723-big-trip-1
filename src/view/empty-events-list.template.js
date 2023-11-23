const OPTIONS = {
  'Everything': 'Click New Event to create your first point',
  'Past': 'There are no past events now',
  'Present': 'There are no present events now',
  'Future': 'There are no future events now',
};


export default function createEmptyEventsListTemplate (filter) {
  return (
    `<p class="trip-events__msg">${OPTIONS[filter]}</p>`
  );
}
