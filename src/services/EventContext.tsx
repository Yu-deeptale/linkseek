import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Event } from '../models/Event';

interface EventContextType {
  events: Event[];
  addEvent: (event: Event) => void;
  removeEvent: (id: string) => void;
  getEventsForDay: (day: Date) => Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (event: Event) => {
    setEvents((prev) => [...prev, event]);
  };

  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const getEventsForDay = (day: Date) => {
    return events.filter((e) => {
      return (
        e.start.getFullYear() === day.getFullYear() &&
        e.start.getMonth() === day.getMonth() &&
        e.start.getDate() === day.getDate()
      );
    });
  };

  return (
    <EventContext.Provider value={{ events, addEvent, removeEvent, getEventsForDay }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventService = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventService must be used within an EventProvider');
  }
  return context;
};
