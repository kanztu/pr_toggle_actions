const find = require('find');
const yaml = require('js-yaml');
const fs = require('fs');
const slugify = require('slugify');

((dir) => {
  const input = (name, config) => [
    `#### ${name}`,
    '',
    `${config.description}`,
    '',
    `- required: ${config.required ? 'True' : 'False'}`,
    `- default: ${config.default || 'None'}`,
    '',
    '',
  ].join('\n');

  const example = (repo, data) => {
    const required = Object.keys(data.inputs).map((key) => {
      if (!data.inputs[key].required) {
        return null;
      }
      return `            ${key}: foobar`;
    }).join('\n');

    return [
      'This example has only required inputs, with dummy data',
      '',
      `    ${slugify(data.name, { lower: true })}:`,
      `      name: ${data.name}`,
      '      runs-on: ubuntu-latest',
      '      steps:',
      '        - uses: actions/checkout@master',
      `        - uses: ${repo}@master`,
      `          ${required ? 'with:' : null}`,
      `${required}`,
      '',
      'This example has all possible inputs, with dummy data.',
      '',
      `    ${slugify(data.name, { lower: true })}:`,
      `      name: ${data.name}`,
      '      runs-on: ubuntu-latest',
      '      steps:',
      '        - uses: actions/checkout@master',
      `        - uses: ${repo}@master`,
      '          with:',
      `${Object.keys(data.inputs).map((key) => `            ${key}: foobar`).join('\n')}`,
    ].join('\n');
  };

  const parse = (repo, data) => [
    `# ${data.name} [${data.runs.using} action]`,
    '',
    `${data.description}`,
    '',
    '## Inputs',
    '',
    `${Object.keys(data.inputs).map((key) => input(key, data.inputs[key])).join('')}`,
    '',
    '## Example',
    '',
    `${example(repo, data)}`,
    '',
  ].join('\n');

  const badges = (path, repo) => new Promise((resolve) => {
    find.file(/\.github\/workflows/, path, (files) => {
      const res = files.map((file) => {
        const doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
        return [
          `[![${doc.name}]`,
          `(https://github.com/${repo}/workflows/${encodeURIComponent(doc.name)}/badge.svg)]`,
          `(https://github.com/${repo})`,
        ].join('');
      });
      return resolve(res.join('\n'));
    });
  });

  find.file(/action.ya?ml$/, dir, async (files) => {
    const output = files.map((file) => {
      const path = file
        .replace('/work/', '')
        .replace('/action', '')
        .replace('.yml', '')
        .replace('.yaml', '');

      const doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
      const filename = `${path.replace(/\//gi, '-')}.md`;

      fs.writeFileSync(`/work/docs/${filename}`, parse(path, doc));

      return `- [${doc.name}](./${filename})`;
    });

    const readme = `${dir}/docs/README.md`;
    fs.writeFileSync(readme, `${[
      '# GitHub Actions',
      '',
      'Below is a list of all the available GitHub actions.',
      '',
      await badges(dir, process.env.GITHUB_REPOSITORY),
      '',
      output.join('\n'),
    ].join('\n')}\n`);
  });
})('/work');
