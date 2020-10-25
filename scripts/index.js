const yaml = require('js-yaml');
const fs = require('fs');

// Get document, or throw exception on error
try {
  const doc = yaml.safeLoad(fs.readFileSync('./data/reads.yml', 'utf8'));

  if(!doc || !doc.length) {
    return false;
  }

  let list = '';
  let list2 = '';
  let list3 = '';

  if(doc[0].list && doc[0].list.length) {
    doc[0].list.forEach(item => {
      list += `
    <li>
      <p>
        <span><strong><a href="${item.link}" target="_blank">${item.title}</a></strong></span><br>
        <span>${item.desc}</span>
      </p>
    </li>`

      list2 += `
- [${item.title}](${item.link})
${item.desc}

`

      list3 += `
${item.desc}
${item.link} ${item.handle ? 'via ' + item.handle : ''}
#ui #uidev ${item.hash ? item.hash : ''}

Subscribe to the UI Dev Newsletter here: https://bit.ly/34155z3.

-------------
`
    })
  }

  console.log('~~~~~~~~~~~~~')
  console.log('UI Newsletter')
  console.log('~~~~~~~~~~~~~')

  console.log(`
<h1><a href="${doc[0].link}" target="_blank">UI Dev Newsletter #${doc.length}</a></h1>

<h5><strong>${doc[0].date}</strong></h5>

<ul>
  ${list}
</ul>

<p>Happy coding!</p>
  `);

  console.log('~~~~~~~~~~~~~')
  console.log('UI Post')
  console.log('~~~~~~~~~~~~~')

  console.log(`
${list2}

Happy coding!

[Subscribe to the newsletter here!](https://bit.ly/34155z3)
  `);


  console.log('~~~~~~~~~~~~~')
  console.log('UI Twitter')
  console.log('~~~~~~~~~~~~~')

  console.log(list3);
} catch (e) {
  console.log(e);
}
