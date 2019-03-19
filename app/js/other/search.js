var Search = function (model, element){
  //Takes in input from user and display groceries
  //var search = document.getElementById("search")
  //var element = inelement.find("search");
  // var input = inelement.content.getElementById("myInput")

  // var node = document.createElement("ons-search-input");
  // node.setAttribute("placeholder", "Search");
  // node.setAttribute("style", "width: 99%;   margin: auto; display: block;");
  // node.setAttribute("value", "");
  // node.setAttribute("onchange", "setSearchFilter(this.value)");
  // node.setAttribute("id", "myInput");
  // element.appendChild(node);


  //console.log(element)
  model.addObserver(this);

  this.update = function(){

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    //var groceriesArray = model.getAllGroceries()
    var filterGroceries = model.getFilteredGroceries();
    //console.log("efter filtering: " + filterGroceries)
    filterGroceries.forEach(function(g){

      var groceryNode = document.createElement("ons-card");
      groceryNode.setAttribute("id",g.id);
      groceryNode.setAttribute("class", "col-10 mx-auto")
      groceryNode.setAttribute("value",g);
      groceryNode.setAttribute("onclick","productInfoPage("+g.id+")");
      var groceriesTitle = document.createElement("h4");
      groceriesTitle.style.fontWeight = "100"
      var groceriesSection = document.createElement("h6");
      var textNodeTitle = document.createTextNode(g.title);
      //console.log("titlaaarna: "+g.title)
      var textNodeSection = document.createTextNode("Section: "+ g.section);

      groceriesTitle.appendChild(textNodeTitle);
      groceriesSection.appendChild(textNodeSection);
      groceriesTitle.setAttribute("title", g.title);
      groceryNode.appendChild(groceriesTitle);
      groceryNode.appendChild(groceriesSection);
      element.appendChild(groceryNode);

    })
  }
  this.update();
  //model.getFilteredGroceries("hello");
}
