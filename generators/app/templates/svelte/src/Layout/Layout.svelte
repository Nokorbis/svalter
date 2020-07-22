<%- include (paths.partials.scripts, {filename: '_Layout', folder: 'src/Layout'}); %>

<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<%- include(paths.partials.styles, {filename: '_Layout', folder: 'src/Layout'}); %>

