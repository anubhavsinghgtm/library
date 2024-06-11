
const addNewBtn = document.querySelector(".primary-btn");
const bookList = document.querySelector('.book-list tbody');
const addNewModal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");



function noBookMessage(){
    const noBookMessagesList = ["Sorry! nothing has been added", "My bad! I don't have anything to show", "Please add some books to show"];
    if(bookList.childElementCount < 2){
        const index = Math.floor(Math.random() * 3);
        bookList.innerHTML = noBookMessagesList[index];
    }
}



// to open modal
addNewBtn.addEventListener('click', () => {
    addNewModal.classList.add('show');
    setTimeout(() => {
        document.querySelector(".modal-content").classList.add("show");
    }, 1);
})


// for close button
closeBtn.addEventListener('click', () => {
    addNewModal.classList.remove('show');
})


function updateDelete(){
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((deleteBtn)=>{
        deleteBtn.addEventListener('click', ()=>{
            const deleteItem = deleteBtn.parentElement.parentElement;
            bookList.removeChild(deleteItem);
            noBookMessage();
        });
    })
}
// for delete buttons


function addReadBtn(tableRow, isRead){
    const rowValue = document.createElement('td');
    const label = document.createElement('label');
    label.classList.add('switch');

    const readInput = document.createElement('input');
    readInput.type = "checkbox";
    
    if(isRead)
        readInput.checked = true;

    const sliderSpan = document.createElement('span');
    sliderSpan.classList.add('slider');
    sliderSpan.classList.add('round')

    label.appendChild(readInput);
    label.appendChild(sliderSpan);
    
    rowValue.appendChild(label);

    tableRow.appendChild(rowValue);
}

// to create the book list
function createBookList(bookDetails){
    const tableRow = document.createElement('tr');

    for( var key in bookDetails){
        const rowValue = document.createElement('td');
        
        if(key == 'read'){
            addReadBtn(tableRow, bookDetails[key]);
        }
            
        else{
            rowValue.innerHTML = bookDetails[key];
            tableRow.appendChild(rowValue);
        }
        
    }


    // to add the delete button
    const rowValue = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.innerHTML = "Delete";
    delBtn.classList.add('delete-btn');
    rowValue.appendChild(delBtn);
    tableRow.appendChild(rowValue);




    if(bookList.childElementCount == 0){
        bookList.innerHTML = "<tr> <th>Title</th> <th>Author</th> <th>Pages</th> <th>Read</th> <th>Action</th> </tr>"
    }
    
    // to add the row
    bookList.appendChild(tableRow);

}

// form submission
const bookForm = document.querySelector(".book-form");
bookForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    let bookDetails = {}
    let flag = 1;

    if(document.querySelector("#book-title").value.trim() != "")
    bookDetails.bookTitle = document.querySelector("#book-title").value;
    else flag = 0;

    if(document.querySelector("#author").value.trim() != "")
    bookDetails.author = document.querySelector("#author").value;
    else flag = 0;

    if(document.querySelector("#pages").value.trim() != "")
    bookDetails.pages = document.querySelector("#pages").value;
    else flag = 0;


    bookDetails.read = document.querySelector("#read").checked;

    if(flag == 1){
        createBookList(bookDetails);
        addNewModal.classList.remove('show');
        updateDelete();
        msg = ''
    }
    else{
        msg = "Enter valid details";
    }

    document.querySelector('.message').innerHTML = msg; // to display the message
    bookForm.reset(); // to clear all the inputs 
});



noBookMessage();


// window.onclick = function(event) {
//     console.log("clicked outside");
//     if (event.target == addNewModal) {
//         console.log("clicked inside");
//         addNewModal.classList.remove("show");
//         document.querySelector(".modal-content").classList.remove("show");
//     }
// }


