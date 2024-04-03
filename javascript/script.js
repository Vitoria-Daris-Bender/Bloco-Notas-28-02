/**
 * ===================== PRINCIPAIS OBJETOS  =================================
 */


let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let closeModal =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.
let btnEdit = document.querySelector("#btn-edit-note");
let btnExcluir = document.querySelector("#btn-delete-note");


addNote.addEventListener("click", (evt)=>{
    evt.preventDefault();
    notes.style.display = "none";
    modal.style.display = "block";
    addNote.style.display = "none";

});

btnCloseNote.addEventListener("click", (evt)=>{
    evt.preventDefault();
    notes.style.display = "flex";
    modal.style.display = "none";
    addNote.style.display = "block";
    document.querySelector('#input-id').value = "";
    document.querySelector('#input-title').value = "";
    document.querySelector('#input-content').value = "";
    listNotes();
})






btnSaveNote.addEventListener("click", (evt) =>{
  evt.preventDefault();
  let data = { 
      id: document.querySelector("#input-id").value,
      title:document.querySelector("#input-title"). value,
      content:document.querySelector("#input-content").value
  }
  notes.style.display = "flex";
  modal.style.display = "none";
  addNote.style.display = "block";
  saveNote (data);
  location.reload();
})




const saveNote = (note) => {

  let notes = loadNotes();

  note.lastTime = new Date().getTime();

  if (note.id.length > 0){
      note.id=parseInt(note.id)
      notes.forEach((item, i)=>{
          if(item.id===note.id){
              notes[i]=  note;
          }
      })
  }
  else{  
      note.id = new Date().getTime();
      document.querySelector('#input-id').value=note.id;
      notes.push(note);
  }

  notes = JSON.stringify(notes);
  localStorage.setItem('notes',notes);
  

};
const loadNotes = ( ) =>{
  let notes = localStorage.getItem('notes');
  if (!notes){
      notes = [];
  }
  else{
      notes = JSON.parse(notes);
  }

  return notes;
}
const listNotes = () => {
  let listNotes = loadNotes();
 
  notes.innerHTML = "";
  console.log(listNotes)
  listNotes.forEach((item) => {
    const divCard = document.createElement('div');
    divCard.className = 'card';
    divCard.style.width = '18rem';
    const divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';
    const h1 = document.createElement('h1');
    h1.innerText = item.title;
    const pContent = document.createElement('p');
    pContent.innerText = item.content;
    const pLastTime = document.createElement('p');
    let lastTime = new Date (item.lastTime).toLocaleDateString('pt-br');
    pLastTime.innerText = "Ultima alteração: "+lastTime;
    divCardBody.appendChild(h1);
    divCardBody.appendChild(pContent);
    divCardBody.appendChild(pLastTime);
    divCard.appendChild(divCardBody);
    notes.appendChild(divCard);
    divCard.addEventListener("click",(evt) => {
      evt.preventDefault();
      showNote(item);
  });
});
};


const showNote = (note) => {
  notes.style.display = 'none';
  addNote.style.display = 'none';
  modalView.style.display = 'block';
  document.querySelector('#title-note').innerHTML = "<h1>"+note.title+"</h1>";

  document.querySelector('#content-note')
  .appendChild(document.createElement('p')
  .appendChild(document.createTextNode(note.content)));

  document.querySelector('#content-note')
  .appendChild(document.createElement('p')
  .appendChild(document.createTextNode(
      new Date(note.lastTime).toLocaleDateString('pt-BR'))))

      btnEdit.addEventListener("click", (evt)=>{
      evt.preventDefault();
        console.log('teste');
       notes.style.display = 'none';
       modal.style.display = 'block';
       modalView.style.display = 'none';
        document.querySelector('#input-id').value = note.id;
        document.querySelector('#input-title').value = note.title;
        document.querySelector('#input-content').value = note.content;
    })
    
  btnExcluir.addEventListener("click", () => deleteNote(note.id));

}
const deleteNote = (noteId) => {
  let notesList = loadNotes();
  
  notesList = notesList.filter(note => note.id !== noteId);
  localStorage.setItem('notes', JSON.stringify(notesList));
  listNotes();
}
    

listNotes();