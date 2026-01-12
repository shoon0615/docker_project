# 기존 Docker hub에 있는 컨테이너 이미지 중 Nginx 이미지를 기반으로 새롭게 구성할 Docker 이미지를 생성합니다.
FROM nginx

# COPY A B : A를 B로 복사합니다.
# 새로운 Nginx 설정 파일(내가 구성한 설정 파일)을 Nginx 이미지 경로 /etc/nginx/conf.d/nginx.conf에 복사합니다.
COPY ./config/nginx.conf /etc/nginx/conf.d/nginx.conf

# 새롭게 구성한 html 파일을 Nginx 이미지 경로 /usr/share/nginx/html/index.html에 복사합니다. (최초 html을 연결하였습니다)
COPY ./html/index.html /usr/share/nginx/html/index.html

# Docker 컨테이너가 실행되면 자동으로 실행되는 명령어입니다.
ENTRYPOINT ["nginx", "-g", "daemon off;"]