class Event {
  final String id;
  final String title;
  final DateTime start;
  final DateTime end;
  final String? description;

  Event({required this.id, required this.title, required this.start, required this.end, this.description});
}
