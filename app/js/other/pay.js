var Pay = function (model, productsElement, userElement, currentUser) {

  model.addObserver(this);

  this.update = function () {

    //console.log(productsElement)


    // Clear divs
    while (productsElement.firstChild) {
      productsElement.removeChild(productsElement.firstChild);
    }

    while (userElement.firstChild) {
      userElement.removeChild(userElement.firstChild)
    }

    var shoppingCart = model.returnShoppingCart(currenUser);

    // Products in cart info
    var info = document.createElement("div")
    info.className = "col-12 mx-auto"
    var row = document.createElement("div")
    row.className = "row"

    for (var i = 0; i < shoppingCart.length; i++) {

      //  Title
      var titleDiv = document.createElement("div")
      titleDiv.className = "col-8"
      var p = document.createElement("p")
      var title = document.createTextNode(shoppingCart[i].title)
      p.append(title)
      titleDiv.appendChild(p)
      row.appendChild(titleDiv)


      // Price
      var priceDiv = document.createElement("div")
      priceDiv.className = "col-4"
      var p = document.createElement("p")
      var price = document.createTextNode(shoppingCart[i].price + " kr")
      p.appendChild(price)
      priceDiv.appendChild(p)
      row.appendChild(priceDiv)
    }

    //console.log(currentUser.email)

    // User info
    var userInfoDiv = document.createElement("ons-card")
    userInfoDiv.className = "col-12 text-center mx-auto"
    var p = document.createElement("p")
    p.className = "m-0"
    var userEmail = document.createTextNode("Email: " + currentUser.email)
    p.appendChild(userEmail)
    userInfoDiv.appendChild(p)
    userElement.appendChild(userInfoDiv)

    // Total price
    var totalPriceDiv = document.createElement("ons-card")
    totalPriceDiv.style.backgroundColor = "rgba(220,20,60,0.55)"
    totalPriceDiv.style.fontWeight = "lighter"
    totalPriceDiv.className = "col-12 text-center mx-auto"
   // var strong = document.createElement("STRONG")
    var p = document.createElement("p")
    p.className = "p-0 m-0 text-white"
    var totalPrice = document.createTextNode("To pay: " + model.getTotalPrice() + " kr")
    p.appendChild(totalPrice)
   // p.appendChild(strong)
    totalPriceDiv.appendChild(p)
    row.appendChild(totalPriceDiv)

    info.appendChild(row)
    productsElement.appendChild(info)

  }
  this.update();

}
