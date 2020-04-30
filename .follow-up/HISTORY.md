Partir de  :

Setting Up a Babel Project
https://atao60.github.io/es6-tutorial/setup-babel/


mais en utilisant tout de suite Babel 7 sans passer par la version 6.

L'idée est de faire évoluer la configuration le plus tardivement possible, cad
lorsqu'une nouvelle fonctionnalité l'exige. Ainsi par ex. de l'utilisation 
d'un serveur tel que http-server.

Forker https://github.com/ccoenraets/es6-tutorial/ vers https://github.com/atao60

> Le fork se fait sur toutes les branches du dépôt et donc en particulier sur la branche ... "gh-pages" !

## Préalable

Remplacer la partie publique de la clé SSH du compte pierre@station-dev (HP Z420) sur le compta Github atato60
puis :

```bash

cat  ~/.ssh/config
# # atao-web GitHub account
# Host github.com-atao-web
#  HostName github.com
#  User git
#  PreferredAuthentications publickey
#  AddKeysToAgent yes
#  IdentityFile ~/.ssh/atao60.web@gmail.com
 
cat >> ~/.ssh/config << ___eof
# atao60 GitHub account
Host github.com-atao60
 HostName github.com
 User git
 PreferredAuthentications publickey
 AddKeysToAgent yes
 IdentityFile ~/.ssh/id_rsa

___eof

export LC_ALL=C # to get all the console messages in english (°)

### (°) To reset to original language: `unset LC_ALL`

```
## Working sample without Babel

```bash

git clone git@github.com:atao60/es6-tutorial.git ccoenraets-fork-es6-tutorial
# Cloning into 'ccoenraets-fork-es6-tutorial'...
# remote: Enumerating objects: 576, done.
# remote: Total 576 (delta 0), reused 0 (delta 0), pack-reused 576
# Receiving objects: 100% (576/576), 5.70 MiB | 30.00 KiB/s, done.
# Resolving deltas: 100% (271/271), done.

cd ccoenraets-fork-es6-tutorial

code .

git checkout -b init
# Switched to a new branch 'init'

git push -u origin init
# Total 0 (delta 0), reused 0 (delta 0)
# remote: 
# remote: Create a pull request for 'init' on GitHub by visiting:
# remote:      https://github.com/atao60/es6-tutorial/pull/new/init
# remote: 
# To https://github.com/atao60/es6-tutorial.git
#  * [new branch]      init -> init
# Branch 'init' set up to track remote branch 'init' from 'origin'.

git checkout -b step0

mkdir -pv .follow-up

touch .follow-up/HISTORY.md

sed -i 's/htmlFor/for/' index.html # correctif mineur

cat >> .gitignore << ___eof

node_modules
build
.follow-up
___eof

cat > .vscode/settings.json << ___eof
{
    "editor.detectIndentation": false,
    "prettier.tabWidth": 4,
    "vetur.format.options.tabSize": 4
}
___eof

cat > .editorconfig << ___eof
# Editor configuration, see http://editorconfig.org

# top-most EditorConfig file
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 4
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
max_line_length = off
trim_trailing_whitespace = false
___eof

# npx open-cli index.html # not yet an npm package
# # npx : installed 80 in 8.919s

git add .

git commit -m "Working sample without Babel nor Webpack"
# [step0 f7413be] Working sample without Babel nor Webpack
#  1 file changed, 2 insertions(+), 2 deletions(-)

git push -u origin step0
# Counting objects: 5, done.
# Delta compression using up to 4 threads.
# Compressing objects: 100% (4/4), done.
# Writing objects: 100% (5/5), 730 bytes | 730.00 KiB/s, done.
# Total 5 (delta 1), reused 0 (delta 0)
# remote: Resolving deltas: 100% (1/1), completed with 1 local object.
# remote: 
# remote: Create a pull request for 'step0' on GitHub by visiting:
# remote:      https://github.com/atao60/es6-tutorial/pull/new/step0
# remote: 
# To github.com:atao60/es6-tutorial.git
#  * [new branch]      step0 -> step0
# Branch 'step0' set up to track remote branch 'step0' from 'origin'.

git checkout master
# Switched to branch 'master'
# Your branch is up to date with 'origin/master'.

git merge step0
# Updating 6022f53..658b7be
# Fast-forward
#  .editorconfig | 15 +++++++++++++++
#  .gitignore    |  5 ++++-
#  index.html    |  4 ++--
#  3 files changed, 21 insertions(+), 3 deletions(-)
#  create mode 100644 .editorconfig

git push
# Total 0 (delta 0), reused 0 (delta 0)
# To github.com:atao60/es6-tutorial.git
#    6022f53..658b7be  master -> master


```

OK la page s'ouvre correctement dans un nouvel onglet

## Working sample with Babel 7

Cf. http://atao60.github.io/es6-tutorial/setup-babel/

```bash

git checkout -b step1
# Switched to a new branch 'step1'

npm init -y
# Wrote to /home/pierre/DevSpace/webpack-explo/ccoenraets-fork-es6-tutorial/package.json:
#
# {
#   "name": "ccoenraets-fork-es6-tutorial",
#   "version": "1.0.0",
#   "description": "Start the tutorial [here](http://atao60.github.io/es6-tutorial).",
#   "main": "index.js",
#   "scripts": {
#     "test": "echo \"Error: no test specified\" && exit 1"
#   },
#   "repository": {
#     "type": "git",
#     "url": "git+https://github.com/ccoenraets/es6-tutorial.git"
#   },
#   "keywords": [],
#   "author": "",
#   "license": "ISC",
#   "bugs": {
#     "url": "https://github.com/ccoenraets/es6-tutorial/issues"
#   },
#   "homepage": "https://github.com/ccoenraets/es6-tutorial#readme"
# }

jq '.homepage="https://github.com/atao60/es6-tutorial#readme"' package.json | ifne sponge package.json

jq 'bugs.url="https://github.com/atao60/es6-tutorial/issues"' package.json | ifne sponge package.json

jq 'repository.url="git+https://github.com/atao60/es6-tutorial.git"' package.json | ifne sponge package.json

jq '.author="atao60"' package.json | ifne sponge package.json

jq '.license="MIT"' package.json | ifne sponge package.json

### To prevent any accidental publish of this project, mark it as 'private' and remove the 'main' entry:
jq '.private=true' package.json | ifne sponge package.json

jq 'del(.main)' package.json | ifne sponge package.json

cat > README.md << ___eof
## ES6 (2015) Tutorial

Create a web project with Webpack 4, Babel 7 and ES6, from [scratch](tree/step0), step by step:

* [Setting Up a Babel Project](tree/step1)
* [Starting using ES6](tree/step2)
* [Using Destructuring](tree/step3)
* [Using Arrow Functions](tree/step4)
* [Setting Up Webpack](tree/step5)
* [Using Modules](tree/step6)
* [Using Classes](tree/step7)
* [Using Promises](tree/step8)

> Each of the above links goes to the final state of the step.

## 🏁 Quickstart

### With final code (branch \`master\`)

\`\`\`
git clone https://github.com/atao60/es6-tutorial.git

cd es6-tutorial

npm install

npm start
\`\`\`

### With initial code (branch \`init\`)

\`\`\`
git clone --single-branch --branch init https://github.com/atao60/es6-tutorial.git

cd es6-tutorial

npx open-cli index.html
\`\`\`

## 🛡 License

[MIT](LICENSE)

## 📜 Credits

This project is a fork of Christophe Coenraets' [ECMAScript 6 Tutorial](https://github.com/ccoenraets/es6-tutorial). See also the presentation [ECMAScript 6 Tutorial](http://atao60.github.io/es6-tutorial).

Additional Resources :
* [JavaScript brief history and ECMAScript(ES6,ES7,ES8,ES9) features](https://medium.com/@madasamy/javascript-brief-history-and-ecmascript-es6-es7-es8-features-673973394df4), Madasamy M, March 9, 2018
___eof

sed -i -E 's|tree/step[0-9]+|https://github.com/atao60/es6-tutorial/&|' README.md

cat > LICENSE << ___eof
MIT License

Copyright (c) <<year>> <<owner>>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
___eof

sed -i "s/<<year>>/$(date +'%Y')/" LICENSE

sed -i "s/<<owner>>/atao60/" LICENSE

### Le paquet '@babel/cli' est requis pour la commande 'babel'
npm i -D @babel/{cli,core,preset-env} rimraf mkdirp concurrently wait-on open-cli
# npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
# npm notice created a lockfile as package-lock.json. You should commit this file.
# npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.2.7 (node_modules/chokidar/node_modules/fsevents):
# npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.12: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
# npm WARN optional SKIPPING OPTIONAL DEPENDENCY: abbrev@1.1.1 (node_modules/fsevents/node_modules/abbrev):
# npm WARN enoent SKIPPING OPTIONAL DEPENDENCY: ENOENT: no such file or directory, rename '/home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial/node_modules/fsevents/node_modules/abbrev' -> '/home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial/node_modules/fsevents/node_modules/.abbrev.DELETE'
# [...]
# + concurrently@5.1.0
# + mkdirp@1.0.4
# + rimraf@3.0.2
# + @babel/cli@7.8.4
# + wait-on@4.0.2
# + open-cli@6.0.1
# + @babel/core@7.9.0
# + @babel/preset-env@7.9.5
# added 443 packages from 246 contributors and audited 4433 packages in 26.285s
# found 0 vulnerabilities

sed -i '/script/ s|js/main|build/main.bundle|' index.html

jq '.scripts.clean="rimraf ./build"' package.json | sponge package.json
jq '.scripts.prebuild="npm run clean && mkdirp ./build"' package.json | sponge package.json
jq '.scripts.babel="babel --presets @babel/env js/main.js -o ./build/main.bundle.js"' package.json | sponge package.json
jq '.scripts.build="npm run babel"' package.json | sponge package.json
jq '.scripts.start="concurrently \"npm run build\" \"wait-on ./build/main.bundle.js && open-cli ./index.html\""' package.json | sponge package.json

# npm start
# #
# # > ccoenraets-es6-tutorial@1.0.0 start /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # > concurrently "npm run build" "wait-on ./build/main.bundle.js && open-cli ./index.html"
# #
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 prebuild /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > npm run clean && mkdirp ./build
# # [0] 
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 clean /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > rimraf ./build
# # [0] 
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 build /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > npm run babel
# # [0] 
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 babel /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > babel --presets @babel/env js/main.js -o ./build/main.bundle.js
# # [0] 
# # [0] npm run build exited with code 0
# # [1] wait-on ./build/main.bundle.js && open-cli ./index.html exited with code 0

git add .

git commit -m "Working sample with Babel 7"
# [step1 03dfb04] Working sample with Babel 7
#  4 files changed, 4731 insertions(+), 2 deletions(-)
#  create mode 100644 package-lock.json
#  create mode 100644 package.json

git push -u origin step1
# Counting objects: 7, done.
# Delta compression using up to 4 threads.
# Compressing objects: 100% (7/7), done.
# Writing objects: 100% (7/7), 42.35 KiB | 4.71 MiB/s, done.
# Total 7 (delta 1), reused 0 (delta 0)
# remote: Resolving deltas: 100% (1/1), completed with 1 local object.
# remote: 
# remote: Create a pull request for 'step1' on GitHub by visiting:
# remote:      https://github.com/atao60/es6-tutorial/pull/new/step1
# remote: 
# To github.com:atao60/es6-tutorial.git
#  * [new branch]      step1 -> step1
# Branch 'step1' set up to track remote branch 'step1' from 'origin'.

git checkout master
# Switched to branch 'master'
# Your branch is up to date with 'origin/master'.

git merge step1
# Updating 658b7be..ee01cdf
# Fast-forward
#  LICENSE           |   21 +
#  README.md         |   45 +-
#  index.html        |    2 +-
#  package-lock.json | 4691 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#  package.json      |   35 ++
#  5 files changed, 4792 insertions(+), 2 deletions(-)
#  create mode 100644 LICENSE
#  create mode 100644 package-lock.json
#  create mode 100644 package.json

git push
# Total 0 (delta 0), reused 0 (delta 0)
# To github.com:atao60/es6-tutorial.git
#    658b7be..ee01cdf  master -> master

```

## Starting using ES6

Cf. http://atao60.github.io/es6-tutorial/let/

Une 1ère version du code fonctionnant :

```bash

git checkout -b step2
# Switched to a new branch 'step2'

cat > js/main.js << ___eof
// monthly installment of a loan with constant amortization
'use strict';

const defaultRate = 0;

const calculateMonthlyPayment = function (principal, years, annualRate) {
    if (! principal) { throw new Error("Initial capital must be provided")}
    if (! years) { throw new Error("Term of the loan must be provided (years)")}
    if (! annualRate || annualRate < 0) {
        annualRate = defaultRate;
        console.log("No rate provided or negative one: zero rate will be taken in account")
    }

    const duration = 12 * years;
    const monthlyRate = annualRate / 100 / 12;
    let coeff;
    if (annualRate > 0) {
        coeff = monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), duration));
    } else {
        coeff = 1 / duration;
    }
    const monthlyPayment = principal * coeff;
    
    return monthlyPayment;
};

document.getElementById('calcBtn').addEventListener('click', function () {
    const principal = document.getElementById('principal').value;
    const years = document.getElementById('years').value;
    const rate = document.getElementById('rate').value;
    const monthlyPayment = calculateMonthlyPayment(principal, years, rate);
    document.getElementById('monthlyPayment').innerHTML = monthlyPayment.toFixed(2);
});
___eof

# npm start
# # [...]

# ls -al build
# # total 12
# # drwxr-xr-x 2 pierre pierre 4096 Apr 11 11:07 .
# # drwxr-xr-x 7 pierre pierre 4096 Apr 11 11:07 ..
# # -rw-r--r-- 1 pierre pierre 1226 Apr 11 11:07 main.bundle.js

### Et pour les besoins de la démonstration commenter la ligne :
#   de déclaration de la variable 'coeff'

# sed -i -E '/^\s*let\s+coeff\s*;\s*$/ s|.*|//&|' js/main.js 

# npm start
# # [...]

### Un clique sur le bouton 'Calculate' restera sans effet 
#   Par ailleurs on aura dans la console du navigateur :
#        Uncaught ReferenceError: coeff is not defined
#           at calculateMonthlyPayment (main.bundle.js:30)
#           at HTMLButtonElement.<anonymous> (main.bundle.js:38)

# cat build/main.bundle.js
# # [...]
# #   if (annualRate > 0) {
# #     var _coeff = monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), duration));
# #   } else {
# #     var _coeff2 = 1 / duration;
# #   }
# # [...]

### Restaurer le code correct

# sed -i -E '\|^\s*//\s*let\s+coeff\s*;\s*$| s|^\s*//||' js/main.js 

# npm start
# # [...]

# cat build/main.bundle.js
# # [...]
# # var coeff;

# #   if (annualRate > 0) {
# #     coeff = monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), duration));
# #   } else {
# #     coeff = 1 / duration;
# #   }
# # [...]

git add .

git commit -m "Starting using ES6"
# [step2 6f13eeb] Starting using ES6
#  1 file changed, 33 insertions(+), 15 deletions(-)
#  rewrite js/main.js (80%)

git push -u origin step2

git checkout master

git merge step2

git push

```

## Using Destructuring

Cf. http://atao60.github.io/es6-tutorial/destructuring/

```bash

git checkout -b step3
# Switched to a new branch 'step3'

sed -i -E '/^\s*return\s+monthlyPayment\s*;\s*$/ a\
    return { principal, years, annualRate, monthlyPayment, monthlyRate };
' js/main.js

sed -i -E '/^\s*return\s+monthlyPayment\s*;\s*$/ d' js/main.js

sed -i -E '/^\s*const\s+monthlyPayment\s*=\s*calculateMonthlyPayment/ s/monthlyPayment/{ &, monthlyRate }/' js/main.js

sed -i -E '/innerHTML.*monthlyPayment/ a\
    document.getElementById('"'"'monthlyRate'"'"').innerHTML = (monthlyRate * 100).toFixed(2);
' js/main.js

sed -i '/h2/ a\
    <h3>Monthly Rate: <span id="monthlyRate" class="pourcentage"></span></h3>
' index.html

sed -i '/currency::before/ i\
.pourcentage::before {\
    content:"%";\
}\

' css/styles.css

# npm start
# # [...]

git add .

git commit -m "Using Destructuring"
# [step3 e985640] Using Destructuring
#  3 files changed, 8 insertions(+), 2 deletions(-)

git push -u origin step3

git checkout master

git merge step3

git push

```
## Using Arrow Functions

cf. http://atao60.github.io/es6-tutorial/arrow-functions/

```bash

git checkout -b step4

cat > js/main.js << ___eof
// monthly installment of a loan with constant amortization
'use strict';

const defaultRate = 0;

const calculateMonthlyPayment = (principal, years, annualRate) => {
    if (!principal) { throw new Error("Initial capital must be provided") }
    if (!years) { throw new Error("Term of the loan must be provided (years)") }
    if (!annualRate || annualRate < 0) {
        annualRate = defaultRate;
        console.log("No rate provided or negative one: zero rate will be taken in account")
    }

    const duration = 12 * years;
    const monthlyRate = annualRate / 100 / 12;
    let coeff;
    if (annualRate > 0) {
        coeff = monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), duration));
    } else {
        coeff = 1 / duration;
    }
    const monthlyPayment = principal * coeff;

    return { principal, years, annualRate, monthlyPayment, monthlyRate };
};

const calculateAmortization = (principal, years, rate) => {
    const { monthlyRate, monthlyPayment } = calculateMonthlyPayment(principal, years, rate);
    const { amortization } = Array(+years).fill().reduce(({ balance, amortization }, _, y) => {
        const term = Array(12).fill().reduce(({ interestY, principalY }, _, m) => {
            const interestM = balance * monthlyRate;       //Interest payment for month m
            const principalM = monthlyPayment - interestM; //Principal payment for month m
            interestY += interestM;
            principalY += principalM;
            balance -= principalM;
            if (balance < 0) {
                principalY += balance;
                balance = 0;
            }
            return { interestY, principalY };
        }, { interestY: 0, principalY: 0 });
        amortization.push(Object.assign({ balance }, term));
        return { balance, amortization };
    }, { balance: principal, amortization: [] });
    return { monthlyPayment, monthlyRate, amortization };
};

document.getElementById('calcBtn').addEventListener('click', () => {
    const principal = document.getElementById('principal').value;
    const years = document.getElementById('years').value;
    const rate = document.getElementById('rate').value;
    const { monthlyPayment, monthlyRate, amortization } = calculateAmortization(principal, years, rate);
    document.getElementById('monthlyPayment').innerHTML = monthlyPayment.toFixed(2);
    document.getElementById('monthlyRate').innerHTML = (monthlyRate * 100).toFixed(2);
    amortization.forEach(month => console.log(JSON.stringify(month)));
});
___eof

# git diff --minimal --ignore-all-space js/main.js
# # diff --git a/js/main.js b/js/main.js
# # index cf33bb9..d526975 100644
# # --- a/js/main.js
# # +++ b/js/main.js
# # @@ -3,7 +3,7 @@
# # 
# #  const defaultRate = 0;
# # 
# # -const calculateMonthlyPayment = function (principal, years, annualRate) {
# # +const calculateMonthlyPayment = (principal, years, annualRate) => {
# #      if (!principal) { throw new Error("Initial capital must be provided") }
# #      if (!years) { throw new Error("Term of the loan must be provided (years)") }
# #      if (!annualRate || annualRate < 0) {
# # @@ -24,11 +24,33 @@ const calculateMonthlyPayment = function (principal, years, annualRate) {
# #      return { principal, years, annualRate, monthlyPayment, monthlyRate };
# #  };
# # 
# # -document.getElementById('calcBtn').addEventListener('click', function () {
# # +const calculateAmortization = (principal, years, rate) => {
# # +    const { monthlyRate, monthlyPayment } = calculateMonthlyPayment(principal, years, rate);
# # +    const { amortization } = Array(+years).fill().reduce(({ balance, amortization }, _, y) => {
# # +        const term = Array(12).fill().reduce(({ interestY, principalY }, _, m) => {
# # +            const interestM = balance * monthlyRate;       //Interest payment for month m
# # +            const principalM = monthlyPayment - interestM; //Principal payment for month m
# # +            interestY += interestM;
# # +            principalY += principalM;
# # +            balance -= principalM;
# # +            if (balance < 0) {
# # +                principalY += balance;
# # +                balance = 0;
# # +            }
# # +            return { interestY, principalY };
# # +        }, { interestY: 0, principalY: 0 });
# # +        amortization.push(Object.assign({ balance }, term));
# # +        return { balance, amortization };
# # +    }, { balance: principal, amortization: [] });
# # +    return { monthlyPayment, monthlyRate, amortization };
# # +};
# # +
# # +document.getElementById('calcBtn').addEventListener('click', () => {
# #      const principal = document.getElementById('principal').value;
# #      const years = document.getElementById('years').value;
# #      const rate = document.getElementById('rate').value;
# # -    const { monthlyPayment, monthlyRate } = calculateMonthlyPayment(principal, years, rate);
# # +    const { monthlyPayment, monthlyRate, amortization } = calculateAmortization(principal, years, rate);
# #      document.getElementById('monthlyPayment').innerHTML = monthlyPayment.toFixed(2);
# #      document.getElementById('monthlyRate').innerHTML = (monthlyRate * 100).toFixed(2);
# # +    amortization.forEach(month => console.log(JSON.stringify(month)));
# #  });

# npm start
# # [...]

git add .

git commit -m "Using Arrow Functions"
# [step4 bb3cca8] Using Arrow Functions
#  1 file changed, 29 insertions(+), 7 deletions(-)

git push -u origin step4

git checkout master

git merge step4

git push

```
OK :
- un onglet s'ouvre avec la page attendue,
- dans la console du navigateur s'affiche la liste des amortissements.

## Setting Up Webpack

Cf. http://atao60.github.io/es6-tutorial/setup-webpack/

```bash

git checkout -b step5 # Setting Up Webpack
# Switched to a new branch 'step5'

### webpack-cli is required to call webpack from npm scripts
npm i -D babel-loader webpack webpack-cli
# npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.12 (node_modules/fsevents):
# npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.12: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
#
# + babel-loader@8.1.0
# + webpack@4.42.1
# + webpack-cli@3.3.11
# added 223 packages from 152 contributors and audited 9738 packages in 18.538s
# found 0 vulnerabilities

jq '.scripts.build="webpack"' package.json | sponge package.json
jq 'del(.scripts.babel)' package.json | sponge package.json
cat > webpack.config.js << ___eof
var path = require('path');

module.exports = {
    mode: 'development',
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // exclude: /node_modules/, // not yet required as there are no runtime dependencies
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            }
        ]
    },
    stats: {
        colors: true
    }
};
___eof

# npm start
# # > ccoenraets-es6-tutorial@1.0.0 start /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # > concurrently "npm run build" "wait-on ./build/main.bundle.js && open-cli ./index.html"
# #
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 prebuild /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > npm run clean && mkdirp ./build
# # [0] 
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 clean /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > rimraf ./build
# # [0] 
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 build /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > webpack
# # [0] 
# # [0] Hash: 19ed8c239164540e96ee
# # [0] Version: webpack 4.42.1
# # [0] Time: 683ms
# # [0] Built at: 04/11/2020 3:56:00 PM
# # [0]              Asset      Size  Chunks                   Chunk Names
# # [0]     main.bundle.js  6.85 KiB    main  [emitted]        main
# # [0] main.bundle.js.map  9.35 KiB    main  [emitted] [dev]  main
# # [0] Entrypoint main = main.bundle.js main.bundle.js.map
# # [0] [./js/main.js] 3.08 KiB {main} [built]
# # [0] npm run build exited with code 0
# # [1] wait-on ./build/main.bundle.js && open-cli ./index.html exited with code 0

git add .

git commit -m "Setting Up Webpack"
# [step5 081ac62] Setting Up Webpack
#  3 files changed, 2145 insertions(+), 163 deletions(-)
#  create mode 100644 webpack.config.js

### @babel/register is required for to write webpack config in es6 (or ... ts!)
npm i -D @babel/{register,plugin-{syntax-dynamic-import,transform-runtime}}
# npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.12 (node_modules/fsevents):
# npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.12: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
#
# + @babel/plugin-syntax-dynamic-import@7.8.3
# + @babel/register@7.9.0
# + @babel/plugin-transform-runtime@7.9.0
# added 4 packages from 3 contributors, updated 1 package and audited 9772 packages in 6.339s
# found 0 vulnerabilities

npm i -S @babel/runtime
# npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.12 (node_modules/fsevents):
# npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.12: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
#
# + @babel/runtime@7.9.2
# updated 1 package and audited 9776 packages in 6.165s
# found 0 vulnerabilities

rm -f webpack.config.js

cat > webpack.config.babel.js << ___eof
import { resolve } from 'path';

export default {
    mode: 'development',
    entry: './js/main.js',
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                    // see options in babel.config.js
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
___eof

cat > babel.config.js << ___eof
// still commonjs as babel doesn't know yet which presets/plugins will be used/
module.exports = api => {
    api.cache(true); // Same as api.cache.forever(), ie permacache the computed config and never call the function again

    const targets = {
        // Don't set up targets.browsers: specify a file .browserslistrc instead: will be 
        // reused by Autoprefixer and other tools
        //
        // The example below only includes the polyfills and code transforms needed for the 
        // last two versions of each browser, and versions of Safari greater than or equal to 7
        // "browsers": ["last 2 versions", "safari >= 7"], 
        "node": "8.0.0" // See also engines.node in package.json
    };

    const presets = [
        [
            "@babel/env",
            {
                // 'usage': includes polyfills given \`.browserslistrc\` and your source code (Babel analyses it - might not always 
                //  perfectly work depending on your app and its dependencies) instead of including everything from core-js
                "useBuiltIns": "usage",
                "corejs": {
                    version: 3,
                    proposals: true // will enable polyfilling of every proposal supported by core-js
                },
                // Now Babel defaults 'modules' to 'auto', not any more to 'commonjs' (which won't tree-shake.)
                // So no more need to setup 'modules' to 'false':
                // modules: false, 
                targets
            }
        ]
    ];

    const plugins = [
        // proposal-object-rest-spread no more required, supported out of the box in @babel/preset-env, see:
        //     Docs: @babel/proposal-object-rest-spread no longer needs to be specified explicitly #521
        //     kaykayehnn opened this issue on 12 Apr 2019 · 1 comment · Fixed by #539
        //     https://github.com/mdx-js/mdx/issues/521
        // [
        //     "@babel/proposal-object-rest-spread", { "loose": true, "useBuiltIns": true }
        // ],
        '@babel/plugin-syntax-dynamic-import',  // required for lazy loading
        '@babel/plugin-transform-runtime'
    ];

    return {
        presets,
        plugins
    };
};
___eof

cat > .browserslistrc << ___eof
> 0.5%,
last 2 versions
Firefox ESR
not dead
IE 11
___eof

# npm start
# # [...]

git add .

git commit -m "Webpack configuration with es6"
# [step5 b6e9e1a] Webpack configuration with es6
#  6 files changed, 123 insertions(+), 29 deletions(-)
#  create mode 100644 .browserslistrc
#  create mode 100644 babel.config.js
#  create mode 100644 webpack.config.babel.js
#  delete mode 100644 webpack.config.js

git push -u origin step5

git checkout master

git merge step5

git push

```
## Using Modules

Utilisation des modules dans le code de l'appli proprement dit
En fait avec un temps de retard puisque c'est déjà le cas dans les fichiers de configuration...

Cf. http://atao60.github.io/es6-tutorial/modules/

```bash

git checkout -b step6 # Using Modules

cat > js/mortgage.js << ___eof
'use strict';

const defaultRate = 0;

const calculateMonthlyPayment = (principal, years, annualRate) => {
    if (!principal) { throw new Error("Initial capital must be provided") }
    if (!years) { throw new Error("Term of the loan must be provided (years)") }
    if (!annualRate || annualRate < 0) {
        annualRate = defaultRate;
        console.log("No rate provided or negative one: zero rate will be taken in account")
    }

    const duration = 12 * years;
    const monthlyRate = annualRate / 100 / 12;
    let coeff;
    if (annualRate > 0) {
        coeff = monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), duration));
    } else {
        coeff = 1 / duration;
    }
    const monthlyPayment = principal * coeff;

    return { principal, years, annualRate, monthlyPayment, monthlyRate };
};

export const calculateAmortization = (principal, years, rate) => {
    const { monthlyRate, monthlyPayment } = calculateMonthlyPayment(principal, years, rate);
    const { amortization } = Array(+years).fill().reduce(({ balance, amortization }, _, y) => {
        const term = Array(12).fill().reduce(({ interestY, principalY }, _, m) => {
            const interestM = balance * monthlyRate;       //Interest payment for month m
            const principalM = monthlyPayment - interestM; //Principal payment for month m
            interestY += interestM;
            principalY += principalM;
            balance -= principalM;
            if (balance < 0) {
                principalY += balance;
                balance = 0;
            }
            return { interestY, principalY };
        }, { interestY: 0, principalY: 0 });
        amortization.push(Object.assign({ balance }, term));
        return { balance, amortization };
    }, { balance: principal, amortization: [] });
    return { monthlyPayment, monthlyRate, amortization };
};
___eof

cat > js/main.js << ___eof
// monthly installment of a loan with constant amortization
'use strict';

import { calculateAmortization } from './mortgage';


document.getElementById('calcBtn').addEventListener('click', () => {
    const principal = document.getElementById('principal').value;
    const years = document.getElementById('years').value;
    const rate = document.getElementById('rate').value;
    const { monthlyPayment, monthlyRate, amortization } = calculateAmortization(principal, years, rate);
    document.getElementById('monthlyPayment').innerHTML = monthlyPayment.toFixed(2);
    document.getElementById('monthlyRate').innerHTML = (monthlyRate * 100).toFixed(2);
    amortization.forEach(month => console.log(JSON.stringify(month)));
});
___eof

# npm start

git add .

git commit -m "Using Modules"
# [step6 782a5b9] Using Modules
#  2 files changed, 16 insertions(+), 68 deletions(-)
#  rewrite js/main.js (73%)
#  copy js/{main.js => mortgage.js} (71%)

git push -u origin step6

git checkout master

git merge step6

git push

```

## Using Classes

Cf. http://atao60.github.io/es6-tutorial/classes/

```bash

git checkout -b step7

npm i -S core-js regenerator-runtime
# > core-js@3.6.5 postinstall /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial/node_modules/core-js
# > node -e "try{require('./postinstall')}catch(e){}"
#
# Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!
#
# The project needs your help! Please consider supporting of core-js on Open Collective or Patreon: 
# > https://opencollective.com/core-js 
# > https://www.patreon.com/zloirock 
#
# Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)
#
# npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.12 (node_modules/fsevents):
# npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.12: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
#
# + regenerator-runtime@0.13.5
# + core-js@3.6.5
# added 1 package and updated 1 package in 6.144s

npm i -D @babel/plugin-proposal-class-properties
# npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.12 (node_modules/fsevents):
# npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.12: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
#
# + @babel/plugin-proposal-class-properties@7.8.3
# added 2 packages from 1 contributor, removed 1 package and audited 9894 packages in 6.367s
# found 0 vulnerabilities

sed -i '/^\s*const\s*plugins\s*=/ a\
        '"'"'@babel/proposal-class-properties'"'"',
' babel.config.js

sed -i '/h3/ a\
    <table id="amortization"></table>
' index.html

cat > js/main.js << ___eof
// monthly installment of a loan with constant amortization
'use strict';

class Mortgage {

    static defaultRate = 0;
    static percentRatio = 100;
    static monthPerYear = 12;
    
    constructor(principal, years, rate) {
        if (!principal) { throw new Error("Initial capital must be provided") }
        if (!years) { throw new Error("Term of the loan must be provided (years)") }
        if (!rate || rate < 0) {
            rate = Mortgage.defaultRate;
            console.log("No rate provided or negative one: zero rate will be taken in account")
        }

        this.principal = principal;
        this.years = years;
        this.annualRate = rate;
    }
    
    get monthlyRate() {
        return this.annualRate / Mortgage.percentRatio / Mortgage.monthPerYear;
    }
    get monthlyPayment()  {
        const duration = Mortgage.monthPerYear * this.years;
        let coeff;
        if (this.monthlyRate > 0) {
            coeff = this.monthlyRate / (1 - Math.pow(1 / (1 + this.monthlyRate), duration));
        } else {
            coeff = 1 / duration;
        }
        return this.principal * coeff;
    }
    
    get amortization() {
        const { amortization } = Array(+this.years).fill().reduce(({ balance, amortization }, _, y) => {
            const term = Array(12).fill().reduce(({ interestY, principalY }, _, m) => {
                const interestM = balance * this.monthlyRate;       //Interest payment for month m
                const principalM = this.monthlyPayment - interestM; //Principal payment for month m
                interestY += interestM;
                principalY += principalM;
                balance -= principalM;
                if (balance < 0) {
                    principalY += balance;
                    balance = 0;
                }
                return { interestY, principalY };
            }, { interestY: 0, principalY: 0 });
            const fullTerm = Object.assign({ balance }, term);
            amortization.push(fullTerm);
            return { balance, amortization };
        }, { balance: this.principal, amortization: [] });
        return amortization;
    }
    
}

document.getElementById('calcBtn').addEventListener('click', () => {
    const principal = document.getElementById('principal').value;
    const years = document.getElementById('years').value;
    const rate = document.getElementById('rate').value;
    const mortgage = new Mortgage(principal, years, rate);
    document.getElementById('monthlyPayment').innerHTML = mortgage.monthlyPayment.toFixed(2);
    document.getElementById('monthlyRate').innerHTML = mortgage.monthlyRate.toFixed(2);
    const html = mortgage.amortization.reduce((html, year, index) => html += \`
        <tr>
            <td>\${index + 1}</td>
            <td class="currency">\${Math.round(year.principalY)}</td>
            <td class="stretch">
                <div class="flex">
                    <div class="bar principal"
                         style="flex:\${year.principalY};-webkit-flex:\${year.principalY}">
                    </div>
                    <div class="bar interest"
                         style="flex:\${year.interestY};-webkit-flex:\${year.interestY}">
                    </div>
                </div>
            </td>
            <td class="currency left">\${Math.round(year.interestY)}</td>
            <td class="currency">\${Math.round(year.balance)}</td>
        </tr>
    \`, '');
    mortgage.amortization.forEach(month => console.log(JSON.stringify(month)));
    document.getElementById("amortization").innerHTML = html;
});
___eof

git add .

git commit -m "Using classes - Part 1"
# [step7 7e1b883] Using classes - Part 1
#  5 files changed, 112 insertions(+), 6 deletions(-)

cat > js/mortgage2.js << ___eof
'use strict';

export default class Mortgage {

    static defaultRate = 0;
    static percentRatio = 100;
    static monthPerYear = 12;
    
    constructor(principal, years, rate) {
        if (!principal) { throw new Error("Initial capital must be provided") }
        if (!years) { throw new Error("Term of the loan must be provided (years)") }
        if (!rate || rate < 0) {
            rate = Mortgage.defaultRate;
            console.log("No rate provided or negative one: zero rate will be taken in account")
        }

        this.principal = principal;
        this.years = years;
        this.annualRate = rate;
    }
    
    get monthlyRate() {
        return this.annualRate / Mortgage.percentRatio / Mortgage.monthPerYear;
    }
    get monthlyPayment()  {
        const duration = Mortgage.monthPerYear * this.years;
        let coeff;
        if (this.monthlyRate > 0) {
            coeff = this.monthlyRate / (1 - Math.pow(1 / (1 + this.monthlyRate), duration));
        } else {
            coeff = 1 / duration;
        }
        return this.principal * coeff;
    }
    
    get amortization() {
        const { amortization } = Array(+this.years).fill().reduce(({ balance, amortization }, _, y) => {
            const term = Array(12).fill().reduce(({ interestY, principalY }, _, m) => {
                const interestM = balance * this.monthlyRate;       //Interest payment for month m
                const principalM = this.monthlyPayment - interestM; //Principal payment for month m
                interestY += interestM;
                principalY += principalM;
                balance -= principalM;
                if (balance < 0) {
                    principalY += balance;
                    balance = 0;
                }
                return { interestY, principalY };
            }, { interestY: 0, principalY: 0 });
            const fullTerm = Object.assign({ balance }, term);
            amortization.push(fullTerm);
            return { balance, amortization };
        }, { balance: this.principal, amortization: [] });
        return amortization;
    }
    
}
___eof

cat > js/main.js << ___eof
// monthly installment of a loan with constant amortization
'use strict';

import { default as Mortgage } from './mortgage2';

document.getElementById('calcBtn').addEventListener('click', () => {
    const principal = document.getElementById('principal').value;
    const years = document.getElementById('years').value;
    const rate = document.getElementById('rate').value;
    const mortgage = new Mortgage(principal, years, rate);
    document.getElementById('monthlyPayment').innerHTML = mortgage.monthlyPayment.toFixed(2);
    document.getElementById('monthlyRate').innerHTML = mortgage.monthlyRate.toFixed(2);
    const html = mortgage.amortization.reduce((html, year, index) => html += \`
        <tr>
            <td>\${index + 1}</td>
            <td class="currency">\${Math.round(year.principalY)}</td>
            <td class="stretch">
                <div class="flex">
                    <div class="bar principal"
                         style="flex:\${year.principalY};-webkit-flex:\${year.principalY}">
                    </div>
                    <div class="bar interest"
                         style="flex:\${year.interestY};-webkit-flex:\${year.interestY}">
                    </div>
                </div>
            </td>
            <td class="currency left">\${Math.round(year.interestY)}</td>
            <td class="currency">\${Math.round(year.balance)}</td>
        </tr>
    \`, '');
    mortgage.amortization.forEach(month => console.log(JSON.stringify(month)));
    document.getElementById("amortization").innerHTML = html;
});

___eof


git add .

git commit -m "Using classes - Part 2"
# [step7 c46500e] Using classes - Part 2
#  2 files changed, 59 insertions(+), 55 deletions(-)
#  create mode 100644 js/mortgage2.js

git push -u origin step7

git checkout master

git merge step7

git push

```
## Use a Promise

Cf. http://atao60.github.io/es6-tutorial/promises/

```bash

git checkout -b step8
# Switched to a new branch 'step8'

cat > ratefinder.html << ___eof
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
    <table id="rates"></table>
    <script src="build/ratefinder.bundle.js"></script>
</body>
</html>
___eof

cat > js/ratefinder.js << ___eof
const url = 'rates.json';
    
fetch(url)
    .then(response => response.json())
    .then(rates => {
        const html = rates.reduce((table, rate) => {
            return table + \`<tr><td>\${rate.name}</td><td>\${rate.years}</td><td>\${rate.rate}%</td></tr>\\n\`;
        }, '');
        document.getElementById('rates').innerHTML = html;
    })
    .catch(e => console.log(e));
___eof

sed -i '/^\s*entry/ d' webpack.config.babel.js

sed -i '/^\s*mode/ a\
    entry: {\
        app: '"'"'./js/main.js'"'"',\
        ratefinder: '"'"'./js/ratefinder.js'"'"'\
    },
' webpack.config.babel.js

sed -i '/^\s*filename/ s/main\.bundle\.js/[name].bundle.js/' webpack.config.babel.js

sed -i 's|build/main\.bundle\.js|build/app.bundle.js|' index.html

sed -i 's|build/main\.bundle\.js|build/app.bundle.js|' package.json

# npm run build
# #
# # > ccoenraets-es6-tutorial@1.0.0 prebuild /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # > npm run clean && mkdirp ./build
# #
# #
# # > ccoenraets-es6-tutorial@1.0.0 clean /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # > rimraf ./build
# #
# #
# # > ccoenraets-es6-tutorial@1.0.0 build /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # > webpack
# #
# # Hash: 5c8eb42e236402087cdc
# # Version: webpack 4.42.1
# # Time: 643ms
# # Built at: 04/12/2020 6:06:41 PM
# #                    Asset      Size      Chunks                   Chunk Names
# #            app.bundle.js  9.08 KiB         app  [emitted]        app
# #        app.bundle.js.map  11.3 KiB         app  [emitted] [dev]  app
# #     ratefinder.bundle.js  90.8 KiB  ratefinder  [emitted]        ratefinder
# # ratefinder.bundle.js.map    73 KiB  ratefinder  [emitted] [dev]  ratefinder
# # Entrypoint app = app.bundle.js app.bundle.js.map
# # Entrypoint ratefinder = ratefinder.bundle.js ratefinder.bundle.js.map
# # [./js/main.js] 1.5 KiB {app} [built]
# # [./js/mortgage2.js] 2.12 KiB {app} [built]
# # [./js/ratefinder.js] 363 bytes {ratefinder} [built]
# # [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {ratefinder} [built]
# #     + 74 hidden modules

# npm start
# #
# # > ccoenraets-es6-tutorial@1.0.0 start /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # > concurrently "npm run build" "wait-on ./build/app.bundle.js && open-cli ./index.html"
# #
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 prebuild /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > npm run clean && mkdirp ./build
# # [0] 
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 clean /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > rimraf ./build
# # [0] 
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 build /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > webpack
# # [0] 
# # [0] Hash: 5c8eb42e236402087cdc
# # [0] Version: webpack 4.42.1
# # [0] Time: 683ms
# # [0] Built at: 04/12/2020 6:12:21 PM
# # [0]                    Asset      Size      Chunks                   Chunk Names
# # [0]            app.bundle.js  9.08 KiB         app  [emitted]        app
# # [0]        app.bundle.js.map  11.3 KiB         app  [emitted] [dev]  app
# # [0]     ratefinder.bundle.js  90.8 KiB  ratefinder  [emitted]        ratefinder
# # [0] ratefinder.bundle.js.map    73 KiB  ratefinder  [emitted] [dev]  ratefinder
# # [0] Entrypoint app = app.bundle.js app.bundle.js.map
# # [0] Entrypoint ratefinder = ratefinder.bundle.js ratefinder.bundle.js.map
# # [0] [./js/main.js] 1.5 KiB {app} [built]
# # [0] [./js/mortgage2.js] 2.12 KiB {app} [built]
# # [0] [./js/ratefinder.js] 363 bytes {ratefinder} [built]
# # [0] [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {ratefinder} [built]
# # [0]     + 74 hidden modules
# # [0] npm run build exited with code 0
# # [1] wait-on ./build/app.bundle.js && open-cli ./index.html exited with code 0

### OK affichage et fonctionnement simulateur de prêt



# npx concurrently "npm run build" "npx wait-on ./build/ratefinder.bundle.js && npx open-cli ./ratefinder.html"
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 prebuild /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > npm run clean && mkdirp ./build
# # [0] 
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 clean /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > rimraf ./build
# # [0] 
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 build /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > webpack
# # [0] 
# # [0] Hash: 5c8eb42e236402087cdc
# # [0] Version: webpack 4.42.1
# # [0] Time: 688ms
# # [0] Built at: 04/12/2020 6:15:29 PM
# # [0]                    Asset      Size      Chunks                   Chunk Names
# # [0]            app.bundle.js  9.08 KiB         app  [emitted]        app
# # [0]        app.bundle.js.map  11.3 KiB         app  [emitted] [dev]  app
# # [0]     ratefinder.bundle.js  90.8 KiB  ratefinder  [emitted]        ratefinder
# # [0] ratefinder.bundle.js.map    73 KiB  ratefinder  [emitted] [dev]  ratefinder
# # [0] Entrypoint app = app.bundle.js app.bundle.js.map
# # [0] Entrypoint ratefinder = ratefinder.bundle.js ratefinder.bundle.js.map
# # [0] [./js/main.js] 1.5 KiB {app} [built]
# # [0] [./js/mortgage2.js] 2.12 KiB {app} [built]
# # [0] [./js/ratefinder.js] 363 bytes {ratefinder} [built]
# # [0] [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {ratefinder} [built]
# # [0]     + 74 hidden modules
# # [0] npm run build exited with code 0
# # [1] npx wait-on ./build/ratefinder.bundle.js && npx open-cli ./ratefinder.html exit

### KO affichage avec message dans console navigateur :
#       ratefinder.js:3 Fetch API cannot load file:///home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial/rates.json. URL scheme must be "http" or "https" for CORS request.
# ./js/ratefinder.js @ ratefinder.js:3
# ratefinder.js:11 TypeError: Failed to fetch
#     at Module../js/ratefinder.js (ratefinder.js:3)
#     at __webpack_require__ (bootstrap:19)
#     at bootstrap:83
#     at bootstrap:83


# npx concurrently "npm run build" "npx wait-on ./build/ratefinder.bundle.js && npx open-cli file:///home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial/ratefinder.html"

### KO idem


# npx concurrently "npm run build && npx http-server" "npx wait-on http://localhost:8080/ratefinder.html && npx open-cli http://localhost:8080/ratefinder.html"
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 prebuild /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > npm run clean && mkdirp ./build
# # [0] 
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 clean /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > rimraf ./build
# # [0] 
# # [0] 
# # [0] > ccoenraets-es6-tutorial@1.0.0 build /home/pierre/DevSpace/webpack-explo/ccoenraets-es6-tutorial
# # [0] > webpack
# # [0] 
# # [0] Hash: 5c8eb42e236402087cdc
# # [0] Version: webpack 4.42.1
# # [0] Time: 679ms
# # [0] Built at: 04/12/2020 6:21:04 PM
# # [0]                    Asset      Size      Chunks                   Chunk Names
# # [0]            app.bundle.js  9.08 KiB         app  [emitted]        app
# # [0]        app.bundle.js.map  11.3 KiB         app  [emitted] [dev]  app
# # [0]     ratefinder.bundle.js  90.8 KiB  ratefinder  [emitted]        ratefinder
# # [0] ratefinder.bundle.js.map    73 KiB  ratefinder  [emitted] [dev]  ratefinder
# # [0] Entrypoint app = app.bundle.js app.bundle.js.map
# # [0] Entrypoint ratefinder = ratefinder.bundle.js ratefinder.bundle.js.map
# # [0] [./js/main.js] 1.5 KiB {app} [built]
# # [0] [./js/mortgage2.js] 2.12 KiB {app} [built]
# # [0] [./js/ratefinder.js] 363 bytes {ratefinder} [built]
# # [0] [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {ratefinder} [built]
# # [0]     + 74 hidden modules
# # [0] npx: installed 26 in 5s
# # [0] Starting up http-server, serving ./
# # [0] Available on:
# # [0]   http://127.0.0.1:8080
# # [0]   http://192.168.5.101:8080
# # [0] Hit CTRL-C to stop the server
# # [0] [2020-04-12T16:21:09.465Z]  "HEAD /ratefinder.html" "undefined"
# # [0] (node:25037) [DEP0066] DeprecationWarning: OutgoingMessage.prototype._headers is deprecated
# # [1] npx wait-on http://localhost:8080/ratefinder.html && npx open-cli http://localhost:8080/ratefinder.html exited with code 0
# # [0] [2020-04-12T16:21:10.709Z]  "GET /ratefinder.html" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36"
# # [0] [2020-04-12T16:21:10.851Z]  "GET /build/ratefinder.bundle.js" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36"
# # [0] [2020-04-12T16:21:10.911Z]  "GET /rates.json" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36"
# # [0] [2020-04-12T16:21:10.978Z]  "GET /favicon.ico" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36"
# # [0] [2020-04-12T16:21:10.981Z]  "GET /favicon.ico" Error (404): "Not found"
# # [0] [2020-04-12T16:21:21.568Z]  "GET /build/ratefinder.bundle.js.map" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36"
# ^C

### OK sur http://localhost:8080/ratefinder.html avec comme seul message d'erreur celui au sujet de l'absence de favicon

npm i -D http-server
# npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.12 (node_modules/fsevents):
# npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.12: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
#
# + http-server@0.12.1
# added 25 packages from 32 contributors and audited 9927 packages in 7.865s
# found 1 low severity vulnerability
#   run `npm audit fix` to fix them, or `npm audit` for details

### http-server requires argument `-c-1` to disable caching
jq '.scripts["ratefinder:start"]="concurrently \"npm run build && http-server -c-1\" \"wait-on http://localhost:8080/ratefinder.html && open-cli http://localhost:8080/ratefinder.html\""' package.json | sponge package.json

# npm run ratefinder:start
# # # [...]
# # # Available on:
# # # [0]   http://127.0.0.1:8080
# # # [0]   http://192.168.5.101:8080
# # # [...]
# # ^C

### OK sur http://localhost:8080/ratefinder.html avec comme seul message d'erreur celui au sujet de l'absence de favicon

git add .

git commit -m "Using Promises - Part 1 - Use a promise"
# [step8 8f72b0d] Using Promises - Part 1 - Use a promise
#  6 files changed, 236 insertions(+), 4 deletions(-)
#  create mode 100644 js/ratefinder.js
#  create mode 100644 ratefinder.html

cat > js/rate-service-mock.js << ___eof
import { default as rates } from '../rates.json';

export const findAll = () => new Promise((resolve, reject) => {
    if (rates) {
        resolve(rates);
    } else {
        reject("No rates");
    }
});
___eof


cat > js/ratefinder.js << ___eof
import { findAll } from './rate-service-mock';
    
findAll()
    .then(rates => {
        const html = rates.reduce((table, rate) => {
            return table + \`<tr><td>\${rate.name}</td><td>\${rate.years}</td><td>\${rate.rate}%</td></tr>\\n\`;
        }, '');
        document.getElementById('rates').innerHTML = html;
    })
    .catch(e => console.log(e));
___eof

# npm run ratefinder:start
# # [...]
# # Available on:
# # [0]   http://127.0.0.1:8080
# # [0]   http://192.168.5.101:8080
# # [...]
# ^C

### OK sur http://localhost:8080/ratefinder.html avec comme seul message d'erreur celui au sujet de l'absence de favicon

git add .

git commit -m "Using Promises - Part 2 - Create a promise"
# [step8 4fdda4a] Using Promises - Part 2 - Create a promise
#  2 files changed, 11 insertions(+), 3 deletions(-)
#  create mode 100644 js/rate-service-mock.js

git push -u origin step8

git checkout master

git merge step8

git push


```
