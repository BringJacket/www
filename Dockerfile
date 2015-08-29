FROM iojs:onbuild

RUN npm install -g supervisor webpack concurrently

EXPOSE 5000
CMD npm run build -- release && npm run serve -- release
