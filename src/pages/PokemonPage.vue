<template>

    <h1 v-if="!pokemon">Espere por favor...</h1>

    <div v-else>
        <h1>¿Quién es este pokémon?</h1>
        
        <PokemonPicture 
            :idPokemon="pokemon.id" 
            :showPokemon="showPokemon"
        />

        <PokemonOptions 
            :showPokemon="showPokemon"
            :pokemons="pokemonArr"
            @selection="checkAnswer($event)"
        />

        <template v-if="showAnswer">
            <h2 v-if="msgCorrect" class="fade-in correct">{{ message }}</h2>
            <h2 v-if="msgIncorrect" class="fade-in danger">{{ message }}</h2>
            <button @click="newGame" class="buttom-new-game">
                Nuevo Juego
            </button>
        </template>


    </div>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture"
import PokemonOptions from "@/components/PokemonOptions"

import getPokemonOptions from '@/helpers/getPokemonOptions'

// console.log(getPokemonOptions())

export default {
    components: {
        PokemonPicture,
        PokemonOptions
    },
    data () {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false, // mostrar si es correcto o no la seleccion
            message: '',
            msgCorrect: false,
            msgIncorrect: false
        }
    },
    methods: {

        
        async mixPokemonArray() {
            this.pokemonArr = await getPokemonOptions()

            // floor es para quitar los decimales y creamos un numero randon de 0 a 3
            const numAleatorio = Math.floor(Math.random() * 4)

            // este es el pokemon que a persona tiene que adivinar
            this.pokemon = this.pokemonArr[numAleatorio]
            // console.log(this.pokemon)

        },

        // aqui sabemos cual es la opcion que la persona selecciono
        checkAnswer (selectedId) {
            this.showPokemon = true
            this.showAnswer = true

            console.log('pokemon', selectedId)
            if(selectedId === this.pokemon.id) {
                this.msgCorrect = true
                this.message = `Correcto, ${this.pokemon.name}`
            } else {
                this.msgIncorrect = true
                this.message = `Fallaste, era ${this.pokemon.name}`
            }
            document.getElementById('pokemon_options').classList.add('no-select')
        },
        newGame() {
            this.showPokemon = false
            this.showAnswer  = false
            this.pokemonArr  = []
            this.pokemon = null
            this.msgIncorrect = false
            this.msgCorrect = false
            this.mixPokemonArray()
            document.getElementById('pokemon_options').classList.remove('no-select')
        }

    },
    mounted() {
        this.mixPokemonArray()
    }
}
</script>

<style>
.danger {
    color: red;
}
.correct {
    color: green;
}
.buttom-new-game {
    padding: 15px 40px;
    border-radius: 5px;
    border: none;
    color: #fff;
    background: rgb(0, 255, 0);
    font-weight: bold;
    font-size: 20px;
}
.no-select li {
    opacity: 0.4;
    pointer-events: none!important;
}
</style>
