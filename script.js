let modalQT = 1;
ModalKey = 0
let cart = [] // a variavel cart é um array, e tudo que a gente adicionar, vai ser o carrinho 
const c = (el) => document.querySelector(el)
const call = (el) => document.querySelectorAll(el)


pizzaJson.map((intem, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true) // para clonar; no arquivo html, o .models so existe 1 e está com  display none. e eu mapeei o pizzaJson que são 7 e clonei os 7 na tela 


    pizzaItem.setAttribute('data-key', index) //setou e criou uma class chamada data-key, e o data-key é igual ao index, e o index é os arrays de 0-6
    pizzaItem.querySelector('.pizza-item--img img').src = intem.img
    pizzaItem.querySelector('.pizza-item--name').innerHTML = intem.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = intem.description
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${intem.price.toFixed(2)}`
   
    pizzaItem.querySelector('a').addEventListener('click', (e) =>{
        e.preventDefault() // isso bloqueou a açãom natural do click da tag A
        modalQT = 1
        
        c('.pizzaInfo--qt').innerHTML = modalQT /// ISSO É PRAA SEMPRE QUE ABRIR O MODAL, FICAR A QUANTIDADE EM 1


        c('.pizzaWindowArea').style.opacity = 0 // coloquei em opacite 0
        c('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1
        }, 200) // e nassa função eu dei um tempo de ir de opacite 0 a 1, para fazer  um efeito bonito

       ModalKey = index // sempre que eu abri o modal, ele vai preencher a informação de qual pizza é no modalkey
        
        c('.pizzaBig img').src = pizzaJson[index].img //esse pizzaInfo é da janela flutuante
        c('.pizzaInfo h1').innerHTML = pizzaJson[index].name //esse pizzaInfo é da janela flutuante
        c('.pizzaInfo--desc').innerHTML = pizzaJson[index].description
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[index].price.toFixed(2)}`
        c('.pizzaInfo--size.selected').classList.remove('selected')// removi a class selected, que deixava marcado o tamanho grande
        call('.pizzaInfo--size').forEach((size, sizeIndex) =>{ // o forEach() é para rodar uma foção a todos os intem que tem a mesma classe
        
            if(sizeIndex == 2){
                size.classList.add('selected') // eu tirei o azul do 'grande' a cima, mas nesse toda vez que eu abri o modal, vai vim selecionado o graande. ex: eu selecionei o pequeno e fechei o modal, qaundo eu abri com  uma outra pizza, vai vim grande, se eu não tivesse ter feito isso, eu ia fechar o modal e abri novamente, quando ele abrisse iria está selecionado o que eu deixei
            }

            pizzaJson[index].sizes[sizeIndex]

            size.querySelector('span').innerHTML = pizzaJson[index].sizes[sizeIndex] // antes do sinal de igaul. eu selevionei o span que tava dentro (no html) que era no span que contia as gramas, apos o igual eu acessei a informação do pizzajson sizes
        })
    })




   
    c('.pizza-area').append(pizzaItem) 
    // nesses a cima eu mapeei todos os intem, clonei e amazenei na variavel pizzaItem,ai vai clonar ate mapear todos,
    // os 7 itens no caso  e com o append eu coloquei um atras do outro. apos isso eu peguei os item de cada um (nome, descrição, preço) comm o querySelector
    // vinculei ao intem. de seu respectivo

   
})
// tudo a cima é listagem das pizzas, tanto na tela e no modal⬆️

// agora a baixo vai ser os eventos do modal ⬇️

function closeMODAL(){
    c('.pizzaWindowArea').style.opacity = 0
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none'
    })
}
call('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeMODAL)
});

// agora vamos mexer nos butôes de quantidade que tem no modal.

c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if( modalQT > 1){
        modalQT--
    c('.pizzaInfo--qt').innerHTML = modalQT
    }
})

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQT++
    c('.pizzaInfo--qt').innerHTML = modalQT
    
})

call('.pizzaInfo--size').forEach((size, sizeIndex) =>{ // o forEach() é para rodar uma foção a todos os intem que tem a mesma classe
       size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected') // tira a class quem ta selecionado
        size.classList.add('selected') //adiciona a class a quem eu cliquei
       }) 

})


///// agora vamos exer no carrinho e fechar o modal 

c('.pizzaInfo--addButton').addEventListener('click', ()=>{ /// aula 9-10 (caso precise de revisão)

    let size = c('.pizzaInfo--size.selected').getAttribute('data-key') // a class data key, é um atributo que existe no html nos tamanhos, e ao clicar ele está me informando o tamanho 
   
    // agora vamos fazer verificações, quais ?? a mesma pizza do mesmo tamanho tem que ta junta, se for a mesma pizza com tamanhos diferentes, ai separamos
    let indentifier = pizzaJson[ModalKey].id + '@' + size

    let key = cart.findIndex((item) => item.indentifier == indentifier)

    if(key > -1){
        cart[key].qt += modalQT
    }else{
        cart.push({
            indentifier,
            id:pizzaJson[ModalKey].id, // o id da pizza
            size, // o tamanho 
            qt:modalQT // a quantidade 
        })
    }

    updatCArt()
    closeMODAL()
})


c('.menu-openner').addEventListener('click', () =>{
   if(cart.length > 0) {
    c('aside').style.left = '0'
   }
})

c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw'
})

function updatCArt(){ // funçao responsavel por atualizar o carrinho 

    c('.menu-openner span').innerHTML = cart.length



    if(cart.length > 0){ // caso eu tenha item no carrinho, vou mostrar o carrinho 
        c('aside').classList.add('show')
        c('.cart').innerHTML = '' // como eu sempre estou rodando o updattCart() ele sempre tem q lipar, ele sempre precisar zerar e mostrar


        let subtotal = 0
        let desconto = 0
        let total = 0




        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>{ // tem o id do cart, que ai é igual( ele vai buscar) a o id do item, e vai procurar no pizzaJson
                return item.id == cart[i].id
            })
            subtotal += pizzaItem.price * cart[i].qt;

            let cartItem = c('.models .cart--item').cloneNode(true)


            let pizzaSizeName;
            switch(cart[i].size){
                case '0':
                    pizzaSizeName = 'P'
                    break;
                    case '1':
                        pizzaSizeName = 'M'
                        break;
                        case '2':
                            pizzaSizeName = 'G'
                            break
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{

                if( cart[i].qt > 1){
                    cart[i].qt--
                    updatCArt()
                }else{
                    cart.splice(i, 1)
                }
                updatCArt()
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++
                updatCArt()
            })

            c('.cart').append(cartItem)
        }

        desconto = subtotal * 0.1
        total = subtotal - desconto

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`
        
    }else{
        c('aside').classList.remove('show')
        c('aside').style.left = '100vw'
    }
}
