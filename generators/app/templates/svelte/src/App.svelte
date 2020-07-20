<script>
  import Layout from 'Layout.svelte';
  export let name;
</script>

<Layout {name} />

<% if (sass) { -%>
<style lang="scss" global>
  @import 'assets/styles/global.scss';
</style>
<% } -%>




