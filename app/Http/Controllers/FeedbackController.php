<?php
/**
 * Created by PhpStorm.
 * User: Rajesh
 * Date: 1/28/18
 * Time: 1:31 PM
 */


namespace App\Http\Controllers;

use GuzzleHttp\Client;

class FeedbackController extends Controller
{

    function queryToFeedback($api_substring, $params = null, $key, $type = 'POST')
    {

        $base_uri = config('app.analytics_base') . 'api/';

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

}
