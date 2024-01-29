// Preload audio files
const successAudio = new Audio('success.mp3');
const wrongAudio = new Audio('wrong.mp3');

function playSuccessSound() {
    successAudio.play();
}

function playWrongSound() {
    wrongAudio.play();
}

// Define previousScans array
const previousScans = [];

function checkItem(barcode) {
    var foundItem = itemList.find(item => item.barcode === barcode);
    var resultElement = document.getElementById('result');

    const scanResult = {
        barcode: barcode,
        found: foundItem !== undefined
    };

    previousScans.unshift(scanResult);

    if (foundItem) {
        resultElement.innerText = 'Yes, the item is in the list.';
        resultElement.style.backgroundColor = '#8BC34A';
        playSuccessSound();
        flashBackground('#8BC34A'); // Flash green background
    } else {
        resultElement.innerText = 'No, the item is not in the list.';
        resultElement.style.backgroundColor = '#FF5733';
        playWrongSound();
        flashBackground('#FF5733'); // Flash red background
    }

    document.getElementById('barcode-input').value = '';
    updatePreviousScansList();
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const barcode = document.getElementById('barcode-input').value;
        checkItem(barcode);
    }
}

function updatePreviousScansList() {
    const previousScansList = document.getElementById('previous-scans');
    previousScansList.innerHTML = '';

    previousScans.forEach(scan => {
        const listItem = document.createElement('div');
        listItem.className = `scan-item ${scan.found ? 'scan-yes' : 'scan-no'}`;
        listItem.textContent = `${scan.barcode}`;
        previousScansList.appendChild(listItem);
    });
}

function flashBackground(color) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = color;
    overlay.style.opacity = '0';
    overlay.style.transition = 'background-color 0.3s ease, opacity 0.3s ease';

    document.body.appendChild(overlay);

    // Trigger reflow to apply styles
    overlay.offsetWidth;

    overlay.style.opacity = '0.7'; // Set opacity for the flash
    overlay.addEventListener('transitionend', function () {
        // Remove the overlay after the transition ends
        document.body.removeChild(overlay);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('barcode-input').focus();
});

document.addEventListener('keydown', handleKeyDown); // Listen for keydown on the entire document
