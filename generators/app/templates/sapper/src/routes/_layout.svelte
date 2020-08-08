<%- include(paths.partials.scripts, {filename: '_layout', folder: 'src/routes'}); %>

<Nav {segment}/>

<main>
	<slot></slot>
</main>


<% if (sass) { -%>
<style lang="scss" global>
  @import '../assets/styles/global.scss';
</style>
<% } -%>
