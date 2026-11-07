# Abubeker Hussen — Portfolio

A static HTML, CSS, and JavaScript portfolio website served with Nginx in Docker.

## Run locally with Docker

Install Docker Desktop (Windows/macOS) or Docker Engine (Linux) from
[Docker's installation guide](https://docs.docker.com/get-docker/), then open a
terminal in this project directory.

Build the image:

```sh
docker build -t my-portfolio .
```

Start the container:

```sh
docker run --rm -p 10000:10000 my-portfolio
```

Open [http://localhost:10000](http://localhost:10000). Stop the container with
`Ctrl+C`.

## Deploy to Render

1. Push this project to a Git repository.
2. In the Render dashboard, choose **New +** → **Web Service** and connect the
   repository.
3. Select **Docker** as the runtime. If the Dockerfile is in a subdirectory,
   set **Root Directory** to that directory.
4. Create the Web Service. Nginx listens on port `10000`, which Render supports
   for Docker-based Web Services.

Render builds the image from the `Dockerfile` and serves the static site through
Nginx. No build command, start command, or backend service is required.

## Project files

- `index.html` — homepage
- `style.css` — website styles
- `myscript.js` — website interactions
- `Dockerfile` and `nginx.conf` — production static-site container setup
