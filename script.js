// LIST ARRAY IS WHERE OUR DATA FOR THIS APPLICATION LIVES
var listArray = [
  { name: "Books to Read",
    items: [
      "Hitchhiker's Guide to Galaxy",
      "Walden",
      "The Elephant, the Tiger, and the Cell Phone"
    ]
  }, 
  { name: "Books Already Read",
    items: [
      "Harry Potter and the Goblet of Fire",
      "Harry Potter and the Prisoner of Azkaban",
      "Harry Potter and the Chamber of Secrets"
    ]
  }
];

var itemArray = [
  { name: "Books to Read",
    items: [
      "Hitchhiker's Guide to Galaxy",
      "Walden",
      "The Elephant, the Tiger, and the Cell Phone"
    ]
  }, 
  { name: "Books Already Read",
    items: [
      "Harry Potter and the Goblet of Fire",
      "Harry Potter and the Prisoner of Azkaban",
      "Harry Potter and the Chamber of Secrets"
    ]
  }
  ];
var selectedList = 0;
var listDiv = document.getElementById("lists");
var itemDiv = document.getElementById("list-items");
var addListButton = document.getElementById("add-list-button");
var addItemButton = document.getElementById("add-item-button");

// FUNCTIONS TO UPDATE THE HTML PAGE WITH RESPECT TO DATA
function updateLists() {
  while (listDiv.hasChildNodes()) {
    listDiv.removeChild(listDiv.lastChild);
  }

 // var list = listArray[0]; 

  function addHTMLForList(list, i) {
  var aElement = document.createElement("a");
  aElement.classList.add("list-group-item");
  aElement.classList.add("list-group-item-action");

  aElement.setAttribute("data-index", i);

  var textNode = document.createTextNode(list.name);
  aElement.appendChild(textNode);

  console.log(aElement);

  listDiv.appendChild(aElement);
  }

  listArray.forEach(addHTMLForList);

}

function updateItems() {
  while (itemDiv.hasChildNodes()) {
    itemDiv.removeChild(itemDiv.lastChild);
  }

 // var list = listArray[0]; 

  function addHTMLForItem(list, i) {
  var aElement = document.createElement("a");
  aElement.classList.add("list-group-item");
  aElement.classList.add("list-group-item-action");

  aElement.setAttribute("data-index", i);

  var textNode = document.createTextNode(list.name);
  aElement.appendChild(textNode);

  console.log(aElement);

  itemDiv.appendChild(aElement);
  }

  itemArray.forEach(addHTMLForItem);

}

function updateItems() {
  while (itemDiv.hasChildNodes()) {
    itemDiv.removeChild(itemDiv.lastChild);
  }

  var listItemArray = listArray[selectedList].items;
  listItemArray.forEach(function(item, i) {
    // HOMEWORK
    // Populate the list-items div (the right div) wit respective list items
    // - make a new 'a' element
    // - add classes to its classList
    // - set value of 'data-index' attribute to i
    // - Create a textNode with item name
    // - append textNode to the 'a' element
    // - append 'a' element to the itemDiv
  });
}
updateLists();

// ADDING TO LIST
addListButton.addEventListener("click", function(e) {
  e.preventDefault();
  
  var input = document["add-list-form"]["list-name-input"];
  var newListName = input.value;

  if (newListName.length > 2) {
    //create list
    var list = { name: newListName, items: [] };
    //add list to array
    listArray.push(list);
    //update HTML
    updateLists();
    //clear input
    document["add-list-form"].reset();
    //close the popup
    closePopups();
  } else {
    alert("List name invalid")
  }
});

// ADDING TO LIST ITEMS

// POP-UP HANDLING CODE
var buttonsArray = document.querySelectorAll(".popup-button");
// querySelectorAll returns a DOMTokenList and not an Array (which includes methods like forEach)
buttonsArray = Array.from(buttonsArray); // Conevrting DOMTokenList to an Array

buttonsArray.forEach(function(button) {
  button.addEventListener("click", function() {
    var popup = document.getElementById(this.dataset.popupid);
    // The data attributes can be accessed by .dataset variable which is part of the DOMElement (check HTML for buttonsArray)
    popup.style.display = "flex";
  });
});

var closeButton = document.querySelectorAll(".close");
closeButton.forEach(function(button, i) {
  button.addEventListener("click", closePopups);
});

function closePopups() {
  var popupsArray = Array.from(document.querySelectorAll(".popup"));
  popupsArray.forEach(function(popup) {
    popup.style.display = "none";
  });
}
