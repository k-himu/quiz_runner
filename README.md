# CSE MCQ Mock Test

A lightweight, customizable **Computer Science MCQ / Mock Test application** built with **HTML, CSS, and Vanilla JavaScript**.

The application is designed as a personal learning tool for practicing Core Computer Science subjects such as:

* Pseudocode
* DBMS
* Operating Systems
* Computer Networks
* OOPS
* Data Structures
* Algorithms
* Computer Organization
* Compiler Design
* Theory of Computation
* And more

The application does **not** contain hardcoded questions.

All questions are stored in a separate `Questionformat.json` file, which means the same application can be reused for unlimited custom mock tests.

---

## Features

* Clean and minimal examination-style interface
* 10-question custom mock tests
* Questions loaded dynamically from JSON
* Four multiple-choice options
* Answer selection
* Answer verification
* Correct / incorrect feedback
* Explanation for each question
* Question progress indicator
* Countdown timer
* Subject, topic, and difficulty labels
* Pseudocode / code question support
* Keyboard shortcuts for selecting answers
* Final score calculation
* Correct vs incorrect question count
* Score percentage
* Visual donut/pie-style score chart
* Restart quiz functionality
* Responsive design for desktop, tablet, and mobile
* No database required
* No backend server required
* No npm or external JavaScript libraries required

---

# Project Structure

```text
CSE-MCQ/
│
├── quiz.html
├── styles.css
├── backend.js
├── Questionformat.json
└── README.md
```

### What each file does

| File                  | Purpose                                             |
| --------------------- | --------------------------------------------------- |
| `quiz.html`           | Structure of the application                        |
| `styles.css`          | Complete visual design and responsive layout        |
| `backend.js`          | Quiz logic and application functionality            |
| `Questionformat.json` | Questions, answers, explanations, and quiz settings |
| `README.md`           | Project documentation                               |

---

# How the Application Works

The application follows this workflow:

```text
Questionformat.json
        │
        ▼
    backend.js
        │
        ▼
     quiz.html
        │
        ▼
    styles.css
        │
        ▼
    Quiz Interface
        │
        ▼
     User answers
        │
        ▼
    Check Answer
        │
        ▼
  Correct / Incorrect
        │
        ▼
    Next Question
        │
        ▼
    Final Results
```

The important concept is that the **quiz engine and questions are completely separate**.

You can replace the questions without changing the HTML, CSS, or JavaScript.

---

# Requirements

You only need:

1. A computer
2. [VS Code](https://code.visualstudio.com/)
3. The **Live Server** extension for VS Code
4. A modern web browser

No Node.js, npm, database, or web server configuration is required for normal local use.

---

# Running the Application Locally

## Step 1 — Download or Clone the Repository

Download the project from GitHub or clone it using Git.

Example:

```bash
git clone YOUR_REPOSITORY_URL
```

Then open the project folder in VS Code.

---

## Step 2 — Check the Files

Make sure the project contains:

```text
quiz.html
styles.css
backend.js
Questionformat.json
```

All four files should be in the **same folder**.

---

## Step 3 — Install Live Server

In VS Code:

1. Open Extensions
2. Search for **Live Server**
3. Install the Live Server extension
4. Restart VS Code if necessary

---

## Step 4 — Start the Application

Open:

```text
quiz.html
```

Then right-click anywhere inside the file and select:

```text
Open with Live Server
```

Your browser should automatically open the application.

The URL will usually look similar to:

```text
http://127.0.0.1:5500/quiz.html
```

or:

```text
http://localhost:5500/quiz.html
```

---

# Why Live Server Is Required

The application loads the questions using JavaScript:

```javascript
fetch("Questionformat.json")
```

Modern browsers can restrict requests to local files opened directly using:

```text
file://
```

For example, opening:

```text
C:\CSE-MCQ\quiz.html
```

directly may prevent JavaScript from fetching the JSON file.

Live Server provides a local web server, allowing the browser to load:

```text
quiz.html
styles.css
backend.js
Questionformat.json
```

correctly.

Therefore, **use Live Server when running the application locally.**

---

# Creating Your Own Quiz

The most important file is:

```text
Questionformat.json
```

You do not need to modify:

```text
quiz.html
styles.css
backend.js
```

every time you want a new quiz.

Simply replace the contents of:

```text
Questionformat.json
```

with a new question set.

---

# JSON Structure

The basic structure is:

```json
{
  "quiz": {
    "title": "Daily CSE Mock Test",
    "description": "Custom 10-question Core CSE practice test",
    "subject": "Mixed CSE",
    "durationMinutes": 15,
    "totalQuestions": 10
  },

  "questions": [
    {
      "id": 1,
      "subject": "DBMS",
      "topic": "Normalization",
      "difficulty": "Medium",
      "question": "Your question here.",
      "code": null,
      "options": [
        {
          "id": "A",
          "text": "Option A"
        },
        {
          "id": "B",
          "text": "Option B"
        },
        {
          "id": "C",
          "text": "Option C"
        },
        {
          "id": "D",
          "text": "Option D"
        }
      ],
      "correctAnswer": "B",
      "explanation": "Explanation of the correct answer.",
      "tags": [
        "normalization",
        "DBMS"
      ]
    }
  ]
}
```

---

# Quiz Settings

The `quiz` object controls the overall quiz.

```json
"quiz": {
  "title": "Daily CSE Mock Test",
  "description": "Custom 10-question Core CSE practice test",
  "subject": "Mixed CSE",
  "durationMinutes": 15,
  "totalQuestions": 10
}
```

### `title`

The name displayed at the top of the application.

Example:

```json
"title": "DBMS Daily Practice"
```

### `description`

Short description of the quiz.

Example:

```json
"description": "10 questions on SQL and normalization"
```

### `subject`

The overall subject of the quiz.

Example:

```json
"subject": "DBMS"
```

For mixed tests:

```json
"subject": "Mixed CSE"
```

### `durationMinutes`

Time limit for the quiz.

Example:

```json
"durationMinutes": 20
```

For a 20-minute test.

### `totalQuestions`

Number of questions.

Example:

```json
"totalQuestions": 10
```

This should match the number of objects inside the `questions` array.

---

# Question Fields

Each question contains:

```json
{
  "id": 1,
  "subject": "DBMS",
  "topic": "Normalization",
  "difficulty": "Medium",
  "question": "Question text",
  "code": null,
  "options": [],
  "correctAnswer": "B",
  "explanation": "Explanation",
  "tags": []
}
```

---

## `id`

Unique question number.

```json
"id": 1
```

Use:

```text
1
2
3
4
...
10
```

---

## `subject`

The subject of the individual question.

Examples:

```json
"subject": "DBMS"
```

```json
"subject": "Operating Systems"
```

```json
"subject": "Computer Networks"
```

```json
"subject": "OOPS"
```

```json
"subject": "Pseudocode"
```

---

## `topic`

The specific topic being tested.

Examples:

```json
"topic": "Normalization"
```

```json
"topic": "CPU Scheduling"
```

```json
"topic": "OSI Model"
```

```json
"topic": "Polymorphism"
```

```json
"topic": "Arrays"
```

---

## `difficulty`

Recommended values:

```text
Easy
Medium
Hard
```

Example:

```json
"difficulty": "Hard"
```

---

# Question Text

The actual MCQ goes here:

```json
"question": "Which normal form eliminates partial dependency?"
```

---

# Code / Pseudocode Questions

The `code` property is optional.

For a normal question:

```json
"code": null
```

For a pseudocode question:

```json
"code": "x = 0\nFOR i = 1 TO 5\n    x = x + i\nEND FOR\nPRINT x"
```

The application automatically detects whether code exists and displays the code block.

---

# Options

Every question must contain exactly **four options**:

```text
A
B
C
D
```

Example:

```json
"options": [
  {
    "id": "A",
    "text": "1NF"
  },
  {
    "id": "B",
    "text": "2NF"
  },
  {
    "id": "C",
    "text": "3NF"
  },
  {
    "id": "D",
    "text": "BCNF"
  }
]
```

The application expects exactly four options.

---

# Correct Answer

The correct answer is specified using the option ID:

```json
"correctAnswer": "B"
```

Do **not** write:

```json
"correctAnswer": "2NF"
```

Use the option identifier instead:

```json
"correctAnswer": "B"
```

---

# Explanation

The explanation appears after the user checks their answer.

Example:

```json
"explanation": "2NF eliminates partial dependency of non-key attributes on a candidate key."
```

This makes the application useful as a **learning tool**, rather than just a score calculator.

---

# Tags

Tags help describe the concepts covered by the question.

Example:

```json
"tags": [
  "normalization",
  "functional dependency",
  "DBMS"
]
```

Tags are currently stored in the JSON for organization and future features.

---

# Complete Example

Here is a complete example of one question:

```json
{
  "id": 1,
  "subject": "Operating Systems",
  "topic": "CPU Scheduling",
  "difficulty": "Medium",
  "question": "Which CPU scheduling algorithm assigns a fixed time quantum to each process?",
  "code": null,
  "options": [
    {
      "id": "A",
      "text": "FCFS"
    },
    {
      "id": "B",
      "text": "SJF"
    },
    {
      "id": "C",
      "text": "Round Robin"
    },
    {
      "id": "D",
      "text": "Priority Scheduling"
    }
  ],
  "correctAnswer": "C",
  "explanation": "Round Robin assigns each process a fixed time quantum and cycles through the ready queue.",
  "tags": [
    "CPU scheduling",
    "Round Robin",
    "operating systems"
  ]
}
```

---

# Daily Quiz Workflow

This project is designed to work particularly well with ChatGPT.

A typical daily workflow is:

```text
Open ChatGPT
      │
      ▼
Ask for today's 10 MCQs
      │
      ▼
ChatGPT generates Questionformat.json
      │
      ▼
Copy the JSON
      │
      ▼
Replace Questionformat.json
      │
      ▼
Save
      │
      ▼
Run Live Server
      │
      ▼
Take the mock test
```

For example, you can ask:

> Generate today's 10 Core CSE MCQs using the exact JSON format of this project.
> 3 DBMS, 2 Operating Systems, 2 Computer Networks, 2 OOPS, 1 Pseudocode.
> Difficulty: Medium to Hard.

Then copy the generated JSON into:

```text
Questionformat.json
```

The application does the rest.

---

# Supported CSE Subjects

There is no hardcoded subject restriction in the application.

You can use:

```text
Pseudocode
DBMS
Operating Systems
Computer Networks
OOPS
Data Structures
Algorithms
Computer Organization
Compiler Design
Theory of Computation
Software Engineering
Discrete Mathematics
C
C++
Java
Python
```

or any other technical subject.

The application only requires the JSON structure to remain valid.

---

# Keyboard Shortcuts

During a question, you can select an option using:

```text
A → Option A
B → Option B
C → Option C
D → Option D
```

This allows faster practice when using a keyboard.

---

# Timer

The timer is controlled through:

```json
"durationMinutes": 15
```

For example:

```json
"durationMinutes": 30
```

creates a 30-minute quiz.

If `durationMinutes` is missing or set to `0`, the application does not run a countdown.

When the timer reaches zero, the quiz automatically ends and the remaining questions are treated as unanswered/incorrect for scoring purposes.

---

# Final Results

After completing the quiz, the application displays:

* Total score
* Score percentage
* Number of correct answers
* Number of incorrect answers
* Visual score chart
* Option to take the quiz again

Example:

```text
             7 / 10

              70%

       ┌─────────────────┐
       │                 │
       │    Score        │
       │                 │
       └─────────────────┘

     Correct       Incorrect
        7              3
```

---

# GitHub

The project can be stored on GitHub so that it is available from anywhere.

## Uploading the Project

Create a new repository on GitHub.

For example:

```text
cse-mcq
```

Then upload:

```text
quiz.html
styles.css
backend.js
Questionformat.json
README.md
```

Your repository will look like:

```text
cse-mcq
│
├── quiz.html
├── styles.css
├── backend.js
├── Questionformat.json
└── README.md
```

---

# Running the Project After Downloading From GitHub

Downloading the repository does not automatically run the application.

After downloading:

1. Open the folder in VS Code.
2. Make sure all four application files are present.
3. Install the Live Server extension if necessary.
4. Open `quiz.html`.
5. Right-click `quiz.html`.
6. Select **Open with Live Server**.

The application will then run locally.

---

# Running Directly From GitHub

The easiest way to run this project online is **GitHub Pages**.

GitHub Pages can host this project because it is a static web application.

There is no server-side code or database required.

## Enable GitHub Pages

After uploading the project:

1. Open your GitHub repository.
2. Go to **Settings**.
3. Open **Pages**.
4. Under the deployment/source section, select the branch containing your project, usually `main`.
5. Select the root folder `/`.
6. Save the settings.
7. GitHub will provide a Pages URL.

It will generally look similar to:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

Open that URL in your browser.

Your quiz application will run directly from GitHub Pages.

---

# Important GitHub Pages Note

GitHub Pages serves static files.

That is perfect for this project because:

```text
HTML
+
CSS
+
JavaScript
+
JSON
```

are all static files.

The application does not currently require:

```text
Node.js
PHP
Python backend
Database
API server
```

Therefore, GitHub Pages is sufficient.

---

# Updating the Quiz on GitHub

You have two choices.

## Option 1 — Local Development

Change:

```text
Questionformat.json
```

on your computer and run it using Live Server.

This is ideal for personal daily practice.

## Option 2 — Update the GitHub Version

Edit:

```text
Questionformat.json
```

and push the changes to GitHub.

GitHub Pages will then update the hosted version.

The HTML, CSS, and JavaScript do not need to be changed when only the questions are changing.

---

# Git Workflow

If Git is installed, the normal workflow is:

```bash
git add .
git commit -m "Update daily quiz"
git push
```

After pushing, the GitHub repository contains the latest questions.

GitHub Pages will use the updated files.

---

# Important JSON Rules

When creating a new quiz, make sure:

### 1. JSON is valid

JSON does not allow comments.

Do not write:

```json
{
  // This is a comment
  "title": "Quiz"
}
```

### 2. Use double quotes

Correct:

```json
"subject": "DBMS"
```

Not:

```json
'subject': 'DBMS'
```

### 3. Don't leave trailing commas

Correct:

```json
{
  "id": 1,
  "subject": "DBMS"
}
```

Not:

```json
{
  "id": 1,
  "subject": "DBMS",
}
```

### 4. Keep four options

Every question should contain:

```text
A
B
C
D
```

### 5. Correct answer must match an option ID

For example:

```json
"correctAnswer": "C"
```

must correspond to:

```json
{
  "id": "C",
  "text": "..."
}
```

---

# Troubleshooting

## Quiz does not load

Make sure you are using:

```text
Open with Live Server
```

instead of opening `quiz.html` directly.

---

## "Failed to load Questionformat.json"

Check that:

```text
Questionformat.json
```

is in the same folder as:

```text
quiz.html
backend.js
styles.css
```

---

## Blank question screen

Check the browser's developer console.

In Chrome/Edge:

```text
Right Click → Inspect → Console
```

A malformed JSON file can prevent the application from loading.

---

## JSON error

Use a JSON validator or VS Code's built-in error highlighting.

Common causes include:

* Missing comma
* Extra comma
* Missing quotation mark
* Incorrect brackets
* Invalid JSON syntax

---

## GitHub Pages shows an error

Check that:

```text
quiz.html
```

is present in the repository's root directory.

Also make sure:

```text
styles.css
backend.js
Questionformat.json
```

are in the correct location and that their filenames match the references in `quiz.html` and `backend.js`.

---

# Technology

This project uses:

* HTML5
* CSS3
* Vanilla JavaScript
* JSON
* GitHub Pages

No framework or external JavaScript library is required.

---

# Design Philosophy

The application intentionally keeps the architecture simple:

```text
Questions
    ↓
JSON

Interface
    ↓
HTML + CSS

Application Logic
    ↓
JavaScript
```

This makes it easy to:

* Modify questions
* Share the project
* Host it on GitHub
* Run it locally
* Learn how the application works
* Extend the application later

---

# Future Improvements

Possible future additions include:

* Random question order
* Random option order
* Question review screen
* Previous question button
* Mark question for review
* Negative marking
* Subject filtering
* Difficulty filtering
* Question bank containing hundreds of questions
* Multiple quiz sets
* Detailed performance analytics
* Weak-topic analysis
* Attempt history
* LocalStorage-based score history
* Dark mode
* Import/export quiz files
* Custom quiz generator
* Better mobile exam interface
* Keyboard navigation
* Exam submission confirmation
* Separate review of incorrect questions

---

# License

This project is intended as a personal learning and practice tool.

You are free to modify it for your own educational use and share it with friends.

---

# Author

Created as a customizable personal **Core CSE Mock Test / Learning Tool**.

The application is designed to make it easy to generate a fresh set of questions, place them into `Questionformat.json`, and immediately take a new mock test.

---

## Quick Start

If you already have the project downloaded:

```text
1. Open the project in VS Code
2. Update Questionformat.json
3. Open quiz.html
4. Right-click → Open with Live Server
5. Start the quiz
```

For a new daily test:

```text
Ask ChatGPT for new questions
          ↓
Copy the generated JSON
          ↓
Replace Questionformat.json
          ↓
Save
          ↓
Refresh the quiz
          ↓
Take the new test
```

**The quiz engine stays the same. Only the questions change.**
