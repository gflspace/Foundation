import type { Dictionary } from "./en";

/**
 * Version française. Doit garder exactement la même structure que en.ts.
 * Les espaces insécables ( ) précèdent « : ; ! ? » et entourent les guillemets, selon l’usage français.
 */
const fr: Dictionary = {
  locale: "fr",
  meta: {
    siteName: "Fondation Syndy Emade",
    tagline: "Un phare d’espoir. Une icône de l’action.",
    description:
      "La Fondation Syndy Emade protège les jeunes vulnérables, apporte une aide d’urgence mobile, finance des bourses d’études et renforce les communautés au Cameroun, en Afrique et dans la diaspora.",
    keywords: ["Syndy Emade", "Fondation Syndy Emade", "association caritative Cameroun", "protection de l’enfance Cameroun", "aide humanitaire Cameroun", "bourses d’études Cameroun", "Blue Rain Entertainment"],
    location: "Buea et Douala, Cameroun",
  },

  nav: {
    about: "À propos",
    projects: "Projets",
    legacy: "Héritage créatif",
    media: "Médias",
    getInvolved: "S’engager",
    donate: "Faire un don",
    skip: "Aller au contenu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    home: "Fondation Syndy Emade — accueil",
    primary: "Navigation principale",
    logoSub: "Fondation",
    switchShort: "EN",
    switchLong: "Read in English",
    switchLang: "en",
  },

  common: {
    learnMore: "En savoir plus",
    opensNewTab: "(s’ouvre dans un nouvel onglet)",
    donateNow: "Faire un don",
    volunteer: "Devenir bénévole",
    allProgrammes: "Tous les programmes",
    backHome: "Retour à l’accueil",
  },

  hero: {
    eyebrow: "Cameroun · Afrique · Diaspora",
    line1: "Un phare d’espoir.",
    line2: "Une icône de l’action.",
    cta: "Faire un don",
    secondary: "Découvrir nos actions",
    promiseLabel: "Notre engagement",
    promise: "Transformer la notoriété en aide concrète — pour chaque enfant, chaque famille et chaque communauté que nous accompagnons.",
    watch: "Voir nos missions sur Syndy Emade TV",
  },

  impact: {
    heading: "Notre impact",
    labels: ["Jeunes accompagnés", "Missions d’urgence", "Bourses attribuées", "Femmes soutenues"],
    placeholderNote: "Chiffres indicatifs — données d’impact vérifiées à venir.",
  },

  pillars: {
    philanthropist: {
      kicker: "Pilier I",
      title: "La Philanthrope",
      summary: "Bien-être, protection des jeunes et accès à l’éducation.",
      points: ["Protection et accompagnement des jeunes", "Bourses d’études", "Formation professionnelle"],
    },
    humanitarian: {
      kicker: "Pilier II",
      title: "L’Humanitaire",
      summary: "Une aide rapide et mobile pour les familles touchées par les crises.",
      points: ["Intervention mobile de crise", "Missions d’aide d’urgence", "Actions de santé de proximité"],
    },
    icon: {
      kicker: "Pilier III",
      title: "L’Icône culturelle",
      summary: "Le cinéma et la créativité au service du bien commun.",
      points: ["Ambassadrice de la culture", "Mentorat des jeunes artistes", "Économie créative"],
    },
  },

  projects: {
    "youth-welfare": {
      title: "Protection et accompagnement des jeunes",
      short: "Hébergement, alimentation, bilans de santé et soutien moral pour les jeunes en situation de vulnérabilité.",
      intro:
        "Notre programme d’intervention va à la rencontre des jeunes là où ils se trouvent : hébergement sûr, repas réguliers, bilans de santé et mentors de confiance, complétés par des programmes de réinsertion, des dons de vêtements et des événements communautaires qui leur rendent leur dignité.",
      activities: [
        "Placement en hébergement d’urgence et partenariats avec des foyers d’accueil",
        "Aide alimentaire et dépistages de santé réguliers",
        "Mentorat, écoute et soutien moral",
        "Programmes de réinsertion et collectes de vêtements",
      ],
      regions: "Régions du Sud-Ouest et du Littoral",
      funding: ["Hébergement et alimentation", "Santé et écoute", "Mentorat et événements"],
    },
    "mobile-crisis": {
      title: "Intervention mobile de crise",
      short: "« Chantiers Mobiles Crise » : des unités mobiles qui apportent vivres, eau, kits de santé et abris.",
      intro:
        "Nos unités mobiles — les Chantiers Mobiles Crise — se rendent auprès des familles touchées par les conflits et des personnes déplacées avec des vivres, de l’eau potable, des kits de santé et une aide au logement, en lien avec les autorités locales pour intervenir vite et en toute sécurité.",
      activities: [
        "Distribution de vivres et d’eau potable",
        "Kits de santé et soins médicaux d’urgence",
        "Matériel d’abri pour les familles déplacées",
        "Dépistages de santé communautaires",
      ],
      regions: "Zones du Cameroun touchées par les conflits",
      funding: ["Vivres et eau", "Kits de santé et soins", "Abris et logistique"],
    },
    education: {
      title: "Bourses d’études",
      short: "Fournitures scolaires et bourses du secondaire et du supérieur pour les orphelins et les enfants défavorisés.",
      intro:
        "L’éducation est le cadeau le plus durable que nous puissions offrir. Chaque trimestre, nous organisons des collectes de fournitures scolaires et attribuons des bourses du secondaire et du supérieur aux orphelins et aux enfants défavorisés, pour que ce soit le talent, et non les circonstances, qui décide de leur avenir.",
      activities: [
        "Collectes de fournitures pour la rentrée",
        "Bourses couvrant les frais de scolarité du secondaire",
        "Bourses universitaires et aides aux études",
        "Formations professionnelles et numériques",
      ],
      regions: "Régions du Sud-Ouest et du Littoral",
      funding: ["Frais de scolarité", "Fournitures et uniformes", "Programmes de formation"],
    },
    women: {
      title: "Autonomisation des femmes",
      short: "Microsubventions et formations en couture et en agriculture pour les veuves et les femmes déplacées.",
      intro:
        "Les femmes sont le pilier des communautés, surtout en temps de crise. Notre programme de microsubventions aide les veuves et les femmes déplacées à créer ou relancer une petite activité, avec l’appui de formations en couture et en agriculture.",
      activities: [
        "Microsubventions pour petites entreprises",
        "Formation en couture et confection",
        "Formation agricole et intrants",
        "Tontines solidaires et mentorat",
      ],
      regions: "Tout le pays, en priorité les communautés déplacées",
      funding: ["Microsubventions", "Formation professionnelle", "Mentorat et suivi"],
    },
  },

  founder: {
    name: "Syndy Emade",
    legalName: "Elone Synthia Emade",
    born: "21 novembre 1993",
    birthplace: "Kumba, région du Sud-Ouest, Cameroun",
    education: "Licence en banque et finance, Université de Buea",
    roles: ["Actrice primée", "Productrice de cinéma et de télévision", "PDG de Blue Rain Entertainment", "Mannequin", "Philanthrope"],
    ambassadorships: [
      "Ambassadrice de marque, Orange InstaVoice Celeb",
      "Productrice Netflix", // TODO(verify)
      "Partenaire CFI", // TODO(verify)
    ],
    summary:
      "Née à Kumba et diplômée en banque et finance de l’Université de Buea, Syndy Emade a fait ses débuts à l’écran en 2010 avant de devenir l’une des actrices et productrices les plus reconnues du Cameroun. Avec Blue Rain Entertainment, elle porte des histoires camerounaises auprès des publics d’Afrique et d’ailleurs — et, avec sa Fondation, elle transforme cette notoriété en aide directe et concrète pour les communautés qui l’ont vue grandir.",
    photoAlt: "Syndy Emade en robe rouge aux Glitz Style Awards, Ghana, 2017",
    photoCredit: "Photo :",
    photoVia: "via Wikimedia Commons",
  },

  awards: [
    { year: "2014", title: "Miss Heritage Cameroun" },
    { year: "2014", title: "Miss Heritage Afrique" },
    { year: "2017", title: "Scoos Academy Award — Meilleure actrice camerounaise" },
    { year: "2017", title: "Classée 2e actrice camerounaise la plus active", note: "Njoka TV" },
    { year: "Carrière", title: "8 prix nationaux et internationaux de la meilleure actrice" },
  ],

  films: {
    filterLabel: "Filtrer la filmographie",
    filters: { all: "Toute la filmographie", producer: "En tant que productrice", highlight: "Temps forts" },
    highlight: "Temps fort",
    as: "rôle :",
    actress: "Actrice",
    viewImdb: "Voir sur IMDb",
    credit: { producer: "Productrice et actrice", lead: "Rôle principal" },
    notes: { debut: "Premier long métrage", tv: "Série télévisée", nollywood: "Débuts à Nollywood", ekubo: "Avec Alexx Ekubo" },
    timelineHeading: "Chronologie de la filmographie",
  },

  home: {
    pillarsEyebrow: "Trois piliers",
    pillarsTitle: "Une femme, une voix, trois façons de changer des vies",
    pillarsIntro:
      "De l’accompagnement durable des jeunes à l’intervention d’urgence et au mentorat créatif, notre action s’appuie sur les forces que notre fondatrice apporte à chaque communauté.",
    programmesEyebrow: "Programmes",
    programmesTitle: "Là où va votre soutien",
    founderEyebrow: "La fondatrice",
    readStory: "Découvrir son parcours",
    legacyEyebrow: "Héritage créatif",
    legacyTitle: "Le cinéma au service du bien commun",
    legacyIntro:
      "Plus de 15 ans devant et derrière la caméra avec Blue Rain Entertainment — des histoires qui portent les voix camerounaises à travers l’Afrique et le monde.",
    fullFilmography: "Toute la filmographie",
  },

  cta: {
    title: "Chaque don devient un repas, une place en classe, une nuit en sécurité.",
    text: "Donnez une fois ou chaque mois — par carte, PayPal ou Mobile Money.",
    donate: "Faire un don",
    involve: "Devenir bénévole ou partenaire",
  },

  about: {
    metaTitle: "La fondatrice et la Fondation",
    metaDescription:
      "Syndy Emade — diplômée en banque, actrice primée, productrice et philanthrope — ainsi que la mission, la vision et la gouvernance de sa Fondation.",
    eyebrow: "À propos",
    title: "De Kumba au monde — et retour aux sources",
    intro: "L’histoire de notre fondatrice et l’engagement qui anime la Fondation Syndy Emade.",
    factBorn: "Naissance",
    factEducation: "Formation",
    factFullName: "Nom complet",
    founderEyebrow: "La fondatrice",
    founderExtra:
      "Financière de formation devenue cinéaste, elle apporte à la philanthropie la rigueur d’une entrepreneure : des objectifs clairs, des dépenses justifiées et des partenariats durables.",
    honours: "Distinctions et reconnaissance",
    roles: "Fonctions et ambassades",
    references: "Profils de référence :",
    foundationEyebrow: "La Fondation",
    foundationTitle: "Mission, vision et gouvernance",
    missionTitle: "Notre mission",
    mission:
      "Protéger les jeunes vulnérables, apporter une aide digne aux familles en crise, ouvrir les portes de l’éducation et donner aux femmes et aux créateurs les moyens d’agir — au Cameroun, en Afrique et dans la diaspora.",
    visionTitle: "Notre vision",
    vision: "Une Afrique où chaque enfant est en sécurité, où chaque famille peut se relever d’une crise et où chaque talent a sa chance de briller.",
    governance: [
      { title: "La protection d’abord", text: "Des politiques de protection de l’enfance encadrent chaque programme, chaque bénévole et chaque partenaire." },
      { title: "Des comptes transparents", text: "Les dépenses et les résultats de nos programmes sont publiés dans un rapport d’impact annuel." },
      { title: "Au plus près des communautés", text: "Les responsables locaux et les bénéficiaires participent au choix de nos lieux et de nos modes d’action." },
    ],
    deckTitle: "Rapport d’impact de la Fondation",
  },

  projectsPage: {
    metaTitle: "Projets et impact",
    metaDescription:
      "Protection des jeunes, intervention mobile de crise, bourses d’études et autonomisation des femmes à travers le Cameroun.",
    eyebrow: "Projets et impact",
    title: "Une aide concrète, là où on en a besoin",
    intro: "Quatre programmes, trois piliers, un engagement : un changement mesurable pour les personnes que nous servons.",
    listHeading: "Nos programmes",
    frameworkEyebrow: "Notre cadre d’action",
    frameworkTitle: "Les trois piliers",
  },

  project: {
    eyebrow: "Programme",
    photoLabel: "{title} sur le terrain",
    whatWeDo: "Nos actions",
    allocation: "Répartition des fonds",
    allocationNote: "Répartition cible ; les montants réels sont publiés dans notre rapport annuel.",
    support: "Soutenir ce programme",
    others: "Autres programmes",
  },

  legacy: {
    metaTitle: "Filmographie et héritage créatif",
    metaDescription:
      "La filmographie de Syndy Emade de 2010 à aujourd’hui, Blue Rain Entertainment et les distinctions d’une carrière dans le cinéma camerounais et africain.",
    eyebrow: "Héritage créatif",
    title: "Des histoires qui voyagent — et qui redonnent",
    intro: "{count} œuvres depuis {year}, en tant qu’actrice et productrice, avec Blue Rain Entertainment et des studios partenaires.",
    studioEyebrow: "Blue Rain Entertainment",
    studioTitle: "Un studio engagé",
    studioIntro:
      "À la tête de Blue Rain Entertainment, Syndy Emade produit des films qui mettent en lumière les talents camerounais et placent les enjeux de société au cœur du récit.",
    awards: "Distinctions",
    imdb: "Filmographie complète sur IMDb",
    advocacyEyebrow: "Engagement créatif",
    advocacyTitle: "Le pilier de l’Icône culturelle",
    advocacy: [
      { title: "Le cinéma au service du bien commun", text: "Les productions de Blue Rain Entertainment sensibilisent aux enjeux de société et à l’émancipation africaine." },
      { title: "Mentorat des jeunes artistes", text: "Accompagnement de jeunes acteurs, cinéastes et entrepreneurs créatifs africains." },
      { title: "Rayonnement international", text: "Promotion des arts et de la culture camerounais en Afrique et dans le monde." },
    ],
  },

  media: {
    metaTitle: "Médias et presse",
    metaDescription: "Vidéos de Syndy Emade TV, galeries photo, revue de presse et dossier de presse de la Fondation.",
    eyebrow: "Médias et presse",
    title: "Voir nos actions. Partager notre histoire.",
    intro: "Vidéos de terrain, galeries photo et revue de presse — ainsi que tout ce dont les journalistes ont besoin, au même endroit.",
    videoEyebrow: "Vidéo",
    videoTitle: "Syndy Emade TV",
    videoIntro: "Carnets de bord de nos missions humanitaires et coulisses de nos productions.",
    subscribe: "S’abonner sur YouTube",
    watchChannel: "Regarder Syndy Emade TV sur YouTube",
    galleryEyebrow: "Galerie",
    galleryTitle: "Moments de terrain",
    gallery: [
      "Collecte de fournitures pour la rentrée",
      "Distribution par une unité mobile de crise",
      "Atelier de couture pour les femmes",
      "Cérémonie de remise des bourses",
      "Séance de mentorat avec des jeunes",
      "Sur un tournage de Blue Rain Entertainment",
    ],
    commons: "Images sous licence libre sur Wikimedia Commons",
    pressEyebrow: "Dans la presse",
    pressTitle: "Articles et reportages",
    inFrench: "En français",
    inEnglish: "En anglais",
    tags: {
      interview: "Entretien",
      ranking: "Classement",
      feature: "Portrait",
      release: "Sortie",
      award: "Distinction",
      profile: "Profil",
      ambassador: "Ambassadrice",
      studio: "Studio",
    },
    kitTitle: "Dossier de presse",
    kitText: "Fiche d’information et logos (SVG et PNG). Photos officielles disponibles sur demande.",
    kitDownload: "Télécharger le dossier de presse (ZIP)",
    kitFactSheet: "Voir la fiche d’information (PDF)",
    enquiries: "Contact presse :",
  },

  donate: {
    metaTitle: "Faire un don et s’engager",
    metaDescription:
      "Donnez par carte, PayPal ou Mobile Money MTN / Orange, ou proposez votre aide comme bénévole ou partenaire de la Fondation Syndy Emade.",
    eyebrow: "Faire un don et s’engager",
    title: "Votre générosité, leur avenir",
    intro: "Choisissez un montant, un programme et un moyen de paiement. Nous nous occupons du reste — en toute transparence.",
    impactEyebrow: "Ce que permet votre don",
    impactTitle: "Un impact réel, quel que soit le montant",
    tiers: [
      "Les fournitures scolaires d’un enfant pour un trimestre",
      "Un kit d’urgence familial : vivres, purification de l’eau et hygiène",
      "Un mois d’hébergement et de repas pour un jeune",
      "Une microsubvention pour lancer une petite entreprise portée par une femme",
    ],
    trust: [
      "Paiements conformes à la norme PCI via Stripe, PayPal et Flutterwave.",
      "Les dons affectés vont uniquement au programme choisi.",
      "Chaque donateur reçoit notre rapport d’impact annuel.",
    ],
    formTitle: "Votre don",
    involveEyebrow: "S’engager",
    involveTitle: "Devenez bénévole ou partenaire",
    involveIntro:
      "Mettez vos compétences au service du terrain, ou associez votre organisation à la nôtre. Entreprises, ONG et médias partenaires sont les bienvenus.",
    faqTitle: "Questions fréquentes",
    faqs: [
      {
        q: "Comment mon don est-il utilisé ?",
        a: "Les fonds vont au programme que vous choisissez, ou là où les besoins sont les plus grands si vous ne précisez rien. Nous publions les dépenses par programme dans notre rapport d’impact annuel.",
      },
      {
        q: "Puis-je donner par Mobile Money ?",
        a: "Oui. Choisissez Mobile Money pour payer avec MTN MoMo ou Orange Money en FCFA, via notre paiement sécurisé Flutterwave.",
      },
      {
        q: "Puis-je donner chaque mois ?",
        a: "Oui. Sélectionnez « Mensuel » dans le formulaire pour mettre en place un don récurrent par carte. Vous pouvez l’arrêter à tout moment.",
      },
      {
        q: "Mon organisation peut-elle devenir partenaire ?",
        a: "Nous accueillons volontiers les entreprises, ONG et médias partenaires. Remplissez le formulaire de partenariat ci-dessous et notre équipe vous recontactera.",
      },
    ],
    deckTitle: "Présentation partenariats",
  },

  form: {
    modalEyebrow: "Offrez de l’espoir aujourd’hui",
    modalTitle: "Faire un don",
    close: "Fermer la fenêtre de don",
    frequency: "Fréquence du don",
    once: "Ponctuel",
    monthly: "Mensuel",
    currency: "Devise",
    chooseAmount: "Choisissez un montant",
    otherAmount: "Autre montant",
    customAmountLabel: "Montant libre",
    directTo: "Affecter mon don à",
    greatestNeed: "Là où les besoins sont les plus grands",
    method: "Moyen de paiement",
    methods: {
      card: { label: "Carte", hint: "Visa, Mastercard, Apple Pay et Google Pay via Stripe" },
      momo: { label: "Mobile Money", hint: "MTN MoMo et Orange Money (FCFA) via Flutterwave" },
      paypal: { label: "PayPal", hint: "Donnez avec votre compte ou votre solde PayPal" },
    },
    give: "Donner {amount}",
    perMonth: " / mois",
    giveNow: "Donner maintenant",
    secure: "Paiement sécurisé et chiffré. Nous ne conservons jamais vos données bancaires.",
    agreePre: "En donnant, vous acceptez nos",
    agreeTerms: "conditions de don",
    agreeAnd: "et notre",
    agreePrivacy: "politique de confidentialité",
    errMin: "Le don minimum est de {min}.",
    errMomo: "Le paiement par Mobile Money est en cours de mise en place. Merci d’utiliser la carte ou PayPal pour le moment.",
    errPaypal: "Le don par PayPal est en cours de mise en place. Merci d’utiliser la carte pour le moment.",
    errGeneric: "Une erreur s’est produite.",
    errCheckout: "Le paiement est momentanément indisponible.",
  },

  involve: {
    type: "Type de candidature",
    volunteer: "Bénévole",
    partner: "Partenaire",
    name: "Nom complet",
    email: "E-mail",
    phone: "Téléphone / WhatsApp",
    optional: "(facultatif)",
    location: "Ville / Pays",
    organisation: "Organisation",
    interest: "Domaine d’intérêt",
    partnershipType: "Type de partenariat",
    partnerOptions: ["Mécénat d’entreprise", "ONG / partenaire de mise en œuvre", "Partenariat média", "Don en nature"],
    volunteerOptions: ["Mentorat des jeunes", "Missions d’aide d’urgence", "Éducation et soutien scolaire", "Formation des femmes", "Médias et communication"],
    message: "Dites-nous-en un peu plus",
    privacyPre: "Nous utiliserons ces informations uniquement pour répondre à votre candidature. Consultez notre",
    privacyLink: "politique de confidentialité",
    submit: "Envoyer ma candidature",
    error: "Désolé, l’envoi a échoué. Merci de réessayer ou de nous écrire.",
    thanksTitle: "Merci !",
    thanksText: "Nous avons bien reçu votre candidature et vous recontacterons sous 5 jours ouvrés.",
  },

  footer: {
    explore: "Explorer",
    programmes: "Programmes",
    newsletterTitle: "Nouvelles du terrain, chaque mois",
    newsletterText: "Des récits de nos missions et l’utilisation de votre soutien.",
    emailLabel: "Adresse e-mail",
    join: "S’inscrire",
    joined: "Merci — vous êtes inscrit(e).",
    joinError: "L’inscription a échoué, merci de réessayer.",
    rights: "Tous droits réservés.",
    privacy: "Confidentialité",
    terms: "Conditions de don",
    registered: "Association à but non lucratif · Cameroun",
    youtube: "YouTube — Syndy Emade TV",
  },

  thankYou: {
    title: "Merci pour votre don",
    text: "Un reçu vous a été envoyé par e-mail. Votre générosité se transforme déjà en repas, en places à l’école et en nuits en sécurité pour les personnes que nous accompagnons.",
    see: "Découvrir les actions que vous soutenez",
    metaTitle: "Merci",
  },

  notFound: {
    title: "Cette page n’existe plus",
    text: "Mais il reste beaucoup de bien à faire.",
    home: "Retour à l’accueil",
  },

  legal: {
    eyebrow: "Informations légales",
    updatedLabel: "Dernière mise à jour :",
    updated: "novembre 2026",
    privacy: {
      metaTitle: "Politique de confidentialité",
      metaDescription: "Comment la Fondation Syndy Emade collecte, utilise et protège vos données personnelles.",
      title: "Politique de confidentialité",
      intro:
        "La Fondation Syndy Emade (« nous ») respecte votre vie privée. Cette politique explique quelles données personnelles nous collectons sur ce site, pourquoi nous les collectons et quels sont vos choix.",
      sections: [
        {
          h: "Données collectées",
          items: [
            { b: "Dons :", t: "vos nom, adresse e-mail, coordonnées de facturation et montant du don. Les paiements par carte, PayPal et Mobile Money sont traités par Stripe, PayPal et Flutterwave ; nous ne voyons ni ne conservons jamais votre numéro de carte complet ni le code de votre portefeuille mobile." },
            { b: "Candidatures de bénévoles et de partenaires :", t: "les informations saisies dans le formulaire, comme le nom, l’e-mail, le téléphone, la ville ou l’organisation, le domaine d’intérêt et le message." },
            { b: "Lettre d’information :", t: "votre adresse e-mail." },
            { b: "Données techniques :", t: "les journaux standard du serveur (adresse IP, type de navigateur, pages consultées) conservés par notre hébergeur à des fins de sécurité et de dépannage." },
          ],
        },
        {
          h: "Cookies",
          p: ["Ce site n’utilise aucun cookie publicitaire ni de mesure d’audience. Nos prestataires de paiement peuvent déposer des cookies strictement nécessaires sur leurs propres pages de paiement afin de traiter votre paiement en toute sécurité."],
        },
        {
          h: "Utilisation de vos données",
          items: [
            { t: "Traiter les dons, émettre les reçus et, si vous le souhaitez, gérer les dons récurrents." },
            { t: "Répondre aux candidatures de bénévoles et de partenaires." },
            { t: "Vous envoyer la lettre d’information à laquelle vous êtes inscrit(e). Chaque e-mail contient un lien de désinscription." },
            { t: "Respecter nos obligations légales, comptables et de protection de l’enfance." },
          ],
          p: ["Nous ne vendons, ne louons et n’échangeons jamais vos données personnelles."],
        },
        {
          h: "Partage des données",
          p: ["Uniquement avec les prestataires qui nous aident à fonctionner : les services de paiement (Stripe, PayPal, Flutterwave), notre hébergeur et nos outils d’e-mail et de gestion des formulaires. Chacun ne peut utiliser vos données que pour nous fournir son service. Nous pouvons aussi communiquer des informations lorsque la loi l’exige."],
        },
        {
          h: "Durée de conservation",
          p: ["Les données de dons sont conservées aussi longtemps que l’exigent les règles comptables et fiscales. Les candidatures et inscriptions à la lettre d’information sont conservées jusqu’à ce que vous en demandiez la suppression, ou jusqu’à ce qu’elles ne soient plus nécessaires."],
        },
        {
          h: "Vos droits",
          p: ["Vous pouvez à tout moment demander à consulter, corriger ou supprimer les données personnelles que nous détenons à votre sujet, ou ne plus recevoir nos e-mails. Écrivez à {email} ; nous vous répondrons sous 30 jours."],
        },
        {
          h: "Enfants",
          p: ["Ce site ne s’adresse pas aux enfants de moins de 16 ans et nous ne collectons pas sciemment leurs données personnelles en ligne. Les informations relatives aux jeunes de nos programmes sont traitées hors ligne, conformément à notre politique de protection de l’enfance."],
        },
        { h: "Modifications", p: ["Nous pouvons mettre à jour cette politique. La date indiquée en haut de page correspond à la dernière modification."] },
        { h: "Contact", p: ["Questions relatives à la confidentialité : {email}."] },
      ],
    },
    donation: {
      metaTitle: "Conditions de don et de remboursement",
      metaDescription: "Comment les dons à la Fondation Syndy Emade sont traités, utilisés et remboursés.",
      title: "Conditions de don et de remboursement",
      intro: "Merci de soutenir la Fondation Syndy Emade. Ces conditions s’appliquent à tout don effectué sur ce site.",
      sections: [
        {
          h: "Utilisation de votre don",
          p: ["Si vous choisissez un programme, votre don lui est exclusivement affecté. Si vous choisissez « Là où les besoins sont les plus grands », nous l’attribuons au programme le plus en besoin à ce moment-là. Si un programme affecté est entièrement financé ou ne peut pas avoir lieu, nous utiliserons le don pour l’objectif le plus proche."],
        },
        {
          h: "Traitement des paiements",
          p: ["Les paiements par carte sont traités par Stripe, les paiements PayPal par PayPal, et les paiements MTN MoMo et Orange Money par Flutterwave. Chaque prestataire peut prélever de faibles frais de traitement, déduits avant que les fonds ne nous parviennent."],
        },
        { h: "Reçus", p: ["Un reçu est envoyé par e-mail pour chaque don réussi. Conservez-le pour vos archives."] },
        {
          h: "Dons mensuels",
          p: ["Les dons mensuels par carte sont prélevés le même jour chaque mois jusqu’à leur arrêt. Pour modifier ou arrêter un don mensuel, écrivez à {email} ou utilisez le lien figurant sur votre reçu. L’arrêt prend effet avant le prélèvement suivant."],
        },
        {
          h: "Remboursements",
          p: ["En cas d’erreur, par exemple un mauvais montant ou un paiement en double, contactez-nous sous 30 jours à {email} avec votre reçu et nous vous rembourserons intégralement. Au-delà de 30 jours, ou une fois les fonds engagés dans un programme, un remboursement pourrait ne pas être possible."],
        },
        {
          h: "Fiscalité",
          p: ["La déductibilité fiscale de votre don dépend de la législation de votre pays. Renseignez-vous auprès d’un conseiller fiscal. Nous vous fournirons tous les justificatifs possibles."],
        },
        {
          h: "Sécurité et fraude",
          p: ["Nous ne conservons aucune donnée bancaire. Nous pouvons refuser ou rembourser les dons qui semblent frauduleux ou qui proviennent de sources que nous ne pouvons pas légalement accepter."],
        },
        { h: "Contact", p: ["Questions relatives à un don : {email}."] },
      ],
    },
  },

  og: {
    eyebrow: "Fondation Syndy Emade",
    footer: "Jeunesse · Urgence humanitaire · Bourses d’études · Autonomisation des femmes",
  },
};

export default fr;
