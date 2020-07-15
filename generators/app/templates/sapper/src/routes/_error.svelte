<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>


<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}

<% if (separation) { -%>

<% if (sass) { -%>
<style src="./_error.scss"></style>
<% } else { -%>
<style src="./_error.css"></style>
<% } -%>

<% } else { -%>

<% if (sass) { -%>
<style lang="scss">
  <%- include('../../../_specificities/sapper/sass/src/routes/_error.scss'); -%>
</style>
<% } else { -%>
<style>
  <%- include('../../../_specificities/sapper/css/src/routes/_error.css'); -%>
</style>
<% } -%>

<% } -%>

