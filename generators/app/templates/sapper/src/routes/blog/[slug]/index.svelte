<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called index.svelte
		const res = await this.fetch(`blog/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<%- include(paths.partials.scripts, {filename: '_index', folder: 'src/routes/blog/[slug]'}); %>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>

<div class='content'>
	{@html post.html}
</div>

<%- include(paths.partials.styles, {filename: '_index', folder: 'src/routes/blog/[slug]'}); %>
