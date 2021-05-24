<?php
// Make something md5
// $password = "38ba0ef529faec6dc4f8bcdba153c9e0";
// $username = "Hari";
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//   $pword = $_POST['pword'];
//   $uname = $_POST['uname'];
//   if (empty($pword) || empty($uname)) {
//     echo "Name is empty";
//   } else if ((md5($pword) == $password) and ($uname == $username)) {
//     echo "Password Matched";
//   } else {
//     echo "Failed";  
//   }
// }

$inp = file_get_contents('json/main.json');
$tempArray = json_decode($inp, true);

// fill_textures(array("img_name"=>"5.jpeg"), "exterior");
// fill_color(array("name"=>"White", "hex_code"=>"0xffffff"));
// fill_price(array("name"=>"White", "hex_code"=>"0xffffff"));

function fill_color($data)
{
  global $tempArray;
  array_push($tempArray["color"], $data);
  $jsonData = json_encode($tempArray);
  file_put_contents('json/main.json', $jsonData);
}

function fill_textures($data, $tex_type)
{
  global $tempArray;
  if($tex_type == 'interior'){
    array_push($tempArray["interior"], $data);
  }else{
    array_push($tempArray["exterior"], $data);
  }
  $jsonData = json_encode($tempArray);
  file_put_contents('json/main.json', $jsonData);
}

function fill_price($data)
{
  global $tempArray;
  $tempArray['price'] = $data;
  $jsonData = json_encode($tempArray);
  file_put_contents('json/main.json', $jsonData);
}