import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { Pokemon } from './interface/pokemon.interface';

@Controller('pokemons')
export class PokemonController {
  private playerOnePokemon: any = null;

  constructor(private readonly pokemonService: PokemonService) {}

  @Post('/test')
    async createPokemon(
        @Body()
        pokemon: CreatePokemonDto,
    ): Promise<Pokemon> {
        return this.pokemonService.create(pokemon);
    }

  @Get()
  async findAll(): Promise<any> {
  return this.pokemonService.findAll();
}

@Get('playerone/:pokemonId')
async choosePlayerOnePokemon(@Param('pokemonId') pokemonId: string): Promise<any> {
  const pokemon = await this.pokemonService.findById(pokemonId);
  if (!pokemon) {
    return { error: 'Invalid Pokémon ID.' };
  }

  this.playerOnePokemon = pokemon;

  return this.playerOnePokemon;
}

@Post('playerone/:pokemonId/skill/:skillId')
async choosePlayerOneSkill(
  @Param('pokemonId') pokemonId: string,
  @Param('skillId') skillId: string,
): Promise<Pokemon | { error: string }> {
  return this.pokemonService.chooseSkillForPokemon(pokemonId, skillId);
}

@Get('playertwo/:pokemonId')
async choosePlayerTwoPokemon(@Param('pokemonId') pokemonId: string): Promise<any> {
  if (!this.playerOnePokemon) {
    return { error: 'Player One has not chosen a Pokémon yet.' };
  }

  const playerTwoPokemon = await this.pokemonService.findById(pokemonId);
  if (!playerTwoPokemon) {
    return { error: 'Invalid Pokémon ID.' };
  }

  if (playerTwoPokemon.name === this.playerOnePokemon.name) {
    return { error: 'Player Two cannot choose the same Pokémon as Player One.' };
  }

  const log = {
    playerOne: this.playerOnePokemon,
    playerTwo: playerTwoPokemon,
  };

  this.playerOnePokemon = null;

  return log;
}
}