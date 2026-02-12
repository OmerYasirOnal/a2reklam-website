```markdown
# API Documentation for A2 Reklam Platform

## Endpoint: Contact Form Submission
- **Path:** `/api/contact.php`
- **Method:** `POST`

### Description
This endpoint handles the submission of the contact form. It processes the user's input, performs validation and anti-spam checks, and then sends an email with the contact information to `info@a2reklam.com`.

### Request
The request must be sent as a `POST` request with the following parameters:
- **name** (string): The name of the person submitting the form.
- **email** (string): The email address of the person submitting the form.
- **message** (string): The message content from the user.
- **honeypot** (string): A hidden field to prevent spam submissions.

**Example Request:**
```javascript
fetch('/api/contact.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'Hello, I would like to inquire about your services.',
        honeypot: ''
    }),
});
```

### Response
The response will be a JSON object indicating the success or failure of the operation.

**Success Response:**
```json
{
    "status": "success",
    "message": "Form submission successful. Thank you!"
}
```

**Error Response:**
```json
{
    "status": "error",
    "message": "There was an error with your submission. Please try again."
}
```

### Authentication
No authentication is required to access this endpoint.

### Examples
**cURL Example:**
```bash
curl -X POST https://a2reklam.com/api/contact.php \
-H "Content-Type: application/json" \
-d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "message": "Hello, I would like to inquire about your services.",
    "honeypot": ""
}'
```

## Security Features
- Same-origin CORS policy that only allows requests from `a2reklam.com` and localhost.
- Honeypot field for spam prevention.
- Rate limiting (5 requests per IP per hour).
- Input validation and sanitization to prevent XSS and other attacks.
- Referer header validation to ensure requests originate from valid sources.

## Testing Locally
To test the contact form locally with PHP:
```bash
# Option 1: Use PHP's built-in server
php -S localhost:8000 -t public

# Option 2: Use Astro dev server (forms will fail locally without PHP)
pnpm run dev
```

On production (cPanel), PHP is available by default and `/api/contact.php` will work automatically.

## Notes
- Ensure that the `mail()` function is configured correctly on your hosting server. For SMTP configuration, consider using PHPMailer.
- Never commit SMTP credentials to the repository for security reasons.

**For further assistance, please contact us at `info@a2reklam.com`.**
```