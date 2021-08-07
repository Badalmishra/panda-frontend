module.exports = {

    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     * pm2 deploy ecosystem.config.js development setup
     * pm2 deploy ecosystem.config.js development update
     * pm2 deploy development update
     * pm2 deploy development exec "pm2 restart all"
     */

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {

        development: {
            name: 'panda-frontend',
            user: 'ubuntu',
            host: ['65.1.37.85'],
            ref: 'origin/main',
            repo: 'git@github.com:Badalmishra/panda-frontend.git',
            path: '/home/ubuntu/panda-frontend',
            'post-deploy': 'node --max_old_space_size=4096 && npm install && npm run build',
            ssh_options: 'StrictHostKeyChecking=no',
            env: {
                "NODE_ENV": "development"
            },
        },
    }
};
