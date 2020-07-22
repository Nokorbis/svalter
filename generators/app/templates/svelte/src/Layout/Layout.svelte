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

<%- include(paths.partials.styles, {filename: '_Layout', folder: 'src/Layout'}); %>

