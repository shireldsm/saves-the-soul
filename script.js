document.addEventListener('DOMContentLoaded', function () {

  ///////////////////////////
  // CARROUSEL IMAGES //
  ///////////////////////////

  // == SÉLECTION DES ÉLÉMENTS == //
  const images = document.querySelectorAll('#carousel img');                     // Récupère toutes les images du carrousel
  const carousel = document.getElementById('carousel');                          // Récupère le conteneur principal du carrousel

  // == VARIABLES DE CONTRÔLE == //
  let index = 0;                                                                 // Index de l'image actuelle
  let startX = 0;                                                                // Position de départ du swipe
  let isDragging = false;                                                       // État de drag en cours

  // == FONCTIONS POUR AFFICHER LES IMAGES == //
  function showImage(i) {                                                       // Affiche une image, cache les autres
    if (images.length === 0) return;
    images.forEach(img => img.classList.remove('active'));
    if (images [i] ) {
    images[i].classList.add('active');
    }
  }

  function next() {                                                              // Passe à l'image suivante
    index = (index + 1) % images.length;
    showImage(index);
  }

  function prev() {                                                              // Passe à l'image précédente
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  }

  // == GESTION DES SWIPES ET DRAGS == //
  function handleSwipe(diffX) {                                                  // Gère la logique du swipe, fonction qui décide si le swipe est assez grand pour changer d'image
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        next();
      } else {
        prev();
      }
    }
  }


  // == ÉCOUTEURS D'ÉVÈNEMENTS == //
    // Touches tactiles
  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;                                             // Position de départ tactile
    });

    carousel.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      handleSwipe(diffX);                                                       // Gère le swipe après relâchement
    });

    carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;                                                        // Position de départ avec la souris
    });

    carousel.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.clientX;
      const diffX = startX - endX;
      handleSwipe(diffX);                                                       // Gère le drag souris
    });
  }

  // Clics sur les boutons gauche/droite
  const btnGauche = document.querySelector('.btn-circle.gauche');               // Bouton gauche
  if (btnGauche) btnGauche.addEventListener('click', prev);                     // Clic = image précédente

  const btnDroite = document.querySelector('.btn-circle.droite');               // Bouton droite
  if (btnDroite) btnDroite.addEventListener('click', next);                     // Clic = image suivante

  showImage(index);                                                              // Affiche la première image au chargement


  ////////////////////////////////
  // BOUTONS QUANTITÉ ET PANIER //
  ////////////////////////////////

  const moins = document.getElementById('moins');                                // Bouton "-"
  const plus = document.getElementById('plus');                                  // Bouton "+"
  const quantiteAffichee = document.getElementById('quantite');                  // Affichage de la quantité

  let quantite = 1;                                                              // Quantité initiale

  // Quand l'utilisateur clique sur le bouton "+"
  if (plus && quantiteAffichee) {
    plus.addEventListener('click', () => {
      quantite++;
      quantiteAffichee.textContent = quantite;                                  // Met à jour la quantité affichée
    });
  }
  // Quand l'utilisateur clique sur le bouton "-"
  if (moins && quantiteAffichee) {
    moins.addEventListener('click', () => {
      if (quantite > 1) {
        quantite--;
        quantiteAffichee.textContent = quantite;                                // Ne descend pas en dessous de 1
      }
    });
  }


  //////////////////////////
  // MENU DÉROULANT //
  //////////////////////////

  const btnMenu = document.getElementById('btn-menu');                           // Bouton pour ouvrir/fermer le menu
  const navMenu = document.getElementById('nav-menu');                           // Menu de navigation

  if (btnMenu && navMenu) {
    btnMenu.addEventListener('click', () => {
      console.log("Bouton cliqué");
      const isExpanded = btnMenu.getAttribute('aria-expanded') === 'true';      // Vérifie l'état actuel
      btnMenu.setAttribute('aria-expanded', String(!isExpanded));               // Inverse l'état
      navMenu.style.display = isExpanded ? 'none' : 'block';                    // Affiche ou cache le menu
    });
  }

});

//////////////////////////
  // Animation scroll //
  //////////////////////////
  const blocs = document.querySelectorAll('.flou-container');

  function highlightVisibleBloc() {
    const triggerMiddle = window.innerHeight / 2;

    blocs.forEach(bloc => {
      const rect = bloc.getBoundingClientRect();
      const blocMiddle = rect.top + rect.height / 2;

      if (blocMiddle < triggerMiddle + 100 && blocMiddle > triggerMiddle - 100) {
        bloc.classList.add('active');
      } else {
        bloc.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', highlightVisibleBloc);
  window.addEventListener('load', highlightVisibleBloc);


