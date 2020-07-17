<svelte:head>
	<title><%= project_name %></title>
</svelte:head>

<h1>Great success!</h1>

<figure>
	<img alt='Success Kid' src='successkid.jpg'>
	<figcaption>Have fun with Sapper!</figcaption>
</figure>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>

<% if (separation) { -%>

<% if (sass) { -%>
<style src="./_index.scss"></style>
<% } else { -%>
<style src="./_index.css"></style>
<% } -%>

<% } else { -%>

<% if (sass) { -%>
<style lang="scss">
  <%- include('../../../_specificities/sapper/sass/src/routes/_index.scss'); -%>
</style>
<% } else { -%>
<style>
  <%- include('../../../_specificities/sapper/css/src/routes/_index.css'); -%>
</style>
<% } -%>

<% } -%>
