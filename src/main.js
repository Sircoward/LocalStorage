function loadPosts() {

    let xhr = new XMLHttpRequest();
    let method = "GET";
    let url = `data.json`;
    xhr.open(method, url);
    xhr.onload = function (event) {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                const response = JSON.parse(this.responseText);
                let output = ``;
                response.forEach(function (post) {
                    output +=`
                    <div class="container">
                    <img src="${post.imageProduit}"/>
                    <div class="text-container" data-title="${post.titleProduit}" data-prix="${post.prixProduit}">                  
                    <h3>${post.titleProduit}</h3>
                    <p>Prix: ${post.prixProduit} €</p>
                    <button class="add-btn" type="button">Ajouter au panier</button>
                    </div>
                    </div>
                     `;
                });
                document.getElementById('result').innerHTML = output;
            } else {
                alert(Erreur)
            }
        }
    }
    xhr.send();
}

loadPosts()

//************************************************//
//************************************************//
//************************************************//
//************************************************//
//************************************************//
//************************************************//

window.onload = function() {

    function showCart(){ 
    var cart = document.createElement('div');
    var cartHeader = document.createElement('div');
    cartHeader.innerText = "Panier :"
    cart.append(cartHeader);
    var body = document.createElement('ul');
    cart.append(body);
    var count = document.createElement('li');
    count.setAttribute('id', 'total-cart');
    count.innerText = "total: ";
    body.append(count);
    var discount = document.createElement('li');
    discount.setAttribute('id', 'discount-cart');
    discount.innerText = "remise: " +shoppingCart.discountCart() + " €";
    body.append(discount);
    var section = document.querySelector('#cart');
    section.append(cart);
}

showCart()

function generateCart() {
    var Array = shoppingCart.listCart();
    var output = "";

    for (var i in Array) {
        output += "<p data-title='"
            +Array[i].name + "'>"
            +Array[i].name
            +"<p class='item-count'>Quantité : "+Array[i].count+" </p>"
            +"<p>"+"Prix : " +Array[i].total + " €"
            +" <button class='plus-btn' data-title='"
            +Array[i].name+"'><i class='fas fa-plus'></i></button>"
            +" <button class='less-btn' data-title='"
            +Array[i].name+"'><i class='fas fa-minus'></i></button>"
            +" <button class='del-btn' data-title='"
            +Array[i].name+"'><i class='fas fa-trash-alt'></i></button>" + "</p>"
            +"</p>";
    }
    var items = document.createElement('li');
    items.innerHTML = output;
    var body = document.querySelector('ul');
    body.prepend(items);
    document.querySelector("#total-cart").innerHTML ="Total: " +shoppingCart.totalCart() + " €" ;
    
    ///////////////////////////////////////////////////////////////////////////////////////////////
    

}

generateCart();

var buttonsAdd = document.querySelectorAll('.add-btn');
buttonsAdd.forEach(button => {
    button.addEventListener('click', function(){
        
        var name = this.parentNode.getAttribute('data-title');
        var price = Number(this.parentNode.getAttribute('data-prix'));

        shoppingCart.addItemToCart(name, price, 1);
        generateCart();
        console.log(name, price)
        window.location.reload(true)
       
    })
})

 // Remove all items from cart
var deleted = document.querySelectorAll('.del-btn');
deleted.forEach(del => {
    del.addEventListener("click", function(){
        var name = this.getAttribute("data-title");
        if (confirm( "Vous allez supprimer cet article" ) ) {
            shoppingCart.removeItemFromCartAll(name);
        }
        else{
        }
        window.location.reload(true)

    });  
})

// Set count from item
 var counts = document.querySelectorAll('.item-count');
 counts.forEach(nombre => {
     nombre.addEventListener("change", function(){
         var name = this.getAttribute("data-title");
         var count = Number(this.val());
         shoppingCart.setCountForItem(name, count);
         generateCart();
     });
 })
 //Discount 
//  var discount = 

 //Add to cart
 var adds = document.querySelectorAll('.plus-btn');
 adds.forEach(addItem => {
     addItem.addEventListener("click", function(){
         var name = this.getAttribute("data-title");
         shoppingCart.addItemToCart(name);
         generateCart();
        window.location.reload(true)
     });
 })

 // Remove item from cart
 var substracts = document.querySelectorAll('.less-btn');
 substracts.forEach(substract => {
     substract.addEventListener("click", function(){
         var name = this.getAttribute("data-title");
         shoppingCart.removeItemFromCart(name);
         generateCart();
        window.location.reload(true)
     });
 })

 

}