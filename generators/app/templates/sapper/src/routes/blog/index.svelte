<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
	export let posts;
</script>


<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></li>
	{/each}
</ul>

<% if (separation) { -%>

<% if (sass) { -%>
<style src="./_index.scss"></style>
<% } else { -%>
<style src="./_index.css"></style>
<% } -%>

<% } else { -%>

<% if (sass) { -%>
<style lang="scss">
  <%- include('../../../../_specificities/sapper/sass/separation/src/routes/blog/_index.scss'); -%>
</style>
<% } else { -%>
<style>
  <%- include('../../../../_specificities/sapper/css/separation/src/routes/blog/_index.css'); -%>
</style>
<% } -%>

<% } -%>
