
document.addEventListener("DOMContentLoaded", () => {
  fetch("/component/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
    })
    .catch(error => {
      console.error("Error loading header:", error);
    });
});
