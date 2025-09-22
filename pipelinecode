pipeline {
  agent any
  environment {
    FRONTEND_IMAGE = "hemanth140505/music-frontend:${BUILD_NUMBER}"
    DOCKERHUB_CREDENTIALS = "dockerhub-creds"
  }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Build Docker Image') { steps { sh "docker build -t ${FRONTEND_IMAGE} ." } }
    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh "docker push ${FRONTEND_IMAGE}"
          sh 'docker logout'
        }
      }
    }
  }
}
