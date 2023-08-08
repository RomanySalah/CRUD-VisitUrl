//-----------start global
let documentHTML = document;
let siteName = documentHTML.getElementById('siteName')
let siteUrl = documentHTML.getElementById('siteUrl')
let btnAdd = documentHTML.getElementById('btnAdd')
let btnUpdate = documentHTML.getElementById('btnUpdate')
let searchInput = documentHTML.getElementById('searchBook')
let alertName = documentHTML.getElementById("alertName")
let alertUrl = documentHTML.getElementById("alertUrl")
let alertExite = documentHTML.getElementById("alertExite")
let indexUpdate = 0
let booksContainer = [];
//------------when start

if (getLocal() !== null) {
   booksContainer = getLocal();
   displayData();
}

//-------------start event
btnAdd.addEventListener('click', function () {
   addBook()
})
btnUpdate.addEventListener('click', function () {
   updateData()
})

searchInput.oninput = function () {
   searchBook(this.value);
};

//----------start function


function addBook() {
   if (nameValidation() === true && urlValidation() === true) {
      let book = {
         name: siteName.value,
         url: siteUrl.value,
      }
      booksContainer.push(book)

      displayData();
      setLocal();
      resetForm();
   }
}



function searchBook() {
   displayData();
}

function displayData() {
   let tableData = '';
   let term = searchInput.value.toLowerCase();

   for (let i = 0; i < booksContainer.length; i++) {
      if (booksContainer[i].name.toLowerCase().includes(term)) {


         tableData += `
       <tr>
                     <td>${booksContainer[i].name.toLowerCase().replaceAll(term, `<span class='bg-info'>${term}</span>`)}</td>
                     <td>
                        <p class="small text-center " >${booksContainer[i].url}</p>
                     </td>
                     <td>
                        <div class="hstack gap-3 justify-content-center">
                           <a href=${booksContainer[i].url} target="_blank" class="btn btn-outline-dark"><i class="fas fa-regular fa-eye"></i></a>
                           <button class="btn btn-outline-warning" onclick='setUpdateInput(${i})'><i class="fa-solid fa-pen-square"></i></button>
                           <button class="btn btn-outline-danger" onclick='deleteRow(${i})'><i class="fa-solid fa-trash"></i></button>
                        </div>
                     </td>
                  </tr>`

      }
   }
   documentHTML.getElementById('tableBody').innerHTML = tableData
}

function setUpdateInput(index) {
   indexUpdate = index;
   siteName.value = booksContainer[index].name;
   siteUrl.value = booksContainer[index].url;

   btnAdd.classList.add('d-none')
   btnUpdate.classList.remove('d-none')
}

function updateData() {
   let book = {
      name: siteName.value,
      url: siteUrl.value,
   }
   booksContainer.splice(indexUpdate, 1, book)
   setLocal();
   displayData();
   resetForm();

   btnUpdate.classList.add('d-none')
   btnAdd.classList.remove('d-none')
}

function deleteRow(index) {
   booksContainer.splice(index, 1)
   setLocal();
   displayData();
}

function resetForm() {
   siteName.value = ''
   siteUrl.value = ''
}

function setLocal() {
   localStorage.setItem('booksContianer', JSON.stringify(booksContainer))
}

function getLocal() {
   return JSON.parse(localStorage.getItem('booksContianer'))
}
//------------start validation

function nameValidation() {
   if (siteName.value === '') {
      alertName.classList.remove('d-none')
      return false;
   } else {
      alertName.classList.add('d-none')
      return true;
   }
}

function urlValidation() {

   if (siteUrl.value === '') {
      alertUrl.classList.remove('d-none')
      return false;
   } else {
      let isExit = false;
      for (i = 0; i < booksContainer.length; i++) {
         if (booksContainer[i].url === siteUrl.value) {
            isExit = true;
            break;
         }
      }
      if(isExit==true){
         alertExite.classList.remove('d-none')
      }else{
         alertExite.classList.add('d-none')
         return true;
      }

      alertUrl.classList.add('d-none')
   }
}











