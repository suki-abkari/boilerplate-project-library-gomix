# [Personal Library](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/personal-library)


## User stories

1. You can send a POST request to /api/books with title as part of the form data to add a book. The returned response will be an object with the title and a unique _id as keys. If title is not included in the request, the returned response should be the string missing required field title. <img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>

2. You can send a GET request to /api/books and receive a JSON response representing all the books. The JSON response will be an array of objects with each object (book) containing title, _id, and commentcount properties. 

3. You can send a GET request to /api/books/{_id} to retrieve a single object of a book containing the properties title, _id, and a comments array (empty array if no comments present). If no book is found, return the string no book exists. <img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>

4. You can send a POST request containing comment as the form body data to /api/books/{_id} to add a comment to a book. The returned 5, response will be the books object similar to GET /api/books/{_id} request in an earlier test. If comment is not included in the request, return the string missing required field comment. If no book is found, return the string no book exists.

6. You can send a DELETE request to /api/books/{_id} to delete a book from the collection. The returned response will be the string delete successful if successful. If no book is found, return the string no book exists. <img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>

7. You can send a DELETE request to /api/books to delete all books in the database. The returned response will be the string 'complete delete successful if successful. <img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>

8. All 10 functional tests required are complete and passing.

### Requirement
<code>npm install mongodb@latest</code> && <code>npm install mongoose@latest</code> <br><br>

- TODO
1. Add your MongoDB connection string to .env without quotes as DB Example: DB=mongodb://admin:pass@1234.mlab.com:1234/fccpersonallib <!-- <img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>-->
2. In your .env file set NODE_ENV to test, without quotes <!-- <img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>-->
3. You need to create all routes within routes/api.js <!-- <img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>-->
4. You will create all functional tests in tests/2_functional-tests.js
 <!-- <img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>-->

## Tests

- TODO
1. #example Test GET /api/books <img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>
2. Test POST /api/books with title => create book object/expect book object <img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>
3. Test POST /api/books with no title given <img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>
4. Test GET /api/books <img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>
5. Test GET /api/books/[id] with id not in db <img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>
6. Test GET /api/books/[id] with valid id in db <!--<img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>-->
7. Test POST /api/books/[id] with comment <!--<img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>-->
8. Test POST /api/books/[id] without comment field <!--<img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>-->
9. Test POST /api/books/[id] with comment, id not in db <!--<img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>-->
10. Test DELETE /api/books/[id] with valid id in db <img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>
11. Test DELETE /api/books/[id] with id not in db <img src="https://img.icons8.com/emoji/15/000000/check-mark-emoji.png"/>


### <a>[Demo](https://boilerplate-project-library.sukainaabkari.repl.co)</a>

## <a href="https://www.freecodecamp.org/suki-220" target="_blank"><img src="https://img.icons8.com/external-sbts2018-lineal-color-sbts2018/30/000000/external-developer-women-profession-sbts2018-lineal-color-sbts2018.png"/></a> Authors
<!-- https://img.icons8.com/external-sbts2018-lineal-color-sbts2018/150/000000/external-developer-women-profession-sbts2018-lineal-color-sbts2018.png -->
Sukaina Abkari & FCC
