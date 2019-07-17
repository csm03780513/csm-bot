pipeline {
    agent any 
    stages {
        stage('Clone Repo Git')
       {
              steps {
        checkout scm
              }
       }
        stage('Build Assets') {
            agent any 

            steps {
                echo 'Building Assets'
            }
        }
        stage('Test') {
            agent any
            steps {
                sh 'node index.js'
            }
        }
        stage('running npm version'){
            agent any
            steps{
                sh 'npm --version'
            }
        }
    }
}

