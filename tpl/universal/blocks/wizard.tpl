<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<div id="global-spinner" class="spinner-overlay">
    <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка...</span>
    </div>
</div>
<div class="container my-1">
    <div class="row justify-content-center">
        <div class="col-12 col-md-12">
        <div class="wizard-header">
           {* <a href="/se-cms/" class="brand-icon mx-3" title="">
                <img src="/templates/main/images/logo-icon.svg" class="pe-1" alt="">
                <svg xmlns="http://www.w3.org/2000/svg" class="d-none d-xl-inline-flex" width="230" height="32" style="padding-top: 5px;">
                    <text x="10" y="20" class="manropebold">MEGADIGITAL.SPACE</text>
                </svg>
            </a>*}
            <div class="wizard-title">
                <span class="title-text">Установка</span>
                <span class="cms-name">MDS CMS</span>
            </div>
            <div class="wizard-subtitle">Мастер быстрой настройки системы управления</div>
        </div>

        <div class="steps-indicator">
            <div class="step-item active" data-step="1">
                <div class="step-counter">1</div>
                <div class="step-title">Основные настройки</div>
            </div>
            <div class="step-item" data-step="2">
                <div class="step-counter">2</div>
                <div class="step-title">База данных</div>
            </div>
            <div class="step-item" data-step="3">
                <div class="step-counter">3</div>
                <div class="step-title">Администратор</div>
            </div>
        </div>
        <div class="wizard-container">
            <div class="progress-bar">
                <div class="progress"></div>
            </div>

            <!-- Step 1: Site Settings -->
            <div class="step active" data-step="1">
                <h2>Основные настройки</h2>
                <div class="alert alert-danger" hidden="hidden" id="settingsErrorBlock" role="alert"></div>
                <div class="form-group">
                    <label>Название сайта</label>
                    <input type="text" class="form-control" id="siteName" name="title" required>
                </div>

                <div class="form-group">
                    <label>Язык по умолчанию</label>
                    <select class="form-control" id="siteLanguage" name="default_lang" required>
                        <option value="russian">Русский</option>
                        <option value="english">English</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Основная валюта</label>
                    <select class="form-control" id="siteCurrency" name="default_currency" required>
                        {foreach $config["payment_info"]["currencies"] as $key => $currency}
                            <option value="{$key}">{$key}</option>
                        {/foreach}
                    </select>
                </div>
            </div>

            <!-- Step 2: Database Settings -->
            <div class="step" data-step="2">
                <h2>Настройки базы данных</h2>
                <div class="alert alert-danger" hidden="hidden" id="dbErrorBlock" role="alert"></div>
                <div class="form-group">
                    <label>Тип БД</label>
                    <select class="form-control" id="dbType" required>
                        <option value="mysql" selected>MySQL</option>
                        <option value="pgsql">PostgreSQL</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Хост БД</label>
                    <input type="text" class="form-control" id="dbHost" value="localhost" required>
                </div>
                <div class="form-group">
                    <label>Имя пользователя</label>
                    <input type="text" class="form-control" id="dbUser" required>
                </div>
                <div class="form-group">
                    <label>Пароль</label>
                    <input type="password" class="form-control" id="dbPass">
                </div>
                <div class="form-group">
                    <label>Имя базы данных</label>
                    <input type="text" class="form-control" id="dbName" required>
                </div>
            </div>

            <!-- Step 3: Admin Account -->
            <div class="step" data-step="3">
                <h2>Создание администратора</h2>
                <div class="alert alert-danger" hidden="hidden" id="adminErrorBlock" role="alert"></div>
                <div class="form-group">
                    <label>Email администратора</label>
                    <input type="email" class="form-control" id="adminEmail" required>
                </div>
                <div class="form-group">
                    <label>Пароль</label>
                    <input type="password" class="form-control" id="adminPass" required>
                </div>
                <div class="form-group">
                    <label>Повторите пароль</label>
                    <input type="password" class="form-control" id="adminPassConfirm" required>
                </div>
            </div>

            <div class="navigation-buttons">
                <button type="button" class="btn btn-prev" disabled>Назад</button>
                <button type="button" class="btn btn-next">Далее</button>
            </div>
        </div>
    </div>
    </div>
    {include file="../blocks/footer.tpl"}

</div>



<style>
    .step .form-control {
        appearance: none;
        background: white url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") no-repeat right 10px center;
        background-size: 16px;
        padding-right: 35px;
    }

    .step .form-control:focus {
        border-color: #4CAF50;
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }

    .wizard-header {
        text-align: center;
        margin-bottom: 40px;
        padding: 30px 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        border-radius: 10px;
        color: white;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .wizard-title {
        font-size: 2.5rem;
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
    }

    .title-text {
        opacity: 0.9;
    }

    .cms-name {
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 2px;
        background: rgba(255,255,255,0.1);
        padding: 5px 15px;
        border-radius: 5px;
        border: 2px solid rgba(255,255,255,0.2);
    }

    .wizard-subtitle {
        font-size: 1.1rem;
        opacity: 0.9;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.5;
    }

    @media (max-width: 768px) {
        .wizard-title {
            font-size: 2rem;
            flex-direction: column;
            gap: 5px;
        }

        .wizard-subtitle {
            font-size: 1rem;
        }
    }
        .wizard-container {
            max-width: 800px;
            margin: 50px auto;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            border-radius: 10px;
            padding: 30px;
        }

        .step {
            display: none;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }

        .step.active {
            display: block;
            opacity: 1;
            transform: translateY(0);
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        .progress-bar {
            height: 5px;
            background: #eee;
            margin-bottom: 30px;
            border-radius: 5px;
        }

        .progress {
            height: 100%;
            background: #4CAF50;
            transition: width 0.3s ease;
            width: 0;
        }

        .navigation-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
        }

        .btn-next {
            background: #4CAF50;
            color: white;
        }

        .btn-prev {
            background: #666;
            color: white;
        }

        .btn-submit {
            background: #2196F3;
            color: white;
        }

        .spinner-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        .hidden {
            display: none !important;
        }

    .steps-indicator {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            position: relative;
        }

        .steps-indicator:before {
            content: '';
            position: absolute;
            top: 20px;
            left: 0;
            right: 0;
            height: 2px;
            background: #eee;
            z-index: 0;
        }

        .step-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 1;
        }

        .step-counter {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            font-weight: bold;
            color: #666;
            transition: all 0.3s ease;
        }

        .step-title {
            text-align: center;
            font-size: 14px;
            color: #666;
            max-width: 120px;
            line-height: 1.3;
        }

        .step-item.active .step-counter {
            background: #4CAF50;
            color: white;
            transform: scale(1.1);
        }

        .step-item.active .step-title {
            color: #333;
            font-weight: 500;
        }

        .step-item.completed .step-counter {
            background: #8BC34A;
            color: white;
        }

        @media (max-width: 768px) {
            .step-title {
                display: none;
            }

            .steps-indicator {
                justify-content: center;
                gap: 20px;
            }
        }
    </style>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script src="/templates/main/assets/blocks/wizard.js"></script>