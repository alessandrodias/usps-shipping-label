# Project Overview

This project is a web application that allows you to generate USPS shipping labels for your packages.

## Setup instructions

1. Clone the repository
2. Duplicate the `.env.example` file and rename it to `.env.local`
3. Run `npm install` to install the dependencies
4. Run `npm run dev` to start the development server
5. Open `http://localhost:3000` in your browser

## Usage instructions

1. Fill in the sender and recipient addresses

> Sender Address

```
Street: 417 MONTGOMERY ST
City: SAN FRANCISCO
State: CA
Zip: 94104
```

> Recipient Address

```
Street: 700-998 HARWOOD ST
City: ORLANDO
State: FL
Zip: 32803
```

2. Fill in the package details
3. Click the "Generate Label" button to generate the label
4. Click the "Download Label" button to download the label

### Features

- Address Verification
- Package Details Verification
- Label Generation and Download
- Wizard form with steps

## Future improvements

- Improvements on the UI and UX
- Apply masks to the fields according to the type of data
- Autocomplete the address fields
- Validate address when the user finishes typing
- Improve the Stepper component on the mobile version
- Add animations on the Stepper component (like a progress bar or timeline)
- Use autocomplete for the state field in the address form

### Tech Stack

- Next.js
- Tailwind CSS
- TypeScript
- EasyPost API
- Zod
- React Hook Form
- Lucide Icons
