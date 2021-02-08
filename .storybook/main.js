module.exports = {
  stories: [
    '../src/stories/*.stories.mdx',
    '../src/stories/*.stories.@(js|ts)'
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  babel: async options => ({
    ...options
  })
};
