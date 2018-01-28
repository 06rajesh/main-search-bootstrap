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

//Analytics API
Route::get('/analytics', 'AnalyticsController@testConnection');
Route::post('/create-user', 'AnalyticsController@createUser');
Route::post('/create-session', 'AnalyticsController@createSession');
Route::post('/send-search', 'AnalyticsController@sendSearchQuery');
Route::post('/send-activity', 'AnalyticsController@sendUserActivity');
Route::post('/send-feedback', 'AnalyticsController@sendUserFeedback');
Route::post('/send-contact', 'AnalyticsController@sendUserContact');