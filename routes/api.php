<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/search', 'Controller@queryTOAPI');
Route::get('/infobox', 'Controller@getWikiInfoBox');
Route::get('/knowledge', 'Controller@getKnowledgeGraph');
Route::get('/suggestions', 'Controller@getSuggestion');
Route::get('/client-ip', 'Controller@getUserIP');