/* 
grab data from products.json, populate the products array, and trigger 
the populateProducts function
*/

var dataRequest = new XMLHttpRequest();
dataRequest.addEventListener("load", dataRequestComplete);
dataRequest.addEventListener("error", dataRequestFailed);


function dataRequestFailed() {
	console.log("Oops, an error occurred while transferring the file.")
}

dataRequest.open("GET", "products.json");

dataRequest.send();

var products = [];
function dataRequestComplete(event) {
	console.log("The data transfer is complete.");
	var objectOfProducts = JSON.parse(event.target.responseText);
	products = objectOfProducts.products;
}

/* 
grab data from categories.json, populate the categories array, and trigger
the populateCategories function
*/

var dataRequest2 = new XMLHttpRequest();
dataRequest2.addEventListener("load", dataRequest2Complete);
dataRequest2.addEventListener("error", dataRequest2Failed);


function dataRequest2Failed() {
	console.log("Oops, an error occurred while transferring the file.")
}

dataRequest2.open("GET", "categories.json");

dataRequest2.send();

var categories = [];
function dataRequest2Complete(event) {
	console.log("The data transfer is complete");
	objectOfCategories = JSON.parse(event.target.responseText);
	categories = objectOfCategories.categories;
	populateProducts();
}

var productPlacement = document.getElementById("productPlacement");
var productsList = document.getElementById("productsList");

function populateProducts() {
	productPlacement.innerHTML = "";
	for (var i = 0; i < products.length; i++){
		var price = products[i].price;
		for (var j = 0; j < categories.length; j++) {
			if (products[i].category_id === categories[j].id){
				products[i].departmentName = categories[j].name;
			}
		}
		if (seasonSelector.value === "winter" && products[i].category_id === 1) 
			{price = (products[i].price - (products[i].price * categories[0].discount)).toFixed(2);
		} else if
			(seasonSelector.value === "autumn" && products[i].category_id === 2) 
			{price = (products[i].price - (products[i].price * categories[1].discount)).toFixed(2);
		} else if
			(seasonSelector.value === "spring" && products[i].category_id === 3) 
			{price = (products[i].price - (products[i].price * categories[2].discount)).toFixed(2);
		} else if 
			(seasonSelector.value === "default")
			{price = products[i].price;
		}
		productPlacement.innerHTML +=
			`<ul>
				<li>${products[i].name}</li>
				<li>${products[i].departmentName}</li>
				<li>${price}</li>
			</ul>`;
	}
}

document.getElementById("seasonSelector").addEventListener("change", populateProducts);
