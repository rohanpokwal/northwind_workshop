"use strict";

window.onload = () => {
  populateCategoryDD();
  //getting hold of the elements
  let productSearchDDL = document.querySelector("#productSearchDDL");
  let viewAllTable = document.querySelector("#viewAllTable");
  let searchByCategoryDD = document.querySelector("#searchByCategoryDD");
  hideElement("#viewAllTable");
  hideElement("#searchByCategoryDD");

  productSearchDDL.addEventListener("change", hideAndShow);
  searchByCategoryDD.addEventListener("change", populateTableBasedOnCategory);
};

function hideAndShow(event) {
  if (event.target.value === "category") {
    showElement("#searchByCategoryDD");
    hideElement("#viewAllTable");
  } else if (event.target.value === "viewAll") {
    populateTable();
    showElement("#viewAllTable");
    hideElement("#searchByCategoryDD");
  } else {
    hideElement("#searchByCategoryDD");
    hideElement("#viewAllTable");
  }
}

async function populateTable() {
  //get hold of table body
  let tBody = document.querySelector("#tBody");
  //get the products from the api
  tBody.innerHTML = "";
  let products = await getProducts();

  //get a hold of the table body where the data is going to go
  //loop over all the courses and work with a single course
  products.forEach((product) => {
    //call a function to build the row
    //pass it where the row goes (tBody)
    //pass it what goes in the row (data/source)
    buildTableRow(tBody, product);
  });
}

async function getProducts() {
  let response = await fetch("http://localhost:8081/api/products");
  let products = await response.json();

  return products;
}

//the function that takes a table body and some data and puts the data in the table body
function buildTableRow(tBody, productData) {
  //create the row for the table
  let row = tBody.insertRow();

  //create the cell for the department
  let productIdCell = row.insertCell();
  //put the relevant course data in the
  productIdCell.innerHTML = productData.productId;

  //create the cell for the department
  let productNameCell = row.insertCell();
  //put the relevant course data in the
  productNameCell.innerHTML = productData.productName;

  //create the cell for the department
  let productPriceCell = row.insertCell();
  //put the relevant course data in the
  productPriceCell.innerHTML = productData.unitPrice;

  //create the cell for the department
  let productDetailsCell = row.insertCell();
  //put the relevant course data in the
  productDetailsCell.innerHTML = `<a href="./product_details.html?productid=${productData.productId}">show Details</a>`;
}

//This function will hide an HTML element on the page
//Just pass it the id of the element you want to hide
function hideElement(someSelector) {
  let el = document.querySelector(someSelector);
  el.style.display = "none";
}

//This function will show an HTML element on the page
//Just pass it the id of the element you want to show
function showElement(someSelector) {
  let el = document.querySelector(someSelector);
  el.style.display = "block";
}
/* ******************************************* */
/* This work is for populating CategoryDDL */
async function populateCategoryDD() {
  //get hold of element where you want to insert this options

  let searchByCategoryDD = document.querySelector("#searchByCategoryDD");

  //this will give us the array of categories
  let productsCategories = await getProductCategories();

  productsCategories.forEach((category) => {
    let newOption = document.createElement("option");
    newOption.value = category.categoryId;
    newOption.textContent = category.name;
    searchByCategoryDD.appendChild(newOption);
  });
}

//Populate table based on the category the user picks
async function populateTableBasedOnCategory() {
  showElement("#viewAllTable");
  let tBody = document.querySelector("#tBody");
  tBody.innerHTML = "";
  let productsByCategory = await getProductsByCategory();

  productsByCategory.forEach((product) => {
    buildTableRow(tBody, product);
  });
}

async function getProductCategories() {
  let response = await fetch("http://localhost:8081/api/categories/");

  let productCategories = await response.json();

  return productCategories;
}

async function getProductsByCategory() {
  let searchByCategoryDD = document.querySelector("#searchByCategoryDD");
  let response = await fetch(
    `http://localhost:8081/api/products/bycategory/${searchByCategoryDD.value}`
  );

  let productsByCategory = await response.json();

  return productsByCategory;
}

/* function buildTableRowBsdOnCategory(tBody, productData) {
  //create the row for the table
  let row = tBody.insertRow();

  //create the cell for the department
  let productIdCell = row.insertCell();
  //put the relevant course data in the
  productIdCell.innerHTML = productData.productId;

  //create the cell for the department
  let productNameCell = row.insertCell();
  //put the relevant course data in the
  productNameCell.innerHTML = productData.productName;

  //create the cell for the department
  let productPriceCell = row.insertCell();
  //put the relevant course data in the
  productPriceCell.innerHTML = productData.unitPrice;
} */
