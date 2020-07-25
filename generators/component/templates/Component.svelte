<% if (script_separation) { -%>

<% if (typescript) { -%>
<script src="./_<%= componentname %>.ts"></script>
<% } else { -%>
<script src="./_<%= componentname %>.js"></script>
<% } -%>

<% } else { -%>

<% if (typescript) { -%>
<script lang="ts">
  <%- include('./Component.ts'); -%>
</script>
<% } else { -%>
<script>
  <%- include('./Component.js'); -%>
</script>
<% } -%>

<% } -%>

<p><%= componentname %></p>

<% if (style_separation) { -%>

<% if (sass) { -%>
<style src="./_<%= componentname %>.scss"></style>
<% } else { -%>
<style src="./_<%= componentname %>.css"></style>
<% } -%>

<% } else { -%>

<% if (sass) { -%>
<style lang="scss">
  <%- include('./Component.scss'); -%>
</style>
<% } else { -%>
<style>
  <%- include('./Component.css'); -%>
</style>
<% } -%>

<% } -%>
