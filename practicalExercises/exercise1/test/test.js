const remoteMathService = require("../remoteMathService");
var assert = require("assert");
describe("remoteMathService", function() {
  describe("remoteMathService()", function() {
    this.timeout(2600);
    it("should return correct when answer is 3", function(done) {
      remoteMathService.remoteMathService(function(err, answer) {
        if (err) done(err);
        else {
          assert.deepEqual(answer, 3);
          done();
        }
      });
    });
  });
});
