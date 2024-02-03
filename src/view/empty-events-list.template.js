const OPTIONS = {
  'everything': 'Click New Event to create your first point',
  'past': 'There are no past events now',
  'present': 'There are no present events now',
  'future': 'There are no future events now',
};


export default function createEmptyEventsListTemplate (filter) {
  return (
    `<p class="trip-events__msg">${OPTIONS[filter]}</p>`
  );
}
