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
        
        stage('Booting App') {
            steps {
               // sh 'sudo pm2 stop index'
               // sh 'pm2 restart index'
               sh 'pm2 start index'
            }
        }
    }
}

