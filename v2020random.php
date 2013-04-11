<?php
// Vision 20:20 Random form script
if (isset($_POST)){
	//declare variables
	//email setting
	$emailoption = true;
	//form fields
	$teamname = "";
	$yourname = "";
	$youremail = "";
	$country = "";
	$teammember1 = "";
	$teammember2 = "";
	$teammember3 = "";
	$teammember4 = "";
	$teammember5 = "";
	$teammember6 = "";
	$teammember7 = "";
	$teammember8 = "";
	$teammember9 = "";
	$teammember10 = "";
	
	try{
		$teamname = $_POST['teamname'];
		$yourname = $_POST['yourname'];
		$youremail = $_POST['youremail'];
		$yourcountry = $_POST['country'];
		$teammember1 = $_POST['teammember1'];
		$teammember2 = $_POST['teammember2'];
		$teammember3 = $_POST['teammember3'];
		$teammember4 = $_POST['teammember4'];
		$teammember5 = $_POST['teammember5'];
		$teammember6 = $_POST['teammember6'];
		$teammember7 = $_POST['teammember7'];
		$teammember8 = $_POST['teammember8'];
		$teammember9 = $_POST['teammember9'];
		$teammember10 = $_POST['teammember10'];
		
		//debug code
		/*
		echo("teamname: ".$teamname."\n");
		echo("yourname: ".$yourname."\n");
		echo("youremail: ".$youremail."\n");
		echo("yourcountry: $yourcountry \n");
		echo("teammember1: $teammember1 \n");
		echo("teammember2: $teammember2 \n");
		echo("teammember3: $teammember3 \n");
		echo("teammember4: $teammember4 \n");
		echo("teammember5: $teammember5 \n");
		echo("teammember6: $teammember6 \n");
		echo("teammember7: $teammember7 \n");
		echo("teammember8: $teammember8 \n");
		echo("teammember9: $teammember9 \n");
		echo("teammember10: $teammember10 \n");
		*/
		
		if ($emailoption){
			
			// To send HTML mail, the Content-type header must be set
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			$headers .= "From: events@maasbach.com\r\n";
			$headers .= "Reply-To: events@maasbach.com\r\n";
			$headers .= "Return-Path: events@maasbach.com\r\n";
			$headers .= "BCC: webmaster@maasbach.com,events@maasbach.com\r\n";
			
			$to = $youremail;
			$subject = "Vision 20:20 Random - ".$teamname;
			$message  = "<html><head><title>Vision 20:20 Random</title></head><body>";
			$message .= "Dear ".$yourname.",<br /><br />";
			$message .= "Thank you for joining Vision 20:20 Random!<br />";
			$message .= "Your random location is: <b>".$yourcountry."</b><br /><br />";
			$message .= "Your random team name is: <b>".$teamname."</b><br /><br />";
			$message .= "Order your V2020 Random package with your flag, leaflets and instructions on <a href='http://www.bijbelhuis.nl/Shop/Index.php?page=getinfo&id=Visie%202020%20Random' target='_blank'>www.bijbelhuis.nl</a><br /><br />";
			$message .= $yourname.", please do not hesitate in contacting us back in case you need any further assistance.<br /><br />";
			$message .= "Best regards,<br />";
			$message .= "POiNT! Youth Team<br />";
			$message .= "<a href='http://www.pointyouth.com' target='_blank'>www.pointyouth.com</a>";
			
			// email to user
			mail($to,$subject,$message,$headers);
		}
		
	}catch(Exception $e){
		//debug echo 'Caught exception: ',  $e->getMessage(), "\n";
		echo("We are sorry, something went wrong. Please try again.<br />");
		echo("<a href='mailto:webmaster@maasbach.com?subject=Vision 20:20 Random'>Contact us</a>");	
		}
}
?>