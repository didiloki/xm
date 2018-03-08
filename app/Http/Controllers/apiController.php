<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use Mail;

class apiController extends Controller
{
    //
    public function symbolFinder (Request $request)
    {
      $symbol = $request->query('symbol');
      $start = rawurlencode($request->query('start'));
      $end = rawurlencode($request->query('end'));
      $email = $request->query('email');


      $fp = fopen("https://finance.google.com/finance/historical?output=csv&q=".$symbol."&startdate=".$start."&enddate=".$end, 'r');


      //read csv headers
      $temp_key = fgetcsv($fp,0,",");
      $key = array();

      // remove_utf8_bom($key);
      foreach ($temp_key as $value) {
          array_push($key,$this->remove_utf8_bom($value));
      }
      // parse csv rows into array
      $json = array();


      while ($row = fgetcsv($fp,1024,",")) {

          $rows = array();
          foreach($row as $keys => $value)
          {
            //convert all stringed floats to floats
            ($keys > 0) ? $rows[] = (float)$row[$keys] : $rows[] = $row[$keys];
          }

        $json[] = array_combine($key, $rows);
      }

      fclose($fp);

      // encode array to json
      return json_encode($json);
  }

  public function validateSymbol(Request $request){

    $symbolValidate = $request->query('symbol');
    $result = false;

    $fp = fopen("http://www.nasdaq.com/screening/companies-by-name.aspx?&render=download","r");

    //read csv headers
    $temp_key = fgetcsv($fp,0,",");
    $key = array();

    foreach ($temp_key as $value) {
      array_push($key,$this->remove_utf8_bom($value));
    }
    // parse csv rows into array
    $json = array();

    while ($row = fgetcsv($fp,0,",")) {
        $json[] = array_combine($temp_key, $row);
    }

    // release file handle
    fclose($fp);

    foreach($json as $value){
      if($value['Symbol'] == $symbolValidate){
          return "true";
      }
    }

    return "false";

  }

  private function remove_utf8_bom($text)
    {
        $bom = pack('H*','EFBBBF');
        $text = preg_replace("/^$bom/", '', $text);
        return $text;
    }
}
