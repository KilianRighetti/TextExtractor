const fileInput = document.getElementById("file-input");

const dropZone = document.getElementById("drop-zone");


const imagePreview = document.getElementById("image-preview");

const previewText = document.getElementById("preview-text");

const errorText = document.getElementById("error-text");


const extractButton = document.getElementById("extract-button");

const result = document.getElementById("result");


// Mostra un errore e rimuove l'eventuale immagine precedente
function showError() {

    imagePreview.src = "";

    imagePreview.style.display = "none";
    previewText.style.display = "none";
    errorText.style.display = "block";
    extractButton.disabled = true;
    result.style.display = "none";
}


// Mostra l'immagine selezionata
function showImage(file) {

    // Controlla il MIME del file
    if (!file || !file.type.startsWith("image/")) {
        showError();
        return;
    }

    const imageUrl = URL.createObjectURL(file);

    imagePreview.src = imageUrl;
    imagePreview.style.display = "block";
    previewText.style.display = "none";
    errorText.style.display = "none";
    extractButton.disabled = false;
}


// Selezione tramite "Sfoglia file"
fileInput.addEventListener("change", function () {

    const file = fileInput.files[0];
    showImage(file);
});


// Effetto quando il file viene trascinato sopra il riquadro
dropZone.addEventListener("dragover", function (event) {

    event.preventDefault();

    dropZone.classList.add("drag-over");

});


// Rimuove l'effetto quando il file esce dal riquadro
dropZone.addEventListener("dragleave", function () {

    dropZone.classList.remove("drag-over");

});


// Gestisce il rilascio del file
dropZone.addEventListener("drop", function (event) {

    event.preventDefault();

    dropZone.classList.remove("drag-over");

    const file = event.dataTransfer.files[0];


    if (file) {
        fileInput.files = event.dataTransfer.files;
        showImage(file);
    }

    else {
        showError();
    }

});


extractButton.addEventListener("click", async function () {

    if (!extractButton.disabled) {
        const file = fileInput.files[0];

        // L'oggetto "formData" contiene le informazioni leggibili dalle richieste HTTP ---> Contenitore
        const formData = new FormData();
        formData.append("file", file);

        // È una Promise --> operazione asincrona
        const response = await fetch("/extract", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        
        console.log(data);
        result.textContent = data.text;

        result.style.display = "block";
    }

});