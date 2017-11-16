<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use GuzzleHttp\Client;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    function queryTOAPI(){

        $obj = $this->getDataFromAPI('Search', request()->query());
        return response((array)$obj['result'], $obj['statusCode']);
    }

    function getDataFromAPI($api_substring, $params = null){

        $base_uri = 'http://pipilika.com:7001/PipilikaA2ISearchAPI/';
        $client = new Client(['base_uri' => $base_uri]);

        $res = $client->request('GET', $api_substring, [
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
