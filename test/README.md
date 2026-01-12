1. terminal 에서 docker 명령어를 통해 이미지 빌드 후 진행
```
docker build -t nginx:simple-nginx .
```

2. 컨테이너 생성 및 실행
```
docker run -d -p 8080:80 --name simple-nginx nginx:simple-nginx
```