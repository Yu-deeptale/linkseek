import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'services/event_service.dart';
import 'screens/sign_in_page.dart';
import 'screens/home_page.dart';
import 'screens/create_event_page.dart';

void main() {
  runApp(const LinkSeekApp());
}

class LinkSeekApp extends StatelessWidget {
  const LinkSeekApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => EventService(),
      child: MaterialApp(
        title: 'linkseek',
        theme: ThemeData(primarySwatch: Colors.blue),
        initialRoute: '/',
        routes: {
          '/': (_) => const SignInPage(),
          '/home': (_) => const HomePage(),
          '/create': (_) => const CreateEventPage(),
        },
      ),
    );
  }
}
