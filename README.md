# SignalCheck: A Service Status and Incident Management System

SignalCheck is a comprehensive service status and incident management system built with Next.js, tRPC, and Prisma. It provides real-time monitoring of service health, incident reporting, and maintenance scheduling.

## Project Description

SignalCheck is designed to help organizations maintain transparency and communication with their users regarding the status of their services. It offers a user-friendly interface for both administrators and end-users to view and manage service statuses, incidents, and scheduled maintenance events.

Key features include:
- Real-time service status monitoring
- Incident reporting and management
- Scheduled maintenance planning
- Administrative dashboard for service management
- Public-facing status page for users

The application is built using modern web technologies, ensuring a responsive and efficient user experience. It leverages Next.js for server-side rendering and routing, tRPC for type-safe API calls, and Prisma for database management.

## Technology Stack

SignalCheck is built on the T3 Stack, a powerful and flexible starting template for modern web applications. The key technologies used in this project include:

1. **Next.js**: A React framework for building server-side rendered and statically generated web applications.
2. **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and developer productivity.
3. **tRPC**: Enables end-to-end typesafe APIs, reducing the need for manual type checking and improving development speed.
4. **Prisma**: An open-source database toolkit that simplifies database access and management.
5. **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
6. **Shadcn UI**: A collection of re-usable components built with Radix UI and Tailwind CSS, used to fastrack development of the user interface.
7. **Clerk**: A complete user management and authentication solution.
8. **Zod**: A TypeScript-first schema declaration and validation library.

This technology stack allows for a secure application with minimal effort by:
- Providing type safety across the full stack (TypeScript, tRPC, Prisma)
- Offering built-in security features (Next.js, Clerk)
- Enabling easy implementation of best practices for web security
- Reducing the surface area for potential bugs and vulnerabilities through strong typing and validation (Zod, TypeScript)

## Repository Structure

```
.
├── prisma/
│   └── seed.ts              # Database seeding script
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── lib/                 # Utility functions
│   ├── server/              # Server-side code and API routes
│   ├── styles/              # Global styles
│   └── trpc/                # tRPC setup
├── components.json          # UI component configuration
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies and scripts
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

Key Files:
- `src/app/page.tsx`: Main entry point for the public-facing status page
- `src/app/admin/page.tsx`: Admin dashboard entry point
- `src/server/api/root.ts`: tRPC API router definition
- `prisma/seed.ts`: Initial data seeding for the database

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v14 or later)
- pnpm (v6 or later)
- PostgreSQL database

Steps:
1. Clone the repository
2. Run `pnpm install` to install dependencies
3. Copy `.env.example` to `.env` and update the database connection string
4. Run `pnpm prisma db push` to set up the database schema
5. Run `pnpm prisma db seed` to seed the database with initial data

### Getting Started

1. Start the development server:
   ```
   pnpm dev
   ```
2. Open `http://localhost:3000` in your browser to view the public status page
3. Navigate to `http://localhost:3000/admin` to access the admin dashboard

### Configuration

- Update `src/env.js` to configure environment variables
- Modify `tailwind.config.ts` to customize the application's styling
- Use Shadcn UI components from `src/components/ui` to build new features or modify existing ones

### Common Use Cases

1. Reporting an Incident:
   - Navigate to the admin dashboard
   - Use the "Report Incident" form to create a new incident
   - Select the affected service and provide a title for the incident

2. Updating Service Status:
   - In the admin dashboard, use the "Manage Services" section
   - Select a service and choose its new status from the dropdown

3. Scheduling Maintenance:
   - Use the "Schedule Maintenance" form in the admin dashboard
   - Select the service, provide a title, and set the start and end times

### Testing & Quality

To run tests:
```
pnpm test
```

### Troubleshooting

Common Issue: Database Connection Errors
- Ensure your PostgreSQL server is running
- Verify the `DATABASE_URL` in your `.env` file is correct
- Check for any firewall issues blocking the database port

Debugging:
- Enable debug logging by setting `DEBUG=*` in your environment
- Check the console output and application logs for error messages

## Data Flow

SignalCheck follows the T3 Stack architecture, which provides a robust and type-safe data flow:

1. Client makes a request to the Next.js server
2. Next.js server renders the appropriate page or handles the API request
3. tRPC router processes API requests, providing end-to-end type safety
4. Prisma ORM interacts with the database, ensuring type-safe database operations
5. Data is returned to the client, updating the UI

```
[Client] <-> [Next.js Server] <-> [tRPC Router] <-> [Prisma ORM] <-> [PostgreSQL Database]
```

Key technical considerations:
- Server-side rendering is used for initial page loads
- tRPC enables type-safe API calls between the client and server
- Prisma provides an abstraction layer for database operations
- The T3 Stack ensures consistency and type safety across the entire application

## Deployment

Prerequisites:
- Vercel account (recommended) or any Node.js hosting platform
- PostgreSQL database (e.g., Supabase, Railway, or self-hosted)

Deployment steps:
1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy the application

For other platforms, follow their respective Node.js deployment guides.