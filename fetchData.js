const url = 'https://fakestoreapi.com/products/1'
const children = document.getElementById('children')
const loadingElemet = document.querySelector('.loading')
const box_card = document.getElementById('box_card').content
const wrapper = document.getElementById('wrapper')
const fragment = document.createDocumentFragment()

let loading = true
let carritoArr = {}

document.addEventListener("click", e => {
    
    if(e.target.dataset.btn === "true") 
        dataCard(e)
    
    e.stopPropagation()
})

window.addEventListener("DOMContentLoaded", async () => {
    
    const data = await datasApis() || []
    console.log(data)
    loadingF()

    data.forEach(dato => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
            <img src='${dato.image_link}' class="card__img"/>
            
            <div class='card__content' data-id='${dato.id}'>
                <h3>${dato.product_type}</h3>
                <button
                    class="btn--car"
                    data-btn='true'
                >
                    add to car
                </button>
                <p>Description:<br/>
                    ${dato.name}
                </p>
                <p> visit: <a href='${dato.website_link}'> Well <a> </p>

                <span>${parseInt(dato.price)}</span>
            </div>
        `

        children.appendChild(div)
    })

})

async function datasApis () {
    const data = await fetch(url)
        .then(datas => datas.json())
        .then(datas => datas)
        .catch(err => {
            if(err.message){
                console.log('net::ERR_INTERNET_DISCONNECTED')
            }
        })
        .finally(() => {
            loading=false
        })
    return data
}

const dataCard = (e) => {
    const obj = {
        name:e.target.parentElement.children[0].textContent,
        price:e.target.parentElement.children[4].textContent,
        id:e.target.parentElement.dataset.id,
        img:e.target.parentElement.parentElement.children[0].src,
        count: 1
    }

    if(carritoArr.hasOwnProperty(obj.id)){
        obj.count = carritoArr[obj.id].count ++
    }else{
        carritoArr[obj.id]={...obj}
    }

    pintarCar(carritoArr)
}

const pintarCar = (arr) => {

    wrapper.innerHTML = ''

    Object.values(arr).forEach(item => {
        box_card.querySelector('ul li img').setAttribute('src', item.img)
        box_card.querySelector('.car__title').textContent = item.name
        box_card.querySelector('.car__value').textContent = item.count
        box_card.querySelector('.car__total').textContent = item.price * item.count
        box_card.querySelector('.car__price').textContent = item.price

        const clone = box_card.cloneNode(true)

        fragment.appendChild(clone)
    })

    wrapper.appendChild(fragment)
}

const loadingF = () => {
    if(loading){
        loadingElemet.style.display = 'block'
    }else{
        loadingElemet.style.display = 'none'
    }
}
