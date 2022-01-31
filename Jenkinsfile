pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    echo 'Building 22!!!'
                    // echo 'ghprbActualCommit: ' params.ghprbActualCommitAuthor
                    // echo 'ghprbActualCommitAuthor: ' $ghprbActualCommitAuthor
                    // echo 'ghprbActualCommitAuthorEmail: ' $ghprbActualCommitAuthorEmail
                    // echo 'ghprbPullDescription: ' $ghprbPullDescription
                    // echo 'ghprbPullId: ' $ghprbPullId
                    // echo 'ghprbPullLink: ' $ghprbPullLink
                    // echo 'ghprbPullTitle: ' $ghprbPullTitle
                    echo 'ghprbSourceBranch: ' ${env.ghprbSourceBranch}
                    // echo 'ghprbTargetBranch: ' $ghprbTargetBranch
                    // echo 'sha1: ' $sha1
                    // echo 'I am building '+scm.branches[0].name+' branch.'
                    // echo ${env.ghprbActualCommitAuthor}
                    // echo ${ghprbActualCommitAuthor}
                }
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