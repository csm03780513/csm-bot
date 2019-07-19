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
                sh 'npm i'
            }
        }
        stage('starting node modules') {
            agent any
            steps {
                sh 'sudo pm2 restart index.js'
            }
        }
    }
}

