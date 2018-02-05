<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>পিপীলিকা (সার্চ ইঞ্জিন)</title>
    <link rel="shortcut icon" type="image/x-icon" href="{{asset('img/favicon.ico')}}"/>
    <meta name="description" content="পিপীলিকা বাংলাদেশের প্রথম এবং একমাত্র সার্চ ইঞ্জিন যা বাংলা ও ইংরেজী দুই ভাষাতেই কাজ করতে সক্ষম। এই উন্মুক্ত ওয়েব সার্ভিসটি সারা দেশের সাম্প্রতিক গ্রহণসাধ্য তথ্য অনুসন্ধান করতে সহায়তা করে।
     এটি দেশের প্রধান বাংলা ও ইংরেজী পত্রিকার সংবাদ, বাংলা ব্লগ, বাংলা উইকিপিডিয়া ও সরকারি তথ্য স্বয়ংক্রিয়ভাবে বিশ্লেষণ ও সংরক্ষণ করে। জনপ্রিয় সার্চ ইঞ্জিনগুলোর কোনটিতেই বাংলা ভাষার উপর তেমন গুরুত্ব আরোপ করা হয়নি। তাই আমরা বাংলা তথ্য
     বিশ্লেষণ ও অনুসন্ধানের উপর গুরুত্ব দেয়ার চেষ্টা করেছি।" />
    <meta name="keywords" content="pipilika, পিপীলিকা, search, অনুসন্ধান, bangladesh, বাংলাদেশ, dhaka, ঢাকা,  business, ব্যবসা ও বাণিজ্য, politics, sports, খেলাধূলা, technology, তথ্য ও
    প্রযুক্তি,  health, national infokosh, bangla, ই-তথ্যকোষ,  news, সংবাদ, bengali, companies, bangla spell check, bangla search engine, বাংলা সার্চ ইঞ্জিন" />
    <link href="{{ asset('fonts/fonts.css') }}" rel="stylesheet" type="text/css"/>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet" type="text/css"/>
    <script>
        window.ga_key = '{{ env('GOOGLE_ANALYTICS_KEY') }}';
    </script>
</head>
<body>
<div id="pipilika" class="full-height"></div>
<script src="{{ asset('js/rangy/rangy-core.js')}}" ></script>
<script src="{{ mix('js/app.js')}}" ></script>
</body>
</html>