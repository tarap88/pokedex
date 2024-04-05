import { AppState } from "../AppState.js";
import { baseURL } from "../env.js";
import { Pokemon } from "../models/PokemonModel.js";
import { loadState, saveState } from "../utils/Store.js";
import { setHTML } from "../utils/Writer.js";
import { api } from "./AxiosService.js";
import { Pop } from "../utils/Pop.js"




// eslint-disable-next-line no-undef
// @ts-ignore
const PokemonAPI = axios.create({ // this will always give you an error, because axios only exists once the page loads
    baseURL: 'https://pokeapi.co/api/v2/pokemon?limit=100',
    timeout: 8000
})

class PokedexService {

    async getPokemonInfo() {
        try {
            const response = await PokemonAPI.get('PokemonAPI')
            console.log('pokemon api', response)
            AppState.pokemons = response.data.results
            console.log('AppStated Pokemons', AppState.pokemons)
        } catch (error) {
            console.log(error)
            Pop.toast("Uh oh", "error")
        }
    }

    async setActivePokemon(pokemonName) {
        let response = await PokemonAPI.get(`/${pokemonName}`)
        console.log('setting to active', response.data)
        const activePokemon = new Pokemon(response.data)
        AppState.activePokemon = activePokemon
        console.log('active pokemon', AppState.activePokemon)
    }



    catchActivePokemon() {
        AppState.pokemons = [...AppState.pokemons, AppState.activePokemon]
        console.log(AppState.pokemons)
        // TODO: ASK WHY THIS IS GIVING A 401 ERROR
        api.post('api/pokemon', AppState.activePokemon)
    }





}


export const pokedexService = new PokedexService()