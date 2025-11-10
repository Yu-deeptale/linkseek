import 'package:flutter/material.dart';

class SignInPage extends StatelessWidget {
  const SignInPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('linkseek - サインイン')),
      body: Center(
        child: ElevatedButton(
          child: const Text('サンプルでログイン（匿名）'),
          onPressed: () => Navigator.pushReplacementNamed(context, '/home'),
        ),
      ),
    );
  }
}
