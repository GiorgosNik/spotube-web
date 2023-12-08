# Use an official Ubuntu runtime as a parent image
FROM ubuntu:latest

# Set environment variables
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
        python3.11 \
        python3.11-dev \
        python3-pip \
        ffmpeg \
        && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install Python dependencies
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Specify the command to run on container start
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "server.wsgi:application"]
