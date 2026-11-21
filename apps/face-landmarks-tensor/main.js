/**
 * @file main.js
 * @description Application de détection des repères faciaux using TensorFlow.js
 * 
 * NOTE: Cette application utilise des imports ESM. Assurez-vous que votre serveur
 *        sert les fichiers avec le bon type MIME pour les modules JavaScript.
 */

// Activer les logs TensorFlow.js pour le débogage
tf.setBackend('webgl').then(() => {
  console.log('Backend WebGL activé');
}).catch(err => {
  console.error('Erreur activation backend:', err);
});

// Importation du modèle de détection faciale
let model = null;

async function loadModel() {
  try {
    // Charger le modèle face-landmarks-detection
    const faceLandmarksDetection = await import('@tensorflow-models/face-landmarks-detection');
    model = await faceLandmarksDetection.load({
      runtime: 'tfjs',
      maxFaces: 1
    });
    console.log('Modèle de détection faciale chargé avec succès');
    
    // Afficher message de prêt
    const resultsSection = document.getElementById('resultsSection');
    const infoDiv = document.createElement('div');
    infoDiv.style.padding = '1rem';
    infoDiv.style.background = '#f0f0f0';
    infoDiv.style.borderRadius = '8px';
    infoDiv.innerHTML = '<p>Modèle prêt - chargez une image pour détecter les repères faciaux</p>';
    document.body.insertBefore(infoDiv, document.getElementById('dropZone'));
  } catch (error) {
    console.error('Erreur chargement modèle:', error);
    alert('Impossible de charger le modèle de détection faciale. Vérifiez la console pour plus de détails.');
  }
}

// Gestion du dépôt de fichier
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Veuillez sélectionner un fichier image.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      processImage(img);
    };
    img.onerror = (err) => {
      console.error('Erreur lecture image:', err);
      alert('Erreur lors de la lecture de l\'image.');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Traiter l'image et détecter les repères
async function processImage(img) {
  try {
    // Dimensions du canvas
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Impossible d\'obtenir le contexte 2D');

    // Dessiner l'image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // Détecter les repères faciaux
    if (!model) {
      alert('Le modèle n\'est pas encore chargé.');
      return;
    }

    const predictions = await model.detect(img);

    if (predictions.length === 0) {
      showNoFaceDetected();
      return;
    }

    // Afficher les repères
    drawLandmarks(predictions[0]);
    showResults(predictions[0]);
  } catch (error) {
    console.error('Erreur during processing:', error);
    alert('Erreur lors du traitement de l\'image: ' + error.message);
  }
}

// Dessiner les repères faciaux
function drawLandmarks(prediction) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    prediction.image,
    0, 0,
    prediction.image.width,
    prediction.image.height
  );

  if (prediction.keypoints) {
    prediction.keypoints.forEach(keypoint => {
      const [x, y] = keypoint.position;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();
    });
  }
}

// Afficher "aucun visage détecté"
function showNoFaceDetected() {
  const landmarksInfo = document.getElementById('landmarksInfo');
  landmarksInfo.innerHTML = '<p>Aucun visage détecté</p>';
  document.getElementById('resultsSection').style.display = 'block';
  canvas.style.display = 'none';
}

// Afficher les résultats
function showResults(prediction) {
  const labels = prediction.keypoints?.map(k => k.label) || [];
  const positions = prediction.keypoints?.map(k => k.position) || [];

  let infoHTML = '<p>Visage détecté avec ' + positions.length + ' repères faciaux</p>';

  if (positions.length > 0) {
    infoHTML += '<ul>';
    const keyPositions = ['nose', 'leftEye', 'rightEye', 'mouthLeft', 'mouthRight'];
    keyPositions.forEach(key => {
      const kp = prediction.keypoints?.find(k => k.label === key);
      if (kp) {
        const [x, y] = kp.position;
        infoHTML += `<li>${key}: (${x.toFixed(0)}, ${y.toFixed(0)})</li>`;
      }
    });
    infoHTML += '</ul>';
  }

  document.getElementById('landmarksInfo').innerHTML = infoHTML;
  document.getElementById('resultsSection').style.display = 'block';
  canvas.style.display = 'block';
}

// Réinitialiser l'interface
function resetApp() {
  document.getElementById('resultsSection').style.display = 'none';
  canvas.style.display = 'none';
  document.getElementById('landmarksInfo').innerHTML = '';
  event.target.value = '';
}

// Chargement au démarrage
document.addEventListener('DOMContentLoaded', () => {
  loadModel();
  
  // Événements
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const resetBtn = document.getElementById('resetBtn');

  dropZone.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    fileInput.files = e.dataTransfer.files;
    handleFileSelect(new Event('change'));
  });
  fileInput.addEventListener('change', handleFileSelect);
  resetBtn.addEventListener('click', resetApp);
});