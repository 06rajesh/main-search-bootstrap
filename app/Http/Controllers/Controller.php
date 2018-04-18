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

        $obj = $this->getDataFromAPI('main', request()->query());
        return response((array)$obj['result'], $obj['statusCode']);
    }

    function getWikiInfoBox(){
        $obj = $this->getDataFromAPI('wiki/infobox', request()->query());
        return response((array)$obj['result'], $obj['statusCode']);
    }

    function getKnowledgeGraph(){
        $obj = $this->getDataFromAPI('wiki/knowledgegraph', request()->query());
        return response((array)$obj['result'], $obj['statusCode']);
    }

    function getDataFromAPI($api_substring, $params = null){

        $base_uri = config('app.api_base');
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

    public function getSuggestion(){

        $base_url = config('app.query_suggestion_base');
        $client = new Client(['base_uri' => $base_url]);

        $res = $client->get('QuerySuggestion', [
            'query' => [
                'query'    => request('query'),
                'type'     => (request('type') != null) ? request('type'): 'all'
            ],
            'http_errors' => false
        ]);

        $obj = $res->getBody()->getContents();
        return (array)json_decode($obj);
    }

    public function getUserIP(){


        $geo_ip = geoip()->getClientIP();
        $geo_loc = geoip()->getLocation($geo_ip);

        $ip = array(
            'ip' => $geo_ip,
            "iso_code" => $geo_loc->iso_code,
            "country" => $geo_loc->country,
            "city" => $geo_loc->city
        );
        return $ip;
    }

}
