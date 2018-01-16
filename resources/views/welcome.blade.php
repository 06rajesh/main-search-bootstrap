<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>পিপীলিকা (সার্চ ইঞ্জিন)</title>
    <meta content="পিপীলিকা বাংলাদেশ থেকে তৈরিকৃত এবং নিয়ন্ত্রিত একটি ইন্টারনেটভিত্তিক অনুসন্ধান ইঞ্জিন। এটি বাংলাদেশের প্রথম সার্চ ইঞ্জিন, যেখানে বাংলা এবং ইংরেজি - উভয় ভাষায় তথ্য পাওয়ার সুবিধা রয়েছে।
    সিলেটের শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়ের কম্পিউটার বিজ্ঞান ও প্রকৌশল বিভাগের অধ্যাপক মুহম্মদ জাফর ইকবালের তত্ত্বাবধানে বিশ্ববিদ্যালয়ের সহযোগী অধ্যাপক মো. রুহুল আমিনের নেতৃত্বে একদল শিক্ষার্থী চালু হয় এ সার্চ ইঞ্জিনটি।
     সহযোগিতায় ছিলো গ্রামীণফোন আইটি (জিপিআইটি)। বর্তমানে পরীক্ষামূলকভাবে পরিচালিত হচ্ছে পিপীলিকা।"/>
    <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
</head>
<body>
<div id="pipilika" class="full-height"></div>
<script src="{{asset('js/rangy/rangy-core.js')}}" ></script>
<script src="{{asset('js/app.js')}}" ></script>
</body>
</html>