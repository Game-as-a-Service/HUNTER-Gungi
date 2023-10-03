interface Event {
  name: string;
  data: any;
}

const findByEventName = (events: Event[], name: string) => {
  return events.find((event) => event.name === name);
};

export { findByEventName, Event };
