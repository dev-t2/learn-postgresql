const tuple: [string, number] = ['hello', 1];

console.log(tuple[0].toUpperCase());
console.log(tuple[1]);

const list: [number, string][] = [
  [1, 'Steve'],
  [2, 'Bill'],
  [3, 'Jeff'],
];

console.log(list);

list.push([4, 'New Name']);

console.log(list);
