FROM iojs:onbuild

EXPOSE 5000
CMD npm run build -- release && npm run serve -- release
