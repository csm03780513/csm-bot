pipeline {
    agent any 


    stages {
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
                bat 'npm --version'
            }
        }
    }
}

