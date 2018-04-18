
![Pipilika Main Search](public/img/logo.png)

# PIPILIKA MAIN SEARCH

A Dynamic Frontend for Pipilika Main Search Module Using Laravel and ReactJS.

## Getting Started

Must Have better understanding of the The PHP Framework Laravel. Laravel is a web application framework with expressive, elegant syntax. Laravel is accessible, yet powerful, providing tools needed for large, robust applications.

React is a JavaScript library for building user interfaces.React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

### Prerequisites

The Laravel framework has a few system requirements.

* PHP >= 7.1.3
* OpenSSL PHP Extension
* PDO PHP Extension
* Mbstring PHP Extension
* Tokenizer PHP Extension
* XML PHP Extension
* Ctype PHP Extension
* JSON PHP Extension

For JS dependency Management:
* NPM >= 3.10

### Installing

Clone the Repo from GITLAB to your server directory

Repo URL: https://gitlab.com/rajesh06/main-search-bootstrap.git. Then update all the dependency using composer.

```
git clone https://gitlab.com/rajesh06/main-search-bootstrap.git
cd main-search-bootstrap
cp .env.example .env
composer install
```
It will take some time to update all those dependency. If you face any problems regarding project key or encoding, try following commands:

```
php artisan key:generate
php artisan config:clear
```

After that, run the following command: 

```
php artisan serve
```
For JS build run these following commands:

```
npm install
npm run prod
```

The product search will be up and running on [http://localhost:8000](http://localhost:8000).

# Environment Variables

This Environment variable can be set in .env file manually. Alternative methods are available for nginx and other servers. Following 
Variables are used to set api path, Database Config etc.

```
APP_ENV (DEFAULT: local)
APP_DEBUG (DEFAULT: TRUE)
APP_URL (DEFAULT: 'http://localhost:8000')

API_BASE (DEFAULT: http://103.84.159.229:9001/PipilikaMainSearchAPI-1.0/search/)
ANALYTICS_BASE (DEFAULT: https://feedbackapi.pipilika.com/)
GOOGLE_ANALYTICS_KEY (DEFAULT: UA-79715104-2)      
```
APP_ENV variable will determine the environment.

### Changing the Default Values

All the default values can be modified in the following file:

```
.env
```
You can copy the .env.example file to .env and set default variables.

### Updating Default Route

You can change the default controller from the following file:
```
/routes/web.php
```

### Docker Container Configuration
Please try to update composer after each time restarting container. This problem may fix later.
```
composer update
```


## Built With

* [Laravel](https://laravel.com/docs/5.6/installation) - The web framework used
* [Composer](https://getcomposer.org/doc/00-intro.md) - Dependency Management
* [ReactJS](https://reactjs.org/docs/hello-world.html) - Javascript Frontend Library
* [NPM](https://docs.npmjs.com/) - JS Dependency Management
* [Bootstrap](http://getbootstrap.com/docs/3.3/) - Styling Framework

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [GITLAB](http://gitlab.org/) for versioning. For the versions available, see the [tags on this repository](https://gitlab.com/pipilika/pipilika-library-client). 

## Authors

* **Rajesh Baidya**

See also the list of [contributors](https://gitlab.com/pipilika/pipilika-library-client/project_members) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Piplika (Bengali Search Engine)
* SUST
