<script lang="ts" context="module">
import { writable, derived } from "svelte/store";

function createLedger() {
   const { subscribe, update } = writable({ earned: 20, spent: 0 });

   const earn = (value: number) =>
      update((obj) => ({ ...obj, earned: obj.earned + value }));
   const spend = (value: number) =>
      update((obj) => ({ ...obj, spent: obj.spent + value }));

   return {
      subscribe,
      earn,
      spend,
   };
}

export const ledger = createLedger();
export const balance = derived(
   ledger,
   ($ledger) => $ledger.earned - $ledger.spent
);
</script>

<script lang="ts">

</script>

<section id="ledger">
   <h1 on:click={() => ledger.earn(1)}>
      ${(Math.floor($balance * 100)/100).toFixed(2)}
   </h1>
</section>

<style>
   section {
      display: flex;
      justify-content: center;
   }
   h1 {
      font-size: 4rem;
      font-family: monospace;
   }
</style>