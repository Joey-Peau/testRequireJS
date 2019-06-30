// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app",
      "characters": "../characters",
      "panels": "../panels",
      "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
      "jquery-ui": "https://code.jquery.com/ui/1.12.1/jquery-ui.min"
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);
