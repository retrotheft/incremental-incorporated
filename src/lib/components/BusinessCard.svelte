<script lang="ts" context="module">
import Avatar from "./Avatar.svelte";
import type Person from "../Person";
</script>

<script lang="ts">
export let person: Person;
</script>

<div
   class="business-card"
   style="background: linear-gradient({person.angle}deg, {person.cardback} {person.cardStyle}%, {person.backdrop} {person.cardStyle}%);"
>
   <Avatar {person} />
   <div class="info">
      {person.name}
      <h5>{person.job}</h5>
      <ul>
         {#each person.skills as skill}
            <li>{skill}</li>
         {/each}
      </ul>
      <h5>Fee: ${person.fee}</h5> <!-- might be better as a slot and inserted by recruitment -->
   </div>
</div>

<style>
div.business-card {
   margin: 1px;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   padding: 2px;
}

div.info {
   display: flex;
   flex-direction: column;
   justify-content: center;
   height: 100%;
   align-items: flex-start;
   /* white-space: nowrap; */
   overflow: hidden;
   margin-left: 10px;
}

ul {
   margin-top: 15px;
   list-style-type: none;
   padding-inline-start: 0;
}

li {
   font-size: 0.8rem;
}

h5 {
   margin: 0;
}
</style>
