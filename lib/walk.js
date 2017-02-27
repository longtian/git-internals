const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const util = require('util');

const PATH = '/tmp/zipp';

const log = obj => console.log(util.inspect(obj, {
  colors: true,
  depth: 10
}));

// [ '24260a00dfb2b93a879a91e7c6a2e75e588a83e2',
// '36b30ed7b5125bc37f8202a2f2cb607ffac6dbd0',
// 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391' ]
const objects = [].concat(...
  fs
    .readdirSync(path.join(PATH, '.git/objects'))
    .filter(i => i.length === 2)
    .map(p => fs.readdirSync(path.join(PATH, '.git/objects', p)).map(l38 => p + l38)));


const catFile = (type, id) => execSync(`git cat-file -${type} ${id}`, {
  cwd: PATH
}).toString();


const result = objects.map(id => ({
  id,
  type: catFile('t', id).trim(),
  content: catFile('p', id)
}));

log(result);
// [ { id: '083233d2e44e5d9e5336fb00137223d16036b45f',
//   type: 'tree',
//   content: '100644 blob 3bacc67e168e760505434b5877059dd7ef00b56d\tt1.txt\n100644 blob 9bc7ad0d42bb3581c31ef220203f8d951552b94f\tt2.txt\n' },
//   { id: '24260a00dfb2b93a879a91e7c6a2e75e588a83e2',
//     type: 'tree',
//     content: '100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391\tt1.txt\n' },
//   { id: '36b30ed7b5125bc37f8202a2f2cb607ffac6dbd0',
//     type: 'commit',
//     content: 'tree 24260a00dfb2b93a879a91e7c6a2e75e588a83e2\nauthor yan <wyvernnot@gmail.com> 1488190025 +0800\ncommitter yan <wyvernnot@gmail.com> 1488190025 +0800\ngpgsig -----BEGIN PGP SIGNATURE-----\n Version: GnuPG v1\n \n iQIcBAABCAAGBQJYs/pJAAoJEJ9HtYg3HCnqYTsQAI4jVd2h0obHN8Q5KKYG2ulF\n FFziC7U1x+wgOeT3nehmyjHiI9NFxRUaKzX8PhEKEctfu/7l2ZwZsCd9n39aMxhl\n cOlebDaNOGZzj/1eb6oaTAusCDalooQkrtlGgqgosavYX9nE1ezCFHjVr45tSAMS\n BSnre054LzIDtjjX+ZPc9hm2PuA9gAE6SBVcK550Y43asoeRIlw+X/lojmpqSFPD\n l0Ca2dWWHVq1IJ5mMJoydGU0PJWTGxyf0MnA7Ti5sFZW0RGXNzzfb9QIN2pToJtJ\n PQZsxm5lRHyskhBjKtRzuMXfFdZ9DKFWMd1WY6hZJJk9JJ6R8asCCeiI4PbyfBq4\n In1Kd7lr8O8FEoc/zd+Rw+0J0da22iZrhRPtlJfF/SGD7eLrCDHNvQdhtJCPbnEh\n 8Zdr1yTVMJ2DbQ91bcK3h7OM+KlObKQjZdHg8NL0jbz/K4LwbeRdaS/Aa7Unhq7f\n UlslDBkPIbY5vgMsqFM14cXUp9NF09miyEHCPs4zQkUb9sNNyoWttz76NAKm2jTY\n IcTR2WKbmDFlEQBTSEmS5IPbOeycCB9+R5i3vpKEFYudW4qzEnmtopDICTtD1mvl\n TYLWjp1fztWQEjPMPzc8FCdk+7mGRdKF/DoN+GWw74ZkYOUTc1kLYp3Fl7XrPQGm\n 9nVgOFpf3+gja+tgemoi\n =hued\n -----END PGP SIGNATURE-----\n\nm1\n' },
//   { id: '3bacc67e168e760505434b5877059dd7ef00b56d',
//     type: 'blob',
//     content: 'content-1\n' },
//   { id: '55811b543b983211e928c04c3317156a29cc7c4c',
//     type: 'commit',
//     content: 'tree 083233d2e44e5d9e5336fb00137223d16036b45f\nparent 36b30ed7b5125bc37f8202a2f2cb607ffac6dbd0\nauthor yan <wyvernnot@gmail.com> 1488191674 +0800\ncommitter yan <wyvernnot@gmail.com> 1488191674 +0800\ngpgsig -----BEGIN PGP SIGNATURE-----\n Version: GnuPG v1\n \n iQIcBAABCAAGBQJYtAC6AAoJEJ9HtYg3HCnqMcYP/0iZGvzmCLv5G7HMNqEHgX6g\n WyEt8H+zwKWrvxRZwu3d8DUeLL4u4YCNfdobII76OK3vUxbOwnPYYr9FZf7hIfNe\n yJHiy3/1MFVmRmj+3nyYMqOjs554poIWuQYw8lTrSEv3cbFgDaxxrexBlnAiCBbH\n lIDe5YVwLRV+GqcWEPhNATBNx9maASDOfiQNWBkNUi+D/JIf0AesHhQh2BJoZQ+h\n 7w8WizN8UlaafnrQEeTC/UhDvrdVLc+IXByMeFTp/zkjB/9KF+fWZzoqFhwppU8t\n dJYu1LyhAxhjJYTwW7T3tnI/4X1NJSivf4nbUAsonEpQYGKe3hxP134nML/1t4UP\n 8ITfLvjje6AVtK7p7Fg9+SPK0LPSr4T1f75kOE/DOWfa2dIgtyj0Rs/gu0cFKlQY\n GgExBWdkyhpmpI+/HMXgBks1nUvNINJmINXzTcjyxVfvKrchbCqHmj7u91QUgljv\n naYeaxcMjKPPjQ8rPPbc+rv1kNuLtcCAmhW8fenjx3dASGlmsavkKzHVts4/bYui\n CtDayHo8yuzhUZPmerqf1Oyul8+Wz+RJf/sxKYqyVzjEzUGCjVGsdCk6rEgq3SuT\n bUJKHSUmRskV7HshK5zmvc+tMLxE1EzvT+iBEbaUF6ZuvmVDKjaL4kU7cZPRuGXX\n KC0QE8+HvgLJhEEUQ22q\n =SiJJ\n -----END PGP SIGNATURE-----\n\nm2\n' },
//   { id: '9bc7ad0d42bb3581c31ef220203f8d951552b94f',
//     type: 'blob',
//     content: 't2\n' },
//   { id: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
//     type: 'blob',
//     content: '' } ]
