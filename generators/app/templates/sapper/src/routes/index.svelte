<svelte:head>
	<title><%= project_name %></title>
</svelte:head>

<h1>Great success!</h1>

<figure>
	<img alt='Success Kid' src='successkid.jpg'>
	<figcaption>Have fun with Sapper!</figcaption>
</figure>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>

<%- include(paths.partials.styles, {filename: '_index', folder: 'src/routes'}); %>
