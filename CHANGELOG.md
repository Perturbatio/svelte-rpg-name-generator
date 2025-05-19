# Changelog

All notable changes to the RPG Character Name Generator project will be documented in this file.

## [Unreleased]

### Added

- Initial project setup with SvelteKit, Tailwind CSS, and DaisyUI
- Home page with hero section and link to pattern creation page
- Pattern creation page with textarea for entering patterns
- Pattern parser that generates an Abstract Syntax Tree (AST) from user input
- Interactive tree view component to display the AST with expand/collapse functionality
- Collapsible sidebar containing pattern rules documentation
- Floating toggle button for the sidebar that shifts as the sidebar opens/closes
- Theme toggle button for switching between light and dark modes
- Responsive layout with proper spacing and padding
- Error handling for pattern parsing with user-friendly error messages
- AST Processor that generates string output from AST nodes, with initial support for vowel generation
- CharacterName component that displays the result of processing an AST as a character name

### Pattern Rules Implemented

- Nested patterns using parentheses `()`
- OR statements using pipe `|`
- Character lists using square brackets `[]`
- String literals using double quotes `""`
- Single accented vowel using `a`
- Single vowel using `v`
- Vowel pairs using `V`
- Single consonant using `c`
- Consonant pairs using `C`
- Soft consonants using `s`
- Soft consonant pairs using `S`
- Weighted vowels using `w`
- Soft syllables using `y`

### UI/UX Improvements

- Consistent layout with header, main content, and footer
- Theme system that respects user's system preference and saves explicit choices
- Accessible colour contrast in both light and dark themes
- Proper spacing between UI elements
- Collapsible sidebar that doesn't interfere with the main content
- Real-time AST generation as the user types
- Interactive AST display with expand/collapse functionality
- Pattern persistence: last used pattern is saved and restored automatically
- Warning symbols with tooltips for unknown tokens in the AST to help identify possible errors
- Pattern page is now the default landing page for improved user experience
- Collapsible AST output that can be toggled to show/hide the structured output
- Darker sidebar background for better visual separation from the main content
- Enhanced theme toggle button with tooltip and improved accessibility attributes
- Enhanced sidebar toggle button with tooltip and improved accessibility attributes
- Changed warning icon for unknown nodes to yellow and black like a road warning sign for better visibility
- Dynamic character name generation that updates automatically as the pattern changes

### Technical Improvements

- Client-side theme persistence using localStorage
- Reactive pattern parsing that updates as the user types
- Recursive component for displaying the AST tree structure
- Proper error handling and display
- Changed tooltips to use standard HTML title attribute instead of DaisyUI's data-tip attribute
- Added explicit CSS definitions for DaisyUI base color classes to ensure consistent theming
- Refactored pattern parser to use individual rule classes for each pattern rule, improving maintainability and extensibility
- Refactored AST processor to use rule classes for processing AST nodes, improving extensibility and maintainability
- Added process methods to all rule classes to enable generation of character names from AST nodes
