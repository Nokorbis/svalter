<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<Nav {segment}/>

<main>
	<slot></slot>
</main>

<% if (separation) { -%>

<% if (sass) { -%>
<style src="./_layout.scss"></style>
<% } else { -%>
<style src="./_layout.css"></style>
<% } -%>

<% } else { -%>

<% if (sass) { -%>
<style lang="scss">
  <%- include('../../../_specificities/sapper/sass/src/routes/_layout.scss'); -%>
</style>
<% } else { -%>
<style>
  <%- include('../../../_specificities/sapper/css/src/routes/_layout.css'); -%>
</style>
<% } -%>

<% } -%>
