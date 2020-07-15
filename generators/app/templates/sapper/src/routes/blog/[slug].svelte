<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`blog/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let post;
</script>


<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>

<div class='content'>
	{@html post.html}
</div>

<% if (separation) { -%>

<% if (sass) { -%>
<style src="./_slug.scss"></style>
<% } else { -%>
<style src="./_slug.css"></style>
<% } -%>

<% } else { -%>

<% if (sass) { -%>
<style lang="scss">
  <%- include('../../../../_specificities/sapper/sass/src/routes/blog/_slug.scss'); -%>
</style>
<% } else { -%>
<style>
  <%- include('../../../../_specificities/sapper/css/src/routes/blog/_slug.css'); -%>
</style>
<% } -%>

<% } -%>
