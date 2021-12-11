# Expo Typescript Template

A quick template for using Typescipt and Expo with React Native. _NOTE: This template does not support native code._

# Table of Contents
  - [Prerequisites & Setup](#prerequisites-and-setup)
  - [General Structure](#structure)

## Prerequisites and Setup
### Before You Get Started
1. You will need to have `node` installed.
    - [Node](https://nodetsx.org/en/)

### Project Setup Steps
  You will need to run the `init` script which will install all the necessary items in order to run the project. This will include all the node modules and cli tools.

  At the root project directory level run the following command:
  ```bash
  sh ./bin/init.sh
  ```    
## Running The Project
To run the TS codebase, run for desired platform:

For iOS:
```bash
yarn start:ios
```

For Android:
```bash
yarn start:android
```

## Structure
### Features
This template is already setup and includes: 
  * Testing with Jest
  * Precommit Hooks
  * Linting and Prettier
  
### Screens
A screen is a "route" which will be added to the Stack navigator. Each screen could have its own screens folder.
The structure of each folder should be as follows:
1. `index.tsx`
2. `presenter.tsx`
    * The main logic and export of the component.
3. `styled.tsx`
    * Any internal styled `emotion` components and stylesheets the `presenter.tsx` file may use.
    * NOTE: Avoid the `react-native/StyleSheet` if possible.
#### Nested Folders:
Each specific `screen` folder should mimic the root level (`src`) folder, for any screen-specific needs. For example:
- `components`: If there are any modular components that are specific to this screen's presenter.