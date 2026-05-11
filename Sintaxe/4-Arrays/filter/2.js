console.clear()

const users = [
  {name: 'John', age: 20, active: true},
  {name: 'Jane', age: 21, active: false},
  {name: 'Jim', age: 22, active: true},
  {name: 'Jill', age: 23, active: false},
  {name: 'Jack', age: 24, active: true},
  {name: 'Jill', age: 25, active: false},  
]

const usersActive = users.filter((user) => user.active);

console.debug(usersActive);