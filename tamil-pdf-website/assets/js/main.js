// Google Sign-In
const auth = firebase.auth();
const loginBtn = document.getElementById('loginBtn');
const userName = document.getElementById('userName');

loginBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      userName.textContent = `Hello, ${user.displayName}`;
      loginBtn.style.display = 'none';
    })
    .catch(error => {
      alert("Login failed: " + error.message);
    });
});

// Sample PDF Data
const pdfData = {
  "Poems": [
    { title: "Kavithai 1", view: "#", download: "#" },
    { title: "Kavithai 2", view: "#", download: "#" }
  ],
  "Literature": [
    { title: "Silapathikaram", view: "#", download: "#" },
    { title: "Manimekalai", view: "#", download: "#" }
  ],
  "Thirukkural": [
    { title: "Kural Vol 1", view: "#", download: "#" }
  ]
};

// Category Click Logic
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => {
    const category = card.textContent.trim();
    const pdfListSection = document.getElementById('pdf-list');
    const pdfTitle = document.getElementById('pdf-title');
    const pdfGrid = document.getElementById('pdf-grid');

    pdfListSection.style.display = 'block';
    pdfTitle.textContent = `${category} PDFs`;
    pdfGrid.innerHTML = '';

    const pdfs = pdfData[category] || [];
    pdfs.forEach(pdf => {
      const div = document.createElement('div');
      div.className = 'pdf-card';
      div.innerHTML = `
        <h3>${pdf.title}</h3>
        <a href="${pdf.view}" target="_blank">View</a>
        <a href="${pdf.download}" target="_blank">Download</a>
      `;
      pdfGrid.appendChild(div);
    });

    pdfListSection.scrollIntoView({ behavior: 'smooth' });
  });
});
