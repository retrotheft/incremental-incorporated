<script lang="ts" context="module">
import { getContext, onMount } from "svelte";
import Avatar from "./Avatar.svelte";
import { generators } from "./Generator.svelte";
import type Person from "../Person";
import { getRandomInt } from "../utils";
</script>

<script lang="ts">
export let person: Person;

let clicks = 0;
const recTime = 30; // frames
let recovery = recTime;

$: ready = recovery === 0

const { register, unregister } = getContext("app");

onMount(() => {
   register(update);

   return () => unregister(update);
});

function click(button: HTMLButtonElement) {
   if (button.disabled || recovery > 0) return;
   button.click();
   clicks++;
   recovery = recTime;
}

function update() {
   recovery = Math.max(recovery - 1, 0);
   for (const i in $generators) {
      if ($generators[i].button.disabled) continue;
      return setTimeout(
         () => click($generators[i].button),
         getRandomInt(150, 300)
      );
   }
}
</script>

<div class="avatar-frame" style:background={person.backdrop} class:ready>
   <Avatar {person} greet={true} />
</div>
<div class="nameplate">{person.name}</div>
<div>{person.job}</div>
<div>
   {clicks} clicks
</div>

<style>
.avatar-frame {
   border: 2px solid salmon;
   overflow: hidden;
   pointer-events: none;
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
   font-size: 0.8rem;
   color: grey;
   border-radius: 50%;
   width: 128px;
   height: 128px;
}

.ready {
   border-color: lightgreen;
}

div.nameplate {
   font-weight: bold;
   font-size: 1.4rem;
}
</style>
