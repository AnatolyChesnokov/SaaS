# Welcome to 🛍️ Remix SaaS Documentation

The goal of Remix SaaS is to provide a lightweight, feature-rich, and production-ready Remix Stack for your next SaaS application.

> [!NOTE]
> Documentation will be updated and improved as the project progresses. If you have any questions or suggestions, feel free to open an Issue or Pull Request as we'll be more than happy to help you.

# List of Contents

- [Introduction](./guide/01-introduction.md) - Simple introduction to Remix SaaS (Recommended Read).
- [Deployment](./guide/09-deployment.md) - Step-by-step guide on how to deploy your Remix SaaS App
  to production.

Please, check the [Guide](./guide) docs in order to learn more about Remix SaaS.

# Features

A list of features that Remix SaaS provides out of the box:

- ⚡ **Vite**: Next-Gen Frontend Tooling.
- 🧩 **Prisma ORM**: Modern Database Toolkit.
- 🛍️ **Stripe**: Subscription Plans, Customer Portal, and more.
- 🔑 **Authentication**: Email Code, Magic Link and Social Logins.
- 🎨 **TailwindCSS**: Utility-First CSS Framework.
- 📐 **ShadCN**: Composable React components.
- 🌙 **Easy Theming**: Switch between Light and Dark modes with ease.
- 🗺️ **Remix Flat Routes**: Simple Route Definitions.
- 🍞 **Client & Server Toasts**: Display Toasts on your App.
- 🛡️ **Server Rate Limiting**: Extra layer of Protection for your App.
- 🕵️‍♂️ **CSRF and Honeypot Protection**: Prevent Malicious Attacks.
- 📧 **Resend**: Email for Developers.
- 💌 **React Email**: Customizable Emails with React.
- 📋 **Conform**: Type-Safe Form Validation based on Web Fundamentals.
- 📥 **File Uploads**: Profile Picture Uploads with Prisma.
- 🌐 **I18N**: Internationalization for your App.
- ⚙️ **Github Actions**: Automate CI/CD Workflows.

We've been looking into keeping Remix SaaS as simple as possible, while providing a solid foundation for your next SaaS project.

Some other "non-technical" features include:

- 💅 **Modern UI**: Carefully crafted UI with a Modern Design System.
- 🏕 **Custom Pages**: Landing, Onboarding, Dashboard and Admin Pages.
- 📱 **Responsive**: Works on all devices, from Mobile to Desktop.

# Getting Started

Before starting our development or even deploying our template, we'll require to setup a few things _(not many, I promise!)_ in order to have a smooth experience.

# Initialization

To get started, you can initialize the template into your workspace by running the following command:

# Environment

Remix SaaS requires a few environment variables to be set in order to work as expected. To keep it even simpler, on template initialization, some of these variables are already set for you.

Let's take a look at the required environment variables:

# Email

In order to send emails, Remix SaaS uses [Resend](https://resend.com/), a simple and easy-to-use email service for developers.

- You can get your API Key by visiting the [Resend Dashboard](https://resend.com/api-keys).

# Stripe

In order to use Stripe Subscriptions and seed our database, we'll require to get the secret keys from our Stripe Dashboard.

1. Create a [Stripe Account](https://dashboard.stripe.com/login) or use an existing one.
2. Visit [API Keys](https://dashboard.stripe.com/test/apikeys) section and copy the `Secret` key.
3. Paste your secret key into `.env` file as `STRIPE_SECRET_KEY`.

## Stripe Webhook

In order to start receiving Stripe Events to our Webhook Endpoint, we'll require to install the [Stripe CLI.](https://stripe.com/docs/stripe-cli) Once installed run the following command in your console. _(Make sure you're in the root of your project)_:

```sh
stripe listen --forward-to localhost:3000/api/webhook
```

This should give you a Webhook Secret Key. Copy and paste it into your `.env` file as `STRIPE_WEBHOOK_ENDPOINT`.

> [!IMPORTANT]
> This command should be running in your console while developing, especially when testing or handling Stripe Events.

# Database

Before starting our development, we'll require to setup our Prisma Migrations. Remix SaaS uses Prisma as its ORM, with SQLite as its default database. You can change it to any other database supported by Prisma.

To start your migrations, and seed the Database, run the following command in your console:

```sh
npx prisma migrate dev --name init
```

> [!NOTE]
> Resetting migrations will require us to clean our Stripe Data. You can do that by visiting your [Stripe Test Dashboard](https://dashboard.stripe.com/test/developers), scrolling down and clicking on `Delete all test data`.

# Development Server

Now that we have everything configured, we can start our development server. Run the following command in your console:

```sh
npm run dev
```

You should be able to access your app at 🎉 [http://localhost:3000](http://localhost:3000).

## Learn More

Please, make sure to check the rest of the documentation and learn more about Remix SaaS, its features and how to use them. A good starting point is the [Authentication](./guide/02-authentication.md) section, as it covers all the authentication methods, how to authenticate as admin, and more.

# Deployment

Deployment and some other docs are available in the [Deployment](./guide/09-deployment.md) section.
