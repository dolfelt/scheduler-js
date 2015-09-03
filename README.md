## SchedulerJS

A simple [Mithril](https://lhorie.github.io/mithril/) application using ES6 modules for structure and future compatibility. All code is compiled to be ES5 compatible using [Browserify](http://browserify.org/) and [Babel](https://babeljs.io/).

### Installing

To begin, install the NPM dependencies.

```bash
npm install -g gulp
npm install
```

Rename `config.example.js` to `config.js` and change any values as necessary.
```bash
cp config.example.js config.js
```

Then run:

```bash
gulp serve
```

This will compile all the code an start a local web service. Visit [http://localhost:8080](http://localhost:8080) in your browser.

### Challenges

This is an example application attempting to structure Mithril, or any micro JS framework, into a large single-page application that scales.

Challenges include:
* Determining global state and configuration (FLUX-like).
* Storing data models and forming relationships.
* Accommodating complex UI/UX designs.

### Contributing

Contribute at will! :+1:
