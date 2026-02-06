export const paymentConfig = {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
}

export const kycConfig = {
  provider: process.env.KYC_PROVIDER || 'disabled',
  apiKey: process.env.KYC_API_KEY || '',
}
