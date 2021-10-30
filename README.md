# MERN

Learning MongoDB, Express, React, and Node to become full stack software engineer. 

👉Following this book: https://github.com/vasansr/pro-mern-stack-2

# Chapter 2: Hello World

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

# Chapter 3: React Components

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

## Day4

### JavaScript: [Regular Expression](https://github.com/Asabeneh/30-Days-Of-JavaScript/blob/master/12_Day_Regular_expressions/12_day_regular_expressions.md)

Two important things:
- patterns: the text you want to match
- flag:
  - g: global search
  - i: case insensitive
  - m: multiline search

```js
// create a RegExp
let pattern = 'love'
let flag = 'gi'
let regExp = new RegExp(pattern, flag)

// or manually creating: /{pattern}/{flag}
let regExp = /love/gi

// RegExp method
let line = "I love coding"
regExp.test(line)         // reture true if pattern exists
regExp.search(line)       // reture the index of pattern start-bit in line
regExp.match(line)        // 
```

- []: a set of characters
- ^: start with
- $: end with
- *: zero or more times
- +: one or more times
- ?: zero or one times
- {3}: exactly 3 characters
- {3,}: 3 or more characters
- {3,5}: 3 to 5 characters
- |: either or 不是就是

### React: Passing data using `this.props`

```js
class IssueRow extends React.Component {
  render() {
    const style = this.props.rowStyle
    return (
      <tr>
        <td style={style}>{this.props.issue_id}</td>        // this.props.issue_id will be set while instantiation
        <td style={style}>{this.props.issue_title}</td>
      </tr>
    )
  }
}

class IssueTable extends React.Component {
  render() {
    const rowStyle = {border: "1px solid silver", padding: 4}
    return (
      <table style={{borderCollapse: "collapse"}}>    // Note that there are double curly brace
        <thead>
          <tr>
            <th style={rowStyle}>ID</th>
            <th style={rowStyle}>Title</th>
          </tr>
        </thead>
        <tbody>
          // Note that use the props name(in IssueRow) to passing value
          <IssueRow rowStyle={rowStyle} issue_id={1} issue_title="Error in console when clicking Add" />
          <IssueRow rowStyle={rowStyle} issue_id={2} issue_title="Missing bottom border on panel" />
        </tbody>
      </table>
    )
  }
}
```

#### Exercise: Passing Data Using Props

1. We don't use `border=1` this syntax to set the style, we use key/value syntax
2. `style={objectVariable}` is a valid way to pass value to attributes.
   `style={{borderCollapse: "collapse"}}` the inner curly brace encapsulates the css setting as an Object
3. Know nothing about PHP....

### React: Passing Data Using Children

`this.props.children` can access the content wrapped by the React component. 
So it gives more flexible to setting the style of the content.

```js
class IssueRow extends React.Component {
  render() {
    const style = this.props.rowStyle
    return (
      <tr>
        <td style={style}>{this.props.issue_id}</td>
        <td style={style}>{this.props.children}</td>
      </tr>
    )
  }
}

class IssueTable extends React.Component {
  render() {
    const rowStyle = {border: "1px solid silver", padding: 4}
    return (
      <table style={{borderCollapse: "collapse"}}>
        <thead>
          <tr>
            <th style={rowStyle}>ID</th>
            <th style={rowStyle}>Title</th>
          </tr>
        </thead>
        <tbody>
          <IssueRow rowStyle={rowStyle} issue_id={1}>Error in console when clicking Add</IssueRow>
          <IssueRow rowStyle={rowStyle} issue_id={2}>
            <div>Missing <b>bottom</b> border on panel</div>
          </IssueRow>
        </tbody>
      </table>
    )
  }
}
```

#### Exercise: Passing Data Using Children

1. We would use `this.props.children` when passing data to the content of some style wrapping component. 
Then it allows us to use the `React.component` like a tag wrapper.

#### Exercise: Dynamic Composition

1. Maybe create time stamp? Time stamp is probably identical.
2. Because we want to create several different `issueRows` by using `map()`,
    otherwise we would hardcode each `IssueRow` content
3. It works well.

# Chapter4: React State

