<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;

class mailController extends Controller
{
    public function send(){

      // Mail::send('email',[['name' => 'Ebere'],['body'=>'Ebere']], function($message){
      //   $message->to('kayninemark@gmail.com','Tech Challenge')->subject('Test Email');
      //   $message->from('kayninemark@gmail.com','Tech Challenge');
      // });
      $symbol = "MMM";
      $start = "Mar%2040%20";
      $end = "Mar%2040%20";
      $email = "email@email.com";
      $date = $start.' - '.$end;
      
      $data = array('symbol' => $symbol,
      'email' => $email );



      Mail::send(['text' => $date], $data, function($message)use ($data)
      {
        $message->to($data['email'],'Tech Challenge')->subject($data['symbol']);
        $message->from('eiweala@live.com','Tech Challenge');
      });

      // if($mail){
        echo "message sent";
      // }

    }
}
