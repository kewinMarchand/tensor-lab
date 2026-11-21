# Face 3D Modeler - Version 2.0.0

Modélisation faciale en temps réel via navigateur, utilisant MediaPipe + Three.js.

## 📱 Description

Application web permettant de :
- Accéder à la webcam
- Détecter 468 points du visage MediaPipe en temps réel
- Visualiser un modèle 3D déformé selon les landmarks
- Exporter le modèle au format JSON pour animation
- Versionner les données faciales

Basé sur l'article TensorFlow Blog Mars 2020 : "Face and hand tracking in browser with mediapipe and tensorflowjs"

## 📁 Fichiers du dépôt

| Fichier | Description |
|---------|-------------|
| `index.html` | Application web principale (HTML + JS inline) |
| `styles.css` | Mise en page responsive |
| `README.md` | Documentation présente |

## 🔢 Versionnement

L'application suit le versionnement **Semantic Versioning 2.0.0** :

- **Major** (2.x) : Nouvelles fonctionnalités majeures (nouveaux points, nouveau moteur 3D)
- **Minor** (x.0) : Améliorations, nouvelle interface, export supplémentaire
- **Patch** (x.x.0) : Bugs corrections, optimisations

**Version actuelle : 2.0.0**
- Intégration MediaPipe (remplacement TensorFlow.js)
- Visualisation Three.js déformée
- Export JSON complet des 468 landmarks
- Interface utilisateur repensée

Pourtracker les modifications, utilisez Git :

```bash
cd K/_Kewin/GitHub/tensor-lab/apps/face-3d-tensor
git init
git add .
git commit -m "Face 3D Modeler v2.0.0 - MediaPipe + Three.js initial commit"
git tag v2.0.0
```

## 🚀 Utilisation sur Linux

### Prérequis
- Navigateur moderne : Chrome, Edge ou Firefox
- Webcam fonctionnelle
- Connexion internet (première fois uniquement pour les CDN)

### Lancement

```bash
# Dans le dossier de l'app
cd K/_Kewin/GitHub/tensor-lab/apps/face-3d-tensor

# Ouvrir dans le navigateur
google-chrome index.html
# ou
firefox index.html
# ou
msedge index.html
```

### Interface utilisateur

| Bouton | Action |
|--------|--------|
| **Activer la Webcam** | Demande la permission et lance la diffusion |
| **Désactiver** | Arrête la webcam |
| **Capturer le Visage** | Exporte le modèle JSON actuel |
| **Réinitialiser** | Remet tout à zéro, prépare une nouvelle capture |

### Export JSON

Cliquez sur "Capturer le Visage" pour générer un fichier JSON contenant :
- 468 points MediaPipe avec coordonnées x, y, z
- Métadonnées (version, date, app-name)
- Format prêt pour animation (Three.js, WebGL, chatbots)

Le fichier se nomme `face-model-{timestamp}.json` lors du téléchargement.

## 🛠 Technologies utilisées

- **MediaPipe** (`@mediapipe/holistic`) - Détection de repères faciaux
- **Three.js** (`three@0.158.0`) - Rendu 3D dans le navigateur
- **TensorFlow.js** (`@tensorflow/tfjs`) - (optionnel, inclus mais non utilisé activement)
- **CDN UMD** - Pas de build requis, les scripts deviennent des globals automatiquement

## 📦 Déploiement

L'application est autonome - aucun serveur backend n'est requis. Elle peut être :
- Hébergée sur GitHub Pages
- Distribuée via zip/tar
- Utilisée en local (offline après premier chargement)
- Intégrée dans d'autres projets web

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 👥 Auteur

Développé dans le cadre du repository **tensor-lab** pour la modélisation faciale personnelle.

## 🔄 Mise à jour

Pour mettre à jour l'application :

```bash
cd K/_Kewin/GitHub/tensor-lab/apps/face-3d-tensor
git pull origin main
# ou remplacez les fichiers index.html et styles.css manuellement
```

## ❓ Dépannage

### La webcam ne fonctionne pas ?
- Vérifiez que votre navigateur a la permission d'accéder à la caméra
- Sur Linux, assurez-vous que `v4l2` est disponible
- Essayez un autre navigateur

### Les points ne s'affichent pas ?
- Actualisez la page (F5)
- Assurez-vous d'avoir cliqué sur "Activer la Webcam"
- La première fois, attendez 10-15 secondes le temps du chargement CDN

### Que faire des données JSON ?
- Importez dans Three.js : `new THREE.BufferGeometry().setFromPoints(points)`
- Utilisez avec des frameworks d'animation compatibles JSON
- Enregistrez pour une utilisation hors-ligne ultérieure

---
*Généré le {date} dans le cadre du repository tensor*