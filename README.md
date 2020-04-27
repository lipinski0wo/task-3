# Acoustic coding test

Hi :) 

npm install

npm run start

npm run test

## Motivation

As recommended by the tasks, I used React

I decided to use Router to keep the URL clean (/weirdurl -> /)

I used Redux-Thunk to make it easier for me to pass information between components (components/fixed/Message and components/fixed/Loading that are of general use). It enables faster work and allows separation of code.

I decided to use only reack hooks because of their simplicity. And I just like them :)

## Description

In the App.js file it adds the most important things like store, router, and reference to components/article/Article component

In it, after installation, the initialization method is fired. Thanks to that we get information about article.

Loading information is displayed when making initial api call (components/fixed/Loading)

There is also a way to inform the user about errors that have occurred (components/fixed/Message)

After obtaining data from the server, the data is stored in redux
