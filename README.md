# Web Update Tracker

Ce projet est un outil de suivi des mises à jour d'un site web spécifique. Il utilise Puppeteer pour naviguer sur le site, diff pour détecter les changements, et Nodemailer pour envoyer des notifications par e-mail en cas de mise à jour significative.

## Fonctionnalités

- Navigue sur un site web spécifié et extrait son contenu.
- Enregistre le contenu précédent pour le comparer avec le contenu actuel.
- Détecte les mises à jour significatives en comparant le contenu actuel avec le contenu précédent.
- Envoie une notification par e-mail en cas de mise à jour significative.
- Gère les erreurs et envoie une notification par e-mail en cas d'erreur.
- Planifie les vérifications de mise à jour à l'aide de node-cron.

## Prérequis

- Node.js
- Un fichier `.env` avec les variables d'environnement nécessaires (voir ci-dessous).

## Installation

1. Clonez le dépôt:

```bash
git clone https://github.com/votre-nom/web-update-tracker.git
```

2. Installez les dépendances:

```bash
cd web-update-tracker
npm install
```

3. Créez un fichier `.env` à la racine du projet avec les variables d'environnement nécessaires:

```
WEBSITE_URL=https://votre-site-web.com
CRON_SCHEDULE=*/15 * * * *
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=votre-email@example.com
EMAIL_PASS=votre-mot-de-passe
EMAIL_TO=destinataire@example.com
```

## Utilisation

Exécutez le script:

```bash
npm start
```

Le script démarrera le suivi des mises à jour pour l'URL spécifiée dans le fichier `.env`. Les mises à jour seront vérifiées selon la planification spécifiée dans `CRON_SCHEDULE`. En cas de mise à jour significative, une notification par e-mail sera envoyée à l'adresse spécifiée dans `EMAIL_TO`.

## Contributions

Les contributions à ce projet sont les bienvenues! Si vous souhaitez contribuer, veuillez suivre les étapes ci-dessous:

1. Forker le dépôt sur GitHub.
2. Cloner le dépôt forké sur votre machine locale.
3. Créer une nouvelle branche pour votre fonctionnalité ou correction de bug.
4. Effectuer les modifications nécessaires et committez-les.
5. Pousser les modifications vers votre dépôt forké.
6. Ouvrir une pull request vers le dépôt original.

Les contributions peuvent inclure, mais ne sont pas limitées à:

- Corrections de bugs
- Améliorations de la documentation
- Ajout de fonctionnalités
- Améliorations de la gestion des erreurs
- Améliorations de la performance
- Améliorations de la sécurité

Veuillez vous assurer que votre code est bien documenté et que les tests sont passés avant de soumettre une pull request.
