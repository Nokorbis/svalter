import autoPreprocess from 'svelte-preprocess';

export const preprocess = function(dev) {
  return autoPreprocess({
    <% if (sass && 'library' !== project_type) { -%>
    scss: {
      prependData: `@use 'src/assets/styles/variables.scss' as *;`
    },
    <% } %>
    sourcemap: dev
  });
}
