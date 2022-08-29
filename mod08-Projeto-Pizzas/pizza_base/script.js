let cart = []; // nosso carrinho: pizzas, quantidade, tamanho, todos os detalhes
let modalqt = 1;
let modalKey = 0;

const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

// listagem das pizzas
pizzaJson.map((item, index)=>{

    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalqt = 1;
        modalKey = key;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        c('.pizzaInfo--size.selected').classList.remove('selected');

        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        c('.pizzaInfo--qt').innerHTML = modalqt;
        

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        },200);
    });

    c('.pizza-area').append(pizzaItem);

});

// eventos do modal
function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    },500);
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

c('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modalqt>1){
        modalqt--;
        c('.pizzaInfo--qt').innerHTML = modalqt;
    }
});

c('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalqt++;
    c('.pizzaInfo--qt').innerHTML = modalqt;
});


cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click',(e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    // qdo clicar precisa reunir todas as informacoes 
    // qual pizza
    // console.log('pizza: ', modalKey);
    // qual o tamanho 
    let size = parseInt( c('.pizzaInfo--size.selected').getAttribute('data-key') );
    // console.log('tamanho: ', size);
    // quantas pizzas 
    // console.log('quantidade: ', modalqt);

    // criar um identificador: juntar o id + tamanho da pizza 
    let identifier = pizzaJson[modalKey].id+'@'+size;

    let key = cart.findIndex((item)=>{
        return item.identifier == identifier
    }); // poderia ser com a sintaxe return automatico

    if(key > -1){
        cart[key].qt += modalqt; 
    } else {
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt: modalqt
        });
    }

    console.log(cart);
    updateCart();
    closeModal();
});

function updateCart(){
    if(cart.length > 0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';


        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>{
                return item.id == cart[i].id;
            });

            let cartItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;

                case 1:
                    pizzaSizeName = 'M';
                    break;

                case 2:
                    pizzaSizeName = 'G';
                    break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            c('.cart').append(cartItem);
        }


    } else {
        c('aside').classList.remove('show');
    }
}