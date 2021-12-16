module.exports = {
  apps: [{
    name: "myblog",
    script: './node_modules/nuxt/bin/nuxt.js',
    args: 'start',
    exec_mode: 'cluster', // enables clustering
    instances: 'max', // or an integer
  }],

  // deploy: {
  //   production: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'GIT_REPOSITORY',
  //     path: 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
