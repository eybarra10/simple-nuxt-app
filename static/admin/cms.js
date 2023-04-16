import CMS from 'netlify-cms-app';

CMS.init({
  config: {
    backend: {
      name: 'simple-nuxt-app',
      repo: 'simple-nuxt-app',
      branch: 'master',
      auth_type: 'implicit',
      open_authoring: true,
      use_workflow: true,
    },
    load_config_file: false,
    media_folder: 'static/uploads',
    public_folder: '/uploads',
    collections: [
      {
        name: 'post',
        label: 'Post',
        folder: 'content/posts',
        create: true,
        slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
        fields: [
          {
            name: 'title',
            label: 'Title',
            widget: 'string',
          },
          {
            name: 'body',
            label: 'Body',
            widget: 'markdown',
          },
        ],
      },
    ],
  },
});
