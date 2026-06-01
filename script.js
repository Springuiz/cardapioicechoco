const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

/* =========================
   VARIÁVEIS
========================= */

let cart = [];
let modalQtd = 1;
let modalKey = 0;

/* =========================
   ANIMAÇÃO HERO
========================= */

window.addEventListener('load', () => {

    document.body.classList.add('loaded');

});

/* =========================
   RENDER DOS PRODUTOS
========================= */

pizzaJson.map((pizza, index) => {

    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.pizza-item--img img').src = pizza.img;

    pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name;

    pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description;

    pizzaItem.querySelector('.pizza-item--price').innerHTML =
    pizza.price[1].toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    /* CLICK CARD */

    pizzaItem.querySelector('a').addEventListener('click', (e) => {

        e.preventDefault();

        let key = e.target.closest('.pizza-item')
        .getAttribute('data-key');

        modalQtd = 1;

        modalKey = key;

        /* MODAL */

        c('.pizzaBig img').src =
        pizzaJson[key].img;

        c('.pizzaInfo h1').innerHTML =
        pizzaJson[key].name;

        c('.pizzaInfo--desc').innerHTML =
        pizzaJson[key].description;

        c('.pizzaInfo--actualPrice').innerHTML =
            pizzaJson[key].price[2].toLocaleString(
                'pt-BR',
                {
                    style: 'currency',
                    currency: 'BRL'
                }
            );
        /* RESET SIZE */

        c('.pizzaInfo--size.selected')
        .classList.remove('selected');

        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {

            if(sizeIndex == 2){

                size.classList.add('selected');

            }

            size.querySelector('span').innerHTML =
            pizzaJson[key].sizes[sizeIndex];

        });

        c('.pizzaInfo--qt').innerHTML = modalQtd;

        /* ABRIR MODAL */

        c('.pizzaWindowArea').style.opacity = 0;

        c('.pizzaWindowArea').style.display = 'flex';

        setTimeout(() => {

            c('.pizzaWindowArea').style.opacity = 1;

        }, 150);

    });

    c('.pizza-area').append(pizzaItem);

});

/* =========================
   FECHAR MODAL
========================= */

function closeModal(){

    c('.pizzaWindowArea').style.opacity = 0;

    setTimeout(() => {

        c('.pizzaWindowArea').style.display = 'none';

    }, 500);

}

cs(`
.pizzaInfo--cancelButton,
.pizzaInfo--cancelMobileButton
`).forEach((item) => {

    item.addEventListener('click', closeModal);

});

/* =========================
   QUANTIDADE MODAL
========================= */

c('.pizzaInfo--qtmenos').addEventListener('click', () => {

    if(modalQtd > 1){

        modalQtd--;

        c('.pizzaInfo--qt').innerHTML = modalQtd;

    }

});

c('.pizzaInfo--qtmais').addEventListener('click', () => {

    modalQtd++;

    c('.pizzaInfo--qt').innerHTML = modalQtd;

});

/* =========================
   TAMANHOS
========================= */

cs('.pizzaInfo--size').forEach((size) => {

    size.addEventListener('click', () => {

        c('.pizzaInfo--size.selected')
            .classList.remove('selected');

        size.classList.add('selected');

        let sizeIndex = parseInt(
            size.getAttribute('data-key')
        );

        c('.pizzaInfo--actualPrice').innerHTML =
            pizzaJson[modalKey].price[sizeIndex].toLocaleString(
                'pt-BR',
                {
                    style: 'currency',
                    currency: 'BRL'
                }
            );

    });

});
/* =========================
   ADD CARRINHO
========================= */

c('.pizzaInfo--addButton')
.addEventListener('click', () => {

    let size = parseInt(
        c('.pizzaInfo--size.selected')
        .getAttribute('data-key')
    );

    let identifier =
    pizzaJson[modalKey].id + '@' + size;

    let key = cart.findIndex(
        (item) => item.identifier == identifier
    );

    if(key > -1){

        cart[key].qtd += modalQtd;

    } else {

        cart.push({

            identifier,

            id: pizzaJson[modalKey].id,

            size,

            qtd: modalQtd

        });

    }

    updateCart();

    /* CONQUISTAS */

    if (cart.length === 1) {
        desbloquearConquista('Primeiro Sorvete! 🍦');
    }

    if (cart.length === 3) {
        desbloquearConquista('Explorador de Ooo 🗺️');
    }

    if (cart.length === 5) {
        desbloquearConquista('Mestre dos Sorvetes 👑');
    }

    if (cart.length === 8) {
        desbloquearConquista('Lenda do Reino de Ooo ⚔️');
    }

    closeModal();
});

/* =========================
   MOBILE CARRINHO
========================= */

/* ABRIR CARRINHO */

c('.menu-openner')
.addEventListener('click', () => {

    c('aside').classList.add('show');

});

/* FECHAR */

function closeCart(){

    c('aside').classList.remove('show');

}

c('.menu-closer')
.addEventListener('click', closeCart);

c('.cart-minimize')
.addEventListener('click', closeCart);

/* =========================
   UPDATE CART
========================= */

function updateCart(){

    c('.menu-openner span').innerHTML = cart.length;

    let cartBox = c('.menu-openner');

    /* EFEITO */

    cartBox.classList.add('flashCart');

    setTimeout(() => {

        cartBox.classList.remove('flashCart');

    }, 500);

    /* MOSTRAR */

    if(cart.length > 0){

        c('aside').classList.add('show');

        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){

            let pizzaItem = pizzaJson.find(
                (item) => item.id == cart[i].id
            );

            subtotal +=
            pizzaItem.price[cart[i].size] * cart[i].qtd;

            let cartItem =
            c('.models .cart--item')
            .cloneNode(true);

            let pizzaSizeName;

            switch(cart[i].size){

                case 0:
                    pizzaSizeName = 'Pequeno';
                break;

                case 1:
                    pizzaSizeName = 'Médio';
                break;

                case 2:
                    pizzaSizeName = 'Grande';
                break;

            }

            let pizzaName =
            `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src =
            pizzaItem.img;

            cartItem.querySelector(
                '.cart--item-nome'
            ).innerHTML = pizzaName;

            cartItem.querySelector(
                '.cart--item--qt'
            ).innerHTML = cart[i].qtd;

            /* MENOS */

            cartItem.querySelector(
                '.cart--item-qtmenos'
            ).addEventListener('click', () => {

                if(cart[i].qtd > 1){

                    cart[i].qtd--;

                } else {

                    cart.splice(i, 1);

                }

                updateCart();

            });

            /* MAIS */

            cartItem.querySelector(
                '.cart--item-qtmais'
            ).addEventListener('click', () => {

                cart[i].qtd++;

                updateCart();

            });

            c('.cart').append(cartItem);

        }

        desconto = subtotal * 0.1;

        total = subtotal - desconto;

        c('.subtotal span:last-child')
        .innerHTML =
        subtotal.toLocaleString('pt-BR', {
            style:'currency',
            currency:'BRL'
        });

        c('.desconto span:last-child')
        .innerHTML =
        desconto.toLocaleString('pt-BR', {
            style:'currency',
            currency:'BRL'
        });

        c('.total span:last-child')
        .innerHTML =
        total.toLocaleString('pt-BR', {
            style:'currency',
            currency:'BRL'
        });

    } else {

        c('aside').classList.remove('show');

    }

}

/* =========================
   SCROLL SUAVE
========================= */

cs('nav a').forEach((link) => {

    link.addEventListener('click', (e) => {

        e.preventDefault();

        let href = link.getAttribute('href');

        document.querySelector(href)
        .scrollIntoView({

            behavior:'smooth'

        });

    });

});

/* =========================
   EFEITO HEADER
========================= */

window.addEventListener('scroll', () => {

    if(window.scrollY > 100){

        c('header').classList.add('header-scroll');

    } else {

        c('header').classList.remove('header-scroll');

    }

});

document.querySelector('.cart--finalizar').addEventListener('click', () => {

    let mesa = prompt('Digite o número da sua mesa:');

    if (!mesa) return;

    let telefone = '5571986267114';

    let total =
        document.querySelector('.total span:last-child')
            .innerText;

    const agora = new Date();

    const horario =
        agora.getHours().toString().padStart(2, '0')
        + ':' +
        agora.getMinutes().toString().padStart(2, '0');

    let texto = `━━━━━━━━━━━━━━\n`;
    texto += ` ICECHOCO \n`;
    texto += `━━━━━━━━━━━━━━\n\n`;

    texto += ` Mesa: ${mesa}\n`;
    texto += ` Horário: ${horario}\n\n`;

    texto += ` PEDIDO:\n\n`;


    console.log(cart);
    
    cart.forEach(item => {

        let pizza = pizzaJson.find(
            p => p.id == item.id
        );

        let tamanho = '';

        switch (item.size) {
            case 0:
                tamanho = 'Pequeno';
                break;

            case 1:
                tamanho = 'Médio';
                break;

            case 2:
                tamanho = 'Grande';
                break;
        }

        console.log(item);

        texto += ` ${pizza.name}\n`;
        texto += ` ${tamanho}\n`;
        texto += ` Quantidade: ${item.qtd}\n\n`;

    });

    texto += `━━━━━━━━━━━━━━\n`;
    texto += ` Total: ${total}\n`;
    texto += `━━━━━━━━━━━━━━\n\n`;

    texto += ` Pedido realizado pelo sistema IceChoco\n`;
    texto += `Obrigado pela preferência! `;

    let mensagem = encodeURIComponent(texto);

    window.open(
        `https://wa.me/${telefone}?text=${mensagem}`,
        '_blank'
    );

});

const music = document.getElementById('bgMusic');

document.addEventListener('click', () => {
    music.play()
        .then(() => console.log('tocando'))
        .catch(err => console.log(err));
}, { once: true });

music.volume = 0.25;

console.log("JS carregado");

function desbloquearConquista(texto) {

    const conquista =
        document.getElementById('achievement');

    conquista.innerHTML =
        `🏆 ${texto}`;

    conquista.classList.add('show');

    setTimeout(() => {

        conquista.classList.remove('show');

    }, 3000);

}
