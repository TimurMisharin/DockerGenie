
# DockerGenie: Dockerfile Generator VSCode Extension

![DockerGenie Logo](/src/images/icon.png)

DockerGenie is a Visual Studio Code extension that leverages the power of OpenAI's GPT-3.5-turbo to automatically generate Dockerfiles. This AI-powered tool simplifies the process of Dockerizing your applications.

## Features

- Automatically generate Dockerfiles using AI.
- User-friendly interaction with GPT-3.5-turbo for custom Dockerfile content.
- Supports various configurations for Dockerfile generation.

## Installation

1. Open **Visual Studio Code**
2. Press `Ctrl+P` to open the Quick Open dialog
3. Type `ext install your-vscode-namespace.docker-genie` into the textbox and press enter
4. Reload Visual Studio Code

> Replace `your-vscode-namespace` with your actual Visual Studio Code namespace.

## Usage

### Generate Dockerfile

To generate a Dockerfile:

1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to open the Command Palette.
2. Type "Generate Dockerfile" and hit enter.
3. An Input box will appear. Here, you are supposed to provide your specific requirements for the Dockerfile. 

    You need to describe your application's environment, such as the programming language, framework, version, and any special setup you need. DockerGenie will use this information to instruct the GPT-3.5-turbo model for generating your Dockerfile. 

    For example, if you are developing a Python 3 application using Flask framework, you could type in something like: "Python 3 application using Flask framework. I need to include gunicorn as my WSGI HTTP server." After you finish, hit enter.

The DockerGenie will then communicate with the GPT-3.5-turbo model and come up with a Dockerfile that suits your needs.

> Remember that the more specific and detailed you are in your description, the more accurate your generated Dockerfile will be.

## Running Example

Let's say we want to generate a Dockerfile for a Python 3 application with Flask. Here's how you can do it:

1. Press `Ctrl+Shift+P` to open the Command Palette.
2. Type "Generate Dockerfile" and hit enter.
3. In the Input box, type "Python 3 application with Flask and Gunicorn" and hit enter.

Voila! DockerGenie generates a Dockerfile as per your specifications:

```Dockerfile
# Base Image
FROM python:3

# Install Flask and Gunicorn
RUN pip install flask gunicorn

# Copy the application
COPY app.py /app/

# Set the working directory
WORKDIR /app

# Set the Flask app environment variable
ENV FLASK_APP=app.py

# Expose the application on port 5000
EXPOSE 5000

# Run the application
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
```

## Contributing

We appreciate your contributions! Whether it's a bug report, new feature, correction, or additional documentation, we welcome your issues and pull requests.

## Feedback & Contributing

- If you find a bug or want a new feature, please [create an issue](https://github.com/TimurMisharin/DockerGenie/issues).
- If you want to contribute, please feel free to [create a pull request](https://github.com/TimurMisharin/DockerGenie/pulls).

## License

This project is licensed under the terms of the [MIT license](LICENSE).


---

Happy Dockerizing with DockerGenie