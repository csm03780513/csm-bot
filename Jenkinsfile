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
        stage('stopping App') {
            steps {
                sh 'pm2 stop index.js'
            }
        }
        stage('starting App') {
            steps {
                sh 'pm2 start index.js'
            }
        }
    }
}

