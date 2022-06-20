<script lang="ts" context="module">
import { getContext, onMount, tick } from "svelte";
import { writable } from "svelte/store";
import { ledger, balance } from "./Ledger.svelte";
import {
   getRandomInt,
   getRandomAccessory,
   getPrecision,
   getRandomColor,
} from "../utils";

function createGenerators(max: number) {
   const { subscribe, update } = writable([]);

   const names = [];

   const newGenerator = (n: number) => ({
      name: getRandomAccessory(names),
      baseCost: getRandomInt(8, 12) * Math.pow(getRandomInt(4, 6), n),
      baseProd: (getRandomInt(4, 5) / 10) * Math.pow(getRandomInt(4, 5), n),
      multiplier: getRandomInt(107, 115) / 100,
   });

   function create(existing: number) {
      if (names.length > max) return;
      const gen = newGenerator(existing);
      names.push(gen.name);
      update((array) => [...array, gen]);
   }

   function setButton(name: string, button: HTMLButtonElement) {
      update(array => {
         const gen = array.find(el => el.name === name);
         console.log(gen)
         gen.button = button;
         return array;
      })
   }

   return {
      subscribe,
      create,
      setButton,
   };
}

export const generators = createGenerators(8);
</script>

<script lang="ts">
export let name: string;
export let baseCost: number;
export let baseProd: number;
export let multiplier: number;

let button: HTMLButtonElement;

let qty = 0;

$: cost = Math.ceil(baseCost * Math.pow(multiplier, qty));
$: prod = baseProd;

const { register, unregister } = getContext("app");

function generate(fps: number) {
   ledger.earn((qty * prod) / fps);
}

async function buy() {
   if ($balance < cost) return 0;
   ledger.spend(cost);
   qty += 1;
   await tick();
   // update store? Need to for employees to access costs and buttons. Buttons first.
}

onMount(() => {
   register(generate);

   return () => unregister(generate);
});

function setButton(node: HTMLButtonElement) {
   generators.setButton(name, node)
}
</script>

<button
   use:setButton
   bind:this={button}
   on:click={buy}
   disabled={$balance < cost}
   style:background={getRandomColor(60, 60)}
>
   <h1>{name}{name.charAt(name.length - 1) === "s" ? "" : "s"}</h1>
   <div>
      {#if qty > 0}
         <p>
            <span class="value">{qty}</span> for $<span class="value">
               {(prod * qty).toFixed(1)}</span
            >/s
         </p>
      {:else}
         <p>Makes ${getPrecision(prod)}/s</p>
      {/if}
      <p>Next: <span class="value">${cost}</span></p>
   </div>
</button>

<style>
button {
   width: 100%;
   /* min-height: 3rem;
   min-height: 10vh; */
   cursor: pointer;
   border: 1px solid grey;
   margin: 1px 0;
   padding: 12px 4px;
   display: flex;
   /* flex-direction: column; */
   justify-content: space-between;
   align-items: center;
}

button:hover {
   opacity: 0.8;
}

button:disabled {
   color: lightgrey;
   opacity: 0.4;
}

h1 {
   font-size: 2rem;
   color: white;
   margin: 2px;
   white-space: nowrap;
   text-shadow: 1px 1px 2px black;
}

div {
   text-align: right;
   color: white;
   text-shadow: 1px 1px 0px black;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: space-between;
   height: 100%;
   font-size: 0.9rem;
}

p {
   margin: 0;
}

span.value {
   font-weight: bold;
   font-size: 1rem;
}
</style>
