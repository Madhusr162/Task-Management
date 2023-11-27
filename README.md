# Task-Management:
In this project, I have created register and login for user. When the user register, default admin value will be false. If you want to change the admin value to true, you can do it manually in the Database. In order to create, update and delete task the user should be an admin. Normal user who is not an admin can view all the tasks and view a particular task with this taskID.

Register API: 
------------
**input parameters:**
1. Name
2. Username
3. Password
**Expected output on successful registration:**
User signed up successfully.

Login API:
----------
**input parameters:**
1. Username
2. Password
**Expected output on successful login:**
"result": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTYzOTU0ZjhjM2RkNGMwMzVlNmRjMzMiLCJpYXQiOjE3MDEwODc3MjN9.DT78yudLM2BVlMV_2gLMocxA3GU3wqeoZzD3osLL5yI",
        "user": {
            "username": "Yazhu117",
            "name": "Yazhnila N M",
            "id": "6563954f8c3dd4c035e6dc33",
            "admin": "true"
        }
    }

   Get All tasks API:
   ---------------------
  ** Expected output:**
   {
            "_id": "65648ada38dbd873caee10c0",
            "title": "water the plant",
            "description": "you need to water the plant",
            "assignedUser": "6563950a8c3dd4c035e6dc30",
            "dueDate": "2023-11-26T00:00:00.000Z",
            "completionStatus": "not completed",
            "createdAt": "2023-11-27T12:26:02.065Z",
            "updatedAt": "2023-11-27T12:26:02.065Z",
            "__v": 0
   }

   Get tasks created in last 7 days:
   -------------------------------------
 **  Expected output:**
   {
            "_id": "65648ada38dbd873caee10c0",
            "title": "water the plant",
            "description": "you need to water the plant",
            "assignedUser": "6563950a8c3dd4c035e6dc30",
            "dueDate": "2023-11-26T00:00:00.000Z",
            "completionStatus": "not completed",
            "createdAt": "2023-11-27T12:26:02.065Z",
            "updatedAt": "2023-11-27T12:26:02.065Z",
            "__v": 0
   }

   Get task with particular ID:
   ---------------------------
   **Expected output:**
   "success": true,
    "task": {
        "_id": "65648ada38dbd873caee10c0",
        "title": "water the plant",
        "description": "you need to water the plant",
        "assignedUser": "6563950a8c3dd4c035e6dc30",
        "dueDate": "2023-11-26T00:00:00.000Z",
        "completionStatus": "not completed",
        "createdAt": "2023-11-27T12:26:02.065Z",
        "updatedAt": "2023-11-27T12:26:02.065Z",
        "__v": 0
    }

   Create task by admin:
   ----------------------
** Input parameters:**
   {
   "title":"water the plant", "description":"you need to water the plant", "assignedUser":"6563950a8c3dd4c035e6dc30", "dueDate":"2023-11-26", "completionStatus":"not completed"
}
**Expected output:**
"success": true,
    "task": {
        "title": "water the plant",
        "description": "you need to water the plant",
        "assignedUser": "6563950a8c3dd4c035e6dc30",
        "dueDate": "2023-11-26T00:00:00.000Z",
        "completionStatus": "not completed",
        "_id": "65648ada38dbd873caee10c0",
        "createdAt": "2023-11-27T12:26:02.065Z",
        "updatedAt": "2023-11-27T12:26:02.065Z",
        "__v": 0
    }

Update task by admin:
---------------------

**Input parameters:**
{
   "title":"water the red plant", "description":"you need to water the red plant", "assignedUser":"6563950a8c3dd4c035e6dc30", "dueDate":"2023-11-28", "completionStatus":"not completed"
}

**Expected output:**
"result": "Details updated"

Delete task by admin
--------------------
**Expected output:**
{success: true, message: "task deleted successfully"}


**How to run the application:**
It is same as how you run any other node.js application. 
**Prerequisites:**
Visual studio code or any other similar tool
postman or any other similar tool
node js
mongodb

**Steps:**
1. You can open this in file downloaded in any development tool like visual studio code etc.,
2. Run the application with the command node server(mainfile name)
3. You will get the message as "server started" and "DB connected"
4. You can test the APIs in any tool like postman etc., to run and get the desired output.

Thank you! Happy Coding!!!

   
