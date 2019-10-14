(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies'
  const IMAGE_URL = 'https://movie-list.alphacamp.io/posters/'
  const data = []
  const genre = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  const list_tab = document.querySelector('#list-tab')
  const nav_tabContent = document.querySelector('#nav-tabContent')
  const nameList = Object.values(genre).map(item => item)

  // using axios to get movie api
  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
  }).catch((err) => console.log(err))

  displayNameList(nameList)
  // display the group list 
  function displayNameList(nameList) {
    let htmlContent = ''

    nameList.forEach(function (item, index) {
      htmlContent += `
      <a class="list-group-item list-group-item-action " id="list-${item}-list" data-toggle="list" href="#list-${item}" role="tab" aria-controls="${item}" data-index ="${index + 1}">${item}</a>
      `
    })
    list_tab.innerHTML = htmlContent

  }


  // listen to click event 
  list_tab.addEventListener('click', (event) => {
    displayData(event.target.dataset.index)
  })

  //display the genre data
  function displayData(genreIndex) {
    let newData = data.filter(item => item.genres.find(item => item === Number(genreIndex)))
    let navContent = ''

    newData.forEach(function (item, index) {
      let length = item.genres.length
      let spanText = ''
      for (let i = 0; i < length; i++) {
        spanText += `
        <span class="badge badge-secondary">${genre[item.genres[i]]}</span >
        `
      }

      navContent += `
        <div class="col-sm-3">
         <div class="card mb-2">
          <img class="card-img-top " src="${IMAGE_URL + item.image}" alt="Card image cap">
          <div class="card-body ">
            <h5 class="card-title">${item.title}</h5>
            ${spanText}
          </div >
        </div >
      </div >
    `
    })
    nav_tabContent.innerHTML = navContent
  }

})()