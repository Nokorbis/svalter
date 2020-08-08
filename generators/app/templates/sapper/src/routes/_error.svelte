<%- include(paths.partials.scripts, {filename: '_error', folder: 'src/routes'}); %>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}

<%- include(paths.partials.styles, {filename: '_error', folder: 'src/routes'}); %>

