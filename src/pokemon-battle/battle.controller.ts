import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BattleService } from './battle.service';
import { CreateBattleDto } from './dto/create-battle.dto';
import { Battle } from './interface/battle.interface';
import { Pokemon } from 'src/pokemon/interface/pokemon.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Controller('battles')
export class BattleController {
  private playerOnePokemon: any = null;
  private playerOnePokemonId: string | null = null;
  private playerOneSelected: boolean = false;
  private playerOneSkillArray: string[] = [];
  private playerTwoPokemon: any = null;
  private playerTwoPokemonId: string | null = null;
  private playerTwoSelected: boolean = false;
  private playerTwoSkillArray: string[] = [];
  private a : any;
  constructor(private readonly battleService: BattleService) { }

  @Post('/test')
  async createPokemon(
    @Body()
    battle: CreateBattleDto,
  ): Promise<Battle> {
    return this.battleService.create(battle);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.battleService.findAll();
  }

  @Get('pokemonbattle')
  async findAllPokemon(): Promise<any> {
    return this.battleService.findAllPokemon();
  }


  @Get('playerone/:pokemonId')
  async choosePlayerOnePokemon(@Param('pokemonId') pokemonId: string): Promise<any> {
    const battle = await this.battleService.findById(pokemonId);
    if (!battle) {
      return { error: 'Invalid Pokémon ID.' };
    }
    this.playerOnePokemonId = pokemonId;
    this.playerOneSelected = true;
    return battle;
  }

  @Post('playerone/:pokemonId/skill')
  async choosePlayerOneSkill(
    @Param('pokemonId') pokemonId: string,
    @Body('skillarray') skillarr: string[]
  ): Promise<Pokemon | { error: string }> {
    if (!this.playerOneSelected) {
      return { error: 'Player One has not chosen a Pokémon yet.' };
    }

    if (this.playerOnePokemonId !== pokemonId) {
      return { error: 'Invalid Pokémon ID. Please check Pokémon ID.' };
    }
    this.playerOneSkillArray = skillarr;
    this.playerOneSelected = true;
    this.a = await this.battleService.chooseSkillForPokemon(pokemonId, skillarr);
    return this.a
  }

  @Get('playertwo/:pokemonId')
  async choosePlayerTwoPokemon(@Param('pokemonId') pokemonId: string): Promise<any> {
    if (!this.playerOneSelected) {
      return { error: 'Player One has not chosen a Pokémon yet.' };
    }

    const playerTwoPokemon = await this.battleService.findById(pokemonId);
    if (!playerTwoPokemon) {
      return { error: 'Invalid Pokémon ID.' };
    }

    this.playerTwoPokemon = playerTwoPokemon;
    this.playerTwoPokemonId = pokemonId;
    return playerTwoPokemon;
  }

  @Post('playertwo/:pokemonId/skill')
  async choosePlayerTwoSkill(
    @Param('pokemonId') pokemonId: string,
    @Body('skillarray') skillarr: string[]
  ): Promise<any> {
    if (!this.playerOneSelected) {
      return { error: 'Player One has not chosen a Pokémon yet.' };
    }

    if (!this.playerOneSkillArray) {
      return { error: 'Player One has not chosen a skill yet.' };
    }

    if (this.playerTwoPokemonId !== pokemonId) {
      return { error: 'Invalid Pokémon ID. Please check Pokémon ID.' };
    }

    this.playerTwoSkillArray = skillarr;
    this.playerTwoSelected = true;

    // Reset the selections for the next round
    this.playerOnePokemon = null;
    this.playerTwoPokemon = null;
    this.playerOnePokemonId = null;
    this.playerTwoPokemonId = null;
    this.playerOneSkillArray = null;
    this.playerTwoSkillArray = null;
    this.playerOneSelected = false;
    this.playerTwoSelected = false;

    // Invoke the battleService method and return the log object
    const result = await this.battleService.chooseSkillForPokemon(pokemonId, skillarr);
    console.log(result);

    return { playerOne:this.a, playerTwo:result };
  }
}
