# ADA Lawsuit Risk Calculator

A comprehensive lead-generation tool that helps businesses assess their risk of ADA website accessibility lawsuits.

## Features

- **Interactive Risk Assessment**: Step-by-step questionnaire covering all major risk factors
- **Real-time Risk Calculation**: Client-side scoring based on industry data
- **Professional Design**: Navy, white, and red color scheme with smooth animations
- **Mobile Responsive**: Works perfectly on all device sizes
- **Lead Generation**: Email capture for full accessibility reports
- **Educational Content**: Industry statistics and recommendations

## Tech Stack

- **Next.js 14**: React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development
- **Lucide React**: Icon library (no emojis)
- **Static Export**: Compatible with Vercel and other static hosts

## Risk Scoring Logic

The calculator evaluates businesses based on:

- **Industry Type**: E-commerce (+20), Healthcare/Government (+25)
- **Geographic Risk**: High-lawsuit states NY, CA, FL, PA, MA (+15)
- **Website Platform**: WordPress, Wix, Squarespace (+10)
- **Accessibility Features**: No features implemented (+25)
- **Business Size**: Revenue over $1M (+10), 50+ employees (+5)
- **Legal History**: Previous accessibility lawsuits (+20)

## Key Statistics Displayed

- 15,332 lawsuits filed since 2022
- Nearly 4,000 lawsuits in 2025 alone
- 90% filed by just 16 law firms
- Average settlement: $5,000-$25,000
- Average defense costs: $10,000-$50,000
- Government deadline: April 24, 2026

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Deploy

The application is configured for static export and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/             # React components
│   ├── ProgressBar.tsx    # Progress indicator
│   ├── QuestionCard.tsx   # Individual question UI
│   └── ResultsPage.tsx    # Results display with gauge
├── types/                  # TypeScript interfaces
├── utils/                  # Business logic and calculations
└── tailwind.config.ts     # Tailwind configuration
```

## Customization

### Updating Questions

Modify `src/utils/questionnaire.ts` to add or change assessment questions.

### Risk Scoring

Adjust scoring logic in the `calculateRiskScore` function.

### Design

Update colors and styling in `tailwind.config.ts` and component files.

## Lead Generation

The app includes an email capture form that triggers after assessment completion. In production, integrate with your preferred email marketing platform or CRM.

## Accessibility

This calculator is built with accessibility in mind:
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast design
- No reliance on color alone

## License

Built by **Egmer Marketing** - Custom-coded, accessible websites for small businesses.

## Contributing

This is a client project for Egmer Marketing. For questions or customizations, contact the development team.

## Support

For technical support or feature requests, please reach out to Egmer Marketing.