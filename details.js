const idProd = new URLSearchParams(window.location.search).get("productId");
console.log("ID: ", idProd);
const URL = "https://striveschool-api.herokuapp.com/api/product/" + idProd;
const MY_KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTc1MTRjNTllYzAwMTk5MGQ2ZTUiLCJpYXQiOjE3MDkyODMxNTMsImV4cCI6MTcxMDQ5Mjc1M30.Ayse55yV_8pG9LTXjxoXC7o-zrrF63ac6KuLddTNDnU";

const imgCont = document.getElementById("img-cont");
const textCont = document.getElementById("text-cont");

window.onload = () => {
  fetch(URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella ricerca");
      }
    })
    .then((prod) => {
      const row = document.querySelector(".row");

      row.innerHTML = `
      <div id="img-cont" class="col">
      <h2>Brand</h2>
      <p>nome</p>
      <p>descrizione</p>
      <span>prezzo</span>
    </div>`;
    });
};
