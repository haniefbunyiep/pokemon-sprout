export default function FirstCapital(name: string): string {
  const splitName = name.split('');

  let result = [];

  for (let i = 0; i < splitName.length; i++) {
    if (i === 0) {
      result.push(splitName[i].toUpperCase());
    } else {
      result.push(splitName[i]);
    }
  }

  return result.join('');
}
