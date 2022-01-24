export class Node {
  constructor(id, value, parent) {
    this.id = id;
    this.value = value;
    this.parent = parent;
    this.children = [];
  }

  insert(elementString) {
    const [IDsString, ...courseNameArray] = elementString.split(" ");
    const IDsArray = IDsString.split(".");
    const courseName = courseNameArray.join(" ");
    let currentLevel = this;
    for (let i = 0; i < IDsArray.length; i++) {
      const currentID = IDsArray[i];
      const found = currentLevel.children.find((elem) => elem.id === currentID);
      if (found) {
        currentLevel = found;
      } else {
        const currentNode = new Node(currentID, courseName, currentLevel);
        currentLevel.children.push(currentNode);
        return;
      }
    }
  }

  isParent() {
    return this.children.length > 0;
  }

  toString() {
    return `${this.value} has id of ${this.id} and parent ${
      this.parent.value
    } and ${
      this.children.length
        ? "children:\n" +
          this.children.map((elem) => elem.toString()).join("\n")
        : "no children\n"
    }`;
  }
}

export class Tree {
  constructor(root, taxString) {
    this.root = root;
    this.addChildren(taxString);
  }

  addChildren(taxString) {
    const elements = taxString.split("\n");
    for (let elem of elements) {
      elem && this.root.insert(elem);
    }
  }

  findChild(courseName, root = this.root) {
    if (root.value === courseName) return root;
    let first = [...root.children];
    let second = [];
    while (first.length > 0) {
      for (let child of first) {
        if (!child) continue;
        if (child.value === courseName) return child;
        second.push(child.children);
      }
      first = second.flat();
      second = [];
    }
  }

  getAncestoryChainArray(courseName) {
    console.log("GENERATING ANCESTORY CHAIN FOR COURSE: " + courseName);
    let child = this.findChild(courseName);
    const ancestoryChain = [];
    while (child.value) {
      ancestoryChain.push(child.value);
      child = child.parent;
    }
    console.log("ANCESTORY CHAIN: " + JSON.stringify(ancestoryChain));
    return ancestoryChain;
  }

  toString() {
    return this.root.children.map((elem) => elem.toString()).join("\n");
  }
}
