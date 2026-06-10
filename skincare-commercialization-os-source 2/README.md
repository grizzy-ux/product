# Skincare Commercialization OS

A lightweight browser app for managing skincare product commercialization, output-driven stage gates, and a customizable RACI matrix.

The app is designed for early operating-model work: it runs as a static site, stores edits in browser local storage, and can be published directly with GitHub Pages.

## Features

- Portfolio summary page for daily operating review
- Output-driven gate process:
  - Ideation
  - Validation
  - Formulation Development
  - Packaging Development
  - Testing & Validation
  - Commercialization Planning
  - Launch Readiness
  - Post-Launch Review
- Required decisions, required documents, owners, blockers, notes, and go/no-go criteria per gate
- Gate criteria with locked advance buttons until outputs are met
- Editable product inputs and product switching
- Product detail page with vendor, formula round, packaging status, testing status, target launch, and all gate notes
- Conservative, base, and optimistic business-case model
- Separate RACI matrix page
- Editable roles, people, and A/R/C/I assignments by stage
- One accountable person per stage
- CSV exports for products, stage outputs, and RACI
- JSON backup export/import
- Local browser persistence

## Run Locally

Open `index.html` directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 4173
```

Then visit:

```text
http://localhost:4173
```

## Deploy With GitHub Pages

1. Create a new GitHub repository.
2. Push this repository to GitHub.
3. In GitHub, go to `Settings > Pages`.
4. Set the source to `Deploy from a branch`.
5. Choose the `main` branch and `/ (root)`.

## Notes

This is a static prototype. Data is stored in the browser that uses it, through `localStorage`. For shared company-wide use, the next step would be adding a backend or connecting the app to a hosted database such as Supabase, Airtable, or Google Sheets.
