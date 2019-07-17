pipeline {
    agent any 
    stages {
        stage('Clone Repo Git')
       {
        checkout scm
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
                echo 'Testing stuff...'
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

