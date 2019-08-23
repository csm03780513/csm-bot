pipeline {
    agent any 
    stages {
        stage('Clone Repo Git')
       {
            steps {
        checkout scm
              }
       }
        stage('updating node modules')
         {
            agent any
            steps {
                sh 'npm i'
                sh 'pm2 restart index.js'
            }
        }
    }
}

