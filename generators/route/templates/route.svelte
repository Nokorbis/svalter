<% if (script_separation) { -%>

<% if (typescript) { -%>
<script src="./_index.ts"></script>
<% } else { -%>
<script src="./_index.js"></script>
<% } -%>

<% } else { -%>

<% if (typescript) { -%>
<script lang="ts">
  <%- include('./route.ts'); -%>
</script>
<% } else { -%>
<script>
  <%- include('./route.js'); -%>
</script>
<% } -%>

<% } -%>

<p><%= routename %></p>

<% if (style_separation) { -%>

<% if (sass) { -%>
<style src="./_index.scss"></style>
<% } else { -%>
<style src="./_index.css"></style>
<% } -%>

<% } else { -%>

<% if (sass) { -%>
<style lang="scss">
  <%- include('./route.scss'); -%>
</style>
<% } else { -%>
<style>
  <%- include('./route.css'); -%>
</style>
<% } -%>

<% } -%>
