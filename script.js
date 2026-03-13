// Firebase configuration (replace with your own config)
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Load data from Firestore
function loadData() {
    const tableBody = document.querySelector('#dataTableContent tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    db.collection('laundryData').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const item = doc.data();
            const newRow = tableBody.insertRow();
            newRow.insertCell(0).textContent = item.name;
            newRow.insertCell(1).textContent = item.alamat;
            newRow.insertCell(2).textContent = item.jumlahTabung;
            newRow.insertCell(3).textContent = item.request;

            const deleteCell = newRow.insertCell(4);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'tbl-biru';
            deleteButton.onclick = function() {
                deleteData(doc.id);
            };
            deleteCell.appendChild(deleteButton);
        });
    });
}

// Add new data to Firestore
function addData(name, alamat, jumlahTabung, request) {
    db.collection('laundryData').add({
        name: name,
        alamat: alamat,
        jumlahTabung: jumlahTabung,
        request: request
    }).then(() => {
        loadData();
    });
}

// Delete data from Firestore
function deleteData(id) {
    db.collection('laundryData').doc(id).delete().then(() => {
        loadData();
    });
}

// Form submit event
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const alamat = document.getElementById('alamat').value;
    const jumlahTabung = document.getElementById('jumlahTabung').value;
    const request = document.getElementById('request').value;

    if (name && alamat && jumlahTabung && request) {
        addData(name, alamat, jumlahTabung, request);
        // Do not reset form to keep data visible
    }
});

// Load data on page load
window.onload = loadData;