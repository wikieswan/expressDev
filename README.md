# expressDev
前后端分离的思考

##node中间层思考

把模板渲染和路由交给前端，后端程序更专注于业务逻辑；
node的优势在于它的异步I/O能力，假想node做静态资源的读取、模板拼接；需要数据的地方就向
服务程序去取数据。

## 运行实例代码

### 1 nginx 配置文件

	server {
        listen 80;
        server_name www.example.com;
        location / {
            proxy_pass http://127.0.0.1:10000/;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Connection '';
            proxy_buffering off;
            proxy_http_version 1.1;
            chunked_transfer_encoding off;
        }
    }
    server {
        listen 80;
        server_name www.example-inter.com;
        location / {
            proxy_pass http://127.0.0.1:11000/;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Connection '';
            proxy_buffering off;
            proxy_http_version 1.1;
            chunked_transfer_encoding off;
        }
    }
### 2 host 配置

	127.0.0.1 www.example.com
	127.0.0.1 www.example-inter.com

### 3 clone and install

	git clone https://github.com/wikieswan/expressDev.git
	cd expressDev
	npm i

### 4 运行

	node app.js
	node restApiServerDemo.js

### 5 查看运行结果

	1 浏览器打开 http://www.example.com/api/cookie 设置 cookie	
	2 浏览器打开 http://www.example.com/username 查看页面返回

## 说明

app.js 文件是node前端服务器关键代码

restApiServerDemo.js 是模拟 java 等其他后端服务器的接口

更多说明参考链接 [node和java并存的前端方案](https://zhuanlan.zhihu.com/p/33609096)







