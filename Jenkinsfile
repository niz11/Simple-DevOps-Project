pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building 16!!!'
                echo 'I am building '+scm.branches[0].name+' branch.'
                echo ${env.ghprbActualCommitAuthor}
                // echo ${ghprbActualCommitAuthor}
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