<?php
/**
 * Created by PhpStorm.
 * User: Rajesh
 * Date: 1/25/18
 * Time: 3:20 PM
 */

namespace App\Http\Controllers;

use GuzzleHttp\Client;

class AnalyticsController extends Controller
{

    function queryToAnalytics($api_substring, $params = null, $key, $type='POST'){

        $base_uri = config('app.analytics_base'). 'api/';

        $client = new Client(['base_uri' => $base_uri]);

        $res = $client->request($type, $api_substring, [
            'headers' => [
                'api-key' => $key
            ],
            'query' => $params,
            'http_errors' => false
        ]);

        $obj = json_decode((string)$res->getBody());

        return $data = [
            'result' => $obj,
            'statusCode' => $res->getStatusCode()
        ];
    }

    function updateSession($query, $type){
        $sessionParam = [
            'session'  => $query['session'],
            'type' => $type
        ];

        $sessionUpdateRequest = $this->queryToAnalytics('session', $sessionParam, request()->header('api-key'), 'PUT');
        return response($sessionUpdateRequest['statusCode']);
    }

    function testConnection(){
        $obj = $this->queryToAnalytics('', request()->query(), 'GET');
        return response((array)$obj['result'], $obj['statusCode']);
    }

    function createUser(){
        $obj = $this->queryToAnalytics('user-info', request()->query(), request()->header('api-key'));
        return response((array)$obj['result'], $obj['statusCode']);
    }

    function createSession(){
        //return request()->query();
        $obj = $this->queryToAnalytics('session', request()->query(), request()->header('api-key'));
        return response((array)$obj['result'], $obj['statusCode']);
    }

    function sendSearchQuery(){
        $obj = $this->queryToAnalytics('query', request()->query(), request()->header('api-key'));
        $this->updateSession(request()->query(), 'user_input');
        return response((array)$obj['result'], $obj['statusCode']);
    }

    function sendUserActivity(){

        $obj = $this->queryToAnalytics('activity', request()->query(), request()->header('api-key'));
        $this->updateSession(request()->query(), 'user_click');
        return response((array)$obj['result'], $obj['statusCode']);
    }

    function sendUserFeedback(){
        $obj = $this->queryToAnalytics('feedback', request()->query(), request()->header('api-key'));
        $this->updateSession(request()->query(), 'user_feedback');
        return response((array)$obj['result'], $obj['statusCode']);
    }

    function sendUserContact(){
        $obj = $this->queryToAnalytics('contact', request()->query(), request()->header('api-key'));
        $this->updateSession(request()->query(), 'user_contact');
        return response((array)$obj['result'], $obj['statusCode']);
    }

}