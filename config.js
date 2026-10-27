/* =====================================================================
   ✏️  TEXTES ET INFORMATIONS DE L'INVITATION
   ---------------------------------------------------------------------
   C'est le SEUL fichier à modifier pour changer les textes, les dates,
   les lieux, les liens et les photos. Gardez bien les guillemets "..."
   et les virgules en fin de ligne.
   ===================================================================== */

window.INVITATION = {

  /* ---------- Les mariés ---------- */
  prenom1: "Marianne",
  prenom2: "Vincent",
  initiales: ["M", "V"],

  /* ---------- Jour J (compte à rebours) ----------
     Format : AAAA-MM-JJTHH:MM:SS+00:00  (Abidjan = heure UTC, +00:00) */
  dateJourJ: "2026-11-21T09:00:00+00:00",

  /* ---------- Enveloppe d'ouverture ---------- */
  enveloppe: {
    texteHaut: "Une invitation vous attend",
    carteSurtitre: "Vous êtes invités",
    carteDate: "21 . 11 . 2026",
    bouton: "Ouvrir notre invitation"
  },

  /* ---------- 1. Accueil ---------- */
  accueil: {
    photo: "photos/accueil.jpg",
    surtitre: "Nous avons la joie de vous inviter à notre mariage",
    dateTexte: "Samedi 21 Novembre 2026",
    lieuTexte: "Cocody, Abidjan",
    phrase: "Avec la bénédiction de Dieu et de nos familles, nous serions heureux de vous compter parmi nous pour célébrer le plus beau jour de notre vie.",
    compteTitre: "Rendez-vous dans",
    libelles: { jours: "Jours", heures: "Heures", minutes: "Minutes", secondes: "Secondes" },
    compteFin: "C'est aujourd'hui, le grand jour !",
    defiler: "Découvrir"
  },

  /* ---------- 2. Notre histoire ---------- */
  histoire: {
    surtitre: "Notre chemin",
    titre: "Notre histoire",
    etapes: [
      {
        icone: "rencontre",
        titre: "Rencontre et Travail",
        texte: "Nos routes se sont croisées autour du travail et de belles valeurs partagées. De la simple estime est née une complicité sincère."
      },
      {
        icone: "sablier",
        titre: "Sablier d'Amour",
        texte: "Comme le sable d'un sablier, le temps a coulé doucement et chaque grain a renforcé notre amour, notre patience et notre confiance."
      },
      {
        icone: "croix",
        titre: "Dieu au centre de tout",
        texte: "Nous avons choisi de bâtir notre foyer sur la foi et la prière. C'est avec Lui que nous disons « oui » pour la vie."
      }
    ]
  },

  /* ---------- 3. Galerie (4 à 7 photos) ----------
     format : "portrait", "paysage" ou "carre" */
  galerie: {
    surtitre: "Souvenirs",
    titre: "Galerie",
    photos: []
  },

  /* ---------- 4. Le programme (samedi) ---------- */
  programme: {
    surtitre: "Samedi 21 Novembre 2026",
    titre: "Le programme",
    etapes: [
      { heure: "09h00", titre: "Accueil et mariage civil", lieu: "Mairie de Cocody" },
      { heure: "11h00", titre: "Cérémonie religieuse", lieu: "Paroisse Bon Pasteur, Riviera 3" },
      { heure: "14h00", titre: "Repas et réception", lieu: "Espace Eden Traiteur, Riviera 2" },
      { heure: "En soirée", titre: "Remerciements", lieu: "Espace Eden Traiteur, Riviera 2" }
    ],
    dimanche: {
      jour: "Dimanche 22 Novembre 2026",
      titre: "Réception familiale",
      lieu: "Cité des Cadres, Cocody (École de police)",
      texte: "Un moment simple et chaleureux, en famille, pour prolonger la fête."
    }
  },

  /* ---------- 5. Rendez Vous pour... ----------
     Le 1er lieu s'affiche en premier. "recherche" = ce qu'on tape dans Google Maps.
     Pour plus de précision, remplacez-la par l'adresse exacte du lieu. */
  lieu: {
    surtitre: "Où nous retrouver",
    titre: "Le lieu de réception",
    boutonItineraire: "Ouvrir l'itinéraire",
    lieux: [
      {
        onglet: "La Réception",
        nom: "Espace Eden Traiteur",
        adresse: "Riviera 2, Abidjan, Côte d'Ivoire",
        quand: "Samedi 21 Novembre, à 14h00",
        recherche: "Espace Eden, Riviera 2, Abidjan"
      },
      {
        onglet: "La Mairie",
        nom: "Mairie de Cocody",
        adresse: "Cocody, Abidjan, Côte d'Ivoire",
        quand: "Samedi 21 Novembre, à 09h00",
        recherche: "Hôtel Communal de Cocody, Abidjan"
      },
      {
        onglet: "L'Église",
        nom: "Paroisse Bon Pasteur",
        adresse: "Riviera 3, Abidjan, Côte d'Ivoire",
        quand: "Samedi 21 Novembre, à 11h00",
        recherche: "Paroisse Bon Pasteur, Riviera 3, Abidjan"
      },
      {
        onglet: "Le Dimanche",
        nom: "Cité des Cadres",
        adresse: "Cocody (École de police), Abidjan, Côte d'Ivoire",
        quand: "Dimanche 22 Novembre, réception familiale",
        recherche: "CMA Business center cocody abidjan malle, 9224+RW2 Mouskovichcosta@gmai.com, Abidjan"
      }
    ]
  },

  /* ---------- 6. Tenue ---------- */
  tenue: {
    surtitre: "Dress code",
    titre: "Tenue",
    texte: "Nous vous invitons à porter les couleurs de notre mariage : rose fuchsia, orange et blanc.",
    mention: "Non obligatoire",
    note: "C'est un clin d'œil, pas une règle. Venez avant tout comme vous êtes, avec élégance.",
    couleurs: [
      { nom: "Rose Fuchsia", hex: "#D6246E" },
      { nom: "Orange", hex: "#F6893A" },
      { nom: "Blanc", hex: "#FFFFFF" }
    ]
  },

  /* ---------- 7. Confirmer ma présence ---------- */
  rsvp: {
    surtitre: "R.S.V.P.",
    titre: "Confirmer ma présence",
    texte: "Votre présence sera notre plus beau cadeau. Merci de nous confirmer votre venue en remplissant le court formulaire.",
    bouton: "Je confirme ma présence",
    lien: "https://forms.gle/GoLva54wRoGzVPK36",
    limiteLibelle: "Réponse souhaitée avant le",
    dateLimite: "Mardi 10 Novembre 2026"
  },

  /* ---------- 8. Pied de page ---------- */
  pied: {
    merci: "Merci de faire partie de notre histoire",
    slogan: "Simple & Chic",
    hashtag: "#AveMaria"
  }
};
