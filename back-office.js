const idProd = new URLSearchParams(window.location.search).get("productId");
const MY_KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTc1MTRjNTllYzAwMTk5MGQ2ZTUiLCJpYXQiOjE3MDkyODMxNTMsImV4cCI6MTcxMDQ5Mjc1M30.Ayse55yV_8pG9LTXjxoXC7o-zrrF63ac6KuLddTNDnU";

console.log("ID: ", idProd);

const URL = idProd
  ? "https://striveschool-api.herokuapp.com/api/product/" + idProd
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = idProd ? "PUT" : "POST";

console.log("Url", URL);

window.onload = () => {
  const subTitle = document.getElementById("sub-title");
  const btnSub = document.getElementById("btn-sub");
  const btnDel = document.getElementById("btn-del");
  const btnReset = document.getElementById("btn-reset");

  if (idProd) {
    console.log("MODIFICA");
    subTitle.innerText = "Modalità MODIFICA";

    btnSub.innerText = "Modifica Prodotto";
    btnSub.classList.add("btn-primary");

    btnDel.classList.remove("d-none");
    fetch(URL, {
      headers: {
        Authorization: MY_KEY,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella ricerca dei dati");
        }
      })
      .then((product) => {
        document.getElementById("product-name").value = product.name;
        document.getElementById("product-brand").value = product.brand;
        document.getElementById("product-descr").value = product.description;
        document.getElementById("product-image").value = product.imageUrl;
        document.getElementById("product-price").value = product.price;
      });
  } else {
    console.log("CREAZIONE");
    subTitle.innerText = "Modalità CREAZIONE";
    btnSub.innerText = "Crea Prodotto";
    btnSub.classList.add("btn-success");
    btnReset.classList.remove("d-none");
  }
};
const btnReset = document.getElementById("btn-reset");
btnReset.addEventListener("click", () => {
  const confirmReset = confirm("Sei sicuro di voler resettare i campi?");
  if (confirmReset) {
    document.getElementById("form").reset();
  }
});
const creation = (e) => {
  e.preventDefault();

  const newProduct = {
    name: document.getElementById("product-name").value,
    brand: document.getElementById("product-brand").value,
    description: document.getElementById("product-descr").value,
    imageUrl: document.getElementById("product-image").value,
    price: document.getElementById("product-price").value,
  };

  fetch(URL, {
    method: method,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization: MY_KEY,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("ERRORE");
      }
    })
    .then((prod) => {
      if (idProd) {
        alert("Prodotto:" + " " + prod.name + "è stato modificato");
        window.location.assign("./index.html");
      } else {
        alert("Prodotto:" + " " + prod.name + "è stato creato");
        document.getElementById("form").reset();
        window.location.assign("./index.html");
      }
      addCard(newProduct);
    })
    .catch((error) => console.log(error));
};

const btnSub = document.getElementById("btn-sub");
btnSub.addEventListener("click", creation);

const addCard = (pr) => {
  const row = document.querySelector("#container #row");

  console.log(row);
  const col = document.createElement("div");
  col.classList.add("col-4");

  const card = document.createElement("div");
  card.classList.add("card", "mb-4", "rounded-0", "rounded-bottom");
  card.style = "border: 1px solid #898989";

  const img = document.createElement("img");
  img.src = pr.imageUrl;
  img.style = "width: 100%";

  card.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.style = "border-top: 1px solid #a9a9a9";

  const h5 = document.createElement("h5");
  h5.classList.add("card-title");
  h5.innerText = pr.name;

  const hr = document.createElement("hr");

  const p = document.createElement("p");
  p.classList.add("card-text");
  p.innerText = pr.description;

  const btnDiv = document.createElement("div");
  btnDiv.classList.add("d-flex", "justify-content-between", "align-items-center");

  const btnGroup = document.createElement("div");
  btnGroup.classList.add("btn-group");

  const small = document.createElement("small");
  small.classList.add("text-muted");
  small.innerText = pr.price + " " + "$";

  const btnInfo = document.createElement("button");
  btnInfo.type = "button";
  btnInfo.classList.add("btn", "btn-sm", "btn-info");
  btnInfo.innerText = "More Info";
  btnInfo.style = "color: white";

  const btnMod = document.createElement("button");
  btnMod.type = "button";
  btnMod.classList.add("btn", "btn-sm", "btn-secondary");
  btnMod.innerHTML = `<a href="./back-office.html?productId=${pr._id}" style="text-decoration: none; color: white">Edit</a>`;

  btnGroup.appendChild(btnInfo);
  btnGroup.appendChild(btnMod);
  btnDiv.appendChild(small);
  btnDiv.appendChild(btnGroup);
  cardBody.appendChild(h5);
  cardBody.appendChild(hr);
  cardBody.appendChild(p);
  cardBody.appendChild(btnDiv);
  card.appendChild(cardBody);
  col.appendChild(card);
  row.appendChild(col);
};

const deleted = () => {
  const conf = confirm("Are you sure?");

  if (conf) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: MY_KEY,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json;
        } else {
          throw new Error("ERRORE con l'eliminazione");
        }
      })
      .then((delProd) => {
        alert(delProd.name + " " + "è stato eliminato");
        window.location.assign("./index.html");
      })
      .catch((error) => console.log(error));
  }
};
