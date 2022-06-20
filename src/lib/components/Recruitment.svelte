<script lang="ts" context="module">
import { writable } from "svelte/store";
import Person from "../Person";
import { draggable } from "../dnd";
import BusinessCard from "./BusinessCard.svelte";
import { ledger, balance } from './Ledger.svelte'

function createRecruits() {
   const { subscribe, update } = writable([
      new Person()
   ]);

   function add() {
      update((array) => {
         let person: Person;
         do person = new Person();
         while (array.find((element) => element.name === person.name));
         return [...array, person];
      });
   }

   function hire(name: string, teamSize = 0) {
      let recruit: Person;
      update(array => {
         recruit = array.find((element) => element.name === name)
         return [...array.filter(el => el !== recruit), new Person(teamSize)]
      })
      ledger.spend(recruit.fee)
      return recruit;
   }

   return {
      subscribe,
      add,
      hire
   };
}

export const recruits = createRecruits();
</script>

<script lang="ts">
</script>

<h1 on:click={recruits.add}>Recruitment Board</h1>
<ul>
   {#each $recruits as person (person.name)}
      <li class:expensive={$balance < person.fee} use:draggable={{ data: person.name, store: recruits }}>
         <BusinessCard {person} />
      </li>
   {/each}
</ul>

<style>
h1 {
   text-align: center;
}

h1:hover {
   color: yellow;
   cursor: pointer;
}

ul {
   list-style-type: none;
   padding-inline-start: 0;
   margin: 0;
}

li:hover {
   opacity: 0.8
}

li.expensive {
   pointer-events: none;
   opacity: 0.3;
}
</style>
