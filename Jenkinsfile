pipeline {
    agent any 
    stages {
        stage('start node App'){
            agent any
            steps{
                sh 'cd /opt/csm-bot'
                sh 'git pull'
                sh 'sudo npm i'
                //sh 'sudo node index.js'
            }
        }
    }
}

