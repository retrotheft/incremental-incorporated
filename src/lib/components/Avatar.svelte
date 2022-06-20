<script lang="ts" context="module">
import type Person from "../Person";
</script>

<script lang="ts">
import { onMount } from "svelte";

export let person: Person;
export let greet = false;

onMount(() => {
   if (greet)
   console.log(`Hi! I'm ${person.name.split(' ')[0]}!`)
})
</script>

<div class="avatar">
   <div class="Body-Body_{person.body}-Skin" />
   <div class="Hair-Hair_{person.hairstyle}-{person.haircolor}" />
   <div class="Eyes-Eyes_{person.eyes}_{person.genderNoun}" />
   <div class="Eyebrows-Eyebrows_{person.eyebrows}_{person.haircolor}" />
   <div class="Mouth-Mouth_{person.mouth}" />
   {#if person.genderNoun === "Man"}<div
         class="Moustache-Moustache_{person.moustache}_{person.haircolor}"
      />{/if}
   <div class="Outfit-Outfit_{person.outfit}" />
   <div class="Cheeks-Cheeks_{person.cheeks}" />
</div>

<style>
div.avatar {
   width: 128px;
   height: 128px;
   position: relative;
   padding: 0;
   display: flex;
   justify-content: center;
   /* border-radius: 45%; */
   overflow: hidden;
}

div.avatar > div {
   position: absolute;
   width: 100%;
   height: 100%;
}
</style>
