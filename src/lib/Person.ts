import {
   randFullName, 
   randSkill,
   randJobDescriptor,
   randJobTitle,
   randJobType,
} from '@ngneat/falso'

import { avatars } from '../assets/avatars'
import { getRandomColor, getRandomInt } from './utils'

function randomise(feature: string): string {
   return avatars[feature][getRandomInt(0, avatars[feature].length - 1)]
}

export default class Person {
   public readonly genderNoun: "Man" | "Woman";
   public readonly genderAdj: "male" | "female";
   public readonly name: string
   public readonly body: string
   public readonly hairstyle: string
   public readonly haircolor: string
   public readonly eyes: string
   public readonly eyebrows: string
   public readonly cheeks: string
   public readonly moustache: string
   public readonly mouth: string
   public readonly outfit: string

   public readonly job: string;
   public readonly skills: string[]

   public readonly backdrop: string;
   public readonly cardback: string;
   public readonly angle: number;
   public readonly cardStyle: number;

   public readonly fee: number;

   constructor(level = 1) {
      const female = getRandomInt(0, 1)
      this.genderNoun = female ? "Woman" : "Man";
      this.genderAdj = female ? "female" : "male";
      this.name = randFullName({ withAccents: false, gender: this.genderAdj })
      this.body = randomise('body')
      this.hairstyle = randomise(`hairstyle${this.genderNoun}`)
      this.haircolor = randomise("haircolor")
      this.eyes = randomise("eyes")
      this.eyebrows = randomise("eyebrows")
      this.cheeks = randomise("cheeks")
      this.moustache = randomise("moustache")
      this.mouth = randomise("mouth")
      this.outfit = randomise(`outfit${this.genderNoun}`)
      this.fee = getRandomInt(Math.pow(5, level), Math.pow(10, level));

      const j = getRandomInt(0, 1);
      this.job =
      j > 0 ? `${randJobTitle()}` : `${randJobDescriptor()} ${randJobType()}`;
      this.skills = getRandomSkills()

      this.backdrop = getRandomColor();
      this.cardback = getRandomColor(25, 35)

      this.angle = getRandomInt(0, 4) * 35;
      this.cardStyle = getRandomInt(0, 2) * 40;
   }
}

function getRandomSkills() {
   const skill1 = randSkill();
   let skill2: string;
   do skill2 = randSkill();
   while (skill1 === skill2);
   return [ skill1, skill2]
}