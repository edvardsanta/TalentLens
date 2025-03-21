import os
import sqlite3
import subprocess

DB_FILE = "config.db"
TABLE_NAME = "settings"
JWT_SECRET_KEY = "jwt_secret"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(
        f"""
        CREATE TABLE IF NOT EXISTS {TABLE_NAME} (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        )
        """
    )
    conn.commit()
    conn.close()


# Function to save a value in the database
def save_to_db(key, value):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(
        f"INSERT OR REPLACE INTO {TABLE_NAME} (key, value) VALUES (?, ?)", (key, value)
    )
    conn.commit()
    conn.close()


# Function to retrieve a value from the database
def get_from_db(key):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(f"SELECT value FROM {TABLE_NAME} WHERE key=?", (key,))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None


# Initialize DB
init_db()

# Retrieve JWT secret or ask user
jwt_secret = get_from_db(JWT_SECRET_KEY)
if not jwt_secret:
    jwt_secret = input("Enter the JWT Secret: ").strip()
    save_to_db(JWT_SECRET_KEY, jwt_secret)

# Function to generate the environment file for a project
def generate_env_file_from_app_settings(project_name, config):
    env_file_path = f".env.{project_name}"

    # Prevent overwriting existing .env files without confirmation
    if os.path.exists(env_file_path):
        overwrite = (
            input(f"File {env_file_path} already exists. Overwrite? (y/n): ")
            .strip()
            .lower()
        )
        if overwrite != "y":
            print(f"Skipping {project_name}")
            return

    env_content = ""

    # Generate RabbitMq settings
    rabbitmq = config.get("RabbitMq", {})
    env_content += f"RABBITMQ__URI={rabbitmq.get('Uri', '')}\n"
    env_content += f"RABBITMQ__USERNAME={rabbitmq.get('Username', '')}\n"
    env_content += f"RABBITMQ__PASSWORD={rabbitmq.get('Password', '')}\n"

    # Handle multiple queue names dynamically
    for key, value in rabbitmq.items():
        if "Queue" in key:
            env_content += f"RABBITMQ__{key.upper()}={value}\n"

    # Generate MongoDB settings
    mongodb = config.get("MongoDb", {})
    env_content += f"MONGODB__CONNECTIONSTRING={mongodb.get('ConnectionString', '')}\n"
    env_content += f"MONGODB__DATABASENAME={mongodb.get('DatabaseName', '')}\n"
    env_content += f"MONGODB__USERNAME={mongodb.get('Username', '')}\n"
    env_content += f"MONGODB__PASSWORD={mongodb.get('Password', '')}\n"

    for collection_name, collection_value in mongodb.get("Collections", {}).items():
        env_content += f"MONGODB__{collection_name.upper()}={collection_value}\n"

    # Generate Logging settings if available
    logging = config.get("Logging", {}).get("LogLevel", {})
    for level_name, level_value in logging.items():
        env_content += f"LOGGING__{level_name.upper()}={level_value}\n"

    # Generate JWT settings if available
    jwt_secret = config.get("Jwt-Secret", "")
    if jwt_secret:
        env_content += f"JWT_SECRET={jwt_secret}\n"

    # Write any other top-level settings dynamically
    for key, value in config.items():
        if key not in ["RabbitMq", "MongoDb", "Logging", "Jwt-Secret"]:
            env_content += f"{key.upper()}={value}\n"

    # Write the content to the .env file
    with open(env_file_path, "w") as env_file:
        env_file.write(env_content)
    print(f"Generated .env file for {project_name} at {env_file_path}")


def generate_frontend_env():
    frontend_env_path = ".env"

    frontend_env = {
        "VITE_UPLOADFILES_API": "http://localhost:8081",
        "VITE_RequestTime": "300000",
        "VITE_AMBIENT": "local",
        "VITE_MAXFILES_UPLOAD": "10",
        "VITE_UPLOADFILES_WEBSOCKET": "ws://localhost:5095/ws",
        "VITE_PLATFORM_API_URL": "http://localhost:8080",
        "VITE_APP_AUTH_STRATEGY": "api",
        "VITE_APP_NAME": "Talent Lens",
    }

    env_content = "\n".join([f"{key}={value}" for key, value in frontend_env.items()])

    with open(f"./frontend/{frontend_env_path}", "w") as env_file:
        env_file.write(env_content)
    print(f"Generated frontend .env file at {frontend_env_path}")


def generate_platform_service_env():
    """Generate an .env file with the given configuration."""
    filename = "./platform-service/.env"
    if os.path.exists(filename):
        overwrite = (
            input(f"File {filename} already exists. Overwrite? (y/n): ").strip().lower()
        )
        if overwrite != "y":
            print(f"Skipping {filename}")
            return
    platform_config = {
        "DB_CONNECTION_STRING": "teste.db",
        "DB_DRIVER": "sqlite",
        "JWT_SECRET_KEY": jwt_secret,
        "ALLOWED_ORIGINS": "*",
        "SERVICE_NAME": "talent_lens",
        "SERVICE_VERSION": "1.0.0",
        "OTEL_SDK_DISABLED": "true",
    }

    env_content = "\n".join([f"{key}={value}" for key, value in platform_config.items()])

    with open(filename, "w") as env_file:
        env_file.write(env_content + "\n")

    print(f"Generated {filename}")


projects = {
    "ranktext": {
        "RabbitMq": {
            "Uri": "rabbitmq",
            "QueueName": "rank-text-queue",
            "Username": "admin",
            "Password": "admin123",
        },
        "MongoDb": {
            "ConnectionString": "mongodb://mongodb:27017",
            "DatabaseName": "test",
            "Username": "admin",
            "Password": "password",
            "Collections": {"Files": "files", "Jobs": "jobs"},
        },
    },
    "textextraction": {
        "RabbitMq": {
            "Uri": "rabbitmq",
            "ProcessTextQueue": "text-queue",
            "RankTextQueue": "name_identifier_queue",
            "Username": "admin",
            "Password": "admin123",
        },
        "MongoDb": {
            "ConnectionString": "mongodb://mongodb:27017",
            "DatabaseName": "test",
            "Username": "admin",
            "Password": "password",
            "Collections": {"Files": "files", "Jobs": "jobs"},
        },
    },
    "upload_files": {
        "Logging": {
            "LogLevel": {"Default": "Information", "Microsoft.AspNetCore": "Warning"}
        },
        "AllowedHosts": "*",
        "RabbitMq": {"Uri": "rabbitmq", "Username": "admin", "Password": "admin123"},
        "MongoDb": {
            "ConnectionString": "mongodb://mongodb:27017",
            "DatabaseName": "test",
            "Username": "admin",
            "Password": "password",
            "Collections": {"Files": "files", "Jobs": "jobs"},
        },
        "Jwt-Secret": jwt_secret,
    },
}

# Generate .env files for each project
if __name__ == "__main__":
    generate_frontend_env()
    for project_name, config in projects.items():
        generate_env_file_from_app_settings(project_name, config)
    generate_platform_service_env()
    print("Starting Docker Compose...")
    subprocess.run(["docker-compose", "-f", "compose.yaml", "up", "-d", "--build"])
