import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/event_service.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  DateTime _selected = DateTime.now();

  @override
  Widget build(BuildContext context) {
    final service = Provider.of<EventService>(context);
    final events = service.eventsForDay(_selected);

    return Scaffold(
      appBar: AppBar(
        title: const Text('linkseek - ホーム'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () => Navigator.pushNamed(context, '/create'),
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Text('選択日: ${_selected.toLocal().toIso8601String().split('T').first}'),
                const SizedBox(width: 12),
                ElevatedButton(
                    onPressed: () async {
                      final d = await showDatePicker(
                        context: context,
                        initialDate: _selected,
                        firstDate: DateTime(2000),
                        lastDate: DateTime(2100),
                      );
                      if (d != null) setState(() => _selected = d);
                    },
                    child: const Text('日付選択')),
              ],
            ),
          ),
          Expanded(
            child: events.isEmpty
                ? const Center(child: Text('この日の予定はありません'))
                : ListView.builder(
                    itemCount: events.length,
                    itemBuilder: (context, i) {
                      final e = events[i];
                      return ListTile(
                        title: Text(e.title),
                        subtitle: Text('${e.start.hour}:${e.start.minute.toString().padLeft(2,'0')} - ${e.end.hour}:${e.end.minute.toString().padLeft(2,'0')}'),
                        trailing: IconButton(
                          icon: const Icon(Icons.delete),
                          onPressed: () => service.removeEvent(e.id),
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}
