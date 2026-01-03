<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Ошибка 500 — Внутренняя ошибка сервера</title>
    <style>
        body {
            font-family: "Segoe UI", Arial, sans-serif;
            background: #f5f5f5;
            color: #333;
            text-align: center;
            padding: 50px;
        }
        .error-box {
            background: #fff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            display: inline-block;
            max-width: 600px;
        }
        h1 {
            font-size: 80px;
            margin: 0;
            color: #c0392b;
        }
        h2 {
            font-size: 28px;
            margin: 10px 0 20px;
        }
        p {
            font-size: 16px;
            color: #666;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background: #1a9e03;
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
            transition: background 0.3s;
        }
        a:hover {
            background: #126f01;
        }
    </style>
</head>
<body>
<div class="error-box">
    <h1>500</h1>
    <h2>Внутренняя ошибка сервера</h2>
    <p>{$error_message|default:"Произошла непредвиденная ошибка. Мы уже работаем над её исправлением."}</p>
    <a href="/">Вернуться на главную</a>
</div>
</body>
</html>
