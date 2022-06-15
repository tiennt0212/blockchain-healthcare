FROM ubuntu:bionic

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
  && apt-get install gnupg -y

RUN echo "deb [arch=amd64] http://repo.sawtooth.me/ubuntu/ci bionic universe" >> /etc/apt/sources.list
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 8AA7AF1F1091A5FD
RUN echo "deb [arch=amd64] http://repo.sawtooth.me/ubuntu/chime/stable bionic universe" >> /etc/apt/sources.list
RUN apt-get install -y -q --no-install-recommends apt-utils
RUN apt-get install -y -q ca-certificates build-essential curl
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*
RUN curl -fsSL https://deb.nodesource.com/setup_12.x | bash - \
  && apt-get install -y nodejs
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt install yarn