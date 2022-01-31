pipeline {
    agent any

    stages {
        stage('Build') {
            when {
                not {
                    anyOf {
                        environment name: 'ghprbPullTitle', value: null
                        environment name: 'ghprbSourceBranch', value: null
                    }
                 }
               }
            steps {
                script {
                    echo 'Building 22!!!'
                    // echo 'ghprbActualCommit: ' params.ghprbActualCommitAuthor
                    TEST2=env.getProperty('ghprbSourceBranch')
                    echo TEST2
                    // echo 'ghprbActualCommitAuthorEmail: ' $ghprbActualCommitAuthorEmail
                    // echo 'ghprbPullDescription: ' $ghprbPullDescription
                    // echo 'ghprbPullId: ' $ghprbPullId
                    // echo 'ghprbPullLink: ' $ghprbPullLink
                    // echo 'ghprbPullTitle: ' $ghprbPullTitle
                    TEST=env.getProperty('ghprbPullTitle')
                    echo TEST
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