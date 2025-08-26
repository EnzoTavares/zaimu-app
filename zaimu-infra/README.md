Instalation

Initial Dependences
```bash
sudo dnf install git -y
sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-10.noarch.rpm -y
sudo yum install htop -y
sudo dnf install vim -y
sudo dnf install maven -y
   ```

NGINX config
```bash
sudo touch /etc/yum.repos.d/nginx.repo
   ```
Config File
```bash
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
   ```
