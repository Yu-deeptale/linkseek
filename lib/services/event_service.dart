import 'package:flutter/foundation.dart';
import '../models/event.dart';

class EventService with ChangeNotifier {
  final List<Event> _events = [];

  List<Event> get allEvents => List.unmodifiable(_events);

  void addEvent(Event e) {
    _events.add(e);
    notifyListeners();
  }

  void removeEvent(String id) {
    _events.removeWhere((e) => e.id == id);
    notifyListeners();
  }

  List<Event> eventsForDay(DateTime day) {
    return _events.where((e) {
      return e.start.year == day.year && e.start.month == day.month && e.start.day == day.day;
    }).toList();
  }
}
