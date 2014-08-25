# Simple Angular Spike


## Installing

This will install all `node_modules` and `bower_components` needed

`
npm install
`

Then update package.json name and run

`
gulp rename
`

## Building

This will run the concatenation build script and inline all html templates
into the template cache.

`
gulp
`

# App Notes

## General Architecture

* Always have a controller per state
* Define state controller in state definition
* Pretty much follow this: [Style Guide by John Papa](https://github.com/johnpapa/angularjs-styleguide)
* Follow these [Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit)
* If you decide on a standard, make a note of it here...