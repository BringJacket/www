FROM node:0.12.7-onbuild

EXPOSE 5000
CMD npm run build -- release && npm run serve -- release
