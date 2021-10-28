// const element = (
//   <div title="Outer div">
//     <h1>Hello World</h1>
//   </div>
// );
//
// ReactDOM.render(element, document.getElementById('contents'))

const continents = [
  'Africa', 'America', 'Asia', 'Australia', 'Europe'
]

const helloContinents = Array.from(continents, continent => `Hello ${continent}!`)
const message = helloContinents.join(' ')

const element = (
  <div title="outer div">
    <h1>{message}</h1>
  </div>
)

ReactDOM.render(element, document.getElementById('contents'))
