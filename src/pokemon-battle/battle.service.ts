import { BadRequestException, Injectable, NotFoundException,Inject } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Battle } from './interface/battle.interface';
import { Pokemon } from 'src/pokemon/interface/pokemon.interface';
import { Model } from 'mongoose';
import { Skill } from 'src/skill/interface/skill.interface';
import { Repository } from 'typeorm';
import { SkillService } from 'src/skill/skill.service';
import { PokemonService } from 'src/pokemon/pokemon.service';


@Injectable()
export class BattleService {
  constructor(
    @Inject('BATTLE_MODEL') private battleModel: Model<Battle>,
    @Inject('POKEMON_MODEL') private pokemonModel: Model<Pokemon>,
    private readonly pokemonService: PokemonService,
    private readonly skillService: SkillService
    // private readonly battleService: BattleService
  ) {}

    async create(battle: Battle): Promise<Battle> {
    const res = await this.battleModel.create(battle);
    return res;
}
    // async findByFilter(query: Query): Promise<Pokemon[]> { 
    //     const resPerPage = 5
    //     const cerruentPage = Number(query.page) 
    //     const skip = resPerPage * (cerruentPage  -1)
    //     const keyword = query.keyword
    //     ? {
    //         title: {
    //             $regex: query.keyword,
    //             $options: 'i'
    //         }
    //     } 
    // : {};

    //     const pokemons = await this.pokemonModel
    //         .find({ ...keyword })
    //         .limit(resPerPage)
    //         .skip(skip);
    //     return pokemons;
    // }

    async findById(id: string): Promise<Pokemon> {

        const isValidId = mongoose.isValidObjectId(id);

        if(!isValidId) {
            throw new BadRequestException('Please enter correct id.')
        }

        const battle = await this.pokemonModel.findById(id);
        // console.log(battle);

        if(!battle) {
            throw new NotFoundException('Pokemon not found')
        }
        return battle;
    }

    async chooseSkillForPokemon(pokemonId: string, skillarr: string[]): Promise<Pokemon | { error: string }> {
      const battle = await this.pokemonService.findById(pokemonId);
      // console.log(battle);
      
      if (!battle) {
        return { error: 'Invalid Pokémon ID.' };
      }
  
      const skill1 = await this.skillService.findById(skillarr[0]);
      const skill2 = await this.skillService.findById(skillarr[1]);
      const skill3 = await this.skillService.findById(skillarr[2]);
      const skill4 = await this.skillService.findById(skillarr[3]);

      const test = [];

      const pokemon_skill: Pokemon = {
        gen: battle.gen,
        no: battle.no,
        name: battle.name,
        type_info: battle.type_info,
        stats: battle.stats,
        skillz: test
      }
    
      test.push(skill1);
      test.push(skill2);
      test.push(skill3);
      test.push(skill4);
      // console.log('pokemon_skill: ',pokemon_skill);
      const updateSkill = await this.pokemonService.updateById(pokemonId, pokemon_skill);
      // const createBattle = await this.battleService.create(battle);
      console.log('updateSkill: ', updateSkill);
      return updateSkill;
    }
  
    async findAll(): Promise<Battle[]> {
        return this.battleModel.find().exec();
}

    async findAllPokemon(): Promise<Pokemon[]> {
        return this.pokemonModel.find().exec();
  }
    
    async updateById(id: string, battle: Battle): Promise<Battle> {
      return await this.battleModel.findByIdAndUpdate(id, battle, {
       new: true,
       runValidators: true,
      });
  }

  async deleteById(id: string): Promise<Battle> {
      return await this.battleModel.findByIdAndDelete(id);
  }
}