# API Mock Implementation

This directory contains a complete mock API implementation that allows the CareGiver app to run without a backend server.

## Quick Start

To switch between real and mock APIs, edit `api-config.ts`:

```typescript
// Use mock APIs (no backend required)
export const USE_MOCK_API = true

// Use real APIs (backend server required)  
export const USE_MOCK_API = false
```

## Files Overview

- `index.ts` - Main entry point that exports either real or mock APIs
- `api-config.ts` - Configuration to switch between real/mock APIs
- `api-wrapper.ts` - Runtime API selection logic
- `mock-api.ts` - Complete mock implementation of all APIs
- All other `.ts` files - Original real API implementations

## Mock API Features

The mock API provides:

- ✅ All API functions with same signatures as real APIs
- ✅ Realistic mock data and responses
- ✅ Simulated network delays (300-1000ms)
- ✅ Proper error handling patterns
- ✅ Type safety and IntelliSense support

## Usage

Import APIs exactly as before - the mocking is transparent:

```typescript
import { login, getPets, createBooking } from '@/services/api'

// These will use mock or real APIs based on configuration
const result = await login({ email, password })
const pets = await getPets()
const booking = await createBooking(bookingData)
```

## Mock Data Examples

### User Authentication
- Any email/password combination will succeed
- SMS verification code: `123456` (always valid)
- Returns mock JWT tokens and user data

### Bookings
- Returns realistic booking data with mock petsitters
- All booking operations (create, update, cancel) succeed
- Includes current, previous, and waiting bookings

### Pets
- Returns 2 mock pets by default
- CRUD operations all succeed with realistic responses

### Payments
- All payment calculations return mock pricing
- Payment creation always succeeds
- Mock settlement and verification data

## Benefits

1. **Development without Backend**: Run the app locally without server setup
2. **Testing**: Predictable responses for automated tests  
3. **Demos**: Reliable demo data for presentations
4. **Offline Development**: Work without internet connectivity
5. **Fast Iteration**: No network delays for rapid development

## Customization

To modify mock data, edit `mock-api.ts`:

```typescript
const generateMockUser = (id: number = 1): MockUser => ({
  id,
  nickname: `CustomUser${id}`, // Customize this
  email: `custom${id}@example.com`, // And this
  // ... other fields
})
```

## Production Deployment

For production, ensure `USE_MOCK_API = false` in `api-config.ts` to use real APIs.

## Console Output

The console will show which API mode is active:
- `🚀 Using Mock APIs - Running without backend server`
- `🌐 Using Real APIs - Connecting to backend server`