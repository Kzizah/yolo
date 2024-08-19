## Week 8 IP 4 Orchestration

## 1. To install the Google Cloud SDK

1. Make sure your system is up to date.<br>

`sudo apt update && sudo apt upgrade -y`

2. Download the latest version of the Google Cloud SDK using curl.<br>

`curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-445.0.0-linux-x86_64.tar.gz`

3. Extract the downloaded archive.<br>
`tar -xvzf google-cloud-sdk-445.0.0-linux-x86_64.tar.gz`

4. Navigate to the extracted directory and run the installation script.<br>
`cd google-cloud-sdk`
`./install.sh`

During the installation, you'll be prompted with various options, such as whether to update your .bashrc file to include the gcloud command. It's generally a good idea to accept the defaults.

5. After the installation, initialize the Google Cloud SDK.<br>
`gcloud init`
You'll be prompted to log in to your Google account and select a default project. Follow the on-screen instructions to complete the setup.

6. To verify that the installation was successful, run the following command:<br>
`gcloud --version`

7. First, make sure the Google Cloud SDK is installed in the correct directory. You should have installed it in the google-cloud-sdk directory. Navigate to this directory and check if the gcloud executable is present:<br>
`cd ~/Desktop/DevOps/yolo/google-cloud-sdk/bin`
`ls -l gcloud`

8. Add the SDK to Your PATH<br>
`echo 'export PATH=$PATH:/home/ziza/Desktop/DevOps/yolo/google-cloud-sdk/bin' >> ~/.bashrc`
`source ~/.bashrc`

9. After updating your PATH, try running the gcloud command again:<br>
`gcloud init`

10. If you receive an error related to missing components, you may need to install additional components like kubectl:<br>
`gcloud components install kubectl`

## 2. Enable the Kubernetes Engine API
you can enable the API using the gcloud command:<br>
`gcloud services enable container.googleapis.com`

## 3.  Creating the GKE Cluster
`gcloud container clusters create yolo-cluster \--num-nodes=3 \--zone us-central1-a`

## 4. Apply the Kubernetes Manifests
 ```bash
    kubectl apply -f persistent-volume.yaml
    kubectl apply -f persistent-volume-claim.yaml
    kubectl apply -f database-statefulset.yaml
    kubectl apply -f database-service.yaml
    kubectl apply -f backend-deployment.yaml
    kubectl apply -f backend-service.yaml
    kubectl apply -f frontend-deployment.yaml
    kubectl apply -f frontend-service.yaml
```

## 5. Verify the deployments

Check the status of the services:

    ```bash
    kubectl get services
    ```

    Ensure the `EXTERNAL-IP` is assigned to access the frontend and backend.

## 6. Kubernetes Resources

### a. MongoDB StatefulSet

The MongoDB StatefulSet ensures data persistence even if pods restart:

- **File**: `database-statefulset.yaml`
- **Service**: `database-service.yaml`

### 2. Backend Deployment

The backend service handles API requests:

- **File**: `backend-deployment.yaml`
- **Service**: `backend-service.yaml`

### 3. Frontend Deployment

The frontend serves the React application:

- **File**: `frontend-deployment.yaml`
- **Service**: `frontend-service.yaml`

## Connecting to MongoDB

The backend connects to MongoDB using the following connection string:

```javascript
const mongodb_url = 'mongodb://mongo-service:27017/yolomy';



















