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

$inp;
$tempArray;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $inp = file_get_contents('json/main.json');
  $tempArray = json_decode($inp, true);
  if ($_GET['change'] == "texture") {
    upload_img($_FILES["img_file"], $_GET['texture_type']);
  } else if ($_GET['change'] == "color") {
    fill_color(array("name" => $_POST['name'], "hex_code" => $_POST['hex_code']));
  } else if ($_GET['change'] == "price") {
    fill_price(array($_POST['price']));
  } else {
    echo "Failed";
  }
}

function upload_img($img_file, $tex_type){
  $target_dir = "tex/";
  $target_file = $target_dir . basename($img_file["name"]);
  $check = getimagesize($img_file["tmp_name"]);
  if($check !== false) {
    if (file_exists($target_file)) {
      echo "Sorry, file already exists.";
    } else {
      if (move_uploaded_file($img_file["tmp_name"], $target_file)) {
        fill_textures(array("img_name" => $img_file["name"]), $tex_type);
      } else {
        echo "Sorry, there was an error uploading your file.";
      }
    }
  } else {
    echo "File is not an image.";
  }
}

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
  if ($tex_type == 'interior') {
    array_push($tempArray["interior"], $data);
  } else {
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

?>