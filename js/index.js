var proName = document.getElementById("productName");
var regexProName = /^[A-Z][a-z]{1,99}$/;

var proPrice = document.getElementById("productPrice");
var regexProPrice = /^[1-9][0-9]{0,4}$/;

var optionalDesc = document.getElementById("productDescription");
var alertName = document.getElementById("alertName");
var alertPrice = document.getElementById("alertPrice");
var alertPhoto = document.getElementById("alertPhoto");
/****       Section above has initialization of all inputs in the website belongs to add product     ****/


var arrOfSrcPhotos = ["images/portfolio-1.jpg", "images/portfolio-3.jpg",
    "images/portfolio-4.jpg", "images/img3.png", "images/img10.jpg",
    "images/bg2.jpg", "images/bg6.jpg", "images/test.jpg"];

//This array contain sources of all photos that user can choose one of them
var currentImageSrc = -1;           //The iterator in the previous array, start from -1 to check if user choosed a photo or not.
var choosedImageSrc = 0;

var addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addProduct);

var arrOfRetrievedData = [];        //This array to carry data came from localStorage

onload();
function onload() {
    if (localStorage.getItem("productsList") != null) {
        arrOfRetrievedData = JSON.parse(localStorage.getItem("productsList"));
        console.log("localStorage isn't empty");
        displayData();
    }
    else {
        console.log("localStorage is empty");
    }
}
/*****      OnLoad function take data from local storage to the page again in each refresh click      ****/


proName.addEventListener("keyup", function () {
    if (regexProName.test(proName.value)) {
        alertName.classList.add("d-none");
    }
    else {
        alertName.classList.remove("d-none");
    }
});
/*****      This function helps user to enter the data in right way in each button pressed      ****/

proPrice.addEventListener("keyup", function () {
    if (regexProPrice.test(proPrice.value)) {
        alertPrice.classList.add("d-none");
    }
    else {
        alertPrice.classList.remove("d-none");
    }
});
/*****      This function helps user to enter the data in right way in each button pressed      ****/

function addProduct() {

    if (regexProName.test(proName.value) == true && regexProPrice.test(proPrice.value) == true && currentImageSrc != -1) {
        alertName.classList.add("d-none");
        alertPrice.classList.add("d-none");
        alertPhoto.classList.add("d-none");
        saveData();
        displayData();
        resetData();
        displayMessage(proName.value + " added Successfully.");
        location.reload();
    }
    else {
        if (regexProName.test(proName.value) == false && regexProPrice.test(proPrice.value) == false && currentImageSrc == -1) {
            alertName.classList.remove("d-none");
            alertPrice.classList.remove("d-none");
            alertPhoto.classList.remove("d-none");
        }
        else if (regexProName.test(proName.value) == false) {
            alertName.classList.remove("d-none");
            alertPrice.classList.add("d-none");
            alertPhoto.classList.add("d-none");
        }
        else if (regexProPrice.test(proPrice.value) == false) {
            alertPrice.classList.remove("d-none");
            alertName.classList.add("d-none");
            alertPhoto.classList.add("d-none");
        }
        else if (currentImageSrc == -1) {
            alertPrice.classList.add("d-none");
            alertName.classList.add("d-none");
            alertPhoto.classList.remove("d-none");
        }
    }

}
/*****      This function invoked when user click on add product button      ****/

function saveData() {
    var temp = {
        name: proName.value,
        price: proPrice.value,
        description: optionalDesc.value,
        imageSrc: arrOfSrcPhotos[choosedImageSrc]
    };

    arrOfRetrievedData.push(temp);
    localStorage.setItem("productsList", JSON.stringify(arrOfRetrievedData));

}
/*****      This function pushes the data to the array and save data in the localStorage      ****/

function resetData() {
    proPrice.value = "";
    proName.value = "";
    optionalDesc.value = "";
    currentImageSrc = -1;
    choosedImageSrc = 0;
    // console.log("url('../" + arrOfSrcPhotos[0] + "')");
    // console.log(document.querySelector(".photo").style.backgroundImage);
    document.querySelector(".photo").style.backgroundImage = "url(" + arrOfSrcPhotos[0] + ")";
    // location.reload();
}
/*****    This function reset inputs to the first look even the iterator for choosing the arr it makes it -1    ****/
function displayData() {
    var html = "";

    for (let i = 0; i < arrOfRetrievedData.length; i++) {
        html += `<div class="col-md-4 p-3">
                    <div class="product">
                        <div class="productImage">
                            <img src=`+ arrOfRetrievedData[i].imageSrc + ` class="img-fluid eachPro" title=` + arrOfRetrievedData[i].description + ` />
                        </div>
                        <h3>Name: `+ arrOfRetrievedData[i].name + `</h3>
                        <h3>Price: `+ arrOfRetrievedData[i].price + ` LE.</h3>
                    </div>
                </div>`;
    }
    html = '<h3 class="note">To Update or Delete Data just double click on the item you want.</h3>' + html;
    document.getElementById("dataDisplayed").innerHTML = html;
}


var layerOfChooseButton = document.querySelector(".layerOfChooseButton");
var choosePhoto = document.getElementById("choosePhoto");
choosePhoto.addEventListener("click", function () {
    currentImageSrc = 0;
    layerOfChooseButton.classList.remove("d-none");
});
/***       This Section above opens the layer to choose the photo of the product       ***/


/* when i press esc close the layer */
document.addEventListener("keyup", function (e) {

    if (e.keyCode == 27) {
        layerOfChooseButton.classList.add("d-none");
        currentImageSrc = -1;

        /********************** Another Layer ***********************/
        // document.querySelector(".editLayer").classList.add("d-none")
        /************************************************************/
        resetData();
    }

});

/* when i click outside the photo or Confirm button close the layer */
layerOfChooseButton.addEventListener("click", function (e) {
    var closeIcon = document.querySelector(".fa-times-circle");
    if (e.target == layerOfChooseButton || e.target == closeIcon) {
        layerOfChooseButton.classList.add("d-none");
        currentImageSrc = -1;
    }
});


/*****       This function to change photo to the previous one       *****/
var leftArrow = document.getElementById("goLeft");
leftArrow.addEventListener("click", function () {
    if (currentImageSrc == 0) {
        currentImageSrc = arrOfSrcPhotos.length - 1;
    }
    else {
        currentImageSrc--;
    }

    var photo = document.querySelector(".photo");
    photo.style.backgroundImage = "url(" + arrOfSrcPhotos[currentImageSrc] + ")";

});


/*****       This function to change photo to the next one       *****/
var rightArrow = document.getElementById("goRight");
rightArrow.addEventListener("click", function () {
    if (currentImageSrc == (arrOfSrcPhotos.length - 1)) {
        currentImageSrc = 0;
    }
    else {
        currentImageSrc++;
    }

    var photo = document.querySelector(".photo");
    photo.style.backgroundImage = "url(" + arrOfSrcPhotos[currentImageSrc] + ")";

});

var confirmBtn = document.getElementById("confirmBtn");
confirmBtn.addEventListener("click", function () {

    choosedImageSrc = currentImageSrc;
    layerOfChooseButton.classList.add("d-none");
    // alert("The number of photo is "+choosedImageSrc);
    // console.log("The Url of the Photo is "+arrOfSrcPhotos[choosedImageSrc]);
    alertPhoto.classList.add("d-none");
    // currentImageSrc = -1;
    imagetoUpdate.src = arrOfSrcPhotos[choosedImageSrc];
    // console.log(imagetoUpdate.src);

});

function displayMessage(message) {
    var messageBox = document.querySelector(".messageBox");
    messageBox.innerHTML = message;
    messageBox.classList.remove("d-none");
    setTimeout(function () {
        messageBox.classList.add("d-none")
    }, 3500);
}

/* This loop for each double click event on the product */
var arrayToDetectIndexOfProduct = [];
var products = document.querySelectorAll(".product");
for (let i = 0; i < products.length; i++) {
    arrayToDetectIndexOfProduct.push(products[i]);
    products[i].addEventListener("dblclick", function () {
        editAndDelete(products[i]);
    });
}
/* This loop for each double click event on the product */


var imagetoUpdate = document.getElementById("imageToUpdate");
var nametoUpdate = document.getElementById("nameUpdated");
var pricetoUpdate = document.getElementById("priceUpdated");
function editAndDelete(element) {
    console.log(element);
    imagetoUpdate.src = element.querySelector("img").src;
    document.querySelector(".editLayer").classList.remove("d-none");
    var name = element.querySelectorAll("h3")[0];
    name = name.innerHTML;
    var indexOfName = name.indexOf(": ");
    name = name.slice(indexOfName+2);

    var price = element.querySelectorAll("h3")[1];
    price = price.innerHTML;
    indexOfName = price.indexOf(": ");
    var indexOfPrice = price.indexOf(" LE");
    price = price.slice(indexOfName+2,indexOfPrice);
    // console.log(price);
    nametoUpdate.value = name;
    pricetoUpdate.value = price;
    
    var updateBtn = document.getElementById("updateBtn");
    var deleteBtn = document.getElementById("deleteBtn");
    var changeBtn = document.getElementById("changePhotoToUpdate");

    updateBtn.addEventListener("click" , function(){
        updateFunc(element);
    });

    deleteBtn.addEventListener("click",function(){
        deleteFunc(element);
    });

    changeBtn.addEventListener("click",function(){
        changePhotoFunc(element);
    });
}



// var updateBtn = document.getElementById("updateBtn");
// var deleteBtn = document.getElementById("deleteBtn");
function updateFunc(element){
    resetData();
    if (regexProName.test(nametoUpdate.value) == true && regexProPrice.test(pricetoUpdate.value) == true ) {
        var index = -1;
        for(let i=0; i<arrayToDetectIndexOfProduct.length; i++){
            if(arrayToDetectIndexOfProduct[i] == element){
                index = i;
            }
        }

        arrOfRetrievedData[index].name = nametoUpdate.value;
        arrOfRetrievedData[index].price = pricetoUpdate.value;
        arrOfRetrievedData[index].imageSrc = imagetoUpdate.src;
        // arrOfRetrievedData[index].imageSrc = nametoUpdate.value;
        // arrOfRetrievedData.splice(index,1,)
        localStorage.setItem("productsList" , JSON.stringify(arrOfRetrievedData) );
        displayMessage("Successfully Updated");
        document.querySelector(".editLayer").classList.add("d-none");
        location.reload();
    }
    else {
        if (regexProName.test(nametoUpdate.value) == false && regexProPrice.test(pricetoUpdate.value) == false) {
           displayMessage("Please Check Name and Price Instructions");
        }
        else if (regexProName.test(nametoUpdate.value) == false) {
            displayMessage("Please Check the Name Instructions");
        }
        else if (regexProPrice.test(pricetoUpdate.value) == false) {
            displayMessage("Please Check the Price Instructions");   
        }
    }

}

function deleteFunc(element){
    resetData();
    var index = -1;
    for(let i=0; i<arrayToDetectIndexOfProduct.length; i++){
        if(arrayToDetectIndexOfProduct[i] == element){
            index = i;
        }
    }
    arrOfRetrievedData.splice(index,1);
    localStorage.setItem("productsList" , JSON.stringify(arrOfRetrievedData) );
    displayMessage("Successfully Deleted");
    document.querySelector(".editLayer").classList.add("d-none");
    location.reload();
}

function changePhotoFunc(element){
    resetData();
    currentImageSrc = 0;
    layerOfChooseButton.classList.remove("d-none");
    // element.querySelector("img").src  // in update button
    // imagetoUpdate.src = arrOfSrcPhotos[choosedImageSrc];
}