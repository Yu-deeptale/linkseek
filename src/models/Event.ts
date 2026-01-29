export interface Event {
  id: string;
  title: string;
  duration: {
    hours: number;
    minutes: number;
  };
  location: string;
  monthRange: {
    start: number;
    end: number;
  };
  capacity: number;
  timeRange?: {
    start: Date;
    end: Date;
  } | null;
  dateRange?: {
    start: Date;
    end: Date;
  } | null;
  selectedWeeks: string[];
  selectedDays: string[];
  description?: string; // Optional, from older definition, keeping it just in case
}
