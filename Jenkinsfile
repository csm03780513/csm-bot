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
                sh 'npm i'
                sh 'node index.js'
                sh 'ls'
            }
        }
        stage('start node App'){
            agent any
            steps{
                sh 'ls'
            }
        }
    }
}

