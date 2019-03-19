var PressInfo = function (model, element){
    console.log("PressInfo skapad!")
    model.addObserver(this)

  //Info is displayed when you scan a item


    this.update = function() {
        //console.log("PressInfo update körs!")

        var g = model.getCurrentProductInfo();
        var b = model.getAllGroceries()
        //console.log(b.length)
        // console.log("här är b"+b)
        //console.log(g)
        if (g !== "") {
            console.log(g)
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            let groceryNode = document.createElement("ons-card");

            //var string = "productInfoPage("+g+")";
            //groceryNode.setAttribute("onclick","productInfoPage("+g.id+")");
            let groceriesTitle = document.createElement("h4");
            let groceriesSection = document.createElement("h6");
            groceriesSection.style.fontWeight = "bolder";

            let groceriesLocation = document.createElement("h6")
            groceriesLocation.style.fontWeight = "bolder";

            let groceriesDescription = document.createElement("p")
            let addButton = document.createElement("button");
            addButton.className = "btn btn-outline-success";
            addButton.setAttribute("onclick", "model.addToCart("+g.id+")");
            //addButton.setAttribute("onclick", "catchAddToCart("+g.id+")");
            let successMessage = document.createElement("p");
            successMessage.setAttribute("id", "success-message");
            successMessage.className = "alert alert-success";
            successMessage.style.display = "none";
            
            let textNodeTitle = document.createTextNode(g.title);
            let textNodeSection = document.createTextNode("Section: "+ g.section);
            let textNodeLocation = document.createTextNode("Location: Aisle " + g.aisle + ", Shelf " + g.shelf);
            let textNodeDescription = document.createTextNode(g.description);
            let textNodedeButton = document.createTextNode("Add to cart");


            groceriesDescription.appendChild(textNodeDescription);
            groceriesTitle.appendChild(textNodeTitle);
            groceriesSection.appendChild(textNodeSection);
            groceriesLocation.appendChild(textNodeLocation);
            groceriesTitle.setAttribute("title", g.title);
            addButton.appendChild(textNodedeButton);

            groceryNode.appendChild(groceriesTitle);
            groceryNode.appendChild(groceriesSection);
            groceryNode.appendChild(groceriesLocation);
            groceryNode.appendChild(groceriesDescription);
            groceryNode.appendChild(addButton)
            groceryNode.appendChild(successMessage)
            element.appendChild(groceryNode);
            //console.log(element)
        }
    }
this.update()

}
