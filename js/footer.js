// js/footer.js
document.addEventListener("DOMContentLoaded", () => {
  fetch("/component/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch(error => {
      console.error("Error loading footer:", error);
    });
});
