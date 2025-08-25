sudo dnf install git -y
sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-10.noarch.rpm -y
sudo yum install htop -y
sudo dnf install vim -y
sudo dnf install maven -y
---- NGINX
sudo touch /etc/yum.repos.d/nginx.repo
sudo vim /etc/yum.repos.d/nginx.repo

[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

sudo yum install nginx -y

--GIT CONF
sudo mkdir /apl
sudo chown ec2-user:ec2-user /apl
cd /apl
git clone https://github.com/EnzoTavares/zaimu-app.git
cd zaimu-app
git config user.name "jpsiquierolli"
git config user.email "joaopedrosiquierolli@gmail.com"
git switch <branch-name>
git pull



-- NGINX conf
sudo vim /etc/nginx/nginx.conf

#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 2048;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   240;
    types_hash_max_size 8192;
    client_max_body_size 8192M;
    proxy_connect_timeout 1800;
    proxy_send_timeout 1800;
    proxy_read_timeout 1800;
    send_timeout 1800;
#    proxy_buffering off;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        root         /usr/share/nginx/html;

        return 301 https://google.com.br;
        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }


server {
    listen              443 ssl;
    server_name         zaimu.com.br  www.zaimu.com.br;

   ssl_certificate "/root/nginx_certs/zaimu.com.br.crt";
   ssl_certificate_key "/root/nginx_certs/zaimu.com.br.key";
#  ssl_client_certificate "/root/nginx_certs/zaimu.com.br.ca";
   ssl_session_cache shared:SSL:1m;
   ssl_session_timeout  10m;
   ssl_ciphers HIGH:!aNULL:!MD5;
   ssl_prefer_server_ciphers on;


   location /                       { proxy_pass http://localhost:8081; }
}
}

*/*/*/*/
-- NGINX iniciar serviço
sudo setenforce 0

sudo vim /etc/selinux/config

selinux = disable

sudo systemctl enable nginx
sudo touch /root/rnginx.sh
sudo vim /root/rnginx.sh

sudo systemctl restart nginx

-- Alterar versão java para 21 (caso precise)

cd /apl
mkdir java
cd java
wget https://download.oracle.com/java/21/latest/jdk-21_linux-x64_bin.rpm
sudo dnf install jdk-21_linux-x64_bin.rpm -y
-- novo caminho do java /usr/lib/jvm
sudo update-alternatives --config java          -- alterar a versão do java que está usando

-- Script para subir
mkdir /apl/logs
mkdir /apl/scripts

touch /apl/scripts/atu.sh
vim /apl/scripts/atu.sh

export JAVA_HOME="/usr/lib/jvm/jdk-21.0.8-oracle-x64"
export PATH="$JAVA_HOME/bin:$PATH"

cd /apl/zaimu-app/zaimu-backend

rm -f /apl/logs/*
mvn clean install -DskipTests > /apl/logs/initialtests.log 2>&1 &
#mvn spring-boot:run -DskipTests -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005" > /apl/logs/springboot_$(date +%Y-%m-%d_%H-%M-%S).log 2>&1 &
mvn spring-boot:run -DskipTests -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005" > /apl/logs/springboot.log 2>&1 &

sleep 5

if pgrep "java" > /dev/null
then
    echo "The 'java' process is running."
else
    echo "The 'java' process is not running."
fi

*/


-- Portas
sudo vim /etc/ssh/sshd_config
port = 2469
sudo systemctl restart sshd
--portas para permitir na aws
8081    --zaimu_server
5005    --zaimu_debug
2469    --ssh
80      --nginx http
443     --nginx https

-- cloudflare
alterar Adress para o correto da máquina
