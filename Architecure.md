# Architecture

The Talent Lens application follows a modular microservice architecture where different services communicate with each other to provide functionality. Below is an overview of the key components and how they interact:


## Frontend
- **Technology Stack**: React, JavaScript/TypeScript 

</br>
<img src="https://skillicons.dev/icons?i=react,javascript,typescript,bootstrap,scss" />
</br>
The Frontend communicates with services over HTTP:
- **Platform Service**: Handles user authentication, authorization, and security state.
- **Upload Files Service**:  Manages file uploads. The frontend uploads files to this service, which then validates them using JWT for security.

## Platform Service
- **Technology Stack**: Go

</br>
<img src="https://skillicons.dev/icons?i=go,sqlite,postgres" />
</br>

The Platform Service is built with Go and uses the Echo framework. It is designed to handle authentication and authorization with JWT for securing user sessions.

## Upload Files Service
- **Technology Stack**: C#

</br>
<img src="https://skillicons.dev/icons?i=cs,rabbitmq,mongodb" />
</br>

The Upload Files Service is written in C#, using HTTP for communication with the frontend and RabbitMQ for inter-service communication. This service is responsible for receiving file uploads, validating them, and storing them in MongoDB.
- Receiving files from the frontend, verifying the JWT token, and saving the files to MongoDB using a file-job structure.
- Communicating with the Text Extraction Service via RabbitMQ to process the files and extract relevant data for further analysis.


## Text Extraction Service
- **Technology Stack**: C#

</br>
<img src="https://skillicons.dev/icons?i=cs,rabbitmq,mongodb" />
</br>

It listens for file-processing requests sent by the Upload Files Service via RabbitMQ, performs normalize data, and passes data to the Rank Text Service.

## Rank Text Service
- **Technology Stack**: C#

</br>
<img src="https://skillicons.dev/icons?i=cs,rabbitmq,mongodb" />
</br>

The Rank Text Service is implemented in C# and leverages machine learning techniques to classify and rank skills in resumes. It receives data from the Text Extraction Service, processes it, and classifies the content into soft and hard skills.

## Database
- SQLite/Postgres: Stores user-related information, authentication data.
- MongoDB: Stores uploaded files and job data using a file-job structure.