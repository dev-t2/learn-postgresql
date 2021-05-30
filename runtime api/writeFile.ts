const encoder = new TextEncoder();
const data = encoder.encode('Hello world');

await Deno.writeFile('hello.txt', data);
