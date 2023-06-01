let body = document.getElementsByClassName('es1')[0]

function insert(a){
    let p = document.createElement('p')
    p.textContent = a
    body.appendChild(p)
}
// Creo l'array con i dati sui prodotti, con il loro ID univoco, il nome del prodotto ed il prezzo unitario
const products =[
    {id:     1,
    name:   'Portapenne',
    pUn:    5.5},
    {id:     2,
    name:   'Penna Bic',
    pUn:    1.5},
    {id:     3,
    name:   'Set matite 2B',
    pUn:    3.5},
    {id:     4,
    name:   'Gomme set x5',
    pUn:    4.5},
]

// Creo gli utenti come oggetti, con il loro ID univoco, nome, cognome e la condizione di Ambassador

const us1={
    id:    1,
    name:   'Alessandro',
    surname:'Pozzato',
    isAmbassador: false
}
const us2={
    id:    2,
    name:   'Giulio',
    surname:'Sottovia',
    isAmbassador: false
}
const us3={
    id:    3,
    name:   'Augusto',
    surname:'Zanotto',
    isAmbassador: true
}
const us4={
    id:    4,
    name:   'Andrea',
    surname:'Manna',
    isAmbassador: true
}

// Creo l'array degli utenti in cui pushare tutti gli utenti
// Non mi sembrava necessario ma era richiesto dal compito
users = []

// Pusho gli utenti a uno a uno...
users.push(us1)
users.push(us2)
users.push(us3)
users.push(us4)
console.log(users)
// Verifico per ogni utente se sono o meno ambassador
for (let user of users){
    user.isAmbassador
    ?console.log(`${user.name} ${user.surname} è un Ambassador`)
    :console.log(`${user.name} ${user.surname} non è un Ambassador`)
}
// Creo l'array per gli ambassador
let ambassadors = []
// Pusho se sono ambassador
for (let user of users){
    if(user.isAmbassador){
        ambassadors.push(user)
    }
}
console.log(ambassadors)
//Aggiungo le tre costanti dei costi di consegna, il limite di consegna gratuita e l'eventuale sconto ambassador
//Esprimo lo sconto in 0.3 perchè 30/100 era brutto
const shippingCost = 15
const freeShipping = 100
const ambassadorDiscount = 0.3
// Creo un carrello ad oc per ogni utente, userID lo userò per trovare in futuro gli utenti a cui appartiene il carrello
// Ho creato un arrai con gli id perchè immaginando di trattarne migliaia non basta averli nello stesso ordine, mi sarvirà incrociare gli ID con i carrelli
// I valore in products sono una coppia di [IDprodotto,Quantità, mi serviranno per determinare il valore del carrello in futuro
const usersCharts = [
    {userId: 1,
    products: [[1,5],[2,2],[4,2]]
    },
    {userId: 2,
    products: [[2,5],[3,2],[4,2],[1,2],[3,20]]
    },
    {userId: 3,
    products: [[2,5],[3,6],[4,4],[1,2],[1,10]]
    },
    {userId: 4,
    products: [[2,5],[3,2],[4,2],[1,2],[4,6]]
    }
]
//creo la funzione per trovare il prodotto sulla base del suo ID
function findProd (idProd){
    for(let p of products){
        if(p.id === idProd ){
            return p
        }
    }
}
//creo la funzione per calcolare il carrello di un certo utente cercandolo in base al suo id
//questa funzione mi servirà per incorciare i dati contenuti nell'array utenti e quello nell'array carrelli
//potevo fare un unico array? si, ma era meno divertente
function clacTotalPrice(userId){
    //guardo nell'array carrelli tutti i singoli carrelli
    for(let chart of usersCharts){
        //se trovo un carrello con lo stesso id che mi arriva quando ho richiamato la funzione...
        if(chart.userId === userId){
            let totalPrice = 0
            //... per ogni prodotto nei prodotti nel carrello...
            for(let i of chart.products ){
                //... aggiungo il suo prezzo, calcolato come prezzoUnitario*quantità
                //il prezzo unitario lo rilevo chiamando la funzione creata poco sopra, tra parentesi metto l'id del prodotto che deve cercare
                totalPrice += findProd(i[0]).pUn * i[1]
            }
            //ritorno il prezzo totale appena calcolato e la funzione si interrompe
            //quindi se trovo il carrello di un certo id, dopo aver calcolato il totalPrice, la funzione si interrope e mi restituisce il risultato
            return totalPrice
        }
    }
}
//creo l'arrayu che conterrà l'associazione tra utente, carrello ante spese di consegna e carrello post spese di consegna
let userTotalChart = []
//per ogni utente lancio il calcolo...
for(let user of users){
    //calcolo il total price con la fuzione creata poco sopra
    //tra parentesi metto l'id che deve cercare per tirarmi fuori il total price
    //in questo caso visto che sto ciclando tutti gli users sarà user.id
    let totalPrice = clacTotalPrice(user.id)
    console.log( `Il cliente ${user.name} ha un carrello totale di ${totalPrice}` )
    //verifico se siano ambassador e in quel caso applico lo sconto
    if(user.isAmbassador){
    totalPrice = totalPrice*(1-ambassadorDiscount)
    console.log( `${user.name} è ambassador il suo carrello viene ridotto a ${totalPrice}`)
    }
    //calcolo le spese di spedizione se non superano il limite di spesa
    let afterShipping
    if(totalPrice <100){
        afterShipping = totalPrice + shippingCost
    } else { 
        afterShipping = totalPrice}
    // aggiungo i dati appena ottenuti all'array userTotalChart creando ogni volta un oggetto con i dati indicati sotto
    //visto che sono in un ciclo, per ogni utente mi creerà un oggetto che riporta id, nome, total price, e afteshipping
    userTotalChart.push({
        id: user.id,
        name: user.name,
        totalChart: totalPrice,
        afterShipping:afterShipping
        })
}
console.log(userTotalChart)

//metto un logger perchè così è più carino
for(let user of userTotalChart){
    console.log(`${user.name} ha un carrello di ${user.totalChart}, quindi pagherà ${user.afterShipping} `)
}






