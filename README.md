# MoonbeltEventManagement
## Solution Approach:
Created .Net Core Web API and Angular front end application using the API.

## DB Set Up Steps

* Please copy the checkout Moonbelt.mdf and Moonbelt_log files and place them here C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA folder

* Open the Scripts file "Scripts.sql" and run the scripts

Note: If the Moonbelt.mdf and Moonbelt_log files are placed elsewhere please make sure to edit the location in "Scripts.sql" before running it.

## Visual Studio Steps

* Git clone or download the project - https://github.com/archanabattini/MoonbeltEventManagement.git

* Open the solution in Visual studio, in appsettings.json file, modify the ConnectionStrings

* Build and Run the solution, Swagger documentation of API will be displayed

* Please make a note of the port displayed

## Angular Front-end Application Steps

* Open MoonbeltPartyManagerApp/src/proxy.conf.json file

* Please change the target port to your backend port number noted above

* Make sure you install node and npm

* In Commandprompt go to the folder MoonbeltPartyManagerApp and run the commands 

* npm install

* Run the application

* ng serve





