<svelte:head>
	<title>About</title>
</svelte:head>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>

<% if (separation) { -%>

<% if (sass) { -%>
<style src="./_about.scss"></style>
<% } else { -%>
<style src="./_about.css"></style>
<% } -%>

<% } else { -%>

<% if (sass) { -%>
<style lang="scss">
  <%- include('../../../_specificities/sapper/sass/src/routes/_about.scss'); -%>
</style>
<% } else { -%>
<style>
  <%- include('../../../_specificities/sapper/css/src/routes/_about.css'); -%>
</style>
<% } -%>

<% } -%>
