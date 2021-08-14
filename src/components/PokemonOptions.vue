<template>
  <div class="options-container">
    <ul id="pokemon_options">
      <li 
        v-for="pokemon in pokemons" 
        :key="pokemon.id" 
        @click="$emit('selection', pokemon.id)">

        {{pokemon.name}}

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    showPokemon: {
      type: Boolean,
      required: true,
    },
    pokemons: {
      type: Array,
      required: true
    }
  }

}
</script>

<style>
/* Pokemon Options */
ul {
    list-style-type: none;
    padding: 0px;
    margin-top: 30px;
}
li {
    background-color: rgb(42, 127, 255);
    color: white;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
    height: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}

li:hover {
    background-color: rgba(0, 0, 0, 0.611);
}

.options-container {
    display: flex;
    justify-content: center;
}

</style>