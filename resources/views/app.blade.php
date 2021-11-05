<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravue') }}</title>
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    <link rel="shortcut icon" href="{{ asset('/favicon.ico') }}">
    <link rel="apple-touch-icon" href="./apple-touch-icon.png" sizes="180x180">
</head>
<body>
<div id="app">
    <app-component></app-component>
</div>
<script src="{{ mix('/js/app.js') }}" defer></script>
</body>
</html>