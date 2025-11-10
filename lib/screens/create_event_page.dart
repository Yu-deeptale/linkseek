import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:uuid/uuid.dart';
import '../services/event_service.dart';
import '../models/event.dart';

class CreateEventPage extends StatefulWidget {
  const CreateEventPage({Key? key}) : super(key: key);

  @override
  State<CreateEventPage> createState() => _CreateEventPageState();
}

class _CreateEventPageState extends State<CreateEventPage> {
  final _formKey = GlobalKey<FormState>();
  final _titleCtrl = TextEditingController();
  DateTime _start = DateTime.now();
  DateTime _end = DateTime.now().add(const Duration(hours: 1));

  @override
  Widget build(BuildContext context) {
    final service = Provider.of<EventService>(context, listen: false);
    return Scaffold(
      appBar: AppBar(title: const Text('予定作成')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _titleCtrl,
                decoration: const InputDecoration(labelText: 'タイトル'),
                validator: (v) => (v == null || v.isEmpty) ? 'タイトルは必須' : null,
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Text('開始: ${_start.toLocal().toIso8601String().split('T').join(' ')}'),
                  const SizedBox(width: 8),
                  ElevatedButton(
                    onPressed: () async {
                      final d = await showDatePicker(context: context, initialDate: _start, firstDate: DateTime(2000), lastDate: DateTime(2100));
                      if (d == null) return;
                      final t = await showTimePicker(context: context, initialTime: TimeOfDay.fromDateTime(_start));
                      if (t == null) return;
                      setState(() => _start = DateTime(d.year, d.month, d.day, t.hour, t.minute));
                    },
                    child: const Text('変更')),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Text('終了: ${_end.toLocal().toIso8601String().split('T').join(' ')}'),
                  const SizedBox(width: 8),
                  ElevatedButton(
                    onPressed: () async {
                      final d = await showDatePicker(context: context, initialDate: _end, firstDate: DateTime(2000), lastDate: DateTime(2100));
                      if (d == null) return;
                      final t = await showTimePicker(context: context, initialTime: TimeOfDay.fromDateTime(_end));
                      if (t == null) return;
                      setState(() => _end = DateTime(d.year, d.month, d.day, t.hour, t.minute));
                    },
                    child: const Text('変更')),
                ],
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {
                  if (!_formKey.currentState!.validate()) return;
                  final id = const Uuid().v4();
                  final e = Event(id: id, title: _titleCtrl.text.trim(), start: _start, end: _end);
                  service.addEvent(e);
                  Navigator.pop(context);
                },
                child: const Text('保存'),
              )
            ],
          ),
        ),
      ),
    );
  }
}
