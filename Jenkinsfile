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
                    echo 'Building 26!!!'
                    echo "new commit 3"
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

                    // Checking if branch exists
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Last label check'
            }
            // steps {
            //     script {
            //         try {
            //             checkout([
            //                 $class: 'GitSCM',
            //                 branches: [[name: 'aaaaa']],
            //                 userRemoteConfigs: [[credentialsId: 'api', url: 'git@github.com:niz11/Simple-DevOps-Project.git']]
            //             ])
            //         }
            //         catch (Exception e) {
            //             checkout([
            //                     $class: 'GitSCM',
            //                     branches: [[name: 'master']],
            //                     userRemoteConfigs: [[url: 'git@github.com:niz11/Simple-DevOps-Project.git']]
            //             ])
            //         }
            //      }
            // Skip test3
            // }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}