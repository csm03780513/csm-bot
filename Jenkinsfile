pipeline {
    agent any 
    stages {
        stage('Clone Repo Git')
       {
            steps {
        checkout scm
              }
       }
        stage('updating node modules') {
            agent any
            steps {
                sh 'cd /opt/csm-bot'
                sh 'npm --version'
                sh 'sudo node index.js'
                sh 'ls'
            }
        }
    }
}

