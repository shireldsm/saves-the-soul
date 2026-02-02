<?php
//Vérifie que le formulaire a été envoyé avec méthode POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  //On récupère les champs et on les nettoie:
  //htmlspecialchars() empêche d'éxécuter du code malveillant (xss)
  $nom = htmlspecialchars($_POST['nom']);
  $message = htmlspecialchars($_POST['message']);
 
  //on valide l'adresse mail (avec filtre spécial)
  $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
  
  //Validation basique sur nom
  if (!preg_match ("/^[a-zA-Z-' ]*$/", $nom)) {
    echo "Nom invalide.";
    exit;
  }

  if ($email === false || preg_match("/[\r\n]/", $email)) {
      echo "Adresse email invalide.";
      exit;
  }
  
  if (strlen($nom) > 100 || strlen($message) > 1000) {
      echo "Le nom ou le message est trop long.";
      exit;
  }


  //on vérifie que tous les champs sont bien remplis et valides
  if ($nom && $email && $message) {

    // Adresse mail à laquelle le formulaire va être envoyé
    $to = "savesthesoul@gmail.com";  
   
    //sujet et corps du mail (ce qui a ete remplis sur le formulaire)
    $subject = "Nouveau message du site STS";
    $body = "Nom: $nom\nEmail: $email\n\nMessage:\n$message";
    
    // En-tête du mail (expediteur = email saisi)
    $headers = "From: no-reply@tondomaine.com\r\n";
    $headers .= "Reply-To: $email\r\n";


    //Fonction PHP qui envoie le mail l'email
    if (mail($to, $subject, $body, $headers)) {
     
      //Si le mail est bien parti :
      echo "Message envoyé avec succès ! Merci de nous avoir contacté.";
    } else {
      //si quelque chose a échoué
      echo "Erreur lors de l'envoi du message. Veuillez réessayer plus tard.";
    }
  } else {
    //Si un champ est vide ou invalide
    echo "Tous les champs sont obligatoires.";
  }
} else {
  //Si on essaie d'accéder à ce fichier sans passer par le formulaire
  echo "Accès refusé.";
}
?>


