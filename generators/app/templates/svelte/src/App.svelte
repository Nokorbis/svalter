<script>
  export let name;
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<% if (separation) { -%>

  <% if (sass) { -%>
<style src="./App.scss"></style>
  <% } else { -%>
<style src="./App.css"></style>
  <% } -%>

<% } else { -%>

  <% if (sass) { -%>
<style lang="scss">
<%- include('../../_specificities/svelte/sass/src/App.scss'); -%>
</style>
  <% } else { -%>
<style>
<%- include('../../_specificities/svelte/css/src/App.css'); -%>
</style>
  <% } -%>

<% } -%>



