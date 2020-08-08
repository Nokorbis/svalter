<script context="module">
  export async function preload(page, session) {
  <% if (variable) { -%>
      const { <%= variable -%>} = page.params;
    <% } -%>
  }
</script>

<% if (script_separation) { -%>

<% if (typescript) { -%>
<script src="./_layout.ts"></script>
<% } else { -%>
<script src="./_layout.js"></script>
<% } -%>

<% } else { -%>

<% if (typescript) { -%>
<script lang="ts">
  <%- include('./_layout.ts'); -%>
</script>
<% } else { -%>
<script>
  <%- include('./_layout.js'); -%>
</script>
<% } -%>

<% } -%>

<div>

</div>


<% if (style_separation) { -%>

<% if (sass) { -%>
<style src="./_layout.scss"></style>
<% } else { -%>
<style src="./_layout.css"></style>
<% } -%>

<% } else { -%>

<% if (sass) { -%>
<style lang="scss">
  <%- include('./_layout.scss'); -%>
</style>
<% } else { -%>
<style>
  <%- include('./_layout.css'); -%>
</style>
<% } -%>

<% } -%>

