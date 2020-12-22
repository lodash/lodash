import assert from 'assert';
import sortedIndexByComparator from '../sortedIndexByComparator.js';

describe('sortedIndexByComparator', () => {
  it('Should return index of a range that includes givan value', () => {
    assert.strictEqual(sortedIndexByComparator([[0,10],[10,16],[16,20]], 15, (range,v)=>{
      if(v<range[0]){
        return -1;
      }
      if(v>range[1]){
       return 1;
     }
     return 0;
    } ), 1);
    assert.strictEqual(sortedIndexByComparator([[0,5],[5,7],[7,20],[20,100]], 10, (range,v)=>{
      if(v<range[0]){
        return -1;
      }
      if(v>range[1]){
       return 1;
     }
     return 0;
    } ), 2);
  });
});