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
        stage('start node App'){
            agent any
            steps{
                sh 'node index.js'
            }
        }
    }
}

