import  pokemonApi from '../api/pokemonApi'

const getPokemons = () => {
    const pokemonArr = Array.from( Array(650) )
    
    return pokemonArr.map( ( _ , index ) =>  index + 1 )  // el map barre cada uno de los elementos de el array y le cambia los valores

}

const getPokemonOptions = async() => {
    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5 )
    // ell sort toma ese arreglo y lo mezcla, dependiendo de el valor que este recibiendo aleatoriamente

    const pokemons = await getPokemonName( mixedPokemons.splice(0,4) ) // el spice es para cortar el arreglo de el 0 al 4 osea solo 4 posiciones

    return pokemons
}

// saber los nombres de os 4 primeros poquemones que es lo que nos interesa

const getPokemonName = async ( [a,b,c,d] = [] ) => {

    // const resp = await pokemonApi.get(`/1`)
    // console.log(resp.data.name, resp.data.id)
    // console.log(a,b,c,d)

    const promiseArr = [
        pokemonApi.get(`/${ a }`),
        pokemonApi.get(`/${ b }`),
        pokemonApi.get(`/${ c }`),
        pokemonApi.get(`/${ d }`),
    ]


    // el promise all nos ayuda a disparar un monton de promesas de manera simultaneas 
    const [p1, p2, p3, p4] = await Promise.all( promiseArr )

    return [
        {name: p1.data.name, id: p1.data.id},
        {name: p2.data.name, id: p2.data.id},
        {name: p3.data.name, id: p3.data.id},
        {name: p4.data.name, id: p4.data.id}
    ]

}




export default getPokemonOptions