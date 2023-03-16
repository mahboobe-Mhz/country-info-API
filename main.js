import './index.css';
const body = document.querySelector('body');
const aside = document.querySelector('aside');
const section = document.querySelector('section');
const search = document.getElementById('Search');
let db;
const searchingBox = document.getElementById('searchingBox');
let id = '';
const filterSelect = document.getElementById('filter')
const comment = document.getElementById('commentSec')

async function countryName(filter = 'All') {
    let nameCountry
  try {
    if (filter == 'All') {
      nameCountry = await fetch(`https://restcountries.com/v3.1/all`)
    } else {
      nameCountry = await fetch(`http://localhost:3000/country?region=${filter}`);
    }

    const data = await nameCountry.json();
      db = data;
      console.log(data);
    renderCountry(data);
  } catch (err) {
    console.log('see your error :' + err);
  }
}

countryName();
function renderCountry(data) {
    aside.innerHTML = '';
  data.forEach((country, index) => {
    aside.innerHTML += ` <div  id=${
      index + 1
    } class="bg-white cursor-pointer flex justify-between px-6 py-2 items-center rounded-md">
     <p  class="text-primary text-lg">${country.name.common}</p>
     <img src="${country.flags.png}" hight="40" width="55" alt="">
   </div>`;
  });
}
aside.addEventListener('click', (e) => {
  if (!e.target.closest('div')) return;
  const clickCountry = e.target.closest('div').children[0].innerHTML;
  renderCountryInfo(clickCountry);
});
async function renderCountryInfo(name) {
  try {
    const countryNames = await fetch(
      `https://restcountries.com/v3.1/name/${name}`
    );
    const data = await countryNames.json();
    cardMaker(data[0]);
  } catch (err) {
    console.log('failed to get country information' + err);
  }
}
function cardMaker(data) {
  const { name, flags, population, region, capital, idd } = data;
  console.log(data);

  section.innerHTML = ` <div class="bg-gray-200 w-64 rounded-b-lg shadow-lg shadow-gray-700">
    <img class="rounded-b-lg" src=${flags.png} alt="">
    <div class="p-5 space-y-2">
      <p class="font-bold text-3xl mb-5">${name.common}</p>
      <p class="text-sm">population : <span id="population">${population}</span></p>
      <p class="text-sm">Region : <span id="regin">${region}</span></p>
      <p class="text-sm">Capital : <span id="capital">${capital[0]}</span></p>
      <p class="text-sm">Country code : <span id="code">${
        idd.root + idd.suffixes[0]
      }</span></p>
    </div>
  </div>`;
}

search.addEventListener('input', (e) => {
  searchingBox.innerHTML = '';
  if (e.target.value.length < 2) return;
  searchingBox.classList.remove('hidden');
  if (!e.target.value) {
    searchingBox.classList.add('hidden');
  }

  const filter = db.filter((element) => {
    let lowerCase = element.name.common.toLowerCase();
    return lowerCase.startsWith(e.target.value.toLowerCase());
  });
  filter.forEach((element, index) => {
    console.log(element);
    searchingBox.innerHTML += `<p class="cursor-pointer"> ${element.name.common}</p>`;
  });
});

searchingBox.addEventListener('click', (e) => {
  if (!e.target.closest('p')) return;
  const target = db.find(
    (element) => element.name.common == e.target.innerText
  );
  searchingBox.classList.add('hidden');
  cardMaker(target);
});
document.body.addEventListener('click', () => {
  searchingBox.classList.add('hidden');
});


filterSelect.addEventListener('change', (e) => {
    countryName(e.target.value);
})



comment.addEventListener('submit', async (e) => {
    e.preventDefault();
    const commentInfo = {
        name: e.target.elements[1].value,
        comment:e.target.elements[2].value
    }
    const request = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        body: JSON.stringify(commentInfo),
        headers: {
            "Content-Type": "application/json",
          }
    })
    console.log(await request.json());
    comment.reset()
})