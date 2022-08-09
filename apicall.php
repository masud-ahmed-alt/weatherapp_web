<?php

$ch = curl_init();
$city = $_POST['city'];
$APIKEY = "662a6a5fc6f34e54a5b123803211911";
$url = 'https://api.weatherapi.com/v1/current.json?key='.$APIKEY.'&q='.$city.'&aqi=yes';

curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch,  CURLOPT_RETURNTRANSFER, true);

$resp = curl_exec($ch);

if($e=curl_error($ch)){
    echo $e;
}else{
    echo $resp; 
}
curl_close($ch);