## Date

### { What did I build today?

### What did I learn?

### What confused me?

### What mistakes did I make?

### How did I fix them?

### What questions do I still have?

### What would I do differently next time?

### 🧠 Biggest Realization }

## Date 18/07/2026

### What did I build today?

i am building pasword field in mongoose ODM

### What did I learn?

### What confused me?

### What mistakes did I make?

### How did I fix them?

### What questions do I still have?

### What would I do differently next time?

### 🧠 Biggest Realization

Not every validation rule should exist because Mongoose supports it.

Every rule should solve a business problem or a security problem.

Examples:

- Email → lowercase because it is an identifier.
- Password → never lowercase because it is a secret.
- Name → trim because users don't intentionally want leading/trailing spaces.
- Password → don't trim because spaces may be intentional.

## 🧠 Biggest Realization

Middleware is behavior attached to a model's lifecycle.

Instead of remembering to hash passwords everywhere, the User model protects itself before every save.

This is a practical example of Encapsulation in OOP.

Another important lesson is that passwords should only be hashed when they change. Otherwise, we would hash an already-hashed password and break authentication.

## 🧠 Biggest Realization

I learned that the second argument to `bcrypt.hash()` is not "the number of salts."

It is the **cost factor**, which controls how computationally expensive hashing is.

The random salt is generated automatically for every password.

Increasing the cost factor makes password cracking slower, but it also makes legitimate logins slower, so choosing the value is a security-versus-performance decision.

# Sprint 10 - TypeScript & Mongoose Typing

## 🧠 Biggest Realization

TypeScript errors are often caused by losing type information earlier in the code.

Instead of trying to silence an error, I should ask:

- What type is missing?
- Where should that type have come from?
- Where did I lose it?

Today I learned that removing generic type information from a Mongoose Schema causes `this` to become `unknown`.

I also learned that state and behavior should be represented separately:

- IUser → state
- UserMethods → behavior

This mirrors OOP principles and helps TypeScript understand my model.

## 🧠 Biggest Realization

I noticed that I was thinking in terms of function calls instead of responsibilities.

A Controller should ask the Service.

A Service should make business decisions.

A Repository should answer database questions.

Every layer should answer only the questions that belong to it.

Another lesson:

Passing many primitive values between layers is harder to maintain than passing a single object that represents the business data.

## 🧠 Biggest Realization

I learned that passing multiple primitive values between layers is error-prone because the order matters.

Passing a single object (DTO) makes the code:

- Easier to read
- Easier to extend
- Harder to misuse
- Better aligned with business concepts

Instead of passing three strings, I now pass one object that represents a registration request.
