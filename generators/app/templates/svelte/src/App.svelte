<% if (separation) { -%>

<% if (typescript) { -%>
<script src="./_App.ts"></script>
<% } else { -%>
<script src="./_App.js"></script>
<% } -%>

<% } else { -%>

<% if (typescript) { -%>
<script lang="ts">
  <%- include('../../_specificities/svelte/typescript/separation/src/_App.ts'); -%>
</script>
<% } else { -%>
<script>
  <%- include('../../_specificities/svelte/javascript/separation/src/_App.js'); -%>
</script>
<% } -%>

<% } -%>

<Layout {name} />

<% if (sass) { -%>
<style lang="scss" global>
  @import 'assets/styles/global.scss';
</style>
<% } -%>




