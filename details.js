const idProd = new URLSearchParams(window.location.search).get("productId");
console.log("ID: ", idProd);
const URL = "https://striveschool-api.herokuapp.com/api/product/" + idProd;
const MY_KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTc1MTRjNTllYzAwMTk5MGQ2ZTUiLCJpYXQiOjE3MDkyODMxNTMsImV4cCI6MTcxMDQ5Mjc1M30.Ayse55yV_8pG9LTXjxoXC7o-zrrF63ac6KuLddTNDnU";

window.onload = () => {
  fetch(URL, {
    headers: {
      Authorization: MY_KEY,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella ricerca");
      }
    })
    .then((prod) => {
      const container = document.querySelector(".container");
      container.style = "background-color: papayawhip;";
      const row = document.getElementById("colDiv");

      row.innerHTML = `
                        <div class="col-8 px-0">
                        <img src="${prod.imageUrl}" alt="" style="width:100%"/>
                        </div>
                        <div class="col-4 my-auto">
                        <h2 style="font-size: 5rem; margin-bottom:3rem">${prod.brand}</h2>
                        <p style="font-size:1.5rem">${prod.name}</p>
                        <p style="font-size:1.5rem">${prod.description}</p>
                        <span>${prod.price} $</span>
                        </div>
                        `;
    })
    .catch((error) => console.log(error));
};
