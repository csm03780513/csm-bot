pipeline {
    agent any 
    stages {
        stage('Clone Repo Git')
       {
            steps {
        checkout scm
              }
       }
        stage('start node App'){
            agent any
            steps{
                sh 'cd /opt/csm-bot'
                sh 'sudo npm i'
                sh 'sudo node index.js'
            }
        }
    }
}

