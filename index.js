const MY_KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOTc1MTRjNTllYzAwMTk5MGQ2ZTUiLCJpYXQiOjE3MDkyODMxNTMsImV4cCI6MTcxMDQ5Mjc1M30.Ayse55yV_8pG9LTXjxoXC7o-zrrF63ac6KuLddTNDnU";

const parProd = new URLSearchParams(window.location.search);
const idProd = parProd.get("productId");
const URL = "https://striveschool-api.herokuapp.com/api/product/";

fetch(URL, {
  headers: {
    authorization: MY_KEY,
  },
})
  .then((response) => {
    console.log(response);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore durante il recupero");
    }
  })
  .then((prod) => {
    console.log(prod);

    const row = document.querySelector(".container .row");
    row.innerHTML = "";

    prod.forEach((product) => {
      const col = document.createElement("div");
      col.classList.add("col-4");

      const card = document.createElement("div");
      card.classList.add("card", "mb-4", "rounded-0", "rounded-bottom");
      card.style = "border: 1px solid #898989";

      const a = document.createElement("a");
      // --------------------------------------------------
      a.href = `./details.html?productId=${product._id}`;
      const img = document.createElement("img");
      img.src = product.imageUrl;
      img.style = "width: 100%";

      a.appendChild(img);
      card.appendChild(a);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      cardBody.style = "border-top: 1px solid #a9a9a9";

      const h5 = document.createElement("h5");
      h5.classList.add("card-title");
      h5.innerText = product.name;

      const hr = document.createElement("hr");

      const p = document.createElement("p");
      p.classList.add("card-text");
      p.innerText = product.description;

      const btnDiv = document.createElement("div");
      btnDiv.classList.add("d-flex", "justify-content-between", "align-items-center");

      const btnGroup = document.createElement("div");
      btnGroup.classList.add("btn-group");

      const small = document.createElement("small");
      small.classList.add("text-muted");
      small.innerText = product.price + " " + "$";

      const btnInfo = document.createElement("button");
      btnInfo.type = "button";
      btnInfo.classList.add("btn", "btn-sm", "btn-info");
      btnInfo.innerHTML = `<a href="./details.html?productId=${product._id}" style="text-decoration: none; color: white"> More Info</a>`;
      btnInfo.style = "color: white";

      const btnMod = document.createElement("button");
      btnMod.type = "button";
      btnMod.classList.add("btn", "btn-sm", "btn-secondary");
      btnMod.innerHTML = `<a href="./back-office.html?productId=${product._id}" style="text-decoration: none; color: white">Edit</a>`;

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
    });
  })
  .catch((error) => {
    console.log(error);
  });

const btnClick = () => {
  window.location.assign("./back-office.html?productId=" + idProd);
};
