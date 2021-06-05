interface IProps {
  readonly name: string;
  age: number;
  city?: string;
}

const sayHello = (props: IProps) => {
  console.log(
    `Hello there ${props.name}, you're ${
      props.age
    } years old and live in ${props.city?.toUpperCase()}`
  );
};

sayHello({ name: 'Fernando', age: 37 });
sayHello({ name: 'Fernando', age: 37, city: 'Madrid' });

interface IGreeter {
  (name: string, age: number, city: string): void;
}

const greeterFn: IGreeter = (name: string, age: number, city: string) => {
  console.log(
    `Hello there ${name}, you're ${age} years old and live in ${city?.toUpperCase()}`
  );
};

const asyncFn = (callback: IGreeter) => {
  callback('Fernando', 37, 'Madrid');
};

asyncFn(greeterFn);
