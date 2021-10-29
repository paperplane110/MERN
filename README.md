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


