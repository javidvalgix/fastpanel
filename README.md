# Fastpanel SDK

Fastpanel SDK for interacting with the Fastpanel API at [fastpanel.direct](https://fastpanel.direct).

## Features

- Easy authentication
- User management
- Role-based access control
- TypeScript support

## Installation

You can install the Fastpanel SDK via npm:
```bash
npm install fastpanel
```

## Usage

To use the Fastpanel SDK, you need to create an instance of the `FClient` class with your Fastpanel URL, username, and password.

### Example
```typescript
import { FClient } from 'fastpanel';

const Api = new FClient('my.domain.com', 'fastuser', 'ExamplePassword');

async function main() {
    const users = await api.users();
    console.log('All users:', users);
}
main().catch(console.error);
```

## Creating new user
```typescript
const newUser = await api.createUser(
        'username', // Username (min. length 4)
        'userpassword', // User password (min. length 6)
        'user', // User role ('user' or 'reseller')
        2048); // Storage quota in MB
console.log(newUser);
```

## To get a specific user
```typescript
const getUser = await api.getUser(3); // User id
console.log(newUser);
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.