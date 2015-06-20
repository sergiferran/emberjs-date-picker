# Emberjs-date-picker

With this component you'll be able to build a date picker in ember binding values

[Live demo](http://sergiferran.webcindario.com/async-button/index.html)

## Sample Code

`{{date-picker value="today" formatIn="DD/MM/YYYY" formatOut="ddd, MM-DD-YYYY" color="#444" minValue=minValueBound maxValue=maxValueBound isFlipped=false}}`

This code will show a text with a date, and if is click, will show a date picker:

* `value` string with date in format of formatIn. You can pass a `date` param instead with a Date object bound
* `formatIn` format for input
* `formatOut` format for output
* `color` color for text and background of date picker
* `minValue` limit to don't allow to user choose a date before than that value. Should be a Date Object
* `maxValue` limit to don't allow to user choose a date after than that value. Should be a Date Object
* `isFlipped` if true, the date picker will appear on top of the text, otherwise, it will appear below


### Currently I'm using bootstrap to styles, but is not need it if you want, you can apply the style you want

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).