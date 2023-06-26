let carrinho = [];
let modalQt = 1;
let modalKey = 0; // abrir o modal será atualizado

const qs = el => document.querySelector(el);
const qsall = el => document.querySelectorAll(el);

// listagem das pizzas
pizzaJson.map((item, index)=>{
    // console.log(item);
    // console.log(item.id);
    // console.log(item.name);

    let pizzaItem = qs('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;
        // console.log(`Pizza clicada ${key}`);
        // console.log(pizzaJson[key]);

        qs('.pizzaBig img').src = item.img;
        qs('.pizzaInfo h1').innerHTML = item.name;
        qs('.pizzaInfo .pizzaInfo--desc').innerHTML = item.description;
        qs('.pizzaInfo .pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`;

        qs('.pizzaInfo--size.selected').classList.remove('selected');

        qsall('.pizzaInfo--sizes .pizzaInfo--size').forEach((size,sizeIndex) => {

            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

        });

        qs('.pizzaInfo--qt').innerHTML = modalQt;

        qs('.pizzaWindowArea').style.opacity = 0;
        qs('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            qs('.pizzaWindowArea').style.opacity = 1;
        }, 200);
        
    });

    qs('.pizza-area').append(pizzaItem);

    // console.log(pizzaItem);
});

// EVENTOS DO MODAL
function closeModal(){
    // precisaria se fosse um botao clicando: bt.preventDefault();

    qs('.pizzaWindowArea').style.opacity = 0;    
    setTimeout(() => {
        qs('.pizzaWindowArea').style.display = 'none';
    }, 200);
}

qsall('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

qs('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        qs('.pizzaInfo--qt').innerHTML = modalQt;
    }
});

qs('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    qs('.pizzaInfo--qt').innerHTML = modalQt;
});


// tamanho
// sao 3 tamanhos
// sao 3 acoes de click
qsall('.pizzaInfo--sizes .pizzaInfo--size').forEach((size,sizeIndex) => {
    size.addEventListener('click', (el)=>{
        qs('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');        
    })
});

// ACOES
// bt adicionar carrinho
qs('.pizzaInfo--addButton').addEventListener('click', ()=>{
    // reunir todas as informacoes para adicionar
    // - qual a pizza
    // console.log(`Pizza: ${modalKey}`); TENHO

    // - qual o tamanho selecionado
    let size = parseInt( qs('.pizzaInfo--size.selected').getAttribute('data-key') );
    // console.log(`Pizza size: ${size}`);

    // pizza do mesmo tamanho ficam juntas, 
    // criar um identificador
    let identificador = pizzaJson[modalKey].id+'@'+size;

    let key = carrinho.findIndex((item)=>{
        return item.identificador == identificador;
    });

    if(key > -1){
        carrinho[key].qt += modalQt;
    } else {
        carrinho.push({
            identificador,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt
        });
    }

    // - quantas pizzas
    // console.log(`Quantidade: ${modalQt}`); TENHO

    updateCarrinho();
    closeModal();
});

qs('.menu-openner').addEventListener('click',()=>{
    if(carrinho.length > 0){
        qs('aside').style.left = 0;
    }
});

qs('.menu-closer').addEventListener('click',()=>{
    qs('aside').style.left = '100vw';
    // qs('aside').classList.add('show');
});


// aula 11 / 12
function updateCarrinho() {

    qs('.menu-openner span').innerHTML = carrinho.length;

    // decidir se vai mostrar o carrinho
    if(carrinho.length > 0){
        // show
        qs('aside').classList.add('show');
        qs('.cart--area .cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in carrinho){
            let pizzaItem = pizzaJson.find((item)=>{
                return item.id == carrinho[i].id;
            });
            // console.log(pizzaItem);
            let carrinhoItem = qs('.models .cart--item').cloneNode(true);

            subtotal += pizzaItem.price * carrinho[i].qt;

            // let pizzaSizeName = carrinho[i].size;
            let pizzaSizeName;
            switch (carrinho[i].size) {
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

            carrinhoItem.querySelector('img').src = pizzaItem.img;
            carrinhoItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            carrinhoItem.querySelector('.cart--item--qt').innerHTML = carrinho[i].qt;

            carrinhoItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(carrinho[i].qt > 1){
                    carrinho[i].qt--;
                    console.log(carrinho[i]);

                } else {
                    carrinho.splice(i,1);
                }
                updateCarrinho();
            });

            carrinhoItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                carrinho[i].qt++;
                // console.log(`onde estou clicando ${carrinho[i].id}`);
                updateCarrinho();
            });

            qs('.cart--area .cart').append(carrinhoItem);
        }

        desconto = subtotal * .1;
        total = subtotal - desconto;

        qs('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        qs('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        qs('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        // hidden
        qs('aside').classList.remove('show');
        qs('aside').style.left = '100vw';
    }
    
}