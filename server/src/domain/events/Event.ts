import EVENT_NAME from '../constant/EVENT_NAME';

interface Event {
  name: EVENT_NAME;
  data: any;
}

const findByEventName = (events: Event[], name: string) => {
  return events.find((event) => event.name === name);
};

export { findByEventName, Event };
