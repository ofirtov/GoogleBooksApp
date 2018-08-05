import {Component, OnInit} from '@angular/core';
import {GbooksServiceService} from "../gbooks-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-show-books',
    templateUrl: './show-books.component.html',
    styleUrls: ['./show-books.component.css']
})
export class ShowBooksComponent implements OnInit {
    books: any;
    booksArr = [];
    display = 'none';
    addBookForm: FormGroup;
    editBookForm: FormGroup;
    newTitle = '';
    cleanTitle = '';
    image = '';
    newId = '';
    newAuthor = '';
    newPublish = '';
    currentTitle = '';
    currentId = '';
    currentAuthor = '';
    currentPublish = '';
    id = null;
    isEdit: boolean = false;

    constructor(private bookServ: GbooksServiceService, private fb: FormBuilder) {
        this.addBookForm = this.fb.group({
            'id': [null, Validators.required],
            'title': [null, Validators.required],
            'author': [null, Validators.required],
            'published': [null, Validators.required]
        });

        this.editBookForm = this.fb.group({
            'id': [null, Validators.required],
            'title': [null, Validators.required],
            'author': [null, Validators.required],
            'published': [null, Validators.required]
        });
    }

    ngOnInit() {
        this.bookServ.getGoogleBooks()
            .subscribe(
                data => {
                    this.books = data.items;
                    for (let i = 0; i < this.books.length; i++) {
                        this.newId = data.items[i].id;
                        this.newTitle = data.items[i].volumeInfo.title;
                        this.cleanTitle = this.newTitle.replace(/[^A-Za-z]/g, ' ');
                        this.cleanTitle = this.cleanTitle.charAt(0).toUpperCase() + this.cleanTitle.substr(1).toLowerCase();
                        this.newAuthor = data.items[i].volumeInfo.authors;
                        this.newPublish = data.items[i].volumeInfo.publishedDate;
                        this.image = data.items[i].volumeInfo.imageLinks.thumbnail;
                        this.booksArr.push({
                            id: this.newId,
                            title: this.cleanTitle,
                            authors: this.newAuthor[0],
                            published: this.newPublish,
                            image: this.image
                        });
                    }
                    console.log(this.booksArr);
                },
                error => console.log(error),
                () => console.log("Complete loading books")
            );
    }


    deleteBook(id) {
        if (confirm('Are you sure?')) {
            this.booksArr.splice(id, 1);
        }
    }

    openAddBookModal() {
        this.isEdit = false;
        this.display = 'block';
    }

    onCloseHandled() {
        this.currentId = '';
        this.currentTitle = '';
        this.currentAuthor = '';
        this.currentPublish = '';
        this.newId = '';
        this.newTitle = '';
        this.newAuthor = '';
        this.newPublish = '';
        this.display = 'none';
    }

    openEditBookModal(index) {
        this.isEdit = true;
        this.display = 'block';
        this.id = index;
        this.currentId = this.booksArr[index].id;
        this.currentTitle = this.booksArr[index].title;
        this.currentAuthor = this.booksArr[index].authors;
        this.currentPublish = this.booksArr[index].published;
    }

    addBook(data) {
        this.newId = data.id;
        this.newTitle = data.title;
        this.newAuthor = data.author;
        this.newPublish = data.published;
        this.booksArr.push({id: this.newId, title: this.newTitle, authors: this.newAuthor, published: this.newPublish});
        console.log(this.booksArr);
        this.onCloseHandled();
    }

    editBook(data) {
        this.currentId = data.id;
        this.currentTitle = data.title;
        this.currentAuthor = data.author;
        this.currentPublish = data.published;
        this.booksArr.splice(this.id, 1, {
            id: this.currentId,
            title: this.currentTitle,
            authors: this.currentAuthor,
            published: this.currentPublish
        });
        console.log(this.booksArr);
        this.onCloseHandled();
    }
}
