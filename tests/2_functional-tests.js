/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);
let id = "";

suite("Functional Tests", function () {
  /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!
   */
  // 1
  test("#example Test GET /api/books", function (done) {
    chai
      .request(server)
      .get("/api/books")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, "response should be an array");
        assert.property(
          res.body[0],
          "commentcount",
          "Books in array should contain commentcount"
        );
        assert.property(
          res.body[0],
          "title",
          "Books in array should contain title"
        );
        assert.property(
          res.body[0],
          "_id",
          "Books in array should contain _id"
        );
        done();
      });
  });
  /*
   * ----[END of EXAMPLE TEST]----
   */

  suite("Routing tests", function () {
    suite(
      "POST /api/books with title => create book object/expect book object",
      function () {
        // 2 Post /api/books with title
        test("Test POST /api/books with title", function (done) {
          chai
            .request(server)
            .post("/api/books")
            .send({
              title: "Pattern Design",
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.body.title, "Pattern Design");
              assert.isNotNull(res.body._id);
              id = res.body._id;
              console.log("id has been set as " + id);
              done();
            });
        });
        // 3 POST /api/books with no title given
        test("Test POST /api/books with no title given", function (done) {
          chai
            .request(server)
            .post("/api/books")
            .send({})
            .end(function (err, res) {
              assert.equal(res.body, "missing required field title");
              done();
            });
        });
      }
    );

    suite("GET /api/books => array of books", function () {
      // 4
      test("Test GET /api/books", function (done) {
        chai
          .request(server)
          .get("/api/books")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body, "response should be an array");
            assert.property(
              res.body[0],
              "commentcount",
              "Books in array should contain commentcount"
            );
            assert.property(
              res.body[0],
              "title",
              "Books in array should contain title"
            );
            assert.property(
              res.body[0],
              "_id",
              "Books in array should contain _id"
            );
            done();
          });
      });
    });

    suite("GET /api/books/[id] => book object with [id]", function () {
      // 5
      test("Test GET /api/books/[id] with id not in db", function (done) {
        chai
          .request(server)
          .get("/api/books/" + "idthatdoesntexist")
          .end(function (err, res) {
            assert.equal(res.body, "no book exists");
            done();
          });
      });
      // 6
      test("Test GET /api/books/[id] with valid id in db", function (done) {
        chai
          .request(server)
          .get("/api/books/" + id)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body._id, id);
            assert.equal(res.body.title, "Pattern Design");
            done();
          });
      });
    });

    suite(
      "POST /api/books/[id] => add comment/expect book object with id",
      function () {
        // 7
        test("Test POST /api/books/[id] with comment", function (done) {
          chai
            .request(server)
            .get("/api/books/" + id)
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.body._id, id);
              assert.equal(res.body.title, "Pattern Design");
              done();
            });
        });
        // 8
        test("Test POST /api/books/[id] without comment field", function (done) {
          chai
            .request(server)
            .get("/api/books/" + id)
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.body._id, id);
              assert.equal(res.body.title, "Pattern Design");
              done();
            });
        });
        // 9
        test("Test POST /api/books/[id] with comment, id not in db", function (done) {
          chai
            .request(server)
            .get("/api/books/" + id)
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.body._id, id);
              assert.equal(res.body.title, "Pattern Design");
              done();
            });
        });
      }
    );

    suite("DELETE /api/books/[id] => delete book object id", function () {
      // 10
      test("Test GET /api/books/[id] with valid id in db", function (done) {
        chai
          .request(server)
          .get("/api/books/" + id)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body._id, id);
            assert.equal(res.body.title, "Pattern Design");
            done();
          });
      });
      // 11
      test("Test DELETE /api/books/[id] with  id not in db", function (done) {
        chai
          .request(server)
          .get("/api/books/" + "doesntexist_id")
          .end(function (err, res) {
            assert.equal(res.body, "no book exists");
            done();
          });
      });
    });
  });
});
