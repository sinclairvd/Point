<?php
// Vision 20:20 Random form script

// set crossdomain json acces
header('Access-Control-Allow-Origin: *');


//declare variables

//email setting
$emailoption = true;

//response array with status code and message
$response_array = array();


//function to validate the email address
//returns false if email is invalid
function checkEmail($email){
   
	if(eregi("^[a-zA-Z0-9_]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$]", $email)){
		return FALSE;
	}

	list($Username, $Domain) = split("@",$email);

	if(@getmxrr($Domain, $MXHost)){
		return TRUE;
   
	} else {
		if(@fsockopen($Domain, 25, $errno, $errstr, 30)){
			return TRUE; 
		} else {

			return FALSE; 
		}
	}
}	




//validate the post form

//check the teamname field
if(empty($_POST['teamname'])){

	//set the response
	$response_array['status'] = 'error';
	$response_array['message'] = 'Fill in your team name';

//check the name field
}elseif(empty($_POST['yourname'])) {

	//set the response
	$response_array['status'] = 'error';
	$response_array['message'] = 'Fill in your name';

//check the email field
} elseif(!checkEmail($_POST['youremail'])) {

	//set the response
	$response_array['status'] = 'error';
	$response_array['message'] = 'Email is blank or invalid';

//check the country field
} elseif(empty($_POST['country'])) {

	//set the response
	$response_array['status'] = 'error';
	$response_array['message'] = 'Choose your country';

//check the city field
} elseif(empty($_POST['city'])) {

	//set the response
	$response_array['status'] = 'error';
	$response_array['message'] = 'No city';

//form validated. send email
} else {
	
	//build list of teammembers
	$teammembers = array();
	if(!empty($_POST['teammember1'])){
		array_push($teammembers, $_POST['teammember1']);
	}
	if(!empty($_POST['teammember2'])){
		array_push($teammembers, $_POST['teammember2']);
	}
	if(!empty($_POST['teammember3'])){
		array_push($teammembers, $_POST['teammember3']);
	}
	if(!empty($_POST['teammember4'])){
		array_push($teammembers, $_POST['teammember4']);
	}
	if(!empty($_POST['teammember5'])){
		array_push($teammembers, $_POST['teammember5']);
	}
	if(!empty($_POST['teammember6'])){
		array_push($teammembers, $_POST['teammember6']);
	}
	if(!empty($_POST['teammember7'])){
		array_push($teammembers, $_POST['teammember7']);
	}
	if(!empty($_POST['teammember8'])){
		array_push($teammembers, $_POST['teammember8']);
	}
	if(!empty($_POST['teammember9'])){
		array_push($teammembers, $_POST['teammember9']);
	}
	if(!empty($_POST['teammember10'])){
		array_push($teammembers, $_POST['teammember10']);
	}
	
	
	try{
		if ($emailoption){
	
			// To send HTML mail, the Content-type header must be set
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			$headers .= "From: webmaster@maasbach.com\r\n";
			$headers .= "Reply-To: webmaster@maasbach.com\r\n";
			$headers .= "Return-Path: webmaster@maasbach.com\r\n";
			$headers .= "BCC: webmaster@maasbach.com\r\n";
			
			$to = $_POST['youremail'];
			$subject = "Vision 20:20 Random - ".$_POST['teamname'];
			$message  = "<html><head><title>Vision 20:20 Random</title></head><body>";
			$message .= "Dear ".$_POST['yourname'].",<br /><br />";
			$message .= "Thank you for joining Vision 20:20 Random!<br />";
			$message .= "Your Random city is: <b>".$_POST['city']."</b><br /><br />";
			$message .= "Your Random team name is: <b>".$_POST['teamname']."</b><br /><br />";
			$message .= "Your Random team members are: <b><br />";
			foreach($teammembers as $teammember){
				$message .= "$teammember<br />";	
			}			
			$message .= "</b><br />";
			$message .= "Order your V2020 Random package with your flag, leaflets and instructions on <a href='http://www.bijbelhuis.nl/Shop/Index.php?page=getinfo&id=RANDOM2020' target='_blank'>www.bijbelhuis.nl</a><br /><br />";
			$message .= $_POST['yourname'].", please do not hesitate in contacting us back in case you need any further assistance.<br /><br />";
			$message .= "Best regards,<br />";
			$message .= "POiNT! Youth Team<br />";
			$message .= "<a href='mailto:info@pointyouth.com'>info@pointyouth.com</a><br />";
			$message .= "<a href='http://www.pointyouth.com' target='_blank'>www.pointyouth.com</a>";
			
			// email to user
			mail($to,$subject,$message,$headers);
			
			//set the response
			$response_array['status'] = 'success';
			$response_array['message'] = 'You have mail! Check your email for further instructions.';
					
		}		
	}catch(Exception $e){
			//debug echo 'Caught exception: ',  $e->getMessage(), "\n";
			
			//set the response
			$response_array['status'] = 'error';
			$response_array['message'] = 'Error sending you mail.</br><a href="mailto:info@pointyouth.com?subject=Error>Please contact us for further instructions</a>';	
	}
}


echo json_encode($response_array);



/*function is_valid_callback($subject)
{
    $identifier_syntax
      = '/^[$_\p{L}][$_\p{L}\p{Mn}\p{Mc}\p{Nd}\p{Pc}\x{200C}\x{200D}]*+$/u';

    $reserved_words = array('break', 'do', 'instanceof', 'typeof', 'case',
      'else', 'new', 'var', 'catch', 'finally', 'return', 'void', 'continue', 
      'for', 'switch', 'while', 'debugger', 'function', 'this', 'with', 
      'default', 'if', 'throw', 'delete', 'in', 'try', 'class', 'enum', 
      'extends', 'super', 'const', 'export', 'import', 'implements', 'let', 
      'private', 'public', 'yield', 'interface', 'package', 'protected', 
      'static', 'null', 'true', 'false');

    return preg_match($identifier_syntax, $subject)
        && ! in_array(mb_strtolower($subject, 'UTF-8'), $reserved_words);
}



$json = json_encode($emailstatus);

//$data = array(1, 2, 3, 4, 5, 6, 7, 8, 9);
//$json = json_encode($data);

# JSON if no callback
if( ! isset($_GET['callback']))
    exit($json);

# JSONP if valid callback
if(is_valid_callback($_GET['callback']))
    exit("{$_GET['callback']}($json)");

# Otherwise, bad request
header('status: 400 Bad Request', true, 400);*/

	
	
	

?>