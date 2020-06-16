# A simple REST API

### How to use it

---
## Requirements

You will only need `Node.js` and `npm` installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v13.12.0

    $ npm --version
    6.14.2

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g


## Install

    $ git clone https://github.com/MASISKAR/simple-rest-api.git
    $ cd simple-rest-api
    $ npm install

## Running the project

    $ npm start

## Making requests
#### Create a task
request url `http://localhost:3001/tasks`

request method `POST`

request body 
`{`
title: `{String}`, (required)
description: `{String}`,
date: `{String}`
`}`  
 
 
#### Get tasks
request url `http://localhost:3001/tasks`

request method `GET`

##### The following filters and sorting are allowed
`{`

   search: `{searchString}`,
    
   create_lt: `{dateString}`,
    
   create_gt: `{dateString}`,
    
   complete_lt: `{dateString}`,
    
   complete_gt: `{dateString}`,
    
   sort: `OneOf['a-z', 'z-a', 'creation_date_oldest', 'creation_date_newest', 'completion_date_oldest', 'completion_date_newest']`,
   
`}`


#### Get the task
request url `http://localhost:3001/tasks/:taskId`
request method `GET`

#### Update the task
request url `http://localhost:3001/tasks/:taskId`
request method `PUT`
request body 
`{`
title: `{String}`,
description: `{String}`,
date: `{String}`
`}`         
    
#### Delete the task
request url `http://localhost:3001/tasks/:taskId`
request method `DELETE`

#### Delete tasks bulk
request url `http://localhost:3001/tasks`
request method `DELETE`
request body 
`{`
tasks: `{Array[String{task id}]}`,
`}`  

#### Sending contact form
request url `http://localhost:3001/contact`

request method `POST`

request body 
`{`
name: `{String}`, (required)
email: `{String}`, (required)
message: `{String}`
`}`  
