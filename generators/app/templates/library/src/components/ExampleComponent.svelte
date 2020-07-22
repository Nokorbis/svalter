<%- include(paths.partials.scripts, {filename: '_ExampleComponent', folder: 'src/components'}); %>

<h1>Hello <%= project_name %>!</h1>
<p>{greetings}</p>

<%- include(paths.partials.styles, {filename: '_ExampleComponent', folder: 'src/components'}); %>
