FROM nestjs/cli:latest

RUN mkdir -p /var/workspace/api
WORKDIR /var/workspace/api
COPY ./api/build/run.sh /run.sh
RUN chmod +x /run.sh

ENTRYPOINT [ "/run.sh" ]