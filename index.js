function customMain() {

  //Show button on input.
  // const inputBox=document.getElementById('inputName');
  //   const hiddenButtons=document.getElementsByClassName("hidden-button");

  // inputBox.addEventListener('input',function(){
  //   if(inputBox.value.trim()!==""){
  //     for (const button of hiddenButtons) {

  //       button.style.display = 'block';
  //       button.style.display='inline-block';
  //     }

  //   }
  //   else{
  //     for (const button of hiddenButtons) {
  //       button.style.display='inline-block';
  //       button.style.display = 'none';

  //     }
  //   }
  // });

  // Add event listener to a common ancestor for dynamic elements
  const elementsSet = new Set();
  document.addEventListener("click", function (event) {
    const clickedElement = event.target;

    // Check if the clicked element has the class '.file-button' (New File button)
    if (clickedElement.classList.contains("file-button")) {
      console.log("File BUTTON CLICKED");
      let inputName = document.querySelector("#inputName").value;
      const parentDiv = clickedElement.closest(".parentDiv");
      const parentId = parentDiv ? parentDiv.getAttribute("id") : null;
      if (isValidString(inputName) && !elementsSet.has(inputName)) {
        elementsSet.add(inputName);
        console.log("Parent Id is :", parentId);
        const idFil = createNode("File", inputName, parentId);
        printNode(folderStructure);
        addNodeToContainer("File", inputName, parentId, idFil);
        document.querySelector("#inputName").value = "";
      } else {
        console.error("Please enter a valid name.");
      }
    }

    if (clickedElement.classList.contains("delete-button")) {
      console.log("Delete Button Pressed");
      const ParentToDelete = event.target.closest(".parentDiv");
      if (ParentToDelete) {
        console.log("parent to be delete found");
        const idOfElementToDelete = ParentToDelete.getAttribute("id");
        console.log("Element Id is :", idOfElementToDelete);
        const parentOfElementTODelelte = ParentToDelete.closest(".rootDiv");
        if (parentOfElementTODelelte) {
          console.log("parent parent to be delete found");
          const idOfparentOfElementTODelelte =
            parentOfElementTODelelte.getAttribute("id");
          console.log(
            "Parent of Element Id is :",
            idOfparentOfElementTODelelte
          );
          deleteNode(idOfElementToDelete, idOfparentOfElementTODelelte);
          deleteNodeFromContainer(
            idOfElementToDelete,
            idOfparentOfElementTODelelte
          );
        } else {
          console.log("parent of parentOfElementTODelelte not found");
        }
      } else {
        console.log("parent to be delete found");
      }
    }

    // Check if the clicked element has the class '.folder-button' (New Folder button)
    if (clickedElement.classList.contains("folder-button")) {
      console.log("FOLDER BUTTON CLICKED");
      let inputName = document.querySelector("#inputName").value;
      const button = event.target;
      const parentDiv = button.closest(".parentDiv");
      const parentId = parentDiv ? parentDiv.getAttribute("id") : null;
      if (isValidString(inputName) && !elementsSet.has(inputName)) {
        elementsSet.add(inputName);
        console.log("Parent Id is :", parentId);
        const idFol = createNode("Folder", inputName, parentId);
        printNode(folderStructure);
        addNodeToContainer("Folder", inputName, parentId, idFol); // Add the new folder to the content container
        document.querySelector("#inputName").value = "";
      } else {
        console.error("Please enter a valid name.");
      }
    }

    if (clickedElement.classList.contains("toggle-button")) {
      console.log("Toggle BUTTON CLICKED");
      const button = event.target;
      const parentDiv = button.closest(".parentDiv");
      const childDivs = parentDiv.querySelectorAll(".parentDiv > div");
      if (clickedElement.classList.contains("fa-chevron-right")) {
        clickedElement.classList.replace("fa-chevron-right", "fa-chevron-down");
        childDivs.forEach((childDiv) => {
          childDiv.style.display = "block";
        });
      } else {
        clickedElement.classList.replace("fa-chevron-down", "fa-chevron-right");
        childDivs.forEach((childDiv) => {
          childDiv.style.display = "none";
        });
      }
    }
  });
}

// function onChangeItem(event){
//     const toggleButtons=document.getElementsByClassName("toggle-button");

//     for (const toggleButton of toggleButtons) {
//         if (toggleButton.classList.contains("fa-chevron-right")) {
//             const parentDiv = toggleButton.closest(".rootDiv");

//             if (parentDiv) {
//                 const childDivs = parentDiv.children; // Get immediate child elements

//                 for (const childDiv of childDivs) {
//                     if (childDiv.tagName.toLowerCase() === "div") {
//                         childDiv.style.display = "none";
//                     }
//                 }
//             }
//         }
//         else if(toggleButton.classList.contains("fa-chevron-down")){
//             const parentDiv = toggleButton.closest(".rootDiv");

//             if (parentDiv) {
//                 const childDivs = parentDiv.children; // Get immediate child elements

//                 for (const childDiv of childDivs) {
//                     if (childDiv.tagName.toLowerCase() === "div") {
//                         childDiv.style.display = "block";
//                     }
//                 }
//             }
//         }
//     }
// }
