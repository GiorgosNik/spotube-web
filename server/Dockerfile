# Use an official Ubuntu runtime as a parent image
FROM ubuntu:latest

EXPOSE 8000

ARG  SPOTIFY_CLIENT_ID
ARG  SPOTIFY_CLIENT_SECRET
ARG  GENIUS_API_KEY
ARG  SONG_NUMBER_LIMIT

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

# Set environment variablesd
ENV SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID}
ENV SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET}
ENV GENIUS_API_KEY=${GENIUS_API_KEY}
ENV SONG_NUMBER_LIMIT=${SONG_NUMBER_LIMIT}

# Specify the command to run on container start
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "server.wsgi:application"]
