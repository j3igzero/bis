<?php

function convertRgbToPantone($hex = '') {
	if ($hex == '') {
		return '';
	}
	return rand(100, 9999) . ' C';   // temp
}

function buildResult($params = array()) {
	if (empty($params['colors'])) {
		return array();
	}
	$aResult = array();
	foreach ($params['colors'] as $hex) {
		$aResult[$hex] = convertRgbToPantone($hex);
	}
	return $aResult;
}

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// If not post method, exit
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("HTTP/1.0 404 Not Found");
    die();
}

// Parse body
$request_body = file_get_contents('php://input');
$body = json_decode($request_body, 1);

// set response code - 200 OK
http_response_code(200);

if ($body['action'] == 'rgb-to-pantone') {
	// Get result
	$aResult = buildResult($body['params']);

	// show products data in json format
	echo json_encode($aResult);
}
exit;