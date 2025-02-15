const generateDailyReminderTemplate = (userName) => {
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
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header {
                background-color: #4a90e2;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 30px;
                line-height: 1.6;
            }
            .memory-card {
                margin: 20px 0;
                padding: 15px;
                background-color: #f8f9fa;
                border-radius: 4px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                background-color: #f5f5f5;
                border-radius: 0 0 8px 8px;
            }
        </style>
    </head>
    <body style="background-color: #f0f0f0; padding: 20px;">
        <div class="email-container">
            <div class="header">
                <h1>Memory Lane Daily Reminder</h1>
            </div>
            <div class="content">
                <h2>Hello ${userName}! 👋</h2>
                <p>Don't forget to capture today's special moments!</p>
            </div>
            <div class="footer">
                <p>Stay connected with your memories on Memory Lane</p>
            </div>
        </div>
    </body>
    </html>`;
};

const generateOnThisDayTemplate = (memories, userName) => {
    const memoryCards = memories.map(memory => `
        <div class="memory-card">
            <h3>${memory.title}</h3>
            <p>${memory.description}</p>
            <p><em>${new Date(memory.createdAt).toLocaleDateString()}</em></p>
        </div>
    `).join('');

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
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header {
                background-color: #4a90e2;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 30px;
                line-height: 1.6;
            }
            .memory-card {
                margin: 20px 0;
                padding: 15px;
                background-color: #f8f9fa;
                border-radius: 4px;
                border-left: 4px solid #4a90e2;
            }
            .footer {
                text-align: center;
                padding: 20px;
                background-color: #f5f5f5;
                border-radius: 0 0 8px 8px;
            }
        </style>
    </head>
    <body style="background-color: #f0f0f0; padding: 20px;">
        <div class="email-container">
            <div class="header">
                <h1>Your Memories On This Day</h1>
            </div>
            <div class="content">
                <h2>Hello ${userName}! 👋</h2>
                <p>Here are your memories from this day in the past:</p>
                ${memoryCards}
            </div>
            <div class="footer">
                <p>Cherish your memories on Memory Lane</p>
            </div>
        </div>
    </body>
    </html>`;
};

module.exports = {
    generateDailyReminderTemplate,
    generateOnThisDayTemplate
};