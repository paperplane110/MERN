# 30 Days of JavaScript Learning Note

Reference 👉: https://github.com/Asabeneh/30-Days-Of-JavaScript

## Day15

### Initialization: 
- use `constructor()` method
- use `this.attributes` to access attributes

```javascript
class Person {
  constructor(firstName: String, lastName: String) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
```

### getter

```javascript
class Person {
  constructor(firstName: String, lastName: String) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  get getFirstName() {
    return this.firstName;
  }
}

student = new Person('Severin', 'Lemaignan')

console.log(student.getFirstName)   // Note that there is no parathesis
```

### setter

```javascript
class Person {
  constructor(firstName: String, lastName: String, age: Number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  get getFirstName() {
    return this.firstName;
  }
  set setAgeAdd(years) {
    this.age += years;
  }
}
```

### Inherit

```javascript
class Person {
  constructor (firstName: String, lastName: String, age: Number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}

class Student extends Person {
  constructor(firstName, lastName, age, grade) {
    super(firstName, lastName, age)
    this.grade = grade
  }
}

```