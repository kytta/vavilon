# Contributing guidelines

Thank you for your interest in contributing to vavilon.js. Here are all the
things that you should know.

**Table of Contents**
  * [Ways to Contribute](#ways-to-contribute)
    * [Reporting Bugs](#reporting-bugs)
    * [Proposing Features](#proposing-features)
    * [Writing Code](#writing-code)
    * [Writing Docs](#writing-docs)
  * [Usual Workflow](#usual-workflow)
    * [Preparation](#preparation)
    * [Code Style](#code-style)
    * [Commit Message Style](#commit-message-style)

## Ways to Contribute

### Reporting Bugs

If you don't want to mess with the code, you can help by reporting the existing
bugs and issues so that we can produce fixes for them.

Before reporting a bug please make sure, that it hasn't been reported before.
You can do so by going to the [Issues page][issues-bugs] and searching for
previously reported bugs. Perhaps your bug is already on that list or maybe even
fixed in a newer version.

If you find that your bug has been reported before, but hasn't been resolved yet,
you can add a "👍" reaction or a comment to it, so that we know you have
encountered the problem as well.

If you haven't found a bug similar to yours and you believe that you are the
first encounterer, you can file **[a new bug][new-bug]**.

Please follow the "Report a Bug" issue template. The more information you
provide, the faster will we be able to resolve the issue.

### Proposing Features

Features are also extremely important for us! If you realize that you can't
accomplish something with vavilon.js and you believe that others may be stuck
with this too, you can propose a new feature for vavilon.js.

Before proposing a feature please make sure, that it hasn't been proposed 
before. You can do so by going to the [Issues page][issues-features] and
searching for previously proposed features. Perhaps your feature is already on
that list or maybe even implemented in a newer version.

If you find that your feature has been proposed before, but hasn't been
implemented yet, you can add a "👍" reaction or a comment to it, so that we know
that you have interest in this feature as well.

If you haven't found a feature similar to yours, you can file
**[a new feature][new-feature]**.

Please follow the "Suggest a feature" issue template.

### Writing Code

If you want to fix a bug or implement a feature by yourself or you have an idea
about how to refactor the existent code, you can fork the repository and make
the edits you desire.

Before you start working on something, make sure that you understand the
**[workflow](#usual-workflow)** of how you should do it. Make sure to adhere
to the code and commit message styles

### Writing Docs

You can also edit the documentation, whether it being the docs on our website or
the README, LICENSE, CONTRIBUTING (this guide). The **[workflow](#usual-workflow)**
is similar to the one for code, except that you don't have mess around with NPM.
However, we still recommend you use `commitizen` for commit messages.

## Usual Workflow

So, you have decided to become a code or docs contributor for vavilon. Here's
how we do it.

### Preparation

1. **Git**
    1. Clone the repository to your local machine
    2. Switch to the HEAD of `develop` branch
    3. Start a new branch for your feature or bugfix. We try to follow the git-flow,
       so it will be great if you prepend the branch name with `feature/` or `fix/`
2. **NPM**
    1. Install the packages with `npm install`. Don't worry, if it will update 
       the package-lock.json
    2. (optional) Install `commitizen` globally: `npm install -g commitizen`
       
       Since we follow the Conventional Commits guidelines, we use `commitizen`
       to make the workflow easier. By using the `git cz` instead of
       `git commit` you can commit your changes being sure that they follow the
       guidelines.
3. Check that everything is working: `npm run build`

### Code Style

You are now ready to write code. We have an ESLint config included, so if your
IDE or text editor supports it, you will be notified about code style errors.
You can learn about how to setup your editor [here][eslint-integrations].

If your editor doesn't support ESLint or you don't want to set it up, you can
run this command in project root: 
```sh
eslint ./src/**/*.ts
```

If you don't see any output, it means, that your code doesn't have Code Style
issues.

If your code does not follow the lint guidelines, the commit will not be
possible, as there are git hooks that check the code before committing it.

### Commit Message Style

vavilon.js follows the [Conventional Commits guidelines][con-comm]. However, we
specify a distinct set of types and scopes, that is defined in our
[commitizen config](./config/git/commitizen.js).

If you have `commitizen` installed, you can run `git cz` and commit your changes
interactively. In other cases you need to make sure that the commit message
meets the following requirements:

- the commit message **should** have a subject
  - the subject is structured as `<type>(<scope>): <decription>`
  - the type is one of the following:
    - `build` - project or dependency build setup
    - `docs` - documentation update
    - `feat` - new feature
    - `fix` - error/bug fix
    - `perf` - performance-related change
    - `refactor` - change that doesn't add new features nor fixes bugs
    - `revert` - revert to a previous commit
    - `style` - style-related change (tabs, spaces, punctuation, etc.)
    - `test` - new or updated test
  - the scope is optional and specifies an area of code that you have worked on
  - the description is a short, clear, imperative ("add", not "added") sentence
    of 72 characters or shorter
- the commit message can have a body
  - the body should be separated from the subject with an empty line
  - the body should be phrased imperatively as well
  - if your commit introduces a breaking change, prepend the commit message with
    "BREAKING CHANGE:"
- the commit message can have a footer
  - the footer should only include meta information, like links to issues, pull
    requests
    
If your commit message does not follow the guidelines, the commit will not be
possible, as there are git hooks that lint the commit message.

You can see the examples of good commit messages in the repository's commit
tree starting from July 13, 2019.

----

If you still have any questions about contribution or other parts of the project,
you can reach us via E-Mail: vavilon(at)karamoff(dot)ru




[issues-bugs]: https://github.com/vavilon-js/vavilon.js/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Abug
[issues-features]: https://github.com/vavilon-js/vavilon.js/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Aenhancement
[new-bug]: https://github.com/vavilon-js/vavilon.js/issues/new?assignees=NickKaramoff&labels=bug&template=report-a-bug.md
[new-feature]: https://github.com/vavilon-js/vavilon.js/issues/new?assignees=NickKaramoff&labels=enhancement&template=suggest-a-feature.md
[eslint-integrations]: https://eslint.org/docs/user-guide/integrations#editors
[con-comm]: https://www.conventionalcommits.org/
