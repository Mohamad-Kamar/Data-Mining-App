export class CandidateClass {
  constructor(cData, lData) {
    this.cData = cData;
    this.lData = lData;
  }
}

class LData {
  constructor(lDataArr = []) {
    this.data = lDataArr;
  }
}

export class CData {
  constructor() {
    this.data = [];
  }
  add(cDataInstance) {
    this.data.push(cDataInstance);
  }
  getLData(support, dataLength) {
    const threshold = dataLength * support;
    const lDataArr = this.data.filter((elem) => elem.count >= threshold);
    const lDataObj = new LData(lDataArr);
    return lDataObj;
  }
}

export class DataInstance {
  constructor(itemSet, count) {
    this.itemSet = itemSet;
    this.count = count;
  }
}
