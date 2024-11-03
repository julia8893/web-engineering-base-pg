# Web Engineering Coding Playground Template

This repository is designed as the foundation for coding playgrounds in the Web Engineering course. It offers a structured space for experimenting with and mastering various web development technologies and practices.
The project is based on [this](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting) repository from MDN.

The project introduces a lot of code smells for you to tackle.
**Lets get coding!**

## Submission Details and Deadlines

- Coding playgrounds are **individual** work
- There will be 2 serparate submissions:
  - [Base Playgrounds](#base-coding-playgrounds): Submission Deadline **03.11.2024**
  - [Extended Playgrounds](#extended-coding-playgrounds): Submission Deadline **16.01.2025**
- The playgrounds will be guided through in our sessions - still there will be distance work!
- Use this base template to create your project repository.
- Each playground is linked in the corresponding course section.
- You can find the submissions at the bottom of the Moodle course.

## Features

- Wonderful UI-design :heart_eyes:
- Loads bear data using [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) :bear:
  - Original Wikipedia Page can be found [here](https://en.wikipedia.org/wiki/List_of_ursids)
- Worst JS coding practices :cold_sweat:
- No Build and Dependency Management at all :fire:

# Base Coding Playgrounds

## K.O. Criteria

- No JS Frameworks allowed to solve the base coding playgrounds (e.g. Vue.js, Angular, React, Svelte,...) - don't panic we will come to them!
- No CSS Libraries allowed (e.g. Bootstrap, Material, Tailwind, ...)

## Submission

Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:

> GitHub: leonardo1710
>
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 1. JS Playground (10 Pts.)

The provided base project template contains some bugs and bad JS coding practices for you to fix in your first playground. Take a look into the component files and get a grasp of the inner workings of the provided project.

> **ATTENTION: After finishing the JS Playground please create a commit or branch and link it below. Otherwise it is not possible to grade your 1. submission, since we will switch to TypeScript afterwards!**
>
> **This is my JS Playground commit/branch:** <LINK_TO_YOUR_COMMIT>

**Tasks:**
Fix application code and answer the questions:

- (2) Adapt the code to use `async/await` instead of the `then()`-callback hell and refactor the functions to use arrow function syntax instead of `function()`-syntax.
- (2) Add proper error handling to the code using `try/catch` and provide useful error messages to the users. Additionally, check the image URL availability before rendering the images in HTML. Provide placeholder images if the given URL does not exist.
- (1) Extract the range value from the provided Wikitext (response from the API). Examine the provided Wikitext format inside `extractBears` function.
- (1) Split the code into separate modules with regards to clean separation of concerns.
- (1) Eliminate all other bad coding practices you can find.
- (3) Answer the following questions and provide some examples inside the `Readme.md` file.

> **What bad coding practices did you find? Why is it a bad practice and how did you fix it?**

Present your findings here...

```JS
console.log('Make use of markdown codesnippets to show and explain good/bad practices!')
```

**1. Use of var Instead of let or const**

Original Code:

```JS
var showHideBtn = document.querySelector('.show-hide');
var commentWrapper = document.querySelector('.comment-wrapper');
```

Improved Code:

```JS
const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.querySelector('.comment-wrapper');
```

**2. Inline Event Handlers**

Original Code:

```JS
showHideBtn.onclick = function() {
  // Show/Hide logic
};
```

Improved Code:

```JS
showHideBtn.addEventListener("click", () => {
  const isShowing = showHideBtn.textContent === "Hide comments";
  showHideBtn.textContent = isShowing ? "Show comments" : "Hide comments";
  commentWrapper.style.display = isShowing ? "none" : "block";
});
```

**3. Using innerHTML Directly (with Web Components)**

Original Code:

```JS
moreBearsSection.innerHTML += `
  <div>
    <h3>${bear.name} (${bear.binomial})</h3>
    <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
    <p><strong>Range:</strong> ${bear.range}</p>
  </div>
`;
```

Improved Code:

```JS
const bearCard = document.createElement("bear-card");
bearCard.setAttribute("name", bear.name);
bearCard.setAttribute("binomial", bear.binomial);
bearCard.setAttribute("image", bear.image);
bearCard.setAttribute("range", bear.range);
moreBearsSection.appendChild(bearCard);
```

**4. Lack of Error Handling**

Original Code:

```JS
fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    // Handle data
  });
```

Improved Code:

```JS
try {
  const response = await fetch(buildUrl(BASE_URL, PAGE_PARAMS));
  if (!response.ok) throw new Error("Failed to fetch bear data.");
  const data = await response.json();
  return await extractBears(wikitext);
} catch (error) {
  console.error("Error fetching bear data:", error);
  return [];
}
```

**5. Repetitive Code for Element Selection (Improved code centralizes the DOM queries within the initialization function to ensure elements are queried once, improving efficiency)**

Original Code:

```JS
var form = document.querySelector('.comment-form');
var nameField = document.querySelector('#name');
var commentField = document.querySelector('#comment');
var list = document.querySelector('.comment-container');
```

Improved Code:

```JS
const initializeCommentForm = () => {
  const form = document.querySelector(".comment-form");
  const nameField = document.querySelector("#name");
  const commentField = document.querySelector("#comment");
  const list = document.querySelector(".comment-container");
  ...
};
```

**6. Hardcoded Strings and Conditional (ternary) operator**

Original Code:

```JS
if (showHideText == 'Show comments') {
  showHideBtn.textContent = 'Hide comments';
  commentWrapper.style.display = 'block';
} else {
  showHideBtn.textContent = 'Show comments';
  commentWrapper.style.display = 'none';
}
```

Improved Code:

```JS
const TOGGLE_SHOW = "Show comments";
const TOGGLE_HIDE = "Hide comments";

const isShowing = showHideBtn.textContent === TOGGLE_HIDE;
showHideBtn.textContent = isShowing ? TOGGLE_SHOW : TOGGLE_HIDE;
commentWrapper.style.display = isShowing ? "none" : "block";
```

**7. Lack of Function Separation and Naming Conventions**

Original Code:

```JS
function getBearData() {
  // Fetching logic
}
```

Improved Code:

```JS
const fetchAndDisplayBears = async () => {
  try {
    const bears = await getBearData();
    if (bears) {
      renderBearImages(bears);
    } else {
      console.warn("No bear data available to display.");
    }
  } catch (err) {
    console.error("Error fetching bear data:", err);
  }
};
```

**8. Synchronous DOM Updates in Asynchronous Context (Ensures that all bear data is collected before any UI updates are made, resulting in a smoother user experience)**

Original Code:

```JS
// Updating the UI immediately after initiating fetch
fetchImageUrl(fileName).then(function(imageUrl) {
  var bear = {
    name: nameMatch[1],
    binomial: binomialMatch[1],
    image: imageUrl,
    range: "TODO extract correct range"
  };
  bears.push(bear);

  // Only update the UI after all bears are processed
  if (bears.length === rows.length) {
    // UI update logic
  }
});
```

Improved Code:

```JS
const bears = await Promise.all(bearPromises);
return bears.filter(Boolean);
```

## 2. Dependency- and Build Management Playground (10 Pts.)

Build the application with `npm` and a build and a dependency management tool of your choice (e.g. [Vite](https://vitejs.dev/), [Webpack](https://webpack.js.org/), or others).

Here are some additional resources: [Package Management and Bundling](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2-Package-Management,-Build-Management-and-Modules), [Vite Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.1-Vite-Web-Application-Setup), [Webpack Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.2-Webpack-Web-Application-Setup).

**Tasks:**

- (1) Integrate `npm` and a build management tool into your project.
- (2) Configure your project to use Typescript as your primary development language and adapt the code and file extensions respectively.
- (2) Use ESLint and Prettier inside your project - rulesets can be found below.
- (1) Keep your builds clear and add dependencies to the right build (e.g. do not add dev dependencies inside the production build and vice versa).
- (1) Define the following tasks within `npm scripts`:
  - `dev`: starts the development server
  - `build`: runs the typescript compiler and bundles your application - bundling depends on your chosen build tool (e.g. Vite, Webpack) but typically bundles multiple files into one, applies optimizations like minification and obfuscation and outputs final results to a `dist` or `build` directory.
  - `lint`: runs ESLint on all `.js` and `.ts` files in your projects `/src` directory
  - `lint:fix`: runs and also fixes all issues found by ESLint
  - `format`: formats all `.js` and `.ts` files in your projects `/src` directory
  - `format:check`: checks if the files in the `/src` directory are formatted according to Prettier's rules.
- (1) Configure a pre-commit hook that lints and formats your code using [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged). A tutorial can be found [here](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9).
- (2) Answer the question at the end of this section inside `Readme.md` file:

**ESLint Configurations**

Use ESLint configs [standard-with-typescript](https://www.npmjs.com/package/eslint-config-standard-with-typescript) and [TypeScript ESLint Plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).
Your `.eslintrc` file should have the following extensions:

```.eslintrc.yml
...
extends:
  - standard-with-typescript
  - plugin:@typescript-eslint/recommended
  - plugin:prettier/recommended
  - prettier
...
```

**Prettier Configurations**

Apply the following ruleset for Prettier:

```.prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 80
}
```

> **What improvements in your codebase were introduced by using TS instead of JS? Name at least 3 and explain why.**

Present your findings here...

**1. Static Typing**

TypeScript allows to define types for variables, function parameters, and return values.

\+ Catches type mismatches at compile time, reducing runtime errors and improving code reliability.

**2. Improved Code Readability and Maintainability**

Type annotations make code more expressive and self-documenting.

\+ Helps understand existing code more easily, especially in larger codebases.

**3. Advanced Language Features**

Supports interfaces, enums, and generics for robust and reusable code. This helps in maintaining a consistent structure across different parts of the application.

\+ Interfaces provide better type-checking and documentation. They help in enforcing the shape of objects, making the code more predictable and easier to understand.

**4. Enhanced Tooling and IDE Support**

TypeScript integrates well with IDEs, offering autocompletion, type inference, and better refactoring tools.

\+ Reduces cognitive load, allowing developers to write code more efficiently and with fewer errors, leading to faster development cycles.

**5. Backward Compatibility**

TypeScript can be gradually adopted, allowing to migrate existing JavaScript code without complete rewrites.

## 3. CI/CD Pipeline Playground (5 Pts.)

Implementation of a CI/CD pipeline to automate the development and deployment process – write automated tests.

Here are some additional resources: [GitHub Actions Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/3.2-CI-CD-Pipeline-with-Github-Pages-and-Github-Actions) and [GitHub Actions Docs](https://docs.github.com/en/actions).

**Tasks:**

- (1.5) Write at least 2 meaningful unit tests (use [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/)) for your project and configure the following tasks in `npm scripts`:
  - `test`: runs all files that include `.test.` or `.spec.`, e.g.: `example.test.ts`
  - `test:coverage`: runs tests like `test` but also creates a test coverage report
- (1) Configure **2 Workflows** in GitHub Actions, one for development and one for deployment:
  - Create a `development` branch inside your repository
  - (1) Development Workflow should at least test and lint your code when developers push to branch `development`
  - (1) Deployment Workflow is triggered when developers push into `main` branch. It should at least test, lint and build your source code. Afterwards the build artifacts of your application should be automatically deployed to Github Pages (or another hosting provider of your choice).
- (0.5) Reuse existing workflows or jobs whenever possible!

## 4. Accessibility Playground (5 Pts.)

You might have noticed that the base project has a number of accessibility issues - your task is to explore the existing site and fix them.
Use the tools presented in our accessibility workshop to test the accessibility in your project.

**(0.5) Color**

Test the current color contrast (text/background), report the results of the test, and then fix them by changing the assigned colors.

_Current Value: Green (Background) vs. Black (Text Color): 4.08 (Should be minimum 4.5:1)_

_Current Value: Green (Background) vs. Gray (Headings): 3.82 (Should be minimum 3:1)_

_New Value: 8.28 (#ffe8b0:#5d3a29)_

**(0.5) Semantic HTML**

Report on what happens when you try to navigate the page using a screen reader. Fix those navigation issues.

_Using a screen reader on a webpage where only a few items are selectable and where there’s little to no description of elements can be frustrating and, at times, confusing. Moving through the page, I realize that some elements just aren't accessible — I can't select them, and there’s no spoken feedback from the screen reader, as though they don't exist at all. Even when I find buttons or links, the screen reader often has nothing to say about them. There’s no description, no label, just silence or a generic term like “button” or “link,” leaving me guessing what they’re meant to do._

**(0.5) Audio**

The `<audio>` player isn't accessible to hearing impaired (deaf) people — can you add some kind of accessible alternative for these users?

_To make my audio content accessible to users who are deaf or hard of hearing, I provide a text transcript alongside the audio player. This transcript includes everything that's spoken, and I format it with clear headings and timestamps to help users follow along. Additionally, I ensure the transcript is styled for readability, so it's easy to navigate. This way, I'm ensuring that all users can engage with the content, regardless of their hearing ability._

**(1) Forms**

- The `<input>` element in the search form at the top could do with a label, but we don't want to add a visible text label that would potentially spoil the design and isn't really needed by sighted users. Fix this issue by adding a label that is only accessible to screen readers.
- The two `<input>` elements in the comment form have visible text labels, but they are not unambiguously associated with their labels — how do you achieve this? Note that you'll need to update some of the CSS rule as well.

_For the search input: I added a visually hidden label (<label for="search" class="visually-hidden">Search query</label>) to make it accessible for screen reader users without disrupting the layout._

_For the comment form: Each input field has been explicitly associated with its label using the for attribute, ensuring that screen readers can correctly identify which label belongs to which input._

**(0.5) Comment section**

The show/hide comment control button is not currently keyboard-accessible. Can you make it keyboard accessible, both in terms of focusing it using the tab key, and activating it using the return key?

_The code enhances keyboard accessibility for the show/hide comment control button by setting its tabindex to 0, allowing it to be focused using the Tab key. It includes event listeners for both the click event and the keypress event, specifically checking for the Enter key. When activated, it toggles the visibility of the comment section and updates the aria-expanded attribute to reflect its state (visible or hidden). This approach ensures that users can interact with the button using both mouse and keyboard, improving overall accessibility._

**(1) The table**

The data table is not currently very accessible — it is hard for screen reader users to associate data rows and columns together, and the table also has no kind of summary to make it clear what it shows. Can you add some features to your HTML to fix this problem?

_To improve the accessibility of the data table, I added a <caption> element to provide a summary of its content, which helped screen reader users grasp its purpose quickly. I ensured each data cell was linked to its corresponding header using the headers attribute, making it easier to understand the relationship between rows and columns. Additionally, I applied the scope attribute on the <th> elements to clarify whether they referred to rows or columns._

**(1) More Findings**

What other accessibility issues did you find? Explain how you did fix them.

_1. Use of Font Tags_

Issue: The use of the \<font> tag for text size and styling is outdated and not semantically appropriate. It does not convey the meaning or structure of the content effectively.

Fix: I replaced the \<font> tags with appropriate heading tags (\<h1>, \<h2>, \<h3>) to establish a clear hierarchy and improve the document's semantics. This change makes the content more understandable and navigable for screen readers.

_2. Missing lang Attribute_

Issue: The original document lacked a lang attribute in the \<html> tag, which is important for screen readers to understand the language of the content.

Fix: I added lang="en" to the \<html> tag, indicating that the primary language of the document is English.

_3. Lack of Accessible Navigation_

Issue: The navigation section did not have an accessible label, making it harder for users of assistive technologies to identify its purpose.

Fix: I added aria-label="Main Navigation" to the \<nav> element to clarify its role and improve its accessibility.

_4. Alt Text for Images_

Issue: The images in the original document lacked descriptive alt attributes, which are essential for users who cannot see the images.

Fix: I provided meaningful alt text for each image, describing the content and context of the images to enhance understanding for screen reader users.

_5. Use of \<p> for Text Blocks_

Issue: Text blocks that should be separated for better readability were not enclosed in \<p> tags, which could disrupt the flow for users.

Fix: I wrapped all text blocks in \<p> tags to ensure proper formatting and separation of content, making it easier to read and navigate.

# Extended Coding Playgrounds

Please create a new independent Repository for these playgrounds and submit a link to it in the Moodle submission.
Additionally, provide a description of how to start your frontend and backend services inside the `README.md`.

## Submission

Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:

> GitHub: leonardo1710
>
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 5. Migrate to a Frontend Framework (10 pts.)

In this playground you will migrate your application to a frontend framework of your choice.

**Tasks**:

- Migrate your application to a frontend framework of your choice (e.g. React, Angular, Vue.js, Svelte,...)
  - All previous features should still work
  - The application still should use build and dependency management
- Adapt your `npm scripts` if necessary

## 6. Integrate a Backend Framework (10 pts.)

In this playground you will use a backend framework of your choice and connect it with an API to your frontend application.

**Tasks**:

- (3) Setup a backend framework of your choice
- (2) Create an API your frontend will be connected to (REST, GraphQL, gRPC, you choose...)
- (2) Your backend should now request the bear data from presented Wikipedia API
- (3) Replace the frontend Wikipedia API calls with calls to your backend - the functionality of your frontend should work as before!
- (Optional): you may want to introduce some sort of caching layer for Wikipedia API requests

## 7. Containerize your application (10 pts.)

Dockerize your frontend and backend applications. It should be possible to start all services in the corresponding mode (development, production) with a single command (e.g. use Docker Compose for this).

**Tasks**:

- (6) Create **multi-stage Dockerfiles** for your applications (depending on your frameworks):
  - The frontend Dockerfile should: 1. run the app in a development environment 2. build the app 3. serve build artefacts over Nginx
  - The backend Dockerfile should: 1. run the app in a development environment 2. build the app if there is a build step in your framework (optional) 3. serve the app
- (4) Create two docker-compose files to orchestrate you applications in `development` and `production` mode:
  - Define ports and dependencies
  - Define corresponding stage (development, production)
  - Use environment variables if possible
- Your application should start with the following commands:
  - Development: `docker-compose -f docker-compose.yml up --build`
  - Production: `docker-compose -f docker-compose.prod.yml up --build`
