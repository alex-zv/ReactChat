<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="/img/avatar_placeholder.png" type="image/png">
    <title>React</title>

    <!--<script src="//cdn.muicss.com/mui-0.10.0/js/mui.min.js"></script>-->
    <link rel="stylesheet" href="style.css">

</head>
<body class="body">

    <div class="chat" style="display: none;">
        <div class="chat-wrapper">
            <div class="chat-sidebar">
                Menu here
            </div>
            <div class="chat-top-panel">
                <div>
                    Menu btn
                </div>
            </div>
            <div class="chat-main">
                <div class="history-container">
                    <div class="message-item">
                        <div class="message-item__avatar">
                            <img class="img-responsive" src="img/avatar_placeholder.png" alt="">
                        </div>
                        <div class="message-item__body">
                            <div class="message-item__top">
                                <div class="message-item__name">
                                    Julia
                                </div>
                                <div class="message-item__date">
                                    21:48:12
                                </div>
                            </div>
                            <div class="message-item__text">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur fugiat pariatur placeat quam? Amet facilis odio perferendis quam similique tempora.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom-panel">
                    <div class="bottom-panel__left">
                        <div class="btn btn-attachment">
                            F
                        </div>
                    </div>
                    <div class="bottom-panel__middle">
                        <textarea placeholder="Your message"></textarea>
                    </div>
                    <div class="bottom-panel__right">
                        <button class="btn">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="app">
    </div>


    <script src="/js/scripts.js"></script>
    <!--<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">-->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
</body>
</html>