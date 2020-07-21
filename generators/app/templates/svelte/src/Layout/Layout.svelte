<% if (separation) { -%>

<% if (typescript) { -%>
<script src="./_Layout.ts"></script>
<% } else { -%>
<script src="./_Layout.js"></script>
<% } -%>

<% } else { -%>

<% if (typescript) { -%>
<script lang="ts">
  <%- include('../../../_specificities/svelte/typescript/separation/src/Layout/_Layout.ts'); -%>
</script>
<% } else { -%>
<script>
  <%- include('../../../_specificities/svelte/javascript/separation/src/Layout/_Layout.js'); -%>
</script>
<% } -%>

<% } -%>


<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>


<% if (separation) { -%>

<% if (sass) { -%>
<style src="./_Layout.scss"></style>
<% } else { -%>
<style src="./_Layout.css"></style>
<% } -%>

<% } else { -%>

<% if (sass) { -%>
<style lang="scss">
  <%- include('../../../_specificities/svelte/sass/separation/src/Layout/_Layout.scss'); -%>
</style>
<% } else { -%>
<style>
  <%- include('../../../_specificities/svelte/css/separation/src/Layout/_Layout.css'); -%>
</style>
<% } -%>

<% } -%>
