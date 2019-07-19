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
                sh 'node index.js'
                sh 'ls'
            }
        }
    }
}

