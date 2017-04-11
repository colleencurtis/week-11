// master list array containing all our lists
const data = [
  { name: 'Books to Read',
    items: [
      "The Count of Monte Cristo",
      "The Princess Bride",
      "Fahrenheit 451"
    ]
  },
  { name: "Books Read",
    items: [
      "Harry Potter and the Goblet of Fire",
      "Harry Potter and the Prisoner of Azkaban",
      "Harry Potter and the Chamber of Secrets"
    ]
  },
  { name: "Favorite Books",
    items: [
      "Pride and Prejudice",
      "Harry Potter and the Philosopher's Stone",
      "A Game of Thrones"
    ]
  }
]

// create a state object
const state = { selectedList: 0 }

// save references to all of our ui components
const ui = {
  lists: document.querySelector('#lists'),
  items: document.querySelector('#list-items'),
  popups: document.querySelectorAll('.popup'),
  btn: {
    addList: document.querySelector('#add-list-button'),
    addItem: document.querySelector('#add-item-button'),
    popup: document.querySelectorAll('.popup-button'),
    close: document.querySelectorAll('.close')
  }
}

// initialize the app with these functions
updateLists()
updateUI()
updateItems()

// add events
ui.btn.addList.addEventListener('click', addList)
ui.btn.addItem.addEventListener('click', addItem)
ui.lists.addEventListener('click', selectList)
ui.btn.popup.forEach(btn => btn.addEventListener('click', openPopups))
ui.btn.close.forEach(btn => btn.addEventListener('click', closePopups))

// event handlers
function openPopups () {
  const popup = document.getElementById(this.dataset.popupid)
  popup.style.display = 'flex'
  popup.querySelector('input[type="text"]').focus()
}

function closePopups () {
  ui.popups.forEach(popup => {
    popup.style.display = 'none'
  })
}

function addList (e) {
  e.preventDefault()
  const form = document['add-list-form']
  const val = form['list-name-input'].value
  if ( val.trim().length === 0 || val.length < 2 ) {
    alert('Make sure the name of the list is greater than 2 characters!')
    form.reset()
    return
  } else {
    data.push({ name: val, items: [] })
    form.reset()
    closePopups()
    updateLists()
  }
}

function addItem (e) {
  e.preventDefault()
  const form = document['add-item-form']
  const val = form['item-name-input'].value
  if ( val.trim().length === 0 || val.length < 2 ) {
    alert('Make sure the name of the item is greater than 2 characters!')
    form.reset()
    return
  } else {
    data[state.selectedList].items.push(val)
    form.reset()
    closePopups()
    updateItems()
  }
}

function selectList (e) {
  const target = e.target
  state.selectedList = target.dataset.index

  updateUI()
  updateItems()
}

// methods
function updateUI() {
  Array.from(lists.children)
    .forEach(el => el.classList.remove('active'))

  lists.querySelector(`[data-index='${state.selectedList}']`)
    .classList.add('active')
}

function updateLists () {
  let i = 0;
  ui.lists.innerHTML = data.map(list => `
    <a class='list-group-item list-group-item-action' data-index='${i++}'>
      ${list.name}
    </a>`)
    .join('')

  updateUI()
}

function updateItems () {
  const selectedList = data[state.selectedList]

  if (selectedList.items.length === 0) {
    ui.items.innerHTML = `<p class="text-muted" style="padding-bottom: 10px;">There are 0 items in "${selectedList.name}"</p>`
    return
  }

  ui.items.innerHTML = selectedList.items.map(item => `
    <a class='list-group-item list-group-item-action'>
      ${item}
    </a>
  `)
  .join('')
}