import { AppState } from "../AppState.js"
import { pokedexService } from "../services/PokedexService.js"
import { Pop } from "../utils/Pop.js"


export class PokedexController {
    constructor() {
        this.getPokemons()
        AppState.on('activePokemon', this.drawActivePoke)
    }

    async getPokemons() {
        try {
            console.log('get pokemon')
            const response = await pokedexService.getPokemonInfo()
        } catch (error) {
            console.log(error)
            Pop.toast("not working", 'error')
        }
    }

    async setActivePoke(pokeId) {
        console.log('request to service', pokeId)

    }

    drawActivePoke(pokeId) {
        console.log('drawing pokemon', pokeId)

    }


    catchActivePokemon() {
        try {
            pokedexService.catchActivePokemon()
            Pop.success("Great catch! Gotta catch em' all!")
        }
        catch (error) {
            Pop.error("Error ocurred, could not catch pokemon.")
            console.error(error)
        }
    }



}