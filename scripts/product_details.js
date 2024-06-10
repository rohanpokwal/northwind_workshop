"use strict";

window.onload = () => {
  console.log(location.search);

  //this allows us to get the urlParams to get the variables in the url
  const urlParams = new URLSearchParams(location.search);
  console.log(urlParams.get("productid"));
  if (urlParams.has("productid")) {
    displayProductDetails(urlParams.get("productid"));
  } else {
    alert("no valid course id");
    window.location.href = "./product_search.html";
  }
};

async function displayProductDetails(productId) {
  /* let productDetailsResult = document.querySelector("#productDetailsResult"); */
  let productHeader = document.querySelector("#productName");
  let otherInfo = document.querySelector("#otherInfo");
  let productDetails = await getProductDetails(productId);

  productHeader.innerHTML = `ID ${productDetails.productId}. ${productDetails.productName}`;

  //Product Price
  let priceItem = document.createElement("li");
  priceItem.className = "list-group-item";
  priceItem.textContent = `Product Price: $ ${Number(
    productDetails.unitPrice
  ).toFixed(2)}`;

  //Supplier Name
  let supplierName = document.createElement("li");
  supplierName.className = "list-group-item";
  supplierName.textContent = `Supplier: ${productDetails.supplier}`;

  //Availability
  let availableQty = document.createElement("li");
  availableQty.className = "list-group-item";
  availableQty.textContent = `Availability: ${productDetails.unitsInStock} units in stocks`;

  otherInfo.appendChild(priceItem);
  otherInfo.appendChild(supplierName);
  otherInfo.appendChild(availableQty);

  /*  otherInfo.innerHTML = `<li class= "list-group-item">Product Price: ${productDetails.unitPrice}</li>`;

  otherInfo.innerHTML = `<li class= "list-group-item"> Supplier: ${productDetails.supplier}</li>`; */

  /*  productDetailsResult.innerHTML = `
 
  <p>Product ID: ${productDetails.productId}</p>
  <p>Product Name: ${productDetails.productName}</p>
  <p>Product Price: ${productDetails.unitPrice}</p>
  <p>Supplier: ${productDetails.supplier}</p>
  <p>Availability: ${productDetails.unitsInStock} units in stock</p>
  `; */
}

async function getProductDetails(productId) {
  let response = await fetch("http://localhost:8081/api/products/" + productId);

  let data = await response.json();

  return data;
}
