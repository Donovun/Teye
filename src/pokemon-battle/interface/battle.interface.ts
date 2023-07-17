
export interface Battle {
    gen: string;
    no: string;
    name: string;
    type_info: Infotype;
    stats: Infostats;
    skillz: Infoskill[];
  }

  export interface Infotype{
    type_one: string;
    type_two: string;
  }

  export interface Infostats{
    hp: number;
    attack: number;
    defense: number;
    sp_atk: number;
    sp_def: number;
    speed: number;
    total: number;
  }

  export interface Infoskill{
    skill_name: string;
    skill_type: string;
    skill_power: number;
  }

  