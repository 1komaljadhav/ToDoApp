#Todo App - Project Documentation

 Project Overview
This is a responsive React.js-based Todo App landing page designed according to a provided Figma design. It includes a landing UI, a registration form modal, data display in table format, and interactive, accessible components built with Tailwind CSS.
 Features
 Landing Page
•	Responsive design using Tailwind CSS
•	Hero section, logo, CTA buttons, and feature sections
•	Social logos section (Google, Facebook, etc.)
•	Testimonials and final CTA section
 Form Modal
•	Triggered via “Get Started” button
•	Includes fields:
o	First Name, Last Name
o	Gender (radio)
o	Language (checkboxes)
o	Email
o	Terms agreement checkbox
•	Validation for all required fields
•	Confirmation popup upon submission
Table Display
•	Submitted data displayed in real-time below the landing page
•	Table includes:
o	Checkbox for each row
o	Name, Gender, Language, Email
•	Responsive and scrollable on smaller screens

 Tech Stack
•	Frontend: React.js
•	Styling: Tailwind CSS
•	State Management: React useState
•	Validation: Manual (with inline error messages)

 Setup Instructions
1.	Clone the project:
git clone https://github.com/yourusername/todo-app.git
cd todo-app
2.	Install dependencies:
npm install
3.	Start the development server:
npm start

 Validation Logic
All form fields are validated on submission:
•	Empty fields check
•	Email format using RegEx
•	At least one language selected
•	Terms agreement checkbox must be checked

 Responsiveness
•	Layout adapts to mobile, tablet, and desktop breakpoints
•	Uses Tailwind responsive utility classes (sm:, md:, lg:)
•	Horizontal scrolling enabled for table on smaller screens

 
 


