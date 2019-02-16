import { myCustomSum } from '../../library/calculate';

describe("library/calculate", function() {

  it("basic", function() {
    expect(myCustomSum()).toBe(0);
  });

  it("basic again", function() {
    expect(myCustomSum(1, 2)).toBe(3);

  });

});
