FROM debian:buster as builder
RUN apt update && \
    apt install -y make yasm as31 nasm binutils git curl && \
    git clone https://github.com/nemasu/asmttpd && \
    cd asmttpd && make release
RUN echo "www:x:10001:10001::/www:/sbin/nologin" > /etc/passwd && \
    echo "www:x:10001:" > /etc/group
RUN cd /tmp && curl -LO https://github.com/tdewolff/minify/releases/download/v2.9.19/minify_linux_amd64.tar.gz && tar xfz minify_linux_amd64.tar.gz
COPY static/ /www/static
COPY index.html /www
RUN /tmp/minify --all --recursive --output /tmp/min /www

FROM scratch
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group
COPY --from=builder /asmttpd/asmttpd /usr/local/bin/asmttpd
COPY --from=builder /tmp/min/www/ /www/
USER www
COPY conf/ /www/conf
VOLUME /www/conf
EXPOSE 8000
CMD ["/usr/local/bin/asmttpd", "/www", "8000"]