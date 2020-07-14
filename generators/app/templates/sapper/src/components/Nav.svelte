<script>
	export let segment;
</script>

<nav>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
		<li><a aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a></li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li>
	</ul>
</nav>

<% if (separation) { -%>

<% if (sass) { -%>
<style src="./Nav.scss"></style>
<% } else { -%>
<style src="./Nav.css"></style>
<% } -%>

<% } else { -%>

<% if (sass) { -%>
<style lang="scss">
  <%- include('../../../_specificities/sapper/sass/src/components/Nav.scss'); -%>
</style>
<% } else { -%>
<style>
  <%- include('../../../_specificities/sapper/css/src/components/Nav.css'); -%>
</style>
<% } -%>

<% } -%>
