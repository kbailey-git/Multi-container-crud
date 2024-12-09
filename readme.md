# multi container CRUD
Practice utilzing terraform, ansible, and github actions to configure and deploy a simple 2 container application

This application runs a simple crud app on two containers:
* container one contains node.js code utilizing express and mongoose to connect to mongo db
* container two is running a basic mongodb image

</br>
#### Prerequisites:
* Git 
* AWS Account
* Terraform
* Method of generating ssh key pair


## Setup

```
# Clone the repository
git clone https://github.com/kbailey-git/Multi-container-crud.git

# Navigate to the project directory
cd Multi-container-crud

# Create .ENV file
touch .env
OR
cp .env.example .env

```
Creating ssh-key:</br>
IMPORTANT NOTE: </br>if using different path, the public key must be changed in [main.tf](https://github.com/kbailey-git/Multi-container-crud/blob/048b1be80f73e69d32a96bea1f8798b682529f64/main.tf#L39) and private key must be specified in [ansible/hosts](https://github.com/kbailey-git/Multi-container-crud/blob/048b1be80f73e69d32a96bea1f8798b682529f64/ansible/hosts#L5) 
```
#Generate ssh key *READ ME*
!!!! IF NOT USING the following file path, must update in main.tf
ssh-keygen -t rsa -f ~/.ssh/cicd -N ""
!!!! 

```



At this point you will need to add your AWS credentials to the .env file (see .env.example). A json file containing a minimal policy for this deployment can be found [here](AWS ROLE LINK)


```
# Load env file vars
export $(grep -v '^#' .env | xargs)

# Generate Terraform Plan
Terraform plan

# create infrastructure 
Terraform Apply

```

After the Terraform Apply is complete, it will output the address of our newly allocated ec2 instance. </br>
**OVERWRITE THE ADDRESS TO ANSIBLE HOSTS FILE under [[servers]](https://github.com/kbailey-git/Multi-container-crud/blob/048b1be80f73e69d32a96bea1f8798b682529f64/ansible/hosts#L2)**

At this point you could either run the ansible playbook locally and the app will be configured and deployed,
OR you could set up github actions

## Github Actions

This project is utilizing a manual trigger to configure SSH on our newly deployed machine, and then run our ansible playbook

In order to do this we must configure a repository secret with our ssh private key. To do this:

#### Navigate to repo settings > secrets > actions
![add_secret](.img/add_secret.png)

#### Add key contents and CORRECT NAME
The secret is referenced in our github actions so make sure the name is set to SSH_KEY
![secret_ui](.img/secret_ui.png)

#### Run Action
![run_Action](.img/run_Action.png)