pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building 16!!!'
                echo $ghprbActualCommitAuthor
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}