const union1: number | null = null;
const union2: string | null = null;

console.log(union1);
console.log(union2);

type stringFn = () => string;

const print = (x: string | stringFn) => {
  if (typeof x === 'string') return console.log(x);

  console.log(x());
};

print('Hello world');
print(() => 'Bye bye');

type validStrings = 'hello' | 'world';

const validString: validStrings = 'hello';

console.log(validString);
