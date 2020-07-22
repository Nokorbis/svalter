<svelte:head>
	<title>About</title>
</svelte:head>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>

<% if (separation) { -%>

<% if (sass) { -%>
<style src="./_index.scss"></style>
<% } else { -%>
<style src="./_index.css"></style>
<% } -%>

<% } else { -%>

<% if (sass) { -%>
<style lang="scss">
  <%- include('../../../../_specificities/sapper/sass/separation/src/routes/about/_index.scss'); -%>
</style>
<% } else { -%>
<style>
  <%- include('../../../../_specificities/sapper/css/separation/src/routes/about/_index.css'); -%>
</style>
<% } -%>

<% } -%>
