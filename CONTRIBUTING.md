# Contributing guidelines

Thank you for your interest in contributing to vavilon.js. Here are all the
things that you should know.

**Table of Contents**

- [Ways to Contribute](#ways-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Proposing Features](#proposing-features)
  - [Writing Code](#writing-code)
  - [Writing Docs](#writing-docs)
- [Usual Workflow](#usual-workflow)
  - [Preparation](#preparation)
  - [Code Style](#code-style)
  - [Commit Message Style](#commit-message-style)
  - [Submission](#submission)

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

## Usual Workflow

So, you have decided to become a code or docs contributor for vavilon.js. Here's
how we do it.

### Preparation

1. **Git**
   1. Fork the repo
   1. Clone the repository to your local machine
   1. Start a new branch for your feature or bugfix
2. **Yarn**
   1. Install the packages with `yarn`. Don't worry, if it will update the
      yarn.lock file
3. Check that everything is working: `yarn test`

### Code Style

You are now ready to write code. We have an ESLint config included, so if your
IDE or text editor supports it, you will be notified about code style errors.
You can learn about how to setup your editor [here][eslint-integrations].

If your editor doesn't support ESLint or you don't want to set it up, you can
run this command in project root:

```sh
yarn test:lint
```

If you don't see any output and the script finishes with an exit code 0, it
means, that your code doesn't have style issues.

If your code does not follow the lint guidelines, the commit will not be
possible, as there are git hooks that check the code before committing it.

### Commit Message Style

vavilon.js used to follow the [Conventional Commits guidelines][con-comm].
However, we decided to stop using it as it has added more hassle than it has
provided help.

Nowadays we write the commits in simplified manner with easy to follow rules:

- use imperative case ("Add feature", not "Added feature")
- capitalize the commit message subject
- keep subject under 50 characters
- provide issue number (if applicable) in the commit message subject
- provide description, if you feel like it's needed
- wrap description at 80 characters per line

You can see the examples of good commit messages in the repository's commit
tree starting from January 29, 2020.

### Submission

After you're ready with the fix/implementation, create a Pull Request. Leave the
target branch at `master`, we will change it according to our workflow. Provide
a clear description of what your PR does and specify the according issue number
in the description.

---

If you still have any questions about contribution or other parts of the project,
you can reach us via E-Mail: vavilon(at)karamoff(dot)dev

[issues-bugs]: https://github.com/vavilon-js/vavilon.js/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Abug
[issues-features]: https://github.com/vavilon-js/vavilon.js/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Aenhancement
[new-bug]: https://github.com/vavilon-js/vavilon.js/issues/new?assignees=NickKaramoff&labels=bug&template=report-a-bug.md
[new-feature]: https://github.com/vavilon-js/vavilon.js/issues/new?assignees=NickKaramoff&labels=enhancement&template=suggest-a-feature.md
[eslint-integrations]: https://eslint.org/docs/user-guide/integrations#editors
[con-comm]: https://www.conventionalcommits.org/
