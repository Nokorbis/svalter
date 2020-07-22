<%- include (paths.partials.scripts, {filename: '_App', folder: 'src'}); %>

<Layout {name} />

<% if (sass) { -%>
<style lang="scss" global>
  @import 'assets/styles/global.scss';
</style>
<% } -%>




