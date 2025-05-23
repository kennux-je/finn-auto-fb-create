<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Generator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f2f5;
            color: #1c1e21;
        }
        
        .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 20px 10px;
                padding: 15px;
            }
        }
        
        h1 {
            color: #1877f2;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }
        
        input, select {
            width: 100%;
            padding: 10px;
            border: 1px solid #dddfe2;
            border-radius: 5px;
            font-size: 16px;
            box-sizing: border-box;
        }
        
        button {
            background-color: #1877f2;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 12px 20px;
            font-size: 16px;
            cursor: pointer;
            width: 100%;
            margin-top: 10px;
        }
        
        button:hover {
            background-color: #166fe5;
        }
        
        .result {
            margin-top: 30px;
            padding: 15px;
            border: 1px solid #dddfe2;
            border-radius: 5px;
            background-color: #f5f6f7;
            display: none;
        }
        
        .result.visible {
            display: block;
        }
        
        .result-item {
            margin-bottom: 10px;
        }
        
        .result-label {
            font-weight: bold;
            margin-right: 5px;
        }
        
        .loading {
            text-align: center;
            margin-top: 20px;
            display: none;
        }
        
        .loading.visible {
            display: block;
        }
        
        .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top: 4px solid #1877f2;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .status {
            text-align: center;
            margin-top: 10px;
            font-weight: bold;
            color: #1877f2;
        }
        
        .error {
            color: #fa383e;
            margin-top: 10px;
            display: none;
        }
        
        .error.visible {
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Account Generator Demo</h1>
        
        <div class="form-group">
            <label for="quantity">Number of Accounts:</label>
            <select id="quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="name-prefix">Name Prefix (optional):</label>
            <input type="text" id="name-prefix" placeholder="e.g. 'John' or 'Test'">
        </div>
        
        <div class="form-group">
            <label for="email-domain">Email Domain:</label>
            <select id="email-domain">
                <option value="example.com">example.com</option>
                <option value="demo.com">demo.com</option>
                <option value="test.com">test.com</option>
            </select>
        </div>
        
        <button id="generate-btn">Generate Account(s)</button>
        
        <div class="loading" id="loading">
            <div class="spinner"></div>
            <div class="status" id="status">Generating accounts...</div>
        </div>
        
        <div class="error" id="error">
            An error occurred while generating accounts. Please try again.
        </div>
        
        <div class="result" id="result">
            <h3>Generated Accounts:</h3>
            <div id="accounts-list"></div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const generateBtn = document.getElementById('generate-btn');
            const loading = document.getElementById('loading');
            const result = document.getElementById('result');
            const error = document.getElementById('error');
            const accountsList = document.getElementById('accounts-list');
            const status = document.getElementById('status');
            
            generateBtn.addEventListener('click', function() {
                // Clear previous results
                accountsList.innerHTML = '';
                result.classList.remove('visible');
                error.classList.remove('visible');
                
                // Show loading state
                loading.classList.add('visible');
                
                // Get form values
                const quantity = parseInt(document.getElementById('quantity').value);
                const namePrefix = document.getElementById('name-prefix').value || 'User';
                const emailDomain = document.getElementById('email-domain').value;
                
                // Simulate API call with setTimeout
                setTimeout(function() {
                    loading.classList.remove('visible');
                    
                    try {
                        // Generate random accounts
                        for (let i = 0; i < quantity; i++) {
                            const randomStr = Math.random().toString(36).substring(2, 10);
                            const firstName = namePrefix + (quantity > 1 ? i + 1 : '');
                            const lastName = 'Demo' + randomStr.substring(0, 3);
                            const email = firstName.toLowerCase() + '.' + lastName.toLowerCase() + '@' + emailDomain;
                            const password = generatePassword();
                            
                            const accountElement = document.createElement('div');
                            accountElement.className = 'result-item';
                            accountElement.innerHTML = `
                                <p><span class="result-label">Name:</span> ${firstName} ${lastName}</p>
                                <p><span class="result-label">Email:</span> ${email}</p>
                                <p><span class="result-label">Password:</span> ${password}</p>
                                <hr>
                            `;
                            
                            accountsList.appendChild(accountElement);
                        }
                        
                        result.classList.add('visible');
                    } catch (e) {
                        error.classList.add('visible');
                    }
                }, 1500); // Simulated delay
            });
            
            function generatePassword() {
                const length = 12;
                const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
                let password = "";
                
                for (let i = 0; i < length; i++) {
                    const randomIndex = Math.floor(Math.random() * charset.length);
                    password += charset[randomIndex];
                }
                
                return password;
            }
        });
    </script>
</body>
</html>
