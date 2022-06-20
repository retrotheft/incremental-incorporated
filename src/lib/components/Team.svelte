<script lang="ts" context="module">
import { writable } from "svelte/store";
import { dropzone } from "../dnd";
import type Person from "../Person";
import { recruits } from "./Recruitment.svelte";
import Avatar from "./Avatar.svelte";

function createTeam() {
   const { subscribe, update } = writable([]);

   function add(name: string) {
      update((array) => {
         const person = recruits.hire(name, array.length + 2);
         return [...array, person];
      });
   }

   function remove(person: Person) {
      console.log("Removing from team...");
   }

   return {
      subscribe,
      add,
      remove,
   };
}

export const team = createTeam();
</script>

<script lang="ts">
import Employee from "./Employee.svelte";
</script>

<section id="team" use:dropzone={team} data-dropbg="lightgreen">
   {#if $team.length === 0}
      <div class="empty">Drag here to recruit a team member!</div>
   {/if}
   {#each $team as person}
      <div class="desk">
         
         <Employee {person} />
      </div>
   {/each}
</section>

<!-- <section id="dashboard">
   <div><input type="checkbox" bind:checked={displayNames} />Display Names</div>
</section> -->
<style>
section {
   display: flex;
   justify-content: space-evenly;
   align-items: center;
   align-content: space-around;
   flex-wrap: wrap;
}

section#team > * {
   pointer-events: none;
}

/* section#dashboard {
   height: 10vh;
} */

.empty {
   border: none;
   color: darkgrey;
   font-size: 0.8rem;
}



div.desk {
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   gap: 10px;
   padding: 15px;
}
</style>
