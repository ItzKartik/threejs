<?php

$password = "38ba0ef529faec6dc4f8bcdba153c9e0";
$username = "Hari";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $pword = $_POST['pword'];
  $uname = $_POST['uname'];
  if (empty($pword) || empty($uname)) {
    echo "Name is empty";
  } else if ((md5($pword) == $password) and ($uname == $username)) {
    header('Location: '.$_SERVER['PHP_SELF']);
  } else {
    echo "Failed";  
  }
}

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
    echo "Error Post";
  }
}else if($_GET['delete']){
  if ($_GET['delete'] == "color"){
    delete_color($_GET['color_name']);
  } else if ($_GET['delete'] == "texture"){
    delete_texture($_GET['texture_type'], $_GET['texture_name']);
  }else{
    echo "Error GET";
  }
}

function save_json($json){
  $jsonData = json_encode($json);
  file_put_contents('json/main.json', $jsonData);
}

function delete_color($color_name)
{
  global $tempArray;
  foreach($tempArray['color'] as $key => $value) {
    $val = $value['name'];
    if($val == $color_name){
      array_splice($tempArray['color'], $key) ;
      save_json($tempArray);
    }
  }
}

function delete_texture($texture_type, $texture_name)
{
  global $tempArray;
  foreach($tempArray[$texture_type] as $key => $value) {
    $val = $value['img_name'];
    if($val == $texture_name){
      array_splice($tempArray[$texture_type], $key);
      save_json($tempArray);
    }
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
  save_json($tempArray);
}

function fill_textures($data, $tex_type)
{
  global $tempArray;
  if ($tex_type == 'interior') {
    array_push($tempArray["interior"], $data);
  } else {
    array_push($tempArray["exterior"], $data);
  }
  save_json($tempArray);
}

function fill_price($data)
{
  global $tempArray;
  $tempArray['price'] = $data;
  save_json($tempArray);
}

?>