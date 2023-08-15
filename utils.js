//reference of  pure functions
let lastId = 1;

function getUniqueId() {
  lastId += 1;
  return lastId.toString();
}

function isValidString(input) {
  const regex = /^[A-Za-z]{1,10}$/;
  return regex.test(input);
}

function createNode(type, name, parentId) {
  const id = getUniqueId();
  const newNode = {
    id: id,
    name: name,
    type: type,
    level: parentId ? getLevel(parentId) + 1 : 1,
    children: type === "Folder" ? [] : null,
  };

  if (parentId) {
    console.log("Trying to find parent with ID:", parentId);
    const parent = findNodeById(folderStructure, parentId); // Pass the correct folderStructure object
    console.log("Parent found:", parent);

    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(newNode);
    } else {
      console.error("Parent node not found.");
    }
  } else {
    folderStructure.children.push(newNode);
  }
  return id;
}

function deleteNode(id) {
  const parent = findParentNode(folderStructure, id);
  if (parent) {
    const indexToRemove = parent.children.findIndex((child) => child.id === id);
    if (indexToRemove !== -1) {
      parent.children.splice(indexToRemove, 1);
    }
  } else {
    console.error("Parent node not found.");
  }
}

function findParentNode(root, id) {
  if (root.children) {
    for (const child of root.children) {
      if (child.id === id) {
        return root;
      }
      const foundParent = findParentNode(child, id);
      if (foundParent) {
        return foundParent;
      }
    }
  }
}

//Another Logic for deletion
// function deleteNode(id, parentId) {
//     const parent = findNodeById(folderStructure, parentId);
//     if (parent) {
//       const indexToRemove = parent.children.findIndex(child => child.id === id);
//       if (indexToRemove !== -1) {
//         parent.children.splice(indexToRemove, 1);
//       } else {
//         console.error("Child node not found.");
//       }
//     } else {
//       console.error("Parent node not found.");
//     }
//   }

function getLevel(id) {
  const node = findNodeById(folderStructure, id); // Pass the correct folderStructure object
  return node ? node.level : 0;
}

function findNodeById(root, id) {
  if (root.id === id) {
    return root;
  }

  if (root.children) {
    for (const child of root.children) {
      const found = findNodeById(child, id);
      if (found) {
        return found;
      }
    }
  }
  console.log("parent not found");
  return null;
}

// const idToFind = 509;
// const foundObject = findNodeById(folderStructure, idToFind);

// if (foundObject) {
//     console.log('Object found:', foundObject);
// } else {
//     console.log('Object not found.');
// }

// function getLevel(id) {
//     const node = findNodeById(folderStructure, id);
//     return node ? node.level : 0;
// }

// createNode('File', 'NewFile.txt', 'root'); // Creates a new file under the folder with id 101
// createNode('Folder', 'NewFolder', 'root'); // Creates a new folder at the root level
// createNode('File', 'AnotherFile.txt', 'root'); // Creates a new file under the folder with id 201

function printNode(node, indent = 0) {
  const spaces = "  ".repeat(indent);
  console.log(
    `${spaces}ID: ${node.id}, Name: ${node.name}, Type: ${node.type}`
  );

  if (node.children) {
    for (const child of node.children) {
      printNode(child, indent + 1);
    }
  }
}

// Print the folder structure
printNode(folderStructure);
