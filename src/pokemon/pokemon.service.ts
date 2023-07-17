import { BadRequestException, Injectable, NotFoundException,Inject } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Pokemon } from './interface/pokemon.interface';
import { Model } from 'mongoose';
import { Skill } from 'src/skill/interface/skill.interface';
import { Repository } from 'typeorm';
import { SkillService } from 'src/skill/skill.service';
// import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PokemonService {
  constructor(
    @Inject('POKEMON_MODEL') private pokemonModel: Model<Pokemon>,
    @Inject('SKILL_MODEL') private skillModel: Model<Skill>,
    private readonly skillService: SkillService
  ) {}

    async create(pokemon: Pokemon): Promise<Pokemon> {
    const res = await this.pokemonModel.create(pokemon);
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

        const pokemon = await this.pokemonModel.findById(id);

        if(!pokemon) {
            throw new NotFoundException('Pokemon not found')
        }
        return pokemon;
    
    }

    async chooseSkillForPokemon(pokemonId: string, skillId: string): Promise<Pokemon | { error: string }> {
      const pokemon = await this.findById(pokemonId);
      if (!pokemon) {
        return { error: 'Invalid Pokémon ID.' };
      }
    
      const skill = await this.skillService.findById(skillId);
      if (!skill) {
        return { error: 'Invalid Skill ID.' };
      }
    
      // pokemon.skills.push(skill);
    
      const updatedPokemon = await this.updateById(pokemonId, pokemon);
      console.log(skill);
      
      return updatedPokemon;
    }
    

async findAll(): Promise<Pokemon[]> {
  return this.pokemonModel.find().exec();
}
    
    async updateById(id: string, pokemon: Pokemon): Promise<Pokemon> {
      console.log('pokemon:', pokemon);
      
      return await this.pokemonModel.findByIdAndUpdate(id, pokemon, {
       new: true,
      //  runValidators: true,
      });
  }

  async deleteById(id: string): Promise<Pokemon> {
      return await this.pokemonModel.findByIdAndDelete(id);
  }
}