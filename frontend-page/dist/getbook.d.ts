declare function fetchBooks(): Promise<void>;
interface Book {
    _id: string;
    title: string;
    author: string;
    publisher: string;
    quantity: number;
}
declare function populateBooksTable(books: Book[]): void;
