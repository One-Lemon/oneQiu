var x = {
  a: 2,
  b: 4,
  c: 6,
  d: 8
};
let a = 'a';
for (var i in x) {
  console.log(i);
  switch (i) {
    case a:
      console.log(111);
      break;
    case 'b':
      console.log(222);
      break
    default:
      console.log(666);
      break
  }
}
