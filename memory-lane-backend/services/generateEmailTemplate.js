const generateEmailTemplate = (memory, userName) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                font-family: Arial, sans-serif;
                color: #333;
            }
            .header {
                background-color: #4a90e2;
                color: white;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
                line-height: 1.6;
            }
            .memory-image {
                max-width: 100%;
                height: auto;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                padding: 20px;
                background-color: #f5f5f5;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Memory Lane - Your Daily Memory</h1>
            </div>
            <div class="content">
                <h2>Hello ${userName}!</h2>
                <p>Here's a special memory from your past:</p>
                <h3>${memory.title}</h3>
                <p>${memory.description}</p>
                ${memory.media ? `<img src="${memory.media}" class="memory-image" alt="Memory Image">` : ''}
                <p>This memory was created on ${new Date(memory.createdAt).toLocaleDateString()}</p>
            </div>
            <div class="footer">
                <p>To manage your email preferences, please log in to your Memory Lane account.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = { generateEmailTemplate };