```markdown
# API Documentation for A2 Reklam

## Contact Form Submission

### Endpoint
`POST /api/contact.php`

### Description
This endpoint allows users to submit contact form data, which is then processed to send an email to `info@a2reklam.com`.

### Request
The request should be sent as a JSON object with the following parameters:

- **name** (string, required): The name of the person submitting the form.
- **email** (string, required): The email address of the person submitting the form.
- **message** (string, required): The content of the message submitted through the form.

**Example Request:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "message": "I would like to inquire about your services."
}
```

### Response
The response will be in JSON format and may contain the following fields:

- **status** (string): Indicates the success or failure of the request. Possible values: "success", "error".
- **message** (string): A message providing additional context, e.g., "Email sent successfully!" or "Failed to send email."

**Example Response on Success:**
```json
{
  "status": "success",
  "message": "Email sent successfully!"
}
```

**Example Response on Error:**
```json
{
  "status": "error",
  "message": "Invalid input data."
}
```

### Authentication
No authentication is required to access this endpoint.

### Example Usage
You can use the following `curl` command to test the API:

```bash
curl -X POST https://a2reklam.com/api/contact.php \
-H "Content-Type: application/json" \
-d '{"name":"John Doe","email":"john.doe@example.com","message":"I would like to inquire about your services."}'
```

## Security Features
- **CORS Policy**: Same-origin policy is enforced, only allowing requests from `a2reklam.com` and localhost.
- **Honeypot Field**: A field is included in the form to catch automated bots.
- **Rate Limiting**: Limits the number of requests per IP to 5 requests per hour.
- **Input Validation**: All input data is validated and sanitized before processing.
- **Referer Header Validation**: Ensures that requests originate from allowed domains.

## Local Testing Instructions
To test the contact form locally, you can use PHP's built-in server:

```bash
php -S localhost:8000 -t public
```
Or, if you are using Astro's development server (note that the contact form functionality will not work without a PHP server):

```bash
pnpm run dev
```

## PHP Configuration
The endpoint uses PHP's `mail()` function. For environments that require SMTP configuration, consider using PHPMailer for enhanced capabilities. Ensure you do not commit any sensitive SMTP credentials into the repository.

### Additional Notes
- Ensure that you have the necessary permissions to send emails from the server.
- The endpoint should be accessible at `https://a2reklam.com/api/contact.php` in the production environment.

---

## Conclusion
This API documentation provides an overview of the contact form submission functionality for the A2 Reklam website. Make sure to follow the required format for requests and responses to ensure proper functionality.
```