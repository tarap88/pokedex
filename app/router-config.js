import { AccountController } from "./controllers/AccountController.js";
import { PokedexController } from "./controllers/PokedexController.js";
import { AuthGuard } from "./services/AuthService.js";
import { Router } from "./utils/Router.js";



export const router = new Router([
  {
    path: '',
    controllers: [PokedexController],
    view: 'app/views/PokemonView.html'
  },
  {
    path: '#/account',
    middleware: [AuthGuard],
    controllers: [AccountController],
    view: 'app/views/AccountView.html',
  }
])