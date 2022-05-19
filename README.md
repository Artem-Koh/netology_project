# netology_project
## Домашнее задание к занятию «2.6 База данных и хранение данных»:
### Задание 2 -
### запрос(ы) для вставки данных минимум о двух книгах в коллекцию books
#### db.books.insertMany([
####    {title: "title1", description: "description1", authors: "authors1"},
####    {title: "title2", description: "description2", authors: "authors2"}
####  ])
### запрос для поиска полей документов коллекции books по полю title
#### db.books.find( { title: "title1" } )

### запрос для редактирования полей: description и authors коллекции books по _id записи
#### db.books.updateOne( { _id: ObjectId("6286a6a555b8dcb76518ce88") }, {$set: {description: "descriptionRandom", authors: "authorsRandom"}} )
