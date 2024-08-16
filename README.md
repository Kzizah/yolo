## Week 8 IP 4 Orchestration

## 1. TO install the Google Cloud SDK

1. Make sure your system is up to date.
`sudo apt update && sudo apt upgrade -y`

2. Download the latest version of the Google Cloud SDK using curl.
`curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-445.0.0-linux-x86_64.tar.gz`

3. Extract the downloaded archive.
`tar -xvzf google-cloud-sdk-445.0.0-linux-x86_64.tar.gz`

4. Navigate to the extracted directory and run the installation script.
`cd google-cloud-sdk`
`./install.sh`

During the installation, you'll be prompted with various options, such as whether to update your .bashrc file to include the gcloud command. It's generally a good idea to accept the defaults.

5. After the installation, initialize the Google Cloud SDK.
`gcloud init`
You'll be prompted to log in to your Google account and select a default project. Follow the on-screen instructions to complete the setup.

6. To verify that the installation was successful, run the following command:
`gcloud --version`

7. First, make sure the Google Cloud SDK is installed in the correct directory. You should have installed it in the google-cloud-sdk directory. Navigate to this directory and check if the gcloud executable is present:
`cd ~/Desktop/DevOps/yolo/google-cloud-sdk/bin`
`ls -l gcloud`

8. Add the SDK to Your PATH
`echo 'export PATH=$PATH:/home/ziza/Desktop/DevOps/yolo/google-cloud-sdk/bin' >> ~/.bashrc`
`source ~/.bashrc`

9. After updating your PATH, try running the gcloud command again:
`gcloud init`

10. If you receive an error related to missing components, you may need to install additional components like kubectl:
`gcloud components install kubectl`










