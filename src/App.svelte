<script lang="ts">
import MainLoop from "mainloop.js";
import Ledger from "./lib/components/Ledger.svelte"
import Generator, { generators } from "./lib/components/Generator.svelte";
import Team from "./lib/components/Team.svelte";
import Recruitment from "./lib/components/Recruitment.svelte";
import { onMount, setContext } from "svelte";

const updateFunctions = [];

setContext('app', {
   register(fn: Function) {
      updateFunctions.push(fn);
   },
   unregister(fn: Function) {
      updateFunctions.splice(updateFunctions.indexOf(fn), 1)
   }
})

function update(delta: number) {
   updateFunctions.forEach(fn => fn(1000 / delta))
}

onMount(() => {
   generators.create($generators.length) // could move inside the update function
   MainLoop.setUpdate(update).start();
})
</script>

<main>
   <section id="generators">
      <h1>Generators</h1>
      <div><button on:click={() => generators.create($generators.length)}>Create Generator</button></div>
      {#each $generators as { name, baseCost, baseProd, multiplier}}
         <Generator {name} {baseCost} {baseProd} {multiplier} />
      {/each}
   </section>
   <section id="center">
      <Ledger />
      <Team />
   </section>
   <section id="recruitment">
      <Recruitment />
   </section>
</main>

<style>
main {
   --side-width: 25vw;
   display: grid;
   grid-template-columns: var(--side-width) auto var(--side-width);
   grid-gap: 10px;
   height: 100%;
}

section {
   border: 1px solid white;
}

section#generators {
   padding: 2px;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   flex-direction: column;
}

section#center {
   display: grid;
   grid-template-rows: 30vh auto 30vh;
   border: none;
}

section#recruitment {
   padding: 2px;
}

div {
   display: flex;
   justify-content: center;
   align-items: center;
   margin-bottom: 40px;
}
</style>
