# MERN

Learning MongoDB, Express, React, and Node to become full stack software engineer. 

👉Following this book: https://github.com/vasansr/pro-mern-stack-2

# Chapter 1: Hello World

## Day1

### nvm

```shell
nvm install 10  // install node@10
nvm use 10      // use node@10
```

### React

```js
const element = React.createElement('tag', {setting}, React.createElement(''))
ReactDom.render(element, document.getElementById('...'))
```

## Day2

```shell
npx babel --version   // use npx to run local command in node_modules/.bin

// compile the jsx in src/ and output to public/
npx babel src --presets @babel/react --out-dir public
```

### JavaScript

`Array.from()` is like `map()` in python

- In python

```python
nums = [1, 2, 3, 4]
nums_square = map(lambda x: x*x, nums)
```

- In JavaScript

```js
const nums = [1, 2, 3, 4]
const numsSquare = Array.from(nums, x => x*x)
```

## Day3

### JavaScript

```js
// deconstucting Array
const nums = [1, 2, 3]
let [a, b, c] = nums

// skipping
let [a, , b] = nums
// a=1, b=3

// for rest value
let [a, ...rest] = nums
// rest = [2, 3]
```

### React Class

```js
// To create a react class
class Halo extends React.Component {
  // must has render method
  render() {
    <div></div>
  }
}

// To create instance
const halo = <Halo />

// To mount to html
ReactDOM.render(halo, document.getElementById("halo"))
```

#### Exercise: React Class

1. If there are multiple `<div>` tag parallel in `render()` method, babel will raise SyntaxError.
2. If the element in `ReactDOM.render()` is not exists in html, 
    the error will raise in browser console.

### Composing Components

- Fine-grained small components build a large component
- Component reusing
- Component composition better than inheritance
- Try you best to decouple between different components

```js
class IssueList extends React.Component {
  render() {
    return (
      // use React.Fragment to composing multi-div
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        ...
      </React.Fragment>
    )
  }
}
```

#### Exercise: Composing Components

1. There is no `<React.Fragment>` tag in browser console elements.
    One good thing is that there also no redundant `<div>` in `<div id="content">`