const video = document.getElementById("camera");
const button = document.getElementById("capturar");
const buttonPb = document.getElementById("filtroPB");
const buttonAtivar = document.getElementById("Ativar");
const buttonDesativar = document.getElementById("Desativar");
const canvas = [
    document.getElementById("foto1"),
    document.getElementById("foto2"),
    document.getElementById("foto3"),
    document.getElementById("foto4"),
    document.getElementById("foto5"),
    document.getElementById("foto6"),
    document.getElementById("foto7"),
    document.getElementById("foto8")
];
let currentPhotoIndex = 0; // Definindo a variável

async function startCamera() {
    try {
        const dados = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = dados;
    } catch (erro) {
        alert('Erro ao abrir a camera');
    }
}

button.addEventListener('click', function() {
    if (currentPhotoIndex < canvas.length) { 
        const contexto = canvas[currentPhotoIndex].getContext('2d');
        canvas[currentPhotoIndex].width = video.videoWidth;
        canvas[currentPhotoIndex].height = video.videoHeight;
        contexto.drawImage(video, 0, 0, canvas[currentPhotoIndex].width, canvas[currentPhotoIndex].height);
        canvas[currentPhotoIndex].style.display = 'block';
        currentPhotoIndex++;
    } else {
        alert('Álbum cheio, Limite 8 fotos!!!');
    }
});

buttonPb.addEventListener('click', function() {
    if (currentPhotoIndex > 0) {
        const contexto = canvas[currentPhotoIndex - 1].getContext('2d');  
        const imageData = contexto.getImageData(0, 0, canvas[currentPhotoIndex - 1].width, canvas[currentPhotoIndex - 1].height);  
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;     // Red
            data[i + 1] = avg; // Green
            data[i + 2] = avg; // Blue
        }

        contexto.putImageData(imageData, 0, 0);
    } else {
        alert('Capture uma foto antes de aplicar o filtro em preto em branco.');
    }
});

buttonAtivar.addEventListener('click', startCamera);

buttonDesativar.addEventListener('click', function() {
    const stream = video.srcObject;
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
    }
});

startCamera();
