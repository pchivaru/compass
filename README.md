# COMPASS

🚨 The world of emergencies is extremely complex, where each instant is pivotal in life-saving. Therefore, efficient decision-making is critical for a rapid and successful performance in any scenario. 

💡After the recent events in Valencia due to the DANA, Spain, the main problems have come to light in such a demanding situation. The decision-making protocol is not organized, with a lot of information inputs and an inefficient way to have an awareness of the exact resources available and their locations in real-time. After realizing all these problems, the team decided to act in consequence and came up with a solution.

🚒🚑🦺📲Source of the compound intense work from a group of 7 Aerospace Engineering students, COMPASS🧭 was created. The resulting product is an application that offers a reliable, real-time display that will condense all these information inputs in a single place, where the operations command can see what the resources are, what they are doing at that exact moment and be able to communicate with all of them with a single click. This abruptly eliminates information misuse and inefficient communications between the command center and all the deployed assets. 

## What differentiates us? 

📡In addition to the abovementioned, we have an operational prototype that acts as a beacon implementing the Kineis KIM1 Transmitter module. This transmitter is connected to an Arduino UNO board, the brain of the device, which at the same time receives inputs from several built-in sensors like humidity, and temperature... the applications are limitless! All these beacons are deployed from drones dedicated to emergency services in the affected area to monitor the evolution at that specific location or whether the danger has reached a specific place. The added value of these beacons is that the satellites receive information from every inch around the globe, regardless of the connectivity in that particular location, allowing remote areas to be covered in real-time!

![captura_compass](https://github.com/user-attachments/assets/6286b116-c2c9-4efb-92cd-934da0e89770)

## Steps necessary to launch COMPASS
1. Create a ngrok account to create an API gateaway for your domain
2. Create a .env file in the main folder with a variable with the direction of your database URL, such as; DATABASE_URL="mysql://root:root@localhost:3307/compass"
3. run npm install
4. run npm run dev

