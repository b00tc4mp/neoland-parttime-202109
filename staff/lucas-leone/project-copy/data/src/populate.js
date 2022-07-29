const { connect, disconnect } = require('mongoose')
const { Allergen, Category, Ingredient } = require('./models')


connect('mongodb+srv://admin:Lu868788@cluster0.jkrpvzf.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('connected to project'))

    .then(() => {
        const gluten = new Allergen({name: 'Gluten'})
        const crustaceans = new Allergen({name: 'Crustaceans'})
        const eggs = new Allergen({name: 'Eggs'})
        const fish = new Allergen({name: 'Fish'})
        const peanuts = new Allergen({name: 'Peanuts'})
        const soya = new Allergen({name: 'Soya'})
        const milk = new Allergen({name: 'Milk'})
        const nuts = new Allergen({name: 'Nuts'})
        const celery = new Allergen({name: 'Celery'})
        const mustard = new Allergen({name: 'Mustard'})
        const sesame = new Allergen({name: 'Sesame'})
        const sulphatDioxide = new Allergen({name: 'Sulphat dioxide'})
        const lupin = new Allergen({name: 'Lupin'})
        const mollusc = new Allergen({name: 'Mollusc'})

        const vegan = new Category({name:'Vegan'})
        const vegetarian = new Category({name:'Vegetarian'})
        const bio = new Category({name:'Bio'})

        const huevos = new Ingredient({name:'Huevos'})
        const harina = new Ingredient({name:'Harina'})
        const arroz = new Ingredient({name:'Arroz'})
        const garbanzos = new Ingredient({name:'Garbanzos'})
        const alubias = new Ingredient({name:'Alubias'})
        const lentejas = new Ingredient({name:'Lentejas'})
        const guisantes = new Ingredient({name:'Guisantes'})
        const ajo = new Ingredient({name:'Ajo'})
        const avellanas = new Ingredient({name:'Avellanas'})
        const cacahuate = new Ingredient({name:'Cacahuate'})
        const miel = new Ingredient({name:'Miel'})
        const olivas = new Ingredient({name:'Olivas'})
        const patatas = new Ingredient({name:'Patatas'})
        const sal = new Ingredient({name:'Sal'})
        const pimienta = new Ingredient({name:'Pimienta'})
        const spaghetti = new Ingredient({name:'Spaghetti'})
        const tallarines = new Ingredient({name:'Tallarines'})
        const pluma = new Ingredient({name:'Pluma'})
        const caldoDePollo = new Ingredient({name:'Caldo de pollo'})
        const atun = new Ingredient({name:'Atun'})
        const aceiteDeGirasol = new Ingredient({name:'Aceite de girasol'})
        const aceiteDeOliva = new Ingredient({name:'Aceite de oliva'})
        const maiz = new Ingredient({name:'Maiz'})
        const judias = new Ingredient({name:'Judias'})
        const pimiento = new Ingredient({name:'Pimiento'})
        const alcachofa = new Ingredient({name:'Alcachofa'})
        const zanahoria = new Ingredient({name:'Zanahorias'})
        const salsaBrava = new Ingredient({name:'Salsa brava'})
        const oregano = new Ingredient({name:'Oregano'})
        const mayonesa = new Ingredient({name:'Mayonesa'})
        const albahaca = new Ingredient({name:'Albahaca'})
        const brocoli = new Ingredient({name:'Brocoli'})
        const limom = new Ingredient({name:'Limon'})
        const pollo = new Ingredient({name: 'pollo'})


        return Promise.all([gluten.save(), 
            crustaceans.save(),
             eggs.save(),
             fish.save(),
             peanuts.save(),
             soya.save(),
             milk.save(),
             nuts.save(),
             celery.save(), 
             mustard.save(), 
             sesame.save(),
             sulphatDioxide.save(), 
             lupin.save(), 
             mollusc.save(),

             vegan.save(),
             vegetarian.save(),
             bio.save(),

             huevos.save(),
             harina.save(),
             arroz.save(),
             garbanzos.save(),
             alubias.save(),
             lentejas.save(),
             guisantes.save(),
             ajo.save(),
             avellanas.save(),
             cacahuate.save(),
             miel.save(),
             olivas.save(),
             patatas.save(),
             sal.save(),
             pimienta.save(),
             spaghetti.save(),
             tallarines.save(),
             pluma.save(),
             caldoDePollo.save(),
             atun.save(),
             aceiteDeGirasol.save(),
             aceiteDeOliva.save(),
             maiz.save(),
             judias.save(),
             pimiento.save(),
             alcachofa.save(),
             zanahoria.save(),
             salsaBrava.save(),
             oregano.save(),
             mayonesa.save(),
             albahaca.save(),
             brocoli.save(),
             limom.save(),
             pollo.save()


             ])

    })



    .then(() => disconnect())
    .then(() => console.log('disconnected from project'))
