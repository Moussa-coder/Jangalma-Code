// Service de chatbot intelligent
// Ce service peut être connecté à une API réelle (OpenAI, Anthropic, etc.)

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatbotConfig {
  role: "student" | "instructor";
  context?: string;
}

// Configuration pour différents types de chatbots
const getSystemPrompt = (role: "student" | "instructor"): string => {
  if (role === "student") {
    return `Tu es JangalmaBot, un assistant IA intelligent et bienveillant pour la plateforme Jangalma Code, une plateforme d'apprentissage en ligne au Sénégal.

Tu es l'assistant officiel de la plateforme Jangalma Code. Tu connais TOUT sur la plateforme :

**FONCTIONNALITÉS PRINCIPALES :**
- Pages : Accueil, Cours, Domaines, Instructeurs, À propos, Tableau de bord
- Inscription/Connexion : Comment créer un compte, se connecter
- Cours : Comment trouver, filtrer, consulter des cours
- Domaines : 8 domaines (Web, Mobile, IA, Marketing, Gestion de projet, Design, Cybersécurité, Data Science)
- Tableau de bord : Progression, portfolio, réalisations, statistiques
- Instructeurs : Profils, cours des instructeurs
- Portfolio : Comment créer et gérer son portfolio

**TON RÔLE :**
1. Répondre à TOUTES les questions sur la plateforme
2. Guider les étudiants dans leur utilisation de la plateforme
3. Expliquer les fonctionnalités et comment les utiliser
4. Aider avec les concepts de programmation si demandé
5. Être encourageant, clair et toujours utile

**IMPORTANT :**
- Réponds toujours en français
- Sois précis et donne des instructions claires
- Si tu ne sais pas quelque chose de spécifique, guide vers la page appropriée
- Utilise des emojis pour rendre les réponses plus conviviales
- Sois proactif et suggère des actions concrètes`;
  } else {
    return `Tu es un assistant IA intelligent pour la plateforme Jangalma Code, spécialement conçu pour aider les instructeurs.

Ton rôle est d'aider les instructeurs à :
- Créer et structurer des cours efficaces
- Gérer leurs étudiants et suivre leur progression
- Améliorer leur contenu pédagogique
- Répondre aux questions sur la pédagogie et l'enseignement en ligne
- Optimiser leurs cours pour de meilleurs résultats

Sois professionnel, expert et constructif. Réponds en français.`;
  }
};

// Simulation d'une API de chatbot
// Dans un environnement réel, cela appellerait une vraie API (OpenAI, Anthropic, etc.)
const simulateChatbotResponse = async (
  messages: ChatMessage[],
  config: ChatbotConfig
): Promise<string> => {
  // Simulation d'un délai de réponse
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || "";
  
  // Réponses simulées basées sur le contexte
  if (config.role === "student") {
    // Questions sur comment regarder/voir des cours (priorité haute - doit être vérifié en premier)
    if ((lastMessage.includes("regarder") || lastMessage.includes("voir") || lastMessage.includes("consulter") || 
         lastMessage.includes("accéder") || lastMessage.includes("trouver") || lastMessage.includes("faire")) && 
        (lastMessage.includes("cours") || lastMessage.includes("formation")) &&
        (lastMessage.includes("comment") || lastMessage.includes("comment faire") || lastMessage.includes("comment faire pour"))) {
      return "Pour regarder des cours, voici comment faire :\n\n1️⃣ **Page Cours** : Clique sur 'Cours' dans le menu pour voir tous les cours disponibles\n2️⃣ **Filtres** : Utilise les filtres (domaine, niveau, prix) pour trouver exactement ce que tu cherches\n3️⃣ **Domaines** : Explore la page 'Domaines' pour découvrir les cours par catégorie\n4️⃣ **Tableau de bord** : Va sur ton tableau de bord pour voir tes cours suivis\n\n💡 Astuce : Tu peux aussi utiliser la barre de recherche pour chercher un cours spécifique !";
    }
    
    // Questions sur regarder/voir des cours (sans "comment" explicite)
    if ((lastMessage.includes("regarder") || lastMessage.includes("voir") || lastMessage.includes("consulter") || 
         lastMessage.includes("accéder")) && 
        (lastMessage.includes("cours") || lastMessage.includes("formation"))) {
      return "Pour regarder des cours, voici comment faire :\n\n1️⃣ **Page Cours** : Clique sur 'Cours' dans le menu pour voir tous les cours disponibles\n2️⃣ **Filtres** : Utilise les filtres (domaine, niveau, prix) pour trouver exactement ce que tu cherches\n3️⃣ **Domaines** : Explore la page 'Domaines' pour découvrir les cours par catégorie\n4️⃣ **Tableau de bord** : Va sur ton tableau de bord pour voir tes cours suivis\n\n💡 Astuce : Tu peux aussi utiliser la barre de recherche pour chercher un cours spécifique !";
    }
    
    // Salutations simples (sans mention de cours)
    if ((lastMessage.includes("bonjour") || lastMessage.includes("salut") || lastMessage.includes("hello") || lastMessage.includes("bonsoir")) &&
        !lastMessage.includes("cours") && !lastMessage.includes("formation")) {
      return "Bonjour ! 👋 Je suis JangalmaBot, ton assistant personnel. Je peux t'aider à :\n\n📚 Trouver des cours adaptés à tes besoins\n💡 Te proposer des cours selon tes intérêts\n📊 Suivre ton avancement dans tes cours\n🧭 Naviguer facilement dans la plateforme\n\nQue souhaites-tu faire aujourd'hui ?";
    }
    
    // Salutations avec mention de cours - répondre directement
    if ((lastMessage.includes("bonjour") || lastMessage.includes("salut") || lastMessage.includes("hello") || lastMessage.includes("bonsoir")) &&
        (lastMessage.includes("cours") || lastMessage.includes("formation") || lastMessage.includes("regarder") || 
         lastMessage.includes("voir") || lastMessage.includes("comment"))) {
      return "Bonjour ! 👋 Pour regarder des cours, c'est simple :\n\n1️⃣ Va sur la page **'Cours'** dans le menu\n2️⃣ Tu verras tous les cours disponibles avec des filtres pour affiner ta recherche\n3️⃣ Tu peux aussi explorer les **'Domaines'** pour découvrir les cours par catégorie\n4️⃣ Pour suivre tes cours, va sur ton **'Tableau de bord'**\n\nDis-moi ce que tu veux apprendre et je te guiderai vers les bons cours !";
    }
    
    // Recherche de cours
    if (lastMessage.includes("trouver") && (lastMessage.includes("cours") || lastMessage.includes("formation"))) {
      return "Pour trouver des cours, je te recommande de :\n\n1️⃣ Aller sur la page 'Cours' pour voir tous les cours disponibles\n2️⃣ Utiliser les filtres (domaine, niveau, prix) pour affiner ta recherche\n3️⃣ Explorer les 'Domaines' pour découvrir les catégories de formation\n\n💡 Astuce : Tu peux aussi me dire ce que tu veux apprendre (ex: React, Python, design) et je te guiderai vers les bons cours !";
    }
    
    // Proposer des cours
    if (lastMessage.includes("proposer") || lastMessage.includes("suggérer") || lastMessage.includes("recommand") || 
        (lastMessage.includes("cours") && (lastMessage.includes("pour") || lastMessage.includes("intéressé")))) {
      return "Je peux te proposer des cours selon tes intérêts ! Voici quelques suggestions :\n\n🎯 **Développement Web** : Parfait pour créer des sites et applications web\n📱 **Développement Mobile** : Pour créer des apps iOS et Android\n🤖 **Intelligence Artificielle** : Pour explorer le machine learning\n📊 **Marketing Digital** : Pour apprendre le SEO et les réseaux sociaux\n\nDis-moi ce qui t'intéresse le plus et je te guiderai vers les cours adaptés !";
    }
    
    // Suivi de progression
    if (lastMessage.includes("progression") || lastMessage.includes("avancement") || lastMessage.includes("suivre") || 
        lastMessage.includes("où en suis") || lastMessage.includes("mes cours")) {
      return "Pour suivre ton avancement, va sur ton **Tableau de bord** ! Tu y trouveras :\n\n✅ Tes cours en cours\n📈 Ta progression globale\n🏆 Tes réalisations\n📚 Ton portfolio\n\n💡 Astuce : Le tableau de bord te montre aussi combien de leçons tu as complétées et ton temps d'étude total. C'est motivant de voir tes progrès !";
    }
    
    // Navigation
    if (lastMessage.includes("naviguer") || 
        (lastMessage.includes("où") && (lastMessage.includes("aller") || lastMessage.includes("trouver") || lastMessage.includes("accéder"))) ||
        (lastMessage.includes("comment") && (lastMessage.includes("aller") || lastMessage.includes("trouver") || lastMessage.includes("accéder")))) {
      return "Voici comment naviguer dans la plateforme :\n\n🏠 **Accueil** : Découvre la plateforme et ses domaines\n📚 **Cours** : Explore tous les cours disponibles avec filtres\n🎓 **Domaines** : Découvre les 8 domaines de formation\n👨‍🏫 **Instructeurs** : Rencontre les experts\n📊 **Tableau de bord** : Suis ta progression\n\nDis-moi où tu veux aller et je t'aiderai !";
    }
    
    // Technologies spécifiques
    if (lastMessage.includes("react") || lastMessage.includes("javascript") || lastMessage.includes("python") || 
        lastMessage.includes("java") || lastMessage.includes("html") || lastMessage.includes("css")) {
      const tech = lastMessage.includes("react") ? "React" : 
                   lastMessage.includes("javascript") ? "JavaScript" :
                   lastMessage.includes("python") ? "Python" :
                   lastMessage.includes("java") ? "Java" :
                   lastMessage.includes("html") ? "HTML/CSS" : "cette technologie";
      return `${tech} est une excellente technologie à apprendre ! 🚀\n\nJe te recommande de :\n1️⃣ Explorer les cours de **Développement Web** pour ${tech}\n2️⃣ Vérifier ton niveau (débutant, intermédiaire, avancé)\n3️⃣ Consulter les cours disponibles dans la section "Cours"\n\nVeux-tu que je t'aide à trouver des cours spécifiques sur ${tech} ?`;
    }
    
    // Aide générale
    if (lastMessage.includes("aide") || lastMessage.includes("help") || lastMessage.includes("que peux")) {
      return "Je peux t'aider avec :\n\n🔍 **Trouver des cours** : Dis-moi ce que tu veux apprendre\n💡 **Proposer des cours** : Je te suggère des formations adaptées\n📊 **Suivre ta progression** : Je t'oriente vers ton tableau de bord\n🧭 **Naviguer** : Je te guide dans la plateforme\n📖 **Concepts techniques** : Je réponds à tes questions sur la programmation\n\nQue veux-tu faire en premier ?";
    }
    
    // Cours en général
    if (lastMessage.includes("cours") || lastMessage.includes("formation")) {
      return "Pour découvrir les cours :\n\n1️⃣ **Page Cours** : Voir tous les cours disponibles avec filtres\n2️⃣ **Page Domaines** : Explorer par catégorie (Web, Mobile, IA, etc.)\n3️⃣ **Tableau de bord** : Voir tes cours suivis et ta progression\n\n💡 Actuellement, les cours sont en préparation. Mais je peux t'aider à te préparer et à comprendre ce qui sera disponible !\n\nQue veux-tu apprendre ?";
    }
    
    // Tableau de bord
    if (lastMessage.includes("tableau de bord") || lastMessage.includes("dashboard")) {
      return "Ton **Tableau de bord** est ton centre de contrôle ! 📊\n\nTu y trouveras :\n✅ Tes cours en cours avec progression\n📈 Statistiques de ton apprentissage\n🏆 Tes réalisations et badges\n📚 Ton portfolio de projets\n\nPour y accéder, clique sur 'Tableau de bord' dans le menu ou dis-moi si tu veux que je t'aide avec quelque chose de spécifique !";
    }
    
    // Domaines
    if (lastMessage.includes("domaine") || lastMessage.includes("catégorie") || lastMessage.includes("secteur")) {
      return "Nous avons **8 domaines** de formation :\n\n🌐 Développement Web\n📱 Développement Mobile\n🤖 Intelligence Artificielle\n📢 Marketing Digital\n👥 Gestion de Projet\n🎨 Design UI/UX\n🔒 Cybersécurité\n📊 Data Science\n\nExplore la page 'Domaines' pour découvrir les métiers et compétences de chaque secteur !";
    }
    
    // Inscription
    if (lastMessage.includes("inscrire") || lastMessage.includes("inscription") || lastMessage.includes("créer un compte") || 
        lastMessage.includes("s'inscrire") || lastMessage.includes("compte")) {
      return "Pour t'inscrire sur Jangalma Code, c'est très simple :\n\n1️⃣ Clique sur le bouton **'S'inscrire'** en haut à droite de la page\n2️⃣ Remplis le formulaire avec tes informations\n3️⃣ Confirme ton inscription\n4️⃣ C'est gratuit et sans carte bancaire ! 🎉\n\nUne fois inscrit, tu auras accès à tous les cours gratuits et pourras commencer ton apprentissage immédiatement !";
    }
    
    // Connexion
    if (lastMessage.includes("connecter") || lastMessage.includes("connexion") || lastMessage.includes("se connecter") ||
        lastMessage.includes("login") || lastMessage.includes("identifier")) {
      return "Pour te connecter :\n\n1️⃣ Clique sur **'Connexion'** en haut à droite de la page\n2️⃣ Entre ton email et ton mot de passe\n3️⃣ Clique sur 'Se connecter'\n\n💡 Si tu as oublié ton mot de passe, il y a une option pour le réinitialiser sur la page de connexion.";
    }
    
    // Instructeurs
    if (lastMessage.includes("instructeur") || lastMessage.includes("professeur") || lastMessage.includes("formateur") ||
        lastMessage.includes("enseignant")) {
      return "Les **Instructeurs** sont des experts dans leur domaine ! 👨‍🏫\n\nTu peux :\n1️⃣ Voir tous les instructeurs sur la page **'Instructeurs'**\n2️⃣ Consulter leur profil, leurs cours et leurs spécialités\n3️⃣ Découvrir leurs parcours et expériences\n4️⃣ Voir les avis des étudiants\n\nLes instructeurs créent et animent les cours sur la plateforme. Explore leurs profils pour trouver ceux qui correspondent à tes objectifs !";
    }
    
    // À propos
    if (lastMessage.includes("à propos") || lastMessage.includes("apropos") || lastMessage.includes("qui sommes") ||
        lastMessage.includes("mission") || lastMessage.includes("plateforme")) {
      return "**Jangalma Code** est une plateforme d'apprentissage en ligne au Sénégal ! 🇸🇳\n\n🎯 **Notre mission** : Démocratiser l'accès à une éducation numérique de qualité pour tous les Sénégalais et Africains\n\n✨ **Ce que nous offrons** :\n- 8 domaines de formation\n- Des cours adaptés au marché sénégalais et africain\n- Des instructeurs qualifiés\n- Un accompagnement personnalisé\n- Des formations accessibles (gratuites et payantes)\n\nVa sur la page **'À propos'** pour en savoir plus sur notre histoire et nos valeurs !";
    }
    
    // Portfolio
    if (lastMessage.includes("portfolio") || lastMessage.includes("projet") || lastMessage.includes("réalisation")) {
      return "Ton **Portfolio** est dans ton **Tableau de bord** ! 📚\n\nTu peux y :\n✅ Ajouter tes projets et réalisations\n✅ Mettre en avant tes compétences\n✅ Partager tes créations\n✅ Suivre tes accomplissements\n\n💡 Astuce : Un bon portfolio montre ta progression et tes compétences aux employeurs potentiels !\n\nVa sur ton tableau de bord et clique sur l'onglet 'Mon Portfolio' pour commencer.";
    }
    
    // Certifications
    if (lastMessage.includes("certificat") || lastMessage.includes("certification") || lastMessage.includes("diplôme") ||
        lastMessage.includes("attestation")) {
      return "Les **certifications** sont obtenues après avoir complété un cours ! 🏆\n\nPour obtenir une certification :\n1️⃣ Suis un cours jusqu'au bout\n2️⃣ Complète tous les modules et exercices\n3️⃣ Passe les évaluations\n4️⃣ Reçois ton certificat reconnu\n\nLes certificats valorisent ton CV et montrent tes compétences aux employeurs. Tu peux les voir dans ton tableau de bord !";
    }
    
    // Comment ça marche
    if (lastMessage.includes("comment ça marche") || lastMessage.includes("fonctionne") || lastMessage.includes("utiliser") ||
        lastMessage.includes("débuter") || lastMessage.includes("commencer")) {
      return "Voici comment utiliser Jangalma Code :\n\n1️⃣ **Inscris-toi** : Crée ton compte gratuitement\n2️⃣ **Explore** : Découvre les cours et domaines disponibles\n3️⃣ **Choisis** : Sélectionne un cours qui t'intéresse\n4️⃣ **Apprends** : Suis les leçons à ton rythme\n5️⃣ **Progresse** : Suis ton avancement dans ton tableau de bord\n6️⃣ **Certifie-toi** : Obtiens des certificats en complétant les cours\n\nC'est simple et accessible à tous ! 🚀";
    }
    
    // Prix / Gratuit
    if (lastMessage.includes("prix") || lastMessage.includes("gratuit") || lastMessage.includes("coût") ||
        lastMessage.includes("payer") || lastMessage.includes("tarif")) {
      return "Sur Jangalma Code, nous proposons :\n\n🆓 **Cours gratuits** : Accessibles à tous les étudiants inscrits\n💰 **Cours payants** : À des tarifs abordables adaptés au marché sénégalais\n\n💡 Notre mission est de rendre l'éducation accessible, donc beaucoup de nos cours sont gratuits !\n\nTu peux voir le prix de chaque cours sur la page 'Cours' avec les filtres. L'inscription est toujours gratuite !";
    }
    
    // Niveaux
    if (lastMessage.includes("niveau") || lastMessage.includes("débutant") || lastMessage.includes("intermédiaire") ||
        lastMessage.includes("avancé") || lastMessage.includes("expert")) {
      return "Les cours sont organisés par **niveaux** :\n\n🌱 **Débutant** : Pour ceux qui commencent\n📈 **Intermédiaire** : Pour ceux qui ont déjà des bases\n🚀 **Avancé** : Pour ceux qui veulent se perfectionner\n\nTu peux filtrer les cours par niveau sur la page 'Cours'. Choisis celui qui correspond à ton niveau actuel !";
    }
    
    // Recherche
    if (lastMessage.includes("rechercher") || lastMessage.includes("chercher") || lastMessage.includes("recherche")) {
      return "Pour rechercher quelque chose sur la plateforme :\n\n1️⃣ **Page Cours** : Utilise la barre de recherche en haut pour chercher un cours spécifique\n2️⃣ **Filtres** : Utilise les filtres (domaine, niveau, prix, instructeur) pour affiner\n3️⃣ **Navigation** : Explore les différentes pages (Domaines, Instructeurs)\n\n💡 Tu peux aussi me demander directement et je te guiderai !";
    }
    
    // Problèmes / Support
    if (lastMessage.includes("problème") || lastMessage.includes("erreur") || lastMessage.includes("bug") ||
        lastMessage.includes("aide") && (lastMessage.includes("technique") || lastMessage.includes("support"))) {
      return "Si tu rencontres un problème :\n\n1️⃣ **Vérifie ta connexion** : Assure-toi d'être bien connecté à internet\n2️⃣ **Rafraîchis la page** : Parfois ça résout les petits bugs\n3️⃣ **Vérifie ton compte** : Assure-toi d'être connecté avec le bon compte\n4️⃣ **Contacte le support** : Si le problème persiste, contacte l'équipe via la page 'À propos'\n\n💡 Je peux aussi t'aider à naviguer dans la plateforme si tu es perdu !";
    }
    
    // Questions générales sur la plateforme
    if (lastMessage.includes("quoi") || lastMessage.includes("qu'est-ce") || lastMessage.includes("c'est quoi")) {
      return "**Jangalma Code** est une plateforme d'apprentissage en ligne au Sénégal ! 🇸🇳\n\nNous proposons :\n📚 Des cours dans 8 domaines du numérique\n👨‍🏫 Des instructeurs experts\n📊 Un suivi de progression\n🏆 Des certifications\n📱 Une plateforme accessible partout\n\nNotre mission est de démocratiser l'éducation numérique pour tous les Sénégalais et Africains !\n\nQue veux-tu savoir de plus ?";
    }
    
    // Réponse par défaut améliorée - essaie de comprendre l'intention
    const words = lastMessage.split(/\s+/);
    const hasQuestionWord = words.some(w => ["comment", "où", "quoi", "quand", "pourquoi", "qui", "combien"].includes(w));
    
    if (hasQuestionWord) {
      return "Je comprends ta question ! 💭\n\nPour mieux t'aider, peux-tu être plus spécifique ? Je peux répondre à des questions sur :\n\n🔍 **Recherche** : 'Comment trouver des cours sur React ?'\n📚 **Cours** : 'Où sont les cours gratuits ?'\n📊 **Progression** : 'Comment voir ma progression ?'\n👤 **Compte** : 'Comment m'inscrire ?'\n🎓 **Domaines** : 'Quels domaines sont disponibles ?'\n👨‍🏫 **Instructeurs** : 'Comment voir les instructeurs ?'\n\nDis-moi ce dont tu as besoin et je te guiderai !";
    }
    
    return "Je comprends ! 💭\n\nJe peux t'aider avec tout ce qui concerne la plateforme Jangalma Code :\n\n🔍 Trouver et proposer des cours\n📊 Suivre ta progression\n🧭 Naviguer dans la plateforme\n👤 Inscription et connexion\n👨‍🏫 Découvrir les instructeurs\n🎓 Explorer les domaines\n📚 Gérer ton portfolio\n🏆 Obtenir des certifications\n\nDis-moi ce que tu veux faire ou pose-moi une question spécifique !";
  } else {
    // Réponses pour instructeurs
    // Questions sur le nombre d'étudiants inscrits (priorité haute)
    if ((lastMessage.includes("combien") || lastMessage.includes("nombre") || lastMessage.includes("total")) && 
        (lastMessage.includes("étudiant") || lastMessage.includes("élève") || lastMessage.includes("apprenant")) &&
        (lastMessage.includes("inscrit") || lastMessage.includes("inscription") || lastMessage.includes("compte") || 
         lastMessage.includes("mon") || lastMessage.includes("mes"))) {
      return "Pour voir le nombre d'étudiants inscrits dans vos cours :\n\n1️⃣ **Tableau de bord** : Accédez à votre tableau de bord instructeur\n2️⃣ **Section Statistiques** : Vous verrez le nombre total d'étudiants inscrits\n3️⃣ **Section Mes Étudiants** : Consultez la liste complète de tous vos étudiants\n4️⃣ **Par cours** : Cliquez sur un cours spécifique pour voir combien d'étudiants y sont inscrits\n\n📊 **Informations disponibles** :\n- Nombre total d'étudiants inscrits\n- Nombre d'étudiants par cours\n- Nouveaux étudiants (par période)\n- Étudiants actifs vs inactifs\n\n💡 Astuce : Dans votre tableau de bord, vous pouvez aussi voir les statistiques détaillées de chaque cours, y compris le nombre d'inscriptions !";
    }
    
    // Salutations
    if (lastMessage.includes("bonjour") || lastMessage.includes("salut") || lastMessage.includes("hello") || lastMessage.includes("bonsoir")) {
      return "Bonjour ! 👋 Je suis votre assistant IA pour instructeurs sur Jangalma Code. Je peux vous aider à :\n\n📚 **Créer et structurer des cours** efficaces\n👥 **Gérer vos étudiants** et suivre leur progression\n📊 **Analyser les performances** et améliorer votre contenu\n💡 **Optimiser vos cours** pour de meilleurs résultats\n🎯 **Stratégies pédagogiques** pour l'enseignement en ligne\n\nComment puis-je vous assister aujourd'hui ?";
    }
    
    // Créer un cours
    if ((lastMessage.includes("créer") || lastMessage.includes("nouveau") || lastMessage.includes("ajouter")) && 
        (lastMessage.includes("cours") || lastMessage.includes("formation"))) {
      return "Pour créer un cours efficace sur Jangalma Code :\n\n1️⃣ **Définir les objectifs** : Clarifiez ce que vos étudiants apprendront\n2️⃣ **Structurer en modules** : Organisez le contenu de manière progressive\n3️⃣ **Créer le contenu** : Vidéos, textes, exercices pratiques\n4️⃣ **Ajouter des évaluations** : Quiz, projets, examens\n5️⃣ **Définir le niveau** : Débutant, intermédiaire ou avancé\n6️⃣ **Choisir le domaine** : Web, Mobile, IA, Marketing, etc.\n7️⃣ **Publier** : Rendez votre cours disponible aux étudiants\n\n💡 Astuce : Commencez par un module d'introduction pour accueillir vos étudiants !\n\nSouhaitez-vous de l'aide pour structurer un cours spécifique ?";
    }
    
    // Gérer les étudiants (priorité haute - détection améliorée)
    // Détecte: "gérer mes étudiants", "gerer mes etudiant", "gestion étudiants", etc.
    const hasManageWord = lastMessage.includes("gérer") || lastMessage.includes("gerer") || lastMessage.includes("gestion");
    const hasStudentWord = lastMessage.includes("étudiants") || lastMessage.includes("étudiant") || 
                          lastMessage.includes("etudiants") || lastMessage.includes("etudiant") ||
                          lastMessage.includes("élèves") || lastMessage.includes("élève") || 
                          lastMessage.includes("eleves") || lastMessage.includes("eleve") ||
                          lastMessage.includes("apprenants") || lastMessage.includes("apprenant");
    const hasMyWord = lastMessage.includes("mes") || lastMessage.includes("mon") || lastMessage.includes("ma");
    
    if ((hasManageWord && hasStudentWord) || 
        (hasManageWord && hasMyWord) ||
        (hasStudentWord && hasMyWord && (hasManageWord || lastMessage.includes("veux") || lastMessage.includes("vouloir")))) {
      return "Pour gérer efficacement vos étudiants :\n\n📊 **Tableau de bord instructeur** :\n- Voir tous vos étudiants inscrits\n- Suivre leur progression dans vos cours\n- Consulter leurs statistiques d'apprentissage\n\n💬 **Communication** :\n- Utiliser le chat pour communiquer avec vos étudiants\n- Répondre à leurs questions\n- Donner des feedbacks personnalisés\n\n📈 **Analyse** :\n- Identifier les étudiants en difficulté\n- Adapter votre contenu selon les besoins\n- Améliorer vos cours basés sur les retours\n\n🎯 **Actions** :\n- Envoyer des notifications importantes\n- Créer des sessions live pour l'interaction\n- Certifier les étudiants qui complètent vos cours\n\nAvez-vous une question spécifique sur la gestion de vos étudiants ?";
    }
    
    // Étudiants en général (sans "gérer" explicite)
    if (hasStudentWord) {
      return "Pour mieux gérer vos étudiants, vous pouvez :\n\n📊 **Tableau de bord instructeur** :\n- Voir tous vos étudiants inscrits\n- Suivre leur progression dans vos cours\n- Consulter leurs statistiques d'apprentissage\n\n💬 **Communication** :\n- Utiliser le chat pour communiquer avec vos étudiants\n- Répondre à leurs questions\n- Donner des feedbacks personnalisés\n\n📈 **Analyse** :\n- Identifier les étudiants en difficulté\n- Adapter votre contenu selon les besoins\n- Améliorer vos cours basés sur les retours\n\n🎯 **Actions** :\n- Envoyer des notifications importantes\n- Créer des sessions live pour l'interaction\n- Certifier les étudiants qui complètent vos cours\n\nAvez-vous une question spécifique sur la gestion de vos étudiants ?";
    }
    
    // Progression des étudiants
    if (lastMessage.includes("progression") || lastMessage.includes("avancement") || lastMessage.includes("suivre") ||
        (lastMessage.includes("comment") && lastMessage.includes("voir") && lastMessage.includes("progression"))) {
      return "Pour suivre la progression de vos étudiants :\n\n1️⃣ **Tableau de bord** : Accédez à votre tableau de bord instructeur\n2️⃣ **Section Étudiants** : Consultez la liste de tous vos étudiants\n3️⃣ **Statistiques** : Voyez le pourcentage de complétion de chaque cours\n4️⃣ **Détails** : Cliquez sur un étudiant pour voir son détail de progression\n5️⃣ **Analyses** : Identifiez les modules où les étudiants ont des difficultés\n\n💡 Vous pouvez aussi voir :\n- Le temps passé sur chaque module\n- Les quiz complétés\n- Les projets soumis\n- Les certifications obtenues\n\nCela vous aide à adapter votre contenu et à mieux accompagner vos étudiants !";
    }
    
    // Tableau de bord
    if (lastMessage.includes("tableau de bord") || lastMessage.includes("dashboard") || 
        (lastMessage.includes("où") && lastMessage.includes("voir") && lastMessage.includes("statistiques"))) {
      return "Votre **Tableau de bord instructeur** est votre centre de contrôle ! 📊\n\nVous y trouverez :\n\n📚 **Vos cours** :\n- Liste de tous vos cours créés\n- Statistiques de chaque cours\n- Nombre d'étudiants inscrits\n- Revenus générés (si cours payant)\n\n👥 **Vos étudiants** :\n- Liste complète de vos étudiants\n- Progression de chacun\n- Temps passé sur vos cours\n- Certifications obtenues\n\n📈 **Statistiques** :\n- Taux de complétion global\n- Modules les plus/moins suivis\n- Retours et évaluations\n- Performance globale\n\n💬 **Communication** :\n- Messages des étudiants\n- Notifications importantes\n- Demandes d'aide\n\n🎯 **Actions rapides** :\n- Créer un nouveau cours\n- Organiser un cours live\n- Gérer votre profil\n\nAccédez-y depuis le menu 'Tableau de bord' !";
    }
    
    // Statistiques
    if (lastMessage.includes("statistiques") || lastMessage.includes("analyses") || lastMessage.includes("performance") ||
        lastMessage.includes("métriques")) {
      return "Les statistiques vous aident à améliorer vos cours ! 📊\n\n**Métriques importantes** :\n\n📈 **Engagement** :\n- Taux de complétion des cours\n- Temps moyen passé par module\n- Taux de participation aux quiz\n- Nombre de projets soumis\n\n👥 **Étudiants** :\n- Nombre total d'inscrits\n- Nouveaux étudiants par mois\n- Taux de rétention\n- Étudiants certifiés\n\n⭐ **Satisfaction** :\n- Notes et avis des étudiants\n- Commentaires et retours\n- Suggestions d'amélioration\n- Taux de recommandation\n\n💡 Utilisez ces données pour améliorer vos cours et mieux accompagner vos étudiants !";
    }
    
    // Aide générale
    if (lastMessage.includes("aide") || lastMessage.includes("help") || lastMessage.includes("que peux")) {
      return "Je peux vous aider avec tout ce qui concerne votre rôle d'instructeur sur Jangalma Code ! 👨‍🏫\n\n📚 **Création de cours** :\n- Structurer et organiser vos cours\n- Créer du contenu efficace\n- Ajouter des évaluations\n- Publier vos cours\n\n👥 **Gestion d'étudiants** :\n- Suivre la progression\n- Communiquer avec eux\n- Analyser les performances\n- Voir le nombre d'étudiants inscrits\n\n📊 **Statistiques et analyses** :\n- Comprendre les métriques\n- Identifier les points d'amélioration\n- Optimiser vos cours\n\n💬 **Communication** :\n- Cours live\n- Chat avec étudiants\n- Notifications\n\n💰 **Monétisation** :\n- Configurer les tarifs\n- Gérer les revenus\n\nQuel aspect souhaitez-vous explorer ?";
    }
    
    // Réponse par défaut améliorée
    const words = lastMessage.split(/\s+/);
    const hasQuestionWord = words.some(w => ["comment", "où", "quoi", "quand", "pourquoi", "qui", "combien"].includes(w));
    
    if (hasQuestionWord) {
      return "Je comprends votre question ! 💭\n\nPour mieux vous aider, pouvez-vous être plus spécifique ? Je peux répondre à des questions sur :\n\n📚 **Création** : 'Comment créer un cours efficace ?'\n👥 **Étudiants** : 'Combien d'étudiants sont inscrits ?'\n📊 **Statistiques** : 'Où voir mes statistiques ?'\n💬 **Communication** : 'Comment organiser un cours live ?'\n\nDis-moi ce dont vous avez besoin et je vous guiderai !";
    }
    
    return "Je comprends votre question. 💭\n\nJe peux vous aider avec tout ce qui concerne votre rôle d'instructeur sur Jangalma Code :\n\n📚 Créer et structurer des cours\n👥 Gérer vos étudiants et voir combien sont inscrits\n📊 Analyser les statistiques et performances\n💬 Communiquer via chat et cours live\n💰 Gérer la monétisation de vos cours\n\nPouvez-vous préciser votre besoin ? Je serai ravi de vous aider !";
  }
};

export const chatbotService = {
  // Envoyer un message au chatbot
  async sendMessage(
    message: string,
    conversationHistory: ChatMessage[],
    config: ChatbotConfig
  ): Promise<ChatMessage> {
    // Ajouter le message de l'utilisateur
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    // Construire l'historique avec le prompt système
    const messagesWithSystem: ChatMessage[] = [
      {
        id: "system",
        role: "assistant",
        content: getSystemPrompt(config.role),
        timestamp: new Date(),
      },
      ...conversationHistory,
      userMessage,
    ];

    // Obtenir la réponse du chatbot
    const responseContent = await simulateChatbotResponse(messagesWithSystem, config);

    // Créer le message de réponse
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseContent,
      timestamp: new Date(),
    };

    return assistantMessage;
  },
};

