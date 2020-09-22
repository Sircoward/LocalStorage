document.querySelector(`#load`).addEventListener(`click`, loadPosts)
function loadPosts() {
    //LES 4 PREMIERES ELEMENTS SONT OBLIGATOIRES EN AJAX
    //OBJET/CLASSE PROPRE A JS ET PERMET DE FAIRE LA REQUETE AJAX
    let xhr = new XMLHttpRequest();
    // console.log(xhr);
    //JE PREPARE MA METHODE
    let method = "GET";
    //JE PREPARE MON URL DANS LEQUEL JE VAIS RECUPER LE CONTENU
    let url = `https://jsonplaceholder.typicode.com/posts`;
    //OUVRIR MA REQUETE (LA METHODE ET L'ENDROIT OU ALLER CHERCHER L'INFO ET UN TROISIEME FACULTATIF TRUE/FALSE)
    xhr.open(method, url);
    //POSSIBLE D'ECRIRE COMME CA
    // xhr.open("GET", `https://jsonplaceholder.typicode.com/posts`);
    xhr.onload = function (event) {
        //VERIFIE SI LA REQUETE EST TERMINEE
        //XMLHttpRequest.DONE EQUIVAUT A 4
        if (this.readyState === XMLHttpRequest.DONE) {
            // ET QUE SON STATUT EST BIEN A 200 (`ÒR`)
            // VERIFIER DANS LE NETWORK
            if (this.status === 200) {
                const response = JSON.parse(this.responseText);
                console.log(response);
                let output = ``;
                response.forEach(function (post) {
                    output += `
                    <h1>${post.title}</h1>
                    <h3>${post.body}</h3>`
                });
                document.querySelector(`#result`).innerHTML = output;
                console.log(output);
            } else {
                console.log(this.status);
                alert(`Erreur`)
            }
        }
    }
    //AFFICHER LE RESULTAT (SORTE D'APPEL)
    xhr.send();
}